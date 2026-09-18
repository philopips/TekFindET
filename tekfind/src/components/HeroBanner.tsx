import React from 'react';
import {
  ShieldCheck,
  Send,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Store,
  CheckCircle2
} from 'lucide-react';
import { ProductCategory } from '../types';

interface HeroBannerProps {
  onSelectCategory: (category: ProductCategory | 'All') => void;
  onOpenAbout: () => void;
  onQuickSearch: (term: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectCategory,
  onOpenAbout,
  onQuickSearch,
}) => {
  const quickSearches = [
    'iPhone 15 Pro',
    'MacBook Air M3',
    'PS5 Slim',
    'Anker 140W',
    'Sony XM5'
  ];

  return (
    <div id="marketplace-overview" className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden border-t border-b border-slate-800/80 animate-fade-in">
      {/* Subtle geometric background grid pattern with warm glow */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[radial-gradient(#facc15_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 px-3.5 py-1 rounded-full text-xs font-bold transition-all duration-200 hover:bg-yellow-400/15">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
              <span>Addis Ababa's Smart Electronics Directory</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Real Shop Inventories. <br className="hidden sm:inline" />
              <span className="text-yellow-400 drop-shadow-[0_2px_10px_rgba(250,204,21,0.25)]">Transparent ETB Prices.</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Skip the Merkato crowds and uncertain phone calls. Browse authenticated devices from top
              electronics retailers across Bole, Piassa, and Megenagna. Click{' '}
              <strong className="text-white font-bold bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700/60">“Contact to Buy”</strong> to connect with our
              concierge on Telegram—we reserve your item, guarantee the price, and facilitate safe local
              pickup or delivery.
            </p>

            {/* Quick search tags */}
            <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-semibold">Popular now:</span>
              {quickSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => onQuickSearch(term)}
                  className="bg-slate-800/80 hover:bg-yellow-400 hover:text-slate-950 hover:border-yellow-400 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700/60 transition-all duration-150 active:scale-95 text-xs font-medium cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>

            {/* CTA action group */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('featured-products-section') || document.getElementById('catalog-section');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all duration-150 shadow-md hover:shadow-yellow-400/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer"
              >
                <span>Browse Products ↑</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={onOpenAbout}
                className="bg-slate-800/90 hover:bg-slate-800 text-white hover:text-yellow-300 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 border border-slate-700/80 hover:border-yellow-400/40 transition-all duration-150 active:scale-[0.98] cursor-pointer"
              >
                <Send className="w-4 h-4 text-yellow-400" />
                <span>How Concierge Buying Works</span>
              </button>
            </div>
          </div>

          {/* Right side highlights card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl hover:border-slate-700 transition-all duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-yellow-400 text-slate-950 flex items-center justify-center font-black text-xs shadow-xs">
                    ET
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">The TekFind Guarantee</h3>
                    <p className="text-[11px] text-slate-400">Zero buyer fees & verified warranty</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 px-2 py-0.5 rounded-md">
                  Active
                </span>
              </div>

              {/* 3 bullet points of trust */}
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-yellow-400/15 text-yellow-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-semibold">100% In-Person Inspection First</strong>
                    <span className="text-slate-400 text-[11px]">
                      Never send blind bank transfers. Inspect serial numbers, battery health, and packaging before paying.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-yellow-400/15 text-yellow-400 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-semibold">Real Addis Ababa Physical Shops</strong>
                    <span className="text-slate-400 text-[11px]">
                      Every listing is tied to an actual walk-in retail storefront with shop warranties in Bole, Piassa, or Megenagna.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-yellow-400/15 text-yellow-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-semibold">Telegram Concierge Reservation</strong>
                    <span className="text-slate-400 text-[11px]">
                      We verify shop availability on your behalf, freeze the discounted ETB price, and coordinate delivery.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Free service for buyers</span>
                <span className="text-yellow-400 font-bold">Shop commission paid by seller</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
