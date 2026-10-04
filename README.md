# BossMarvs — Personal Expense & Budget Tracker 📊💰

A modern, offline-first mobile application for personal expense tracking and budget planning, built with **React Native**, **Expo (SDK 57)**, **Expo Router**, and **TypeScript**.

---

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Project Architecture & Directory Structure](#project-architecture--directory-structure)
- [Prerequisites & Installation](#prerequisites--installation)
- [Running the Application](#running-the-application)
- [Application Usage Guide](#application-usage-guide)
- [Data Models & Context API](#data-models--context-api)
- [Code Quality & Standards](#code-quality--standards)
- [Team & Contribution Breakdown](#team--contribution-breakdown)

---

## Overview

**BossMarvs Expense & Budget Tracker** provides individuals with an intuitive, private, and seamless way to track cash flow, monitor categorized monthly budgets, and analyze personal spending habits.

The application operates **offline-first**, storing all financial data locally on the device using `@react-native-async-storage/async-storage`. No external accounts or cloud databases are required, ensuring total data privacy.

---

## Key Features

- 💼 **Financial Summary Dashboard**: Instant overview of your Net Balance, Total Monthly Income, and Total Expenses with intuitive cashflow indicators.
- 📜 **Transaction History**: Real-time log of all income and expenses tagged by category, date, and amount.
- 🎯 **Category Budget Limits**: Monthly budget limits with visual progress meters that alert you as spending approaches or exceeds targets (Green: Safe, Amber: Nearing Limit, Red: Exceeded).
- 📈 **Visual Spending Analytics**: Automatic percentage breakdown of expenses categorized by Food, Utilities, Transport, Entertainment, and more.
- 💾 **Local Offline Persistence**: Automatic background synchronization to persistent device storage.
- 🔄 **Quick Sample Data Reset**: Built-in reset utility to quickly populate mock financial data for evaluation and testing.

---

## Project Architecture & Directory Structure

The project follows a clean, modular structure separating route screens, state management, constants, and TypeScript contracts:

```
bossmarvs/
├── src/
│   ├── app/                    # Expo Router route definitions (file-based navigation)
│   │   ├── (tabs)/             # Bottom tab navigator group
│   │   │   ├── _layout.tsx     # Tab configuration & icons (Dashboard, History, Budgets, Analytics)
│   │   │   ├── index.tsx       # Tab 1: Financial Dashboard screen
│   │   │   ├── transactions.tsx# Tab 2: Transaction History screen
│   │   │   ├── budgets.tsx     # Tab 3: Monthly Budget Planner screen
│   │   │   └── analytics.tsx   # Tab 4: Spending Analytics & Reports screen
│   │   └── _layout.tsx         # Root layout with AppProvider & StatusBar
│   ├── context/
│   │   └── AppContext.tsx      # Central state manager, CRUD operations & AsyncStorage sync
│   ├── constants/
│   │   └── theme.ts            # Design tokens, color palette, spacing, & default categories
│   └── types/
│       └── index.ts            # Core TypeScript interfaces & types
├── app.json                    # Expo project configuration
├── package.json                # Project dependencies & scripts
├── tsconfig.json               # TypeScript strict configuration
└── README.md                   # Project documentation
```

### Architectural Flow

```
┌────────────────────────────────────────────────────────┐
│                   React Native UI Layer                │
│    Dashboard   |   Transactions   |  Budgets  |  Stats │
└───────────────────────────┬────────────────────────────┘
                            │ (useApp Hook)
┌───────────────────────────▼────────────────────────────┐
│                  AppContext Provider                   │
│   Transactions State  |  Budgets State  | Categories   │
└───────────────────────────┬────────────────────────────┘
                            │ (JSON Serialization)
┌───────────────────────────▼────────────────────────────┐
│              Local Device Storage (AsyncStorage)       │
│  @bossmarvs_transactions | @bossmarvs_budgets          │
└────────────────────────────────────────────────────────┘
```

---

## Prerequisites & Installation

### Prerequisites
Before running the application, ensure you have the following installed on your machine:
- **Node.js**: `v18.x` or later (LTS recommended)
- **npm** (bundled with Node.js)
- **Expo Go App** (available on [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) or [Apple App Store](https://apps.apple.com/app/expo-go/id982107779)) for testing on a physical phone.

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/bossmarvs.git
   cd bossmarvs
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

---

## Running the Application

Start the Expo development server:

```bash
npx expo start
```

### Opening the App:
- **Physical Device (Recommended)**: Open the **Expo Go** app on your phone and scan the QR code displayed in your terminal.
- **Android Emulator**: Press `a` in the terminal (requires Android Studio & Android Virtual Device).
- **iOS Simulator**: Press `i` in the terminal (macOS with Xcode required).
- **Web Browser**: Press `w` in the terminal to preview in your browser.

---

## Application Usage Guide

### 1. Dashboard (`/`)
- Displays current **Net Balance** calculated as `Total Income - Total Expenses`.
- Quick-glance indicators for monthly income inflows and expense outflows.
- **Reset Sample Data** button: Restores default demo transactions and budgets at any time.

### 2. Transaction History (`/transactions`)
- View a reverse-chronological list of all personal transactions.
- Distinguishes income (`+` in green) from expenses (`-` in red) with category tags and transaction dates.

### 3. Budget Planner (`/budgets`)
- Shows monthly spending targets per category (e.g. Groceries, Food & Dining, Utilities).
- Dynamic progress bars calculate the real-time percentage spent against category limits.
- Status changes dynamically:
  - 🟢 **Normal**: < 75% limit spent
  - 🟠 **Warning**: 75% - 100% limit spent
  - 🔴 **Over Budget**: Exceeds 100%

### 4. Spending Analytics (`/analytics`)
- Aggregates all expenses by category.
- Displays percentage contribution of each category relative to total monthly spending.

---

## Data Models & Context API

All application state is strongly typed using TypeScript and accessible via the `useApp()` custom hook.

### Core Data Models (`src/types/index.ts`)

```typescript
export type TransactionType = 'expense' | 'income';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;     // ISO format: YYYY-MM-DD
  notes?: string;
  createdAt: number;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  period: 'monthly' | 'weekly';
}

export interface AppSummary {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
}
```

### Context API (`src/context/AppContext.tsx`)

Access state methods anywhere in the component tree using:

```typescript
import { useApp } from '../context/AppContext';

function MyComponent() {
  const { transactions, budgets, getSummary, addTransaction } = useApp();
  // ...
}
```

#### Available Methods & Properties:
| Property / Method | Type / Signature | Description |
| :--- | :--- | :--- |
| `transactions` | `Transaction[]` | Array of all recorded transactions |
| `budgets` | `Budget[]` | Array of all active category budget limits |
| `categories` | `Category[]` | List of supported spending & income categories |
| `isLoading` | `boolean` | `true` while hydrating from AsyncStorage |
| `getSummary()` | `() => AppSummary` | Computes current income, expense, and balance |
| `getCategorySpent(cat)`| `(category: string) => number` | Returns total amount spent in a specific category |
| `addTransaction(tx)` | `(txData) => Promise<void>` | Appends new transaction and persists to storage |
| `updateTransaction(tx)`| `(tx) => Promise<void>` | Updates an existing transaction record |
| `deleteTransaction(id)`| `(id: string) => Promise<void>` | Removes a transaction by ID |
| `setBudget(budget)` | `(budgetData) => Promise<void>`| Upserts category budget limit |
| `resetToSeedData()` | `() => Promise<void>` | Re-initializes state with clean demo data |

---

## Code Quality & Standards

The codebase adheres to strict linting and type-safety guidelines:

- **Strict Type Checking**:
  ```bash
  npx tsc --noEmit
  ```
- **Code Linting (ESLint / Expo Standards)**:
  ```bash
  npx expo lint
  ```
- **Design Conventions**:
  - Reusable design tokens (colors, border radii, spacing) centralized in `src/constants/theme.ts`.
  - Self-documenting variable and function names.
  - Meaningful inline comments explaining state calculations and lifecycle behaviors.

---

## Team & Contribution Breakdown

This project was developed collaboratively with modular responsibilities divided across 5 core modules:

| Contributor Role | Focus Module | Responsibilities & Deliverables |
| :--- | :--- | :--- |
| **Core & Architecture** | State & Storage Layer | TypeScript schema definitions, AppContext state provider, offline AsyncStorage persistence engine, theme design tokens. |
| **Dashboard Lead** | Overview & Balance Screen | Net balance card, monthly inflow/outflow metrics, storage synchronization status, data reset triggers. |
| **Transaction Flow Lead** | History & Transaction Records | Transaction list feed, categorized debit/credit items, date formatting, and transaction UI components. |
| **Budget Planning Lead** | Budgets & Limit Thresholds | Category budget tracker, dynamic multi-state progress bars, threshold status alerts (Safe / Warning / Exceeded). |
| **Analytics & Reports Lead**| Spending Insights & Metrics | Category expense breakdown, percentage calculations, spending distribution bars, and financial reports. |

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
