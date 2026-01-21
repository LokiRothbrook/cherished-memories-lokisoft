"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Frown, Ghost, LocateOff } from "lucide-react"; // Importing some fun icons
import { motion } from "framer-motion"; // For animations, consistent with other pages

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center text-center px-4 py-24 bg-background">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="text-8xl font-extrabold text-primary mb-4"
          >
            404
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-4xl sm:text-5xl font-bold mb-6"
          >
            Uh oh! Looks like you&apos;ve wandered off the map.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-lg text-muted-foreground mb-8"
          >
            We searched high and low, but couldn&apos;t find this page. It might be lost in space,
            or perhaps it never existed! Don&apos;t worry, you can always head back to safety.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.8 }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <Frown className="w-10 h-10 text-accent" />
            <Ghost className="w-10 h-10 text-primary" />
            <LocateOff className="w-10 h-10 text-muted-foreground" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Link href="/" className="px-6 py-3 rounded-full glow-blue text-lg font-medium">
              Take Me Home
            </Link>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
