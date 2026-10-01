import React from 'react';
import { GroceryItem } from '../types/grocery';

interface CartProps {
  selectedItems: GroceryItem[];
  onRemoveFromCart: (item: GroceryItem) => void;
  onClearCart: () => void;
}

export const Cart: React.FC<CartProps> = ({
  selectedItems,
  onRemoveFromCart,
  onClearCart,
}) => {
  if (selectedItems.length === 0) {
    return (
      <div className="empty-cart-state">
        <div className="cart-empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Select groceries from the catalog to add them to your cart.</p>
      </div>
    );
  }

  return (
    <div className="cart-items-container">
      <div className="cart-header-actions">
        <span className="cart-count-badge">
          {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'}
        </span>
        <button
          type="button"
          className="clear-cart-link"
          onClick={onClearCart}
          title="Clear all items from cart"
        >
          Clear Cart
        </button>
      </div>

      <ul className="cart-item-list">
        {selectedItems.map((item) => (
          <li key={item.id} className="cart-item-row">
            <div className="cart-item-info">
              <span className="cart-item-emoji">{item.emoji || '📦'}</span>
              <div className="cart-item-details">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-category">{item.category}</span>
              </div>
            </div>

            <div className="cart-item-right">
              <span className="cart-item-price">₹{item.price}</span>
              <button
                type="button"
                className="remove-item-btn"
                onClick={() => onRemoveFromCart(item)}
                aria-label={`Remove ${item.name} from cart`}
                title={`Remove ${item.name}`}
              >
                🗑 Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
