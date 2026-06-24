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
import RoutineBuilder from "@/components/RoutineBuilder";
import { number } from "framer-motion";
import { Button } from "@/components/ui/button";
import Ingredeints from "@/components/Ingredeints";

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
  const storyStates = [
    {
      number: "04",
      text: "Dermatologist partners",
    },
    {
      number: "28",
      text: "Cities served in PK",
    },
    {
      number: "0%",
      text: "Animal testing, ever",
    },
  ];
  const instaLink = ["DZo4IF8IHK3", "DYUbWLrIieS", "DXcSEBLjfIi"];
  const ingredients = [
  {
    name: "Niacinamide",
    description:
      "Refines pores, strengthens the barrier and visibly evens tone over 28 days.",
    per: "10%",
  },
  {
    name: "Salicylic Acid",
    description:
      "Lipid-soluble exfoliant that gently decongests pores prone to breakouts.",
    per: "2%",
  },
  {
    name: "Vitamin C",
    description:
      "Stabilised ascorbic acid brightens, lifts dullness and shields against pollution.",
    per: "15%",
  },
  {
    name: "Hyaluronic Acid",
    description:
      "Multi-molecular hydration that plumps without heaviness — built for humid climates.",
    per: "3-weight",
  },
  {
    name: "Ceramides",
    description:
      "Mimic the skin's own lipids, sealing in moisture and repairing barrier damage.",
    per: "Complex 3",
  },
];
  return (
    <div className="">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-10">
          {skinTypes.map((skinType, index) => (
            <div key={index} className="max-h-125 max-w-125 ">
              <TypeCard {...skinType} />
            </div>
          ))}
        </div>
      </section>
      {/* Ingredients */}
      <section className="bg-hero-background grid grid-cols-1 lg:grid-cols-2 px-20 py-20 items-center">
          <div>
            <Image
            src={"/ingredient.png"}
            alt="Ingredient"
            width={500}
            height={900}
            className="rounded-2xl"
            />
          </div>
          <div className="flex flex-col">
            <Heading
              subHeading="The Science"
              mainHeading="Ingredients, <br/>
              studied & sourced"
            />
            <Ingredeints ingredeints={ingredients}/>
          </div>
      </section>
      {/* Visible In Mirror */}
      <section className="flex flex-col items-center my-20">
        <Heading
          container="flex flex-col items-center"
          subHeading="12 Week Results"
          mainHeading="Visible in the mirror"
        />
        {/* Before After */}
        <BeforeAfterSlider />
      </section>
      {/* Routine Builder */}
      <section className="flex flex-col items-start mx-5">
        <Heading
          subHeading="Routine Builder"
          mainHeading="Your ritual, <br/> four soft steps"
        />
        <RoutineBuilder />
      </section>
      {/* Our Story */}
      <section className="grid grid-cols-1 lg:grid-cols-2 mx-20 my-20">
        {/* Right */}
        <div className="relative ">
          <Image
            src="/skin-types/dark.png"
            alt="Our Story"
            width={300}
            height={400}
            className="rounded-2xl shadow-2xl"
          />
          <div className="absolute bottom-10  left-20 p-5 bg-background rounded-2xl w-[45%] shadow-2xl">
            <h1 className="text-primary font-heading text-3xl font-semibold tracking-wider">
              est. 2024
            </h1>
            <p className="text-text text-xs">
              Founded in Lahore, formulated with Pakistani dermatologists.
            </p>
          </div>
        </div>
        {/* Left */}
        <div>
          <Heading
            subHeading="Our Story"
            mainHeading="Skincare <br/> our climate deserves."
          />
          <div className="text-text/70 font-light space-y-6 my-5 leading-relaxed  text-lg">
            <p>
              Clareva was born in a Lahore summer — when shelves were full of
              formulas built for European winters, and our skin was asking for
              something else entirely.
            </p>
            <p>
              We work alongside Pakistani dermatologists to study how heat, hard
              water and pollution behave on melanin-rich skin. Every actives
              percentage, every excipient, every drop is decided in clinic — not
              in a marketing room.
            </p>
            <h3 className="text-text font-heading text-2xl font-semibold italic ">
              "Clinical inside, poetic outside."
            </h3>
            <hr />
            <div className="grid grid-cols-3 gap-4">
              {storyStates.map((state, index) => (
                <div key={index} className="flex flex-col items-start">
                  <h2 className="text-text font-heading text-3xl font-semibold tracking-wider">
                    {state.number}
                  </h2>
                  <p className="text-text text-xs">{state.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Instagram Section */}
      <section className="flex flex-col mx-20 my-10">
        <div className="flex flex-row justify-between">
          <Heading
            subHeading="@clareva.skin"
            mainHeading="Tag us. We re-share."
          />
          <a
            href="https://www.instagram.com/clareva.skincare/"
            className="flex items-center gap-2 hover:underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-instagram w-4 h-4"
              aria-hidden="true"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
            </svg>
            Follow On Instagram
          </a>
        </div>
        <div className="grid grid-cols-3 gap-4 my-5">
          {instaLink.map((reelId, index) => (
            <iframe
              key={index}
              src={`https://www.instagram.com/reel/${reelId}/embed/`}
              width="100%"
              height="650"
              frameBorder="0"
              scrolling="no"
              allowFullScreen={true}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
