"use client"

/**
 * Product Filters Component
 *
 * Provides filtering and sorting controls for the shop page.
 * Features:
 * - Category filter
 * - Price range filter
 * - Search input
 * - Sort dropdown
 * - Mobile-friendly drawer
 */

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, SlidersHorizontal, X, ArrowUpDown, Check } from "lucide-react"
import { getTopLevelCategories, type Category } from "@/lib/data/categories"
import { shopPageContent } from "@/lib/data/products"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export interface FilterState {
  search: string
  category: string
  minPrice: string
  maxPrice: string
  sort: string
}

interface ProductFiltersProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  productCount: number
  totalCount: number
}

export function ProductFilters({
  filters,
  onFilterChange,
  productCount,
  totalCount
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isSortOpen, setIsSortOpen] = React.useState(false)
  const categories = getTopLevelCategories()
  const sortRef = React.useRef<HTMLDivElement>(null)

  // Close sort dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const updateFilter = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFilterChange({
      search: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      sort: "newest"
    })
  }

  const hasActiveFilters = filters.search || filters.category || filters.minPrice || filters.maxPrice

  const selectedSort = shopPageContent.sortOptions.find(opt => opt.value === filters.sort)

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={shopPageContent.filters.searchPlaceholder}
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="pl-10 bg-background/50"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{shopPageContent.filters.categoryLabel}:</span>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filters.category === "" ? "default" : "outline"}
                size="sm"
                onClick={() => updateFilter("category", "")}
              >
                All
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={filters.category === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateFilter("category", cat.id)}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{shopPageContent.filters.priceLabel}:</span>
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => updateFilter("minPrice", e.target.value)}
              className="w-20 bg-background/50"
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => updateFilter("maxPrice", e.target.value)}
              className="w-20 bg-background/50"
            />
          </div>

          {/* Sort Dropdown */}
          <div ref={sortRef} className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2"
            >
              <ArrowUpDown className="w-4 h-4" />
              {selectedSort?.label || "Sort"}
            </Button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-48 rounded-lg glass-card shadow-xl z-20 p-1"
                >
                  {shopPageContent.sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        updateFilter("sort", option.value)
                        setIsSortOpen(false)
                      }}
                      className={cn(
                        "flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors",
                        filters.sort === option.value
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      )}
                    >
                      {option.label}
                      {filters.sort === option.value && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-1" />
              {shopPageContent.filters.clearFilters}
            </Button>
          )}
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-6">
          {shopPageContent.pagination.showing} {productCount} {shopPageContent.pagination.of} {totalCount} {shopPageContent.pagination.products}
        </p>
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden mb-6">
        <div className="flex items-center gap-3 mb-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={shopPageContent.filters.searchPlaceholder}
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="pl-10 bg-background/50"
            />
          </div>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsOpen(true)}
            className="relative"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
            )}
          </Button>

          {/* Sort Button */}
          <div ref={sortRef} className="relative">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              <ArrowUpDown className="w-4 h-4" />
            </Button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-48 rounded-lg glass-card shadow-xl z-20 p-1"
                >
                  {shopPageContent.sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        updateFilter("sort", option.value)
                        setIsSortOpen(false)
                      }}
                      className={cn(
                        "flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors",
                        filters.sort === option.value
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted"
                      )}
                    >
                      {option.label}
                      {filters.sort === option.value && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground">
          {shopPageContent.pagination.showing} {productCount} {shopPageContent.pagination.of} {totalCount} {shopPageContent.pagination.products}
        </p>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-[300px] bg-card border-l border-border z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Category */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">{shopPageContent.filters.categoryLabel}</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={filters.category === "" ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateFilter("category", "")}
                      >
                        All
                      </Button>
                      {categories.map((cat) => (
                        <Button
                          key={cat.id}
                          variant={filters.category === cat.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateFilter("category", cat.id)}
                        >
                          {cat.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">{shopPageContent.filters.priceLabel}</h4>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) => updateFilter("minPrice", e.target.value)}
                        className="bg-background/50"
                      />
                      <span className="text-muted-foreground">-</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) => updateFilter("maxPrice", e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                  </div>

                  {/* Clear and Apply */}
                  <div className="flex gap-3 pt-4 border-t border-border">
                    {hasActiveFilters && (
                      <Button variant="outline" className="flex-1" onClick={clearFilters}>
                        Clear All
                      </Button>
                    )}
                    <Button className="flex-1 glow-blue" onClick={() => setIsOpen(false)}>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
