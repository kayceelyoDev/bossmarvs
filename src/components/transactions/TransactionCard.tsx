import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Transaction } from '../../types';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

interface TransactionCardProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

/**
 * TransactionCard Component
 * Displays individual transaction details with category styling and delete action.
 */
export default function TransactionCard({
  transaction,
  onDelete,
}: TransactionCardProps) {
  const isExpense = transaction.type === 'expense';

  const confirmDelete = () => {
    Alert.alert(
      'Delete Transaction',
      `Are you sure you want to delete "${transaction.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(transaction.id),
        },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.leftRow}>
        {/* Category Icon Badge */}
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: isExpense ? COLORS.expenseBg : COLORS.incomeBg },
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

        {/* Title & Metadata */}
        <View style={styles.infoCol}>
          <Text style={styles.title} numberOfLines={1}>
            {transaction.title}
          </Text>
          <View style={styles.metaRow}>
            <Text style={styles.categoryBadge}>{transaction.category}</Text>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.dateText}>{transaction.date}</Text>
          </View>
        </View>
      </View>

      {/* Right Column: Amount & Delete Button */}
      <View style={styles.rightCol}>
        <Text
          style={[
            styles.amount,
            { color: isExpense ? COLORS.expense : COLORS.income },
          ]}
        >
          {isExpense ? '-' : '+'}${transaction.amount.toFixed(2)}
        </Text>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={confirmDelete}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={16} color={COLORS.textSubtle} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
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
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    marginRight: SPACING.sm,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCol: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  categoryBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  bullet: {
    fontSize: 10,
    color: COLORS.textSubtle,
  },
  dateText: {
    fontSize: 11,
    color: COLORS.textMuted,
  },
  rightCol: {
    alignItems: 'flex-end',
    gap: 6,
  },
  amount: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  deleteButton: {
    padding: 2,
  },
});
