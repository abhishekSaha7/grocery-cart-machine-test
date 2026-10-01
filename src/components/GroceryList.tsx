import React from 'react';
import { GroceryItem } from '../types/grocery';
import { GroceryCard } from './GroceryCard';

interface GroceryListProps {
  items: GroceryItem[];
  cartItemIds: number[];
  onAddToCart: (item: GroceryItem) => void;
  searchQuery: string;
  selectedCategory: string;
  onClearFilters: () => void;
}

export const GroceryList: React.FC<GroceryListProps> = ({
  items,
  cartItemIds,
  onAddToCart,
  searchQuery,
  selectedCategory,
  onClearFilters,
}) => {
  if (items.length === 0) {
    return (
      <div className="empty-groceries-state">
        <div className="empty-icon">🔍</div>
        <h3>No groceries found</h3>
        <p>
          We couldn't find any items matching{' '}
          {searchQuery && <strong>"{searchQuery}"</strong>}
          {searchQuery && selectedCategory !== 'All' && ' in '}
          {selectedCategory !== 'All' && <strong>category "{selectedCategory}"</strong>}.
        </p>
        <button
          type="button"
          className="btn-secondary"
          onClick={onClearFilters}
        >
          Clear All Search & Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grocery-grid">
      {items.map((item) => (
        <GroceryCard
          key={item.id}
          item={item}
          isInCart={cartItemIds.includes(item.id)}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};
