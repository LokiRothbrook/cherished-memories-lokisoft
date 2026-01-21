import type { Metadata } from "next"
import { siteConfig, shopPageContent } from "@/lib/data"
import { notFound } from "next/navigation"
import ShopPageClient from "./shop-client"

export const metadata: Metadata = {
  title: shopPageContent.title,
  description: shopPageContent.description,
  openGraph: {
    title: shopPageContent.heroTitle,
    description: shopPageContent.heroSubtitle,
  },
}

export default function ShopPage() {
  if (!siteConfig.pages.shop.enabled) {
    notFound()
  }

  return <ShopPageClient />
}
