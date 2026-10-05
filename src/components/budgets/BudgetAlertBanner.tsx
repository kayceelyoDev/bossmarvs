import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Budget } from '../../types';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

interface BudgetAlertBannerProps {
  budgets: Budget[];
  getCategorySpent: (category: string) => number;
}

/**
 * BudgetAlertBanner Component (Person 4)
 * Displays dynamic alert notifications when spending exceeds or approaches targets.
 */
export default function BudgetAlertBanner({
  budgets,
  getCategorySpent,
}: BudgetAlertBannerProps) {
  if (budgets.length === 0) return null;

  // Find exceeded budgets and warning budgets
  const exceededList = budgets.filter((b) => getCategorySpent(b.category) > b.limit);
  const warningList = budgets.filter((b) => {
    const spent = getCategorySpent(b.category);
    const percent = b.limit > 0 ? (spent / b.limit) * 100 : 0;
    return percent >= 75 && spent <= b.limit;
  });

  if (exceededList.length > 0) {
    const names = exceededList.map((b) => b.category).join(', ');
    return (
      <View style={[styles.banner, styles.bannerDanger]}>
        <Ionicons name="alert-circle" size={20} color={COLORS.danger} />
        <View style={styles.textBox}>
          <Text style={[styles.title, { color: COLORS.danger }]}>
            Over Budget Alert
          </Text>
          <Text style={styles.desc}>
            {exceededList.length === 1
              ? `Spending limit exceeded in ${names}.`
              : `${exceededList.length} categories exceeded limits: ${names}.`}
          </Text>
        </View>
      </View>
    );
  }

  if (warningList.length > 0) {
    const names = warningList.map((b) => b.category).join(', ');
    return (
      <View style={[styles.banner, styles.bannerWarning]}>
        <Ionicons name="warning" size={20} color={COLORS.warning} />
        <View style={styles.textBox}>
          <Text style={[styles.title, { color: COLORS.warning }]}>
            Nearing Limit
          </Text>
          <Text style={styles.desc}>
            Spending is above 75% for: {names}.
          </Text>
        </View>
      </View>
    );
  }

  // All within budget
  return (
    <View style={[styles.banner, styles.bannerSuccess]}>
      <Ionicons name="checkmark-circle" size={20} color={COLORS.income} />
      <View style={styles.textBox}>
        <Text style={[styles.title, { color: COLORS.income }]}>
          On Track
        </Text>
        <Text style={styles.desc}>
          All categorized spending is comfortably within budget limits.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
  },
  bannerDanger: {
    backgroundColor: COLORS.expenseBg,
    borderColor: COLORS.expense,
  },
  bannerWarning: {
    backgroundColor: COLORS.warningBg,
    borderColor: COLORS.warning,
  },
  bannerSuccess: {
    backgroundColor: COLORS.incomeBg,
    borderColor: COLORS.income,
  },
  textBox: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  desc: {
    fontSize: 12,
    color: COLORS.text,
    marginTop: 2,
    lineHeight: 16,
  },
});
