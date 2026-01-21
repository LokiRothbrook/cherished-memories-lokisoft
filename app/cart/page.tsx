import type { Metadata } from "next"
import { siteConfig, cartPageContent } from "@/lib/data"
import { notFound } from "next/navigation"
import CartPageClient from "./cart-client"

export const metadata: Metadata = {
  title: cartPageContent.title,
  description: cartPageContent.description,
}

export default function CartPage() {
  if (!siteConfig.pages.cart.enabled) {
    notFound()
  }

  return <CartPageClient />
}
