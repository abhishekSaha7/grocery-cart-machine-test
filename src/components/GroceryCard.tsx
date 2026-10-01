import React from 'react';
import { GroceryItem } from '../types/grocery';

interface GroceryCardProps {
  item: GroceryItem;
  isInCart: boolean;
  onAddToCart: (item: GroceryItem) => void;
}

export const GroceryCard: React.FC<GroceryCardProps> = ({
  item,
  isInCart,
  onAddToCart,
}) => {
  return (
    <div className={`grocery-card ${isInCart ? 'in-cart' : ''}`}>
      <div className="grocery-card-header">
        <div className="grocery-emoji" aria-hidden="true">
          {item.emoji || '🛒'}
        </div>
        <span className="category-badge">{item.category}</span>
      </div>

      <div className="grocery-card-body">
        <h3 className="grocery-name">{item.name}</h3>
        {item.unit && <span className="grocery-unit">{item.unit}</span>}
        <div className="grocery-price">₹{item.price}</div>
      </div>

      <div className="grocery-card-footer">
        <button
          type="button"
          className={`add-to-cart-btn ${isInCart ? 'btn-added' : 'btn-primary'}`}
          onClick={() => onAddToCart(item)}
          disabled={isInCart}
          aria-label={isInCart ? `${item.name} is already in cart` : `Add ${item.name} to cart for ₹${item.price}`}
        >
          {isInCart ? (
            <>
              <span aria-hidden="true">✓</span> In Cart
            </>
          ) : (
            <>
              <span aria-hidden="true">+</span> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};
