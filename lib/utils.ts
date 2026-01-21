import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Product } from "./data/products"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export function formatPhoneNumber(value: string): string {
  if (!value) return value
  const phoneNumber = value.replace(/[^\d]/g, "")
  const phoneNumberLength = phoneNumber.length

  if (phoneNumberLength < 4) return phoneNumber
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(
    6,
    10
  )}`
}

// ============================================================================
// E-commerce Utility Functions
// ============================================================================

/**
 * Format a price for display
 * @param price - The price in dollars
 * @param currency - Currency code (default: "USD")
 * @returns Formatted price string (e.g., "$29.99")
 */
export function formatPrice(price: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price)
}

/**
 * Check if a product is in stock
 * @param product - The product to check
 * @returns true if product is available for purchase
 */
export function isProductInStock(product: Product): boolean {
  if (product.inventory.type === "made-to-order") {
    return true
  }
  return (product.inventory.quantity ?? 0) > 0
}

/**
 * Get stock status information for display
 * @param product - The product to check
 * @returns Object with label and className for styling
 */
export function getStockStatus(product: Product): {
  label: string
  className: string
  type: "in-stock" | "low-stock" | "sold-out" | "made-to-order"
} {
  if (product.inventory.type === "made-to-order") {
    return {
      label: product.inventory.leadTimeMessage || "Made to Order",
      className: "text-accent",
      type: "made-to-order"
    }
  }

  const quantity = product.inventory.quantity ?? 0

  if (quantity === 0) {
    return {
      label: "Sold Out",
      className: "text-destructive",
      type: "sold-out"
    }
  }

  if (quantity <= 5) {
    return {
      label: `Only ${quantity} left`,
      className: "text-amber-500",
      type: "low-stock"
    }
  }

  return {
    label: "In Stock",
    className: "text-green-500",
    type: "in-stock"
  }
}

/**
 * Get the product URL
 * @param slug - The product slug
 * @returns Full product URL path
 */
export function getProductUrl(slug: string): string {
  return `/shop/${slug}`
}

/**
 * Get product image with fallback
 * @param images - Array of product images
 * @param index - Index of desired image (default: 0)
 * @returns Image path or placeholder
 */
export function getProductImage(images: string[], index: number = 0): string {
  if (images && images.length > index && images[index]) {
    return images[index]
  }
  return "/placeholder-product.svg"
}

/**
 * Calculate final price with variant modifiers
 * @param basePrice - Base product price
 * @param variantModifiers - Array of price modifier amounts
 * @returns Final price
 */
export function calculatePriceWithVariants(
  basePrice: number,
  variantModifiers: number[]
): number {
  return basePrice + variantModifiers.reduce((sum, mod) => sum + mod, 0)
}
