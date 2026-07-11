import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '@/constants/colors';
import { Spacing, FontSize, BorderRadius } from '@/constants/layout';

const MOCK_BOOKMARKS = [
  { id: '1', name: 'La Sagrada Familia', city: 'Barcelona', category: 'Landmarks', rating: 4.8 },
  { id: '2', name: 'El Prado Museum', city: 'Madrid', category: 'Museums', rating: 4.7 },
  { id: '3', name: 'Park Guell', city: 'Barcelona', category: 'Parks', rating: 4.5 },
  { id: '4', name: 'El Born Restaurant', city: 'Barcelona', category: 'Restaurants', rating: 4.3 },
];

export default function BookmarksScreen() {
  const handlePlacePress = (placeId: string, placeName: string) => {
    router.push({
      pathname: '/(tabs)/explore/place/[placeId]',
      params: { placeId, placeName },
    });
  };

  return (
    <View style={styles.container}>
      {MOCK_BOOKMARKS.length === 0 ? (
        <View style={styles.empty}>
          <FontAwesome name="bookmark-o" size={48} color={Colors.textLight} />
          <Text style={styles.emptyTitle}>No saved places yet</Text>
          <Text style={styles.emptyText}>
            Explore cities and bookmark places you want to visit
          </Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => router.push('/(tabs)/explore')}
          >
            <Text style={styles.exploreButtonText}>Start Exploring</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={MOCK_BOOKMARKS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handlePlacePress(item.id, item.name)}
              activeOpacity={0.7}
            >
              <View style={styles.cardContent}>
                <Text style={styles.placeName}>{item.name}</Text>
                <View style={styles.meta}>
                  <FontAwesome name="map-marker" size={12} color={Colors.primary} />
                  <Text style={styles.cityText}>{item.city}</Text>
                  <Text style={styles.dot}>-</Text>
                  <Text style={styles.categoryText}>{item.category}</Text>
                </View>
                <View style={styles.ratingRow}>
                  <FontAwesome name="star" size={14} color={Colors.star} />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.removeBtn}>
                <FontAwesome name="trash-o" size={18} color={Colors.error} />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  emptyTitle: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.text,
  },
  emptyText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  exploreButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    marginTop: Spacing.md,
  },
  exploreButtonText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  list: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
  placeName: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cityText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
  },
  dot: {
    color: Colors.textLight,
  },
  categoryText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  removeBtn: {
    padding: Spacing.sm,
  },
});
