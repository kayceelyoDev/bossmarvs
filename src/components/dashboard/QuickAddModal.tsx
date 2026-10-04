import React, { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Category, TransactionType } from '../../types';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

export interface NewRecordData {
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  notes?: string;
}

interface QuickAddModalProps {
  visible: boolean;
  categories: Category[];
  onClose: () => void;
  onSubmit: (data: NewRecordData) => void;
}

/**
 * QuickAddModal Component
 * Only selects category by default; dynamic input appears if "Other" is chosen.
 */
export default function QuickAddModal({
  visible,
  categories,
  onClose,
  onSubmit,
}: QuickAddModalProps) {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Food & Dining');
  const [otherDescription, setOtherDescription] = useState('');

  const availableCategories = categories.filter((c) => c.type === type);
  const isOtherCategory = selectedCategory.toLowerCase().includes('other');

  const resetForm = () => {
    setAmount('');
    setType('expense');
    setSelectedCategory('Food & Dining');
    setOtherDescription('');
  };

  const handleSave = () => {
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

    onSubmit({
      title,
      amount: parsedAmount,
      type,
      category: selectedCategory,
      date: today,
      notes: isOtherCategory ? otherDescription.trim() : undefined,
    });

    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View>
              <Text style={styles.modalTitle}>Add Transaction</Text>
              <Text style={styles.modalSub}>Quick Entry</Text>
            </View>
            <TouchableOpacity
              onPress={handleClose}
              style={styles.closeCircle}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close" size={20} color={COLORS.textMuted} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Type Switcher */}
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

            {/* Amount Input */}
            <Text style={styles.fieldLabel}>Amount ($)</Text>
            <View style={styles.amountInputRow}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor={COLORS.textSubtle}
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
              />
            </View>

            {/* Category Selector */}
            <Text style={styles.fieldLabel}>Select Category</Text>
            <View style={styles.categoryChipsContainer}>
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
                  >
                    <Ionicons
                      name={cat.icon as any}
                      size={15}
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

            {/* Conditional Input for "Other" */}
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

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save Record</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(17, 34, 27, 0.35)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    padding: SPACING.xl,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  modalSub: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  closeCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
    marginBottom: 6,
    marginTop: 14,
  },
  typeSwitcher: {
    flexDirection: 'row',
    gap: 10,
    marginTop: SPACING.xs,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surfaceMuted,
  },
  typeButtonExpenseActive: {
    backgroundColor: COLORS.expense,
    borderColor: COLORS.expense,
  },
  typeButtonIncomeActive: {
    backgroundColor: COLORS.income,
    borderColor: COLORS.income,
  },
  typeButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  typeButtonTextActive: {
    color: '#FFFFFF',
  },
  amountInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceMuted,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
  },
  currencySymbol: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textMuted,
    marginRight: 6,
  },
  amountInput: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    paddingVertical: 12,
  },
  categoryChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surfaceMuted,
  },
  categoryChipSelected: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.accent,
  },
  categoryChipText: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  categoryChipTextSelected: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  otherInputCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.accent,
    gap: 6,
    marginTop: 12,
  },
  otherInputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  otherTextInput: {
    backgroundColor: COLORS.surfaceMuted,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.text,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  saveButton: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
