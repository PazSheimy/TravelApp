import { Stack } from 'expo-router';
import { Colors } from '@/constants/colors';

export default function ExploreLayout() {
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
        options={{ title: 'Explore', headerShown: false }}
      />
      <Stack.Screen
        name="city/[cityId]"
        options={{ title: 'City' }}
      />
      <Stack.Screen
        name="category/[categoryId]"
        options={{ title: 'Places' }}
      />
      <Stack.Screen
        name="place/[placeId]"
        options={{ title: 'Place Details' }}
      />
      <Stack.Screen
        name="excursions"
        options={{ title: 'Day Trips & Excursions' }}
      />
    </Stack>
  );
}
