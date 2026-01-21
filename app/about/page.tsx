import AboutPageClient from "./about-client";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";
import { notFound } from "next/navigation";
import { aboutSectionContent } from "@/lib/data"; // Using content for metadata

export const metadata: Metadata = {
  title: aboutSectionContent.sectionTitle,
  description: aboutSectionContent.paragraphs[0], // Using the first paragraph as description
};

export default function AboutPage() {
  if (!siteConfig.pages.about.enabled) {
    notFound();
  }

  return <AboutPageClient />;
}
