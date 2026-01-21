// lib/data/products.ts

/**
 * This file contains data specific to the "Shop" section and product pages.
 * It defines the structure of products, variants, and inventory, along with
 * content for the shop pages and featured products section.
 *
 * === How to Customize ===
 *
 * 1.  **Product Interface (`Product`):**
 *     -   Defines the properties for each product (id, name, price, etc.).
 *     -   `iconName`: Use the exact name of an icon from `lucide-react`
 *         (e.g., "Package", "Download"). These are mapped via `lib/icon-map.ts`.
 *     -   `images`: Array of image paths. First image is the primary/featured image.
 *     -   `variants`: Optional array of variant types (size, color, etc.)
 *
 * 2.  **Products Array (`products`):**
 *     -   This is the core list of products your store offers.
 *     -   Add, remove, or modify product objects in this array.
 *     -   Ensure `images` paths correspond to images in the `public/products` directory.
 *
 * 3.  **Shop Page Content (`shopPageContent`):**
 *     -   Customize titles, subtitles, filter labels, and sort options.
 *
 * 4.  **Featured Products Content (`featuredProductsSectionContent`):**
 *     -   Customize the homepage featured products section.
 */

// ============================================================================
// Product Interfaces
// ============================================================================

/**
 * @interface ProductVariantOption
 * Represents a single option within a variant type (e.g., "Small" for Size variant)
 *
 * @property {string} id - Unique identifier for this option
 * @property {string} value - Internal value (e.g., "small", "red")
 * @property {string} label - Display label (e.g., "Small", "Ruby Red")
 * @property {number} [priceModifier] - Amount to add/subtract from base price
 * @property {boolean} inStock - Whether this option is currently available
 */
export interface ProductVariantOption {
  id: string
  value: string
  label: string
  priceModifier?: number
  inStock: boolean
}

/**
 * @interface ProductVariant
 * Represents a variant type (e.g., "Size", "Color")
 *
 * @property {string} id - Unique identifier for this variant type
 * @property {string} name - Display name (e.g., "Size", "Color")
 * @property {ProductVariantOption[]} options - Available options for this variant
 */
export interface ProductVariant {
  id: string
  name: string
  options: ProductVariantOption[]
}

/**
 * @interface ProductInventory
 * Defines the inventory/stock status of a product
 *
 * @property {"stock" | "made-to-order"} type - Inventory management type
 * @property {number} [quantity] - Current stock quantity (for "stock" type)
 * @property {string} [leadTimeMessage] - Lead time message (for "made-to-order" type)
 */
export interface ProductInventory {
  type: "stock" | "made-to-order"
  quantity?: number
  leadTimeMessage?: string
}

/**
 * @interface Product
 * Defines the structure for a product object.
 *
 * @property {string} id - Unique identifier for the product
 * @property {string} slug - URL-friendly identifier (used in /shop/[slug])
 * @property {string} name - Product display name
 * @property {string} shortDescription - Brief summary for product cards
 * @property {string} description - Full description for product detail page
 * @property {number} price - Base price in dollars
 * @property {number} [compareAtPrice] - Original price for showing discounts
 * @property {string[]} images - Array of image paths (first is primary)
 * @property {string} categoryId - Reference to category
 * @property {string} [subcategoryId] - Optional subcategory reference
 * @property {"physical" | "digital"} productType - Product delivery type
 * @property {ProductVariant[]} [variants] - Optional variants (size, color, etc.)
 * @property {ProductInventory} inventory - Stock/availability information
 * @property {boolean} isFeatured - Show on homepage featured section
 * @property {boolean} isActive - Published/draft status
 * @property {string} [iconName] - Lucide icon name for product type
 * @property {string[]} [tags] - Searchable tags
 * @property {string} createdAt - ISO date string
 * @property {string[]} [relatedProductIds] - IDs of related products
 */
export interface Product {
  id: string
  slug: string
  name: string
  shortDescription: string
  description: string
  price: number
  compareAtPrice?: number
  images: string[]
  categoryId: string
  subcategoryId?: string
  productType: "physical" | "digital"
  variants?: ProductVariant[]
  inventory: ProductInventory
  isFeatured: boolean
  isActive: boolean
  iconName?: string
  tags?: string[]
  createdAt: string
  relatedProductIds?: string[]
}

