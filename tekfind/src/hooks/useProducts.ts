import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  writeBatch,
  getDocs
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../data/mockProducts';

export interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  seedDatabase: () => Promise<void>;
  isSeeding: boolean;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSeeding, setIsSeeding] = useState<boolean>(false);

  // Function to seed Firestore with initial verified Addis electronics products
  const seedDatabase = useCallback(async () => {
    setIsSeeding(true);
    setError(null);
    try {
      const batch = writeBatch(db);
      for (const prod of MOCK_PRODUCTS) {
        const docRef = doc(db, 'products', prod.id);
        batch.set(docRef, prod, { merge: true });
      }
      await batch.commit();
      console.log('Successfully seeded Addis Ababa electronics products into Firestore');
    } catch (err: any) {
      console.error('Error seeding products to Firestore:', err);
      setError(err?.message || 'Failed to seed products into database');
    } finally {
      setIsSeeding(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const productsCollection = collection(db, 'products');

    // Real-time listener for products collection
    const unsubscribe = onSnapshot(
      productsCollection,
      (snapshot) => {
        if (snapshot.empty) {
          // If Firestore is empty on initial setup, provide fallback dataset and attempt seed
          setProducts(MOCK_PRODUCTS);
          setLoading(false);
          seedDatabase().catch((err) => {
            console.warn('Auto-seeding skipped or requires admin login:', err?.message);
          });
        } else {
          const loadedProducts: Product[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            loadedProducts.push({
              id: docSnap.id,
              name: data.name || '',
              brand: data.brand || '',
              category: data.category || 'Other',
              priceETB: Number(data.priceETB) || 0,
              originalPriceETB: data.originalPriceETB ? Number(data.originalPriceETB) : undefined,
              shopName: data.shopName || 'Verified Tech Shop',
              shopVerified: data.shopVerified ?? true,
              shopRating: Number(data.shopRating) || 4.8,
              shopReviewCount: Number(data.shopReviewCount) || 10,
              location: data.location || 'Addis Ababa',
              subCity: data.subCity || 'Bole, Addis Ababa',
              condition: data.condition || 'Brand New (Sealed)',
              warranty: data.warranty || 'Shop Warranty',
              lastUpdated: data.lastUpdated || 'Recently',
              images: Array.isArray(data.images) && data.images.length > 0 ? data.images : [
                'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=80'
              ],
              featured: Boolean(data.featured),
              trending: Boolean(data.trending),
              description: data.description || '',
              keySpecs: Array.isArray(data.keySpecs) ? data.keySpecs : [],
              specs: Array.isArray(data.specs) ? data.specs : [],
              inStock: data.inStock ?? true,
              stockCount: Number(data.stockCount) || 1,
              inquiryCode: data.inquiryCode || `TK-${docSnap.id.toUpperCase()}`
            });
          });

          // Sort default featured first
          loadedProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
          setProducts(loadedProducts);
          setLoading(false);
        }
      },
      (err) => {
        console.error('Firestore onSnapshot error:', err);
        setError(err.message || 'Error connecting to Firestore database');
        // Fallback to initial local products so user can still browse seamlessly
        setProducts(MOCK_PRODUCTS);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [seedDatabase]);

  return {
    products: products.length > 0 ? products : (loading ? [] : MOCK_PRODUCTS),
    loading,
    error,
    seedDatabase,
    isSeeding
  };
}
