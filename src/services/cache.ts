import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_PREFIX = 'places_cache:';
const DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 hours
const MAX_CACHE_ENTRIES = 200;

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export async function getCached<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;

    const entry: CacheEntry<T> = JSON.parse(raw);
    const age = Date.now() - entry.timestamp;

    if (age > entry.ttl) {
      AsyncStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }

    return entry.data;
  } catch {
    return null;
  }
}

export async function setCache<T>(key: string, data: T, ttl: number = DEFAULT_TTL): Promise<void> {
  try {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
    };
    await AsyncStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
  } catch {
    // Storage full or write error — silently skip
  }
}

export async function clearExpiredCache(): Promise<void> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter((k) => k.startsWith(CACHE_PREFIX));

    if (cacheKeys.length <= MAX_CACHE_ENTRIES) return;

    const entries = await AsyncStorage.multiGet(cacheKeys);
    const now = Date.now();
    const toRemove: string[] = [];

    for (const [key, value] of entries) {
      if (!value) {
        toRemove.push(key);
        continue;
      }
      try {
        const entry = JSON.parse(value);
        if (now - entry.timestamp > entry.ttl) {
          toRemove.push(key);
        }
      } catch {
        toRemove.push(key);
      }
    }

    if (toRemove.length > 0) {
      await AsyncStorage.multiRemove(toRemove);
    }
  } catch {
    // Cleanup failed — non-critical
  }
}
