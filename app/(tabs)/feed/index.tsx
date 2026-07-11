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

const MOCK_POSTS = [
  {
    id: '1',
    authorName: 'Maria G.',
    location: 'Barcelona, Spain',
    caption: 'The most amazing sunset at La Barceloneta beach! Absolutely worth visiting.',
    likesCount: 42,
    commentsCount: 8,
    timeAgo: '2h ago',
  },
  {
    id: '2',
    authorName: 'James T.',
    location: 'Paris, France',
    caption: 'Finally visited the Louvre! The Mona Lisa is smaller than I expected but the museum is incredible.',
    likesCount: 89,
    commentsCount: 15,
    timeAgo: '5h ago',
  },
  {
    id: '3',
    authorName: 'Sofia R.',
    location: 'Rome, Italy',
    caption: 'Best gelato in Trastevere! This little shop is a hidden gem.',
    likesCount: 156,
    commentsCount: 23,
    timeAgo: '1d ago',
  },
];

export default function FeedScreen() {
  const handlePostPress = (postId: string) => {
    router.push({
      pathname: '/(tabs)/feed/post/[postId]',
      params: { postId },
    });
  };

  return (
    <FlatList
      style={styles.container}
      data={MOCK_POSTS}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.postCard}
          onPress={() => handlePostPress(item.id)}
          activeOpacity={0.8}
        >
          <View style={styles.postHeader}>
            <View style={styles.avatar}>
              <FontAwesome name="user-circle" size={36} color={Colors.textLight} />
            </View>
            <View>
              <Text style={styles.authorName}>{item.authorName}</Text>
              <View style={styles.locationRow}>
                <FontAwesome name="map-marker" size={12} color={Colors.primary} />
                <Text style={styles.location}>{item.location}</Text>
              </View>
            </View>
            <Text style={styles.timeAgo}>{item.timeAgo}</Text>
          </View>

          <View style={styles.photoPlaceholder}>
            <FontAwesome name="image" size={40} color={Colors.textLight} />
          </View>

          <Text style={styles.caption}>{item.caption}</Text>

          <View style={styles.postActions}>
            <TouchableOpacity style={styles.actionBtn}>
              <FontAwesome name="heart-o" size={20} color={Colors.text} />
              <Text style={styles.actionCount}>{item.likesCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <FontAwesome name="comment-o" size={20} color={Colors.text} />
              <Text style={styles.actionCount}>{item.commentsCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <FontAwesome name="share" size={20} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        <View style={styles.empty}>
          <FontAwesome name="image" size={48} color={Colors.textLight} />
          <Text style={styles.emptyTitle}>No posts yet</Text>
          <Text style={styles.emptyText}>Be the first to share your travel experience!</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface,
  },
  list: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  postCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  avatar: {},
  authorName: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: FontSize.xs,
    color: Colors.primary,
  },
  timeAgo: {
    marginLeft: 'auto',
    fontSize: FontSize.xs,
    color: Colors.textLight,
  },
  photoPlaceholder: {
    height: 250,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  caption: {
    fontSize: FontSize.md,
    color: Colors.text,
    lineHeight: 22,
    padding: Spacing.md,
  },
  postActions: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    gap: Spacing.lg,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  actionCount: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  empty: {
    alignItems: 'center',
    paddingTop: Spacing.xxl * 2,
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
  },
});
