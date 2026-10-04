import { Category } from '../types';

export const COLORS = {
  // Pastel Mint / Seafoam Aesthetic (Clean, organic, modern financial vibe)
  background: '#E8F3ED',      // Soft, airy sage-mint canvas
  backgroundSubtle: '#F2F8F4',
  surface: '#FFFFFF',         // Crisp white cards
  surfaceMuted: '#F4FAF6',    // Very soft mint surface
  surfaceElevated: '#FFFFFF',

  // Typography
  text: '#11221B',            // Deep forest charcoal for high contrast
  textSecondary: '#4A6357',   // Muted sage green
  textMuted: '#688275',       // Soft slate sage
  textSubtle: '#9BB2A7',      // Very faint sage for hints/borders

  // Subtle borders & dividers
  border: '#D8E9DF',          // Soft organic divider
  borderSubtle: '#E6F1EA',

  // Brand / Action Accents
  primary: '#1A382B',         // Deep forest green primary
  primaryLight: '#E2F1E8',    // Soft mint pill background
  accent: '#2D6A4F',          // Vibrant leaf green

  // Financial Indicators (Soft modern pastel tones)
  income: '#16A34A',          // Clean emerald green
  incomeBg: '#EAF7EE',        // Mint tint pill
  expense: '#E15545',         // Soft warm coral red
  expenseBg: '#FDF0EE',       // Peach/coral tint pill

  // Status & Alerts
  warning: '#D97706',
  warningBg: '#FEF3C7',
  danger: '#DC2626',
  dangerBg: '#FEE2E2',

  // Navigation
  tabBarBg: '#FFFFFF',
  tabBarActive: '#1A382B',
  tabBarInactive: '#9BB2A7',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 28,
  xxl: 36,
};

export const RADIUS = {
  sm: 10,
  md: 16,
  lg: 24,
  xl: 30,
  full: 9999,
};

export const DEFAULT_CATEGORIES: Category[] = [
  // Expense Categories
  { id: 'cat-1', name: 'Food & Dining', icon: 'restaurant-outline', color: '#E15545', type: 'expense' },
  { id: 'cat-2', name: 'Groceries', icon: 'cart-outline', color: '#2D6A4F', type: 'expense' },
  { id: 'cat-3', name: 'Transport', icon: 'car-outline', color: '#2563EB', type: 'expense' },
  { id: 'cat-4', name: 'Housing & Bills', icon: 'home-outline', color: '#7C3AED', type: 'expense' },
  { id: 'cat-5', name: 'Shopping', icon: 'bag-handle-outline', color: '#DB2777', type: 'expense' },
  { id: 'cat-6', name: 'Entertainment', icon: 'film-outline', color: '#F59E0B', type: 'expense' },
  { id: 'cat-7', name: 'Health & Care', icon: 'heart-outline', color: '#059669', type: 'expense' },
  { id: 'cat-8', name: 'Other Expense', icon: 'ellipsis-horizontal-outline', color: '#688275', type: 'expense' },

  // Income Categories
  { id: 'cat-9', name: 'Salary', icon: 'cash-outline', color: '#16A34A', type: 'income' },
  { id: 'cat-10', name: 'Freelance', icon: 'laptop-outline', color: '#0284C7', type: 'income' },
  { id: 'cat-11', name: 'Investments', icon: 'trending-up-outline', color: '#7C3AED', type: 'income' },
  { id: 'cat-12', name: 'Other Income', icon: 'gift-outline', color: '#D97706', type: 'income' },
];
