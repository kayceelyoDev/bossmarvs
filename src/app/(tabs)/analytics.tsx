import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Spending Insights</Text>
        <Text style={styles.headerSubtitle}>Category breakdown & analysis</Text>
      </View>

      {expenseTransactions.length === 0 ? (
        <View style={styles.emptyCard}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="bar-chart-outline" size={32} color={COLORS.accent} />
          </View>
          <Text style={styles.emptyTitle}>No expense data yet</Text>
          <Text style={styles.emptyText}>
            As you record expenses across categories, this screen will visualize your top spending areas and percentages.
          </Text>
        </View>
      ) : (
        <View style={styles.statsCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.statsTitle}>Expenses Breakdown</Text>
            <Text style={styles.statsTotal}>${summary.totalExpenses.toFixed(2)}</Text>
          </View>

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
                        { width: `${percentage}%`, backgroundColor: COLORS.accent },
                      ]}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </View>
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
  header: {
    marginBottom: SPACING.xs,
    marginTop: SPACING.xs,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  statsCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 16,
    shadowColor: '#1A382B',
    shadowOpacity: 0.03,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  statsTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  breakdownList: {
    gap: SPACING.md,
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
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.borderSubtle,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  emptyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10,
    marginTop: SPACING.md,
  },
  emptyIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
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
