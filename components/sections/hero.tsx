"use client"

import * as React from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { heroSectionContent } from "@/lib/data"

// Helper function to generate random values for animations
const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

interface AnimatedElementProps {
  type: 'leaf' | 'glow' | 'twinkle';
  style: React.CSSProperties;
  animationProps?: any; // For framer-motion
  className?: string;
  id: string; // Use id instead of key for prop consistency
}

function AnimatedElement({ type, style, animationProps, className, id }: AnimatedElementProps) {
  if (type === 'twinkle') {
    return (
      <motion.div
        key={id}
        className={`star-twinkle ${className || ''}`}
        style={style}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={animationProps || {
          opacity: [0, 1, 0.5, 1, 0],
          scale: [0.5, 1, 0.8, 1.2, 0.5],
        }}
        transition={{
          duration: getRandom(1.5, 3),
          repeat: Infinity,
          repeatDelay: getRandom(1, 5),
          ease: "easeOut",
        }}
      />
    );
  } else if (type === 'glow') {
    return (
      <motion.div
        key={id}
        className={`wave-glow ${className || ''}`}
        style={style}
        animate={animationProps || {
          scale: [1, getRandom(1.05, 1.2), 1],
          x: [0, getRandom(-25, 25), 0],
          y: [0, getRandom(-25, 25), 0],
        }}
        transition={{ duration: getRandom(8, 14), repeat: Infinity, ease: "easeInOut" }}
      />
    );
  } else { // type === 'leaf'
    return <div key={id} className={`leaf-accent ${className || ''}`} style={style} />;
  }
}

function FloralBackground() {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const numLeaves = 8 * 4; // 4 times more = 32
  const numGlows = 3 * 4; // 4 times more = 12
  const numTwinkles = 30; // Additional twinkle elements

  const leaves = React.useMemo(() => {
    if (!isClient) return [];
    return Array.from({ length: numLeaves }).map((_, i) => {
      const delay = getRandom(0, 20);
      const duration = getRandom(15, 30);
      const leafType = Math.floor(getRandom(1, 5)); // 1 to 4 for leaf-accent-X
      const width = getRandom(20, 40);
      const height = getRandom(20, 40);

      return {
        id: `leaf-${i}`,
        className: leafType === 1 ? '' : `leaf-accent-${leafType}`,
        style: {
          top: `${getRandom(0, 90)}%`,
          left: `${getRandom(0, 90)}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          width: `${width}px`,
          height: `${height}px`,
          transform: `rotate(${getRandom(0, 360)}deg)`,
          opacity: 0,
        },
      };
    });
  }, [isClient, numLeaves]);

  const glows = React.useMemo(() => {
    if (!isClient) return [];
    return Array.from({ length: numGlows }).map((_, i) => ({
      id: `glow-${i}`,
      style: {
        width: `${getRandom(200, 450)}px`,
        height: `${getRandom(200, 450)}px`,
        top: `${getRandom(0, 90)}%`,
        left: `${getRandom(0, 90)}%`,
        transform: `translate(-50%, -50%)`,
      },
      animationProps: {
        scale: [1, getRandom(1.05, 1.2), 1],
        x: [0, getRandom(-30, 30), 0],
        y: [0, getRandom(-30, 30), 0],
      },
    }));
  }, [isClient, numGlows]);

  const twinkles = React.useMemo(() => {
    if (!isClient) return [];
    return Array.from({ length: numTwinkles }).map((_, i) => ({
      id: `twinkle-${i}`,
      style: {
        top: `${getRandom(0, 100)}%`,
        left: `${getRandom(0, 100)}%`,
        width: `${getRandom(5, 15)}px`,
        height: `${getRandom(5, 15)}px`,
        borderRadius: '50%',
        backgroundColor: 'white',
        position: 'absolute' as 'absolute',
        filter: 'blur(1px)',
      }
    }));
  }, [isClient, numTwinkles]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {isClient && (
        <>
          {leaves.map((leaf) => (
            <AnimatedElement key={leaf.id} id={leaf.id} type="leaf" style={leaf.style} className={leaf.className} />
          ))}
          {glows.map((glow) => (
            <AnimatedElement key={glow.id} id={glow.id} type="glow" style={glow.style} animationProps={glow.animationProps} />
          ))}
          {twinkles.map((twinkle) => (
            <AnimatedElement key={twinkle.id} id={twinkle.id} type="twinkle" style={twinkle.style} />
          ))}
        </>
      )}

      {/* Subtle grid overlay - can be kept or removed based on preference */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="hero-grid" width="4" height="4" patternUnits="userSpaceOnUse">
              <path d="M 4 0 L 0 0 0 4" fill="none" stroke="currentColor" strokeWidth="0.1" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#hero-grid)" />
        </svg>
      </div>
    </div>
  );
}

export function HeroSection() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0.6, 1], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      <FloralBackground />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="block gradient-text">{heroSectionContent.title.line1}</span>
            <span className="block gradient-text">{heroSectionContent.title.line2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            {heroSectionContent.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="text-base px-8 glow-primary">
              <Link href={heroSectionContent.buttons.primary.href}>
                {heroSectionContent.buttons.primary.text}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8 glass">
              <Link href={heroSectionContent.buttons.secondary.href}>
                {heroSectionContent.buttons.secondary.text}
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground"
          >
            {heroSectionContent.trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2">
                <badge.icon className="w-5 h-5 text-primary" />
                <span>{badge.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {heroSectionContent.heroCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + card.delay }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className={`
                absolute inset-0 rounded-2xl bg-primary/20 opacity-0
                group-hover:opacity-100 blur-xl transition-opacity duration-500
              `} />
              <div className={`
                relative h-full p-8 rounded-2xl
                ${card.cardClass}
                overflow-hidden
                ${index === 1 ? 'md:-mt-4 md:mb-4' : ''}
              `}>
                <div className="relative z-10">
                  <div className={`
                    w-14 h-14 rounded-xl bg-primary/20
                    flex items-center justify-center mb-6
                    group-hover:scale-110 transition-transform duration-300
                  `}>
                    <card.icon className="w-7 h-7 text-primary" />
                  </div>

                  <p className="text-sm text-primary font-medium mb-2">{card.subtitle}</p>
                  <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                  <p className="text-muted-foreground mb-6">{card.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">{card.stats}</span>
                  </div>
                </div>

                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/10 to-transparent rounded-tr-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}