"use client"

/**
 * Shop Page Client Component
 *
 * The main shop page with product grid, filters, and search.
 * Uses client-side filtering for a responsive experience.
 */

import * as React from "react"
import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CtaSection } from "@/components/sections/cta"
import { ProductCard } from "@/components/shop/ProductCard"
import { ProductFilters, type FilterState } from "@/components/shop/ProductFilters"
import { getActiveProducts, shopPageContent, type Product } from "@/lib/data/products"
import { getCategoryWithDescendants } from "@/lib/data/categories"
import { Button } from "@/components/ui/button"
import { FloralBackground } from "@/components/ui/floral-background"

const PRODUCTS_PER_PAGE = 12

export default function ShopPageClient() {
  const allProducts = getActiveProducts()
  const [filters, setFilters] = React.useState<FilterState>({
    search: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    sort: "newest"
  })
  const [displayCount, setDisplayCount] = React.useState(PRODUCTS_PER_PAGE)

  // Filter and sort products
  const filteredProducts = React.useMemo(() => {
    let result = [...allProducts]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.shortDescription.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    // Category filter (includes subcategories)
    if (filters.category) {
      const categoryIds = getCategoryWithDescendants(filters.category)
      result = result.filter(p =>
        categoryIds.includes(p.categoryId) ||
        (p.subcategoryId && categoryIds.includes(p.subcategoryId))
      )
    }

    // Price range filter
    if (filters.minPrice) {
      const min = parseFloat(filters.minPrice)
      result = result.filter(p => p.price >= min)
    }
    if (filters.maxPrice) {
      const max = parseFloat(filters.maxPrice)
      result = result.filter(p => p.price <= max)
    }

    // Sort
    switch (filters.sort) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
    }

    return result
  }, [allProducts, filters])

  // Products to display (with pagination)
  const displayedProducts = filteredProducts.slice(0, displayCount)
  const hasMore = displayCount < filteredProducts.length

  // Reset display count when filters change
  React.useEffect(() => {
    setDisplayCount(PRODUCTS_PER_PAGE)
  }, [filters])

  const loadMore = () => {
    setDisplayCount(prev => prev + PRODUCTS_PER_PAGE)
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-24 overflow-hidden">
          <div className="absolute inset-0 water-pattern" />
          <FloralBackground />
          <motion.div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px]"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="gradient-text">{shopPageContent.heroTitle}</span>
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {shopPageContent.heroSubtitle}
            </motion.p>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filters */}
            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
              productCount={displayedProducts.length}
              totalCount={filteredProducts.length}
            />

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {displayedProducts.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>

                {/* Load More */}
                {hasMore && (
                  <div className="flex justify-center mt-12">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={loadMore}
                      className="min-w-[200px]"
                    >
                      Load More ({filteredProducts.length - displayCount} remaining)
                    </Button>
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{shopPageContent.emptyState.title}</h3>
                <p className="text-muted-foreground mb-6">{shopPageContent.emptyState.message}</p>
                <Button
                  onClick={() => setFilters({
                    search: "",
                    category: "",
                    minPrice: "",
                    maxPrice: "",
                    sort: "newest"
                  })}
                >
                  {shopPageContent.emptyState.buttonText}
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
