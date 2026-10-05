import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';

export type TimeRange = 'this_month' | 'this_week' | 'all_time';

interface TimeRangeFilterProps {
  selectedRange: TimeRange;
  onSelectRange: (range: TimeRange) => void;
}

const RANGES: { key: TimeRange; label: string }[] = [
  { key: 'this_month', label: 'This Month' },
  { key: 'this_week', label: 'This Week' },
  { key: 'all_time', label: 'All Time' },
];

/**
 * TimeRangeFilter Component (Person 5)
 * Segmented control allowing users to switch analytics timeframe.
 */
export default function TimeRangeFilter({
  selectedRange,
  onSelectRange,
}: TimeRangeFilterProps) {
  return (
    <View style={styles.container}>
      {RANGES.map((item) => {
        const isSelected = selectedRange === item.key;
        return (
          <TouchableOpacity
            key={item.key}
            style={[styles.chip, isSelected && styles.chipActive]}
            onPress={() => onSelectRange(item.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    padding: 4,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.xs,
  },
  chip: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: COLORS.primaryLight,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  chipTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
