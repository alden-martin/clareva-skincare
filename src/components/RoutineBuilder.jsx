"use client"
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import CtaButton from "./CtaButton";
import { supabase } from "@/lib/supabaseClient";
import Heading from "./Heading";

function RoutineBuilder() {
  const [allProducts, setAllProducts] = useState([]);
  const [morningState, setMorningState] = useState(true);

  const getAllProducts = async () => {
    console.log("Getting Product..");

    const { data, error: fetchError } = await supabase
      .from("products")
      .select("*");
    if (fetchError) {
      console.log(fetchError);
      return;
    }
    console.log(data);
    setAllProducts(data);
  };

  const morningProducts = allProducts.filter(
    (product) => product.use && product.use.toLowerCase().includes("day"),
  );

  const nightProducts = allProducts.filter(
    (product) => product.use && product.use.toLowerCase().includes("night"),
  );

  useEffect(() => {
    getAllProducts();
    console.log(morningProducts);
  }, []);
  const calcTotalPrice = () => {
    const products = morningState ? morningProducts : nightProducts;
    return products.reduce((total, item) => {
      const price = parseFloat(item.price?.replace(/,/g, "") || 0);
      return total + price;
    }, 0);
  };

  return (
    nightProducts.length > 0 &&
    morningProducts.length > 0 && (
      <div className="flex flex-col items-center lg:items-start">
        <Heading
          subHeading="Routine Builder"
          mainHeading="Your ritual, <br/> four soft steps"
        />
        <div className="relative flex flex-col  items-center mb-10 lg:w-auto lg:max-w-full -ml-5 lg:ml-0 w-screen">
          {/* Toggle Button */}
          <div
            className="flex gap-x-4 bg-white rounded-2xl p-1 absolute left-[50%] -translate-x-1/2 lg:left-[80%] lg:right-0 lg:top-4 top-5 w-fit"
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
          <div className="grid grid-cols-1 my-10 items-center lg:grid-cols-4 gap-x-4 gap-y-5 w-fit lg:w-full justify-center mt-30 ">
            {morningState
              ? morningProducts.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 bg-white rounded-2xl  h-112"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={250}
                      height={250}
                      className="rounded-2xl mr-2 ml-2"
                    />
                    <h1 className="font-heading text-2xl mt-5 mx-[10%] font-semibold text-secondary-foreground">
                      {item.name}
                    </h1>
                    <p className="font-body text-sm font-light text-text mx-[10%] ">
                      {item.tagline}
                    </p>
                  </div>
                ))
              : nightProducts.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white rounded-2xl  h-112"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={250}
                      height={250}
                      className="rounded-2xl mr-2 ml-2"
                    />
                    <h1 className="font-heading text-2xl mt-5 mx-[10%] font-semibold text-secondary-foreground">
                      {item.name}
                    </h1>
                    <p className="font-body text-sm font-light text-text mx-[10%] ">
                      {item.tagline}
                    </p>
                  </div>
                ))}
          </div>
          <CtaButton>
            Add Full Routine Rs {calcTotalPrice().toString()}
          </CtaButton>
        </div>
      </div>
    )
  );
}

export default RoutineBuilder