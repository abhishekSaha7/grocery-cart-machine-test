import { DiscountRule } from '../types/grocery';

export const discountRules: DiscountRule[] = [
  {
    minimumAmount: 500,
    percentage: 5,
    label: '5% off on orders ₹500+'
  },
  {
    minimumAmount: 1000,
    percentage: 10,
    label: '10% off on orders ₹1000+'
  },
  {
    minimumAmount: 1500,
    percentage: 15,
    label: '15% off on orders ₹1500+'
  }
];