/**
 * @interface SelectedVariant
 * Represents a user's selected variant option (used in cart)
 *
 * @property {string} variantId - The variant type ID (e.g., "size")
 * @property {string} optionId - The selected option ID (e.g., "sm")
 * @property {string} name - Variant name for display (e.g., "Size")
 * @property {string} value - Selected value for display (e.g., "Small")
 */
export interface SelectedVariant {
  variantId: string
  optionId: string
  name: string
  value: string
}

// ============================================================================
// Sample Products Data
// ============================================================================

/**
 * @const products
 * An array of product objects representing items available in the store.
 * This data is used to populate the shop page, product detail pages, and featured sections.
 *
 * === How to Customize ===
 * - Add, remove, or reorder objects in this array.
 * - Replace placeholder text with your actual product details.
 * - Update image paths to point to your product images in `public/products`.
 * - Set `isFeatured: true` for products to display on the homepage.
 */
export const products: Product[] = [
  // Memorabilia: Engraved Memory Boxes
  {
    id: "mem-001",
    slug: "engraved-memory-box",
    name: "Engraved Wooden Memory Box",
    shortDescription: "A beautiful, personalized box to store precious memories.",
    description: "Our handcrafted wooden memory boxes are perfect for keeping mementos, photos, and letters. Each box can be custom engraved with names, dates, or a special message, making it a unique and cherished keepsake for memorial items or celebrating special occasions.",
    price: 85.00,
    images: [],
    categoryId: "memorabilia",
    subcategoryId: "memorial-items",
    productType: "physical",
    variants: [
      {
        id: "wood-type",
        name: "Wood Type",
        options: [
          { id: "oak", value: "oak", label: "Oak", inStock: true },
          { id: "maple", value: "maple", label: "Maple", priceModifier: 10, inStock: true }
        ]
      },
      {
        id: "engraving",
        name: "Engraving Style",
        options: [
          { id: "classic", value: "classic", label: "Classic Font", inStock: true },
          { id: "script", value: "script", label: "Script Font", inStock: true }
        ]
      }
    ],
    inventory: { type: "made-to-order", leadTimeMessage: "Ships in 1-2 weeks" },
    isFeatured: true,
    isActive: true,
    iconName: "Gift",
    tags: ["memory box", "keepsake", "engraved", "memorial", "personalized"],
    createdAt: "2024-04-01T00:00:00Z",
    relatedProductIds: ["mem-002", "mem-003"]
  },
  // Memorabilia: Custom Photo Albums
  {
    id: "mem-002",
    slug: "custom-photo-album",
    name: "Custom Linen Photo Album",
    shortDescription: "Preserve your cherished photos in a beautifully crafted album.",
    description: "Our custom photo albums are made with high-quality linen covers and archival-safe pages, perfect for preserving your most treasured photographs. Personalize the cover with embossed text for a truly special touch, ideal for wedding memories or family histories.",
    price: 60.00,
    images: [],
    categoryId: "memorabilia",
    subcategoryId: "celebration-items",
    productType: "physical",
    variants: [
      {
        id: "color",
        name: "Color",
        options: [
          { id: "cream", value: "cream", label: "Cream", inStock: true },
          { id: "blush", value: "blush", label: "Blush Pink", inStock: true },
          { id: "sage", value: "sage", label: "Sage Green", inStock: true }
        ]
      }
    ],
    inventory: { type: "stock", quantity: 30 },
    isFeatured: true,
    isActive: true,
    iconName: "BookImage",
    tags: ["photo album", "keepsake", "linen", "personalized", "celebration"],
    createdAt: "2024-04-05T00:00:00Z",
    relatedProductIds: ["mem-001", "mem-003"]
  },
  // Memorabilia: Personalized Candle
  {
    id: "mem-003",
    slug: "personalized-memorial-candle",
    name: "Personalized Memorial Candle",
    shortDescription: "A soothing light to remember and honor a loved one.",
    description: "Our personalized memorial candles provide a gentle glow and a comforting presence. Each candle can be customized with a name, date, and a short message, making it a thoughtful tribute for any home or service. Made with natural soy wax and essential oils.",
    price: 35.00,
    images: [],
    categoryId: "memorabilia",
    subcategoryId: "home-decor",
    productType: "physical",
    variants: [
      {
        id: "scent",
        name: "Scent",
        options: [
          { id: "lavender", value: "lavender", label: "Lavender Dream", inStock: true },
          { id: "sandalwood", value: "sandalwood", label: "Warm Sandalwood", inStock: true }
        ]
      }
    ],
    inventory: { type: "stock", quantity: 50 },
    isFeatured: true,
    isActive: true,
    iconName: "Candlestick",
    tags: ["candle", "memorial", "personalized", "home decor", "tribute"],
    createdAt: "2024-04-10T00:00:00Z",
    relatedProductIds: ["mem-001", "mem-002"]
  },
  // Digital Products: Animated Video Tribute
  {
    id: "dig-001",
    slug: "animated-video-tribute",
    name: "Animated Video Tribute Service",
    shortDescription: "A professional, custom-animated video to honor a life.",
    description: "Our bespoke animated video tributes combine your cherished photos and video clips with elegant animations, heartfelt music, and personalized text. This service creates a beautiful and lasting digital memorial, perfect for sharing at services or with loved ones online.",
    price: 499.00,
    images: [],
    categoryId: "digital-products",
    subcategoryId: "video-tributes",
    productType: "digital",
    inventory: { type: "made-to-order", leadTimeMessage: "Delivered in 1-3 weeks" },
    isFeatured: true,
    isActive: true,
    iconName: "MonitorPlay",
    tags: ["video", "tribute", "memorial", "digital", "animation", "custom"],
    createdAt: "2024-04-15T00:00:00Z",
    relatedProductIds: ["dig-002", "card-001"]
  },
  // Cards & Stationery: Custom Memorial Cards
  {
    id: "card-001",
    slug: "custom-memorial-cards",
    name: "Custom Memorial Service Cards",
    shortDescription: "Elegantly designed cards for memorial services and attendees.",
    description: "Offer a beautiful keepsake to those attending a memorial service with our custom-designed cards. Choose from various designs and personalize with photos, verses, and service details. Printed on high-quality card stock.",
    price: 75.00,
    images: [],
    categoryId: "cards-stationery",
    subcategoryId: "memorial-cards",
    productType: "physical",
    variants: [
      {
        id: "quantity",
        name: "Quantity",
        options: [
          { id: "25", value: "25", label: "25 Cards", inStock: true },
          { id: "50", value: "50", label: "50 Cards", priceModifier: 40, inStock: true },
          { id: "100", value: "100", label: "100 Cards", priceModifier: 90, inStock: true }
        ]
      }
    ],
    inventory: { type: "made-to-order", leadTimeMessage: "Ships in 3-5 business days" },
    isFeatured: true,
    isActive: true,
    iconName: "ScrollText",
    tags: ["cards", "memorial", "stationery", "custom print"],
    createdAt: "2024-04-20T00:00:00Z",
    relatedProductIds: ["card-002", "dig-001"]
  },
  // Cards & Stationery: Thank You Notes
  {
    id: "card-002",
    slug: "personalized-thank-you-notes",
    name: "Personalized Thank You Notes",
    shortDescription: "Express your gratitude with custom-designed notes.",
    description: "Send heartfelt thanks with our personalized thank you notes. Available in various styles, these cards can be customized with a name and message, offering a thoughtful way to acknowledge support during difficult times or after special events.",
    price: 45.00,
    images: [],
    categoryId: "cards-stationery",
    subcategoryId: "memorial-cards",
    productType: "physical",
    variants: [
      {
        id: "quantity",
        name: "Quantity",
        options: [
          { id: "25", value: "25", label: "25 Notes", inStock: true },
          { id: "50", value: "50", label: "50 Notes", priceModifier: 30, inStock: true }
        ]
      }
    ],
    inventory: { type: "made-to-order", leadTimeMessage: "Ships in 3-5 business days" },
    isFeatured: false,
    isActive: true,
    iconName: "Mail",
    tags: ["thank you", "cards", "stationery", "personalized"],
    createdAt: "2024-04-25T00:00:00Z",
    relatedProductIds: ["card-001"]
  },
  // Digital Products: Custom Digital Art
  {
    id: "dig-002",
    slug: "custom-digital-portrait",
    name: "Custom Digital Portrait",
    shortDescription: "A unique, hand-drawn digital portrait from your favorite photo.",
    description: "Turn a cherished photograph into a beautiful digital portrait. Our artists create a custom, hand-drawn digital illustration perfect for printing, sharing online, or as a unique gift. A timeless piece of art that captures the essence of a memory.",
    price: 120.00,
    images: [],
    categoryId: "digital-products",
    subcategoryId: "digital-art",
    productType: "digital",
    inventory: { type: "made-to-order", leadTimeMessage: "Delivered in 1 week" },
    isFeatured: false,
    isActive: true,
    iconName: "Paintbrush",
    tags: ["digital art", "portrait", "custom", "photo", "gift"],
    createdAt: "2024-05-01T00:00:00Z",
    relatedProductIds: ["dig-001"]
  }
]

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get a product by its slug
 * @param slug - The product slug to find
 * @returns The product or undefined if not found
 */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug && p.isActive)
}

