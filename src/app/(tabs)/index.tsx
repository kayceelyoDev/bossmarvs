import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

import BalanceCard from '../../components/dashboard/BalanceCard';
import BudgetProgressCard from '../../components/dashboard/BudgetProgressCard';
import RecentTransactionsList from '../../components/dashboard/RecentTransactionsList';

/**
 * DashboardScreen
 * Clean, modern dashboard screen.
 * The "+ Add Transaction" button is placed directly on the dashboard page.
 */
export default function DashboardScreen() {
  const {
    transactions,
    budgets,
    getSummary,
    clearAllData,
  } = useApp();

  const summary = getSummary();
  const totalBudgetLimit = budgets.reduce((sum, item) => sum + item.limit, 0);

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Hero Balance Card */}
        <BalanceCard summary={summary} />

        {/* 2. Direct Add Transaction Button on Dashboard */}
        <TouchableOpacity
          style={styles.addRecordButton}
          onPress={() => router.push('/add')}
          activeOpacity={0.85}
        >
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text style={styles.addRecordButtonText}>Add Transaction</Text>
        </TouchableOpacity>

        {/* 3. Monthly Spending Plan Card */}
        <BudgetProgressCard
          totalSpent={summary.totalExpenses}
          totalBudget={totalBudgetLimit}
        />

        {/* 4. Recent Transactions Section */}
        <RecentTransactionsList transactions={transactions} maxItems={5} />

        {/* Subtle footer info (if there are items, allows clearing) */}
        {transactions.length > 0 && (
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={clearAllData}
            activeOpacity={0.6}
          >
            <Ionicons name="trash-outline" size={14} color={COLORS.textSubtle} />
            <Text style={styles.clearBtnText}>Clear all records</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: SPACING.md,
    gap: SPACING.md,
    paddingBottom: SPACING.xxl,
  },
  addRecordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: RADIUS.full,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  addRecordButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: SPACING.sm,
    marginTop: SPACING.xs,
  },
  clearBtnText: {
    fontSize: 12,
    color: COLORS.textSubtle,
    fontWeight: '500',
  },
});
