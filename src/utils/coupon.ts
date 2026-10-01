import { staticCoupons } from '../data/coupons';
import { CouponCalculation } from '../types/grocery';

/**
 * Validates and applies a coupon code dynamically.
 * Centralized coupon logic separated from JSX.
 */
export function validateAndApplyCoupon(
  enteredCode: string,
  baseSubtotal: number
): CouponCalculation {
  const trimmed = enteredCode.trim().toUpperCase();

  if (!trimmed) {
    return {
      coupon: null,
      couponDiscountAmount: 0,
      isValid: false,
    };
  }

  const matchedCoupon = staticCoupons.find(
    (c) => c.code.toUpperCase() === trimmed
  );

  if (!matchedCoupon) {
    return {
      coupon: null,
      couponDiscountAmount: 0,
      isValid: false,
      error: `Invalid coupon code "${enteredCode}". Try SAVE10 or SUPER20.`,
    };
  }

  if (matchedCoupon.minimumSubtotal && baseSubtotal < matchedCoupon.minimumSubtotal) {
    return {
      coupon: matchedCoupon,
      couponDiscountAmount: 0,
      isValid: false,
      error: `Coupon "${matchedCoupon.code}" requires a minimum subtotal of ₹${matchedCoupon.minimumSubtotal}.`,
    };
  }

  const couponDiscountAmount = Math.round((baseSubtotal * matchedCoupon.percentage) / 100);

  return {
    coupon: matchedCoupon,
    couponDiscountAmount,
    isValid: true,
  };
}
