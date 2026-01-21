import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProductBySlug, products } from "@/lib/data/products"
import ProductDetailClient from "./product-detail-client"

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return {}
  }

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images.length > 0 ? [
        {
          url: product.images[0],
          alt: product.name,
        },
      ] : undefined,
      type: "website",
    },
  }
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}
