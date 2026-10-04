import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

interface BudgetProgressCardProps {
  totalSpent: number;
  totalBudget: number;
}

/**
 * BudgetProgressCard Component
 * Minimalist card showing budget health with clean progress indicators.
 */
export default function BudgetProgressCard({ totalSpent, totalBudget }: BudgetProgressCardProps) {
  // If no budget is configured yet, show an elegant empty state
  if (totalBudget === 0) {
    return (
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.titleWithIcon}>
            <View style={styles.iconCircle}>
              <Ionicons name="pie-chart-outline" size={16} color={COLORS.primary} />
            </View>
            <Text style={styles.title}>Spending Plan</Text>
          </View>
          <Text style={styles.badgeText}>Inactive</Text>
        </View>

        <Text style={styles.emptyPrompt}>
          No spending limits configured. Set up category budgets in the Budgets tab to track your goals.
        </Text>
      </View>
    );
  }

  const percentage = Math.min(Math.round((totalSpent / totalBudget) * 100), 100);
  const isOver = totalSpent > totalBudget;

  const progressColor = isOver
    ? COLORS.expense
    : percentage > 80
    ? COLORS.warning
    : COLORS.income;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.titleWithIcon}>
          <View style={styles.iconCircle}>
            <Ionicons name="pie-chart-outline" size={16} color={COLORS.primary} />
          </View>
          <Text style={styles.title}>Spending Plan</Text>
        </View>
        <Text style={[styles.percentageText, { color: progressColor }]}>
          {percentage}% spent
        </Text>
      </View>

      {/* Progress Track */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${percentage}%`, backgroundColor: progressColor },
          ]}
        />
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>
          Spent: <Text style={styles.boldText}>${totalSpent.toFixed(2)}</Text>
        </Text>
        <Text style={styles.footerText}>
          Budget: <Text style={styles.boldText}>${totalBudget.toFixed(2)}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#1A382B',
    shadowOpacity: 0.03,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  percentageText: {
    fontSize: 13,
    fontWeight: '700',
  },
  badgeText: {
    fontSize: 12,
    color: COLORS.textMuted,
    backgroundColor: COLORS.surfaceMuted,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    fontWeight: '500',
  },
  emptyPrompt: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 18,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.borderSubtle,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  boldText: {
    color: COLORS.text,
    fontWeight: '600',
  },
});
