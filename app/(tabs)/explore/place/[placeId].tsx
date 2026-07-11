import { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '@/constants/colors';
import { Spacing, FontSize, BorderRadius } from '@/constants/layout';
import { getPlaceDetails, getPhotoUrl } from '@/services/googlePlaces';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function renderStars(rating: number) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<FontAwesome key={i} name="star" size={16} color={Colors.star} />);
    } else if (i - 0.5 <= rating) {
      stars.push(<FontAwesome key={i} name="star-half-full" size={16} color={Colors.star} />);
    } else {
      stars.push(<FontAwesome key={i} name="star-o" size={16} color={Colors.star} />);
    }
  }
  return stars;
}

export default function PlaceDetailScreen() {
  const { placeId, placeName, cityName } = useLocalSearchParams<{
    placeId: string;
    placeName: string;
    cityName: string;
  }>();

  const { data: place, isLoading } = useQuery({
    queryKey: ['placeDetail', placeId],
    queryFn: () => getPlaceDetails(placeId!),
    enabled: !!placeId,
  });

  const handleDirections = () => {
    if (place?.location) {
      Linking.openURL(
        `https://www.google.com/maps/dir/?api=1&destination=${place.location.lat},${place.location.lng}&destination_place_id=${placeId}`
      );
    } else {
      Linking.openURL(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName || '')}`
      );
    }
  };

  const handleCall = () => {
    if (place?.phone) {
      Linking.openURL(`tel:${place.phone}`);
    }
  };

  const handleWebsite = () => {
    if (place?.website) {
      Linking.openURL(place.website);
    }
  };

  const handleShare = () => {
    if (place?.website) {
      Linking.openURL(place.website);
    }
  };

  if (isLoading) {
    return (
      <>
        <Stack.Screen options={{ title: placeName || 'Place Details' }} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading details...</Text>
        </View>
      </>
    );
  }

  const photos = place?.photos || [];
  const priceLabel = place?.priceLevel
    ? '$'.repeat(place.priceLevel)
    : null;

  return (
    <>
      <Stack.Screen options={{ title: place?.name || placeName || 'Place Details' }} />
      <ScrollView style={styles.container}>
        {photos.length > 0 ? (
          <FlatList
            data={photos.slice(0, 8)}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <Image
                source={{ uri: getPhotoUrl(item, SCREEN_WIDTH) }}
                style={styles.photo}
                contentFit="cover"
              />
            )}
            style={styles.photoList}
          />
        ) : (
          <View style={styles.photoPlaceholder}>
            <FontAwesome name="camera" size={40} color={Colors.textLight} />
            <Text style={styles.photoPlaceholderText}>No photos available</Text>
          </View>
        )}

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={styles.titleInfo}>
              <Text style={styles.name}>{place?.name || placeName || 'Place'}</Text>
              <Text style={styles.city}>{cityName || ''}</Text>
            </View>
          </View>

          <View style={styles.ratingRow}>
            <View style={styles.stars}>{renderStars(place?.rating || 0)}</View>
            <Text style={styles.ratingText}>
              {place?.rating?.toFixed(1) || '0.0'} ({place?.totalRatings || 0} reviews)
            </Text>
            {priceLabel && <Text style={styles.priceText}>{priceLabel}</Text>}
            {place?.isOpen !== undefined && (
              <Text style={[styles.openBadge, place.isOpen ? styles.openBadgeOpen : styles.openBadgeClosed]}>
                {place.isOpen ? 'Open' : 'Closed'}
              </Text>
            )}
          </View>

          {place?.editorialSummary && (
            <Text style={styles.summary}>{place.editorialSummary}</Text>
          )}

          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleDirections}>
              <FontAwesome name="map-marker" size={20} color={Colors.white} />
              <Text style={styles.actionText}>Directions</Text>
            </TouchableOpacity>
            {place?.phone && (
              <TouchableOpacity style={[styles.actionButton, styles.actionSecondary]} onPress={handleCall}>
                <FontAwesome name="phone" size={20} color={Colors.primary} />
                <Text style={[styles.actionText, styles.actionTextSecondary]}>Call</Text>
              </TouchableOpacity>
            )}
            {place?.website && (
              <TouchableOpacity style={[styles.actionButton, styles.actionSecondary]} onPress={handleWebsite}>
                <FontAwesome name="globe" size={20} color={Colors.primary} />
                <Text style={[styles.actionText, styles.actionTextSecondary]}>Website</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>
            {place?.address && (
              <View style={styles.detailRow}>
                <FontAwesome name="map-marker" size={16} color={Colors.textSecondary} />
                <Text style={styles.detailText}>{place.address}</Text>
              </View>
            )}
            {place?.hours && place.hours.length > 0 && (
              <View style={styles.detailRow}>
                <FontAwesome name="clock-o" size={16} color={Colors.textSecondary} />
                <View style={styles.hoursContainer}>
                  {place.hours.map((h, i) => (
                    <Text key={i} style={styles.hourText}>{h}</Text>
                  ))}
                </View>
              </View>
            )}
            {place?.phone && (
              <TouchableOpacity style={styles.detailRow} onPress={handleCall}>
                <FontAwesome name="phone" size={16} color={Colors.textSecondary} />
                <Text style={[styles.detailText, styles.detailLink]}>{place.phone}</Text>
              </TouchableOpacity>
            )}
            {place?.website && (
              <TouchableOpacity style={styles.detailRow} onPress={handleWebsite}>
                <FontAwesome name="globe" size={16} color={Colors.textSecondary} />
                <Text style={[styles.detailText, styles.detailLink]} numberOfLines={1}>
                  {place.website.replace(/^https?:\/\/(www\.)?/, '')}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {place?.reviews && place.reviews.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              {place.reviews.map((review, i) => (
                <View key={i} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewAuthor}>
                      <View style={styles.reviewAvatar}>
                        <FontAwesome name="user" size={14} color={Colors.textLight} />
                      </View>
                      <Text style={styles.reviewName}>{review.authorName}</Text>
                    </View>
                    <Text style={styles.reviewTime}>{review.relativeTime}</Text>
                  </View>
                  <View style={styles.reviewStars}>{renderStars(review.rating)}</View>
                  {review.text ? (
                    <Text style={styles.reviewText}>{review.text}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    gap: Spacing.md,
  },
  loadingText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  photoList: {
    height: 260,
  },
  photo: {
    width: SCREEN_WIDTH,
    height: 260,
  },
  photoPlaceholder: {
    height: 200,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  photoPlaceholderText: {
    fontSize: FontSize.sm,
    color: Colors.textLight,
  },
  content: {
    padding: Spacing.lg,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  titleInfo: {
    flex: 1,
  },
  name: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    color: Colors.text,
  },
  city: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
    flexWrap: 'wrap',
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  priceText: {
    fontSize: FontSize.sm,
    color: Colors.success,
    fontWeight: '600',
  },
  openBadge: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
  },
  openBadgeOpen: {
    backgroundColor: '#dcfce7',
    color: Colors.success,
  },
  openBadgeClosed: {
    backgroundColor: '#fee2e2',
    color: Colors.error,
  },
  summary: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: Spacing.lg,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  actionSecondary: {
    backgroundColor: Colors.primaryLight,
  },
  actionText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.white,
  },
  actionTextSecondary: {
    color: Colors.primary,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  detailText: {
    fontSize: FontSize.md,
    color: Colors.text,
    flex: 1,
  },
  detailLink: {
    color: Colors.primary,
  },
  hoursContainer: {
    flex: 1,
    gap: 2,
  },
  hourText: {
    fontSize: FontSize.sm,
    color: Colors.text,
    lineHeight: 20,
  },
  reviewCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  reviewAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewName: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  reviewTime: {
    fontSize: FontSize.xs,
    color: Colors.textLight,
  },
  reviewStars: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
