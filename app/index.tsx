import { Redirect } from 'expo-router';

export default function Index() {
  // TODO: Check auth state and redirect accordingly
  // For now, go straight to tabs
  return <Redirect href="/(tabs)/explore" />;
}
