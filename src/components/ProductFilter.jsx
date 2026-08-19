"use client"
import React, { useState } from "react";
import Heading from "./Heading";
import CtaButton from "./CtaButton";
import OutlineButton from "./OutlineButton";
import { ProductCarousel, CARD_VARIANTS } from "./ProductCarousel";

function ProductFilter({ products }) {
  const types = ["All", "Serum", "Face wash", "Gel"];
  const [selected, setSelected] = useState(0);

  const filteredProducts =
    selected === 0
      ? products
      : products.filter(
          (product) =>
            product.name &&
            product.name.toLowerCase().includes(types[selected].toLowerCase()),
        );

  return (
    <>
      <div className="flex lg:flex-row gap-y-5 lg:gap-y-0 flex-col justify-between w-full items-center">
        <div>
          <Heading
            mainHeading={"All Products"}
            subHeading={"The Products"}
            container="flex flex-col gap-y-5"
          />
          <p className="text-text/80 text-lg">All Clareva Products</p>
        </div>
        {/* Button Container */}
        <div className="flex flex-row gap-x-5 flex-wrap gap-y-2 lg:gap-y-0">
          {types.map((type, index) =>
            selected === index ? (
              <div key={index} onClick={() => setSelected(index)}>
                <CtaButton>{type}</CtaButton>
              </div>
            ) : (
              <div onClick={() => setSelected(index)}>
                <OutlineButton>{type}</OutlineButton>
              </div>
            ),
          )}
        </div>
      </div>
      {filteredProducts.length > 0 ? (
        <ProductCarousel
          products={filteredProducts}
          variant={CARD_VARIANTS.REGULAR}
          slidesPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
        />
      ) : (
        <p className="text-text/80 text-lg">No products found</p>
      )}
    </>
  );
}

export default ProductFilter