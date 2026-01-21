// lib/data/services.ts

/**
 * This file contains data specific to the "Services" section and pages.
 * It defines the structure of a service and provides an array of services
 * offered by the business, along with content for the services section itself.
 *
 * === How to Customize ===
 *
 * 1.  **Service Interface (`Service`):**
 *     -   Defines the properties for each service (id, title, description, etc.).
 *     -   `iconName`: Use the exact name of an icon from `lucide-react`
 *         (e.g., "Briefcase", "Users"). These are mapped to actual components
 *         in the `ServicesSection` component.
 *
 * 2.  **Services Array (`services`):**
 *     -   This is the core list of services your business offers.
 *     -   Add, remove, or modify service objects in this array.
 *     -   Update `title`, `shortDescription`, `description`, `iconName`,
 *         `features`, `image` path, and `price`.
 *     -   Ensure `image` paths correspond to images in the `public/images` directory.
 *
 * 3.  **Services Section Content (`servicesSectionContent`):**
 *     -   Customize the `sectionTitle`, main `title`, `subtitle`, and the
 *         text/href for the "View All Services" button.
 */

// ============================================================================
// Service Interface and Data
// ============================================================================

/**
 * @interface Service
 * Defines the structure for a service object.
 *
 * @property {string} id - A unique identifier for the service.
 * @property {string} title - The title of the service.
 * @property {string} shortDescription - A brief summary of the service.
 * @property {string} description - A detailed explanation of the service.
 * @property {string} iconName - The name of the Lucide icon to use (e.g., "Briefcase").
 * @property {string[]} features - A list of key features or benefits.
 * @property {string} image - The path to the service's image (e.g., "/images/service-1.jpg").
 * @property {string} price - The starting price or pricing model (e.g., "From $XXX").
 */
export interface Service {
  id: string
  title: string
  shortDescription: string
  description: string
  iconName: string // Changed from LucideIcon
  features: string[]
  image: string
  price: string
}

/**
 * @const services
 * An array of service objects that represent the services your business offers.
 * This data is used to populate the services section and individual service pages.
 *
 * === How to Customize ===
 * - Add, remove, or reorder objects in this array.
 * - Replace placeholder text with your actual service details.
 * - Change the `iconName` to any valid name from the `lucide-react` library.
 * - Update the `image` path to point to your own service images in `public/images`.
 */
export const services: Service[] = [
  {
    id: "memorial-videos",
    title: "Custom Memorial Videos",
    shortDescription: "A beautiful, animated video tribute to celebrate a life.",
    description: "We create stunning, professional-quality memorial videos that tell a story and honor a legacy. Combining your photos and videos with gentle animation, music, and text, we craft a moving tribute perfect for sharing at services or with family online.",
    iconName: "Film",
    features: [
      "Custom animation and effects",
      "Professional photo scanning",
      "Licensed music library",
      "Digital and physical copies",
      "Sensitive and collaborative process"
    ],
    image: "/services/service-1.svg",
    price: "From $499"
  },
  {
    id: "celebration-of-life",
    title: "Celebration of Life Events",
    shortDescription: "Thoughtful planning and decor for memorial services.",
    description: "Our team helps you plan and execute a beautiful celebration of life that truly reflects the individual. We handle the details, from venue styling and floral arrangements to coordinating with vendors, so you can focus on what matters.",
    iconName: "CalendarHeart",
    features: [
      "Full-service event planning",
      "Custom theme and decor",
      "Vendor coordination",
      "On-site management",
      "Compassionate, personal approach"
    ],
    image: "/services/service-2.svg",
    price: "Custom Quote"
  },
  {
    id: "personalized-keepsakes",
    title: "Personalized Keepsakes",
    shortDescription: "Custom-made items to treasure for a lifetime.",
    description: "Create a lasting memory with our personalized keepsakes. We design and craft a range of items, including engraved wooden memory boxes, photo albums, custom jewelry, and other unique mementos to honor your loved one.",
    iconName: "Gift",
    features: [
      "High-quality materials",
      "Custom engraving and design",
      "Wide range of unique items",
      "Handcrafted with care",
      "Perfect for gifting to family"
    ],
    image: "/services/service-3.svg",
    price: "From $75"
  },
  {
    id: "memorial-stationery",
    title: "Memorial Stationery",
    shortDescription: "Beautifully designed cards, programs, and announcements.",
    description: "From funeral programs and prayer cards to thank-you notes and announcements, we offer a complete suite of beautifully designed stationery. Choose from our elegant templates or work with us to create a fully custom design.",
    iconName: "Mail",
    features: [
      "Elegant and modern designs",
      "Fully custom options available",
      "High-quality printing and paper",
      "Fast and reliable turnaround",
      "Matching sets for a cohesive look"
    ],
    image: "/services/service-4.svg",
    price: "From $99"
  }
];

/**
 * @const servicesSectionContent
 * An object containing the content for the services section, typically displayed
 * on the homepage or a dedicated services overview page.
 *
 * === How to Customize ===
 * - `sectionTitle`: The small title above the main heading.
 * - `title`: The main heading for the services section.
 * - `subtitle`: The descriptive text below the main heading.
 * - `button`: Customize the text and link for the call-to-action button
 *   at the bottom of the section.
 */
export const servicesSectionContent = {
  sectionTitle: "Our Services",
  title: "To Honor, To Remember",
  subtitle: "We provide a range of thoughtful services to help you celebrate life and create lasting, cherished memories of your loved ones.",
  button: {
    text: "View All Services",
    href: "/services"
  }
};
