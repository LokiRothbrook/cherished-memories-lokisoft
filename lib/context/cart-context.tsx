"use client"

/**
 * Cart Context Provider
 *
 * This module provides a React Context for managing shopping cart state.
 * Features:
 * - Add/remove/update cart items
 * - Support for product variants
 * - localStorage persistence with hydration handling
 * - Automatic total calculations
 *
 * === Usage ===
 *
 * 1. Wrap your app with CartProvider in layout.tsx:
 *    <CartProvider>{children}</CartProvider>
 *
 * 2. Use the useCart hook in components:
 *    const { cart, addItem, removeItem } = useCart()
 */

import * as React from "react"
import type { Product, SelectedVariant } from "@/lib/data/products"
import { cartConfig } from "@/lib/data/cart"

// ============================================================================
// Types
// ============================================================================

/**
 * Individual cart item
 */
export interface CartItem {
  productId: string
  productName: string
  productSlug: string
  productImage: string
  productType: "physical" | "digital"
  basePrice: number
  selectedVariants: SelectedVariant[]
  quantity: number
  totalPrice: number
}

/**
 * Cart state
 */
export interface CartState {
  items: CartItem[]
  itemCount: number
  subtotal: number
  lastUpdated: string
}

/**
 * Cart context value
 */
export interface CartContextValue {
  cart: CartState
  isHydrated: boolean
  addItem: (product: Product, quantity: number, selectedVariants?: SelectedVariant[]) => void
  removeItem: (productId: string, selectedVariants?: SelectedVariant[]) => void
  updateQuantity: (productId: string, quantity: number, selectedVariants?: SelectedVariant[]) => void
  clearCart: () => void
  isInCart: (productId: string, selectedVariants?: SelectedVariant[]) => boolean
  getItemQuantity: (productId: string, selectedVariants?: SelectedVariant[]) => number
  getCartItem: (productId: string, selectedVariants?: SelectedVariant[]) => CartItem | undefined
}

// ============================================================================
// Initial State
// ============================================================================

const initialCartState: CartState = {
  items: [],
  itemCount: 0,
  subtotal: 0,
  lastUpdated: new Date().toISOString()
}

// ============================================================================
// Context
// ============================================================================

const CartContext = React.createContext<CartContextValue | undefined>(undefined)

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Generate a unique key for a cart item based on product ID and selected variants
 * This allows the same product with different variants to be separate cart items
 */
function getCartItemKey(productId: string, selectedVariants?: SelectedVariant[]): string {
  if (!selectedVariants || selectedVariants.length === 0) {
    return productId
  }

  // Sort variants by ID for consistent key generation
  const variantKey = selectedVariants
    .slice()
    .sort((a, b) => a.variantId.localeCompare(b.variantId))
    .map(v => `${v.variantId}:${v.optionId}`)
    .join("|")

  return `${productId}__${variantKey}`
}

/**
 * Calculate the unit price for an item including variant modifiers
 */
function calculateUnitPrice(
  basePrice: number,
  selectedVariants: SelectedVariant[],
  product?: Product
): number {
  let price = basePrice

  if (selectedVariants && product?.variants) {
    for (const sv of selectedVariants) {
      const variant = product.variants.find(v => v.id === sv.variantId)
      const option = variant?.options.find(o => o.id === sv.optionId)
      if (option?.priceModifier) {
        price += option.priceModifier
      }
    }
  }

  return price
}

/**
 * Recalculate cart totals
 */
function recalculateCart(items: CartItem[]): CartState {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0)

  return {
    items,
    itemCount,
    subtotal,
    lastUpdated: new Date().toISOString()
  }
}

