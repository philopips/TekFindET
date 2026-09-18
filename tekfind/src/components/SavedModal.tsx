import React from 'react';
import {
  X,
  Heart,
  Trash2,
  Send,
  Eye,
  ArrowRight,
  Store,
  MapPin
} from 'lucide-react';
import { Product } from '../types';
import { generateTelegramLink } from '../utils/telegram';

interface SavedModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onContactToBuy: (product: Product) => void;
  onRemoveSaved: (productId: string) => void;
  onClearAll: () => void;
}

export const SavedModal: React.FC<SavedModalProps> = ({
  isOpen,
  onClose,
  savedProducts,
  onSelectProduct,
  onContactToBuy,
  onRemoveSaved,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-rose-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                Saved Items ({savedProducts.length})
              </h3>
              <p className="text-[11px] text-slate-500">
                Products bookmarked for comparison or inquiry
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedProducts.length > 0 && (
              <button
                type="button"
                onClick={onClearAll}
                className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 px-2 py-1 rounded hover:bg-rose-50"
              >
                Clear all
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {savedProducts.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">No saved products yet</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Tap the heart icon on any device card to save it here for quick Telegram inquiry later.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl transition-all duration-150 active:scale-95 inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            savedProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 hover:border-yellow-400/80 bg-slate-50/50 hover:bg-white transition-all duration-150 shadow-xs hover:shadow-md"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-cover rounded-lg border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-slate-950 bg-yellow-100 border border-yellow-300/70 px-1.5 py-0.5 rounded font-black">
                      {product.category}
                    </span>
                    <h5
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="font-bold text-xs sm:text-sm text-slate-900 truncate hover:text-yellow-600 cursor-pointer mt-0.5 transition-colors"
                    >
                      {product.name}
                    </h5>
                    <div className="flex items-center gap-2 mt-0.5 text-xs">
                      <span className="font-black text-slate-950">
                        {formatPrice(product.priceETB)} <span className="text-[10px] text-yellow-600">ETB</span>
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-[11px] text-slate-500 truncate">
                        {product.shopName}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-950 flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Details</span>
                  </button>

                  <a
                    id={`saved-contact-to-buy-${product.id}`}
                    href={generateTelegramLink(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      onContactToBuy(product);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-xs transition-all duration-150 active:scale-95 select-none cursor-pointer"
                  >
                    <Send className="w-3 h-3 text-slate-950" />
                    <span>Contact to Buy</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => onRemoveSaved(product.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all active:scale-90 cursor-pointer"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
