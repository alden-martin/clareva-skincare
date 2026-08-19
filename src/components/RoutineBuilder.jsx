"use client"
import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import CtaButton from "./CtaButton";
import Heading from "./Heading";
import { useProducts } from "@/contexts/ProductContext";

function RoutineBuilder() {
  const { products: allProducts } = useProducts();
  const [morningState, setMorningState] = useState(true);

  const morningProducts = allProducts.filter(
    (product) =>
      product.use &&
      product.use.toLowerCase().includes("day") &&
      !product.use.toLowerCase().includes("night") &&
      !product.name.toLowerCase().includes("bundle"),
  );

  const nightProducts = allProducts.filter(
    (product) =>
      product.use &&
      product.use.toLowerCase().includes("night") &&
      !product.use.toLowerCase().includes("day") &&
      !product.name.toLowerCase().includes("bundle"),
  );

  const calcTotalPrice = () => {
    const products = morningState ? morningProducts : nightProducts;
    return products.reduce((total, item) => {
      const price = parseFloat(item.price?.replace(/,/g, "") || 0);
      return total + price;
    }, 0);
  };

  const currentProducts = morningState ? morningProducts : nightProducts;

  return (
    nightProducts.length > 0 &&
    morningProducts.length > 0 && (
      <div className="flex flex-col items-center lg:items-start w-full px-4 lg:px-0">
        <Heading
          subHeading="Routine Builder"
          mainHeading="Your ritual, <br/> four soft steps"
        />
        <div className="relative flex flex-col items-center w-full max-w-6xl mt-10">
          {/* Toggle Button */}
          <div
            className="flex gap-x-4 bg-white rounded-2xl p-1 shadow-lg"
            onClick={() => setMorningState(!morningState)}
          >
            <button
              className={`cursor-pointer p-4 rounded-2xl font-body flex flex-row gap-x-1 transition duration-300 ${morningState ? "bg-black text-white" : "bg-white text-black"}`}
            >
              <Sun />
              Morning
            </button>
            <button
              className={`cursor-pointer p-4 rounded-2xl font-body flex flex-row gap-x-1 transition duration-300 ${!morningState ? "bg-black text-white" : "bg-white text-black"}`}
            >
              <Moon />
              Night
            </button>
          </div>
          {/* Routine Cards */}
          <div className="mt-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((item) => (
              <div
                key={item.id}
                className="p-6 bg-white rounded-2xl flex flex-col items-center shadow-md"
              >
                <div className="relative w-48 h-48 md:w-56 md:h-56 mb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="rounded-2xl object-cover"
                  />
                </div>
                <h1 className="font-heading text-lg md:text-xl font-semibold text-secondary-foreground text-center">
                  {item.name}
                </h1>
                <p className="font-body text-sm md:text-base font-light text-text text-center mt-2">
                  {item.tagline}
                </p>
              </div>
            ))}
          </div>
          <CtaButton className="mt-8">
            Add Full Routine Rs {calcTotalPrice().toString()}
          </CtaButton>
        </div>
      </div>
    )
  );
}

export default RoutineBuilder