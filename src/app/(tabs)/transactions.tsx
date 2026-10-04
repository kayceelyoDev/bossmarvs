import React, { useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';
import { TransactionType } from '../../types';

import DateFilterBar, { DateFilterPreset } from '../../components/transactions/DateFilterBar';
import TransactionCard from '../../components/transactions/TransactionCard';

/**
 * TransactionsScreen (Person 3 Module)
 * Upgraded with real-time search, date presets, type filters, and sort toggles.
 * Avoids duplicate title headers by utilizing the top navigation bar.
 */
export default function TransactionsScreen() {
  const { transactions, deleteTransaction } = useApp();

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<DateFilterPreset>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [selectedType, setSelectedType] = useState<'all' | TransactionType>('all');

  // Filtered and sorted transactions
  const filteredTransactions = useMemo(() => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const currentMonthPrefix = now.toISOString().slice(0, 7);
    const currentMonthFirstDay = `${currentMonthPrefix}-01`;

    // Calculate start and end of this week (Monday to Sunday)
    const day = now.getDay();
    const diffToMonday = (day + 6) % 7;
    const monday = new Date(now);
    monday.setDate(now.getDate() - diffToMonday);
    const mondayStr = monday.toISOString().split('T')[0];

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    const sundayStr = sunday.toISOString().split('T')[0];

    return transactions
      .filter((item) => {
        // 1. Search query filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchesTitle = item.title.toLowerCase().includes(query);
          const matchesCategory = item.category.toLowerCase().includes(query);
          const matchesNotes = item.notes?.toLowerCase().includes(query);
          if (!matchesTitle && !matchesCategory && !matchesNotes) {
            return false;
          }
        }

        // 2. Type filter (All / Expense / Income)
        if (selectedType !== 'all' && item.type !== selectedType) {
          return false;
        }

        // 3. Date Presets
        if (selectedPreset === 'today') {
          return item.date === todayStr;
        }
        if (selectedPreset === 'this_week') {
          return item.date >= mondayStr && item.date <= sundayStr;
        }
        if (selectedPreset === 'this_month') {
          return item.date.startsWith(currentMonthPrefix);
        }
        if (selectedPreset === 'previous_months') {
          return item.date < currentMonthFirstDay;
        }

        return true;
      })
      .sort((a, b) => {
        const timeA = new Date(a.date).getTime() || a.createdAt;
        const timeB = new Date(b.date).getTime() || b.createdAt;

        return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
      });
  }, [transactions, searchQuery, selectedPreset, sortOrder, selectedType]);

  const isFiltered =
    searchQuery.trim().length > 0 ||
    selectedPreset !== 'all' ||
    selectedType !== 'all';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedPreset('all');
    setSelectedType('all');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerArea}>
            {/* 1. Functional Search Input Bar */}
            <View style={styles.searchBar}>
              <Ionicons name="search-outline" size={18} color={COLORS.textMuted} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by category or keyword..."
                placeholderTextColor={COLORS.textSubtle}
                value={searchQuery}
                onChangeText={setSearchQuery}
                returnKeyType="search"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearchQuery('')}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons name="close-circle" size={18} color={COLORS.textSubtle} />
                </TouchableOpacity>
              )}
            </View>

            {/* 2. Quick Preset Filter Bar */}
            <DateFilterBar
              selectedPreset={selectedPreset}
              onSelectPreset={setSelectedPreset}
              sortOrder={sortOrder}
              onToggleSort={() =>
                setSortOrder((prev) => (prev === 'newest' ? 'oldest' : 'newest'))
              }
              selectedType={selectedType}
              onSelectType={setSelectedType}
            />

            {/* 3. Subtle Results Counter Bar */}
            <View style={styles.counterRow}>
              <Text style={styles.counterText}>
                {filteredTransactions.length === 1
                  ? '1 transaction'
                  : `${filteredTransactions.length} transactions`}
              </Text>

              {isFiltered && (
                <TouchableOpacity onPress={handleResetFilters} activeOpacity={0.7}>
                  <Text style={styles.resetLink}>Clear filters</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        }
        ListEmptyComponent={
          transactions.length === 0 ? (
            <View style={styles.emptyCard}>
              <View style={styles.emptyIconCircle}>
                <Ionicons name="receipt-outline" size={32} color={COLORS.accent} />
              </View>
              <Text style={styles.emptyTitle}>No transactions recorded</Text>
              <Text style={styles.emptyText}>
                Your transaction log is completely clean. Tap &quot;+ Add Transaction&quot; on the Dashboard to record your first entry.
              </Text>
            </View>
          ) : (
            <View style={styles.emptyCard}>
              <View style={styles.emptyIconCircle}>
                <Ionicons name="search-outline" size={32} color={COLORS.textMuted} />
              </View>
              <Text style={styles.emptyTitle}>No matching transactions</Text>
              <Text style={styles.emptyText}>
                We couldn&apos;t find any records matching your search or filters.
              </Text>
              <TouchableOpacity
                style={styles.resetFilterButton}
                onPress={handleResetFilters}
              >
                <Text style={styles.resetFilterButtonText}>Clear Search & Filters</Text>
              </TouchableOpacity>
            </View>
          )}
        renderItem={({ item }) => (
          <TransactionCard
            transaction={item}
            onDelete={deleteTransaction}
          />
        )}
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
    gap: 12,
    marginBottom: SPACING.xs,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
    shadowColor: '#1A382B',
    shadowOpacity: 0.02,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    padding: 0,
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingTop: 2,
  },
  counterText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  resetLink: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.accent,
  },
  emptyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10,
    marginTop: SPACING.md,
  },
  emptyIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
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
  resetFilterButton: {
    marginTop: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.full,
  },
  resetFilterButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
});
