"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import {
  META_PIXEL_SCRIPT_SRC,
  getMetaPixelId,
  initMetaPixel,
  trackMetaPageView,
} from "@/lib/metaPixel";

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pixelId = getMetaPixelId();

  useEffect(() => {
    if (!pixelId) return;
    initMetaPixel();
    trackMetaPageView(pathname, searchParams.toString());
  }, [pathname, searchParams, pixelId]);

  if (!pixelId) return null;

  return (
    <>
      <Script
        id="meta-pixel"
        src={META_PIXEL_SCRIPT_SRC}
        strategy="afterInteractive"
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
