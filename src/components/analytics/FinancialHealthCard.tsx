import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

interface FinancialHealthCardProps {
  income: number;
  expenses: number;
}

/**
 * FinancialHealthCard Component (Person 5)
 * Displays cashflow overview, net savings, and savings rate percentage.
 */
export default function FinancialHealthCard({
  income,
  expenses,
}: FinancialHealthCardProps) {
  const netSavings = income - expenses;
  const isSurplus = netSavings >= 0;

  // Calculate savings rate
  const savingsRate = income > 0 ? Math.round((netSavings / income) * 100) : 0;

  // Expense-to-income ratio (for visual bar)
  const expenseRatio = income > 0 ? Math.min(Math.round((expenses / income) * 100), 100) : expenses > 0 ? 100 : 0;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View style={[styles.iconCircle, { backgroundColor: isSurplus ? COLORS.incomeBg : COLORS.expenseBg }]}>
            <Ionicons
              name={isSurplus ? 'trending-up' : 'trending-down'}
              size={18}
              color={isSurplus ? COLORS.income : COLORS.expense}
            />
          </View>
          <View>
            <Text style={styles.cardTitle}>Cashflow & Savings</Text>
            <Text style={styles.cardSubtitle}>
              {income > 0 ? `${savingsRate}% savings rate` : 'No income recorded'}
            </Text>
          </View>
        </View>

        <View style={[styles.badge, { backgroundColor: isSurplus ? COLORS.incomeBg : COLORS.expenseBg }]}>
          <Text style={[styles.badgeText, { color: isSurplus ? COLORS.income : COLORS.expense }]}>
            {isSurplus ? 'Surplus' : 'Deficit'}
          </Text>
        </View>
      </View>

      {/* Main Net Number */}
      <View style={styles.netContainer}>
        <Text style={styles.netLabel}>Net Cashflow</Text>
        <Text style={[styles.netAmount, { color: isSurplus ? COLORS.income : COLORS.expense }]}>
          {isSurplus ? `+$${netSavings.toFixed(2)}` : `-$${Math.abs(netSavings).toFixed(2)}`}
        </Text>
      </View>

      {/* Visual Income vs Expense Ratio Bar */}
      <View style={styles.ratioSection}>
        <View style={styles.ratioLabels}>
          <Text style={styles.ratioText}>
            Spent: <Text style={styles.boldText}>${expenses.toFixed(2)}</Text>
          </Text>
          <Text style={styles.ratioText}>
            Earned: <Text style={styles.boldText}>${income.toFixed(2)}</Text>
          </Text>
        </View>

        <View style={styles.track}>
          <View
            style={[
              styles.fill,
              {
                width: `${expenseRatio}%`,
                backgroundColor: expenseRatio > 90 ? COLORS.expense : COLORS.income,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 14,
    shadowColor: '#1A382B',
    shadowOpacity: 0.02,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  cardSubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 1,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: RADIUS.full,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  netContainer: {
    backgroundColor: COLORS.surfaceMuted,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    gap: 2,
  },
  netLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  netAmount: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  ratioSection: {
    gap: 6,
  },
  ratioLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratioText: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  boldText: {
    color: COLORS.text,
    fontWeight: '700',
  },
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.borderSubtle,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
});