/**
 * Get all active products
 * @returns Array of active products
 */
export function getActiveProducts(): Product[] {
  return products.filter(p => p.isActive)
}

/**
 * Get featured products
 * @param limit - Maximum number of products to return
 * @returns Array of featured products
 */
export function getFeaturedProducts(limit?: number): Product[] {
  const featured = products.filter(p => p.isFeatured && p.isActive)
  return limit ? featured.slice(0, limit) : featured
}

/**
 * Get products by category
 * @param categoryId - The category ID to filter by
 * @returns Array of products in the category
 */
export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(p => p.categoryId === categoryId && p.isActive)
}

/**
 * Get related products for a given product
 * @param product - The product to find related items for
 * @param limit - Maximum number of related products
 * @returns Array of related products
 */
export function getRelatedProducts(product: Product, limit: number = 4): Product[] {
  if (product.relatedProductIds && product.relatedProductIds.length > 0) {
    return product.relatedProductIds
      .map(id => products.find(p => p.id === id && p.isActive))
      .filter((p): p is Product => p !== undefined)
      .slice(0, limit)
  }
  // Fallback to same category
  return products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id && p.isActive)
    .slice(0, limit)
}

// ============================================================================
// Page Content
// ============================================================================

/**
 * @const shopPageContent
 * Content for the main shop page including titles, filter labels, and sort options.
 */
