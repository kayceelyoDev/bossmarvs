import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

export default function TransactionsScreen() {
  const { transactions } = useApp();

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>All Transactions</Text>
            <Text style={styles.headerSubtitle}>
              {transactions.length === 0
                ? 'No activity recorded'
                : `${transactions.length} total records`}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="receipt-outline" size={32} color={COLORS.accent} />
            </View>
            <Text style={styles.emptyTitle}>No transactions found</Text>
            <Text style={styles.emptyText}>
              Your transaction history is completely clean. When you add expenses or income, they will appear here chronologically.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const isExpense = item.type === 'expense';
          return (
            <View style={styles.transactionCard}>
              <View style={styles.leftCol}>
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
                    size={20}
                    color={isExpense ? COLORS.expense : COLORS.income}
                  />
                </View>
                <View>
                  <Text style={styles.txTitle}>{item.title}</Text>
                  <Text style={styles.txMeta}>
                    {item.category} • {item.date}
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  styles.txAmount,
                  { color: isExpense ? COLORS.expense : COLORS.income },
                ]}
              >
                {isExpense ? '-' : '+'}${item.amount.toFixed(2)}
              </Text>
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
  transactionCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#1A382B',
    shadowOpacity: 0.02,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  txMeta: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  txAmount: {
    fontSize: 15,
    fontWeight: '700',
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
