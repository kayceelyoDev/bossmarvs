import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

interface KeyInsightsGridProps {
  topCategory: { name: string; amount: number; percentage: number } | null;
  dailyAverage: number;
  largestExpense: { title: string; amount: number } | null;
  transactionCount: number;
}

/**
 * KeyInsightsGrid Component (Person 5)
 * Displays a 2x2 grid of key analytical metrics.
 */
export default function KeyInsightsGrid({
  topCategory,
  dailyAverage,
  largestExpense,
  transactionCount,
}: KeyInsightsGridProps) {
  return (
    <View style={styles.grid}>
      {/* 1. Top Category Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconBox, { backgroundColor: COLORS.primaryLight }]}>
            <Ionicons name="pie-chart" size={16} color={COLORS.primary} />
          </View>
          <Text style={styles.cardTitle}>Top Category</Text>
        </View>
        <Text style={styles.mainValue} numberOfLines={1}>
          {topCategory ? topCategory.name : '—'}
        </Text>
        <Text style={styles.subValue}>
          {topCategory ? `$${topCategory.amount.toFixed(2)} (${topCategory.percentage}%)` : 'No expenses'}
        </Text>
      </View>

      {/* 2. Daily Average Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconBox, { backgroundColor: COLORS.incomeBg }]}>
            <Ionicons name="calendar" size={16} color={COLORS.income} />
          </View>
          <Text style={styles.cardTitle}>Daily Average</Text>
        </View>
        <Text style={styles.mainValue}>
          ${dailyAverage.toFixed(2)}
        </Text>
        <Text style={styles.subValue}>Per day in period</Text>
      </View>

      {/* 3. Largest Single Expense Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconBox, { backgroundColor: COLORS.expenseBg }]}>
            <Ionicons name="flash" size={16} color={COLORS.expense} />
          </View>
          <Text style={styles.cardTitle}>Biggest Expense</Text>
        </View>
        <Text style={styles.mainValue}>
          {largestExpense ? `$${largestExpense.amount.toFixed(2)}` : '—'}
        </Text>
        <Text style={styles.subValue} numberOfLines={1}>
          {largestExpense ? largestExpense.title : 'None'}
        </Text>
      </View>

      {/* 4. Total Records Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconBox, { backgroundColor: COLORS.warningBg }]}>
            <Ionicons name="receipt" size={16} color={COLORS.warning} />
          </View>
          <Text style={styles.cardTitle}>Activity</Text>
        </View>
        <Text style={styles.mainValue}>{transactionCount}</Text>
        <Text style={styles.subValue}>Transactions recorded</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  card: {
    width: '48.5%',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 4,
    shadowColor: '#1A382B',
    shadowOpacity: 0.02,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  mainValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  subValue: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
});
