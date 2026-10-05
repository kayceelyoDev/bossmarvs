import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

import CategoryDistribution, { CategoryBreakdownItem } from '../../components/analytics/CategoryDistribution';
import FinancialHealthCard from '../../components/analytics/FinancialHealthCard';
import KeyInsightsGrid from '../../components/analytics/KeyInsightsGrid';
import TimeRangeFilter, { TimeRange } from '../../components/analytics/TimeRangeFilter';

/**
 * AnalyticsScreen (Person 5 Module)
 * Visual financial analytics, category distribution, cashflow health,
 * and key spending insights.
 */
export default function AnalyticsScreen() {
  const { transactions, categories } = useApp();

  const [selectedRange, setSelectedRange] = useState<TimeRange>('this_month');

  // Filter transactions by selected timeframe
  const periodTransactions = useMemo(() => {
    const now = new Date();
    const currentMonthPrefix = now.toISOString().slice(0, 7);

    // Current week calculation (Monday to Sunday)
    const day = now.getDay();
    const diffToMonday = (day + 6) % 7;
    const monday = new Date(now);
    monday.setDate(now.getDate() - diffToMonday);
    const mondayStr = monday.toISOString().split('T')[0];

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    const sundayStr = sunday.toISOString().split('T')[0];

    return transactions.filter((t) => {
      if (selectedRange === 'this_month') {
        return t.date.startsWith(currentMonthPrefix);
      }
      if (selectedRange === 'this_week') {
        return t.date >= mondayStr && t.date <= sundayStr;
      }
      return true; // 'all_time'
    });
  }, [transactions, selectedRange]);

  // Income, Expenses, and Counts for the period
  const { periodIncome, periodExpenses, expenseTransactions } = useMemo(() => {
    let income = 0;
    let expenses = 0;
    const expList: typeof transactions = [];

    periodTransactions.forEach((t) => {
      if (t.type === 'income') {
        income += t.amount;
      } else {
        expenses += t.amount;
        expList.push(t);
      }
    });

    return {
      periodIncome: income,
      periodExpenses: expenses,
      expenseTransactions: expList,
    };
  }, [periodTransactions]);

  // Category Breakdown Items
  const categoryBreakdown = useMemo<CategoryBreakdownItem[]>(() => {
    if (periodExpenses === 0) return [];

    const totals: { [cat: string]: number } = {};
    expenseTransactions.forEach((t) => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
    });

    return Object.entries(totals)
      .map(([catName, amount]) => {
        const catObj = categories.find(
          (c) => c.name.toLowerCase() === catName.toLowerCase()
        );
        const percentage = Math.round((amount / periodExpenses) * 100);
        return {
          category: catName,
          amount,
          percentage,
          categoryObj: catObj,
        };
      })
      .sort((a, b) => b.amount - a.amount);
  }, [expenseTransactions, periodExpenses, categories]);

  // Derived Analytics Metrics
  const { topCategory, dailyAverage, largestExpense } = useMemo(() => {
    const now = new Date();

    // Top Category
    const top = categoryBreakdown.length > 0 ? categoryBreakdown[0] : null;

    // Daily Average
    let daysInPeriod = 1;
    if (selectedRange === 'this_month') {
      daysInPeriod = Math.max(now.getDate(), 1);
    } else if (selectedRange === 'this_week') {
      const dayOfWeek = now.getDay() === 0 ? 7 : now.getDay();
      daysInPeriod = Math.max(dayOfWeek, 1);
    } else {
      // All time: estimate across unique days recorded or minimum 1
      const distinctDays = new Set(periodTransactions.map((t) => t.date)).size;
      daysInPeriod = Math.max(distinctDays, 1);
    }
    const avg = periodExpenses / daysInPeriod;

    // Largest Expense
    let biggest: { title: string; amount: number } | null = null;
    expenseTransactions.forEach((t) => {
      if (!biggest || t.amount > biggest.amount) {
        biggest = { title: t.title, amount: t.amount };
      }
    });

    return {
      topCategory: top
        ? {
            name: top.category,
            amount: top.amount,
            percentage: top.percentage,
          }
        : null,
      dailyAverage: avg,
      largestExpense: biggest,
    };
  }, [categoryBreakdown, periodExpenses, selectedRange, periodTransactions, expenseTransactions]);

  const hasData = periodTransactions.length > 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Timeframe Filter Selector */}
      <TimeRangeFilter
        selectedRange={selectedRange}
        onSelectRange={setSelectedRange}
      />

      {!hasData ? (
        // Empty State when no data exists in this timeframe
        <View style={styles.emptyCard}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="bar-chart-outline" size={32} color={COLORS.accent} />
          </View>
          <Text style={styles.emptyTitle}>No insights for this period</Text>
          <Text style={styles.emptyText}>
            No income or expense records were found for the selected timeframe. Switch to &quot;All Time&quot; or log new transactions to see your financial breakdown.
          </Text>
        </View>
      ) : (
        <>
          {/* 2. Cashflow & Savings Card */}
          <FinancialHealthCard
            income={periodIncome}
            expenses={periodExpenses}
          />

          {/* 3. 2x2 Key Insights Grid */}
          <KeyInsightsGrid
            topCategory={topCategory}
            dailyAverage={dailyAverage}
            largestExpense={largestExpense}
            transactionCount={periodTransactions.length}
          />

          {/* 4. Visual Category Distribution */}
          <CategoryDistribution
            items={categoryBreakdown}
            totalExpenses={periodExpenses}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
    gap: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  emptyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
    marginTop: SPACING.md,
  },
  emptyIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  emptyText: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: SPACING.sm,
  },
});
