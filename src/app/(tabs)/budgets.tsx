import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useApp } from '../../context/AppContext';
import { COLORS, SPACING, RADIUS } from '../../constants/theme';

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
            <Text style={styles.headerTitle}>Monthly Category Budgets</Text>
            <Text style={styles.headerSubtitle}>Set limits and monitor category spending</Text>
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
                <Text style={[styles.spentText, isOver && { color: COLORS.danger }]}>
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
                        ? COLORS.danger
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
    marginBottom: SPACING.sm,
    marginTop: SPACING.xs,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  listContent: {
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  budgetCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  spentText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMuted,
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
  progressPercent: {
    fontSize: 12,
    color: COLORS.textSubtle,
    textAlign: 'right',
  },
});
