import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from '../context/AppContext';
import { COLORS } from '../constants/theme';

export default function RootLayout() {
  return (
    <AppProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.background },
          headerTitleStyle: { color: COLORS.text, fontWeight: '800' },
          headerTintColor: COLORS.text,
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="add"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
            headerShown: true,
            title: 'New Transaction',
          }}
        />
      </Stack>
    </AppProvider>
  );
}
