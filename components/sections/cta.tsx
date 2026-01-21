"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { callToActionSectionContent } from "@/lib/data"

export function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 water-pattern" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-12 rounded-3xl bg-gradient-to-br from-primary/50 to-primary/30 text-primary-foreground"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {callToActionSectionContent.title}
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            {callToActionSectionContent.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="text-base ">
              <Link href={callToActionSectionContent.primaryButton.href}>
                {callToActionSectionContent.primaryButton.text}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link href={callToActionSectionContent.secondaryButton.href}>
                {callToActionSectionContent.secondaryButton.text}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
