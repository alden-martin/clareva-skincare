"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

function ProductCard({ name, price, pros, id , image }) {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div
      className="w-full "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${id}`}>
      <div className="relative">
        <Image
          src={image}
          alt={name}
          width={500}
          height={500}
          className="w-full h-auto rounded-2xl object-cover"
        />
        {isHovered && (
          <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg absolute bottom-5 left-1/2 -translate-x-1/2 transition-all hover:bg-primary hover:text-primary-foreground">
            <span className="mr-2">+</span>
            Quick Add
          </button>
        )}
      </div>

      <div className="py-5 flex flex-col gap-y-1">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <p className="text-[12px] font-body text-text/50">{pros}</p>
        <p className="text-primary text-sm font-bold">PKR {price}</p>
      </div>
      </Link>
    </div>
  );
}

export default ProductCard;
