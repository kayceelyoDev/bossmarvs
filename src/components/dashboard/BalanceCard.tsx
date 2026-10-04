import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppSummary } from '../../types';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

interface BalanceCardProps {
  summary: AppSummary;
}

/**
 * BalanceCard Component
 * Minimalist, modern hero balance card inspired by modern fintech aesthetics.
 */
export default function BalanceCard({ summary }: BalanceCardProps) {
  const isNegative = summary.netBalance < 0;
  const absBalance = Math.abs(summary.netBalance).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <View style={styles.cardContainer}>
      {/* Hero Balance Section */}
      <View style={styles.balanceSection}>
        <Text style={styles.balanceSubtext}>Total Available Balance</Text>
        <Text style={styles.balanceAmount}>
          {isNegative ? `-$${absBalance}` : `$${absBalance}`}
        </Text>
      </View>

      {/* Modern Split Pill Metrics */}
      <View style={styles.metricsRow}>
        {/* Income Pill */}
        <View style={[styles.metricPill, { backgroundColor: COLORS.incomeBg }]}>
          <View style={styles.pillIconBox}>
            <Ionicons name="arrow-down" size={14} color={COLORS.income} />
          </View>
          <View style={styles.pillTextBox}>
            <Text style={styles.pillLabel}>Income</Text>
            <Text style={[styles.pillValue, { color: COLORS.income }]}>
              +${summary.totalIncome.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Expense Pill */}
        <View style={[styles.metricPill, { backgroundColor: COLORS.expenseBg }]}>
          <View style={styles.pillIconBox}>
            <Ionicons name="arrow-up" size={14} color={COLORS.expense} />
          </View>
          <View style={styles.pillTextBox}>
            <Text style={styles.pillLabel}>Expenses</Text>
            <Text style={[styles.pillValue, { color: COLORS.expense }]}>
              -${summary.totalExpenses.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#1A382B',
    shadowOpacity: 0.04,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    gap: SPACING.lg,
  },
  balanceSection: {
    alignItems: 'center',
    gap: 4,
    paddingVertical: SPACING.xs,
  },
  balanceSubtext: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  balanceAmount: {
    fontSize: 40,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -1,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metricPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: RADIUS.md,
    gap: 10,
  },
  pillIconBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillTextBox: {
    flex: 1,
  },
  pillLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  pillValue: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 1,
  },
});
