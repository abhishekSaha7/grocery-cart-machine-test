# Grocery Cart Machine Test

A grocery shopping cart application built with React, TypeScript, and Vite.

## Features

- Display static grocery products
- Add and remove products from cart
- Prevent duplicate products
- Dynamic cart subtotal and final total
- Percentage-based threshold discounts
- Coupon code system
- Product search
- Category filtering
- Price sorting
- Cart persistence using LocalStorage
- One-level Undo for the last cart action
- Clear cart functionality
- Responsive UI

## Tech Stack

- React
- TypeScript
- Vite
- CSS

## State Management

The application uses React's built-in `useState` for client-side state management.

The main cart state stores selected grocery item IDs.

Derived values such as:

- selected items
- subtotal
- discount
- coupon discount
- final total

are calculated from the current state instead of being stored as separate state.

## Project Structure

```text
src/
├── components/
├── data/
├── types/
├── utils/
├── App.tsx
├── main.tsx
└── index.css
