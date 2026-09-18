import React, { useState } from 'react';
import {
  X,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  Heart,
  Star,
  CheckCircle2,
  AlertCircle,
  Truck,
  ArrowLeft,
  Share2,
  Store,
  Tag,
  BadgeCheck
} from 'lucide-react';
import { Product } from '../types';
import { generateTelegramLink } from '../utils/telegram';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onContactToBuy: (product: Product) => void;
  isSaved: boolean;
  onToggleSave: (productId: string) => void;
  relatedProducts: Product[];
  onSelectRelated: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onContactToBuy,
  isSaved,
  onToggleSave,
  relatedProducts,
  onSelectRelated,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[95vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Sticky Modal Top Bar */}
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50/90 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1 font-bold text-slate-800 hover:text-slate-950 transition-all p-1.5 rounded-lg hover:bg-slate-200/70 cursor-pointer active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Marketplace</span>
            </button>
            <span>/</span>
            <span className="text-slate-900 font-bold bg-yellow-100/90 border border-yellow-300/70 px-2 py-0.5 rounded-md">{product.category}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleShare}
              className="p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-200/70 rounded-xl transition-all active:scale-90 cursor-pointer relative"
              title="Share product link"
            >
              <Share2 className="w-4 h-4" />
              {copiedLink && (
                <span className="absolute right-0 top-full mt-1 bg-slate-950 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md whitespace-nowrap animate-fade-in">
                  Link copied!
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => onToggleSave(product.id)}
              className={`p-2 rounded-xl border transition-all active:scale-90 cursor-pointer ${
                isSaved
                  ? 'border-rose-200 bg-rose-50 text-rose-600 shadow-xs'
                  : 'border-slate-200 text-slate-600 hover:text-rose-500 hover:bg-slate-100'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save for later'}
            >
              <Heart className={`w-4 h-4 transition-transform duration-150 ${isSaved ? 'fill-rose-600 scale-110' : ''}`} />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-950 hover:bg-slate-200/70 rounded-xl transition-all active:scale-90 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Column: Image Gallery */}
            <div className="md:col-span-6 space-y-3">
              {/* Main Image */}
              <div className="aspect-4/3 sm:aspect-1/1 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative group">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="bg-slate-950/90 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-xs backdrop-blur-xs">
                    {product.condition}
                  </span>
                  {product.originalPriceETB && (
                    <span className="bg-yellow-400 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-md shadow-xs border border-yellow-500/20">
                      Save {formatPrice(product.originalPriceETB - product.priceETB)} ETB
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-150 shrink-0 cursor-pointer active:scale-95 ${
                        selectedImageIndex === idx
                          ? 'border-yellow-400 ring-2 ring-yellow-400/40 shadow-xs'
                          : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Shop Badge Card */}
              <div className="bg-slate-50/90 border border-slate-200/90 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-slate-950 text-yellow-400 flex items-center justify-center font-bold text-sm shadow-xs">
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-slate-950">
                          {product.shopName}
                        </span>
                        {product.shopVerified && (
                          <BadgeCheck className="w-4 h-4 text-yellow-600" title="Verified Shop" />
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">
                        Verified Addis Retailer • Physical Storefront
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2 py-1 rounded-lg text-xs font-bold text-amber-950">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{product.shopRating}</span>
                    <span className="text-slate-400 font-normal">({product.shopReviewCount})</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/70 flex items-start gap-2 text-xs text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800">{product.location}</span>
                    <span className="block text-slate-500 text-[11px]">{product.subCity}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Title, Pricing & Action CTA */}
            <div className="md:col-span-6 space-y-5">
              {/* Meta tags */}
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="text-slate-950 bg-yellow-100/90 border border-yellow-300 font-bold px-2.5 py-1 rounded-lg">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Listed {product.lastUpdated}</span>
                </div>
              </div>

              {/* Title & Product Code */}
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-950 leading-snug">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                  <span>Brand: <strong className="text-slate-800">{product.brand}</strong></span>
                  <span>•</span>
                  <span>Inquiry Ref: <strong className="font-mono text-yellow-700 bg-yellow-50 px-1 py-0.5 rounded">{product.inquiryCode}</strong></span>
                </div>
              </div>

              {/* Pricing Box */}
              <div className="bg-slate-950 text-white rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-xl border border-slate-800">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Cash / Transfer Price:</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                        {formatPrice(product.priceETB)}
                      </span>
                      <span className="text-sm font-black text-yellow-400 bg-yellow-400/10 px-1.5 py-0.5 rounded">ETB</span>
                    </div>
                  </div>

                  {product.originalPriceETB && (
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block line-through">
                        {formatPrice(product.originalPriceETB)} ETB
                      </span>
                      <span className="text-xs font-bold text-yellow-400">
                        Special Shop Rate
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-yellow-400" />
                    <span className="font-medium">{product.warranty}</span>
                  </span>
                  <span className="text-yellow-300 font-bold">
                    {product.inStock ? `${product.stockCount} units available` : 'Call for restock'}
                  </span>
                </div>

                {/* Primary Contact to Buy Button */}
                <a
                  id={`modal-contact-to-buy-${product.id}`}
                  href={generateTelegramLink(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onContactToBuy(product)}
                  className="w-full py-3.5 px-4 rounded-xl font-black text-sm bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-slate-950 transition-all duration-150 flex items-center justify-center gap-2 shadow-lg hover:shadow-yellow-400/25 active:scale-[0.98] text-center select-none cursor-pointer"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Contact to Buy via Telegram</span>
                </a>

                <p className="text-[11px] text-center text-slate-400 leading-relaxed">
                  TekFind verifies shop stock, inspects your device, and arranges Addis pickup or delivery.
                </p>
              </div>

              {/* Highlights & Description */}
              <div className="space-y-3 text-sm">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-400">
                  Key Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {product.keySpecs.map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-yellow-600 shrink-0 mt-0.5" />
                      <span className="text-slate-800 font-medium">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Full Specs Table */}
              <div className="space-y-2 text-sm pt-2">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-400">
                  Full Technical Details
                </h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
                  {product.specs.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-3 p-2.5 hover:bg-yellow-50/30 transition-colors">
                      <span className="text-slate-500 font-semibold">{item.label}</span>
                      <span className="col-span-2 text-slate-900 font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Overview Text */}
              <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                <strong className="text-slate-800 block mb-1">Item Description:</strong>
                {product.description}
              </div>

              {/* Trust Callout */}
              <div className="bg-yellow-50/70 border border-yellow-200/80 rounded-xl p-3.5 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-yellow-700 shrink-0 mt-0.5" />
                <div className="text-xs text-yellow-950 leading-relaxed">
                  <strong className="block font-bold mb-0.5">100% Safe Local Transaction:</strong>
                  You do not pay upfront online. Inspect the physical item and warranty receipt at{' '}
                  <span className="font-semibold text-slate-950">{product.shopName}</span> or pay the courier upon delivery in Addis Ababa.
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="pt-6 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">
                  More in {product.category}
                </h3>
                <span className="text-xs text-slate-500">Other local shops</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {relatedProducts.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectRelated(item)}
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-yellow-400 bg-slate-50/50 hover:bg-white cursor-pointer transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md flex flex-col gap-2 group"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full aspect-4/3 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 line-clamp-1 group-hover:text-yellow-600 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-slate-950 font-black text-xs mt-0.5">
                        {formatPrice(item.priceETB)} <span className="text-[10px] text-yellow-600">ETB</span>
                      </p>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {item.shopName}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
