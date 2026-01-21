// lib/data/global.ts

/**
 * This file contains global application-wide data, configurations, and content
 * that are used across multiple sections or pages of the website.
 */

import { Shield, Award, Clock, Sparkles, Heart, Film, Gift } from "lucide-react"; // Only for hero trust badges

// ============================================================================
// Company Information
// ============================================================================

export const companyInfo = {
  name: "Cherished Memories",
  tagline: "Crafting memories, celebrating life.",
  phone: "(217) 555-0123",
  email: "contact@cherishedmemories.com",
  address: "123 Memorial Lane, Pittsfield, IL 62363",
  hours: "By Appointment Only",
  social: {
    facebook: "https://facebook.com/cherishedmemoriespittsfield",
    instagram: "https://instagram.com/cherishedmemoriespittsfield",
    x: "https://x.com/cherishedmemories",
    youtube: "https://youtube.com/@cherishedmemories"
  }
};

// ============================================================================
// Site Configuration
// ============================================================================

export const siteConfig = {
  pages: {
    about: {
      enabled: true,
    },
    faq: {
      enabled: true,
    },
    shop: {
      enabled: true,
    },
    cart: {
      enabled: true,
    },
  },
  homepageSections: {
    hero: {
      enabled: true,
    },
    services: {
      enabled: true,
    },
    about: {
      enabled: true,
    },
    featuredProducts: {
      enabled: true,
    },
    testimonials: {
      enabled: true,
    },
    contact: {
      enabled: true,
    },
  },
};

// ============================================================================
// Header Content
// ============================================================================

export const headerContent = {
  navItems: [
    { label: "Home", href: "/#" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services", hasDropdown: true },
    { label: "Shop", href: "/shop" },
    { label: "FAQ", href: "/faq" },
  ],
  servicesDropdown: {
    title: "Our Services",
    viewAll: "View All Services →"
  },
  locationDropdown: {
    title: "Our Location",
    buttonText: "Get Directions"
  },
  ctaButton: {
    desktop: "Request a Consultation",
    mobile: "Consult"
  },
  mobileMenu: {
    services: "Services",
    getDirections: "Get Directions",
    getQuote: "Request a Consultation",
  },
  cartButton: {
    label: "Cart",
    href: "/cart"
  }
};

// ============================================================================
// Footer Content
// ============================================================================

export const footerContent = {
  taglineSuffix: "Your trusted partner for creating beautiful memories in Pittsfield and beyond.",
  columns: {
    services: {
      title: "Our Services",
      viewAll: "View All Services →"
    },
    quickLinks: {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/#" },
        { label: "About Us", href: "/about" },
        { label: "Shop", href: "/shop" },
        { label: "Testimonials", href: "/#testimonials" },
        { label: "FAQ", href: "/faq" },
        { label: "Contact", href: "/#contact" }
      ]
    },
    contact: {
      title: "Contact Us",
      businessHours: "Business Hours"
    }
  },
  bottomBar: {
    copyright: "All rights reserved.",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" }
    ]
  }
};

// ============================================================================
// Call To Action Section Content
// ============================================================================

export const callToActionSectionContent = {
  title: "Ready to Create Something Beautiful?",
  subtitle: "Let us help you craft the perfect tribute or keepsake. Contact us today for a free consultation.",
  primaryButton: {
    text: "Request a Consultation",
    href: "/#contact"
  },
  secondaryButton: {
    text: "Explore Our Work",
    href: "/shop"
  }
};

// ============================================================================
// Hero Section Content
// ============================================================================

export const heroSectionContent = {
  title: {
    line1: "Cherished Memories,",
    line2: "Crafted with Love"
  },
  subtitle: "Beautiful memorabilia and decorative items for life's most precious moments. From custom memorial videos to personalized keepsakes, we help you honor and celebrate life.",
  buttons: {
    primary: {
      text: "Request a Consultation",
      href: "/#contact"
    },
    secondary: {
      text: "Explore Our Shop",
      href: "/shop"
    }
  },
  trustBadges: [
    {
      icon: Heart,
      text: "Family Owned"
    },
    {
      icon: Sparkles,
      text: "Custom Creations"
    },
    {
      icon: Clock,
      text: "Timeless Keepsakes"
    }
  ],
  heroCards: [
    {
      id: 1,
      title: "Memorial Videos",
      subtitle: "A Moving Tribute",
      description: "Celebrate a life with a beautiful, custom-animated video, perfect for memorial services and sharing with family.",
      cardClass: "hero-card-1",
      icon: Film,
      stats: "High-Quality Animation",
      delay: 0,
    },
    {
      id: 2,
      title: "Custom Keepsakes",
      subtitle: "Personalized Gifts",
      description: "From engraved picture boxes to custom cards, create a one-of-a-kind item to cherish for years to come.",
      cardClass: "hero-card-2",
      icon: Gift,
      stats: "Unique & Handcrafted",
      delay: 0.1,
    },
    {
      id: 3,
      title: "Event Decor",
      subtitle: "For Celebrations of Life",
      description: "We provide tasteful and beautiful decorative items to help you create a warm and memorable atmosphere.",
      cardClass: "hero-card-3",
      icon: Award,
      stats: "Thoughtful & Elegant",
      delay: 0.2,
    },
  ]
};