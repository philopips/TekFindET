import { Product } from '../types';

/**
 * Single configurable Telegram username for customer inquiries
 */
export const TELEGRAM_USERNAME = '@tekfindet';

/**
 * Helper to strip the leading '@' if present for clean Telegram deep-linking
 */
export function getCleanTelegramUsername(username: string = TELEGRAM_USERNAME): string {
  return username.replace(/^@/, '');
}

/**
 * Formats a price with thousands separators (e.g. 45000 -> "45,000")
 */
export function formatProductPrice(price: number): string {
  return Number(price || 0).toLocaleString('en-US');
}

/**
 * Generates the standardized inquiry message for Telegram
 */
export function generateTelegramMessage(product: Product): string {
  const formattedPrice = formatProductPrice(product.priceETB);
  const location = product.subCity || product.location || 'Addis Ababa';
  const listingId = product.inquiryCode || (product.id ? `TF-${product.id}` : 'TF-PROD');

  return `Hi! I'm interested in buying this product from TekFind.

Product: ${product.name}
Price: ${formattedPrice} ETB
Shop: ${product.shopName}
Location: ${location}
Listing ID: ${listingId}

I would like to know if it is still available.`;
}

/**
 * Generates the Telegram deep link with the encoded inquiry message
 * Format: https://t.me/TELEGRAM_USERNAME?text=ENCODED_MESSAGE
 */
export function generateTelegramLink(product: Product): string {
  const username = getCleanTelegramUsername(TELEGRAM_USERNAME);
  const message = generateTelegramMessage(product);
  const encodedMessage = encodeURIComponent(message);
  return `https://t.me/${username}?text=${encodedMessage}`;
}
