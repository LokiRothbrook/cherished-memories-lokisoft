// lib/data/categories.ts

/**
 * This file contains data specific to product categories.
 * It supports both flat (single-level) and nested (hierarchical) category structures.
 *
 * === How to Customize ===
 *
 * 1.  **Category Interface (`Category`):**
 *     -   Defines the properties for each category.
 *     -   `parentId`: Set to undefined for top-level categories, or reference
 *         another category's ID to create subcategories.
 *
 * 2.  **Categories Array (`categories`):**
 *     -   Add, remove, or modify category objects.
 *     -   Use `sortOrder` to control display order.
 *     -   Ensure category IDs match the `categoryId` in products.ts.
 *
 * 3.  **Helper Functions:**
 *     -   Use provided functions to build category trees and filter products.
 */

// ============================================================================
// Category Interfaces
// ============================================================================

/**
 * @interface Category
 * Defines the structure for a category object.
 *
 * @property {string} id - Unique identifier for the category
 * @property {string} slug - URL-friendly identifier
 * @property {string} name - Display name
 * @property {string} [description] - Optional description for category pages
 * @property {string} [image] - Optional banner/thumbnail image path
 * @property {string} [iconName] - Lucide icon name for visual representation
 * @property {string} [parentId] - Parent category ID (undefined for top-level)
 * @property {boolean} isActive - Whether category is visible/active
 * @property {number} sortOrder - Order for display (lower = first)
 */
export interface Category {
  id: string
  slug: string
  name: string
  description?: string
  image?: string
  iconName?: string
  parentId?: string
  isActive: boolean
  sortOrder: number
}

/**
 * @interface CategoryWithChildren
 * Extended category interface with resolved children (computed at runtime)
 *
 * @extends Category
 * @property {CategoryWithChildren[]} [children] - Nested subcategories
 */
export interface CategoryWithChildren extends Category {
  children?: CategoryWithChildren[]
}

// ============================================================================
// Categories Data
// ============================================================================

/**
 * @const categories
 * An array of category objects representing product categories.
 * Supports single-level and nested structures via the `parentId` property.
 *
 * === How to Customize ===
 * - Add new categories by adding objects to this array.
 * - Create subcategories by setting `parentId` to a parent category's `id`.
 * - Use `sortOrder` to control display order within each level.
 * - Set `isActive: false` to hide categories without deleting them.
 */
export const categories: Category[] = [
  // Top-level Categories for Cherished Memories
  {
    id: "memorabilia",
    slug: "memorabilia",
    name: "Memorabilia",
    description: "Personalized keepsakes and decorative items to cherish memories.",
    image: "/categories/memorabilia.svg",
    iconName: "Gift",
    isActive: true,
    sortOrder: 1
  },
  {
    id: "cards-stationery",
    slug: "cards-stationery",
    name: "Cards & Stationery",
    description: "Custom-designed cards, programs, and announcements for all occasions.",
    image: "/categories/cards.svg",
    iconName: "Mail",
    isActive: true,
    sortOrder: 2
  },
  {
    id: "digital-products",
    slug: "digital-products",
    name: "Digital Products",
    description: "Custom video tributes and digital memorials.",
    image: "/categories/digital-tributes.svg",
    iconName: "MonitorPlay",
    isActive: true,
    sortOrder: 3
  },

  // Subcategories for Memorabilia
  {
    id: "memorial-items",
    slug: "memorial-items",
    name: "Memorial Items",
    description: "Thoughtful items specifically designed for memorial services and tributes.",
    iconName: "HeartHandshake",
    parentId: "memorabilia",
    isActive: true,
    sortOrder: 1
  },
  {
    id: "celebration-items",
    slug: "celebration-items",
    name: "Celebration Items",
    description: "Decorative items and keepsakes for celebrations of life and special events.",
    iconName: "PartyPopper",
    parentId: "memorabilia",
    isActive: true,
    sortOrder: 2
  },
  {
    id: "home-decor",
    slug: "home-decor",
    name: "Home Decor",
    description: "Handcrafted decorative items to adorn your home.",
    iconName: "Home",
    parentId: "memorabilia",
    isActive: true,
    sortOrder: 3
  },

  // Subcategories for Cards & Stationery
  {
    id: "memorial-cards",
    slug: "memorial-cards",
    name: "Memorial Cards",
    description: "Custom printed cards for memorial services and thank you notes.",
    iconName: "ScrollText",
    parentId: "cards-stationery",
    isActive: true,
    sortOrder: 1
  },
  {
    id: "event-invitations",
    slug: "event-invitations",
    name: "Event Invitations",
    description: "Personalized invitations for celebrations of life and other events.",
    iconName: "CalendarDays",
    parentId: "cards-stationery",
    isActive: true,
    sortOrder: 2
  },

  // Subcategories for Digital Products
  {
    id: "video-tributes",
    slug: "video-tributes",
    name: "Video Tributes",
    description: "Professionally produced video memorials and tributes.",
    iconName: "Video",
    parentId: "digital-products",
    isActive: true,
    sortOrder: 1
  },
  {
    id: "digital-art",
    slug: "digital-art",
    name: "Digital Art",
    description: "Custom digital artwork and printable designs.",
    iconName: "Paintbrush",
    parentId: "digital-products",
    isActive: true,
    sortOrder: 2
  }
]

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get a category by its ID
 * @param id - The category ID to find
 * @returns The category or undefined
 */
