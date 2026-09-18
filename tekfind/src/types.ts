export type ProductCategory =
  | 'Phones'
  | 'Laptops'
  | 'Audio'
  | 'Smartwatches'
  | 'TVs'
  | 'Gaming'
  | 'Accessories'
  | 'Cameras'
  | 'Other';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  priceETB: number;
  originalPriceETB?: number;
  shopName: string;
  shopVerified: boolean;
  shopRating: number;
  shopReviewCount: number;
  location: string;
  subCity: string;
  condition: 'Brand New (Sealed)' | 'Open Box' | 'Refurbished' | 'Gently Used';
  warranty: string;
  lastUpdated: string;
  images: string[];
  featured: boolean;
  trending?: boolean;
  description: string;
  keySpecs: string[];
  specs: ProductSpec[];
  inStock: boolean;
  stockCount: number;
  inquiryCode: string;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

export interface Inquiry {
  id?: string;
  productId: string;
  listingId: string;
  productName: string;
  shopName: string;
  timestamp: string;
}
