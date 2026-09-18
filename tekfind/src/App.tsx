import React, { useState, useMemo, useEffect } from 'react';
import {
  Sparkles,
  SlidersHorizontal,
  ArrowUpDown,
  Filter,
  CheckCircle2,
  AlertCircle,
  Search,
  X,
  Store,
  Layers,
  Flame,
  ShieldCheck,
  ChevronDown,
  RefreshCw,
  Database
} from 'lucide-react';
import { Product, ProductCategory, SortOption } from './types';
import { SUB_CITIES } from './data/mockProducts';
import { useProducts } from './hooks/useProducts';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ProductCardSkeleton } from './components/ProductCardSkeleton';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ContactToBuyModal } from './components/ContactToBuyModal';
import { AboutSection } from './components/AboutSection';
import { SavedModal } from './components/SavedModal';
import { Footer } from './components/Footer';
import { useAuth } from './contexts/AuthContext';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ProductFilterBar } from './components/ProductFilterBar';
import { recordInquiry } from './services/inquiryService';

export default function App() {
  const { user, loading: authLoading } = useAuth();
  const { products: allProducts, loading, error, seedDatabase, isSeeding } = useProducts();

  // Route view state: 'marketplace' or 'admin'
  const [currentView, setCurrentView] = useState<'marketplace' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash === '#admin' || window.location.search.includes('admin=true')
        ? 'admin'
        : 'marketplace';
    }
    return 'marketplace';
  });

  // Keep view in sync with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      } else if (window.location.hash === '' && currentView === 'admin') {
        setCurrentView('marketplace');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentView]);

  const navigateToAdmin = () => {
    setCurrentView('admin');
    if (window.location.hash !== '#admin') {
      window.location.hash = 'admin';
    }
  };

  const navigateToMarketplace = () => {
    setCurrentView('marketplace');
    if (window.location.hash === '#admin') {
      history.pushState(null, '', window.location.pathname + window.location.search);
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [selectedSubCity, setSelectedSubCity] = useState<string>('All Addis Ababa');
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [conditionFilter, setConditionFilter] = useState<'All' | 'Brand New' | 'Open Box'>('All');
  
  // Selection states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [contactingProduct, setContactingProduct] = useState<Product | null>(null);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  
  // Saved items state with default sample item
  const [savedProductIds, setSavedProductIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tekfind_saved_products');
      return saved ? JSON.parse(saved) : ['prod-001', 'prod-004'];
    } catch {
      return ['prod-001', 'prod-004'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tekfind_saved_products', JSON.stringify(savedProductIds));
    } catch {
      // ignore
    }
  }, [savedProductIds]);

  const toggleSaveProduct = (productId: string) => {
    setSavedProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const clearAllSaved = () => {
    setSavedProductIds([]);
  };

  // Dynamic Category Counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const prod of allProducts) {
      counts[prod.category] = (counts[prod.category] || 0) + 1;
    }
    return counts;
  }, [allProducts]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'All' && product.category !== selectedCategory) {
          return false;
        }

        // Sub-city / Location filter in Addis Ababa
        if (selectedSubCity !== 'All Addis Ababa') {
          const parts = selectedSubCity.toLowerCase().split('/').map((s) => s.trim());
          const matchesLocation = parts.some(
            (part) =>
              product.subCity.toLowerCase().includes(part) ||
              product.location.toLowerCase().includes(part)
          );
          if (!matchesLocation) {
            return false;
          }
        }

        // Price range filter
        if (minPrice !== null && product.priceETB < minPrice) {
          return false;
        }
        if (maxPrice !== null && product.priceETB > maxPrice) {
          return false;
        }

        // Condition filter
        if (conditionFilter === 'Brand New') {
          if (!product.condition.includes('Brand New')) return false;
        } else if (conditionFilter === 'Open Box') {
          if (!product.condition.includes('Open Box') && !product.condition.includes('Used')) {
            return false;
          }
        }

        // Search Query (fast product name matching + brand/specs/shop/code)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const queryTokens = q.split(/\s+/).filter(Boolean);

          const matchesName = queryTokens.every((token) => product.name.toLowerCase().includes(token));
          const matchesBrand = product.brand.toLowerCase().includes(q);
          const matchesCategory = product.category.toLowerCase().includes(q);
          const matchesShop = product.shopName.toLowerCase().includes(q);
          const matchesLocation = product.location.toLowerCase().includes(q);
          const matchesCode = product.inquiryCode.toLowerCase().includes(q);
          const matchesSpecs = product.keySpecs.some((s) => s.toLowerCase().includes(q));

          if (
            !matchesName &&
            !matchesBrand &&
            !matchesCategory &&
            !matchesShop &&
            !matchesLocation &&
            !matchesCode &&
            !matchesSpecs
          ) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'price-asc') {
          return a.priceETB - b.priceETB;
        }
        if (sortOption === 'price-desc') {
          return b.priceETB - a.priceETB;
        }
        if (sortOption === 'newest') {
          const parseTime = (prod: any) => {
            if (prod.createdAt?.seconds) return prod.createdAt.seconds * 1000;
            if (prod.updatedAt?.seconds) return prod.updatedAt.seconds * 1000;
            if (prod.lastUpdated) {
              if (prod.lastUpdated.includes('min') || prod.lastUpdated.includes('now')) return Date.now();
              if (prod.lastUpdated.includes('hour')) return Date.now() - 3600000;
              if (prod.lastUpdated.includes('day')) return Date.now() - 86400000;
              const parsed = Date.parse(prod.lastUpdated);
              if (!isNaN(parsed)) return parsed;
            }
            return 0;
          };
          const diff = parseTime(b) - parseTime(a);
          if (diff !== 0) return diff;
          return b.id.localeCompare(a.id);
        }
        if (sortOption === 'featured') {
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        }
        return 0;
      });
  }, [allProducts, searchQuery, selectedCategory, selectedSubCity, minPrice, maxPrice, sortOption, conditionFilter]);

  // Featured products specifically for the featured section
  const featuredProducts = useMemo(() => {
    return allProducts.filter((p) => p.featured);
  }, [allProducts]);

  // Saved products objects
  const savedProducts = useMemo(() => {
    return allProducts.filter((p) => savedProductIds.includes(p.id));
  }, [allProducts, savedProductIds]);

  // Related products for currently selected product
  const relatedProducts = useMemo(() => {
    if (!selectedProduct) return [];
    return allProducts.filter(
      (p) => p.category === selectedProduct.category && p.id !== selectedProduct.id
    );
  }, [allProducts, selectedProduct]);

  const handleOpenAbout = () => {
    const el = document.getElementById('about-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactToBuy = (product: Product) => {
    recordInquiry(product);
    setContactingProduct(product);
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSubCity('All Addis Ababa');
    setMinPrice(null);
    setMaxPrice(null);
    setConditionFilter('All');
    setSortOption('featured');
  };

  // Conditional Admin Rendering
  if (currentView === 'admin') {
    if (authLoading) {
      return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4">
          <div className="w-10 h-10 border-3 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-400">Verifying Admin Access...</p>
        </div>
      );
    }

    if (!user) {
      return <AdminLogin onBackToStore={navigateToMarketplace} />;
    }

    return (
      <AdminDashboard
        products={allProducts}
        loading={loading}
        onViewPublicStore={navigateToMarketplace}
        onSeedDatabase={seedDatabase}
        isSeeding={isSeeding}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900">
      {/* Sticky Responsive Header */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        savedCount={savedProductIds.length}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        onOpenAbout={handleOpenAbout}
        onOpenAdmin={navigateToAdmin}
        selectedSubCity={selectedSubCity}
        onSelectSubCity={setSelectedSubCity}
        subCities={SUB_CITIES}
      />

      {/* Category Navigation Bar - Positioned at the top so users immediately see electronics products */}
      <CategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        totalProductsCount={allProducts.length}
        categoryCounts={categoryCounts}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10 sm:space-y-12 w-full">
        {/* Firestore status/error alert if any */}
        {error && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-800 flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Database Notice:</strong> {error} — currently showing cached verified electronics catalog.
              </span>
            </div>
            <button
              type="button"
              onClick={() => seedDatabase()}
              disabled={isSeeding}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : ''}`} />
              <span>{isSeeding ? 'Syncing...' : 'Sync Firestore'}</span>
            </button>
          </div>
        )}

        {/* Featured Products Section (Show when no specific narrow search or category is active) */}
        {selectedCategory === 'All' && !searchQuery.trim() && (
          <section id="featured-products-section" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-black text-slate-950 bg-yellow-100 border border-yellow-300 px-2.5 py-0.5 rounded-md inline-flex mb-1 shadow-xs">
                  <Flame className="w-3.5 h-3.5 text-yellow-600" />
                  <span>Hand-Picked Retail Deals</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Featured in Addis Ababa
                </h2>
                <p className="text-xs text-slate-500">
                  Verified stock ready for same-day walk-in inspection or courier dispatch
                </p>
              </div>

              <span className="text-xs font-semibold text-slate-400">
                {loading ? 'Updating live stock...' : `${featuredProducts.length} Premium Listings`}
              </span>
            </div>

            {/* Featured Horizontal / Grid Showcase */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {[1, 2, 3, 4].map((i) => (
                  <ProductCardSkeleton key={`skeleton-featured-${i}`} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {featuredProducts.slice(0, 4).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelectProduct={setSelectedProduct}
                    onContactToBuy={handleContactToBuy}
                    isSaved={savedProductIds.includes(product.id)}
                    onToggleSave={toggleSaveProduct}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* All Products Catalog Section */}
        <section id="catalog-section" className="space-y-6">
          {/* Enhanced Search, Filter & Sort Bar */}
          <ProductFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedSubCity={selectedSubCity}
            onSubCityChange={setSelectedSubCity}
            subCities={SUB_CITIES}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onPriceChange={(min, max) => {
              setMinPrice(min);
              setMaxPrice(max);
            }}
            sortOption={sortOption}
            onSortChange={setSortOption}
            onResetFilters={resetAllFilters}
            totalResults={filteredProducts.length}
            categoryCounts={categoryCounts}
          />

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <ProductCardSkeleton key={`skeleton-catalog-${i}`} />
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={setSelectedProduct}
                  onContactToBuy={handleContactToBuy}
                  isSaved={savedProductIds.includes(product.id)}
                  onToggleSave={toggleSaveProduct}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <Search className="w-7 h-7" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="text-base font-extrabold text-slate-900">
                  No electronics match your search criteria
                </h3>
                <p className="text-xs text-slate-500">
                  We couldn't find any listings matching "{searchQuery}" in {selectedSubCity}. Try selecting
                  another category or resetting your filters.
                </p>
              </div>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl transition-all duration-150 active:scale-95 shadow-xs cursor-pointer"
                >
                  Reset all filters
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (allProducts[0]) setContactingProduct(allProducts[0]);
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2.5 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer"
                >
                  Ask Telegram Concierge for item
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Marketplace Overview, Description & Telegram Concierge Info (Positioned at bottom) */}
      <HeroBanner
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAbout={handleOpenAbout}
        onQuickSearch={(term) => {
          setSearchQuery(term);
          setSelectedCategory('All');
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* About & FAQ Section */}
      <AboutSection />

      {/* Footer */}
      <Footer
        onSelectCategory={setSelectedCategory}
        onOpenAbout={handleOpenAbout}
        onOpenAdmin={navigateToAdmin}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onContactToBuy={(prod) => {
            setSelectedProduct(null);
            setContactingProduct(prod);
          }}
          isSaved={savedProductIds.includes(selectedProduct.id)}
          onToggleSave={toggleSaveProduct}
          relatedProducts={relatedProducts}
          onSelectRelated={(related) => setSelectedProduct(related)}
        />
      )}

      {/* Contact to Buy / Telegram Concierge Modal */}
      {contactingProduct && (
        <ContactToBuyModal
          product={contactingProduct}
          onClose={() => setContactingProduct(null)}
        />
      )}

      {/* Saved / Bookmarked Products Drawer */}
      <SavedModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedProducts={savedProducts}
        onSelectProduct={(prod) => {
          setSelectedProduct(prod);
        }}
        onContactToBuy={(prod) => {
          setIsSavedModalOpen(false);
          setContactingProduct(prod);
        }}
        onRemoveSaved={toggleSaveProduct}
        onClearAll={clearAllSaved}
      />
    </div>
  );
}
