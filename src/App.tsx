import React, { useState, useEffect, useMemo } from "react";
import { staticGroceries } from "./data/groceries";
import { staticCoupons } from "./data/coupons";
import { GroceryItem, SortOption } from "./types/grocery";
import { calculateDiscount } from "./utils/discount";
import { validateAndApplyCoupon } from "./utils/coupon";
import {
  getCartFromStorage,
  saveCartToStorage,
  clearCartStorage,
} from "./utils/storage";

import { SearchBar } from "./components/SearchBar";
import { Filters } from "./components/Filters";
import { GroceryList } from "./components/GroceryList";
import { Cart } from "./components/Cart";
import { CartSummary } from "./components/CartSummary";
import { CouponInput } from "./components/CouponInput";
import { DiscountMessage } from "./components/DiscountMessage";

export const App: React.FC = () => {
  // 1. Core State Minimal & Clean
  const [cartItems, setCartItems] = useState<number[]>(() =>
    getCartFromStorage(),
  );
  const [previousCart, setPreviousCart] = useState<number[] | null>(null);
  const [lastActionMessage, setLastActionMessage] = useState<string | null>(
    null,
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const [appliedCouponCode, setAppliedCouponCode] = useState<string>("");

  // 2. Synchronize Cart to LocalStorage cleanly via useEffect
  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  // Extract unique category names for filter dropdown
  const categories = useMemo(() => {
    const cats = new Set(staticGroceries.map((item) => item.category));
    return Array.from(cats);
  }, []);

  // 3. Filter and Sort catalog dynamically without mutating static data
  const processedGroceries = useMemo(() => {
    let result = staticGroceries;

    // Search filter (case-insensitive)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q),
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Price sorting (create a shallow copy to prevent mutating static data)
    const sorted = [...result];
    if (sortOption === "price-asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      sorted.sort((a, b) => b.price - a.price);
    }

    return sorted;
  }, [searchQuery, selectedCategory, sortOption]);

  // 4. Derived Cart State & Dynamic Calculations
  const selectedItems = useMemo(() => {
    return staticGroceries.filter((item) => cartItems.includes(item.id));
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return selectedItems.reduce((acc, item) => acc + item.price, 0);
  }, [selectedItems]);

  const discountCalc = useMemo(() => {
    return calculateDiscount(subtotal);
  }, [subtotal]);

  const couponCalc = useMemo(() => {
    return validateAndApplyCoupon(
      appliedCouponCode,
      discountCalc.subtotalAfterThreshold,
    );
  }, [appliedCouponCode, discountCalc.subtotalAfterThreshold]);

  const finalTotal = useMemo(() => {
    const total =
      discountCalc.subtotalAfterThreshold - couponCalc.couponDiscountAmount;
    return Math.max(0, total);
  }, [discountCalc.subtotalAfterThreshold, couponCalc.couponDiscountAmount]);

  // 5. Actions & Handlers
  const handleAddToCart = (item: GroceryItem) => {
    if (cartItems.includes(item.id)) return;

    // Save previous state for undo capability
    setPreviousCart([...cartItems]);
    setCartItems((prev) => [...prev, item.id]);
    setLastActionMessage(`Added "${item.name}" to cart`);
  };

  const handleRemoveFromCart = (item: GroceryItem) => {
    if (!cartItems.includes(item.id)) return;

    // Save previous state for undo capability
    setPreviousCart([...cartItems]);
    setCartItems((prev) => prev.filter((id) => id !== item.id));
    setLastActionMessage(`Removed "${item.name}" from cart`);
  };

  const handleUndo = () => {
    if (previousCart === null) return;

    const restoredCart = [...previousCart];
    setPreviousCart(null); // Single level undo reset
    setCartItems(restoredCart);
    setLastActionMessage("Undid last cart action");
  };

  const handleClearCart = () => {
    if (cartItems.length === 0) return;
    setPreviousCart([...cartItems]);
    setCartItems([]);
    setAppliedCouponCode("");
    clearCartStorage();
    setLastActionMessage("Cleared all items from cart");
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortOption("default");
  };

  const activeFilterCount =
    (searchQuery ? 1 : 0) + (selectedCategory !== "All" ? 1 : 0);

  return (
    <div className="app-container">
      {/* Header Banner */}
      <header className="app-header">
        <div className="header-content">
          <div className="brand-logo">
            <span className="logo-icon" aria-hidden="true">
              🥬
            </span>
            <div className="logo-text">
              <h1>QuickMart</h1>
              <span className="subtitle">Grocery Shopping & Dynamic Cart</span>
            </div>
          </div>
          <div className="header-cart-indicator">
            <span className="cart-icon" aria-hidden="true">
              🛒
            </span>
            <div className="cart-badge-text">
              <strong>{selectedItems.length} Items</strong>
              <span>₹{finalTotal}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main App Layout */}
      <main className="main-layout">
        {/* Left Section: Catalog Browsing */}
        <section className="catalog-section" aria-label="Grocery Catalog">
          <div className="section-header">
            <h2>Available Groceries</h2>
            <span className="item-count-label">
              Showing {processedGroceries.length} of {staticGroceries.length}{" "}
              items
            </span>
          </div>

          <SearchBar value={searchQuery} onChange={setSearchQuery} />

          <Filters
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            sortOption={sortOption}
            onSelectSort={setSortOption}
            activeFilterCount={activeFilterCount}
            onResetFilters={handleResetFilters}
          />

          <GroceryList
            items={processedGroceries}
            cartItemIds={cartItems}
            onAddToCart={handleAddToCart}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onClearFilters={handleResetFilters}
          />
        </section>

        {/* Right Section: Cart & Summary */}
        <section className="cart-section" aria-label="Shopping Cart">
          <div className="cart-sticky-wrapper">
            <div className="section-header">
              <h2>Your Cart</h2>
            </div>

            <DiscountMessage discountCalc={discountCalc} subtotal={subtotal} />

            <Cart
              selectedItems={selectedItems}
              onRemoveFromCart={handleRemoveFromCart}
              onClearCart={handleClearCart}
            />

            {selectedItems.length > 0 && (
              <>
                <CouponInput
                  couponCalc={couponCalc}
                  onApplyCoupon={setAppliedCouponCode}
                  onRemoveCoupon={() => setAppliedCouponCode("")}
                  availableCoupons={staticCoupons.map((c) => c.code)}
                />

                <CartSummary
                  subtotal={subtotal}
                  discountCalc={discountCalc}
                  couponCalc={couponCalc}
                  finalTotal={finalTotal}
                  canUndo={previousCart !== null}
                  onUndo={handleUndo}
                  lastActionMessage={lastActionMessage}
                />
              </>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>QuickMart Machine Test App • Built with React, TypeScript & Vite</p>
      </footer>
    </div>
  );
};

export default App;
