import CtaButton from '@/components/CtaButton'
import Heading from '@/components/Heading';
import OutlineButton from '@/components/OutlineButton'
import ProductFilter from '@/components/ProductFilter';
import RoutineBuilder from '@/components/RoutineBuilder';
import Image from 'next/image';
import React from 'react'

function page() {
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
const bundles = [
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
    description: "A cocooning ritual formulated to renew skin while you rest.",
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
  return (
    <div className='flex flex-col w-screen '>
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/hero/hero-shop.png')] bg-cover bg-center" />

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
            <p className="text-text/50 font-light text-lg w-[90%] my-5">
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
      <section className="py-20 px-10 flex flex-col gap-y-5 bg-secondary">
        <Heading
          subHeading={"Curated together"}
          mainHeading={"Curated Skincare Bundles"}
        />
        <p className="text-text/70 w-1/2">
          Save more with complete skincare routines designed to work together
          for healthier, glowing skin.
        </p>
        <div className="flex flex-col gap-y-5 lg:gap-y-0 lg:flex-row gap-x-10 items-center justify-center ">
          {bundles.map((bundle, index) => (
            <div
              key={index}
              className="bg-primary-foreground flex flex-col rounded-2xl"
            >
              {/* Upper */}
              <div className="relative h-125 w-full">
                <Image
                  src={bundle.image}
                  fill
                  alt={bundle.title}
                  className="rounded-t-2xl object-cover"
                />
                <span className="bg-primary text-primary-foreground p-2 rounded-2xl top-3 left-3 text-xs absolute">
                  SAVE {bundle.discount}
                </span>
              </div>
              {/* Lower */}
              <div className="flex flex-col mx-10 my-5 gap-y-5">
                {/* Products */}
                <div className="flex flex-row gap-x-3">
                  {bundle.products.map((product, index) => (
                    <span
                      key={index}
                      className="text-primary text-sm uppercase"
                    >
                      {product}
                    </span>
                  ))}
                </div>
                <h1 className="text-3xl font-heading">{bundle.title}</h1>
                <p className="text-text/80 text-base">
                  {bundle.description}
                </p>
                <div className="flex flex-row justify-between items-end">
                  <div className="flex flex-col">
                    <span className="font-heading text-3xl">
                      PKR {bundle.newPrice}
                    </span>
                    <span className="font-heading text-xl line-through">
                      PKR {bundle.oldPrice}
                    </span>
                  </div>
                  <OutlineButton>Shop Bundle</OutlineButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Discount Products */}
      <section className="flex flex-col items-center justify-center py-20 px-10 gap-y-5">
        <Heading
          mainHeading={"Limited-Time Offers"}
          subHeading={"A moment for you"}
          container="flex flex-col items-center gap-2"
        />
        <p className="text-text/80 text-lg">
          Enjoy exclusive savings on selected Clareva favourites — thoughtfully
          priced, never compromised.
              </p>
              <div className='flex flex-col gap-y-5 lg:gap-y-0 lg:flex-row items-stretch  justify-center gap-x-5  mx-20'>  
              {products.map((product, index) => (
                  <div key={index} className='bg-primary-foreground p-5 rounded-2xl flex flex-col gap-y-5 justify-between'>
                      <div className='relative self-center h-72 w-72 '>
                          
                    <Image 
                        src={product.image}
                    fill
                          alt={product.title}
                          className='rounded-2xl object-cover'
                          />
                      <div className='absolute top-5 text-primary uppercase bg-primary-foreground p-2 text-sm rounded-2xl backdrop-blur-3xl left-5 z-20'>{ product.badge}</div>
                      </div>
                      {/* Lowwer */}
                        <h1 className="text-3xl font-heading">{product.title}</h1>
                <p className="text-text/80 text-base">
                  {product.tagline}
                </p>
                <div className="flex flex-row justify-between items-end">
                  <div className="flex flex-col">
                    <span className="font-heading text-3xl">
                      PKR {product.newPrice}
                    </span>
                    <span className="font-heading text-xl line-through">
                      PKR {product.oldPrice}
                    </span>
                  </div>
                      </div>
                      <CtaButton>Shop Product</CtaButton>
              </div>
              ))}
              </div>
      </section>
      {/* All Products */}
          <section className="flex flex-col items-center justify-center mx-10 py-20 gap-y-5">
            <ProductFilter 
            products={products}
              />
      </section>
      {/* Routine Builder */}
      <section className="flex flex-col items-center my-10 ">
        <div className="flex flex-col items-center lg:items-start">
          <Heading
            subHeading="Routine Builder"
            mainHeading="Your ritual, <br/> four soft steps"
          />
          <RoutineBuilder />
        </div>
          </section>
          {/* Newsletter */}
          <section className='bg-card p-10'>
              <div className='bg-primary-foreground rounded-2xl shadow-2xl items-center flex flex-col  lg:flex-row justify-between p-10 gap-y-5 lg:gap-y-0'>
                  <div className=' w-full lg:w-1/2 flex flex-col gap-y-10'>
                      <Heading
                      subHeading={"Join the ritual"}
                      mainHeading={"Receive skincare stories & early access."}
                      />
                      <p className="text-text/80">Slow, considered emails from the Clareva atelier — new launches, edits and subscriber-only offers.</p>
                  </div>
                  <div className='flex relative w-full lg:w-[40%] '>
                      <input
                      type="email"
                          placeholder="Enter your email"
                          className='shadow-2xl border-[0.1px] border-secondary-foreground/20 rounded-2xl px-2 lg:px-14 py-4 w-full'
                      />
                      <button className='bg-primary text-primary-foreground px-4 py-2 right-2 m-1 absolute top-1 rounded-2xl '>Subscribe</button>

                  </div>
              </div>
          </section>
    </div>
  );
}

export default page