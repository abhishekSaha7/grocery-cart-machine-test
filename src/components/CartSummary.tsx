import React from 'react';
import { DiscountCalculation, CouponCalculation } from '../types/grocery';

interface CartSummaryProps {
  subtotal: number;
  discountCalc: DiscountCalculation;
  couponCalc: CouponCalculation;
  finalTotal: number;
  canUndo: boolean;
  onUndo: () => void;
  lastActionMessage?: string | null;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  discountCalc,
  couponCalc,
  finalTotal,
  canUndo,
  onUndo,
  lastActionMessage,
}) => {
  const totalSavings =
    discountCalc.thresholdDiscountAmount + couponCalc.couponDiscountAmount;

  return (
    <div className="cart-summary-card">
      <h3 className="summary-title">Order Summary</h3>

      <div className="summary-rows">
        <div className="summary-row">
          <span className="summary-label">Subtotal</span>
          <span className="summary-value">₹{subtotal}</span>
        </div>

        {/* Threshold Discount Row */}
        <div className="summary-row discount-row">
          <span className="summary-label">
            Threshold Discount{' '}
            {discountCalc.thresholdPercentage > 0 && (
              <span className="discount-tag">({discountCalc.thresholdPercentage}%)</span>
            )}
          </span>
          <span className="summary-value discount-value">
            {discountCalc.thresholdDiscountAmount > 0
              ? `-₹${discountCalc.thresholdDiscountAmount}`
              : '₹0'}
          </span>
        </div>

        {/* Coupon Discount Row */}
        {couponCalc.coupon && (
          <div className="summary-row coupon-row">
            <span className="summary-label">
              Promo Coupon{' '}
              <span className="coupon-code-badge">{couponCalc.coupon.code}</span> (
              {couponCalc.coupon.percentage}%)
            </span>
            <span className="summary-value discount-value">
              -₹{couponCalc.couponDiscountAmount}
            </span>
          </div>
        )}

        <hr className="summary-divider" />

        <div className="summary-row total-row">
          <span className="total-label">Final Total</span>
          <div className="total-value-wrapper">
            <span className="total-price">₹{finalTotal}</span>
            {totalSavings > 0 && (
              <span className="savings-badge">You save ₹{totalSavings}!</span>
            )}
          </div>
        </div>
      </div>

      {/* Undo Button & Message */}
      <div className="undo-section">
        <button
          type="button"
          className="undo-btn"
          onClick={onUndo}
          disabled={!canUndo}
          aria-label="Undo last add or delete cart action"
        >
          <span aria-hidden="true">↩</span> Undo Last Action
        </button>
        {lastActionMessage && (
          <p className="last-action-feedback">{lastActionMessage}</p>
        )}
      </div>
    </div>
  );
};
