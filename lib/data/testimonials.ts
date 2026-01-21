// lib/data/testimonials.ts

/**
 * This file contains data specific to client testimonials.
 * It defines the structure for a testimonial and provides an array of
 * customer testimonials, along with content for the testimonials section itself.
 *
 * === How to Customize ===
 *
 * 1.  **Testimonial Interface (`Testimonial`):**
 *     -   Defines the properties for each testimonial (id, name, role, content, etc.).
 *
 * 2.  **Testimonials Array (`testimonials`):**
 *     -   Replace the placeholder content with real quotes from your clients.
 *     -   Update the `name`, `role`, `content`, `rating`, `image` path, and
 *         optional `link` for each testimonial.
 *     -   Ensure `image` paths correspond to images in the `public/testimonials`
 *         directory.
 *
 * 3.  **Testimonials Section Content (`testimonialsSectionContent`):**
 *     -   Customize the `sectionTitle`, main `title`, `subtitle`, and the
 *         `trustIndicators` (e.g., number of happy clients, average rating).
 */

// ============================================================================
// Testimonial Interface and Data
// ============================================================================

/**
 * @const testimonialsSectionContent
 * An object containing the content for the testimonials section, typically displayed
 * on the homepage or a dedicated testimonials page.
 *
 * === How to Customize ===
 * - `sectionTitle`: The small title above the main heading.
 * - `title`: The main heading for the testimonials section.
 * - `subtitle`: The descriptive text below the main heading.
 * - `trustIndicators`: Update values and labels for social proof.
 */
export const testimonialsSectionContent = {
  sectionTitle: "Kind Words",
  title: "Hear From Our Community",
  subtitle: "Our clients' stories speak to the heartfelt care and lasting impact of Cherished Memories. Read their experiences with our personalized creations and services.",
  trustIndicators: [
    {
      value: "500+",
      label: "Families Served"
    },
    {
      value: "5.0", // Assuming perfect rating for a compassionate service
      label: "Average Rating"
    },
    {
      value: "Always",
      label: "Recommend"
    }
  ]
};

/**
 * @interface Testimonial
 * Defines the structure for a testimonial object.
 *
 * @property {number} id - A unique identifier for the testimonial.
 * @property {string} name - The name of the client giving the testimonial.
 * @property {string} role - The role or title of the client (e.g., "Business Owner").
 * @property {string} content - The text of the testimonial.
 * @property {number} rating - A rating from 1 to 5.
 * @property {string} image - The path to the client's image (e.g., "/testimonials/client-1.jpg").
 * @property {string} [link] - An optional URL to the actual review or client website.
 */
export interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  rating: number
  image: string
  link?: string // Optional link to the actual review
}

/**
 * @const testimonials
 * An array of testimonial objects from your clients.
 * This data is used to build social proof and trust.
 *
 * === How to Customize ===
 * - Replace the placeholder objects with real testimonials.
 * - Update the `name`, `role`, `content`, `rating`, and `image` for each entry.
 * - Ensure the `image` path corresponds to an image in `public/testimonials`.
 * - Optionally add a `link` if the testimonial is verifiable online.
 */
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah M.",
    role: "Daughter",
    content: "Cherished Memories created a memorial video for my mother that was simply breathtaking. Every photo and clip was woven together so beautifully. It brought tears to our eyes and was the perfect tribute.",
    rating: 5,
    image: "/testimonials/client-1.jpg",
    link: "#"
  },
  {
    id: 2,
    name: "John P.",
    role: "Husband",
    content: "The personalized memory box we received from Cherished Memories is a treasure. It's such a comforting way to keep my wife's letters and small mementos. The craftsmanship is exquisite.",
    rating: 5,
    image: "/testimonials/client-2.jpg",
    link: "#"
  },
  {
    id: 3,
    name: "Emily R.",
    role: "Event Planner",
    content: "I've partnered with Cherished Memories for several celebration of life events, and their decorative items are always so tasteful and elegant. They truly understand how to create a warm, respectful atmosphere.",
    rating: 5,
    image: "/testimonials/client-3.jpg",
    link: "#"
  },
  {
    id: 4,
    name: "David L.",
    role: "Son",
    content: "The memorial service cards were beautifully designed and deeply personal. It was a small detail that made a huge difference to everyone who attended. Thank you, Cherished Memories, for your care.",
    rating: 5,
    image: "/testimonials/client-4.jpg",
    link: "#"
  },
  {
    id: 5,
    name: "Maria G.",
    role: "Sister",
    content: "The custom digital portrait of my brother was a powerful and unique way to remember him. It captures his spirit perfectly and is now a cherished piece in our home. Highly recommend!",
    rating: 5,
    image: "/testimonials/client-5.jpg",
    link: "#"
  },
  {
    id: 6,
    name: "Robert H.",
    role: "Client",
    content: "From the initial consultation to the final delivery, the team at Cherished Memories was compassionate and professional. They made a difficult time a little easier with their beautiful work.",
    rating: 5,
    image: "/testimonials/client-6.jpg",
    link: "#"
  },
  {
    id: 7,
    name: "Jessica A.",
    role: "Daughter-in-Law",
    content: "The personalized memorial candle brings a peaceful light to our home, a constant, gentle reminder of a life well-lived. It's more than just a candle; it's a symbol of remembrance.",
    rating: 5,
    image: "/testimonials/client-7.jpg",
    link: "#"
  },
  {
    id: 8,
    name: "Michael K.",
    role: "Family Friend",
    content: "I ordered a custom photo album as a gift, and it was met with such emotion. The quality and attention to detail were exceptional. A truly meaningful present.",
    rating: 5,
    image: "/testimonials/client-8.jpg",
    link: "#"
  },
  {
    id: 9,
    name: "Linda T.",
    role: "Local Resident",
    content: "It's wonderful to have a local business like Cherished Memories in Pittsfield. Their dedication to helping families through difficult times with such beautiful creations is truly special.",
    rating: 5,
    image: "/testimonials/client-9.jpg",
    link: "#"
  },
  {
    id: 10,
    name: "Chris W.",
    role: "Customer",
    content: "The team was so patient and understanding as we pieced together the memories for the video tribute. The result was a stunning celebration of life that we will cherish forever.",
    rating: 5,
    image: "/testimonials/client-10.jpg",
    link: "#"
  }
];
