import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Category } from '../../types';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

export interface CategoryBreakdownItem {
  category: string;
  amount: number;
  percentage: number;
  categoryObj?: Category;
}

interface CategoryDistributionProps {
  items: CategoryBreakdownItem[];
  totalExpenses: number;
}

/**
 * CategoryDistribution Component (Person 5)
 * Visual breakdown of expenses by category, featuring a segmented horizontal bar
 * and ranked percentage breakdown rows.
 */
export default function CategoryDistribution({
  items,
  totalExpenses,
}: CategoryDistributionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.cardTitle}>Spending by Category</Text>
        <Text style={styles.totalText}>${totalExpenses.toFixed(2)}</Text>
      </View>

      {/* Multi-Colored Segmented Bar */}
      <View style={styles.segmentedBar}>
        {items.map((item, index) => {
          const color = item.categoryObj?.color || COLORS.primary;
          return (
            <View
              key={`segment-${item.category}-${index}`}
              style={[
                styles.segment,
                {
                  width: `${Math.max(item.percentage, 2)}%`,
                  backgroundColor: color,
                },
              ]}
            />
          );
        })}
      </View>

      {/* Ranked Category Rows */}
      <View style={styles.list}>
        {items.map((item, index) => {
          const color = item.categoryObj?.color || COLORS.primary;
          const icon = item.categoryObj?.icon || 'pricetag-outline';

          return (
            <View key={`row-${item.category}-${index}`} style={styles.row}>
              <View style={styles.leftCol}>
                <View style={[styles.iconCircle, { backgroundColor: `${color}1A` }]}>
                  <Ionicons name={icon as any} size={16} color={color} />
                </View>

                <View style={styles.nameCol}>
                  <Text style={styles.categoryName} numberOfLines={1}>
                    {item.category}
                  </Text>
                  {/* Category Progress Bar */}
                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${item.percentage}%`,
                          backgroundColor: color,
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.rightCol}>
                <Text style={styles.amountText}>${item.amount.toFixed(2)}</Text>
                <Text style={styles.percentText}>{item.percentage}%</Text>
              </View>
            </View>
          );
        })}
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
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  totalText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  segmentedBar: {
    flexDirection: 'row',
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: COLORS.borderSubtle,
    gap: 2,
  },
  segment: {
    height: '100%',
    borderRadius: 2,
  },
  list: {
    gap: 12,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    marginRight: SPACING.md,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameCol: {
    flex: 1,
    gap: 5,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  progressTrack: {
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.borderSubtle,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2.5,
  },
  rightCol: {
    alignItems: 'flex-end',
    gap: 2,
  },
  amountText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  percentText: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
});
