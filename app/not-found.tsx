"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Home, Search, Flower, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FloralBackground } from "@/components/ui/floral-background";
import { getCardClass } from "@/lib/utils";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
        {/* Floral Background Animation */}
        <FloralBackground />
        
        {/* Water Pattern Background */}
        <div className="absolute inset-0 water-pattern" />
        
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* 404 Number with Gradient */}
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
              className="text-9xl sm:text-[12rem] font-extrabold mb-6"
            >
              <span className="gradient-text">404</span>
            </motion.h1>

            {/* Main Message */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            >
              <span className="gradient-text">Oops! This page has bloomed away</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
            >
              Like a cherished memory, this page seems to have wandered off. 
              Don&apos;t worry though—we&apos;ll help you find your way back to the garden of our services.
            </motion.p>
          </motion.div>

          {/* Fun Card with Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={`relative p-8 rounded-2xl ${getCardClass(0)} shadow-xl mb-12 max-w-2xl mx-auto`}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                  className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center"
                >
                  <Search className="w-8 h-8 text-primary" />
                </motion.div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4">While you&apos;re here, why not explore?</h3>
              
              <div className="grid sm:grid-cols-2 gap-4 text-left">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-background/50">
                  <Flower className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium mb-1">Our Services</div>
                    <div className="text-sm text-muted-foreground">Discover how we can help</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-background/50">
                  <Home className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium mb-1">Back to Home</div>
                    <div className="text-sm text-muted-foreground">Return to our main page</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/10 to-transparent rounded-tr-full" />
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="glow-primary text-base px-8">
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Take Me Home
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8 glass">
              <Link href="/services">
                <Flower className="w-5 h-5 mr-2" />
                View Services
              </Link>
            </Button>
          </motion.div>

          {/* Fun Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-12 text-sm text-muted-foreground italic"
          >
            &ldquo;Not all who wander are lost... but this page definitely is!&rdquo;
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
