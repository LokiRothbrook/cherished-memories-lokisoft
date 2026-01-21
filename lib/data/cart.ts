// lib/data/cart.ts

/**
 * This file contains content and configuration for the shopping cart.
 * It defines labels, messages, and UI text used throughout the cart experience.
 *
 * === How to Customize ===
 *
 * 1.  **Cart Page Content (`cartPageContent`):**
 *     -   Customize page title, empty cart messages, table headers, and summary labels.
 *
 * 2.  **Cart Notifications (`cartNotifications`):**
 *     -   Customize toast/notification messages for cart actions.
 */

// ============================================================================
// Cart Interfaces (for reference - actual types in cart-context.tsx)
// ============================================================================

/**
 * @interface CartItem
 * Structure of an item in the shopping cart (defined in cart-context.tsx)
 *
 * @property {string} productId - Product identifier
 * @property {string} productName - Product display name
 * @property {string} productSlug - Product URL slug
 * @property {string} productImage - Primary product image
 * @property {"physical" | "digital"} productType - Product type
 * @property {number} basePrice - Base price before variants
 * @property {SelectedVariant[]} selectedVariants - Selected variant options
 * @property {number} quantity - Quantity in cart
 * @property {number} totalPrice - Total price (base + modifiers) * quantity
 */

/**
 * @interface CartState
 * Overall cart state structure (defined in cart-context.tsx)
 *
 * @property {CartItem[]} items - Array of cart items
 * @property {number} itemCount - Total quantity of all items
 * @property {number} subtotal - Sum of all item totals
 * @property {string} lastUpdated - ISO timestamp of last modification
 */

// ============================================================================
// Cart Page Content
// ============================================================================

/**
 * @const cartPageContent
 * Content for the shopping cart page
 */
export const cartPageContent = {
  title: "Shopping Cart",
  description: "Review your items and proceed to checkout.",

  // Empty cart state
  emptyCart: {
    title: "Your cart is empty",
    message: "Looks like you haven't added anything to your cart yet. Browse our products and find something you love!",
    buttonText: "Continue Shopping",
    buttonHref: "/shop"
  },

  // Cart table headers
  table: {
    productHeader: "Product",
    priceHeader: "Price",
    quantityHeader: "Quantity",
    totalHeader: "Total",
    actionsHeader: ""
  },

  // Order summary section
  summary: {
    title: "Order Summary",
    subtotalLabel: "Subtotal",
    shippingLabel: "Shipping",
    shippingMessage: "Calculated at checkout",
    taxLabel: "Tax",
    taxMessage: "Calculated at checkout",
    totalLabel: "Total",
    checkoutButton: "Proceed to Checkout",
    checkoutDisabledMessage: "Checkout coming soon",
    continueShoppingLink: "Continue Shopping",
    continueShoppingHref: "/shop"
  },

  // Item actions
  actions: {
    removeItem: "Remove",
    removeItemAriaLabel: "Remove {product} from cart",
    increaseQuantity: "Increase quantity",
    decreaseQuantity: "Decrease quantity"
  },

  // Badges and labels
  badges: {
    digitalProduct: "Digital Download",
    physicalProduct: "Physical Item",
    madeToOrder: "Made to Order"
  },

  // Variant display
  variants: {
    separator: " / "
  }
}

// ============================================================================
// Cart Notifications
// ============================================================================

/**
 * @const cartNotifications
 * Toast/notification messages for cart actions
 */
export const cartNotifications = {
  itemAdded: {
    title: "Added to cart",
    description: "{product} has been added to your cart."
  },
  itemRemoved: {
    title: "Removed from cart",
    description: "{product} has been removed from your cart."
  },
  itemUpdated: {
    title: "Cart updated",
    description: "Quantity updated for {product}."
  },
  cartCleared: {
    title: "Cart cleared",
    description: "All items have been removed from your cart."
  },
  error: {
    title: "Error",
    description: "Something went wrong. Please try again."
  }
}

// ============================================================================
// Cart Configuration
// ============================================================================

/**
 * @const cartConfig
 * Configuration settings for cart behavior
 */
export const cartConfig = {
  // Maximum quantity per item
  maxQuantityPerItem: 99,

  // Minimum quantity per item
  minQuantityPerItem: 1,

  // localStorage key for cart persistence
  storageKey: "ecom-cart",

  // Show cart indicator animation duration (ms)
  addToCartAnimationDuration: 1000
}
