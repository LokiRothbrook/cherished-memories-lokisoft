"use client"

/**
 * Cart Summary Component
 *
 * Displays order summary with subtotal, shipping, and total.
 * Features:
 * - Subtotal calculation
 * - Shipping message
 * - Total display
 * - Checkout button (placeholder)
 * - Continue shopping link
 */

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingBag, ArrowRight, Lock } from "lucide-react"
import { useCart } from "@/lib/context/cart-context"
import { cartPageContent } from "@/lib/data/cart"
import { formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function CartSummary() {
  const { cart } = useCart()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-2xl glass-card p-6 sticky top-24"
    >
      <h2 className="text-lg font-semibold mb-6">{cartPageContent.summary.title}</h2>

      <div className="space-y-4">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">{cartPageContent.summary.subtotalLabel}</span>
          <span className="font-medium">{formatPrice(cart.subtotal)}</span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">{cartPageContent.summary.shippingLabel}</span>
          <span className="text-sm text-muted-foreground">{cartPageContent.summary.shippingMessage}</span>
        </div>

        {/* Tax */}
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">{cartPageContent.summary.taxLabel}</span>
          <span className="text-sm text-muted-foreground">{cartPageContent.summary.taxMessage}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">{cartPageContent.summary.totalLabel}</span>
            <span className="text-xl font-bold text-primary">{formatPrice(cart.subtotal)}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <Button
          size="lg"
          className="w-full glow-blue mt-4"
          disabled
        >
          <Lock className="w-4 h-4 mr-2" />
          {cartPageContent.summary.checkoutButton}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          {cartPageContent.summary.checkoutDisabledMessage}
        </p>

        {/* Continue Shopping */}
        <Link
          href={cartPageContent.summary.continueShoppingHref}
          className="flex items-center justify-center gap-2 text-sm text-primary hover:underline mt-4"
        >
          <ShoppingBag className="w-4 h-4" />
          {cartPageContent.summary.continueShoppingLink}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Item Count */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground text-center">
          {cart.itemCount} {cart.itemCount === 1 ? "item" : "items"} in your cart
        </p>
      </div>
    </motion.div>
  )
}
