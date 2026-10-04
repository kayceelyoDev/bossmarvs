import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { COLORS, SPACING, RADIUS } from '../../constants/theme';

export default function DashboardScreen() {
  const { transactions, getSummary, resetToSeedData } = useApp();
  const summary = getSummary();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Overview Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>
          ${summary.netBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <View style={[styles.iconCircle, { backgroundColor: COLORS.incomeLight }]}>
              <Ionicons name="arrow-down" size={16} color={COLORS.income} />
            </View>
            <View>
              <Text style={styles.summaryItemLabel}>Income</Text>
              <Text style={[styles.summaryItemAmount, { color: COLORS.income }]}>
                +${summary.totalIncome.toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryItem}>
            <View style={[styles.iconCircle, { backgroundColor: COLORS.expenseLight }]}>
              <Ionicons name="arrow-up" size={16} color={COLORS.expense} />
            </View>
            <View>
              <Text style={styles.summaryItemLabel}>Expenses</Text>
              <Text style={[styles.summaryItemAmount, { color: COLORS.expense }]}>
                -${summary.totalExpenses.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Sync / Storage Status Section */}
      <View style={styles.infoBox}>
        <View style={styles.infoHeader}>
          <Ionicons name="cloud-done-outline" size={20} color={COLORS.income} />
          <Text style={styles.infoTitle}>Local Storage Synchronized</Text>
        </View>
        <Text style={styles.infoDescription}>
          Tracking {transactions.length} transactions saved securely on your device.
        </Text>
        <TouchableOpacity style={styles.resetButton} onPress={resetToSeedData}>
          <Ionicons name="refresh-outline" size={16} color={COLORS.primary} />
          <Text style={styles.resetButtonText}>Reset Sample Data</Text>
        </TouchableOpacity>
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
  balanceCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  balanceLabel: {
    fontSize: 14,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  balanceAmount: {
    fontSize: 34,
    fontWeight: '700',
    color: COLORS.text,
    marginVertical: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  summaryDivider: {
    width: 1,
    height: 36,
    backgroundColor: COLORS.border,
    marginHorizontal: 12,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryItemLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  summaryItemAmount: {
    fontSize: 15,
    fontWeight: '700',
  },
  infoBox: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  infoDescription: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 18,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.primaryLight,
    marginTop: 4,
  },
  resetButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
});
