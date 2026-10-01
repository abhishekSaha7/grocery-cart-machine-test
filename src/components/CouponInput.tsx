import React, { useState } from 'react';
import { CouponCalculation } from '../types/grocery';

interface CouponInputProps {
  couponCalc: CouponCalculation;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
  availableCoupons: string[];
}

export const CouponInput: React.FC<CouponInputProps> = ({
  couponCalc,
  onApplyCoupon,
  onRemoveCoupon,
  availableCoupons,
}) => {
  const [inputCode, setInputCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    onApplyCoupon(inputCode);
  };

  const handleQuickApply = (code: string) => {
    setInputCode(code);
    onApplyCoupon(code);
  };

  return (
    <div className="coupon-card">
      <h4 className="coupon-title">Promo Coupon</h4>

      {couponCalc.coupon && couponCalc.isValid ? (
        <div className="applied-coupon-box">
          <div className="coupon-details">
            <span className="coupon-tag">🎉 {couponCalc.coupon.code}</span>
            <span className="coupon-desc">
              {couponCalc.coupon.percentage}% OFF ({couponCalc.coupon.description})
            </span>
          </div>
          <button
            type="button"
            className="remove-coupon-btn"
            onClick={() => {
              setInputCode('');
              onRemoveCoupon();
            }}
            title="Remove applied coupon"
          >
            Remove ✕
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="coupon-form">
          <div className="coupon-input-group">
            <input
              type="text"
              className="coupon-input"
              placeholder="Enter coupon (e.g. SAVE10)"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              aria-label="Enter promo coupon code"
            />
            <button
              type="submit"
              className="apply-coupon-btn"
              disabled={!inputCode.trim()}
            >
              Apply
            </button>
          </div>

          {couponCalc.error && (
            <div className="coupon-error-msg">{couponCalc.error}</div>
          )}

          <div className="quick-coupons">
            <span className="quick-label">Try code:</span>
            {availableCoupons.map((code) => (
              <button
                key={code}
                type="button"
                className="quick-coupon-pill"
                onClick={() => handleQuickApply(code)}
              >
                {code}
              </button>
            ))}
          </div>
        </form>
      )}
    </div>
  );
};
