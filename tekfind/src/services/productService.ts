import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { Product } from '../types';

/**
 * Add a new product to the Firestore 'products' collection
 */
export async function addProduct(productData: Omit<Product, 'id'>): Promise<string> {
  const collectionRef = collection(db, 'products');

  // Format inquiry code if not present
  const docData = {
    ...productData,
    priceETB: Number(productData.priceETB) || 0,
    originalPriceETB: productData.originalPriceETB ? Number(productData.originalPriceETB) : null,
    stockCount: Number(productData.stockCount) || 1,
    inStock: Boolean(productData.inStock),
    featured: Boolean(productData.featured),
    trending: Boolean(productData.trending),
    shopRating: Number(productData.shopRating) || 4.9,
    shopReviewCount: Number(productData.shopReviewCount) || 1,
    lastUpdated: 'Just now',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  const docRef = await addDoc(collectionRef, docData);

  // If inquiryCode was placeholder, update with actual generated doc id
  if (!productData.inquiryCode || productData.inquiryCode.startsWith('TK-AUTO')) {
    await updateDoc(docRef, {
      inquiryCode: `TK-${docRef.id.slice(0, 6).toUpperCase()}`
    });
  }

  return docRef.id;
}

/**
 * Update an existing product by document ID
 */
export async function updateProduct(id: string, updates: Partial<Product>): Promise<void> {
  const docRef = doc(db, 'products', id);

  const cleanUpdates: Record<string, any> = {
    ...updates,
    updatedAt: serverTimestamp(),
    lastUpdated: 'Updated today'
  };

  if (updates.priceETB !== undefined) {
    cleanUpdates.priceETB = Number(updates.priceETB) || 0;
  }
  if (updates.originalPriceETB !== undefined) {
    cleanUpdates.originalPriceETB = updates.originalPriceETB ? Number(updates.originalPriceETB) : null;
  }
  if (updates.stockCount !== undefined) {
    cleanUpdates.stockCount = Number(updates.stockCount) || 0;
  }

  await updateDoc(docRef, cleanUpdates);
}

/**
 * Delete a product from Firestore
 */
export async function deleteProduct(id: string): Promise<void> {
  const docRef = doc(db, 'products', id);
  await deleteDoc(docRef);
}

/**
 * Quick toggle featured status
 */
export async function toggleFeatured(id: string, currentStatus: boolean): Promise<void> {
  await updateProduct(id, { featured: !currentStatus });
}

/**
 * Quick toggle inStock availability status
 */
export async function toggleAvailability(id: string, currentStatus: boolean): Promise<void> {
  await updateProduct(id, {
    inStock: !currentStatus,
    stockCount: !currentStatus ? 5 : 0
  });
}

/**
 * Upload a product image file.
 * Tries Firebase Storage first; if storage upload fails (e.g. CORS/bucket config),
 * converts file into an optimized base64 data URL so uploads always work seamlessly.
 */
export async function uploadProductImage(file: File): Promise<string> {
  const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
  const storageRef = ref(storage, `products/${fileName}`);

  try {
    const snapshot = await uploadBytes(storageRef, file, {
      contentType: file.type || 'image/jpeg'
    });
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (storageError) {
    console.warn('Firebase Storage upload failed, converting to optimized data URL:', storageError);

    // Fallback: Read file as Data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to parse uploaded image file'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(file);
    });
  }
}