// ============================================================================
// Provider Component
// ============================================================================

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = React.useState<CartState>(initialCartState)
  const [isHydrated, setIsHydrated] = React.useState(false)

  // Load cart from localStorage on mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(cartConfig.storageKey)
      if (stored) {
        const parsed = JSON.parse(stored) as CartState
        // Validate the parsed data has the expected structure
        if (parsed && Array.isArray(parsed.items)) {
          setCart(parsed)
        }
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error)
    }
    setIsHydrated(true)
  }, [])

  // Save cart to localStorage on change (after hydration)
  React.useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(cartConfig.storageKey, JSON.stringify(cart))
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error)
      }
    }
  }, [cart, isHydrated])

  /**
   * Add an item to the cart
   */
  const addItem = React.useCallback((
    product: Product,
    quantity: number,
    selectedVariants?: SelectedVariant[]
  ) => {
    if (quantity <= 0) return

    setCart(prev => {
      const itemKey = getCartItemKey(product.id, selectedVariants)
      const existingIndex = prev.items.findIndex(
        item => getCartItemKey(item.productId, item.selectedVariants) === itemKey
      )

      const unitPrice = calculateUnitPrice(product.price, selectedVariants || [], product)

      if (existingIndex >= 0) {
        // Update existing item
        const newItems = [...prev.items]
        const newQuantity = Math.min(
          newItems[existingIndex].quantity + quantity,
          cartConfig.maxQuantityPerItem
        )
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newQuantity,
          totalPrice: unitPrice * newQuantity
        }
        return recalculateCart(newItems)
      } else {
        // Add new item
        const newItem: CartItem = {
          productId: product.id,
          productName: product.name,
          productSlug: product.slug,
          productImage: product.images[0] || "/placeholder-product.svg",
          productType: product.productType,
          basePrice: product.price,
          selectedVariants: selectedVariants || [],
          quantity: Math.min(quantity, cartConfig.maxQuantityPerItem),
          totalPrice: unitPrice * Math.min(quantity, cartConfig.maxQuantityPerItem)
        }
        return recalculateCart([...prev.items, newItem])
      }
    })
  }, [])

  /**
   * Remove an item from the cart
   */
  const removeItem = React.useCallback((
    productId: string,
    selectedVariants?: SelectedVariant[]
  ) => {
    setCart(prev => {
      const itemKey = getCartItemKey(productId, selectedVariants)
      const newItems = prev.items.filter(
        item => getCartItemKey(item.productId, item.selectedVariants) !== itemKey
      )
      return recalculateCart(newItems)
    })
  }, [])

  /**
   * Update the quantity of an item
   */
  const updateQuantity = React.useCallback((
    productId: string,
    quantity: number,
    selectedVariants?: SelectedVariant[]
  ) => {
    if (quantity <= 0) {
      removeItem(productId, selectedVariants)
      return
    }

    setCart(prev => {
      const itemKey = getCartItemKey(productId, selectedVariants)
      const newItems = prev.items.map(item => {
        if (getCartItemKey(item.productId, item.selectedVariants) === itemKey) {
          const unitPrice = item.totalPrice / item.quantity
          const newQuantity = Math.min(quantity, cartConfig.maxQuantityPerItem)
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: unitPrice * newQuantity
          }
        }
        return item
      })
      return recalculateCart(newItems)
    })
  }, [removeItem])

  /**
   * Clear all items from the cart
   */
  const clearCart = React.useCallback(() => {
    setCart(initialCartState)
  }, [])

  /**
   * Check if an item is in the cart
   */
  const isInCart = React.useCallback((
    productId: string,
    selectedVariants?: SelectedVariant[]
  ): boolean => {
    const itemKey = getCartItemKey(productId, selectedVariants)
    return cart.items.some(
      item => getCartItemKey(item.productId, item.selectedVariants) === itemKey
    )
  }, [cart.items])

  /**
   * Get the quantity of an item in the cart
   */
  const getItemQuantity = React.useCallback((
    productId: string,
    selectedVariants?: SelectedVariant[]
  ): number => {
    const itemKey = getCartItemKey(productId, selectedVariants)
    const item = cart.items.find(
      item => getCartItemKey(item.productId, item.selectedVariants) === itemKey
    )
    return item?.quantity || 0
  }, [cart.items])

  /**
   * Get a specific cart item
   */
  const getCartItem = React.useCallback((
    productId: string,
    selectedVariants?: SelectedVariant[]
  ): CartItem | undefined => {
    const itemKey = getCartItemKey(productId, selectedVariants)
    return cart.items.find(
      item => getCartItemKey(item.productId, item.selectedVariants) === itemKey
    )
  }, [cart.items])

  const value: CartContextValue = React.useMemo(() => ({
    cart,
    isHydrated,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
    getCartItem
  }), [cart, isHydrated, addItem, removeItem, updateQuantity, clearCart, isInCart, getItemQuantity, getCartItem])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// ============================================================================
// Hook
// ============================================================================

/**
 * Hook to access the cart context
 * @throws Error if used outside of CartProvider
 */
export function useCart(): CartContextValue {
  const context = React.useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
