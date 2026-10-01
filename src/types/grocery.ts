export interface GroceryItem {
  id: number;
  name: string;
  price: number;
  category: string;
  emoji?: string;
  unit?: string;
}

export interface Coupon {
  code: string;
  percentage: number;
  description: string;
  minimumSubtotal?: number;
}

export interface DiscountRule {
  minimumAmount: number;
  percentage: number;
  label: string;
}

export interface DiscountCalculation {
  thresholdPercentage: number;
  thresholdDiscountAmount: number;
  subtotalAfterThreshold: number;
  appliedRule: DiscountRule | null;
  nextThreshold: {
    amount: number;
    percentage: number;
    remaining: number;
  } | null;
}

export interface CouponCalculation {
  coupon: Coupon | null;
  couponDiscountAmount: number;
  isValid: boolean;
  error?: string;
}

export type SortOption = 'default' | 'price-asc' | 'price-desc';
