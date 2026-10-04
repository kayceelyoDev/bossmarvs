import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.tabBarActive,
        tabBarInactiveTintColor: COLORS.tabBarInactive,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTitleStyle: {
          color: COLORS.text,
          fontWeight: '800',
          fontSize: 22,
          letterSpacing: -0.5,
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'grid' : 'grid-outline'}
              size={size - 2}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarLabel: 'Activity',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'receipt' : 'receipt-outline'}
              size={size - 2}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="budgets"
        options={{
          title: 'Spending Plan',
          tabBarLabel: 'Budgets',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'pie-chart' : 'pie-chart-outline'}
              size={size - 2}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarLabel: 'Insights',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'bar-chart' : 'bar-chart-outline'}
              size={size - 2}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
