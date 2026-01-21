"use client"

/**
 * Featured Products Section
 *
 * Displays featured products on the homepage.
 * Features:
 * - Grid of featured products
 * - Load more functionality
 * - View all button
 * - Staggered animations
 */

import * as React from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"
import { getFeaturedProducts, featuredProductsSectionContent } from "@/lib/data/products"
import { ProductCard } from "@/components/shop/ProductCard"
import { Button } from "@/components/ui/button"

const INITIAL_COUNT = 6
const LOAD_MORE_COUNT = 6
const MAX_COUNT = 12

export function FeaturedProductsSection() {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [displayCount, setDisplayCount] = React.useState(INITIAL_COUNT)

  const allFeaturedProducts = getFeaturedProducts()
  const displayedProducts = allFeaturedProducts.slice(0, displayCount)
  const hasMore = displayCount < Math.min(allFeaturedProducts.length, MAX_COUNT)

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + LOAD_MORE_COUNT, MAX_COUNT))
  }

  if (allFeaturedProducts.length === 0) {
    return null
  }

  return (
    <section id="featured-products" className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 water-pattern" />
      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]"
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">{featuredProductsSectionContent.title}</span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {featuredProductsSectionContent.subtitle}
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          {/* Load More Button */}
          {hasMore && (
            <Button
              variant="outline"
              size="lg"
              onClick={loadMore}
              className="min-w-[200px]"
            >
              {featuredProductsSectionContent.loadMoreButton}
            </Button>
          )}

          {/* View All Button */}
          <Button asChild size="lg" className="glow-blue min-w-[200px]">
            <Link href={featuredProductsSectionContent.viewAllHref}>
              {featuredProductsSectionContent.viewAllButton}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
