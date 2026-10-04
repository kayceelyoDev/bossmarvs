import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useApp } from '../../context/AppContext';
import { COLORS, SPACING, RADIUS } from '../../constants/theme';

export default function AnalyticsScreen() {
  const { transactions, getSummary } = useApp();
  const summary = getSummary();

  const expenseTransactions = transactions.filter((t) => t.type === 'expense');
  const categoryTotals: { [key: string]: number } = {};

  expenseTransactions.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  const categoriesSorted = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Spending Summary */}
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Spending Breakdown</Text>
        <Text style={styles.statsSub}>Total Expenses: ${summary.totalExpenses.toFixed(2)}</Text>

        <View style={styles.breakdownList}>
          {categoriesSorted.map(([category, amount]) => {
            const percentage = summary.totalExpenses > 0
              ? Math.round((amount / summary.totalExpenses) * 100)
              : 0;

            return (
              <View key={category} style={styles.catItem}>
                <View style={styles.catHeader}>
                  <Text style={styles.catName}>{category}</Text>
                  <Text style={styles.catAmount}>
                    ${amount.toFixed(2)} ({percentage}%)
                  </Text>
                </View>
                <View style={styles.progressBarBackground}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${percentage}%`, backgroundColor: COLORS.primary },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </View>
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
  },
  statsCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  statsSub: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  breakdownList: {
    gap: SPACING.md,
    marginTop: SPACING.xs,
  },
  catItem: {
    gap: 6,
  },
  catHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  catName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  catAmount: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
});
