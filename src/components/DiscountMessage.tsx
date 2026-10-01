import React from 'react';
import { DiscountCalculation } from '../types/grocery';

interface DiscountMessageProps {
  discountCalc: DiscountCalculation;
  subtotal: number;
}

export const DiscountMessage: React.FC<DiscountMessageProps> = ({
  discountCalc,
  subtotal,
}) => {
  if (subtotal <= 0) return null;

  const { appliedRule, nextThreshold } = discountCalc;

  return (
    <div className="discount-banner">
      {appliedRule ? (
        <div className="discount-active-alert">
          <span className="alert-icon">🎁</span>
          <div className="alert-content">
            <strong>{appliedRule.percentage}% Threshold Discount Unlocked!</strong>
            <p>
              You got ₹{discountCalc.thresholdDiscountAmount} off for cart subtotal ₹{subtotal}.
            </p>
          </div>
        </div>
      ) : (
        <div className="discount-info-alert">
          <span className="alert-icon">💡</span>
          <div className="alert-content">
            <strong>Subtotal Discount Tier</strong>
            <p>Add items to reach ₹500 subtotal for 5% off!</p>
          </div>
        </div>
      )}

      {nextThreshold && (
        <div className="progress-container">
          <div className="progress-header">
            <span>
              Add ₹{nextThreshold.remaining} more to get{' '}
              <strong>{nextThreshold.percentage}% OFF</strong>
            </span>
            <span className="progress-percent">
              {Math.min(100, Math.round((subtotal / nextThreshold.amount) * 100))}%
            </span>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{
                width: `${Math.min(
                  100,
                  Math.round((subtotal / nextThreshold.amount) * 100)
                )}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
