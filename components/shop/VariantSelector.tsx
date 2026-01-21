"use client"

/**
 * Variant Selector Component
 *
 * Allows users to select product variants (size, color, etc.).
 * Features:
 * - Radio button groups per variant type
 * - Price modifiers display
 * - Out-of-stock option styling
 * - Required selection validation
 */

import * as React from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import type { ProductVariant, SelectedVariant } from "@/lib/data/products"
import { productDetailContent } from "@/lib/data/products"
import { cn, formatPrice } from "@/lib/utils"

interface VariantSelectorProps {
  variants: ProductVariant[]
  selectedVariants: SelectedVariant[]
  onSelectionChange: (variants: SelectedVariant[]) => void
}

export function VariantSelector({
  variants,
  selectedVariants,
  onSelectionChange
}: VariantSelectorProps) {
  const selectOption = (variant: ProductVariant, optionId: string) => {
    const option = variant.options.find(o => o.id === optionId)
    if (!option || !option.inStock) return

    const newSelection: SelectedVariant = {
      variantId: variant.id,
      optionId: option.id,
      name: variant.name,
      value: option.label
    }

    const otherSelections = selectedVariants.filter(sv => sv.variantId !== variant.id)
    onSelectionChange([...otherSelections, newSelection])
  }

  const isSelected = (variantId: string, optionId: string) => {
    return selectedVariants.some(sv => sv.variantId === variantId && sv.optionId === optionId)
  }

  return (
    <div className="space-y-6">
      {variants.map((variant) => {
        const currentSelection = selectedVariants.find(sv => sv.variantId === variant.id)

        return (
          <div key={variant.id}>
            {/* Variant Label */}
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium">
                {variant.name}
                {!currentSelection && (
                  <span className="text-muted-foreground ml-1">
                    — {productDetailContent.selectVariantPrompt.replace("{variant}", variant.name)}
                  </span>
                )}
              </label>
              {currentSelection && (
                <span className="text-sm text-primary font-medium">
                  {currentSelection.value}
                </span>
              )}
            </div>

            {/* Options */}
            <div className="flex flex-wrap gap-2">
              {variant.options.map((option) => {
                const selected = isSelected(variant.id, option.id)
                const disabled = !option.inStock

                return (
                  <motion.button
                    key={option.id}
                    onClick={() => selectOption(variant, option.id)}
                    disabled={disabled}
                    className={cn(
                      "relative px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all",
                      selected
                        ? "border-primary bg-primary/10 text-primary"
                        : disabled
                        ? "border-muted bg-muted/20 text-muted-foreground cursor-not-allowed opacity-50"
                        : "border-border hover:border-primary/50 hover:bg-primary/5"
                    )}
                    whileHover={!disabled ? { scale: 1.02 } : undefined}
                    whileTap={!disabled ? { scale: 0.98 } : undefined}
                  >
                    <span className="flex items-center gap-2">
                      {/* Selected Checkmark */}
                      {selected && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-4 h-4 rounded-full bg-primary flex items-center justify-center"
                        >
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </motion.span>
                      )}

                      {/* Option Label */}
                      <span className={disabled ? "line-through" : ""}>
                        {option.label}
                      </span>

                      {/* Price Modifier */}
                      {option.priceModifier && option.priceModifier !== 0 && (
                        <span className={cn(
                          "text-xs",
                          option.priceModifier > 0 ? "text-muted-foreground" : "text-green-500"
                        )}>
                          {option.priceModifier > 0 ? "+" : ""}
                          {formatPrice(option.priceModifier)}
                        </span>
                      )}
                    </span>

                    {/* Out of Stock Badge */}
                    {disabled && (
                      <span className="absolute -top-1 -right-1 text-[10px] bg-muted px-1.5 py-0.5 rounded-full">
                        Out
                      </span>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
