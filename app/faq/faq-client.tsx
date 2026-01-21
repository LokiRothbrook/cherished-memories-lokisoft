"use client";

import { siteConfig, faqPageContent } from "@/lib/data"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { FaqSection } from "@/components/sections/faq-section"
import { CtaSection } from "@/components/sections/cta"
import { FloralBackground } from "@/components/ui/floral-background"

export default function FaqClient() {
  if (!siteConfig.pages.faq.enabled) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 water-pattern" />
          <FloralBackground />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              <span className="gradient-text">{faqPageContent.title.split(" ")[0]}<br />{faqPageContent.title.split(" ").slice(1).join(" ")}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground"
            >
              {faqPageContent.description}
            </motion.p>
          </div>
        </section>

        <FaqSection />

        {/* CTA Section */}
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
