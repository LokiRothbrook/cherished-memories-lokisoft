"use client"

import * as React from "react"
import { motion } from "framer-motion"

// Simple SVG flower component
function Flower({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Petals */}
      <ellipse cx="20" cy="10" rx="6" ry="10" fill="currentColor" opacity="0.6" />
      <ellipse cx="20" cy="10" rx="6" ry="10" fill="currentColor" opacity="0.5" transform="rotate(72 20 20)" />
      <ellipse cx="20" cy="10" rx="6" ry="10" fill="currentColor" opacity="0.5" transform="rotate(144 20 20)" />
      <ellipse cx="20" cy="10" rx="6" ry="10" fill="currentColor" opacity="0.5" transform="rotate(216 20 20)" />
      <ellipse cx="20" cy="10" rx="6" ry="10" fill="currentColor" opacity="0.6" transform="rotate(288 20 20)" />
      {/* Center */}
      <circle cx="20" cy="20" r="5" fill="currentColor" opacity="0.8" />
    </svg>
  )
}

// Simple SVG leaf component
function Leaf({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.8 2.5 6.5C6 17 8 15.5 12 15.5s6 1.5 7.5 3c1.5-1.7 2.5-4 2.5-6.5C22 6.5 17.5 2 12 2z"
        opacity="0.4"
      />
      <path
        d="M12 15.5c-4 0-6 1.5-7.5 3C6.2 20.3 8.9 21.5 12 21.5s5.8-1.2 7.5-3C18 17 16 15.5 12 15.5z"
        opacity="0.3"
      />
    </svg>
  )
}

// Simple SVG heart component
function Heart({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        opacity="0.5"
      />
    </svg>
  )
}

