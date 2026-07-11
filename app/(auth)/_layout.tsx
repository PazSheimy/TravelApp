import { Stack } from 'expo-router';
import { Colors } from '@/constants/colors';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.background },
        headerTintColor: Colors.primary,
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Stack.Screen
        name="login"
        options={{ title: 'Sign In', headerShown: false }}
      />
      <Stack.Screen
        name="register"
        options={{ title: 'Create Account' }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{ title: 'Reset Password' }}
      />
    </Stack>
  );
}
