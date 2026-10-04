import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

export default function BudgetsScreen() {
  const { budgets, getCategorySpent } = useApp();

  return (
    <View style={styles.container}>
      <FlatList
        data={budgets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Spending Plan</Text>
            <Text style={styles.headerSubtitle}>
              {budgets.length === 0
                ? 'No budget limits configured'
                : `${budgets.length} category budgets`}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="pie-chart-outline" size={32} color={COLORS.accent} />
            </View>
            <Text style={styles.emptyTitle}>No budget targets yet</Text>
            <Text style={styles.emptyText}>
              Setting monthly spending limits helps keep your personal finances balanced and predictable.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const spent = getCategorySpent(item.category);
          const percent = Math.min(Math.round((spent / item.limit) * 100), 100);
          const isOver = spent > item.limit;

          return (
            <View style={styles.budgetCard}>
              <View style={styles.topRow}>
                <Text style={styles.categoryName}>{item.category}</Text>
                <Text style={[styles.spentText, isOver && { color: COLORS.expense }]}>
                  ${spent.toFixed(2)} / ${item.limit.toFixed(2)}
                </Text>
              </View>

              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${percent}%`,
                      backgroundColor: isOver
                        ? COLORS.expense
                        : percent > 75
                        ? COLORS.warning
                        : COLORS.income,
                    },
                  ]}
                />
              </View>

              <Text style={styles.progressPercent}>{percent}% spent</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    marginBottom: SPACING.md,
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
  listContent: {
    padding: SPACING.md,
    gap: SPACING.sm,
    paddingBottom: SPACING.xxl,
  },
  budgetCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10,
    shadowColor: '#1A382B',
    shadowOpacity: 0.02,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  spentText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
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
  progressPercent: {
    fontSize: 12,
    color: COLORS.textMuted,
    textAlign: 'right',
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
