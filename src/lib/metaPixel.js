export const META_PIXEL_SCRIPT_SRC =
  "https://connect.facebook.net/en_US/fbevents.js";

export function getMetaPixelId() {
  return process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "";
}

function getFbq() {
  if (typeof window === "undefined") return null;
  return window.fbq || null;
} 

function ensureFbq() {
  if (typeof window === "undefined") return null;
  if (window.fbq) return window.fbq;

  const fbq = function (...args) {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue.push(args);
    }
  };

  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;
  return fbq;
}

export function initMetaPixel() {
  const pixelId = getMetaPixelId();
  if (!pixelId || typeof window === "undefined") return false;

  const fbq = ensureFbq();
  if (!fbq) return false;

  if (window.__clarevaMetaPixelId === pixelId) return true;

  fbq("init", pixelId);
  window.__clarevaMetaPixelId = pixelId;
  return true;
}

export function trackMetaPageView(pathname, search = "") {
  if (!initMetaPixel()) return;

  const query = search
    ? search.startsWith("?")
      ? search
      : `?${search}`
    : "";
  const pageKey = `${pathname}${query}`;

  if (window.__clarevaMetaPixelLastPageView === pageKey) return;

  window.__clarevaMetaPixelLastPageView = pageKey;
  getFbq()?.("track", "PageView");
}

export function trackMetaEvent(eventName, params) {
  if (!eventName || !initMetaPixel()) return;

  const fbq = getFbq();
  if (!fbq) return;

  if (params) {
    fbq("track", eventName, params);
  } else {
    fbq("track", eventName);
  }
}
