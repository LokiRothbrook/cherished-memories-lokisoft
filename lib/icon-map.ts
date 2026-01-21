// lib/icon-map.ts

/**
 * Icon Map for Lucide React Icons
 *
 * This utility provides a centralized mapping of icon names to Lucide components.
 * Due to how Next.js tree-shaking works, icons must be explicitly imported
 * and added to the iconMap object - dynamic lookups don't work.
 *
 * === Usage ===
 *
 * In your data files (e.g., services.ts):
 *   iconName: "Briefcase"  // Must match a key in iconMap below
 *
 * In your components:
 *   import { getIcon } from "@/lib/icon-map"
 *   const ServiceIcon = getIcon(service.iconName)
 *   {ServiceIcon && <ServiceIcon className="w-6 h-6" />}
 *
 * === Adding New Icons ===
 *
 * 1. Browse icons at https://lucide.dev/icons
 * 2. Find the icon you want and note its PascalCase name (e.g., "ShoppingCart")
 * 3. Add or uncomment the import below
 * 4. Add or uncomment the entry in the iconMap object
 * 5. Use the icon name in your data files
 *
 * === Performance Note ===
 *
 * Only import icons you actually use. Each icon adds ~1-2KB to the bundle.
 * Unused icons are commented out below for easy reference.
 */

import {
  // ========================================
  // ACTIVE ICONS - Cherished Memories
  // ========================================
  Film,
  CalendarHeart,
  Gift,
  Mail,
  MonitorPlay,
  HeartHandshake,
  PartyPopper,
  Home,
  ScrollText,
  CalendarDays,
  Video,
  Paintbrush,
  BookImage,
  CandlestickChart,
  Heart, // From global.ts trust badges
  Sparkles, // From global.ts trust badges & about.ts stats
  Clock, // From global.ts trust badges
  Award, // From global.ts hero cards
  Users, // From about.ts stats
  Trophy, // From about.ts stats
  ThumbsUp, // From about.ts stats

  type LucideIcon,
} from "lucide-react"

/**
 * Map of icon names to Lucide icon components.
 * Add or uncomment icons here as needed for your project.
 */
const iconMap: Record<string, LucideIcon> = {
  // ========================================
  // ACTIVE ICONS - Cherished Memories
  // ========================================
  Film,
  CalendarHeart,
  Gift,
  Mail,
  MonitorPlay,
  HeartHandshake,
  PartyPopper,
  Home,
  ScrollText,
  CalendarDays,
  Video,
  Paintbrush,
  BookImage,
  CandlestickChart,
  Heart,
  Sparkles,
  Clock,
  Award,
  Users,
  Trophy,
  ThumbsUp,
}

/**
 * Retrieves a Lucide icon component by its name.
 *
 * @param iconName - The name of the icon (must be a key in iconMap)
 * @returns The Lucide icon component, or null if not found
 *
 * @example
 * const HomeIcon = getIcon("Home")
 * if (HomeIcon) {
 *   return <HomeIcon className="w-6 h-6" />
 * }
 */
export function getIcon(iconName: string): LucideIcon | null {
  const icon = iconMap[iconName]

  if (icon) {
    return icon
  }

  // Log warning in development if icon not found
  if (process.env.NODE_ENV === "development" && iconName) {
    console.warn(
      `Icon "${iconName}" not found in icon-map. Add it to lib/icon-map.ts. Browse icons at https://lucide.dev/icons`
    )
  }

  return null
}

/**
 * Type guard to check if an icon name is valid
 *
 * @param iconName - The icon name to check
 * @returns true if the icon exists in the icon map
 */
export function isValidIcon(iconName: string): boolean {
  return iconName in iconMap
}

/**
 * Get all available icon names currently in the map
 *
 * @returns Array of all icon names in the map
 */
export function getAvailableIcons(): string[] {
  return Object.keys(iconMap)
}
