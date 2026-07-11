import { Stack } from 'expo-router';
import { Colors } from '@/constants/colors';

export default function BookmarksLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.background },
        headerTintColor: Colors.text,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: 'Saved Places' }}
      />
    </Stack>
  );
}
