"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";

export default function ReelModal({ reels, initialIndex, onClose }) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const videos = useRef([]);

  useEffect(() => {
    videos.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex) {
        video.play();
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex]);

  return (
    <div className="fixed inset-0 bg-black/90 z-[999]">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 text-white"
      >
        <X size={32} />
      </button>

      <div className="h-full flex items-center">
        <Swiper
          modules={[Navigation]}
          centeredSlides
          slidesPerView={1.6}
          spaceBetween={30}
          navigation
          initialSlide={initialIndex}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="w-full"
        >
          {reels.map((reel, index) => (
            <SwiperSlide key={reel.id}>
              {({ isActive }) => (
                <motion.div
                  animate={{
                    scale: isActive ? 1 : 0.85,
                    opacity: isActive ? 1 : 0.5,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="relative mx-auto aspect-[9/16] max-w-[420px] rounded-3xl overflow-hidden"
                >
                  <video
                    ref={(el) => {
                      if (videos.current) {
                        videos.current[index] = el;
                      }
                    }}
                    src={reel.video}
                    muted
                    controls={false}
                    playsInline
                    loop
                    className="w-full h-full object-cover"
                  />

                  {/* Progress Bar */}
                  <div className="absolute top-2 left-2 right-2 h-1 bg-white/20 rounded-full">
                    <div className="h-full w-1/2 bg-white rounded-full" />
                  </div>

                  {/* Product Card */}
                  <div className="absolute bottom-6 left-4 right-4">
                    <div className="bg-white rounded-2xl p-4 flex items-center gap-4">
                      <img
                        src={reel.product.image}
                        alt=""
                        className="w-16 h-16 rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <h4 className="font-semibold text-black">
                          {reel.product.name}
                        </h4>

                        <p className="font-bold text-black">
                          ₹{reel.product.price}
                        </p>
                      </div>
                    </div>

                    <button className="mt-3 w-full bg-blue-500 text-white rounded-xl py-3 font-semibold">
                      Add To Cart
                    </button>
                  </div>
                </motion.div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
