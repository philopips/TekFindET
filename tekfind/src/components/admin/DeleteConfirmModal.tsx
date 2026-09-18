import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Product } from '../../types';

interface DeleteConfirmModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  product,
  isOpen,
  onClose,
  onConfirm,
  isDeleting
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-extrabold text-slate-900">
            Delete Product Listing?
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Are you sure you want to permanently delete{' '}
            <strong className="text-slate-800 font-bold">"{product.name}"</strong>?
            This will immediately remove the listing from Cloud Firestore and the public Addis Ababa marketplace.
          </p>
        </div>

        <div className="p-3 bg-slate-50 rounded-2xl flex items-center gap-3 border border-slate-100">
          <img
            src={product.images[0] || 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=300&q=80'}
            alt={product.name}
            className="w-12 h-12 rounded-xl object-cover bg-white shrink-0 border border-slate-200"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-800 truncate">{product.name}</p>
            <p className="text-[11px] text-slate-500">{product.shopName} • {product.subCity}</p>
            <p className="text-xs font-black text-slate-950 mt-0.5"><span className="text-yellow-600">ETB</span> {product.priceETB.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-all active:scale-95 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2.5 rounded-xl text-xs font-black text-white bg-rose-600 hover:bg-rose-700 transition-all active:scale-95 flex items-center gap-2 shadow-xs cursor-pointer"
          >
            {isDeleting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Delete Product</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
