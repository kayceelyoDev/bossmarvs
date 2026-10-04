import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Transaction } from '../../types';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

interface RecentTransactionsListProps {
  transactions: Transaction[];
  maxItems?: number;
}

/**
 * RecentTransactionsList Component
 * Minimalist recent spending card with clean empty state inspired by modern fintech aesthetics.
 */
export default function RecentTransactionsList({
  transactions,
  maxItems = 5,
}: RecentTransactionsListProps) {
  const recentList = transactions.slice(0, maxItems);
  const totalRecentSpend = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <View style={styles.card}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.sectionTitle}>Recent Spending</Text>
          <Text style={styles.periodSubtitle}>This month</Text>
        </View>
        <Text style={styles.headerAmount}>
          ${totalRecentSpend.toFixed(0)}
        </Text>
      </View>

      {/* Empty State vs List */}
      {recentList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconBadge}>
            <Ionicons name="sparkles" size={28} color={COLORS.accent} />
          </View>
          <Text style={styles.emptyTitle}>All clean & clear</Text>
          <Text style={styles.emptySubtext}>
            No spending recorded yet. Tap &quot;+ Add&quot; above to log your first transaction.
          </Text>
        </View>
      ) : (
        <View style={styles.itemsList}>
          {recentList.map((item, index) => {
            const isExpense = item.type === 'expense';
            const isLast = index === recentList.length - 1;

            return (
              <View
                key={item.id}
                style={[
                  styles.transactionRow,
                  !isLast && styles.transactionRowBorder,
                ]}
              >
                <View style={styles.leftInfo}>
                  <View
                    style={[
                      styles.iconBox,
                      {
                        backgroundColor: isExpense
                          ? COLORS.expenseBg
                          : COLORS.incomeBg,
                      },
                    ]}
                  >
                    <Ionicons
                      name={
                        isExpense
                          ? 'arrow-up-circle-outline'
                          : 'arrow-down-circle-outline'
                      }
                      size={18}
                      color={isExpense ? COLORS.expense : COLORS.income}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.titleText} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.metaText}>
                      {item.category} • {item.date}
                    </Text>
                  </View>
                </View>

                <Text
                  style={[
                    styles.amountText,
                    { color: isExpense ? COLORS.expense : COLORS.income },
                  ]}
                >
                  {isExpense ? '-' : '+'}${item.amount.toFixed(2)}
                </Text>
              </View>
            );
          })}
        </View>
      )}
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
    gap: SPACING.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  periodSubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  headerAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    gap: 8,
  },
  emptyIconBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
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
  emptySubtext: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
    paddingHorizontal: SPACING.lg,
    lineHeight: 18,
  },
  itemsList: {
    marginTop: SPACING.xs,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  transactionRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderSubtle,
  },
  leftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    marginRight: SPACING.sm,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  metaText: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  amountText: {
    fontSize: 15,
    fontWeight: '700',
  },
});
