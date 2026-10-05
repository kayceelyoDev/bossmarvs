import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';
import { Budget } from '../../types';

import BudgetAlertBanner from '../../components/budgets/BudgetAlertBanner';
import BudgetCard from '../../components/budgets/BudgetCard';
import BudgetFormModal from '../../components/budgets/BudgetFormModal';

/**
 * BudgetsScreen (Person 4 Module)
 * Category budget planner with limit setup, multi-state progress indicators,
 * over-budget threshold alerts, and editing/deletion.
 */
export default function BudgetsScreen() {
  const {
    budgets,
    categories,
    getCategorySpent,
    setBudget,
    deleteBudget,
  } = useApp();

  // Modal and editing state
  const [modalVisible, setModalVisible] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  const handleOpenAdd = () => {
    setEditingBudget(null);
    setModalVisible(true);
  };

  const handleOpenEdit = (budget: Budget) => {
    setEditingBudget(budget);
    setModalVisible(true);
  };

  const handleSaveBudget = async (category: string, limit: number) => {
    await setBudget({
      category,
      limit,
      period: 'monthly',
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={budgets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerArea}>
            {/* Action Bar: Targets Count & "+ Set Budget" Button */}
            <View style={styles.actionBar}>
              <View>
                <Text style={styles.sectionSubtitle}>Monthly Targets</Text>
                <Text style={styles.countText}>
                  {budgets.length === 0
                    ? 'No active limits'
                    : `${budgets.length} category budgets`}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.setBudgetBtn}
                onPress={handleOpenAdd}
                activeOpacity={0.8}
              >
                <Ionicons name="add" size={16} color="#FFFFFF" />
                <Text style={styles.setBudgetBtnText}>Set Budget</Text>
              </TouchableOpacity>
            </View>

            {/* Threshold Alert Notification Banner */}
            <BudgetAlertBanner
              budgets={budgets}
              getCategorySpent={getCategorySpent}
            />
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="pie-chart-outline" size={32} color={COLORS.accent} />
            </View>
            <Text style={styles.emptyTitle}>No budget targets yet</Text>
            <Text style={styles.emptyText}>
              Set monthly spending targets for categories like Food, Transport, or Shopping to keep your finances balanced.
            </Text>
            <TouchableOpacity
              style={styles.createFirstBtn}
              onPress={handleOpenAdd}
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={16} color="#FFFFFF" />
              <Text style={styles.createFirstBtnText}>Create Your First Budget</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => {
          const categoryObj = categories.find((c) => c.name === item.category);
          const spent = getCategorySpent(item.category);

          return (
            <BudgetCard
              budget={item}
              spent={spent}
              category={categoryObj}
              onEdit={handleOpenEdit}
              onDelete={deleteBudget}
            />
          );
        }}
      />

      {/* Modal to Add / Edit Category Budget */}
      <BudgetFormModal
        key={modalVisible ? editingBudget?.id || 'new' : 'closed'}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        categories={categories}
        existingBudget={editingBudget}
        onSave={handleSaveBudget}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: SPACING.md,
    gap: SPACING.sm,
    paddingBottom: SPACING.xxl,
  },
  headerArea: {
    gap: SPACING.md,
    marginBottom: SPACING.xs,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  sectionSubtitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  countText: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
    fontWeight: '500',
  },
  setBudgetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: RADIUS.full,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  setBudgetBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  emptyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
    marginTop: SPACING.md,
  },
  emptyIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
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
  createFirstBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: RADIUS.full,
    marginTop: 4,
  },
  createFirstBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
