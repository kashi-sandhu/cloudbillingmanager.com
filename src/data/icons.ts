import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  Boxes,
  ClipboardList,
  Droplets,
  FileText,
  LayoutDashboard,
  Leaf,
  Monitor,
  MonitorSmartphone,
  Package,
  Percent,
  Receipt,
  Ship,
  ShoppingBasket,
  ShoppingCart,
  SlidersHorizontal,
  Smartphone,
  Snowflake,
  Store,
  Table,
  TrendingUp,
  Truck,
  Drumstick,
  UserPlus,
  Users,
  UtensilsCrossed,
  Wallet,
  Warehouse,
  Calculator,
} from 'lucide-react'
import { industries, modules } from './content.ts'

export const moduleIcons: Record<(typeof modules)[number]['slug'], LucideIcon> = {
  dashboard: LayoutDashboard,
  sales: ShoppingCart,
  'pricing-engine': Percent,
  billing: Receipt,
  purchasing: ClipboardList,
  'supplier-payments': Wallet,
  inventory: Warehouse,
  accounting: BookOpen,
  hr: Users,
  customers: UserPlus,
  suppliers: Truck,
  customizable: SlidersHorizontal,
  pos: MonitorSmartphone,
}

export const industryIcons: Record<(typeof industries)[number]['slug'], LucideIcon> = {
  'frozen-foods': Snowflake,
  'fresh-foods': Leaf,
  'meat-suppliers': Drumstick,
  'beverage-distribution': Droplets,
  'grocery-distribution': ShoppingBasket,
  fmcg: Package,
  'restaurant-suppliers': UtensilsCrossed,
  'wholesale-businesses': Store,
  'import-distribution': Ship,
}

export const capabilityIcons: Record<string, LucideIcon> = {
  Dashboard: LayoutDashboard,
  'Fast & Intelligent Invoicing': FileText,
  'Real-Time Sales & Purchase Analytics': TrendingUp,
  'Real-Time Inventory Intelligence': Boxes,
  'Inventory & Warehouse Control': Warehouse,
  'Logistics & Distribution Management': Truck,
  'Integrated Accounting & Financial Management': BookOpen,
  'Employee & Role-Based User Management': Users,
  'Smart Device Accessibility': Smartphone,
}

export const replacedSystemIcons: Record<string, LucideIcon> = {
  Sage: Calculator,
  Excel: Table,
  'Desktop System': Monitor,
  'Separate POS': MonitorSmartphone,
  'Inventory Software': Warehouse,
  'Accounting Software': BookOpen,
  'Logistic Software': Truck,
}
