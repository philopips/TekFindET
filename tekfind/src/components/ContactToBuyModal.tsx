import React, { useState } from 'react';
import {
  X,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Store,
  ShieldCheck,
  MapPin,
  PhoneCall,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Product } from '../types';
import {
  TELEGRAM_USERNAME,
  generateTelegramLink,
  generateTelegramMessage
} from '../utils/telegram';
import { recordInquiry } from '../services/inquiryService';

interface ContactToBuyModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ContactToBuyModal: React.FC<ContactToBuyModalProps> = ({
  product,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [openedTelegram, setOpenedTelegram] = useState(false);

  if (!product) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  const defaultMessage = generateTelegramMessage(product);
  const telegramLink = generateTelegramLink(product);
  const conciergePhone = '+251 911 234 567';

  const handleCopyMessage = () => {
    navigator.clipboard?.writeText(defaultMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTelegramClick = () => {
    setOpenedTelegram(true);
    window.open(telegramLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-yellow-400 text-slate-950 flex items-center justify-center font-bold shadow-xs">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-950 text-sm">
                Contact to Buy on Telegram
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                TekFind Concierge Service • Direct Shop Connection
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-200/70 rounded-lg transition-all active:scale-90 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          {/* Selected Product Summary Card */}
          <div className="flex gap-3 bg-slate-50 rounded-xl p-3 border border-slate-200/80 items-center">
            <img
              src={product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 object-cover rounded-lg border border-slate-200 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-mono text-slate-950 bg-yellow-100 border border-yellow-300/80 px-1.5 py-0.5 rounded font-black">
                {product.inquiryCode}
              </span>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate mt-0.5">
                {product.name}
              </h4>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="font-black text-sm text-slate-950">
                  {formatPrice(product.priceETB)} <span className="text-[10px] text-yellow-600">ETB</span>
                </span>
                <span className="text-[11px] text-slate-400">
                  • {product.shopName}
                </span>
              </div>
            </div>
          </div>

          {/* How Concierge Works: 4 Simple Steps */}
          <div className="space-y-2 text-xs">
            <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-slate-500">
              How Your Purchase Works (Zero Risk)
            </h5>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-yellow-50/70 border border-yellow-200 text-slate-800">
                <div className="w-5 h-5 rounded-full bg-yellow-400 text-slate-950 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  1
                </div>
                <div>
                  <strong className="block text-slate-950 font-bold">You reach out on Telegram</strong>
                  <span className="text-slate-600 text-[11px]">
                    Send us the inquiry code. We confirm current stock with {product.shopName} in minutes.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-800">
                <div className="w-5 h-5 rounded-full bg-slate-800 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <strong className="block text-slate-900 font-bold">We freeze the price & reserve item</strong>
                  <span className="text-slate-600 text-[11px]">
                    No surprise price changes. We ensure the shop holds your exact unit.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-800">
                <div className="w-5 h-5 rounded-full bg-slate-800 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <strong className="block text-slate-900 font-bold">Pickup or Addis Delivery</strong>
                  <span className="text-slate-600 text-[11px]">
                    Walk into the shop in {product.subCity}, or our courier delivers directly to your door.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-800">
                <div className="w-5 h-5 rounded-full bg-slate-800 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <strong className="block text-slate-900 font-bold">Inspect First, Pay Later</strong>
                  <span className="text-slate-600 text-[11px]">
                    Inspect serials & test device. Pay with Telebirr, CBE Birr, or cash only when 100% satisfied.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pre-formatted Message Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Pre-filled Telegram Message:</span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="text-yellow-700 hover:text-yellow-900 font-bold flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-yellow-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-slate-900 text-slate-200 rounded-xl p-3 text-xs font-mono leading-relaxed whitespace-pre-wrap border border-slate-800 select-all">
              {defaultMessage}
            </div>
          </div>

          {/* Direct Actions */}
          <div className="space-y-2 pt-1">
            <a
              id="modal-open-telegram-btn"
              href={telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setOpenedTelegram(true);
                recordInquiry(product);
              }}
              className="w-full py-3.5 px-4 rounded-xl font-black text-sm bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-slate-950 transition-all duration-150 flex items-center justify-center gap-2 shadow-md hover:shadow-yellow-400/25 text-center select-none active:scale-[0.98] cursor-pointer"
            >
              <Send className="w-4 h-4 text-slate-950" />
              <span>Open Telegram to Contact ({TELEGRAM_USERNAME})</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80 text-slate-950" />
            </a>

            {openedTelegram && (
              <div className="p-2.5 rounded-xl bg-yellow-50 border border-yellow-200 text-slate-900 text-xs flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-yellow-600 shrink-0" />
                <span>
                  Telegram opened! If it didn't launch automatically, message <strong>{TELEGRAM_USERNAME}</strong> directly with code <strong>{product.inquiryCode}</strong>.
                </span>
              </div>
            )}

            {/* Alternative Phone concierge */}
            <div className="text-center pt-1">
              <span className="text-xs text-slate-500">
                Prefer calling? Phone concierge: <strong className="text-slate-800">{conciergePhone}</strong> (9 AM - 8 PM)
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1 text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-yellow-600" />
            <span>Zero buyer markup</span>
          </span>
          <span>TekFind Commission Model</span>
        </div>
      </div>
    </div>
  );
};
