"use client"
import React, { useState } from 'react'
import Heading from './Heading'
import CtaButton from './CtaButton'
import Image from 'next/image'
import OutlineButton from './OutlineButton'
import Link from 'next/link'

function ProductFilter({ products }) {
    const types = ["All", "Serum", "Facewash", "Gels"];
    const [selected, setSelected] = useState(0);

    const filteredProducts =
      selected === 0
        ? products
        : products.filter(
            (product) =>
              product.name &&
              product.name
                .toLowerCase()
                .includes(types[selected].toLowerCase()),
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
          <div className="flex flex-row gap-x-5">
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
        <div className="flex  items-stretch  flex-col  lg:gap-y-0 lg:flex-row   justify-center gap-x-5 gap-y-5 mx-20">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div
                key={index}
                className="bg-primary-foreground p-5 rounded-2xl flex flex-col gap-y-5 justify-between"
              >
                <div className="relative self-center h-100 w-100 ">
                  <Image
                    src={product.image}
                    fill
                    alt={product.name}
                    className="rounded-2xl object-cover"
                  />
                </div>
                {/* Lowwer */}
                <h1 className="text-3xl font-heading">{product.name}</h1>
                <p className="text-text/80 text-base">{product.tagline}</p>
                <div className="flex flex-row justify-between items-end">
                  <div className="flex flex-col">
                    <span className="font-heading text-3xl">
                      PKR {!product.disscount_price ? product.price : product.disscount_price}
                    </span>
                  </div>
                </div>
                <CtaButton>
                <Link
                href={`/product/${product?.id}`}
                >
                    Shop Product
                </Link>
                    </CtaButton>
              </div>
            ))
          ) : (
            <p className="text-text/80 text-lg">No products found</p>
          )}
        </div>
      </>
    );
}

export default ProductFilter