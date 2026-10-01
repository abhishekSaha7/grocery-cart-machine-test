import { Coupon } from '../types/grocery';

export const staticCoupons: Coupon[] = [
  {
    code: 'SAVE10',
    percentage: 10,
    description: '10% Extra Discount on total cart'
  },
  {
    code: 'SUPER20',
    percentage: 20,
    description: '20% Mega Savings on your purchase'
  },
  {
    code: 'FRESH5',
    percentage: 5,
    description: '5% FreshMart Welcome Bonus'
  }
];
