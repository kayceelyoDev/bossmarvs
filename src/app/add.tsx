import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { COLORS, RADIUS, SPACING } from '../constants/theme';
import { TransactionType } from '../types';

/**
 * AddTransactionScreen (Stack Screen)
 * Managed under the Root Stack with visible native header.
 */
export default function AddTransactionScreen() {
  const { categories, addTransaction } = useApp();

  // Form State
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Food & Dining');
  const [otherDescription, setOtherDescription] = useState('');

  const availableCategories = categories.filter((c) => c.type === type);
  const isOtherCategory = selectedCategory.toLowerCase().includes('other');

  const handleSave = async () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount greater than $0.');
      return;
    }

    let title = selectedCategory;
    if (isOtherCategory) {
      if (!otherDescription.trim()) {
        Alert.alert('Missing Detail', 'Please enter a brief note for this "Other" record.');
        return;
      }
      title = otherDescription.trim();
    }

    const today = new Date().toISOString().split('T')[0];

    await addTransaction({
      title,
      amount: parsedAmount,
      type,
      category: selectedCategory,
      date: today,
      notes: isOtherCategory ? otherDescription.trim() : undefined,
    });

    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 1. Type Switcher Pills */}
          <View style={styles.typeSwitcher}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                type === 'expense' && styles.typeButtonExpenseActive,
              ]}
              onPress={() => {
                setType('expense');
                setSelectedCategory('Food & Dining');
                setOtherDescription('');
              }}
              activeOpacity={0.8}
            >
              <Ionicons
                name="arrow-up-circle-outline"
                size={16}
                color={type === 'expense' ? '#FFFFFF' : COLORS.textMuted}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  type === 'expense' && styles.typeButtonTextActive,
                ]}
              >
                Expense
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                type === 'income' && styles.typeButtonIncomeActive,
              ]}
              onPress={() => {
                setType('income');
                setSelectedCategory('Salary');
                setOtherDescription('');
              }}
              activeOpacity={0.8}
            >
              <Ionicons
                name="arrow-down-circle-outline"
                size={16}
                color={type === 'income' ? '#FFFFFF' : COLORS.textMuted}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  type === 'income' && styles.typeButtonTextActive,
                ]}
              >
                Income
              </Text>
            </TouchableOpacity>
          </View>

          {/* 2. Hero Amount Input */}
          <View style={styles.amountCard}>
            <Text style={styles.amountLabel}>How much?</Text>
            <View style={styles.amountRow}>
              <Text style={styles.currencyPrefix}>$</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor={COLORS.textSubtle}
                keyboardType="decimal-pad"
                autoFocus={true}
                value={amount}
                onChangeText={setAmount}
              />
            </View>
          </View>

          {/* 3. Category Selector */}
          <View style={styles.categorySection}>
            <Text style={styles.sectionLabel}>Select Category</Text>
            <View style={styles.categoryGrid}>
              {availableCategories.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.categoryChip,
                      isSelected && styles.categoryChipSelected,
                    ]}
                    onPress={() => setSelectedCategory(cat.name)}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={cat.icon as any}
                      size={16}
                      color={isSelected ? COLORS.primary : COLORS.textMuted}
                    />
                    <Text
                      style={[
                        styles.categoryChipText,
                        isSelected && styles.categoryChipTextSelected,
                      ]}
                    >
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* 4. Conditional Input: Only appears when "Other" category is chosen */}
          {isOtherCategory && (
            <View style={styles.otherInputCard}>
              <Text style={styles.otherInputLabel}>What was this for?</Text>
              <TextInput
                style={styles.otherTextInput}
                placeholder="Specify item or reason..."
                placeholderTextColor={COLORS.textSubtle}
                value={otherDescription}
                onChangeText={setOtherDescription}
              />
            </View>
          )}

          {/* 5. Save Action Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.85}
          >
            <Text style={styles.saveButtonText}>Save Record</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.md,
    gap: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  typeSwitcher: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: COLORS.surface,
    padding: 4,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: RADIUS.full,
  },
  typeButtonExpenseActive: {
    backgroundColor: COLORS.expense,
  },
  typeButtonIncomeActive: {
    backgroundColor: COLORS.income,
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  typeButtonTextActive: {
    color: '#FFFFFF',
  },
  amountCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#1A382B',
    shadowOpacity: 0.03,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    gap: 6,
  },
  amountLabel: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencyPrefix: {
    fontSize: 34,
    fontWeight: '800',
    color: COLORS.textMuted,
    marginRight: 4,
  },
  amountInput: {
    fontSize: 38,
    fontWeight: '800',
    color: COLORS.text,
    minWidth: 120,
    textAlign: 'center',
  },
  categorySection: {
    gap: 10,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginLeft: 4,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryChipSelected: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.accent,
  },
  categoryChipText: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  categoryChipTextSelected: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  otherInputCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.accent,
    gap: 8,
  },
  otherInputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  otherTextInput: {
    backgroundColor: COLORS.surfaceMuted,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.text,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    marginTop: SPACING.sm,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
