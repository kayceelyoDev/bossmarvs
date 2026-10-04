import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';
import { TransactionType } from '../../types';

export type DateFilterPreset =
  | 'all'
  | 'today'
  | 'this_week'
  | 'this_month'
  | 'previous_months';

interface DateFilterBarProps {
  selectedPreset: DateFilterPreset;
  onSelectPreset: (preset: DateFilterPreset) => void;
  sortOrder: 'newest' | 'oldest';
  onToggleSort: () => void;
  selectedType: 'all' | TransactionType;
  onSelectType: (type: 'all' | TransactionType) => void;
}

const DATE_PRESETS: { key: DateFilterPreset; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'today', label: 'Today' },
  { key: 'this_week', label: 'This Week' },
  { key: 'this_month', label: 'This Month' },
  { key: 'previous_months', label: 'Previous Months' },
];

/**
 * DateFilterBar Component
 * Simple, streamlined filter bar featuring quick date chips:
 * Today, This Week, This Month, and Previous Months.
 */
export default function DateFilterBar({
  selectedPreset,
  onSelectPreset,
  sortOrder,
  onToggleSort,
  selectedType,
  onSelectType,
}: DateFilterBarProps) {
  return (
    <View style={styles.container}>
      {/* 1. Date Preset Scrollable Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.presetsScroll}
      >
        {DATE_PRESETS.map((item) => {
          const isSelected = selectedPreset === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.presetChip,
                isSelected && styles.presetChipSelected,
              ]}
              onPress={() => onSelectPreset(item.key)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.presetChipText,
                  isSelected && styles.presetChipTextSelected,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 2. Secondary Controls: Type Switcher (All / Expenses / Income) & Sort Toggle */}
      <View style={styles.controlsRow}>
        <View style={styles.typeSwitcher}>
          <TouchableOpacity
            style={[
              styles.typeChip,
              selectedType === 'all' && styles.typeChipActive,
            ]}
            onPress={() => onSelectType('all')}
          >
            <Text
              style={[
                styles.typeChipText,
                selectedType === 'all' && styles.typeChipTextActive,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeChip,
              selectedType === 'expense' && styles.typeChipExpenseActive,
            ]}
            onPress={() => onSelectType('expense')}
          >
            <Text
              style={[
                styles.typeChipText,
                selectedType === 'expense' && styles.typeChipTextActive,
              ]}
            >
              Expenses
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeChip,
              selectedType === 'income' && styles.typeChipIncomeActive,
            ]}
            onPress={() => onSelectType('income')}
          >
            <Text
              style={[
                styles.typeChipText,
                selectedType === 'income' && styles.typeChipTextActive,
              ]}
            >
              Income
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sort Order Toggle */}
        <TouchableOpacity
          style={styles.sortButton}
          onPress={onToggleSort}
          activeOpacity={0.7}
        >
          <Ionicons
            name={sortOrder === 'newest' ? 'arrow-down' : 'arrow-up'}
            size={14}
            color={COLORS.primary}
          />
          <Text style={styles.sortButtonText}>
            {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: SPACING.xs,
  },
  presetsScroll: {
    gap: 8,
    paddingVertical: 2,
  },
  presetChip: {
    backgroundColor: COLORS.surface,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  presetChipSelected: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.accent,
  },
  presetChipText: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  presetChipTextSelected: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  typeSwitcher: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    padding: 3,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  typeChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: RADIUS.full,
  },
  typeChipActive: {
    backgroundColor: COLORS.primaryLight,
  },
  typeChipExpenseActive: {
    backgroundColor: COLORS.expenseBg,
  },
  typeChipIncomeActive: {
    backgroundColor: COLORS.incomeBg,
  },
  typeChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  typeChipTextActive: {
    color: COLORS.text,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.surface,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sortButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
