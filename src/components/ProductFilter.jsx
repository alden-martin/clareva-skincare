"use client";
import React, { useState, useEffect, useRef } from "react";
import Heading from "./Heading";
import CtaButton from "./CtaButton";
import OutlineButton from "./OutlineButton";
import Image from "next/image";
import Link from "next/link";

function ProductFilter({ products }) {
  const types = ["All", "Serum", "Face wash", "Gel"];
  const [selected, setSelected] = useState(0);
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);

  const filteredProducts =
    selected === 0
      ? products
      : products.filter(
          (product) =>
            product.name &&
            product.name.toLowerCase().includes(types[selected].toLowerCase()),
        );

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  useEffect(() => {
    setVisibleCount(12);
  }, [selected]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + 8);
            setIsLoading(false);
          }, 500);
        }
      },
      { threshold: 0.1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [isLoading, filteredProducts.length]);

  const renderProductCard = (product) => (
    <div className="bg-primary-foreground p-5 rounded-2xl flex flex-col gap-y-5 justify-between h-full">
      <div className="relative self-center h-72 w-72 -mt-5">
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
      {filteredProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
            {visibleProducts.map((product, index) => (
              <div key={index}>{renderProductCard(product)}</div>
            ))}
          </div>
          {visibleCount < filteredProducts.length && (
            <div ref={observerRef} className="flex justify-center py-8">
              {isLoading && (
                <p className="text-text/60">Loading more products...</p>
              )}
            </div>
          )}
        </>
      ) : (
        <p className="text-text/80 text-lg">No products found</p>
      )}
    </>
  );
}

export default ProductFilter;