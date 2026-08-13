"use client"
import React, { useState, useRef } from "react";
import Heading from "./Heading";
import CtaButton from "./CtaButton";
import Image from "next/image";
import OutlineButton from "./OutlineButton";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

function ProductFilter({ products }) {
  const types = ["All", "Serum", "Facewash", "Gels"];
  const [selected, setSelected] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const filteredProducts =
    selected === 0
      ? products
      : products.filter(
          (product) =>
            product.name &&
            product.name.toLowerCase().includes(types[selected].toLowerCase()),
        );

  return (
    <>
      <div className="flex lg:flex-row gap-y-5 lg:gap-y-0 flex-col justify-between w-full items-center">
        <div>
          <Heading
            mainHeading={"All Products"}
            subHeading={"The Products"}
            container="flex flex-col gap-y-5"
          />
          <p className="text-text/80 text-lg">All Clareva Products</p>
        </div>
        {/* Button Container */}
        <div className="flex flex-row gap-x-5 flex-wrap gap-y-2 lg:gap-y-0">
          {types.map((type, index) =>
            selected === index ? (
              <div key={index} onClick={() => setSelected(index)}>
                <CtaButton>{type}</CtaButton>
              </div>
            ) : (
              <div onClick={() => setSelected(index)}>
                <OutlineButton>{type}</OutlineButton>
              </div>
            ),
          )}
        </div>
      </div>
      <div className="w-full">
        <Swiper
          spaceBetween={24}
          slidesPerView={3}
          modules={[Navigation]}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <SwiperSlide key={index}>
                <div className="bg-primary-foreground p-5 rounded-2xl flex flex-col gap-y-5 justify-between h-full">
                  <div className="relative self-center h-96 w-96">
                    <Image
                      src={product.image}
                      fill
                      alt={product.name}
                      className="rounded-2xl object-cover"
                    />
                  </div>
                  <h1 className="text-3xl font-heading">{product.name}</h1>
                  <p className="text-text/80 text-base">{product.tagline}</p>
                  <div className="flex flex-row justify-between items-end">
                    <div className="flex flex-col">
                      <span className="font-heading text-3xl">
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
              </SwiperSlide>
            ))
          ) : (
            <p className="text-text/80 text-lg">No products found</p>
          )}
        </Swiper>
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <button
          ref={prevRef}
          className="border border-black p-2 rounded-full hover:bg-black hover:text-white transition-all"
        >
          <ArrowLeft />
        </button>
        <button
          ref={nextRef}
          className="border border-black p-2 rounded-full hover:bg-black hover:text-white transition-all"
        >
          <ArrowRight />
        </button>
      </div>
    </>
  );
}

export default ProductFilter