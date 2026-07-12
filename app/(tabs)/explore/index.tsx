import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '@/constants/colors';
import { Spacing, FontSize, BorderRadius } from '@/constants/layout';
import { geocodeCity } from '@/services/googlePlaces';

const POPULAR_CITIES = [
  { id: '1', name: 'Paris', country: 'France', emoji: '🇫🇷', lat: 48.8566, lng: 2.3522 },
  { id: '2', name: 'Barcelona', country: 'Spain', emoji: '🇪🇸', lat: 41.3874, lng: 2.1686 },
  { id: '3', name: 'Rome', country: 'Italy', emoji: '🇮🇹', lat: 41.9028, lng: 12.4964 },
  { id: '4', name: 'London', country: 'United Kingdom', emoji: '🇬🇧', lat: 51.5074, lng: -0.1278 },
  { id: '5', name: 'Tokyo', country: 'Japan', emoji: '🇯🇵', lat: 35.6762, lng: 139.6503 },
  { id: '6', name: 'New York', country: 'United States', emoji: '🇺🇸', lat: 40.7128, lng: -74.006 },
  { id: '7', name: 'Amsterdam', country: 'Netherlands', emoji: '🇳🇱', lat: 52.3676, lng: 4.9041 },
  { id: '8', name: 'Berlin', country: 'Germany', emoji: '🇩🇪', lat: 52.52, lng: 13.405 },
];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleCityPress = (cityName: string, lat: number, lng: number, country?: string) => {
    router.push({
      pathname: '/(tabs)/explore/city/[cityId]',
      params: { cityId: cityName, cityName, lat: lat.toString(), lng: lng.toString(), country: country || '' },
    });
  };

  const handleSearch = async () => {
    const query = searchQuery.trim();
    if (!query) return;

    setIsSearching(true);
    try {
      const location = await geocodeCity(query);
      if (location) {
        handleCityPress(query, location.lat, location.lng, location.country);
      } else {
        Alert.alert('Not Found', `Could not find "${query}". Try a different city name or zip code.`);
      }
    } catch {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Where to?</Text>
        <Text style={styles.subtitle}>
          Search any city or zip code to discover everything it has to offer
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <FontAwesome
          name="search"
          size={18}
          color={Colors.textLight}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Enter city name or zip code..."
          placeholderTextColor={Colors.textLight}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          editable={!isSearching}
        />
        {isSearching && (
          <ActivityIndicator size="small" color={Colors.primary} />
        )}
      </View>

      <Text style={styles.sectionTitle}>Popular Destinations</Text>

      <FlatList
        data={POPULAR_CITIES}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cityCard}
            onPress={() => handleCityPress(item.name, item.lat, item.lng, item.country)}
            activeOpacity={0.7}
          >
            <Text style={styles.cityEmoji}>{item.emoji}</Text>
            <Text style={styles.cityName}>{item.name}</Text>
            <Text style={styles.cityCountry}>{item.country}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.text,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  grid: {
    paddingHorizontal: Spacing.lg,
  },
  row: {
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  cityCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cityEmoji: {
    fontSize: 36,
    marginBottom: Spacing.sm,
  },
  cityName: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.text,
  },
  cityCountry: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
