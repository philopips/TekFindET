import React from 'react';
import {
  Send,
  ShieldCheck,
  MapPin,
  Heart,
  Phone,
  Store,
  Layers
} from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory | 'All') => void;
  onOpenAbout: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenAbout, onOpenAdmin }) => {
  const categories: ProductCategory[] = [
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

  const shoppingHubs = [
    'Bole Medhanialem & Edna Mall',
    'Megenagna Zefmesh Grand Mall',
    'Piassa Electronics Corridor',
    'Merkato Military Tera Tech Zone',
    'Kazanchis Supermarket Mall',
    '22 Mazoria Lex Plaza',
    'Mexico Square Tech Centers'
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs pb-20 sm:pb-8 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/app-icon.png"
                alt="TekFind"
                className="w-9 h-9 rounded-xl object-cover shadow-sm ring-1 ring-yellow-400/40"
                referrerPolicy="no-referrer"
              />
              <span className="text-xl font-black tracking-tight text-white">
                Tek<span className="text-yellow-400">Find</span>
              </span>
              <span className="bg-yellow-400/10 text-yellow-300 border border-yellow-400/30 text-[10px] font-black px-1.5 py-0.5 rounded">
                ET
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              Ethiopia’s dedicated electronics marketplace. We connect tech buyers directly with verified
              physical shops in Addis Ababa through a hassle-free Telegram concierge.
            </p>

            <div className="pt-1 flex items-center gap-2 text-yellow-400 font-semibold">
              <Send className="w-4 h-4" />
              <span className="text-white font-bold">Telegram: @TekFindET</span>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Electronics Categories
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    onSelectCategory(cat);
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="text-left text-slate-400 hover:text-yellow-400 transition-colors py-0.5 cursor-pointer"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Addis Ababa Shopping Hubs */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Addis Retail Hubs
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {shoppingHubs.map((hub, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                  <span>{hub}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Safe Shopping */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Buyer Protection
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <p>
                  Inspect the device in person and test all features before releasing any payment.
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenAbout}
                className="text-yellow-400 hover:text-yellow-300 hover:underline font-bold inline-block text-xs transition-colors cursor-pointer"
              >
                Learn how commission & verification works &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} TekFind Ethiopia. All rights reserved. Addis Ababa.
          </div>
          <div className="flex items-center gap-4">
            <span>Prices listed in Ethiopian Birr (ETB)</span>
            <span>•</span>
            <span>Local Shop Guarantee</span>
            {onOpenAdmin && (
              <>
                <span>•</span>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="text-slate-400 hover:text-yellow-400 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Admin & Shop Portal</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
