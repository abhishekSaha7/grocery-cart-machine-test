import { discountRules } from '../data/discountRules';
import { DiscountCalculation, DiscountRule } from '../types/grocery';

/**
 * Calculates subtotal threshold percentage discount cleanly.
 * Centralized business logic isolated from UI components.
 */
export function calculateDiscount(subtotal: number): DiscountCalculation {
  if (subtotal <= 0) {
    return {
      thresholdPercentage: 0,
      thresholdDiscountAmount: 0,
      subtotalAfterThreshold: 0,
      appliedRule: null,
      nextThreshold: discountRules.length > 0 ? {
        amount: discountRules[0].minimumAmount,
        percentage: discountRules[0].percentage,
        remaining: discountRules[0].minimumAmount,
      } : null,
    };
  }

  // Sort rules descending by minimumAmount to find highest applicable threshold
  const sortedRules = [...discountRules].sort((a, b) => b.minimumAmount - a.minimumAmount);
  
  let appliedRule: DiscountRule | null = null;

  for (const rule of sortedRules) {
    if (subtotal >= rule.minimumAmount) {
      appliedRule = rule;
      break;
    }
  }

  const thresholdPercentage = appliedRule ? appliedRule.percentage : 0;
  const thresholdDiscountAmount = Math.round((subtotal * thresholdPercentage) / 100);
  const subtotalAfterThreshold = Math.max(0, subtotal - thresholdDiscountAmount);

  // Find next higher threshold for customer progress feedback
  const ascendingRules = [...discountRules].sort((a, b) => a.minimumAmount - b.minimumAmount);
  const nextRule = ascendingRules.find((rule) => subtotal < rule.minimumAmount) || null;

  const nextThreshold = nextRule
    ? {
        amount: nextRule.minimumAmount,
        percentage: nextRule.percentage,
        remaining: nextRule.minimumAmount - subtotal,
      }
    : null;

  return {
    thresholdPercentage,
    thresholdDiscountAmount,
    subtotalAfterThreshold,
    appliedRule,
    nextThreshold,
  };
}
