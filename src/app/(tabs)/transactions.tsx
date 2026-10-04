import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { COLORS, SPACING, RADIUS } from '../../constants/theme';

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
            <Text style={styles.headerSubtitle}>{transactions.length} records</Text>
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
                    { backgroundColor: isExpense ? COLORS.expenseLight : COLORS.incomeLight },
                  ]}
                >
                  <Ionicons
                    name={isExpense ? 'arrow-up-circle-outline' : 'arrow-down-circle-outline'}
                    size={22}
                    color={isExpense ? COLORS.expense : COLORS.income}
                  />
                </View>
                <View>
                  <Text style={styles.txTitle}>{item.title}</Text>
                  <Text style={styles.txMeta}>{item.category} • {item.date}</Text>
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
  transactionCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  txMeta: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  txAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
});
