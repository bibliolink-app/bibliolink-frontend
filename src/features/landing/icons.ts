import {
  BookOpen,
  Compass,
  FileText,
  Heart,
  LayoutGrid,
  LogIn,
  Search,
  Sparkles,
  UserPlus,
  type LucideIcon,
} from 'lucide-react'

export const ICONS = {
  BookOpen,
  Compass,
  FileText,
  Heart,
  LayoutGrid,
  LogIn,
  Search,
  Sparkles,
  UserPlus,
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof ICONS