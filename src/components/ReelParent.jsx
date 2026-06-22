"use client";

import { useState } from "react";
import ReelGallery from "./ReelGallery";
import ReelModal from "./ReelModal";
import { reels } from "../utils/reels";

export default function ReelsSection() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!reels || reels.length === 0) {
    return null;
  }

  return (
    <>
      <ReelGallery
        reels={reels}
        onOpen={(i) => {
          setIndex(i);
          setOpen(true);
        }}
      />

      {open && (
        <ReelModal
          reels={reels}
          initialIndex={index}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
