import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '@/constants/colors';
import { Spacing, FontSize, BorderRadius } from '@/constants/layout';

export default function CreatePostScreen() {
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [hasMedia, setHasMedia] = useState(false);

  const handlePickImage = () => {
    // TODO: Use expo-image-picker
    setHasMedia(true);
  };

  const handlePost = () => {
    if (!caption.trim()) {
      Alert.alert('Missing caption', 'Please add a caption to your post.');
      return;
    }
    // TODO: Upload to Firebase
    Alert.alert('Posted!', 'Your post has been shared with the community.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>New Post</Text>
        <TouchableOpacity onPress={handlePost}>
          <Text style={styles.postText}>Share</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.mediaSection}
        onPress={handlePickImage}
        activeOpacity={0.7}
      >
        {hasMedia ? (
          <View style={styles.mediaPreview}>
            <FontAwesome name="check-circle" size={48} color={Colors.success} />
            <Text style={styles.mediaSelectedText}>Photo selected</Text>
            <Text style={styles.mediaTapText}>Tap to change</Text>
          </View>
        ) : (
          <>
            <FontAwesome name="camera" size={40} color={Colors.primary} />
            <Text style={styles.mediaText}>Tap to add a photo or video</Text>
            <Text style={styles.mediaSubtext}>Share your travel moments</Text>
          </>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.captionInput}
        placeholder="Write a caption... Tell others about this place!"
        placeholderTextColor={Colors.textLight}
        value={caption}
        onChangeText={setCaption}
        multiline
        textAlignVertical="top"
      />

      <View style={styles.locationSection}>
        <FontAwesome name="map-marker" size={18} color={Colors.primary} />
        <TextInput
          style={styles.locationInput}
          placeholder="Add location (e.g., Barcelona, Spain)"
          placeholderTextColor={Colors.textLight}
          value={location}
          onChangeText={setLocation}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  cancelText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  postText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.primary,
  },
  mediaSection: {
    height: 250,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    margin: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    gap: Spacing.sm,
  },
  mediaPreview: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  mediaSelectedText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.success,
  },
  mediaTapText: {
    fontSize: FontSize.sm,
    color: Colors.textLight,
  },
  mediaText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.primary,
  },
  mediaSubtext: {
    fontSize: FontSize.sm,
    color: Colors.textLight,
  },
  captionInput: {
    minHeight: 120,
    padding: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.text,
    lineHeight: 24,
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: Spacing.sm,
  },
  locationInput: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.text,
  },
});
