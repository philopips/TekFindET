import React, { useState, useMemo, useEffect } from 'react';
import {
  Shield,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Edit2,
  Trash2,
  Star,
  CheckCircle2,
  XCircle,
  ExternalLink,
  LogOut,
  Package,
  Layers,
  MapPin,
  TrendingUp,
  RefreshCw,
  AlertCircle,
  Eye,
  Store,
  Sparkles,
  Send,
  MessageSquare
} from 'lucide-react';
import { Product, ProductCategory, Inquiry } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import {
  addProduct,
  updateProduct,
  deleteProduct,
  toggleFeatured,
  toggleAvailability
} from '../../services/productService';
import {
  subscribeInquiries,
  computeInquiryStats,
  InquiryStats
} from '../../services/inquiryService';
import { ProductFormModal } from './ProductFormModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { InquiryStatsSection } from './InquiryStatsSection';

interface AdminDashboardProps {
  products: Product[];
  loading: boolean;
  onViewPublicStore: () => void;
  onSeedDatabase?: () => Promise<void>;
  isSeeding?: boolean;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  loading,
  onViewPublicStore,
  onSeedDatabase,
  isSeeding
}) => {
  const { user, logout } = useAuth();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [stockFilter, setStockFilter] = useState<'all' | 'inStock' | 'outOfStock'>('all');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc'>('featured');

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Status message / toast
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showFeedback = (type: 'success' | 'error', text: string) => {
    setFeedback({ type, text });
    setTimeout(() => {
      setFeedback(null);
    }, 4000);
  };

  // KPI calculations
  const totalProducts = products.length;
  const inStockCount = useMemo(() => products.filter((p) => p.inStock).length, [products]);
  const outOfStockCount = totalProducts - inStockCount;
  const featuredCount = useMemo(() => products.filter((p) => p.featured).length, [products]);
  const totalValueETB = useMemo(
    () => products.reduce((sum, p) => sum + (p.priceETB * (p.stockCount || 1)), 0),
    [products]
  );

  // Real-time Inquiry Tracking & Analytics state
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeInquiries(
      (items) => {
        setInquiries(items);
        setInquiriesLoading(false);
      },
      (err) => {
        console.warn('Inquiries listener notice:', err);
        setInquiriesLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const inquiryStats = useMemo(() => computeInquiryStats(inquiries), [inquiries]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = product.name.toLowerCase().includes(q);
          const matchesBrand = product.brand.toLowerCase().includes(q);
          const matchesShop = product.shopName.toLowerCase().includes(q);
          const matchesSubCity = product.subCity.toLowerCase().includes(q);
          const matchesCode = product.inquiryCode.toLowerCase().includes(q);
          if (!matchesName && !matchesBrand && !matchesShop && !matchesSubCity && !matchesCode) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== 'All' && product.category !== selectedCategory) {
          return false;
        }

        // Stock filter
        if (stockFilter === 'inStock' && !product.inStock) return false;
        if (stockFilter === 'outOfStock' && product.inStock) return false;

        // Featured filter
        if (featuredOnly && !product.featured) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          if (a.featured !== b.featured) return a.featured ? -1 : 1;
          return b.priceETB - a.priceETB;
        }
        if (sortBy === 'price-asc') return a.priceETB - b.priceETB;
        if (sortBy === 'price-desc') return b.priceETB - a.priceETB;
        return 0;
      });
  }, [products, searchQuery, selectedCategory, stockFilter, featuredOnly, sortBy]);

  // Open Create Form
  const handleOpenCreate = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  // Open Edit Form
  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  // Submit Add or Edit Form
  const handleFormSubmit = async (productData: Omit<Product, 'id'>) => {
    setIsSubmittingForm(true);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        showFeedback('success', `Updated "${productData.name}" successfully!`);
      } else {
        await addProduct(productData);
        showFeedback('success', `Added "${productData.name}" to marketplace catalog!`);
      }
      setIsFormOpen(false);
      setEditingProduct(null);
    } catch (err: any) {
      showFeedback('error', err.message || 'Failed to save product in Firestore.');
      throw err;
    } finally {
      setIsSubmittingForm(false);
    }
  };

  // Open Delete confirmation
  const handleOpenDelete = (product: Product) => {
    setDeletingProduct(product);
    setIsDeleteOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!deletingProduct) return;
    setIsDeleting(true);
    try {
      await deleteProduct(deletingProduct.id);
      showFeedback('success', `Deleted "${deletingProduct.name}" from catalog.`);
      setIsDeleteOpen(false);
      setDeletingProduct(null);
    } catch (err: any) {
      showFeedback('error', err.message || 'Failed to delete product.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Quick Featured Toggle
  const handleToggleFeatured = async (product: Product) => {
    try {
      await toggleFeatured(product.id, product.featured);
      showFeedback(
        'success',
        `"${product.name}" is now ${!product.featured ? 'Featured' : 'Standard'}`
      );
    } catch (err: any) {
      showFeedback('error', 'Failed to update featured status: ' + (err.message || ''));
    }
  };

  // Quick Availability Toggle
  const handleToggleAvailability = async (product: Product) => {
    try {
      await toggleAvailability(product.id, product.inStock);
      showFeedback(
        'success',
        `"${product.name}" marked as ${!product.inStock ? 'In Stock' : 'Out of Stock'}`
      );
    } catch (err: any) {
      showFeedback('error', 'Failed to update stock status: ' + (err.message || ''));
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-30 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/app-icon.png"
                alt="TekFind"
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-yellow-400/40"
                referrerPolicy="no-referrer"
              />
              <span className="text-lg font-black tracking-tight text-white">
                TekFind<span className="text-yellow-400">.et</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-yellow-400/15 border border-yellow-400/30 text-yellow-300 text-[11px] font-black px-2.5 py-0.5 rounded-full">
                <Shield className="w-3 h-3" />
                <span>Admin Dashboard</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Public Store button */}
            <button
              type="button"
              onClick={onViewPublicStore}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-xl transition-all active:scale-95 border border-slate-700 cursor-pointer"
            >
              <Store className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Public Store</span>
            </button>

            {/* Add Product Button */}
            <button
              type="button"
              onClick={handleOpenCreate}
              className="flex items-center gap-1.5 text-xs font-black text-slate-950 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 px-3.5 py-2 rounded-xl transition-all active:scale-95 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>Add Product</span>
            </button>

            {/* Current user & Logout */}
            <div className="h-6 w-px bg-slate-800 hidden sm:block" />

            <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span className="truncate max-w-[160px]">{user?.email || 'Admin'}</span>
            </div>

            <button
              type="button"
              onClick={logout}
              title="Sign Out"
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Floating Feedback notification */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl flex items-center justify-between text-xs font-bold shadow-lg transition-all animate-in slide-in-from-top-4 ${
              feedback.type === 'success'
                ? 'bg-slate-900 text-yellow-300 border border-yellow-400/40'
                : 'bg-rose-900 text-rose-100 border border-rose-700'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-300 shrink-0" />
              )}
              <span>{feedback.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setFeedback(null)}
              className="text-white/60 hover:text-white cursor-pointer"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Top KPIs Summary Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <Package className="w-4 h-4 text-slate-500" />
              <span>Total Catalog</span>
            </span>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              {totalProducts}
            </p>
            <span className="text-[11px] text-slate-500">Firestore products</span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-yellow-500" />
              <span>In Stock</span>
            </span>
            <p className="text-2xl sm:text-3xl font-black text-slate-950 mt-2">
              {inStockCount}
            </p>
            <span className="text-[11px] text-slate-600 font-semibold">Active listings</span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-xs font-bold text-rose-500 flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-500" />
              <span>Out of Stock</span>
            </span>
            <p className="text-2xl sm:text-3xl font-black text-rose-600 mt-2">
              {outOfStockCount}
            </p>
            <span className="text-[11px] text-slate-400">Needs inventory restock</span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-xs font-bold text-amber-600 flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Featured</span>
            </span>
            <p className="text-2xl sm:text-3xl font-black text-amber-700 mt-2">
              {featuredCount}
            </p>
            <span className="text-[11px] text-slate-400">Highlighted on top</span>
          </div>

          <div className="col-span-2 lg:col-span-1 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-yellow-600" />
              <span>Inventory Value</span>
            </span>
            <p className="text-lg sm:text-xl font-black text-slate-900 mt-2 truncate">
              ETB {Math.round(totalValueETB / 1000).toLocaleString()}k
            </p>
            <span className="text-[11px] text-slate-400">Estimated Addis retail</span>
          </div>
        </div>

        {/* Telegram Inquiry Tracking & Statistics Section */}
        <InquiryStatsSection
          inquiries={inquiries}
          stats={inquiryStats}
          loading={inquiriesLoading}
          products={products}
        />

        {/* Action & Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by title, brand, shop name, or TK code..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Category selector */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden focus:border-yellow-400 cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Phones">Phones</option>
                <option value="Laptops">Laptops</option>
                <option value="Audio">Audio</option>
                <option value="Smartwatches">Smartwatches</option>
                <option value="TVs">TVs</option>
                <option value="Gaming">Gaming</option>
                <option value="Accessories">Accessories</option>
                <option value="Cameras">Cameras</option>
                <option value="Other">Other</option>
              </select>

              {/* Stock status filter */}
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value as any)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden focus:border-yellow-400 cursor-pointer"
              >
                <option value="all">All Availability</option>
                <option value="inStock">In Stock Only</option>
                <option value="outOfStock">Out of Stock Only</option>
              </select>

              {/* Featured toggle button */}
              <button
                type="button"
                onClick={() => setFeaturedOnly(!featuredOnly)}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 border cursor-pointer ${
                  featuredOnly
                    ? 'bg-yellow-400 text-slate-950 border-yellow-500 font-black shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${featuredOnly ? 'fill-slate-950 text-slate-950' : 'text-amber-500'}`} />
                <span>Featured Only</span>
              </button>

              {/* Seed / Reset DB button (if needed) */}
              {onSeedDatabase && (
                <button
                  type="button"
                  onClick={onSeedDatabase}
                  disabled={isSeeding}
                  title="Seed or restore sample Addis electronics products into Firestore"
                  className="px-3 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 active:scale-95 border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Seed Catalog</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Products Table Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h3 className="text-sm font-black text-slate-900">
                Managed Products ({filteredProducts.length})
              </h3>
              <p className="text-[11px] text-slate-500">
                Click Featured stars or Availability badges to toggle them instantly in Firestore.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenCreate}
              className="text-xs font-black text-slate-900 hover:text-slate-950 bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 px-3 py-1.5 rounded-xl transition-all active:scale-95 shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New</span>
            </button>
          </div>

          {loading ? (
            <div className="py-24 text-center">
              <div className="w-8 h-8 border-3 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs font-bold text-slate-500">Loading products from Firestore...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-16 px-4 text-center max-w-md mx-auto space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Package className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">No products found</h4>
              <p className="text-xs text-slate-500">
                No electronics listings matched your search criteria or the catalog is empty.
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleOpenCreate}
                  className="px-4 py-2 rounded-xl text-xs font-black bg-yellow-400 text-slate-950 hover:bg-yellow-300 active:bg-yellow-500 active:scale-95 transition-all shadow-xs cursor-pointer"
                >
                  + Add First Product
                </button>
                {onSeedDatabase && (
                  <button
                    type="button"
                    onClick={onSeedDatabase}
                    disabled={isSeeding}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
                  >
                    Seed Sample Products
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Shop & Location</th>
                    <th className="py-3 px-4">Price (ETB)</th>
                    <th className="py-3 px-4 text-center">Inquiries</th>
                    <th className="py-3 px-4 text-center">Availability</th>
                    <th className="py-3 px-4 text-center">Featured</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Product details */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              product.images[0] ||
                              'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=150&q=80'
                            }
                            alt={product.name}
                            className="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0 bg-slate-50"
                          />
                          <div className="min-w-0 max-w-[220px]">
                            <p className="font-bold text-slate-900 truncate" title={product.name}>
                              {product.name}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] font-semibold text-slate-500">
                                {product.brand}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400">
                                {product.inquiryCode}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-block bg-slate-100 text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-lg">
                          {product.category}
                        </span>
                        <span className="block text-[10px] text-slate-400 mt-0.5 truncate max-w-[100px]">
                          {product.condition}
                        </span>
                      </td>

                      {/* Shop Name & Sub-city */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-bold text-slate-800 truncate max-w-[150px]">
                          {product.shopName}
                        </div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[140px]">{product.subCity}</span>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-black text-slate-950 text-sm">
                          <span className="text-yellow-600 font-extrabold text-xs">ETB</span> {product.priceETB.toLocaleString()}
                        </div>
                        {product.originalPriceETB && (
                          <div className="text-[10px] text-slate-400 line-through">
                            ETB {product.originalPriceETB.toLocaleString()}
                          </div>
                        )}
                      </td>

                      {/* Inquiry count per product */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        {(inquiryStats.countByProductId[product.id] || inquiryStats.countByProductId[product.inquiryCode]) ? (
                          <span className="inline-flex items-center gap-1 bg-yellow-100 text-slate-950 text-xs font-black px-2.5 py-1 rounded-lg border border-yellow-300 shadow-2xs" title={`${inquiryStats.countByProductId[product.id] || inquiryStats.countByProductId[product.inquiryCode]} Telegram inquiries recorded`}>
                            <Send className="w-3 h-3 text-yellow-600" />
                            <span>{inquiryStats.countByProductId[product.id] || inquiryStats.countByProductId[product.inquiryCode]}</span>
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs font-medium">0</span>
                        )}
                      </td>

                      {/* Availability Toggle */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleToggleAvailability(product)}
                          title="Click to toggle In Stock / Out of Stock"
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                            product.inStock
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                              : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                          }`}
                        >
                          {product.inStock ? (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>In Stock</span>
                            </>
                          ) : (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                              <span>Out of Stock</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Featured Toggle */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(product)}
                          title={product.featured ? 'Remove from Featured' : 'Mark as Featured'}
                          className={`p-2 rounded-xl transition-colors ${
                            product.featured
                              ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                              : 'text-slate-300 hover:text-slate-400 hover:bg-slate-100'
                          }`}
                        >
                          <Star
                            className={`w-4 h-4 ${product.featured ? 'fill-amber-500' : ''}`}
                          />
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(product)}
                            title="Edit Product"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenDelete(product)}
                            title="Delete Product"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Product Form Modal (Add & Edit) */}
      <ProductFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialProduct={editingProduct}
        isSubmitting={isSubmittingForm}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        product={deletingProduct}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};
