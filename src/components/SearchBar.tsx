import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <span className="search-icon" aria-hidden="true">
          🔍
        </span>
        <input
          id="grocery-search-input"
          type="text"
          className="search-input"
          placeholder="Search groceries (e.g., Apple, Milk, Cheese)..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search groceries"
        />
        {value && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => onChange('')}
            aria-label="Clear search query"
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
