"use client"

/**
 * Cart Page Client Component
 *
 * The main shopping cart page with item list and order summary.
 */

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingCart, ShoppingBag, ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartItemList } from "@/components/cart/CartItemList"
import { CartSummary } from "@/components/cart/CartSummary"
import { useCart } from "@/lib/context/cart-context"
import { cartPageContent } from "@/lib/data/cart"
import { Button } from "@/components/ui/button"

export default function CartPageClient() {
  const { cart, isHydrated } = useCart()

  // Show loading state while hydrating
  if (!isHydrated) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="animate-pulse space-y-8">
              <div className="h-10 w-48 bg-muted rounded-lg" />
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {[1, 2].map(i => (
                    <div key={i} className="h-32 bg-muted rounded-xl" />
                  ))}
                </div>
                <div className="h-64 bg-muted rounded-xl" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const isEmpty = cart.items.length === 0

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen">
        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 overflow-hidden">
          <div className="absolute inset-0 water-pattern" />
          <motion.div
            className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px]"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold">
                  <span className="gradient-text">{cartPageContent.title}</span>
                </h1>
                <p className="text-muted-foreground">{cartPageContent.description}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cart Content */}
        <section className="py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isEmpty ? (
              /* Empty Cart State */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 max-w-md mx-auto"
              >
                <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                </div>

                <h2 className="text-2xl font-semibold mb-3">
                  {cartPageContent.emptyCart.title}
                </h2>

                <p className="text-muted-foreground mb-8">
                  {cartPageContent.emptyCart.message}
                </p>

                <Button asChild size="lg" className="glow-blue">
                  <Link href={cartPageContent.emptyCart.buttonHref}>
                    {cartPageContent.emptyCart.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            ) : (
              /* Cart with Items */
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  <CartItemList />
                </div>

                {/* Order Summary */}
                <div>
                  <CartSummary />
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
