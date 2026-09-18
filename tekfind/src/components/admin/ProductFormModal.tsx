import React, { useState, useEffect } from 'react';
import {
  X,
  Upload,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Image as ImageIcon,
  Sparkles,
  Link,
  Layers,
  MapPin,
  Tag,
  DollarSign,
  Info
} from 'lucide-react';
import { Product, ProductCategory, ProductSpec } from '../../types';
import { uploadProductImage } from '../../services/productService';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productData: Omit<Product, 'id'>) => Promise<void>;
  initialProduct?: Product | null;
  isSubmitting: boolean;
}

const CATEGORIES: ProductCategory[] = [
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

const ADDIS_SUBCITIES = [
  'Bole, Addis Ababa',
  'Piazza / Arada, Addis Ababa',
  'Merkato, Addis Ababa',
  'Megenagna, Addis Ababa',
  'Mexico, Addis Ababa',
  'CMC / Ayat, Addis Ababa',
  'Kazanchis, Addis Ababa',
  'Sarbet / Old Airport, Addis Ababa',
  'Gerji / Imperial, Addis Ababa',
  'Gotera / Kera, Addis Ababa'
];

const CURATED_IMAGE_PRESETS: { name: string; url: string }[] = [
  {
    name: 'iPhone 15 Pro',
    url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'MacBook Pro',
    url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Sony WH-1000XM5',
    url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Smart Watch',
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'PlayStation 5',
    url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: '4K Smart TV',
    url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1000&q=80'
  }
];

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialProduct,
  isSubmitting
}) => {
  const isEditing = Boolean(initialProduct);

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Phones');
  const [priceETB, setPriceETB] = useState<number | ''>('');
  const [originalPriceETB, setOriginalPriceETB] = useState<number | ''>('');
  const [shopName, setShopName] = useState('');
  const [shopVerified, setShopVerified] = useState(true);
  const [shopRating, setShopRating] = useState(4.9);
  const [shopReviewCount, setShopReviewCount] = useState(12);
  const [location, setLocation] = useState('');
  const [subCity, setSubCity] = useState(ADDIS_SUBCITIES[0]);
  const [condition, setCondition] = useState<Product['condition']>('Brand New (Sealed)');
  const [warranty, setWarranty] = useState('1 Year Official Warranty');
  const [description, setDescription] = useState('');
  const [inStock, setInStock] = useState(true);
  const [stockCount, setStockCount] = useState<number | ''>(5);
  const [featured, setFeatured] = useState(false);
  const [trending, setTrending] = useState(false);

  // Images state
  const [images, setImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Key specs string tags
  const [keySpecs, setKeySpecs] = useState<string[]>([]);
  const [keySpecInput, setKeySpecInput] = useState('');

  // Structured Specs
  const [specs, setSpecs] = useState<ProductSpec[]>([]);
  const [specLabel, setSpecLabel] = useState('');
  const [specValue, setSpecValue] = useState('');

  const [formError, setFormError] = useState<string | null>(null);

  // Load initial product data when editing
  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setBrand(initialProduct.brand);
      setCategory(initialProduct.category);
      setPriceETB(initialProduct.priceETB);
      setOriginalPriceETB(initialProduct.originalPriceETB || '');
      setShopName(initialProduct.shopName);
      setShopVerified(initialProduct.shopVerified ?? true);
      setShopRating(initialProduct.shopRating || 4.9);
      setShopReviewCount(initialProduct.shopReviewCount || 10);
      setLocation(initialProduct.location);
      setSubCity(initialProduct.subCity);
      setCondition(initialProduct.condition);
      setWarranty(initialProduct.warranty);
      setDescription(initialProduct.description);
      setInStock(initialProduct.inStock);
      setStockCount(initialProduct.stockCount);
      setFeatured(initialProduct.featured);
      setTrending(Boolean(initialProduct.trending));
      setImages(initialProduct.images && initialProduct.images.length > 0 ? [...initialProduct.images] : []);
      setKeySpecs(initialProduct.keySpecs ? [...initialProduct.keySpecs] : []);
      setSpecs(initialProduct.specs ? [...initialProduct.specs] : []);
    } else {
      // Reset defaults for new product
      setName('');
      setBrand('');
      setCategory('Phones');
      setPriceETB('');
      setOriginalPriceETB('');
      setShopName('Addis Tech Hub');
      setShopVerified(true);
      setShopRating(4.9);
      setShopReviewCount(15);
      setLocation('Bole Medhanialem Mall, 2nd Floor #204');
      setSubCity(ADDIS_SUBCITIES[0]);
      setCondition('Brand New (Sealed)');
      setWarranty('1 Year Official Warranty');
      setDescription('');
      setInStock(true);
      setStockCount(5);
      setFeatured(false);
      setTrending(false);
      setImages([
        'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=80'
      ]);
      setKeySpecs(['Original Sealed', 'Local Warranty', 'Ethio Telecom Verified']);
      setSpecs([
        { label: 'Condition', value: 'Brand New (Sealed)' },
        { label: 'Warranty', value: '1 Year Warranty' }
      ]);
    }
    setFormError(null);
  }, [initialProduct, isOpen]);

  if (!isOpen) return null;

  // Add an image by URL
  const handleAddImageUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrlInput.trim()) return;
    setImages((prev) => [...prev, imageUrlInput.trim()]);
    setImageUrlInput('');
  };

  // Upload an image file (Firebase Storage / Data URL fallback)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingImage(true);
    setFormError(null);
    try {
      const file = files[0];
      const url = await uploadProductImage(file);
      setImages((prev) => [...prev, url]);
    } catch (err: any) {
      setFormError(err.message || 'Failed to upload image');
    } finally {
      setIsUploadingImage(false);
      // Reset input
      e.target.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Key Spec tag handlers
  const handleAddKeySpec = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keySpecInput.trim()) return;
    setKeySpecs((prev) => [...prev, keySpecInput.trim()]);
    setKeySpecInput('');
  };

  const handleRemoveKeySpec = (idx: number) => {
    setKeySpecs((prev) => prev.filter((_, i) => i !== idx));
  };

  // Structured Spec handlers
  const handleAddSpec = (e: React.FormEvent) => {
    e.preventDefault();
    if (!specLabel.trim() || !specValue.trim()) return;
    setSpecs((prev) => [...prev, { label: specLabel.trim(), value: specValue.trim() }]);
    setSpecLabel('');
    setSpecValue('');
  };

  const handleRemoveSpec = (idx: number) => {
    setSpecs((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError('Product name is required.');
      return;
    }
    if (!brand.trim()) {
      setFormError('Brand name is required (e.g. Apple, Samsung, Sony).');
      return;
    }
    if (!priceETB || Number(priceETB) <= 0) {
      setFormError('Please enter a valid price in ETB.');
      return;
    }
    if (!shopName.trim()) {
      setFormError('Shop name is required.');
      return;
    }
    if (images.length === 0) {
      setFormError('Please provide at least one product image.');
      return;
    }

    const finalProductData: Omit<Product, 'id'> = {
      name: name.trim(),
      brand: brand.trim(),
      category,
      priceETB: Number(priceETB),
      originalPriceETB: originalPriceETB ? Number(originalPriceETB) : undefined,
      shopName: shopName.trim(),
      shopVerified,
      shopRating: Number(shopRating) || 4.9,
      shopReviewCount: Number(shopReviewCount) || 5,
      location: location.trim() || 'Addis Ababa',
      subCity,
      condition,
      warranty: warranty.trim() || 'Shop Warranty',
      lastUpdated: 'Just now',
      images,
      featured,
      trending,
      description: description.trim() || `${brand} ${name} available in Addis Ababa with transparent pricing and warranty.`,
      keySpecs: keySpecs.length > 0 ? keySpecs : ['Authentic Electronics', 'Ethiopian Tech Warranty'],
      specs: specs.length > 0 ? specs : [{ label: 'Brand', value: brand }, { label: 'Category', value: category }],
      inStock,
      stockCount: inStock ? (Number(stockCount) || 1) : 0,
      inquiryCode: initialProduct?.inquiryCode || `TK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    };

    try {
      await onSubmit(finalProductData);
      onClose();
    } catch (err: any) {
      setFormError(err.message || 'Failed to save product in Firestore.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full my-8 shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 sticky top-0 z-10">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-950 bg-yellow-400 px-2.5 py-0.5 rounded-md shadow-2xs">
              {isEditing ? 'Edit Listing' : 'New Listing'}
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">
              {isEditing ? `Edit: ${initialProduct?.name}` : 'Add Electronics Product'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-8 text-xs sm:text-sm">
          {formError && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{formError}</span>
            </div>
          )}

          <form id="product-form" onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Basic Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold border-b border-slate-100 pb-2">
                <Tag className="w-4 h-4 text-yellow-600" />
                <span className="text-sm">1. Product Information</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. iPhone 15 Pro Max 256GB Natural Titanium"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-hidden font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Brand *
                  </label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="e.g. Apple, Samsung, Sony, Dell"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-hidden font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-hidden font-medium text-slate-900 bg-white"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Condition
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as Product['condition'])}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-hidden font-medium text-slate-900 bg-white"
                  >
                    <option value="Brand New (Sealed)">Brand New (Sealed)</option>
                    <option value="Open Box">Open Box</option>
                    <option value="Refurbished">Refurbished</option>
                    <option value="Gently Used">Gently Used</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Warranty Policy
                  </label>
                  <input
                    type="text"
                    value={warranty}
                    onChange={(e) => setWarranty(e.target.value)}
                    placeholder="e.g. 1 Year Official Warranty, 6 Months Shop Warranty"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-hidden font-medium text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Pricing & Inventory Availability */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold border-b border-slate-100 pb-2">
                <DollarSign className="w-4 h-4 text-yellow-600" />
                <span className="text-sm">2. Pricing & Availability</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Price (ETB) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={priceETB}
                    onChange={(e) => setPriceETB(e.target.value ? Number(e.target.value) : '')}
                    placeholder="e.g. 185000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-hidden font-black text-slate-950 text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Original / Regular Price (ETB, Optional)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={originalPriceETB}
                    onChange={(e) => setOriginalPriceETB(e.target.value ? Number(e.target.value) : '')}
                    placeholder="e.g. 195000 (shows strike-through discount)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-hidden text-slate-600"
                  />
                </div>

                {/* In Stock Toggle */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 block">Stock Availability</span>
                    <span className="text-[11px] text-slate-500">
                      {inStock ? 'Item is available for buyer inquiries' : 'Marked as Out of Stock'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setInStock(!inStock)}
                    className={`w-12 h-6.5 rounded-full transition-colors relative p-0.5 flex items-center cursor-pointer ${
                      inStock ? 'bg-yellow-400' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`w-5.5 h-5.5 rounded-full bg-slate-950 shadow-xs transition-transform transform ${
                        inStock ? 'translate-x-5.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Stock Count */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    disabled={!inStock}
                    value={stockCount}
                    onChange={(e) => setStockCount(e.target.value ? Number(e.target.value) : '')}
                    placeholder="e.g. 5"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-hidden text-slate-900 disabled:opacity-50"
                  />
                </div>

                {/* Featured Status Toggle */}
                <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/60 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-amber-950 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Featured Product</span>
                    </span>
                    <span className="text-[11px] text-amber-800">
                      Highlighted on the top of the Addis Ababa marketplace
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFeatured(!featured)}
                    className={`w-12 h-6.5 rounded-full transition-colors relative p-0.5 flex items-center ${
                      featured ? 'bg-amber-500' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`w-5.5 h-5.5 rounded-full bg-white shadow-xs transition-transform transform ${
                        featured ? 'translate-x-5.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Trending Badge Toggle */}
                <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-200/60 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-purple-950 flex items-center gap-1.5">
                      <span>Trending Badge</span>
                    </span>
                    <span className="text-[11px] text-purple-800">
                      Show high-demand flame badge
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTrending(!trending)}
                    className={`w-12 h-6.5 rounded-full transition-colors relative p-0.5 flex items-center ${
                      trending ? 'bg-purple-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`w-5.5 h-5.5 rounded-full bg-white shadow-xs transition-transform transform ${
                        trending ? 'translate-x-5.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Section 3: Shop & Location */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold border-b border-slate-100 pb-2">
                <MapPin className="w-4 h-4 text-yellow-600" />
                <span className="text-sm">3. Shop & Addis Location</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Shop Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    placeholder="e.g. Bole Electronics Center"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-hidden font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Sub-City (Addis Ababa) *
                  </label>
                  <select
                    value={subCity}
                    onChange={(e) => setSubCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-hidden font-medium text-slate-900 bg-white"
                  >
                    {ADDIS_SUBCITIES.map((sc) => (
                      <option key={sc} value={sc}>
                        {sc}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">
                    Shop Mall / Physical Address
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Edna Mall Ground Floor #12, Bole Road"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-hidden font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Shop Rating (1.0 - 5.0)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={shopRating}
                    onChange={(e) => setShopRating(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-hidden text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Verified Seller Status
                  </label>
                  <div className="flex items-center gap-3 pt-2">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={shopVerified}
                        onChange={(e) => setShopVerified(e.target.checked)}
                        className="w-4 h-4 rounded-md text-yellow-500 focus:ring-yellow-400 accent-yellow-400"
                      />
                      <span className="font-semibold text-slate-700">Display Verified Shop Badge</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Product Images (Storage upload & URLs) */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold border-b border-slate-100 pb-2">
                <ImageIcon className="w-4 h-4 text-yellow-600" />
                <span className="text-sm">4. Product Photos</span>
              </div>

              {/* Upload controls */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* File Upload Box */}
                  <label className="border-2 border-dashed border-slate-200 hover:border-yellow-400 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-slate-50/50 hover:bg-yellow-50/30 active:scale-98">
                    <Upload className={`w-6 h-6 mb-1 text-slate-400 ${isUploadingImage ? 'animate-bounce text-yellow-500' : ''}`} />
                    <span className="font-bold text-slate-700">
                      {isUploadingImage ? 'Uploading Image...' : 'Upload Image File'}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      Supports JPG, PNG, WEBP (saved to Firebase)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={isUploadingImage}
                      className="hidden"
                    />
                  </label>

                  {/* Add URL Box */}
                  <div className="border border-slate-200 rounded-2xl p-4 flex flex-col justify-between bg-slate-50/50 space-y-2">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <Link className="w-3.5 h-3.5 text-slate-400" />
                      <span>Add Photo by Direct URL</span>
                    </span>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={imageUrlInput}
                        onChange={(e) => setImageUrlInput(e.target.value)}
                        placeholder="https://example.com/photo.jpg"
                        className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs outline-hidden focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                      />
                      <button
                        type="button"
                        onClick={handleAddImageUrl}
                        className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-3 py-1.5 rounded-xl text-xs shrink-0 active:scale-95 transition-all cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Quick Curated Photo Presets:</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {CURATED_IMAGE_PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setImages((prev) => [...prev, preset.url])}
                        className="text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        + {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Selected Images Grid */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-slate-500">
                    Listing Photos ({images.length})
                  </span>
                  {images.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {images.map((imgUrl, idx) => (
                        <div
                          key={`img-${idx}`}
                          className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-square shadow-xs"
                        >
                          <img
                            src={imgUrl}
                            alt={`Preview ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {idx === 0 && (
                            <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md backdrop-blur-xs">
                              Cover
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-600/90 text-white opacity-90 group-hover:opacity-100 hover:bg-rose-700 transition-all shadow-md"
                            title="Remove image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 text-xs italic">
                      No photos added yet. Upload a file or paste a URL above.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 5: Description & Specifications */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold border-b border-slate-100 pb-2">
                <Layers className="w-4 h-4 text-yellow-600" />
                <span className="text-sm">5. Description & Tech Specifications</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Product Description
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide details on features, packaging, accessories included, carrier unlocked status, and condition..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-hidden text-slate-900 leading-relaxed font-normal"
                />
              </div>

              {/* Key Specs Tags */}
              <div className="space-y-2">
                <label className="block font-bold text-slate-700">
                  Key Specs Highlights (Badges)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={keySpecInput}
                    onChange={(e) => setKeySpecInput(e.target.value)}
                    placeholder="e.g. 512GB SSD, 16GB RAM, Apple M3 Chip"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 outline-hidden focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={handleAddKeySpec}
                    className="bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs shrink-0 cursor-pointer transition-all"
                  >
                    + Add Badge
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {keySpecs.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 bg-yellow-50 text-slate-900 border border-yellow-200 font-bold text-xs px-2.5 py-1 rounded-lg"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveKeySpec(idx)}
                        className="text-slate-400 hover:text-slate-700 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Detailed Specs Table */}
              <div className="space-y-2 pt-2">
                <label className="block font-bold text-slate-700">
                  Detailed Specifications Table
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={specLabel}
                    onChange={(e) => setSpecLabel(e.target.value)}
                    placeholder="Spec Name (e.g. Display, Battery, Camera)"
                    className="px-3.5 py-2 rounded-xl border border-slate-200 outline-hidden focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-slate-900"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={specValue}
                      onChange={(e) => setSpecValue(e.target.value)}
                      placeholder="Value (e.g. 6.7-inch OLED 120Hz)"
                      className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 outline-hidden focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={handleAddSpec}
                      className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-3 py-2 rounded-xl text-xs shrink-0 active:scale-95 transition-all cursor-pointer"
                    >
                      Add Row
                    </button>
                  </div>
                </div>

                {specs.length > 0 && (
                  <div className="border border-slate-100 rounded-2xl overflow-hidden mt-3">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                        <tr>
                          <th className="px-4 py-2">Specification</th>
                          <th className="px-4 py-2">Details</th>
                          <th className="px-4 py-2 w-10 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {specs.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="px-4 py-2 font-bold text-slate-700">{item.label}</td>
                            <td className="px-4 py-2 text-slate-600">{item.value}</td>
                            <td className="px-4 py-2 text-right">
                              <button
                                type="button"
                                onClick={() => handleRemoveSpec(idx)}
                                className="text-slate-400 hover:text-rose-600 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/80 sticky bottom-0 z-10">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-200/60 active:scale-95 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="product-form"
            disabled={isSubmitting}
            className="bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-slate-950 font-black px-6 py-2.5 rounded-xl transition-all shadow-md shadow-yellow-500/20 flex items-center gap-2 disabled:opacity-50 active:scale-95 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                <span>Saving to Firestore...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4 text-slate-950" />
                <span>{isEditing ? 'Update Listing' : 'Publish Product'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
