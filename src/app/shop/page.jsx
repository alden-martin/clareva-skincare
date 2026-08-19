"use client";
import CtaButton from "@/components/CtaButton";
import Heading from "@/components/Heading";
import OutlineButton from "@/components/OutlineButton";
import ProductFilter from "@/components/ProductFilter";
import RoutineBuilder from "@/components/RoutineBuilder";
import { ProductCarousel, CARD_VARIANTS } from "@/components/ProductCarousel";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useProducts } from "@/contexts/ProductContext";
import Link from "next/link";

function page() {
  const { products: allProducts } = useProducts();
  const [bundles, setBundles] = useState();
  const [disscountedProducts, setDisscountedProducts] = useState();
  const defaultBndles = [
    {
      image: "/bundles/radience.png",
      discount: "22%",
      title: "The Radiance Ritual",
      products: ["Cleanser", "Serum", "Moisturiser"],
      description:
        "A three-step routine designed to restore a lit-from-within glow.",
      newPrice: "8,900",
      oldPrice: "11,400",
    },
    {
      image: "/bundles/duo.png",
      discount: "18%",
      title: "Glow Essentials Duo",
      products: ["Vitamin C Serum", "Barrier Cream"],
      description:
        "The essential pairing for dewy, even-toned skin from morning to night.",
      newPrice: "6,400",
      oldPrice: "7,800",
    },
    {
      image: "/bundles/restore.png",
      discount: "21%",
      title: "Overnight Restore Set",
      products: ["Retinol", "Recovery Oil", "Balm"],
      description:
        "A cocooning ritual formulated to renew skin while you rest.",
      newPrice: "12,200",
      oldPrice: "15,600",
    },
  ];
  const products = [
    {
      image: "/products-image/gel.png",
      badge: "-17%",
      title: "Rose Quartz Cleansing Gel",
      tagline: "Gentle daily cleanse",
      rating: 4.9,
      newPrice: "2,650",
      oldPrice: "3,200",
    },
    {
      image: "/products-image/cream.png",
      badge: "Sale",
      title: "Velvet Peach Cream Wash",
      tagline: "Softens & soothes",
      rating: 4.8,
      newPrice: "2,900",
      oldPrice: "3,500",
    },
    {
      image: "/products-image/serum.png",
      badge: "-21%",
      title: "Amber Vitamin C Serum",
      tagline: "Brightens dull skin",
      rating: 5.0,
      newPrice: "4,100",
      oldPrice: "5,200",
    },
    {
      image: "/products-image/elixir.png",
      badge: "Bestseller",
      title: "Retinol Renewal Elixir",
      tagline: "Overnight resurfacing",
      rating: 4.9,
      newPrice: "5,400",
      oldPrice: "6,800",
    },
  ];

  const stats = [
    {
      number: "04+",
      label: "Signature Rituals",
    },
    {
      number: "28k+",
      label: "Happy Skins",
    },
    {
      number: "4.9",
      label: "Avg. Rating",
    },
  ];

  const getBundles = async () => {
    const filteredBundles = allProducts.filter((product) => {
      return product.name && product.name.toLowerCase().includes("bundle");
    });
    console.log(filteredBundles);
    if (filteredBundles) {
      setBundles(filteredBundles);
    }
  };
  const getDisscountedProducts = async () => {
    const filteredDiscountedProducts = allProducts.filter((product) => {
      if (
        product.discounted_price &&
        !(product.name && product.name.toLowerCase().includes("bundle"))
      ) {
        return product;
      }
    });
    console.log(filteredDiscountedProducts);
    if (filteredDiscountedProducts) {
      setDisscountedProducts(filteredDiscountedProducts);
    }
  };

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      getBundles();
      getDisscountedProducts();
    }
  }, [allProducts]);

  // Filter out bundles and discounted products for the "All Products" section
  const regularProducts =
    allProducts?.filter((product) => {
      const isBundle =
        product.name && product.name.toLowerCase().includes("bundle");
      const isDiscounted = product.discounted_price;
      return !isBundle;
    }) || [];

  return (
    <div className="flex flex-col w-screen ">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/hero/hero-shop.png')] bg-cover lg:bg-center " />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-hero-background via-hero-background/90 via-30% to-transparent" />

        {/* Content */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center min-h-screen">
          {/* Left */}
          <div className="px-10 py-20 mt-20">
            {/* heading */}
            <h1 className="font-heading text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] text-text font-bold">
              Discover Your Perfect Skincare Routine
            </h1>

            {/* Description */}
            <p className="text-text/80 font-light text-lg w-[90%] my-5">
              Explore Clareva's complete collection of dermatologist-inspired
              skincare, thoughtfully formulated to nourish, protect, and enhance
              every skin type.
            </p>

            {/* Button Container */}
            <div className="flex gap-x-5 my-10">
              <CtaButton>Shop Collection</CtaButton>
              <OutlineButton>Explore Rituals</OutlineButton>
            </div>

            {/* Stats */}
            <div className="flex gap-x-10">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`${
                    idx % 2 === 0 ? "border-r border-primary/50 pr-10" : ""
                  }`}
                >
                  <h1 className="text-text text-3xl font-bold capitalize mb-2">
                    {stat.number}
                  </h1>

                  <p className="text-primary text-xs uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Empty right column keeps text on left */}
          <div />
        </div>
      </section>
      {/* Bundles */}
      {bundles?.length > 0 && (
        <section className="py-20 px-5 lg:px-20 flex flex-col gap-y-5 bg-secondary">
          <Heading
            subHeading={"Curated together"}
            mainHeading={"Curated Skincare Bundles"}
          />
          <p className="text-text/70 w-1/2">
            Save more with complete skincare routines designed to work together
            for healthier, glowing skin.
          </p>
          <ProductCarousel
            products={bundles}
            variant={CARD_VARIANTS.BUNDLE}
            slidesPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
          />
        </section>
      )}

      {/* Discount Products */}
      {disscountedProducts?.length > 0 && (
        <section className="flex flex-col items-center justify-center py-20 px-10 gap-y-5">
          <Heading
            mainHeading={"Limited-Time Offers"}
            subHeading={"A moment for you"}
            container="flex flex-col items-center gap-2"
          />
          <p className="text-text/80 text-lg">
            Enjoy exclusive savings on selected Clareva favourites -
            thoughtfully priced, never compromised.
          </p>
          <ProductCarousel
            products={disscountedProducts}
            variant={CARD_VARIANTS.DISCOUNTED}
            slidesPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
          />
        </section>
      )}
      {/* All Products */}
      <section className="flex flex-col items-center justify-center mx-10 py-20 gap-y-5">
        <ProductFilter products={regularProducts} />
      </section>
      {/* Routine Builder */}
      <section className="flex flex-col items-center my-10 ">
        <RoutineBuilder />
      </section>
      {/* Newsletter */}
      <section className="bg-card p-10">
        <div className="bg-primary-foreground rounded-2xl shadow-2xl items-center flex flex-col  lg:flex-row justify-between lg:p-10 p-5 gap-y-5 lg:gap-y-0">
          <div className=" w-full lg:w-1/2 flex flex-col gap-y-10">
            <Heading
              subHeading={"Join the ritual"}
              mainHeading={"Receive skincare stories"}
            />
            <p className="text-text/80">
              Slow, considered emails from the Clareva atelier -new launches,
              edits and subscriber-only offers.
            </p>
          </div>
          <div className="flex relative w-full lg:w-[40%] ">
            <input
              type="email"
              placeholder="Enter your email"
              className="shadow-2xl border-[0.1px] border-secondary-foreground/20 rounded-2xl px-2 lg:px-14 py-4 w-full"
            />
            <button className="bg-primary text-primary-foreground px-4 py-2 right-2 m-1 absolute top-1 rounded-2xl ">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
