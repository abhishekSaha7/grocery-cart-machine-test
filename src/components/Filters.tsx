import React from 'react';
import { SortOption } from '../types/grocery';

interface FiltersProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sortOption: SortOption;
  onSelectSort: (sort: SortOption) => void;
  activeFilterCount: number;
  onResetFilters: () => void;
}

export const Filters: React.FC<FiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  sortOption,
  onSelectSort,
  activeFilterCount,
  onResetFilters,
}) => {
  return (
    <div className="filters-container">
      <div className="filter-group">
        <label htmlFor="category-select" className="filter-label">
          Category:
        </label>
        <select
          id="category-select"
          className="filter-select"
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-select" className="filter-label">
          Sort by:
        </label>
        <select
          id="sort-select"
          className="filter-select"
          value={sortOption}
          onChange={(e) => onSelectSort(e.target.value as SortOption)}
        >
          <option value="default">Recommended</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {activeFilterCount > 0 && (
        <button
          type="button"
          className="reset-filters-btn"
          onClick={onResetFilters}
          title="Reset active category filter and search"
        >
          Reset Filters ↺
        </button>
      )}
    </div>
  );
};
