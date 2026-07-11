import { Stack } from 'expo-router';
import { Colors } from '@/constants/colors';

export default function FeedLayout() {
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
        options={{ title: 'Travel Feed' }}
      />
      <Stack.Screen
        name="post/[postId]"
        options={{ title: 'Post' }}
      />
    </Stack>
  );
}
