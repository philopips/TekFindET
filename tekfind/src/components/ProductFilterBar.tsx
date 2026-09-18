import React, { useState } from 'react';
import {
  Search,
  X,
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown,
  MapPin,
  Tag,
  DollarSign,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { ProductCategory, SortOption } from '../types';

export interface PriceRangePreset {
  label: string;
  min: number | null;
  max: number | null;
}

export const PRICE_PRESETS: PriceRangePreset[] = [
  { label: 'All Prices', min: null, max: null },
  { label: 'Under 25K ETB', min: 0, max: 25000 },
  { label: '25K - 50K ETB', min: 25000, max: 50000 },
  { label: '50K - 100K ETB', min: 50000, max: 100000 },
  { label: 'Above 100K ETB', min: 100000, max: null }
];

export const CATEGORY_OPTIONS: (ProductCategory | 'All')[] = [
  'All',
  'Phones',
  'Laptops',
  'Audio',
  'Smartwatches',
  'TVs',
  'Gaming',
  'Accessories',
  'Cameras',
  'Other'
];

interface ProductFilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory: ProductCategory | 'All';
  onCategoryChange: (cat: ProductCategory | 'All') => void;
  selectedSubCity: string;
  onSubCityChange: (city: string) => void;
  subCities: string[];
  minPrice: number | null;
  maxPrice: number | null;
  onPriceChange: (min: number | null, max: number | null) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalFilteredCount: number;
  onResetFilters: () => void;
}