export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id && c.isActive)
}

/**
 * Get a category by its slug
 * @param slug - The category slug to find
 * @returns The category or undefined
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug && c.isActive)
}

/**
 * Get all top-level categories (no parent)
 * @returns Array of top-level categories sorted by sortOrder
 */
export function getTopLevelCategories(): Category[] {
  return categories
    .filter(c => !c.parentId && c.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

/**
 * Get subcategories for a given parent
 * @param parentId - The parent category ID
 * @returns Array of subcategories sorted by sortOrder
 */
export function getSubcategories(parentId: string): Category[] {
  return categories
    .filter(c => c.parentId === parentId && c.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

/**
 * Check if a category has subcategories
 * @param categoryId - The category ID to check
 * @returns true if the category has active subcategories
 */
export function hasSubcategories(categoryId: string): boolean {
  return categories.some(c => c.parentId === categoryId && c.isActive)
}

/**
 * Build a hierarchical category tree
 * @returns Array of top-level categories with nested children
 */
export function buildCategoryTree(): CategoryWithChildren[] {
  const topLevel = getTopLevelCategories()

  const buildChildren = (parentId: string): CategoryWithChildren[] => {
    const children = getSubcategories(parentId)
    return children.map(child => ({
      ...child,
      children: hasSubcategories(child.id) ? buildChildren(child.id) : undefined
    }))
  }

  return topLevel.map(cat => ({
    ...cat,
    children: hasSubcategories(cat.id) ? buildChildren(cat.id) : undefined
  }))
}

/**
 * Get all category IDs including a category and its descendants
 * Useful for filtering products by category including subcategories
 * @param categoryId - The root category ID
 * @returns Array of category IDs
 */
export function getCategoryWithDescendants(categoryId: string): string[] {
  const result: string[] = [categoryId]

  const addDescendants = (parentId: string) => {
    const children = categories.filter(c => c.parentId === parentId && c.isActive)
    children.forEach(child => {
      result.push(child.id)
      addDescendants(child.id)
    })
  }

  addDescendants(categoryId)
  return result
}

/**
 * Get breadcrumb trail for a category
 * @param categoryId - The category ID
 * @returns Array of categories from root to the specified category
 */
export function getCategoryBreadcrumb(categoryId: string): Category[] {
  const breadcrumb: Category[] = []
  let current = getCategoryById(categoryId)

  while (current) {
    breadcrumb.unshift(current)
    current = current.parentId ? getCategoryById(current.parentId) : undefined
  }

  return breadcrumb
}

/**
 * Get all active categories as a flat list
 * @returns Array of all active categories
 */
export function getAllCategories(): Category[] {
  return categories
    .filter(c => c.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

// ============================================================================
// Page Content
// ============================================================================

/**
 * @const categorySectionContent
 * Content for category-related UI elements
 */
export const categorySectionContent = {
  allCategoriesLabel: "All Categories",
  allProductsLabel: "All Products",
  viewProductsButton: "View Products",
  noProductsMessage: "No items in this category yet.",
  subcategoriesTitle: "Subcategories"
}
