import { MetadataRoute } from 'next';
import { services, siteConfig, products } from '@/lib/data';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

type ChangeFrequency = "weekly" | "daily" | "monthly" | "always" | "hourly" | "yearly" | "never";

interface StaticPageConfigItem {
  url: string;
  lastModified: Date;
  changeFrequency: ChangeFrequency;
  priority: number;
  condition: boolean;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPagesConfig: StaticPageConfigItem[] = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1, condition: true },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9, condition: true },
    { url: `${BASE_URL}/shop`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9, condition: siteConfig.pages.shop.enabled },
    { url: `${BASE_URL}/cart`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6, condition: siteConfig.pages.cart.enabled },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7, condition: siteConfig.pages.faq.enabled },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7, condition: siteConfig.pages.about.enabled },
  ];

  const staticPages: MetadataRoute.Sitemap = staticPagesConfig
    .filter(page => page.condition)
    .map(({ url, lastModified, changeFrequency, priority }) => ({
      url,
      lastModified,
      changeFrequency,
      priority,
    }));

  // Service pages
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${BASE_URL}/services/${service.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Product pages
  const productPages: MetadataRoute.Sitemap = products
    .filter(product => product.isActive)
    .map((product) => ({
      url: `${BASE_URL}/shop/${product.slug}`,
      lastModified: new Date(product.createdAt),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.8,
    }));

  return [...staticPages, ...servicePages, ...productPages];
}
