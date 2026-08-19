"use client"
import React, { useRef } from "react";
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

  return (
    <div className="flex items-center gap-4 w-full">
      {showNavigation && products.length > 1 && (
        <button
          onClick={() => swiperRef.current?.swiper?.slidePrev()}
          className="bg-white border border-black p-3 rounded-full hover:bg-black hover:text-white transition-all shadow-md shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}
      <div className="flex-1 overflow-hidden">
        <Swiper
          ref={swiperRef}
          spaceBetween={20}
          slidesPerView={slidesPerView.mobile}
          modules={[Navigation]}
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
      </div>
      {showNavigation && products.length > 1 && (
        <button
          onClick={() => swiperRef.current?.swiper?.slideNext()}
          className="bg-white border border-black p-3 rounded-full hover:bg-black hover:text-white transition-all shadow-md shrink-0"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

export { ProductCarousel, CARD_VARIANTS };
