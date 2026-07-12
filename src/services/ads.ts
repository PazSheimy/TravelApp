import { Platform } from 'react-native';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

// Use test IDs for development. Replace with real IDs from your AdMob account for production.
// Real IDs look like: ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY
export const AD_UNIT_IDS = {
  banner: TestIds.ADAPTIVE_BANNER,
  interstitial: TestIds.INTERSTITIAL,
};

const FREE_VIEWS = 3; // First 3 place views are ad-free
const INTERSTITIAL_INTERVAL = 5; // Show interstitial every 5 views after free period

let placeViewCount = 0;
let interstitialReady = false;

const interstitial = InterstitialAd.createForAdRequest(AD_UNIT_IDS.interstitial);

interstitial.addAdEventListener(AdEventType.LOADED, () => {
  interstitialReady = true;
});

interstitial.addAdEventListener(AdEventType.CLOSED, () => {
  interstitialReady = false;
  interstitial.load();
});

interstitial.addAdEventListener(AdEventType.ERROR, () => {
  interstitialReady = false;
});

export function initAds() {
  interstitial.load();
}

export function trackPlaceView(): boolean {
  placeViewCount++;

  if (placeViewCount <= FREE_VIEWS) return false;

  const viewsSinceFree = placeViewCount - FREE_VIEWS;
  if (viewsSinceFree % INTERSTITIAL_INTERVAL === 0 && interstitialReady) {
    interstitial.show();
    return true;
  }

  return false;
}

export function shouldShowBanner(): boolean {
  return placeViewCount >= FREE_VIEWS;
}
