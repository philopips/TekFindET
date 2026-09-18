import React from 'react';
import {
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Tv,
  Gamepad2,
  Cable,
  Camera,
  Cpu,
  Layers
} from 'lucide-react';
import { ProductCategory } from '../types';
import { CATEGORIES_LIST } from '../data/mockProducts';

interface CategoryNavProps {
  selectedCategory: ProductCategory | 'All';
  onSelectCategory: (category: ProductCategory | 'All') => void;
  totalProductsCount: number;
  categoryCounts?: Record<string, number>;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  totalProductsCount,
  categoryCounts,
}) => {
  const getCategoryIcon = (category: ProductCategory | 'All') => {
    switch (category) {
      case 'Phones':
        return <Smartphone className="w-4 h-4" />;
      case 'Laptops':
        return <Laptop className="w-4 h-4" />;
      case 'Audio':
        return <Headphones className="w-4 h-4" />;
      case 'Smartwatches':
        return <Watch className="w-4 h-4" />;
      case 'TVs':
        return <Tv className="w-4 h-4" />;
      case 'Gaming':
        return <Gamepad2 className="w-4 h-4" />;
      case 'Accessories':
        return <Cable className="w-4 h-4" />;
      case 'Cameras':
        return <Camera className="w-4 h-4" />;
      case 'Other':
        return <Cpu className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  return (
    <section id="categories-section" className="py-4 border-b border-slate-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Explore Electronics Categories
          </h2>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Showing verified local stocks in Addis Ababa
          </span>
        </div>

        {/* Horizontal scrollable category list */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
          {/* All Category Pill */}
          <button
            type="button"
            onClick={() => onSelectCategory('All')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 active:scale-95 cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-slate-950 text-white shadow-sm ring-2 ring-yellow-400/40'
                : 'bg-slate-100/90 text-slate-700 hover:bg-yellow-50 hover:text-slate-950 hover:border-yellow-200 border border-transparent'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-yellow-400" />
            <span>All Electronics</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                selectedCategory === 'All'
                  ? 'bg-yellow-400 text-slate-950'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {totalProductsCount}
            </span>
          </button>

          {/* Individual Category Pills */}
          {CATEGORIES_LIST.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => onSelectCategory(cat.name)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 active:scale-95 cursor-pointer ${
                  isSelected
                    ? 'bg-yellow-400 text-slate-950 shadow-sm border border-yellow-500/40 scale-[1.02]'
                    : 'bg-slate-100/90 text-slate-700 hover:bg-yellow-50 hover:text-slate-950 hover:border-yellow-200 border border-transparent'
                }`}
              >
                {getCategoryIcon(cat.name)}
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isSelected
                      ? 'bg-slate-950 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {categoryCounts ? (categoryCounts[cat.name] ?? 0) : cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
