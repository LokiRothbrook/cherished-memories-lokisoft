"use client"

/**
 * Cart Indicator Component
 *
 * A shopping cart icon with badge showing the number of items.
 * Used in the header for quick cart access.
 *
 * Features:
 * - Animated badge on item count change
 * - Links to cart page
 * - Hides badge when cart is empty
 */

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/context/cart-context"
import { cn } from "@/lib/utils"

interface CartIndicatorProps {
  className?: string
  iconClassName?: string
  showLabel?: boolean
  label?: string
}

export function CartIndicator({
  className,
  iconClassName,
  showLabel = false,
  label = "Cart"
}: CartIndicatorProps) {
  const { cart, isHydrated } = useCart()
  const [isAnimating, setIsAnimating] = React.useState(false)
  const prevCount = React.useRef(cart.itemCount)

  // Animate badge when item count increases
  React.useEffect(() => {
    if (isHydrated && cart.itemCount > prevCount.current) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 300)
      return () => clearTimeout(timer)
    }
    prevCount.current = cart.itemCount
  }, [cart.itemCount, isHydrated])

  return (
    <Link
      href="/cart"
      className={cn(
        "relative flex items-center gap-2 p-2 rounded-lg transition-colors hover:bg-white/10",
        className
      )}
      aria-label={`Shopping cart with ${cart.itemCount} items`}
    >
      <div className="relative">
        <ShoppingCart className={cn("w-5 h-5", iconClassName)} />

        {/* Badge */}
        <AnimatePresence>
          {isHydrated && cart.itemCount > 0 && (
            <motion.span
              key="cart-badge"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isAnimating ? [1, 1.3, 1] : 1,
                opacity: 1
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "absolute -top-2 -right-2 flex items-center justify-center",
                "min-w-[18px] h-[18px] px-1 rounded-full",
                "bg-primary text-primary-foreground text-xs font-medium",
                "border-2 border-background"
              )}
            >
              {cart.itemCount > 99 ? "99+" : cart.itemCount}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {showLabel && (
        <span className="text-sm font-medium">{label}</span>
      )}
    </Link>
  )
}

/**
 * Mini cart preview for header dropdown (optional future enhancement)
 * For now, we just use the indicator with badge
 */
export function CartPreview() {
  const { cart, isHydrated } = useCart()

  if (!isHydrated) {
    return null
  }

  if (cart.items.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">
        Your cart is empty
      </div>
    )
  }

  return (
    <div className="p-4 space-y-3">
      <p className="text-sm font-medium">
        {cart.itemCount} {cart.itemCount === 1 ? "item" : "items"} in cart
      </p>
      <Link
        href="/cart"
        className="block w-full py-2 px-4 text-center text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
      >
        View Cart
      </Link>
    </div>
  )
}
