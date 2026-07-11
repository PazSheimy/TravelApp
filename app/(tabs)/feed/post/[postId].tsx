import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '@/constants/colors';
import { Spacing, FontSize, BorderRadius } from '@/constants/layout';

const MOCK_COMMENTS = [
  { id: '1', author: 'Anna K.', text: 'Beautiful! Adding this to my list.', timeAgo: '1h ago' },
  { id: '2', author: 'Marco P.', text: 'I was there last summer, amazing place!', timeAgo: '3h ago' },
  { id: '3', author: 'Lisa M.', text: 'What time did you go? Want to avoid crowds.', timeAgo: '5h ago' },
];

export default function PostDetailScreen() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const [comment, setComment] = useState('');

  const handleSubmitComment = () => {
    if (!comment.trim()) return;
    // TODO: Save comment to Firestore
    setComment('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <ScrollView style={styles.scroll}>
        <View style={styles.postHeader}>
          <FontAwesome name="user-circle" size={40} color={Colors.textLight} />
          <View>
            <Text style={styles.authorName}>Traveler</Text>
            <Text style={styles.location}>Somewhere beautiful</Text>
          </View>
        </View>

        <View style={styles.photoPlaceholder}>
          <FontAwesome name="image" size={48} color={Colors.textLight} />
        </View>

        <View style={styles.content}>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionBtn}>
              <FontAwesome name="heart-o" size={22} color={Colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <FontAwesome name="comment-o" size={22} color={Colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <FontAwesome name="share" size={22} color={Colors.text} />
            </TouchableOpacity>
          </View>

          <Text style={styles.caption}>
            Post details will be loaded from Firestore (Post ID: {postId})
          </Text>

          <View style={styles.commentsSection}>
            <Text style={styles.commentsTitle}>Comments</Text>
            {MOCK_COMMENTS.map((c) => (
              <View key={c.id} style={styles.commentItem}>
                <Text style={styles.commentAuthor}>{c.author}</Text>
                <Text style={styles.commentText}>{c.text}</Text>
                <Text style={styles.commentTime}>{c.timeAgo}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.commentInput}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          placeholderTextColor={Colors.textLight}
          value={comment}
          onChangeText={setComment}
          multiline
        />
        <TouchableOpacity onPress={handleSubmitComment} disabled={!comment.trim()}>
          <FontAwesome
            name="send"
            size={20}
            color={comment.trim() ? Colors.primary : Colors.textLight}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.md,
  },
  authorName: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  location: {
    fontSize: FontSize.sm,
    color: Colors.primary,
  },
  photoPlaceholder: {
    height: 300,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: Spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginBottom: Spacing.md,
  },
  actionBtn: {
    padding: Spacing.xs,
  },
  caption: {
    fontSize: FontSize.md,
    color: Colors.text,
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  commentsSection: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.md,
  },
  commentsTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  commentItem: {
    marginBottom: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  commentAuthor: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  commentText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  commentTime: {
    fontSize: FontSize.xs,
    color: Colors.textLight,
    marginTop: 4,
  },
  commentInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
    gap: Spacing.md,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: FontSize.sm,
    color: Colors.text,
    maxHeight: 80,
  },
});
