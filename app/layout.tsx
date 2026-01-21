import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { companyInfo } from "@/lib/data";
import { CartProvider } from "@/lib/context/cart-context";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * @type {Metadata}
 *
 * This is the root metadata object for the entire application. It's defined
 * in the root layout, so it applies to all pages. It sets up defaults and a
 * template that child pages can override or add to.
 *
 * Much of the information here is automatically pulled from `lib/data.ts`
 * (like your company name and tagline) to ensure consistency.
 *
 * === WHAT TO EDIT ===
 *
 * 1.  **Hardcoded Text:**
 *     - In `title.default` and `openGraph.title`, you can change the static part,
 *       like " | Professional Services". Your company name is pulled from `lib/data.ts`.
 *     - In `description`, you can edit the sentence structure around the dynamic
 *       `companyInfo.name` and `companyInfo.tagline` variables.
 *
 * 2.  **Metadata Base URL (`metadataBase`):**
 *     - **IMPORTANT!** When you deploy your site, ensure the `NEXT_PUBLIC_BASE_URL`
 *       in your environment variables is set to your live domain (e.g., `https://www.yourdomain.com`).
 *       This is crucial for social media previews.
 *
 * 3.  **Open Graph Image (`openGraph.images`):**
 *     - You can change the path to a default social media preview image.
 *     - This image should be placed in the `public` folder. An ideal size is 1200x630 pixels.
 *
 * To change your business name, tagline, or other core details, edit the `companyInfo`
 * object in the `lib/data.ts` file.
 */
export const metadata: Metadata = {
  // `metadataBase` is used to resolve relative paths for Open Graph images.
  // TODO: **ACTION REQUIRED:** Change this to your live domain before deployment.
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),

  title: {
    // The default title for the site (used on the homepage).
    default: `${companyInfo.name} | Professional Services`,
    // A template for child pages. `%s` will be replaced by the page's specific title.
    template: `%s | ${companyInfo.name}`,
  },
  
  // A general description of the business, used as a fallback for pages without a specific description.
  description: `Welcome to ${companyInfo.name}. ${companyInfo.tagline}. Discover our professional services and get a free quote today!`,

  // Open Graph (og:*) tags are for social media previews (Facebook, LinkedIn, etc.).
  openGraph: {
    title: `${companyInfo.name} | Professional Services`,
    description: companyInfo.tagline,
    // The default image to show when the site is shared on social media.
    // It should be an absolute URL, which `metadataBase` helps create.
    images: ['/og-image.png'], // Make sure to create a `public/og-image.png` file
    siteName: companyInfo.name,
    type: "website",
    locale: 'en_US',
  },
  
  // Twitter-specific tags for card previews.
  twitter: {
    card: 'summary_large_image',
    title: `${companyInfo.name} | Professional Services`,
    description: companyInfo.tagline,
    images: ['/og-image.png'], // Twitter also uses the og:image.
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