export const shopPageContent = {
  title: "Our Collection",
  description: "Browse our thoughtful collection of personalized memorabilia, cards, and digital tributes.",
  heroTitle: "Our Heartfelt Creations",
  heroSubtitle: "Discover unique items crafted with care to help you cherish every memory and celebrate every life.",
  filters: {
    categoryLabel: "Category",
    priceLabel: "Price Range",
    sortLabel: "Sort By",
    searchPlaceholder: "Search items...",
    clearFilters: "Clear Filters",
    showFilters: "Show Filters",
    hideFilters: "Hide Filters"
  },
  sortOptions: [
    { value: "newest", label: "Newest Arrivals" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A-Z" },
    { value: "name-desc", label: "Name: Z-A" }
  ],
  emptyState: {
    title: "No items found",
    message: "Try adjusting your filters or search terms. If you don't see what you're looking for, contact us for a custom creation!",
    buttonText: "Clear Filters"
  },
  pagination: {
    previous: "Previous",
    next: "Next",
    showing: "Showing",
    of: "of",
    products: "items"
  }
}

/**
 * @const productDetailContent
 * Content for individual product detail pages.
 */
export const productDetailContent = {
  addToCartButton: "Add to Cart",
  addedToCartButton: "Added!",
  soldOutButton: "Sold Out",
  madeToOrderLabel: "Custom Order",
  inStockLabel: "Available",
  lowStockLabel: "Only {count} remaining",
  selectVariantPrompt: "Select {variant}",
  quantityLabel: "Quantity",
  relatedProductsTitle: "Thoughtful Companions",
  relatedProductsSubtitle: "Customers interested in this item also appreciated these.",
  backToShopLink: "Back to All Items",
  digitalProductBadge: "Instant Download",
  physicalProductBadge: "Ships with Care"
}

/**
 * @const featuredProductsSectionContent
 * Content for the homepage featured products section.
 */
export const featuredProductsSectionContent = {
  sectionTitle: "Featured Items",
  title: "Treasures for Every Memory",
  subtitle: "Handpicked items that resonate with our customers, crafted with care and designed for lasting remembrance.",
  loadMoreButton: "Discover More",
  viewAllButton: "View All Items",
  viewAllHref: "/shop"
}
