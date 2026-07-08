"use client";

import { Droplets } from "lucide-react";
import AnimateWrapper from "./AnimateWrapper";

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

export default function IngredientsGrid() {
  return (
    <section className="bg-secondary flex flex-col py-20 px-10">
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
          <AnimateWrapper
            key={ingredient.id}
            delay={index * 100}
            className="p-8 bg-primary-foreground rounded-lg flex flex-col gap-y-5 relative"
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
          </AnimateWrapper>
        ))}
      </div>
    </section>
  );
}