export const ProductFilterBar: React.FC<ProductFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedSubCity,
  onSubCityChange,
  subCities,
  minPrice,
  maxPrice,
  onPriceChange,
  sortOption,
  onSortChange,
  totalFilteredCount,
  onResetFilters
}) => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [customMin, setCustomMin] = useState<string>(minPrice ? String(minPrice) : '');
  const [customMax, setCustomMax] = useState<string>(maxPrice ? String(maxPrice) : '');

  // Calculate active filters count
  const activeFiltersCount =
    (searchQuery.trim() ? 1 : 0) +
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedSubCity !== 'All Addis Ababa' ? 1 : 0) +
    (minPrice !== null || maxPrice !== null ? 1 : 0) +
    (sortOption !== 'featured' ? 1 : 0);

  const handlePresetSelect = (preset: PriceRangePreset) => {
    onPriceChange(preset.min, preset.max);
    setCustomMin(preset.min !== null ? String(preset.min) : '');
    setCustomMax(preset.max !== null ? String(preset.max) : '');
    setIsPriceDropdownOpen(false);
  };

  const handleApplyCustomPrice = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedMin = customMin.trim() ? Math.max(0, Number(customMin)) : null;
    const parsedMax = customMax.trim() ? Math.max(0, Number(customMax)) : null;
    onPriceChange(parsedMin, parsedMax);
    setIsPriceDropdownOpen(false);
  };

  const getPriceLabel = () => {
    if (minPrice === null && maxPrice === null) return 'Any Price';
    if (minPrice !== null && maxPrice !== null) {
      return `${(minPrice / 1000).toFixed(0)}k - ${(maxPrice / 1000).toFixed(0)}k ETB`;
    }
    if (minPrice !== null) return `> ${(minPrice / 1000).toFixed(0)}k ETB`;
    if (maxPrice !== null) return `< ${(maxPrice / 1000).toFixed(0)}k ETB`;
    return 'Price';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-xs space-y-3.5">
      {/* Top row: Search input & Mobile filter trigger */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        {/* Search by Product Name */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            id="product-search-input"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products by name (e.g., iPhone 15, MacBook, Sony)..."
            className="w-full pl-9 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-950 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-yellow-400 focus:ring-3 focus:ring-yellow-400/20 transition-all duration-150"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 rounded-full hover:bg-slate-200 transition-all active:scale-90"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Mobile Filter Toggle Button (Visible on mobile screens) */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen(true)}
            className="flex-1 py-2.5 px-3.5 rounded-xl bg-slate-100 hover:bg-yellow-50 text-slate-900 text-xs font-bold flex items-center justify-center gap-2 transition-all duration-150 active:scale-95 border border-slate-200 hover:border-yellow-300"
          >
            <SlidersHorizontal className="w-4 h-4 text-yellow-600" />
            <span>Filters & Sort</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-yellow-400 text-slate-950 text-[10px] font-black flex items-center justify-center shadow-xs">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={onResetFilters}
              className="py-2.5 px-3 rounded-xl bg-slate-50 text-slate-700 hover:text-slate-950 text-xs font-bold border border-slate-200 transition-all active:scale-90"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Desktop Filter Controls Row */}
        <div className="hidden sm:flex items-center flex-wrap gap-2">
          {/* Category Dropdown */}
          <div className="relative">
            <select
              id="desktop-category-select"
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value as ProductCategory | 'All')}
              className="appearance-none bg-slate-50 hover:bg-white border border-slate-200 text-xs font-bold text-slate-800 py-2.5 pl-3 pr-8 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/25 cursor-pointer transition-all duration-150"
            >
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Location / SubCity Dropdown */}
          <div className="relative">
            <select
              id="desktop-location-select"
              value={selectedSubCity}
              onChange={(e) => onSubCityChange(e.target.value)}
              className="appearance-none bg-slate-50 hover:bg-white border border-slate-200 text-xs font-bold text-slate-800 py-2.5 pl-3 pr-8 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/25 cursor-pointer transition-all duration-150"
            >
              {subCities.map((city) => (
                <option key={city} value={city}>
                  {city === 'All Addis Ababa' ? 'All Addis Ababa' : city}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Price Range Dropdown Trigger */}
          <div className="relative">
            <button
              type="button"
              id="desktop-price-filter-btn"
              onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
              className={`flex items-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs font-bold transition-all duration-150 active:scale-95 cursor-pointer ${
                minPrice !== null || maxPrice !== null
                  ? 'bg-yellow-100/80 text-yellow-950 border-yellow-400 shadow-xs'
                  : 'bg-slate-50 hover:bg-white text-slate-800 border-slate-200'
              }`}
            >
              <span>{getPriceLabel()}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isPriceDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Price Range Popover */}
            {isPriceDropdownOpen && (
              <div className="absolute right-0 sm:left-0 top-full mt-1.5 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl p-3 z-40 animate-pop-in">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
                    Price Filter (ETB)
                  </span>
                  {(minPrice !== null || maxPrice !== null) && (
                    <button
                      type="button"
                      onClick={() => handlePresetSelect(PRICE_PRESETS[0])}
                      className="text-[10px] font-bold text-yellow-700 hover:text-yellow-900"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Preset Chips */}
                <div className="space-y-1 mb-3">
                  {PRICE_PRESETS.map((preset) => {
                    const isSelected = minPrice === preset.min && maxPrice === preset.max;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => handlePresetSelect(preset)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors duration-150 cursor-pointer ${
                          isSelected
                            ? 'bg-yellow-400 text-slate-950 font-bold shadow-xs'
                            : 'text-slate-700 hover:bg-yellow-50/70'
                        }`}
                      >
                        <span>{preset.label}</span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Min / Max inputs */}
                <form onSubmit={handleApplyCustomPrice} className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-500">Custom Price (ETB)</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    <input
                      type="number"
                      placeholder="Min"
                      value={customMin}
                      onChange={(e) => setCustomMin(e.target.value)}
                      className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-950 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={customMax}
                      onChange={(e) => setCustomMax(e.target.value)}
                      className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-950 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 pt-1">
                    <button
                      type="submit"
                      className="flex-1 py-1.5 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-slate-950 font-black text-xs rounded-lg transition-all duration-150 active:scale-[0.98] shadow-xs cursor-pointer"
                    >
                      Apply
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsPriceDropdownOpen(false)}
                      className="px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="relative">
            <select
              id="desktop-sort-select"
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="appearance-none bg-slate-50 hover:bg-white border border-slate-200 text-xs font-bold text-slate-800 py-2.5 pl-3 pr-8 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/25 cursor-pointer transition-all duration-150"
            >
              <option value="featured">Sort: Featured</option>
              <option value="newest">Sort: Newest First</option>
              <option value="price-asc">Sort: Price Low to High</option>
              <option value="price-desc">Sort: Price High to Low</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Reset button if active */}
          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-2.5 py-2 rounded-xl transition-all duration-150 active:scale-95 flex items-center gap-1 cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Badges Bar */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100 text-xs animate-fade-in">
          <span className="text-[11px] font-bold text-slate-400 mr-1">Active:</span>

          {searchQuery && (
            <span className="inline-flex items-center gap-1 bg-yellow-100/80 border border-yellow-300 text-yellow-950 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
              <span>Name: "{searchQuery}"</span>
              <button
                onClick={() => onSearchChange('')}
                className="text-yellow-800 hover:text-yellow-950 ml-0.5 active:scale-90"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1 bg-slate-100 border border-slate-200 text-slate-800 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
              <span>Category: {selectedCategory}</span>
              <button
                onClick={() => onCategoryChange('All')}
                className="text-slate-500 hover:text-slate-800 ml-0.5 active:scale-90"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedSubCity !== 'All Addis Ababa' && (
            <span className="inline-flex items-center gap-1 bg-slate-100 border border-slate-200 text-slate-800 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
              <MapPin className="w-2.5 h-2.5 text-slate-500" />
              <span>{selectedSubCity}</span>
              <button
                onClick={() => onSubCityChange('All Addis Ababa')}
                className="text-slate-500 hover:text-slate-800 ml-0.5 active:scale-90"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {(minPrice !== null || maxPrice !== null) && (
            <span className="inline-flex items-center gap-1 bg-yellow-100/80 border border-yellow-300 text-yellow-950 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
              <span>Price: {getPriceLabel()}</span>
              <button
                onClick={() => {
                  onPriceChange(null, null);
                  setCustomMin('');
                  setCustomMax('');
                }}
                className="text-yellow-800 hover:text-yellow-950 ml-0.5 active:scale-90"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {sortOption !== 'featured' && (
            <span className="inline-flex items-center gap-1 bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full text-[11px] font-medium">
              <span>
                {sortOption === 'newest'
                  ? 'Newest First'
                  : sortOption === 'price-asc'
                  ? 'Price: Low to High'
                  : 'Price: High to Low'}
              </span>
              <button
                onClick={() => onSortChange('featured')}
                className="text-slate-400 hover:text-slate-700 ml-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={onResetFilters}
            className="text-[11px] font-bold text-slate-400 hover:text-slate-700 underline ml-auto"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Mobile Filters Slide-over / Modal */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 backdrop-blur-xs sm:hidden">
          <div
            className="absolute inset-0"
            onClick={() => setIsMobileDrawerOpen(false)}
          />

          <div className="relative bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-5 space-y-5 shadow-2xl animate-in slide-in-from-bottom duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-yellow-600" />
                <h3 className="font-black text-base text-slate-950">Filter & Sort Products</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sort Order */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Sort Products By
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'featured', label: 'Featured First' },
                  { id: 'newest', label: 'Newest First' },
                  { id: 'price-asc', label: 'Price: Low to High' },
                  { id: 'price-desc', label: 'Price: High to Low' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSortChange(item.id as SortOption)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                      sortOption === item.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Category
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
                {CATEGORY_OPTIONS.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => onCategoryChange(cat)}
                    className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition-all duration-150 active:scale-95 ${
                      selectedCategory === cat
                        ? 'bg-yellow-400 text-slate-950 font-bold shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat === 'All' ? 'All Electronics' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Price Range (ETB)
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {PRICE_PRESETS.map((preset) => {
                  const isSelected = minPrice === preset.min && maxPrice === preset.max;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        onPriceChange(preset.min, preset.max);
                        setCustomMin(preset.min !== null ? String(preset.min) : '');
                        setCustomMax(preset.max !== null ? String(preset.max) : '');
                      }}
                      className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold transition-all duration-150 active:scale-95 ${
                        isSelected
                          ? 'bg-yellow-400 text-slate-950 font-bold shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>

              {/* Custom Min / Max inputs */}
              <div className="pt-2 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold block mb-1">
                    Min Price (ETB)
                  </span>
                  <input
                    type="number"
                    placeholder="0"
                    value={customMin}
                    onChange={(e) => {
                      setCustomMin(e.target.value);
                      const minVal = e.target.value ? Number(e.target.value) : null;
                      onPriceChange(minVal, maxPrice);
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-950 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold block mb-1">
                    Max Price (ETB)
                  </span>
                  <input
                    type="number"
                    placeholder="200,000"
                    value={customMax}
                    onChange={(e) => {
                      setCustomMax(e.target.value);
                      const maxVal = e.target.value ? Number(e.target.value) : null;
                      onPriceChange(minPrice, maxVal);
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-950 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                  />
                </div>
              </div>
            </div>

            {/* Location / SubCity */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Location in Addis Ababa
              </label>
              <div className="flex flex-wrap gap-1.5">
                {subCities.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => onSubCityChange(city)}
                    className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition-all duration-150 active:scale-95 ${
                      selectedSubCity === city
                        ? 'bg-yellow-400 text-slate-950 font-bold shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onResetFilters();
                  setCustomMin('');
                  setCustomMax('');
                }}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all active:scale-95"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-slate-950 font-black text-xs transition-all duration-150 text-center shadow-xs active:scale-[0.98]"
              >
                Show {totalFilteredCount} {totalFilteredCount === 1 ? 'Product' : 'Products'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
