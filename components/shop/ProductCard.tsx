"use client"

/**
 * Product Card Component
 *
 * Displays a product in a card format for grid listings.
 * Features:
 * - Product image with placeholder fallback
 * - Category badge
 * - Price display with discount
 * - Stock status indicator
 * - Hover effects and animations
 */

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingCart, Package, Download } from "lucide-react"
import type { Product } from "@/lib/data/products"
import { getCategoryById } from "@/lib/data/categories"
import { cn, formatPrice, getStockStatus, getProductImage, isProductInStock } from "@/lib/utils"
import { useCart } from "@/lib/context/cart-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = React.useState(false)

  const category = getCategoryById(product.categoryId)
  const stockStatus = getStockStatus(product)
  const inStock = isProductInStock(product)
  const hasVariants = product.variants && product.variants.length > 0
  const primaryImage = getProductImage(product.images)

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!inStock || hasVariants) return

    setIsAdding(true)
    addItem(product, 1)

    setTimeout(() => setIsAdding(false), 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <Link href={`/shop/${product.slug}`} className="block h-full">
        <div className="relative h-full rounded-2xl glass-card overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
          {/* Hover glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-muted/30">
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {/* Category Badge */}
              {category && (
                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                  {category.name}
                </Badge>
              )}

              {/* Discount Badge */}
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <Badge className="bg-destructive text-destructive-foreground">
                  {Math.round((1 - product.price / product.compareAtPrice) * 100)}% OFF
                </Badge>
              )}
            </div>

            {/* Product Type Icon */}
            <div className="absolute top-3 right-3">
              <div className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
                {product.productType === "digital" ? (
                  <Download className="w-4 h-4 text-primary" />
                ) : (
                  <Package className="w-4 h-4 text-primary" />
                )}
              </div>
            </div>

            {/* Quick Add Button - Only for non-variant products */}
            {!hasVariants && inStock && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Button
                  size="sm"
                  onClick={handleQuickAdd}
                  disabled={isAdding}
                  className="glow-blue shadow-lg"
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  {isAdding ? "Added!" : "Add"}
                </Button>
              </motion.div>
            )}

            {/* Sold Out Overlay */}
            {!inStock && (
              <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
                <Badge variant="destructive" className="text-sm px-4 py-1">
                  Sold Out
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Product Name */}
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>

            {/* Short Description */}
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1 min-h-[2.5rem]">
              {product.shortDescription}
            </p>

            {/* Price and Stock */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <span className={cn("text-xs font-medium", stockStatus.className)}>
                {stockStatus.type === "low-stock" ? stockStatus.label : stockStatus.type === "made-to-order" ? "Made to Order" : ""}
              </span>
            </div>

            {/* Variant indicator */}
            {hasVariants && (
              <p className="text-xs text-muted-foreground mt-2">
                {product.variants!.map(v => v.name).join(", ")} options available
              </p>
            )}
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
        </div>
      </Link>
    </motion.div>
  )
}
