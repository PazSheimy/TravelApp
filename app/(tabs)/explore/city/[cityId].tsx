import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '@/constants/colors';
import { Spacing, FontSize, BorderRadius } from '@/constants/layout';
import { CATEGORIES } from '@/constants/categories';

export default function CityScreen() {
  const { cityId, cityName, lat, lng } = useLocalSearchParams<{
    cityId: string;
    cityName: string;
    lat: string;
    lng: string;
  }>();

  const displayName = cityName || cityId;

  const handleCategoryPress = (categoryId: string, categoryName: string) => {
    router.push({
      pathname: '/(tabs)/explore/category/[categoryId]',
      params: { categoryId, categoryName, cityId: cityId!, cityName: displayName, lat: lat!, lng: lng! },
    });
  };

  const handleExcursions = () => {
    router.push({
      pathname: '/(tabs)/explore/excursions',
      params: { cityId: cityId!, cityName: displayName, lat: lat!, lng: lng! },
    });
  };

  return (
    <>
      <Stack.Screen options={{ title: displayName }} />
      <ScrollView style={styles.container}>
        <View style={styles.hero}>
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>{displayName}</Text>
            <Text style={styles.heroSubtitle}>Discover everything this city has to offer</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>What are you looking for?</Text>

          <View style={styles.grid}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, { borderLeftColor: category.color }]}
                onPress={() => handleCategoryPress(category.id, category.name)}
                activeOpacity={0.7}
              >
                <FontAwesome
                  name={category.icon as any}
                  size={24}
                  color={category.color}
                />
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.excursionBanner}
            onPress={handleExcursions}
            activeOpacity={0.7}
          >
            <View style={styles.excursionContent}>
              <FontAwesome name="map" size={24} color={Colors.primary} />
              <View style={styles.excursionText}>
                <Text style={styles.excursionTitle}>Day Trips & Excursions</Text>
                <Text style={styles.excursionSubtitle}>
                  Discover nearby cities and day trips from {displayName}
                </Text>
              </View>
            </View>
            <FontAwesome name="chevron-right" size={16} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  hero: {
    height: 200,
    backgroundColor: Colors.primary,
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    padding: Spacing.lg,
  },
  heroTitle: {
    fontSize: FontSize.xxxl,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  heroSubtitle: {
    fontSize: FontSize.md,
    color: 'rgba(255,255,255,0.85)',
  },
  content: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  categoryCard: {
    width: '47%',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    borderLeftWidth: 4,
    gap: Spacing.sm,
  },
  categoryName: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  excursionBanner: {
    backgroundColor: Colors.primaryLight,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  excursionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  excursionText: {
    flex: 1,
  },
  excursionTitle: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.primary,
  },
  excursionSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.primaryDark,
    marginTop: 2,
  },
});
