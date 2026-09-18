import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Heart,
  Send,
  SlidersHorizontal,
  X,
  Store,
  Grid,
  Info,
  CheckCircle2,
  ShieldCheck,
  Shield
} from 'lucide-react';
import { ProductCategory } from '../types';
import { TELEGRAM_USERNAME, getCleanTelegramUsername } from '../utils/telegram';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ProductCategory | 'All';
  onSelectCategory: (cat: ProductCategory | 'All') => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenAbout: () => void;
  onOpenAdmin?: () => void;
  selectedSubCity: string;
  onSelectSubCity: (subCity: string) => void;
  subCities: string[];
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  savedCount,
  onOpenSaved,
  onOpenAbout,
  onOpenAdmin,
  selectedSubCity,
  onSelectSubCity,
  subCities,
}) => {
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
      {/* Top trust notification ticker */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-flex items-center gap-1 bg-yellow-400/20 text-yellow-300 font-semibold px-2 py-0.5 rounded text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
              Live Tech Market
            </span>
            <span className="text-slate-300">
              Verified Addis Ababa electronics shops • Real ETB prices • Direct Telegram concierge
            </span>
          </div>

          <div className="hidden md:flex items-center gap-5 text-slate-300 shrink-0">
            <div className="flex items-center gap-1.5 hover:text-white transition-colors duration-200">
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
              <span>In-Person Inspection Guarantee</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-1.5 text-yellow-400 font-semibold">
              <Send className="w-3.5 h-3.5" />
              <span>Telegram Concierge: @TekFindET</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-3 sm:gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-2.5 group transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
              <img
                src="/app-icon.png"
                alt="TekFind"
                className="w-10 h-10 rounded-xl object-cover shadow-sm ring-1 ring-yellow-400/30 group-hover:ring-yellow-400 transition-all duration-200"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-black tracking-tight text-slate-950">
                    Tek<span className="text-yellow-500 drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)]">Find</span>
                  </span>
                  <span className="bg-yellow-400/90 text-slate-950 font-black text-[10px] px-1.5 py-0.5 rounded shadow-xs">
                    ET
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500 hidden sm:block -mt-1 tracking-wide">
                  Ethiopia Tech Marketplace
                </span>
              </div>
            </a>
          </div>

          {/* Desktop & Tablet Search Bar */}
          <div className="hidden sm:flex flex-1 max-w-2xl mx-2 lg:mx-6">
            <div className="relative w-full flex items-center">
              <div className="relative w-full flex items-center rounded-xl border border-slate-300 bg-slate-50/80 focus-within:bg-white focus-within:border-yellow-400 focus-within:ring-3 focus-within:ring-yellow-400/25 transition-all duration-200">
                <div className="pl-3.5 pr-2 text-slate-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search laptops, iPhone 15, PS5, Sony audio, Anker..."
                  className="w-full py-2.5 pr-8 bg-transparent text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    className="p-1.5 mr-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200/60 transition-all duration-150 active:scale-90"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* City / Sub-City Filter inside search box */}
                <div className="relative border-l border-slate-200 hidden md:block">
                  <button
                    type="button"
                    onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100/70 rounded-r-xl transition-colors duration-150 whitespace-nowrap"
                  >
                    <MapPin className="w-3.5 h-3.5 text-yellow-600 shrink-0" />
                    <span className="truncate max-w-[120px]">{selectedSubCity}</span>
                  </button>

                  {isCityDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-pop-in">
                      <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Filter by Addis Area
                      </div>
                      {subCities.map((city) => (
                        <button
                          key={city}
                          type="button"
                          onClick={() => {
                            onSelectSubCity(city);
                            setIsCityDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors duration-150 hover:bg-yellow-50/70 ${
                            selectedSubCity === city
                              ? 'text-yellow-950 font-bold bg-yellow-400/20'
                              : 'text-slate-700'
                          }`}
                        >
                          <span>{city}</span>
                          {selectedSubCity === city && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-yellow-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile search toggle button */}
            <button
              type="button"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="sm:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 transition-all duration-150"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* About / How It Works Button */}
            <button
              type="button"
              onClick={onOpenAbout}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-xl transition-all duration-150 active:scale-[0.98]"
            >
              <Info className="w-4 h-4 text-slate-500" />
              <span>How TekFind Works</span>
            </button>

            {/* Admin Portal Button */}
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-yellow-50 rounded-xl transition-all duration-150 border border-transparent hover:border-yellow-300 active:scale-[0.98]"
                title="Admin Portal - Manage Products"
              >
                <Shield className="w-3.5 h-3.5 text-yellow-600" />
                <span className="hidden md:inline">Admin</span>
              </button>
            )}

            {/* Saved items trigger */}
            <button
              type="button"
              onClick={onOpenSaved}
              className="relative p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-yellow-300 transition-all duration-150 active:scale-95 flex items-center gap-1.5"
              title="Saved items"
            >
              <Heart className="w-4 h-4 text-slate-700" />
              <span className="hidden sm:inline text-xs font-bold text-slate-800">Saved</span>
              {savedCount > 0 && (
                <span className="ml-0.5 bg-yellow-400 text-slate-950 font-black text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs animate-pop-in">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Contact concierge direct button */}
            <a
              href={`https://t.me/${getCleanTelegramUsername(TELEGRAM_USERNAME)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all duration-150 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
              title={`Direct Telegram Concierge (${TELEGRAM_USERNAME})`}
            >
              <Send className="w-3.5 h-3.5 text-slate-950" />
              <span>Telegram Concierge</span>
            </a>
          </div>
        </div>

        {/* Mobile Search Expandable Bar */}
        {showMobileSearch && (
          <div className="sm:hidden pb-3 pt-1 animate-fade-in">
            <div className="relative flex items-center rounded-xl border border-slate-300 bg-slate-50 focus-within:bg-white focus-within:border-yellow-400 focus-within:ring-2 focus-within:ring-yellow-400/20 transition-all">
              <Search className="w-4 h-4 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products in Addis..."
                className="w-full py-2 pl-2 pr-8 text-sm text-slate-950 bg-transparent focus:outline-none"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="p-1 mr-2 text-slate-400 hover:text-slate-600 transition-all active:scale-90"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {/* Quick area chips on mobile search */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-2 scrollbar-none text-[11px]">
              <span className="text-slate-400 font-medium shrink-0">Area:</span>
              {subCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => onSelectSubCity(city)}
                  className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-all duration-150 active:scale-95 ${
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
        )}
      </div>

      {/* Mobile Bottom Navigation Bar (Fixed for responsive mobile-first experience) */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-lg">
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-0.5 text-yellow-600 active:scale-90 transition-transform"
        >
          <Store className="w-5 h-5" />
          <span className="text-[10px] font-bold">Browse</span>
        </button>

        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('categories-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-slate-900 active:scale-90 transition-transform"
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-medium">Categories</span>
        </button>

        <button
          type="button"
          onClick={onOpenSaved}
          className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-slate-900 relative active:scale-90 transition-transform"
        >
          <Heart className="w-5 h-5" />
          <span className="text-[10px] font-medium">Saved</span>
          {savedCount > 0 && (
            <span className="absolute -top-1 right-2 bg-yellow-400 text-slate-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
              {savedCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={onOpenAbout}
          className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-slate-900 active:scale-90 transition-transform"
        >
          <Info className="w-5 h-5" />
          <span className="text-[10px] font-medium">How It Works</span>
        </button>

        {onOpenAdmin && (
          <button
            type="button"
            onClick={onOpenAdmin}
            className="flex flex-col items-center gap-0.5 text-slate-500 hover:text-yellow-600 active:scale-90 transition-transform"
          >
            <Shield className="w-5 h-5" />
            <span className="text-[10px] font-medium">Admin</span>
          </button>
        )}
      </nav>
    </header>
  );
};
