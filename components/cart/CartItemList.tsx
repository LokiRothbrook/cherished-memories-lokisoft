"use client"

/**
 * Cart Item List Component
 *
 * Displays all items in the shopping cart.
 * Features:
 * - Product image, name, and variants
 * - Price display
 * - Quantity controls
 * - Remove button
 * - Animated removal
 */

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, Trash2, Download, Package } from "lucide-react"
import type { CartItem } from "@/lib/context/cart-context"
import { useCart } from "@/lib/context/cart-context"
import { cartPageContent, cartConfig } from "@/lib/data/cart"
import { cn, formatPrice, getProductImage } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function CartItemList() {
  const { cart, updateQuantity, removeItem } = useCart()

  return (
    <div className="space-y-4">
      {/* Header - Desktop */}
      <div className="hidden md:grid md:grid-cols-[2fr,1fr,1fr,1fr,auto] gap-4 px-4 py-3 text-sm font-medium text-muted-foreground border-b border-border">
        <span>{cartPageContent.table.productHeader}</span>
        <span className="text-center">{cartPageContent.table.priceHeader}</span>
        <span className="text-center">{cartPageContent.table.quantityHeader}</span>
        <span className="text-right">{cartPageContent.table.totalHeader}</span>
        <span className="w-10"></span>
      </div>

      {/* Cart Items */}
      <AnimatePresence mode="popLayout">
        {cart.items.map((item) => (
          <CartItemRow
            key={`${item.productId}-${item.selectedVariants.map(v => v.optionId).join("-")}`}
            item={item}
            onUpdateQuantity={(qty) => updateQuantity(item.productId, qty, item.selectedVariants)}
            onRemove={() => removeItem(item.productId, item.selectedVariants)}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

interface CartItemRowProps {
  item: CartItem
  onUpdateQuantity: (quantity: number) => void
  onRemove: () => void
}

function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemRowProps) {
  const unitPrice = item.totalPrice / item.quantity

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
      className="group relative p-4 rounded-xl glass-card"
    >
      {/* Mobile Layout */}
      <div className="md:hidden space-y-4">
        <div className="flex gap-4">
          {/* Image */}
          <Link href={`/shop/${item.productSlug}`} className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted/30">
            <Image
              src={getProductImage([item.productImage], 0)}
              alt={item.productName}
              fill
              className="object-cover"
              sizes="80px"
            />
          </Link>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <Link
                  href={`/shop/${item.productSlug}`}
                  className="font-medium hover:text-primary transition-colors line-clamp-1"
                >
                  {item.productName}
                </Link>

                {/* Variants */}
                {item.selectedVariants.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {item.selectedVariants.map(v => v.value).join(cartPageContent.variants.separator)}
                  </p>
                )}

                {/* Product Type Badge */}
                <Badge variant="outline" className="mt-2 text-xs">
                  {item.productType === "digital" ? (
                    <>
                      <Download className="w-3 h-3 mr-1" />
                      {cartPageContent.badges.digitalProduct}
                    </>
                  ) : (
                    <>
                      <Package className="w-3 h-3 mr-1" />
                      {cartPageContent.badges.physicalProduct}
                    </>
                  )}
                </Badge>
              </div>

              {/* Remove Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onRemove}
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                aria-label={cartPageContent.actions.removeItemAriaLabel.replace("{product}", item.productName)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Price and Quantity Row */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {formatPrice(unitPrice)} each
          </span>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onUpdateQuantity(item.quantity - 1)}
                disabled={item.quantity <= cartConfig.minQuantityPerItem}
                className="h-8 w-8 rounded-r-none"
                aria-label={cartPageContent.actions.decreaseQuantity}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onUpdateQuantity(item.quantity + 1)}
                disabled={item.quantity >= cartConfig.maxQuantityPerItem}
                className="h-8 w-8 rounded-l-none"
                aria-label={cartPageContent.actions.increaseQuantity}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>

            <span className="font-semibold text-primary min-w-[80px] text-right">
              {formatPrice(item.totalPrice)}
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-[2fr,1fr,1fr,1fr,auto] gap-4 items-center">
        {/* Product Info */}
        <div className="flex items-center gap-4">
          <Link href={`/shop/${item.productSlug}`} className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted/30">
            <Image
              src={getProductImage([item.productImage], 0)}
              alt={item.productName}
              fill
              className="object-cover"
              sizes="64px"
            />
          </Link>

          <div className="min-w-0">
            <Link
              href={`/shop/${item.productSlug}`}
              className="font-medium hover:text-primary transition-colors line-clamp-1"
            >
              {item.productName}
            </Link>

            {/* Variants */}
            {item.selectedVariants.length > 0 && (
              <p className="text-sm text-muted-foreground mt-0.5">
                {item.selectedVariants.map(v => v.value).join(cartPageContent.variants.separator)}
              </p>
            )}

            {/* Product Type Badge */}
            <Badge variant="outline" className="mt-1 text-xs">
              {item.productType === "digital" ? (
                <>
                  <Download className="w-3 h-3 mr-1" />
                  {cartPageContent.badges.digitalProduct}
                </>
              ) : (
                <>
                  <Package className="w-3 h-3 mr-1" />
                  {cartPageContent.badges.physicalProduct}
                </>
              )}
            </Badge>
          </div>
        </div>

        {/* Unit Price */}
        <div className="text-center">
          <span className="text-muted-foreground">{formatPrice(unitPrice)}</span>
        </div>

        {/* Quantity Controls */}
        <div className="flex justify-center">
          <div className="flex items-center border border-border rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= cartConfig.minQuantityPerItem}
              className="h-8 w-8 rounded-r-none"
              aria-label={cartPageContent.actions.decreaseQuantity}
            >
              <Minus className="w-3 h-3" />
            </Button>
            <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              disabled={item.quantity >= cartConfig.maxQuantityPerItem}
              className="h-8 w-8 rounded-l-none"
              aria-label={cartPageContent.actions.increaseQuantity}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Line Total */}
        <div className="text-right">
          <span className="font-semibold text-primary">{formatPrice(item.totalPrice)}</span>
        </div>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={cartPageContent.actions.removeItemAriaLabel.replace("{product}", item.productName)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  )
}
