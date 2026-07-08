"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ProductCard from "./ProductCard";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { products } from "@/utils/products";

function ProductList() {
  const prevBtn = useRef(null);
  const nextBtn = useRef(null);


  return (
    <>
      <div className="absolute left-0 right-20 -top-24 flex justify-end gap-4 mb-6">
        <button
          ref={prevBtn}
          className="custom-prev border border-black p-2 rounded-full hover:bg-black hover:text-white transition-all delay-75"
        >
          <ArrowLeft />
        </button>
        <button
          ref={nextBtn}
          className="custom-next border border-black p-2 rounded-full hover:bg-black hover:text-white transition-all delay-75"
        >
          <ArrowRight />
        </button>
      </div>
      <Swiper
        spaceBetween={24}
        pagination={{ clickable: true }}
        modules={[Navigation]}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevBtn.current;
          swiper.params.navigation.nextEl = nextBtn.current;
        }}
        navigation={{
          prevEl: prevBtn.current,
          nextEl: nextBtn.current,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="w-full"
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard
              name={product.name}
              price={product.price}
              pros={product.tagline}
              id={product.id}
              image={product.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default ProductList;
