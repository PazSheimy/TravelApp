import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '@/constants/colors';
import { Spacing, FontSize, BorderRadius } from '@/constants/layout';
import { searchPlaces, getPhotoUrl } from '@/services/googlePlaces';
import type { Place } from '@/types';

function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export default function ExcursionsScreen() {
  const { cityName, lat, lng } = useLocalSearchParams<{
    cityName: string;
    lat: string;
    lng: string;
  }>();

  const cityLat = Number(lat);
  const cityLng = Number(lng);

  const { data, isLoading, error } = useQuery({
    queryKey: ['excursions', cityName, lat, lng],
    queryFn: () => searchPlaces(
      `day trips from ${cityName}`,
      { lat: cityLat, lng: cityLng },
      'tourist_attraction',
      undefined,
      50000,
    ),
    enabled: !!lat && !!lng,
  });

  const destinations = data?.places || [];

  const handleDestinationPress = (place: Place) => {
    router.push({
      pathname: '/(tabs)/explore/place/[placeId]',
      params: { placeId: place.id, placeName: place.name, cityName: cityName! },
    });
  };

  return (
    <>
      <Stack.Screen options={{ title: `Trips from ${cityName || 'City'}` }} />
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Finding nearby destinations...</Text>
          </View>
        ) : error ? (
          <View style={styles.centered}>
            <FontAwesome name="exclamation-circle" size={40} color={Colors.error} />
            <Text style={styles.errorText}>Couldn't load destinations. Check your connection.</Text>
          </View>
        ) : (
          <FlatList
            data={destinations}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            ListHeaderComponent={
              <Text style={styles.headerText}>
                Discover popular destinations and day trips from {cityName || 'your city'}.
              </Text>
            }
            renderItem={({ item }) => {
              const dist = getDistance(cityLat, cityLng, item.location.lat, item.location.lng);
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => handleDestinationPress(item)}
                  activeOpacity={0.7}
                >
                  {item.photoRef ? (
                    <Image
                      source={{ uri: getPhotoUrl(item.photoRef) }}
                      style={styles.cardImage}
                      contentFit="cover"
                    />
                  ) : (
                    <View style={[styles.cardImage, styles.cardImageFallback]}>
                      <FontAwesome name="map-signs" size={24} color={Colors.primary} />
                    </View>
                  )}
                  <View style={styles.cardContent}>
                    <Text style={styles.destinationName} numberOfLines={1}>{item.name}</Text>
                    <View style={styles.meta}>
                      <View style={styles.metaItem}>
                        <FontAwesome name="road" size={12} color={Colors.textSecondary} />
                        <Text style={styles.metaText}>{dist} km away</Text>
                      </View>
                      {item.rating > 0 && (
                        <View style={styles.metaItem}>
                          <FontAwesome name="star" size={12} color={Colors.star} />
                          <Text style={styles.metaText}>{item.rating.toFixed(1)}</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.address} numberOfLines={1}>{item.address}</Text>
                  </View>
                  <FontAwesome name="chevron-right" size={14} color={Colors.textLight} />
                </TouchableOpacity>
              );
            }}
            ListEmptyComponent={
              <View style={styles.centered}>
                <FontAwesome name="map-o" size={40} color={Colors.textLight} />
                <Text style={styles.emptyText}>No nearby destinations found.</Text>
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
  list: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  headerText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.md,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.sm,
  },
  cardImageFallback: {
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
  destinationName: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.text,
  },
  meta: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  address: {
    fontSize: FontSize.xs,
    color: Colors.textLight,
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
