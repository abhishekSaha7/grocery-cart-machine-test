const CART_STORAGE_KEY = 'freshmart_grocery_cart_v1';

/**
 * Safely retrieves cart item IDs from LocalStorage.
 * Handles corrupt data or missing keys gracefully.
 */
export function getCartFromStorage(): number[] {
  if (typeof window === 'undefined' || !window.localStorage) {
    return [];
  }

  try {
    const rawData = localStorage.getItem(CART_STORAGE_KEY);
    if (!rawData) {
      return [];
    }

    const parsed = JSON.parse(rawData);
    if (Array.isArray(parsed) && parsed.every((id) => typeof id === 'number')) {
      return parsed;
    }

    // Invalid format fallback
    console.warn('[LocalStorage] Invalid cart data structure found. Resetting.');
    localStorage.removeItem(CART_STORAGE_KEY);
    return [];
  } catch (error) {
    console.error('[LocalStorage] Error reading cart from storage:', error);
    return [];
  }
}

/**
 * Persists cart item IDs to LocalStorage safely.
 */
export function saveCartToStorage(cartItems: number[]): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error('[LocalStorage] Error saving cart to storage:', error);
  }
}

/**
 * Clears cart data from LocalStorage.
 */
export function clearCartStorage(): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }

  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error('[LocalStorage] Error clearing cart storage:', error);
  }
}
