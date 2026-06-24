"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef(null);

  const updatePosition = (client) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    const x = client - rect.left;
    const percentage = (x / rect.width) * 100;

    setPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    updatePosition(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl select-none my-10"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Normal Image */}
      <Image
        src="/before-after.png"
        alt="Before After"
        width={1000}
        height={1000}
        className="block w-full h-auto"
        draggable={false}
      />

      {/* Grayscale Overlay */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      >
        <Image
          src="/before-after.png"
          alt="Grayscale"
          width={1000}
          height={1000}
          className="block w-full h-auto grayscale-50"
          draggable={false}
        />
      </div>

      {/* Slider */}
      <div
        className="absolute top-0 bottom-0 cursor-ew-resize"
        style={{
          left: `${position}%`,
          transform: "translateX(-50%)",
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Line */}
        <div className="relative h-full w-1 bg-yellow-400">
          {/* Handle */}
          <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-yellow-400 shadow-xl">
            <span className="text-white text-lg">↔</span>
          </div>
        </div>
      </div>
    </div>
  );
}