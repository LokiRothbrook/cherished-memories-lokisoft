// lib/data/about.ts

import { Users, Trophy, Sparkles, ThumbsUp } from "lucide-react";

/**
 * This file contains data specific to the "About Us" section and page.
 * It includes content for the About section on the homepage and potentially
 * a dedicated About page.
 *
 * === How to Customize ===
 *
 * 1.  **About Section Content (`aboutSectionContent`):**
 *     -   `sectionTitle`: The small title above the main heading.
 *     -   `title`: The main heading, split into two lines for styling.
 *     -   `paragraphs`: Update these with your company's story, mission,
 *         and values. Each string in the array is a separate paragraph.
 *     -   `image`: Customize the year of experience and descriptive lines.
 *     -   `statsCard`: A featured statistic with a value and label.
 *     -   `stats`: An array of smaller statistics with icons (`lucide-react`),
 *         values, and labels.
 *     -   `values`: Highlight your core company values with titles and descriptions.
 *         The `icon` property uses icons from `lucide-react`.
 */

// ============================================================================
// About Section Content
// ============================================================================

export const aboutSectionContent = {
  sectionTitle: "Our Story",
  title: {
    line1: "Helping You Keep",
    line2: "Memories Alive"
  },
  paragraphs: [
    "Founded in the heart of Pittsfield, Illinois, Cherished Memories began with a simple belief: every life deserves to be celebrated, and every memory cherished. We understand the profound importance of honoring loved ones and marking life's significant moments with beauty and grace.",
    "What started as a local endeavor rooted in small-town values has grown into a dedicated service providing personalized memorabilia, thoughtful memorial tributes, and unique decorative items. We blend craftsmanship with compassion, ensuring each creation is a heartfelt reflection of your story."
  ],
  image: {
    /** Path to the about section image. Set to null to use the animated visual instead. */
    src: "/about-image.svg",
    /** The main number/stat displayed prominently (e.g., "10+" for years) */
    year: "8+",
    /** First line of text below the year (e.g., "Years of Excellence") */
    line1: "Years of Dedicated Service",
    /** Second line of text (e.g., "Serving Clients Since 2018") */
    line2: "Crafting Memories Since 2018",
  },
  statsCard: {
    value: "100%",
    label: "Heartfelt Care"
  },
  stats: [
    { icon: Users, value: "500+", label: "Families Served" },
    { icon: Trophy, value: "8+", label: "Years Experience" },
    { icon: Sparkles, value: "Countless", label: "Personalized Creations" },
    { icon: ThumbsUp, value: "100%", label: "Customer Love" },
  ],
  values: [
    {
      title: "Compassion & Empathy",
      description: "We approach every story with sensitivity and understanding, ensuring your needs are met with kindness.",
    },
    {
      title: "Quality Craftsmanship",
      description: "Each item is carefully crafted using the finest materials, designed to last a lifetime and beyond.",
    },
    {
      title: "Personalized Service",
      description: "Your unique story is our inspiration. We work closely with you to create truly bespoke tributes.",
    },
    {
      title: "Community Focused",
      description: "Proudly rooted in Pittsfield, we are dedicated to serving our community with integrity and care.",
    },
  ]
};
