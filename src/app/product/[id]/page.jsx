"use client";

import { useParams, notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import CtaButton from "@/components/CtaButton";
import { toast } from "react-hot-toast";
import { supabase } from "@/lib/supabaseClient";
import { addToCart } from "@/utils/shop";
import { useUser } from "@/contexts/UserContext";

function Page() {
  const { id } = useParams();
  const router = useRouter();
  const { user, refreshCart } = useUser();

  // Initialize with empty/default structure matching the DB
  const [product, setProduct] = useState({
    name: "",
    tagline: "",
    price: "",
    image: "",
    description: "",
    benifits: [],
    ingredients: [],
    howToUse: [],
    bestFor: [],
    results: "",
    size: [],
    skinType: [],
    use: "",
  });

  const [loading, setLoading] = useState(true);
  const [openSection, setOpenSection] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  // Fetch product from Supabase
  const fetchProduct = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      toast.error(error.message);
      setLoading(false);
      // If product not found, trigger 404
      if (error.code === "PGRST116") {
        notFound();
      }
      return;
    }

    if (data) {
      setProduct(data);
      // Set default size if there's only one size
      if (data.size && data.size.length === 1) {
        setSelectedSize(data.size[0]);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Sections configuration
  const sections = [
    {
      key: "description",
      heading: "Product Description",
      data: product.description,
    },
    { key: "benifits", heading: "Benefits", data: product.benifits },
    { key: "ingredients", heading: "Ingredients", data: product.ingredients },
    { key: "howToUse", heading: "How to Use", data: product.howToUse },
    { key: "bestFor", heading: "Best For", data: product.bestFor },
    { key: "results", heading: "Results", data: product.results },
    {
      key: "details",
      heading: "Details",
      data: {
        size: product.size,
        skinType: product.skinType,
        use: product.use,
      },
    },
  ];

  const toggleSection = (key) => {
    setOpenSection(openSection === key ? null : key);
  };

  const renderContent = (key, data) => {
    switch (key) {
      case "description":
      case "results":
        return <p className="text-text/70">{data}</p>;

      case "benifits":
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
            <p>
              <span className="font-semibold">Size:</span>{" "}
              {Array.isArray(data.size) ? data.size.join(", ") : data.size}
            </p>
            <p>
              <span className="font-semibold">Skin Type:</span>{" "}
              {Array.isArray(data.skinType)
                ? data.skinType.join(", ")
                : data.skinType}
            </p>
            <p>
              <span className="font-semibold">Use:</span> {data.use}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="mt-30 flex items-center justify-center h-96">
        <p className="text-lg text-text/70">Loading product...</p>
      </div>
    );
  }

  // If product is empty (e.g., no data after fetch), you could also call notFound() here.
  // But fetchProduct already handles notFound on error.

  return (
    <div className="mt-30 mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 mx-5 lg:mx-20 items-center justify-between">
        {/* Left – Image */}
        <div>
          <Image
            className="rounded-2xl"
            src={product.image}
            width={500}
            height={500}
            alt={product.name}
          />
        </div>

        {/* Right – Info */}
        <div className="flex flex-col items-start my-5 gap-y-1">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-sm text-text/50">{product.tagline}</p>
          <p className="text-lg font-semibold">PKR {product.price}</p>

          {/* Display first size if array, or all */}
          <div className="flex flex-row items-start gap-x-2">
            <h4 className="font-bold text-base">Size: </h4>
            <p className="text-base font-semibold text-text/80">
              {Array.isArray(product.size)
                ? product.size.join(", ")
                : product.size}
            </p>
          </div>

          {/* Accordion Sections */}
          <div className="mt-6 space-y-2 w-[90vw]">
            {sections.map((section) => (
              <div
                key={section.key}
                className="border-b border-border lg:w-125 w-[90vw]"
              >
                <button
                  onClick={() => toggleSection(section.key)}
                  className="lg:w-125 w-[90vw] text-left py-3 flex justify-between items-center hover:text-primary transition-colors"
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
          {/* Size Select */}
          {product.size && product.size.length > 1 && (
            <div className="mt-4">
              <h4 className="font-bold text-base mb-2">Select Size:</h4>
              <div className="flex flex-wrap gap-2">
                {product.size.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-secondary-foreground hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add To Cart */}
          <div className="mt-5 flex flex-row gap-x-5 items-center">
            <div className="flex items-center gap-4 ">
              <span className="font-semibold">Quantity:</span>
              <div className="flex items-center border border-secondary-foreground rounded-2xl">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-secondary transition-colors rounded-l-2xl"
                >
                  -
                </button>
                <span className="px-4 py-2 min-w-[50px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-secondary transition-colors rounded-r-2xl"
                >
                  +
                </button>
              </div>
            </div>
            <CtaButton
              clickFunction={async () => {
                // Validate size selection if product has multiple sizes
                if (product.size && product.size.length > 1 && !selectedSize) {
                  toast.error("Please select a size");
                  return;
                }
                try {
                  await addToCart(
                    product.id,
                    user,
                    quantity,
                    selectedSize,
                    refreshCart,
                  );
                } catch (error) {
                  if (error.message === "User not found") {
                    toast.error("Please sign in to add to cart");
                    router.push("/signup");
                  } else {
                    toast.error(error.message);
                  }
                }
              }}
            >
              Add To Cart
            </CtaButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
