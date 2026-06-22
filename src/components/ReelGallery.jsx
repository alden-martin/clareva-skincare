"use client";

import Image from "next/image";

export default function ReelGallery({ reels, onOpen }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {reels.map((reel, index) => (
        <button
          key={reel.id}
          onClick={() => onOpen(index)}
          className="relative aspect-9/16 overflow-hidden rounded-xl"
        >
          <video
          src={reel.video}
          autoPlay
          muted={true}
          loop={true}
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />
        <h2 className="text-">{reel.product.name}</h2>
        <p className="text-primary">{reel.product.price}</p>
        </button>
      ))}
    </div>
  );
}