export function FloralBackground() {
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  // Fixed positions for flowers - scattered naturally (doubled)
  const flowers = [
    { id: 1, top: "8%", left: "5%", size: 28, color: "text-primary", delay: 0 },
    { id: 2, top: "15%", left: "85%", size: 24, color: "text-primary/70", delay: 0.5 },
    { id: 3, top: "70%", left: "10%", size: 32, color: "text-primary/60", delay: 1 },
    { id: 4, top: "80%", left: "90%", size: 22, color: "text-primary/80", delay: 1.5 },
    { id: 5, top: "45%", left: "3%", size: 20, color: "text-accent", delay: 2 },
    { id: 6, top: "25%", left: "92%", size: 26, color: "text-primary/50", delay: 2.5 },
    { id: 7, top: "60%", left: "95%", size: 18, color: "text-accent/70", delay: 3 },
    { id: 8, top: "90%", left: "50%", size: 24, color: "text-primary/40", delay: 3.5 },
    // Additional flowers
    { id: 9, top: "5%", left: "40%", size: 22, color: "text-primary/60", delay: 4 },
    { id: 10, top: "30%", left: "8%", size: 26, color: "text-primary/70", delay: 4.5 },
    { id: 11, top: "50%", left: "92%", size: 20, color: "text-accent/60", delay: 5 },
    { id: 12, top: "65%", left: "45%", size: 18, color: "text-primary/50", delay: 5.5 },
    { id: 13, top: "12%", left: "60%", size: 24, color: "text-primary/60", delay: 6 },
    { id: 14, top: "85%", left: "15%", size: 28, color: "text-accent/50", delay: 6.5 },
    { id: 15, top: "40%", left: "88%", size: 22, color: "text-primary/70", delay: 7 },
    { id: 16, top: "95%", left: "70%", size: 20, color: "text-primary/50", delay: 7.5 },
  ]

  // Fixed positions for leaves (doubled)
  const leaves = [
    { id: 1, top: "20%", left: "15%", size: 20, rotation: 45, color: "text-accent/50" },
    { id: 2, top: "35%", left: "88%", size: 24, rotation: -30, color: "text-accent/40" },
    { id: 3, top: "75%", left: "20%", size: 18, rotation: 60, color: "text-accent/60" },
    { id: 4, top: "55%", left: "80%", size: 22, rotation: -45, color: "text-accent/50" },
    { id: 5, top: "10%", left: "70%", size: 16, rotation: 30, color: "text-accent/40" },
    { id: 6, top: "85%", left: "75%", size: 20, rotation: -60, color: "text-accent/50" },
    // Additional leaves
    { id: 7, top: "5%", left: "25%", size: 18, rotation: 20, color: "text-accent/45" },
    { id: 8, top: "28%", left: "5%", size: 22, rotation: -40, color: "text-accent/50" },
    { id: 9, top: "48%", left: "12%", size: 16, rotation: 70, color: "text-accent/40" },
    { id: 10, top: "62%", left: "92%", size: 20, rotation: -25, color: "text-accent/55" },
    { id: 11, top: "92%", left: "35%", size: 24, rotation: 50, color: "text-accent/45" },
    { id: 12, top: "18%", left: "95%", size: 18, rotation: -55, color: "text-accent/50" },
  ]

  // Fixed positions for hearts - scattered naturally
  const hearts = [
    { id: 1, top: "12%", left: "25%", size: 18, color: "text-primary/60", delay: 0.3 },
    { id: 2, top: "22%", left: "65%", size: 20, color: "text-primary/70", delay: 0.8 },
    { id: 3, top: "42%", left: "20%", size: 16, color: "text-accent/60", delay: 1.3 },
    { id: 4, top: "52%", left: "75%", size: 22, color: "text-primary/50", delay: 1.8 },
    { id: 5, top: "68%", left: "30%", size: 18, color: "text-accent/70", delay: 2.3 },
    { id: 6, top: "38%", left: "55%", size: 20, color: "text-primary/60", delay: 2.8 },
    { id: 7, top: "15%", left: "50%", size: 16, color: "text-primary/50", delay: 3.3 },
    { id: 8, top: "58%", left: "45%", size: 18, color: "text-accent/60", delay: 3.8 },
    { id: 9, top: "32%", left: "35%", size: 20, color: "text-primary/70", delay: 4.3 },
    { id: 10, top: "78%", left: "60%", size: 16, color: "text-primary/50", delay: 4.8 },
    { id: 11, top: "48%", left: "65%", size: 22, color: "text-accent/50", delay: 5.3 },
    { id: 12, top: "65%", left: "15%", size: 18, color: "text-primary/60", delay: 5.8 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Soft gradient orbs for warmth */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-20"
        style={{
          top: "10%",
          left: "-10%",
          background: "radial-gradient(circle, rgba(232,164,168,0.4) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute w-80 h-80 rounded-full opacity-15"
        style={{
          top: "60%",
          right: "-5%",
          background: "radial-gradient(circle, rgba(184,224,200,0.4) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute w-64 h-64 rounded-full opacity-10"
        style={{
          bottom: "20%",
          left: "30%",
          background: "radial-gradient(circle, rgba(236,228,245,0.5) 0%, transparent 70%)",
        }}
      />

      {/* Animated flowers - slow fade in/out */}
      {isClient && flowers.map((flower) => (
        <motion.div
          key={`flower-${flower.id}`}
          className={`absolute ${flower.color}`}
          style={{
            top: flower.top,
            left: flower.left,
            width: flower.size,
            height: flower.size,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 0.8, 0.8, 0],
            scale: [0.9, 1, 1, 0.9],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            duration: 12,
            delay: flower.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.7, 1],
          }}
        >
          <Flower />
        </motion.div>
      ))}

      {/* Animated leaves - slow fade in/out */}
      {isClient && leaves.map((leaf) => (
        <motion.div
          key={`leaf-${leaf.id}`}
          className={`absolute ${leaf.color}`}
          style={{
            top: leaf.top,
            left: leaf.left,
            width: leaf.size,
            height: leaf.size,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.7, 0.7, 0],
            y: [0, -4, -4, 0],
            rotate: [leaf.rotation, leaf.rotation + 8, leaf.rotation + 8, leaf.rotation],
          }}
          transition={{
            duration: 10,
            delay: leaf.id * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.7, 1],
          }}
        >
          <Leaf />
        </motion.div>
      ))}

      {/* Animated hearts - slow fade in/out */}
      {isClient && hearts.map((heart) => (
        <motion.div
          key={`heart-${heart.id}`}
          className={`absolute ${heart.color}`}
          style={{
            top: heart.top,
            left: heart.left,
            width: heart.size,
            height: heart.size,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 0.7, 0.7, 0],
            scale: [0.9, 1.1, 1.1, 0.9],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 11,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.7, 1],
          }}
        >
          <Heart />
        </motion.div>
      ))}

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/30 to-transparent" />
    </div>
  )
}
