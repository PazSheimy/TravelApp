import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '@/constants/colors';
import { Spacing, FontSize, BorderRadius } from '@/constants/layout';
import { CATEGORIES, CATEGORY_SUBCATEGORIES } from '@/constants/categories';
import { searchPlaces, getPhotoUrl } from '@/services/googlePlaces';
import type { Place } from '@/types';

function renderStars(rating: number) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FontAwesome
        key={i}
        name={i <= Math.round(rating) ? 'star' : 'star-o'}
        size={14}
        color={Colors.star}
      />
    );
  }
  return stars;
}

function renderPrice(level: number) {
  if (level === 0) return '';
  return '$'.repeat(level);
}

export default function CategoryScreen() {
  const { categoryId, categoryName, cityName, lat, lng } = useLocalSearchParams<{
    categoryId: string;
    categoryName: string;
    cityId: string;
    cityName: string;
    lat: string;
    lng: string;
  }>();
  const [activeSubcategory, setActiveSubcategory] = useState('all');

  const category = CATEGORIES.find((c) => c.id === categoryId);
  const subcategories = categoryId ? CATEGORY_SUBCATEGORIES[categoryId] : null;
  const hasSubcategories = !!subcategories;

  const activeSubData = subcategories?.find((s) => s.id === activeSubcategory);
  const textQuery = activeSubData
    ? `${activeSubData.searchQuery} in ${cityName}`
    : `${category?.textSearchFallback || categoryName} in ${cityName}`;

  const { data, isLoading, error } = useQuery({
    queryKey: ['places', cityName, categoryId, activeSubcategory],
    queryFn: () => searchPlaces(
      textQuery,
      { lat: Number(lat), lng: Number(lng) },
      activeSubcategory === 'all' ? (category?.googlePlacesType || undefined) : undefined,
    ),
    enabled: !!lat && !!lng,
  });

  const places = data?.places || [];

  const handlePlacePress = (place: Place) => {
    router.push({
      pathname: '/(tabs)/explore/place/[placeId]',
      params: { placeId: place.id, placeName: place.name, cityName: cityName! },
    });
  };

  return (
    <>
      <Stack.Screen
        options={{ title: `${categoryName || 'Places'} in ${cityName || 'City'}` }}
      />
      <View style={styles.container}>
        {hasSubcategories && (
          <View style={styles.subcategoryBar}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.subcategories}
            >
              {subcategories.map((sub) => (
                <TouchableOpacity
                  key={sub.id}
                  style={[
                    styles.subcategoryChip,
                    activeSubcategory === sub.id && styles.subcategoryActive,
                  ]}
                  onPress={() => setActiveSubcategory(sub.id)}
                >
                  <Text
                    style={[
                      styles.subcategoryText,
                      activeSubcategory === sub.id && styles.subcategoryTextActive,
                    ]}
                  >
                    {sub.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {isLoading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Finding places...</Text>
          </View>
        ) : error ? (
          <View style={styles.centered}>
            <FontAwesome name="exclamation-circle" size={40} color={Colors.error} />
            <Text style={styles.errorText}>Couldn't load places. Check your connection and try again.</Text>
          </View>
        ) : (
          <FlatList
            data={places}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            style={styles.flatList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.placeCard}
                onPress={() => handlePlacePress(item)}
                activeOpacity={0.7}
              >
                {item.photoRef ? (
                  <Image
                    source={{ uri: getPhotoUrl(item.photoRef) }}
                    style={styles.placeThumbnail}
                    contentFit="cover"
                  />
                ) : (
                  <View
                    style={[
                      styles.placeThumbnail,
                      styles.placeThumbnailFallback,
                      { backgroundColor: category?.color || Colors.primary },
                    ]}
                  >
                    <FontAwesome
                      name={category?.icon as any || 'map-marker'}
                      size={24}
                      color={Colors.white}
                    />
                  </View>
                )}
                <View style={styles.placeInfo}>
                  <Text style={styles.placeName} numberOfLines={1}>{item.name}</Text>
                  <View style={styles.ratingRow}>
                    <View style={styles.stars}>{renderStars(item.rating)}</View>
                    <Text style={styles.ratingText}>
                      {item.rating.toFixed(1)} ({item.totalRatings})
                    </Text>
                    {item.priceLevel > 0 && (
                      <Text style={styles.priceText}>{renderPrice(item.priceLevel)}</Text>
                    )}
                  </View>
                  <Text style={styles.placeAddress} numberOfLines={1}>{item.address}</Text>
                  {item.isOpen !== undefined && (
                    <Text style={[styles.openStatus, item.isOpen ? styles.open : styles.closed]}>
                      {item.isOpen ? 'Open now' : 'Closed'}
                    </Text>
                  )}
                </View>
                <FontAwesome name="chevron-right" size={14} color={Colors.textLight} />
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.centered}>
                <FontAwesome name="search" size={40} color={Colors.textLight} />
                <Text style={styles.emptyText}>No places found in this category.</Text>
              </View>
            }
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flatList: {
    flex: 1,
  },
  subcategoryBar: {
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    justifyContent: 'center',
  },
  subcategories: {
    paddingHorizontal: 12,
    alignItems: 'center',
    gap: 6,
  },
  subcategoryChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  subcategoryActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  subcategoryText: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '600',
  },
  subcategoryTextActive: {
    color: Colors.white,
  },
  list: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  placeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.md,
  },
  placeThumbnail: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.sm,
  },
  placeThumbnailFallback: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeInfo: {
    flex: 1,
    gap: 4,
  },
  placeName: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  priceText: {
    fontSize: FontSize.xs,
    color: Colors.success,
    fontWeight: '600',
  },
  placeAddress: {
    fontSize: FontSize.xs,
    color: Colors.textLight,
  },
  openStatus: {
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
  open: {
    color: Colors.success,
  },
  closed: {
    color: Colors.error,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Spacing.xxl,
    gap: Spacing.md,
  },
  loadingText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  errorText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
});
