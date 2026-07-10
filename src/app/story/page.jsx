
import CtaButton from "@/components/CtaButton";
import Heading from "@/components/Heading";
import OutlineButton from "@/components/OutlineButton";
import Image from "next/image";
import { FlaskConical, Sparkles, Sun, HeartHandshake, Check, Droplets, WandSparkles, ShieldCheck, Leaf } from "lucide-react";


export default function Story() {
  const philosophyCards = [
    {
      icon: FlaskConical,
      title: "Science-Driven",
      description: "Proven active ingredients supported by modern skincare research and dermatological insight.",
      delay: 0,
    },
    {
      icon: Sparkles,
      title: "Simple & Effective",
      description: "Minimal routines, maximum results — considered formulas that respect your skin's balance.",
      delay: 120,
    },
    {
      icon: Sun,
      title: "Made for Everyday Life",
      description: "Designed for Pakistan's climate and the daily environmental challenges skin faces.",
      delay: 240,
    },
    {
      icon: HeartHandshake,
      title: "Confidence Through Care",
      description: "Healthy skin is about confidence, comfort, and the quiet consistency of a daily ritual.",
      delay: 360,
    },
  ];

  const promiseItems = [
    {
      text: "Carefully Formulated",
      delay: 200,
    },
    {
      text: "Dermatology-Inspired",
      delay: 280,
    },
    {
      text: "Suitable for Daily Use",
      delay: 360,
    },
    {
      text: "High-Quality Ingredients",
      delay: 440,
    },
    {
      text: "Visible Results",
      delay: 520,
    },
    ];
    
     const ingredients = [
      {
        id: 1,
        name: "Vitamin C",
        benefit: "Brightening & antioxidant defense",
        description: "Evens tone, revives dullness",
        slug: "vitamin-c",
      },
      {
        id: 2,
        name: "Niacinamide",
        benefit: "Balances & refines texture",
        description: "Minimizes pores, calms redness",
        slug: "niacinamide",
      },
      {
        id: 3,
        name: "Glutathione",
        benefit: "Radiance & clarity",
        description: "Master antioxidant for luminous skin",
        slug: "glutathione",
      },
      {
        id: 4,
        name: "Mandelic Acid",
        benefit: "Gentle resurfacing",
        description: "Ideal for sensitive skin",
        slug: "mandelic-acid",
      },
      {
        id: 5,
        name: "Retinol",
        benefit: "Renewal & firmness",
        description: "Smoothes fine lines over time",
        slug: "retinol",
      },
      {
        id: 6,
        name: "Salicylic Acid",
        benefit: "Clarifies & unclogs",
        description: "Targeted for blemish-prone skin",
        slug: "salicylic-acid",
      },
      {
        id: 7,
        name: "Glycolic Acid",
        benefit: "Renews & polishes",
        description: "Reveals fresh, radiant skin",
        slug: "glycolic-acid",
      },
      {
        id: 8,
        name: "Hyaluronic Acid",
        benefit: "Deep hydration",
        description: "Plumps, softens, restores bounce",
        slug: "hyaluronic-acid",
      },
    ];

    const journey = [
      {
        opposite: "Clarify",
        word: "Acne",
      },
      {
        opposite: "Brighten",
        word: "Pigmentation",
      },
      {
        opposite: "Hydrate",
        word: "Dryness",
      },
      {
        opposite: "Illuminate",
        word: "Dullness",
      },
      {
        opposite: "Protect",
        word: "Healthy Maintenance",
      },
    ];
    const whyChooseClareva = [
      {
        id: 1,
        number: "01",
        title: "Premium Ingredients",
        description:
          "Sourced and selected for purity, potency and skin-first performance.",
        icon: Leaf,
      },
      {
        id: 2,
        number: "02",
        title: "Visible Results",
        description:
          "Formulas built around clinical actives that deliver on their promise.",
        icon: Sparkles,
      },
      {
        id: 3,
        number: "03",
        title: "Trusted Formulations",
        description:
          "Dermatology-inspired, safety-tested, made with quiet confidence.",
        icon: ShieldCheck,
      },
      {
        id: 4,
        number: "04",
        title: "Skincare Made Simple",
        description:
          "Considered routines that fit real lives — no noise, only what works.",
        icon: WandSparkles,
      },
    ];
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('/hero/hero-story.png')] bg-cover bg-position-[right_15%]" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-hero-background via-hero-background/90 via-30% to-transparent" />

        {/* Content */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center min-h-screen">
          {/* Left */}
          <div className="px-10 py-20 mt-20">
            {/* heading */}
            <h1 className="font-heading text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] text-text font-bold">
              Beauty begins with
              <span className="text-primary font-heading italic mx-2">
                healthy
              </span>{" "}
              skin
            </h1>

            {/* Description */}
            <p className="text-text/50 font-light text-lg w-[90%] my-5">
              At Clareva, we believe skincare is more than a daily routine —
              it's an act of self-care and confidence. We craft science-backed
              solutions that help you achieve healthier, brighter, naturally
              radiant skin.
            </p>

            {/* Button Container */}
            <div className="flex gap-x-5 my-10">
              <CtaButton>Discover Our Produc</CtaButton>
              <OutlineButton>Build My Routine</OutlineButton>
            </div>
          </div>

          {/* Empty right column keeps text on left */}
          <div />
        </div>
      </section>
      {/* Personal Consultation */}
      <section className="grid grid-cols-1 lg:grid-cols-2 px-10 py-20 bg-secondary/50 gap-x-52">
        {/* Left */}
        <div className="flex flex-col gap-y-5">
          <Heading
            mainHeading={"A quieter approach to modern skincare."}
            subHeading={" Our Story"}
          />
          <p className="text-text/60 text-lg">
            Clareva was born from a simple observation: skincare in Pakistan
            deserved the same thoughtfulness, science and elegance found in the
            world's most trusted beauty houses — reimagined for the skin,
            climate and rhythm of life here.
          </p>
          <p className="text-text/60 text-lg">
            We spent years listening — to dermatologists, chemists, and everyday
            people navigating dryness, dullness and the daily weight of
            pollution. What emerged is a considered collection built on
            evidence, restraint and respect for the skin's natural intelligence.
          </p>
          <h4 className="text-primary font-heading font-semibold text-2xl italic">
            "Effective skincare doesn't need to shout. It only needs to work."
          </h4>
        </div>
        {/* Right */}
        <div className="relative h-fit">
          <Image
            src="/story-about.png"
            alt="Our Story"
            width={500}
            height={400}
            className="rounded-2xl shadow-2xl"
          />
          <div className="absolute -bottom-10 -left-5 p-5 bg-background rounded-2xl w-[45%] shadow-2xl">
            <h1 className="text-primary font-heading text-xl font-semibold tracking-wider">
              Est.
            </h1>
            <p className="text-text text-4xl font-heading">2024</p>
          </div>
        </div>
      </section>
      {/* Philosphy */}
      <section
        id="philosophy"
        className="bg-secondary py-28 md:py-40 relative overflow-hidden"
      >
        <div className="absolute top-20 -right-20 h-96 w-96 rounded-full bg-warm/50 blur-3xl"></div>
        <div className="flex flex-col items-center  gap-y-10">
          <Heading
            mainHeading={"Our philosophy."}
            subHeading={" The Clareva Way"}
            container="items-center flex flex-col"
          />
          <p className="text-text/80 text-lg text-center">
            Four principles guide every formula we make and every ritual we
            design.
          </p>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mx-10">
            {philosophyCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className=""
                >
                  <div className="bg-card rounded-2xl h-full p-8 md:p-9 relative overflow-hidden group">
                    <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-rose to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="h-14 w-14 rounded-2xl bg-secondary grid place-items-center mb-8">
                      <Icon
                        className="h-6 w-6 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="font-heading text-3xl">{card.title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-text/65">
                      {card.description}
                    </p>
                    <div className="mt-8 h-px w-8 bg-text/60 transition-all duration-500 group-hover:w-16"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Promise */}
      <section className="bg-card py-28 md:py-40 relative overflow-hidden px-20">
        <div className="absolute top-40 left-[5%] h-64 w-64 rounded-full bg-nude/60 blur-3xl animate-float"></div>
        <div className="container-luxe grid gap-16 lg:grid-cols-[1fr_1.2fr] items-center">
          <div data-aos="fade-right" className="relative">
            <div className="relative aspect-4/5 max-w-md mx-auto overflow-hidden rounded-4xl shadow-(--shadow-secondary)">
              <Image
                src="/promise.png"
                alt="Amber serum bottle with a leaf, on warm beige"
                width={1000}
                height={1200}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-text/20 to-transparent"></div>
            </div>
          </div>
          <div data-aos="fade-left" data-aos-delay="150" className="">
            <Heading
              mainHeading={"Formulated with intention. Delivered with care."}
              subHeading={"Our Promise"}
            />
            <ul className="mt-12 space-y-4">
              {promiseItems.map((item, index) => (
                <div
                  key={index}
                  data-aos="fade-left"
                  data-aos-delay={index * 100}
                  className=""
                >
                  <li className="bg-primary-foreground flex items-center gap-5 rounded-2xl p-5 md:p-6 hover:bg-secondary transition-all duration-500 group">
                    <span className="grid place-items-center h-10 w-10 rounded-full bg-primary text-white shrink-0 group-hover:scale-110 transition-transform duration-500">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="font-heading text-3xl ">{item.text}</span>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* Ingredients  */}
      <section className="bg-secondary flex flex-col py-20 px-10 ">
        <div className="flex flex-col gap-y-5 w-[55%]">
          <Heading
            mainHeading={"Ingredients that make a difference."}
            subHeading={"The Formulary"}
          />
          <p className="text-text/80 text-lg">
            Great skincare starts with great ingredients — chosen for what they
            do, not what they promise.
          </p>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-4 mt-5">
          {ingredients.map((ingredient, index) => (
            <div
              key={ingredient.id}
              className="p-8 bg-primary-foreground rounded-lg flex flex-col gap-y-5 relative"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <span className="text-text/70 font-heading absolute right-10 top-10">
                {index > 10 ? `0${index + 1}` : `${index + 1}`}
              </span>
              <div className="bg-secondary w-fit rounded-full p-5">
                <Droplets />
              </div>
              <h3 className="font-heading text-3xl font-semibold">
                {ingredient.name}
              </h3>
              <p className="text-text/80 text-lg">{ingredient.benefit}</p>
              <p className="text-text/60">{ingredient.description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Skin Journey */}
      <section className="flex flex-col py-20 px-10">
        <Heading
          subHeading={"For Every You"}
          mainHeading={"Designed for every skin journey."}
        />
        <div className="bg-[url('/about-journey.png')] bg-cover pt-52 py-20 px-10 rounded-2xl my-20 bg-top flex flex-col gap-y-10 ">
          <h1 className="text-primary-foreground text-3xl">
            Whatever your skin's story, Clareva meets you where you are.
          </h1>
          <div className="flex flex-row gap-x-5 my-5 w-[80%] flex-wrap gap-y-4">
            {journey.map((j, index) => (
              <div
                key={index}
                className="bg-primary-foreground/50 backdrop-blur-3xl flex-row flex px-4 py-2 gap-x-2 rounded-2xl items-center"
              >
                <div className="bg-primary uppercase font-bold text-white p-2 rounded-2xl ">
                  <h2 className="font-body text-sm font-light">{j.opposite}</h2>
                </div>
                <p>{j.word}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Why Clareva */}
      <section className="bg-secondary flex flex-col py-20 px-10 ">
        <div className="flex flex-row justify-between w-full items-end">
          <Heading
            container="flex flex-col gap-y-4 w-1/2"
            mainHeading={"A quieter kind of confidence."}
            subHeading={"Why Clareva"}
          />
          <p className="text-text/80 text-lg mb-5 w-1/3">
            Four reasons thousands of people are making Clareva part of their
            daily ritual — and their long-term investment in skin.
          </p>
        </div>
        <div className="grid grid-cols-4  gap-4 mt-5">
          {whyChooseClareva.map((why, index) => (
            <div
              key={why.id}
              className="p-8 bg-primary-foreground rounded-lg flex flex-col gap-y-5 relative"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <span className="text-text/70 font-heading absolute right-10 top-10">
                {index > 10 ? `0${index + 1}` : `${index + 1}`}
              </span>
              <div className="bg-secondary w-fit rounded-full p-5">
                <why.icon className="text-primary" />
              </div>
              <h3 className="font-heading text-3xl font-normal">{why.title}</h3>
              <p className="text-text/80 text-lg">{why.description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Our Vision */}
      <section className="my-20 flex flex-col items-center">
        <Heading
          container="flex flex-col items-center gap-y-5 justify-center text-center w-1/2"
          subHeading={"Our Vision"}
          mainHeading={
            "To become one of Pakistan's most trusted skincare brands — empowering people to feel confident in their natural beauty."
          }
        />
        <p className="text-text/70 text-xl mt-5 w-[60%] text-center">
          Through effective, science-inspired formulations that honour every
          skin, every day, and every step of the journey.
        </p>
      </section>
      {/* Join Us */}
          <section className="bg-[url('/join-about.png')] flex flex-col items-start py-40 px-10 gap-y-10 relative z-20">
          {/* Overlay */}
              <div className="bg-secondary/50  w-full h-full absolute top-0 left-0 z-10"></div>
              <div className="w-[70%] flex flex-col gap-y-10 relative z-20">
                  
        <Heading
          mainHeading={"Join the Clareva community."}
          subHeading={"Join Us"}
        />
        <p className="text-text/80 text-lg">
          Thousands of people are embracing healthier skincare habits with
          Clareva every day. Whether you're beginning your skincare journey or
          refining an established routine, we're here to help you discover
          products that bring out your skin's natural radiance.
        </p>
        <h4 className="text-3xl font-heading ">Because healthy skin isn't a trend — it's a lifelong investment.

                  </h4>
                  <div className="flex flex-row gap-x-5">
                  <CtaButton>
                      Shop Now
                  </CtaButton>
                  <OutlineButton>
                      Build My Routine
                  </OutlineButton>
                  </div>
          </div>
      </section>
    </div>
  );
}
