import React from 'react';
import {
  MapPin,
  Clock,
  Send,
  Heart,
  ShieldCheck,
  CheckCircle,
  Eye,
  Star
} from 'lucide-react';
import { Product } from '../types';
import { generateTelegramLink } from '../utils/telegram';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onContactToBuy: (product: Product) => void;
  isSaved: boolean;
  onToggleSave: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onContactToBuy,
  isSaved,
  onToggleSave,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-yellow-400/80 transition-all duration-200 ease-out shadow-xs hover:shadow-xl hover:shadow-yellow-500/10 hover:-translate-y-1.5 flex flex-col overflow-hidden active:translate-y-0"
    >
      {/* Card Image Area with smooth zoom effect */}
      <div className="relative aspect-4/3 sm:aspect-1/1 bg-slate-100 overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 pointer-events-none">
          <div className="flex flex-col gap-1 items-start">
            {product.featured && (
              <span className="bg-yellow-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-md shadow-xs border border-yellow-500/30">
                Featured
              </span>
            )}
            <span className="bg-white/95 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs backdrop-blur-xs border border-slate-200">
              {product.condition}
            </span>
          </div>

          {/* Favorite Toggle Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(product.id);
            }}
            className={`pointer-events-auto p-2 rounded-xl transition-all duration-150 active:scale-90 shadow-xs cursor-pointer ${
              isSaved
                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                : 'bg-white/90 text-slate-500 hover:text-rose-500 hover:bg-white border border-slate-200/80 hover:scale-105'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save for later'}
            aria-label="Save product"
          >
            <Heart className={`w-4 h-4 transition-transform duration-150 ${isSaved ? 'fill-rose-600 scale-110' : ''}`} />
          </button>
        </div>

        {/* Stock & Warranty Pill at bottom of image */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] pointer-events-none">
          <span className="bg-slate-950/85 text-yellow-300 font-semibold px-2 py-0.5 rounded-md backdrop-blur-xs text-[10px] border border-yellow-400/20">
            {product.warranty}
          </span>
          <span className="bg-white/90 text-slate-700 font-semibold px-1.5 py-0.5 rounded-md backdrop-blur-xs text-[10px]">
            {product.inStock ? `${product.stockCount} left` : 'Out of stock'}
          </span>
        </div>
      </div>

      {/* Card Details Body */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        {/* Category & Last Updated Header */}
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <span className="font-bold text-slate-900 bg-yellow-100/80 border border-yellow-300/60 px-2 py-0.5 rounded-md">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-slate-400">
            <Clock className="w-3 h-3" />
            <span>{product.lastUpdated}</span>
          </div>
        </div>

        {/* Product Title */}
        <div>
          <h3
            onClick={() => onSelectProduct(product)}
            className="font-bold text-slate-950 text-sm sm:text-base leading-snug line-clamp-2 hover:text-yellow-600 cursor-pointer transition-colors duration-150"
          >
            {product.name}
          </h3>
          <p className="text-slate-500 text-xs line-clamp-1 mt-1">
            {product.keySpecs.join(' • ')}
          </p>
        </div>

        {/* Pricing Block */}
        <div className="pt-1 border-t border-slate-100 flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-black text-slate-950 tracking-tight">
                {formatPrice(product.priceETB)}
              </span>
              <span className="text-xs font-black text-yellow-600 bg-yellow-50/80 px-1 py-0.5 rounded">ETB</span>
            </div>
            {product.originalPriceETB && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(product.originalPriceETB)} ETB
              </span>
            )}
          </div>
          <span className="text-[10px] text-slate-400 font-medium font-mono">
            {product.inquiryCode}
          </span>
        </div>

        {/* Shop Name and Location Information */}
        <div className="bg-slate-50/80 rounded-xl p-2.5 space-y-1.5 border border-slate-100/90 group-hover:bg-yellow-50/20 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-hidden">
              <span className="text-xs font-bold text-slate-800 truncate">
                {product.shopName}
              </span>
              {product.shopVerified && (
                <ShieldCheck
                  className="w-3.5 h-3.5 text-yellow-600 shrink-0"
                  title="Verified Retail Shop"
                />
              )}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-600 font-medium shrink-0">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{product.shopRating}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{product.location}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-5 gap-2 pt-1">
          {/* Quick View Button */}
          <button
            type="button"
            onClick={() => onSelectProduct(product)}
            className="col-span-2 py-2.5 px-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-950 hover:border-slate-300 transition-all duration-150 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>

          {/* Contact to Buy Primary Button */}
          <a
            id={`contact-to-buy-${product.id}`}
            href={generateTelegramLink(product)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              onContactToBuy(product);
            }}
            className="col-span-3 py-2.5 px-3 rounded-xl text-xs font-black bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-slate-950 transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md hover:shadow-yellow-400/20 select-none cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-slate-950" />
            <span>Contact to Buy</span>
          </a>
        </div>
      </div>
    </div>
  );
};
