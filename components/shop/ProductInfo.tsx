"use client"

/**
 * Product Info Component
 *
 * Displays product details and add-to-cart functionality.
 * Features:
 * - Product name and price
 * - Discount display
 * - Stock status
 * - Variant selectors
 * - Quantity input
 * - Add to cart button
 */

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Plus, Minus, Check, Package, Download, Truck } from "lucide-react"
import type { Product, SelectedVariant } from "@/lib/data/products"
import { productDetailContent } from "@/lib/data/products"
import { getCategoryById } from "@/lib/data/categories"
import { cartConfig } from "@/lib/data/cart"
import { cn, formatPrice, getStockStatus, isProductInStock, calculatePriceWithVariants } from "@/lib/utils"
import { useCart } from "@/lib/context/cart-context"
import { VariantSelector } from "./VariantSelector"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = React.useState(1)
  const [selectedVariants, setSelectedVariants] = React.useState<SelectedVariant[]>([])
  const [isAdding, setIsAdding] = React.useState(false)
  const [justAdded, setJustAdded] = React.useState(false)

  const category = getCategoryById(product.categoryId)
  const stockStatus = getStockStatus(product)
  const inStock = isProductInStock(product)
  const hasVariants = product.variants && product.variants.length > 0

  // Check if all required variants are selected
  const allVariantsSelected = !hasVariants ||
    (product.variants && product.variants.every(v =>
      selectedVariants.some(sv => sv.variantId === v.id)
    ))

  // Calculate current price with variant modifiers
  const variantModifiers = selectedVariants.map(sv => {
    const variant = product.variants?.find(v => v.id === sv.variantId)
    const option = variant?.options.find(o => o.id === sv.optionId)
    return option?.priceModifier || 0
  })
  const currentPrice = calculatePriceWithVariants(product.price, variantModifiers)

  const canAddToCart = inStock && allVariantsSelected

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => {
      const newValue = prev + delta
      if (newValue < cartConfig.minQuantityPerItem) return cartConfig.minQuantityPerItem
      if (newValue > cartConfig.maxQuantityPerItem) return cartConfig.maxQuantityPerItem
      return newValue
    })
  }

  const handleAddToCart = () => {
    if (!canAddToCart) return

    setIsAdding(true)
    addItem(product, quantity, selectedVariants.length > 0 ? selectedVariants : undefined)

    setTimeout(() => {
      setIsAdding(false)
      setJustAdded(true)
      setTimeout(() => setJustAdded(false), 2000)
    }, 300)
  }

  return (
    <div className="space-y-6">
      {/* Category Badge */}
      {category && (
        <Badge variant="secondary" className="text-sm">
          {category.name}
        </Badge>
      )}

      {/* Product Name */}
      <h1 className="text-3xl sm:text-4xl font-bold">
        <span className="gradient-text">{product.name}</span>
      </h1>

      {/* Short Description */}
      <p className="text-lg text-muted-foreground">
        {product.shortDescription}
      </p>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-primary">
          {formatPrice(currentPrice)}
        </span>
        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <>
            <span className="text-xl text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
            <Badge className="bg-destructive text-destructive-foreground">
              {Math.round((1 - product.price / product.compareAtPrice) * 100)}% OFF
            </Badge>
          </>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-4">
        <div className={cn("flex items-center gap-2", stockStatus.className)}>
          {stockStatus.type === "in-stock" && <Check className="w-4 h-4" />}
          <span className="font-medium">{stockStatus.label}</span>
        </div>

        {/* Product Type Badge */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          {product.productType === "digital" ? (
            <>
              <Download className="w-4 h-4" />
              <span>{productDetailContent.digitalProductBadge}</span>
            </>
          ) : (
            <>
              <Truck className="w-4 h-4" />
              <span>{productDetailContent.physicalProductBadge}</span>
            </>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Variant Selectors */}
      {hasVariants && (
        <VariantSelector
          variants={product.variants!}
          selectedVariants={selectedVariants}
          onSelectionChange={setSelectedVariants}
        />
      )}

      {/* Quantity and Add to Cart */}
      <div className="space-y-4">
        {/* Quantity Selector */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            {productDetailContent.quantityLabel}
          </label>
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= cartConfig.minQuantityPerItem || !inStock}
                className="h-10 w-10 rounded-r-none"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= cartConfig.maxQuantityPerItem || !inStock}
                className="h-10 w-10 rounded-l-none"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Stock indicator for limited items */}
            {stockStatus.type === "low-stock" && (
              <span className="text-sm text-amber-500 font-medium">
                {stockStatus.label}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          size="lg"
          className={cn(
            "w-full text-lg h-14 transition-all",
            canAddToCart && "glow-blue"
          )}
          disabled={!canAddToCart || isAdding}
          onClick={handleAddToCart}
        >
          <AnimatePresence mode="wait">
            {justAdded ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                {productDetailContent.addedToCartButton}
              </motion.span>
            ) : !inStock ? (
              <motion.span
                key="soldout"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {productDetailContent.soldOutButton}
              </motion.span>
            ) : !allVariantsSelected ? (
              <motion.span
                key="select"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                Select Options
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <ShoppingCart className={cn("w-5 h-5", isAdding && "animate-bounce")} />
                {productDetailContent.addToCartButton} — {formatPrice(currentPrice * quantity)}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>

        {/* Made to Order Message */}
        {product.inventory.type === "made-to-order" && product.inventory.leadTimeMessage && (
          <p className="text-sm text-center text-muted-foreground">
            <Package className="w-4 h-4 inline-block mr-1" />
            {product.inventory.leadTimeMessage}
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Full Description */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Description</h3>
        <p className="text-muted-foreground leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {product.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
