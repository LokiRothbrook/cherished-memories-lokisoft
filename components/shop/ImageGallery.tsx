"use client"

/**
 * Image Gallery Component
 *
 * Displays product images with thumbnail navigation.
 * Features:
 * - Main image display
 * - Thumbnail strip
 * - Smooth transitions
 * - Placeholder for missing images
 */

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react"
import { getProductImage } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ImageGalleryProps {
  images: string[]
  productName: string
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [direction, setDirection] = React.useState(0)

  // Use placeholder if no images
  const displayImages = images.length > 0 ? images : ["/placeholder-product.svg"]

  const goToPrevious = () => {
    setDirection(-1)
    setSelectedIndex(prev => (prev === 0 ? displayImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setDirection(1)
    setSelectedIndex(prev => (prev === displayImages.length - 1 ? 0 : prev + 1))
  }

  const selectImage = (index: number) => {
    setDirection(index > selectedIndex ? 1 : -1)
    setSelectedIndex(index)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden glass-card">
        {/* Navigation Arrows */}
        {displayImages.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background/90 backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background/90 backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}

        {/* Image Container */}
        <div className="relative w-full h-full bg-muted/30">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={selectedIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0"
            >
              {displayImages[selectedIndex] === "/placeholder-product.svg" ? (
                <div className="w-full h-full flex items-center justify-center bg-muted/20">
                  <ImageIcon className="w-16 h-16 text-muted-foreground" />
                </div>
              ) : (
                <Image
                  src={getProductImage(displayImages, selectedIndex)}
                  alt={`${productName} - Image ${selectedIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={selectedIndex === 0}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Image Counter */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-sm font-medium">
            {selectedIndex + 1} / {displayImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {displayImages.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => selectImage(index)}
              className={cn(
                "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors",
                selectedIndex === index
                  ? "border-primary"
                  : "border-transparent hover:border-primary/50"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={getProductImage([image], 0)}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
              {selectedIndex === index && (
                <motion.div
                  layoutId="thumbnail-indicator"
                  className="absolute inset-0 border-2 border-primary rounded-lg"
                />
              )}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}
