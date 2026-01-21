// lib/data/faq.ts

/**
 * This file contains data specific to the "Frequently Asked Questions" (FAQ) section and page.
 * It defines the structure for individual FAQ items and provides an array of
 * common questions and answers, along with content for the FAQ page itself.
 *
 * === How to Customize ===
 *
 * 1.  **FAQ Item Interface (`FAQItem`):**
 *     -   Defines the properties for each FAQ entry (question, answer).
 *
 * 2.  **FAQ Data Array (`faqData`):**
 *     -   Add, remove, or modify objects in this array to update your FAQs.
 *     -   Replace placeholder text with your actual questions and answers.
 *
 * 3.  **FAQ Page Content (`faqPageContent`):**
 *     -   Customize the `title` and `description` (for SEO) for the main
 *         FAQ page.
 */

// ============================================================================
// FAQ Item Interface and Data
// ============================================================================

/**
 * @interface FAQItem
 * Defines the structure for a single FAQ item.
 *
 * @property {string} question - The question asked in the FAQ.
 * @property {string} answer - The answer to the FAQ question.
 */
export interface FAQItem {
  question: string
  answer: string
}

/**
 * @const faqData
 * An array of frequently asked questions and their answers.
 * This data populates the FAQ section and can be reused where needed.
 *
 * === How to Customize ===
 * - Add, remove, or modify objects in this array to update your FAQs.
 * - Replace placeholder text with your actual questions and answers.
 */
export const faqData: FAQItem[] = [
  {
    question: "What services does Cherished Memories offer?",
    answer:
      "Cherished Memories specializes in creating personalized memorial videos, custom keepsakes (like engraved memory boxes and photo albums), memorial stationery (cards, programs), and providing thoughtful decorative items for celebrations of life. We focus on helping you honor and remember loved ones in a unique and heartfelt way.",
  },
  {
    question: "How can I request a custom item or service?",
    answer:
      "Requesting a custom item or service is easy! Simply visit our contact section and fill out the consultation request form, or give us a call at (217) 555-0123. We'll schedule a time to discuss your needs and ideas in detail.",
  },
  {
    question: "What is your service area?",
    answer:
      "We are proudly based in Pittsfield, Illinois, and primarily serve our local community and surrounding areas. For digital products like memorial videos, our services can extend beyond the immediate region. Please contact us to discuss your specific location.",
  },
  {
    question: "What makes Cherished Memories unique?",
    answer:
    "Our commitment to compassionate, personalized service sets us apart. We blend quality craftsmanship with a deep understanding of the emotional significance of our products. Every item is created with care, ensuring it truly reflects the unique memories you wish to cherish.",
  },
  {
    question: "How long does it take to create a custom item or video?",
    answer:
      "Timelines vary depending on the complexity and type of custom creation. Memorial videos typically take 1-3 weeks, while personalized physical items like engraved boxes or custom stationery may take 1-2 weeks. We'll provide an estimated timeline during your consultation.",
  },
  {
    question: "Do you offer consultations?",
    answer:
      "Yes, we offer free, no-obligation consultations for all our services and custom requests. This allows us to understand your vision and provide you with a tailored plan and quote.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept major credit cards, debit cards, and local checks. Payment plans may be available for larger service packages; please inquire during your consultation."
  },
  {
    question: "Can I provide my own photos and videos for memorial tributes?",
    answer: "Absolutely! We encourage you to share any photos, video clips, or even written anecdotes that you would like included in your memorial video or personalized keepsakes. We'll guide you through the best way to submit these during our consultation."
  },
  {
    question: "Do you help with event decor for celebrations of life?",
    answer: "Yes, we offer decorative items and can assist with conceptualizing themes for celebrations of life. Our goal is to help create a beautiful and comforting atmosphere that honors your loved one's memory."
  },
  {
    question: "Can I see examples of your work?",
    answer: "Of course! You can view examples of our custom keepsakes and get a sense of our style in our online shop. During a consultation, we can also share more specific examples relevant to your needs."
  },
];

// ============================================================================
// FAQ Page Content
// ============================================================================

/**
 * @const faqPageContent
 * An object containing content specific to the FAQ page.
 * This includes metadata for SEO (title and description).
 *
 * === How to Customize ===
 * - `title`: The main title displayed on the FAQ page (important for SEO).
 * - `description`: A brief summary of the FAQ page content (important for SEO).
 */
export const faqPageContent = {
  title: "Your Questions, Our Answers",
  description: "Find answers to common questions about our services, custom creations, process, and how we help you cherish your memories.",
};
