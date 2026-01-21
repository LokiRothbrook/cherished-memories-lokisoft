"use client"

/**
 * Related Products Component
 *
 * Displays a grid of related products.
 * Features:
 * - Uses product's relatedProductIds or falls back to same category
 * - Staggered animations
 * - Responsive grid
 */

import * as React from "react"
import { motion } from "framer-motion"
import type { Product } from "@/lib/data/products"
import { getRelatedProducts, productDetailContent } from "@/lib/data/products"
import { ProductCard } from "./ProductCard"

interface RelatedProductsProps {
  product: Product
  limit?: number
}

export function RelatedProducts({ product, limit = 4 }: RelatedProductsProps) {
  const relatedProducts = getRelatedProducts(product, limit)

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-3">
            <span className="gradient-text">{productDetailContent.relatedProductsTitle}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {productDetailContent.relatedProductsSubtitle}
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {relatedProducts.map((relatedProduct, index) => (
            <ProductCard
              key={relatedProduct.id}
              product={relatedProduct}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
