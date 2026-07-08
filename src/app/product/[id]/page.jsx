"use client";
import { useParams, notFound } from "next/navigation";
import React, { useEffect, useState } from "react";
import { products } from "@/utils/products";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import CtaButton from "@/components/CtaButton";
function page() {
  const [product, setProduct] = useState({
    id: 1,
    name: "Default Name",
    tagline: "Default Tagline",
    price: "PKR 0,00",
    image: "/products/MandelicAcid.png",
    description: "Deafult Description",
    benefits: ["Benefit 1", "Benefit 2", "Benefit 3"],
    ingredients: [
      {
        name: "Ingredients 1",
        description: "Ingredients 1 Description",
      },
      {
        name: "Ingredients 2",
        description: "Ingredients 2 Description",
      },
    ],
    howToUse: [
      "Step 1",
      "Step 2",
      "Step 3",
    ],
    bestFor: [
      "Best For 1",
      "Best For 2",
      "Best For 3",
    ],
    results:
      "Default 1",
    size: "0ml",
    skinType: "Deafult Skin Type",
    use: "Deafult Use",
  });
  const [openSection, setOpenSection] = useState("description");
  const { id } = useParams();
  const getProduct = () => {
    if (id) {
      return products.find((product) => product.id == id);
    }
  };
  useEffect(() => {
    const foundProduct = getProduct();
    if (!foundProduct) {
      notFound();
    }
    setProduct(foundProduct);
  }, []);

  const sections = [
    { key: "description", heading: "Product Description", data: product.description },
    { key: "benefits", heading: "Benefits", data: product.benefits },
    { key: "ingredients", heading: "Ingredients", data: product.ingredients },
    { key: "howToUse", heading: "How to Use", data: product.howToUse },
    { key: "bestFor", heading: "Best For", data: product.bestFor },
    { key: "results", heading: "Results", data: product.results },
    { key: "details", heading: "Details", data: { size: product.size, skinType: product.skinType, use: product.use } },
  ];

  const toggleSection = (key) => {
    setOpenSection(openSection === key ? null : key);
  };

  const renderContent = (key, data) => {
    switch (key) {
      case "description":
      case "results":
        return <p className="text-text/70">{data}</p>;
      case "benefits":
      case "howToUse":
      case "bestFor":
        return (
          <ul className="list-disc list-inside text-text/70 space-y-1">
            {data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      case "ingredients":
        return (
          <div className="text-text/70 space-y-3">
            {data.map((ingredient, index) => (
              <div key={index}>
                <p className="font-semibold">{ingredient.name}</p>
                <p className="text-sm">{ingredient.description}</p>
              </div>
            ))}
          </div>
        );
      case "details":
        return (
          <div className="text-text/70 space-y-2">
            <p><span className="font-semibold">Size:</span> {data.size}</p>
            <p><span className="font-semibold">Skin Type:</span> {data.skinType}</p>
            <p><span className="font-semibold">Use:</span> {data.use}</p>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className="mt-30 mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 mx-20 items-center justify-between">
        {/* Left */}
        <div>
          <Image
            className="rounded-2xl"
            src={product.image}
            width={500}
            height={500}
          />
        </div>
        {/* Right */}
        <div className="flex flex-col items-start my-5">
          {/* Title */}
          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>
          {/* Tagline */}
          <p className="text-sm text-text/50">{product.tagline}</p>
          {/* Prize */}
          <p className="text-lg font-semibold">{product.price}</p>
          {/* size */}
          <div className="flex flex-row items-start gap-x-2">
          <h4 className="font-bold text-base">Size: </h4>
          <p className="text-base font-semibold text-text/80">{ product.size}</p>
          </div>
          {/* Sections */}
          <div className="mt-6 space-y-2">
            {sections.map((section) => (
              <div key={section.key} className="border-b border-border">
                <button
                  onClick={() => toggleSection(section.key)}
                  className="w-125 text-left py-3 flex justify-between items-center hover:text-primary transition-colors"
                >
                  <h2 className="text-2xl font-bold">{section.heading}</h2>
                  <motion.span
                    animate={{ rotate: openSection === section.key ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openSection === section.key && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden pb-4 pt-2"
                    >
                      {renderContent(section.key, section.data)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          {/* Add To Cart */}
          <div className="mt-5">

          <CtaButton>
            Add To Cart
          </CtaButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
