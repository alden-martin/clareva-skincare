import CtaButton from "@/components/CtaButton";
import OutlineButton from "@/components/OutlineButton";
import Image from "next/image";
import { FlaskConical, Heart, Leaf, MapPin, Sparkles } from "lucide-react";
import Heading from "@/components/Heading";
import Link from "next/link";
import ProductList from "@/components/ProductList";
import ReelParent from "@/components/ReelParent";
import Head from "next/head";
import TypeCard from "@/components/TypeCard";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

export default function Home() {
  const stats = [
    {
      number: "12k+",
      label: "Glowing reviews",
    },
    {
      number: "94%",
      label: "See visible results",
    },
  ];
  const features = [
    {
      Icon: MapPin,
      text: "Made for pakistani skin",
    },
    {
      Icon: Leaf,
      text: "Vegan Ingredients",
    },
    {
      Icon: FlaskConical,
      text: "Dermatological Tested",
    },
    {
      Icon: Heart,
      text: "Cruelty Free",
    },
    {
      Icon: Sparkles,
      text: "Sulphate Free",
    },
  ];
  const productLine = [
    "Sunscreen",
    "Haircare",
    "Tones",
    "Serums",
    "Patches",
    "Lip Balms",
    "Body Care",
    "Cleansers",
    "Moisturizer",
  ];
  const videos = [
    {
      id: "1",
      src: "/videos/reel1-full.mp4",
      previewSrc: "/videos/reel1-preview.mp4",
      poster: "/images/reel1-poster.jpg",
      product: {
        id: "p1",
        name: "White Linen Shirt",
        price: 89.0,
        image: "/images/product1.jpg",
        url: "/products/white-linen-shirt",
      },
    },
  ];
const skinTypes = [
  {
    title: "Acne & Breakouts",
    description: "Soothe, decongest, restore.",
    link: "/skin-types/acne-breakouts",
    image: "/skin-types/acne.png",
  },
  {
    title: "Dry Skin",
    description: "Deep hydration that lasts.",
    link: "/skin-types/dry-skin",
    image: "/skin-types/dry.png",
  },
  {
    title: "Pigmentation",
    description: "Even tone, gentle science.",
    link: "/skin-types/pigmentation",
    image: "/skin-types/pigmentation.png",
  },
  {
    title: "Oily Skin",
    description: "Balance without stripping.",
    link: "/skin-types/oily-skin",
    image: "/skin-types/oily.png",
  },
  {
    title: "Sensitive Skin",
    description: "Calming, minimal, kind.",
    link: "/skin-types/sensitive-skin",
    image: "/skin-types/sensitive.png",
  },
  {
    title: "Dark Spots",
    description: "Brighten with intention.",
    link: "/skin-types/dark-spots",
    image: "/skin-types/dark.png",
  },
];
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="grid bg-hero-background grid-cols-1 lg:grid-cols-2 items-center justify-between py-20">
        {/* Left */}
        <div className="px-10 py-20">
          {/* heading */}
          <h1 className="font-heading text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] text-text font-bold">
            Quiet rituals.
            <br />
            <span className="text-primary font-heading italic">Radiant </span>
            results
          </h1>
          {/* Description */}
          <p className="text-text/50 font-light text-lg w-[90%] my-5">
            Dermatologist-backed skincare formulated for the climate, water and
            skin of South Asia — clinical inside, poetic outside.
          </p>
          {/* Button Container */}
          <div className="flex gap-x-5 my-10">
            <CtaButton>Shop The Edit</CtaButton>
            <OutlineButton>Build My Routine</OutlineButton>
          </div>
          {/* Stats */}
          <div className="flex gap-x-10">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`${idx % 2 === 0 ? "border-r border-primary/50 pr-10" : ""}`}
              >
                <h1 className="text-text text-3xl font-bold  capitalize hover:text-text transition-colors mb-2">
                  {stat.number}
                </h1>
                <p className="text-primary hover:text-text transition-colors text-xs  uppercase ">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Right */}
        <div className="relative min-h-[650px] px-10 py-20">
          <Image
            src="/hero/hero-image-01.png"
            alt="Hero"
            width={500}
            height={700}
            className="absolute top-10 right-10 w-[60%] h-[500px] object-cover rounded-4xl shadow-2xl"
          />

          <Image
            src="/hero/hero-image-02.png"
            alt="Hero"
            width={350}
            height={350}
            className="absolute bottom-0 left-0 w-[45%] h-[320px] object-cover rounded-4xl shadow-2xl"
          />
        </div>
      </section>
      {/* Features Line */}
      <div className="bg-background py-8  overflow-hidden border-b border-primary/20">
        <div className="flex w-max animate-marquee">
          {[...features, ...features].map((feature, index) => {
            const Icon = feature.Icon;
            return (
              <div key={index} className="flex items-center">
                <div className="flex items-center gap-x-3 uppercase mx-8 whitespace-nowrap">
                  <Icon size={14} />
                  <span>{feature.text}</span>
                </div>
                <div className="w-2 h-2 bg-primary/50 rounded-full" />
              </div>
            );
          })}
        </div>
      </div>
      {/* Product Line */}
      <section className="flex justify-between items-center px-10 py-5">
        {productLine.map((line, index) => (
          <div key={index} className="flex flex-col items-center">
            <Image
              src={`/products/${index + 1}.png`}
              className="rounded-full"
              alt={line}
              width={100}
              height={100}
            />
            <Link
              className="text-sm  font-light  hover:font-normal hover:underline text-text/80 hover:text-text"
              href={""}
            >
              {line}
            </Link>
          </div>
        ))}
      </section>
      {/* The Edit */}
      <section className="flex flex-col gap-y-10 px-10 py-20 bg-background ">
        <Heading
          subHeading="The Edit"
          mainHeading="Best loved <br/>
by thousands"
        />
        <div className="relative">
          <ProductList />
        </div>
      </section>
      {/* Video Section */}
      <section className="flex flex-col gap-y-10 px-10 py-20 bg-background ">
        <Heading
          subHeading="Real Clareva Results"
          mainHeading="Skin stories,<br/> told in motion"
        />
        <ReelParent />
      </section>
      {/* Shop By Concern */}
      <section className="flex flex-col items-center gap-y-10">
        <Heading
        container="flex flex-col items-center"
          subHeading="Shop By Skin Concern"
          mainHeading="Begin with what your skin asks for"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
          
        {
          skinTypes.map((skinType, index) => (
            <div key={index} className="max-h-125 max-w-125 ">
            <TypeCard {...skinType} />
            </div>
          ))
        }
        </div>
      </section>
      {/* Visible In Mirror */}
      <section className="flex flex-col items-center">
        <Heading 
          container="flex flex-col items-center"
          subHeading="12 Week Results"
          mainHeading="Visible in the mirror"
        />
        {/* Before After */}
        <BeforeAfterSlider />
      </section>
    </div>
  );
}
