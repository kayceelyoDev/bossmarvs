import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Budget, Category } from '../../types';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

interface BudgetCardProps {
  budget: Budget;
  spent: number;
  category?: Category;
  onEdit: (budget: Budget) => void;
  onDelete: (id: string) => void;
}

/**
 * BudgetCard Component (Person 4)
 * Displays category budget target, real-time spending progress bar,
 * threshold status colors (Green, Amber, Red), and edit/delete actions.
 */
export default function BudgetCard({
  budget,
  spent,
  category,
  onEdit,
  onDelete,
}: BudgetCardProps) {
  const percent = budget.limit > 0 ? Math.round((spent / budget.limit) * 100) : 0;
  const clampedPercent = Math.min(percent, 100);
  const isOver = spent > budget.limit;
  const isWarning = percent >= 70 && !isOver;

  const remaining = budget.limit - spent;

  // Status colors based on thresholds
  const statusColor = isOver
    ? COLORS.expense
    : isWarning
    ? COLORS.warning
    : COLORS.income;

  const confirmDelete = () => {
    Alert.alert(
      'Remove Budget',
      `Are you sure you want to remove the budget for "${budget.category}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => onDelete(budget.id),
        },
      ]
    );
  };

  return (
    <View style={styles.card}>
      {/* Top Row: Category Info, Spent/Limit & Action Buttons */}
      <View style={styles.topRow}>
        <View style={styles.categoryInfo}>
          <View style={[styles.iconBox, { backgroundColor: COLORS.primaryLight }]}>
            <Ionicons
              name={(category?.icon as any) || 'pricetag-outline'}
              size={18}
              color={COLORS.primary}
            />
          </View>
          <View>
            <Text style={styles.categoryName}>{budget.category}</Text>
            <Text style={styles.periodText}>Monthly target</Text>
          </View>
        </View>

        <View style={styles.actionsGroup}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => onEdit(budget)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="pencil-outline" size={16} color={COLORS.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={confirmDelete}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="trash-outline" size={16} color={COLORS.textSubtle} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Metric Row: Spent vs Limit & Status Tag */}
      <View style={styles.metricRow}>
        <Text style={styles.spentText}>
          ${spent.toFixed(2)}{' '}
          <Text style={styles.limitText}>/ ${budget.limit.toFixed(2)}</Text>
        </Text>

        <View
          style={[
            styles.statusTag,
            {
              backgroundColor: isOver
                ? COLORS.expenseBg
                : isWarning
                ? COLORS.warningBg
                : COLORS.incomeBg,
            },
          ]}
        >
          <Text style={[styles.statusTagText, { color: statusColor }]}>
            {isOver ? 'Exceeded' : `${percent}% used`}
          </Text>
        </View>
      </View>

      {/* Progress Bar with Dynamic Threshold Fill */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${clampedPercent}%`,
              backgroundColor: statusColor,
            },
          ]}
        />
      </View>

      {/* Bottom Summary: Remaining vs Overspend */}
      <View style={styles.bottomRow}>
        <Text style={styles.remainingText}>
          {isOver ? (
            <Text style={{ color: COLORS.expense, fontWeight: '700' }}>
              Over by ${Math.abs(remaining).toFixed(2)}
            </Text>
          ) : (
            `$${remaining.toFixed(2)} remaining`
          )}
        </Text>
        <Text style={styles.thresholdStatus}>
          {isOver ? '⚠️ Over limit' : isWarning ? '⚡ High spend' : '🟢 On track'}
        </Text>
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
    gap: 12,
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
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  periodText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  actionsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionBtn: {
    padding: 2,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  spentText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  limitText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textMuted,
  },
  statusTag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: RADIUS.full,
  },
  statusTagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  progressTrack: {
    height: 7,
    borderRadius: 3.5,
    backgroundColor: COLORS.borderSubtle,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3.5,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  remainingText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  thresholdStatus: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
});
