"use client"

/**
 * Product Detail Page Client Component
 *
 * The main product detail page with image gallery, product info, and related products.
 */

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, Home } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CtaSection } from "@/components/sections/cta"
import { ImageGallery } from "@/components/shop/ImageGallery"
import { ProductInfo } from "@/components/shop/ProductInfo"
import { RelatedProducts } from "@/components/shop/RelatedProducts"
import type { Product } from "@/lib/data/products"
import { productDetailContent } from "@/lib/data/products"
import { getCategoryById } from "@/lib/data/categories"

interface ProductDetailClientProps {
  product: Product
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const category = getCategoryById(product.categoryId)

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Breadcrumb */}
        <section className="py-4 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Home className="w-4 h-4" />
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link
                href="/shop"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Shop
              </Link>
              {category && (
                <>
                  <span className="text-muted-foreground">/</span>
                  <Link
                    href={`/shop?category=${category.id}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </>
              )}
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium truncate max-w-[200px]">
                {product.name}
              </span>
            </nav>
          </div>
        </section>

        {/* Product Section */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                {productDetailContent.backToShopLink}
              </Link>
            </motion.div>

            {/* Product Layout */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column - Images */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ImageGallery
                  images={product.images}
                  productName={product.name}
                />
              </motion.div>

              {/* Right Column - Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <ProductInfo product={product} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        <RelatedProducts product={product} />

        {/* CTA Section */}
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
