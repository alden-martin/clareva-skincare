"use client"
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CtaButton from "./CtaButton";
import OutlineButton from "./OutlineButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

const CARD_VARIANTS = {
  BUNDLE: "bundle",
  DISCOUNTED: "discounted",
  REGULAR: "regular",
};

function ProductCarousel({
  products,
  variant = CARD_VARIANTS.REGULAR,
  showNavigation = true,
  slidesPerView = { mobile: 1, tablet: 2, desktop: 3 },
}) {
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSlidesPerView, setCurrentSlidesPerView] = useState(
    slidesPerView.mobile,
  );

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth >= 1024) {
          setCurrentSlidesPerView(slidesPerView.desktop);
        } else if (window.innerWidth >= 768) {
          setCurrentSlidesPerView(slidesPerView.tablet);
        } else {
          setCurrentSlidesPerView(slidesPerView.mobile);
        }
      }
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, [slidesPerView]);

  const renderBundleCard = (product) => (
    <div className="bg-primary-foreground flex flex-col rounded-2xl h-full">
      <div className="relative h-64 w-full">
        <Image
          src={product.image}
          fill
          alt={product.name}
          className="rounded-t-2xl object-cover"
        />
        <span className="bg-primary text-primary-foreground p-2 rounded-2xl top-3 left-3 text-xs absolute">
          SAVE PKR {product.price - product.discounted_price}
        </span>
      </div>
      <div className="flex flex-col p-5 gap-y-3 grow">
        {product.tagline && (
          <p className="text-primary text-sm uppercase font-semibold">
            {product.tagline}
          </p>
        )}
        <div className="flex flex-row gap-x-3 flex-wrap">
          {product?.products?.map((prod, index) => (
            <span key={index} className="text-text/60 text-sm uppercase">
              {prod}
            </span>
          ))}
        </div>
        <h1 className="text-xl md:text-2xl font-heading">{product.name}</h1>
        <p className="text-text/80 text-sm">{product.description}</p>
        <div className="flex flex-row justify-between items-end mt-auto">
          <div className="flex flex-col">
            <span className="font-heading text-2xl">
              PKR {product.discounted_price}
            </span>
            <span className="font-heading text-lg line-through text-text/50">
              PKR {product.price}
            </span>
            <span className="text-primary text-sm font-semibold">
              SAVE PKR {product.price - product.discounted_price}
            </span>
          </div>
          <Link href={`/product/${product?.id}`}>
            <OutlineButton>Shop Bundle</OutlineButton>
          </Link>
        </div>
      </div>
    </div>
  );

  const renderDiscountedCard = (product) => (
    <div className="bg-primary-foreground p-5 rounded-2xl flex flex-col gap-y-5 justify-between h-full">
      <div className="relative self-center h-72 w-72">
        <Image
          src={product.image}
          fill
          alt={product.name}
          className="rounded-2xl object-cover"
        />
        <div className="absolute top-5 text-primary uppercase bg-primary-foreground p-2 text-sm rounded-2xl backdrop-blur-3xl left-5 z-20">
          Sale
        </div>
      </div>
      <h1 className="text-2xl font-heading">{product.name}</h1>
      <p className="text-text/80 text-base">{product.tagline}</p>
      <div className="flex flex-row justify-between items-end">
        <div className="flex flex-col">
          <span className="font-heading text-2xl">
            PKR {product.discounted_price}
          </span>
          <span className="font-heading text-xl line-through">
            PKR {product.price}
          </span>
        </div>
      </div>
      <Link href={`/product/${product?.id}`}>
        <CtaButton>Shop Product</CtaButton>
      </Link>
    </div>
  );

  const renderRegularCard = (product) => (
    <div className="bg-primary-foreground p-5 rounded-2xl flex flex-col gap-y-5 justify-between h-full">
      <div className="relative self-center h-72 w-72">
        <Image
          src={product.image}
          fill
          alt={product.name}
          className="rounded-2xl object-cover"
        />
      </div>
      <h1 className="text-2xl font-heading">{product.name}</h1>
      <p className="text-text/80 text-base">{product.tagline}</p>
      <div className="flex flex-row justify-between items-end">
        <div className="flex flex-col">
          <span className="font-heading text-2xl">
            PKR {product.discounted_price || product.price}
          </span>
          {product.discounted_price && (
            <span className="font-heading text-xl line-through">
              PKR {product.price}
            </span>
          )}
        </div>
      </div>
      <Link href={`/product/${product?.id}`}>
        <CtaButton>Shop Product</CtaButton>
      </Link>
    </div>
  );

  const renderCard = (product) => {
    switch (variant) {
      case CARD_VARIANTS.BUNDLE:
        return renderBundleCard(product);
      case CARD_VARIANTS.DISCOUNTED:
        return renderDiscountedCard(product);
      case CARD_VARIANTS.REGULAR:
      default:
        return renderRegularCard(product);
    }
  };

  if (!products || products.length === 0) return null;

  const canSlidePrev = currentIndex > 0;
  const canSlideNext = currentIndex + currentSlidesPerView < products.length;

  return (
    <div className="relative w-full">
      <Swiper
        ref={swiperRef}
        spaceBetween={20}
        slidesPerView={slidesPerView.mobile}
        modules={[Navigation]}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        breakpoints={{
          0: {
            slidesPerView: slidesPerView.mobile,
          },
          768: {
            slidesPerView: slidesPerView.tablet,
          },
          1024: {
            slidesPerView: slidesPerView.desktop,
          },
        }}
        className="w-full"
      >
        {products.map((product, index) => (
          <SwiperSlide key={index} className="h-auto">
            {renderCard(product)}
          </SwiperSlide>
        ))}
      </Swiper>
      {showNavigation && products.length > 1 && (
        <>
          {canSlidePrev && (
            <button
              onClick={() => swiperRef.current?.swiper?.slidePrev()}
              className="absolute -left-5 lg:left-2 top-1/2 -translate-y-1/2 z-10 text-black hover:opacity-70 transition-opacity"
            >
              <ArrowLeft className="w-8 h-8" />
            </button>
          )}
          {canSlideNext && (
            <button
              onClick={() => swiperRef.current?.swiper?.slideNext()}
              className="absolute -right-5  lg:right-2 top-1/2 -translate-y-1/2 z-10 text-black hover:opacity-70 transition-opacity"
            >
              <ArrowRight className="w-8 h-8" />
            </button>
          )}
        </>
      )}
    </div>
  );
}

export { ProductCarousel, CARD_VARIANTS };
