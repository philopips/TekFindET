import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product, Inquiry } from '../types';

/**
 * Record an inquiry event in Firestore when a customer clicks "Contact to Buy".
 * Only collects minimal, non-personal product information.
 */
export async function recordInquiry(product: Product): Promise<string | null> {
  try {
    const listingId = product.inquiryCode || (product.id ? `TF-${product.id}` : 'TF-PROD');
    const inquiryData: Omit<Inquiry, 'id'> = {
      productId: product.id || 'unknown',
      listingId: listingId,
      productName: product.name || 'Unknown Product',
      shopName: product.shopName || 'TekFind Verified Shop',
      timestamp: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, 'inquiries'), inquiryData);
    return docRef.id;
  } catch (error) {
    // Non-blocking: ensure Telegram link navigation always succeeds even if offline
    console.warn('Failed to record inquiry event in Firestore:', error);
    return null;
  }
}

/**
 * Real-time listener for inquiries (for authenticated admin dashboard)
 */
export function subscribeInquiries(
  onData: (inquiries: Inquiry[]) => void,
  onError?: (err: Error) => void
): () => void {
  try {
    const q = query(collection(db, 'inquiries'), orderBy('timestamp', 'desc'), limit(1000));
    return onSnapshot(
      q,
      (snapshot) => {
        const items: Inquiry[] = [];
        snapshot.forEach((docSnap) => {
          items.push({
            id: docSnap.id,
            ...(docSnap.data() as Omit<Inquiry, 'id'>)
          });
        });
        onData(items);
      },
      (error) => {
        console.error('Inquiries subscription error:', error);
        if (onError) onError(error);
      }
    );
  } catch (err: any) {
    console.warn('Inquiries subscription setup error:', err);
    if (onError) onError(err);
    return () => {};
  }
}

export interface InquiryStats {
  total: number;
  todayCount: number;
  mostContactedProducts: Array<{
    productId: string;
    productName: string;
    shopName: string;
    count: number;
  }>;
  mostContactedShops: Array<{
    shopName: string;
    count: number;
  }>;
  countByProductId: Record<string, number>;
}

/**
 * Compute aggregate metrics from inquiries
 */
export function computeInquiryStats(inquiries: Inquiry[]): InquiryStats {
  const total = inquiries.length;

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  let todayCount = 0;
  const productMap: Record<
    string,
    { productId: string; productName: string; shopName: string; count: number }
  > = {};
  const shopMap: Record<string, number> = {};
  const countByProductId: Record<string, number> = {};

  for (const item of inquiries) {
    // Check if today
    const itemDate = new Date(item.timestamp).getTime();
    if (!isNaN(itemDate) && itemDate >= todayStart) {
      todayCount++;
    }

    // Product counts
    const pId = item.productId || item.listingId;
    countByProductId[pId] = (countByProductId[pId] || 0) + 1;

    if (!productMap[pId]) {
      productMap[pId] = {
        productId: item.productId,
        productName: item.productName,
        shopName: item.shopName,
        count: 0
      };
    }
    productMap[pId].count += 1;

    // Shop counts
    const shop = item.shopName || 'Unknown Shop';
    shopMap[shop] = (shopMap[shop] || 0) + 1;
  }

  // Sort most contacted products
  const mostContactedProducts = Object.values(productMap)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Sort most contacted shops
  const mostContactedShops = Object.entries(shopMap)
    .map(([shopName, count]) => ({ shopName, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    total,
    todayCount,
    mostContactedProducts,
    mostContactedShops,
    countByProductId
  };
}
