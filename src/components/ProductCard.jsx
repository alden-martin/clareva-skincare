"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addToCart } from "@/utils/shop";
import { useCart } from "@/contexts/CartContext";

function ProductCard({ name, size, price, pros, id, image }) {
  const router = useRouter();
  const { refreshCart } = useCart();
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <div
      className="w-full "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Image
          src={image}
          alt={name}
          width={500}
          height={500}
          className="w-full h-auto rounded-2xl object-cover"
        />
        {isHovered && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 transition-all w-full  justify-center">
            <button
              className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-primary hover:text-primary-foreground"
              onClick={() => router.push(`/product/${id}`)}
            >
              View Product
            </button>
            <button
              className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-primary hover:text-primary-foreground"
              onClick={() => addToCart(id, 1, size, refreshCart)}
            >
              <span className="mr-2">+</span>
              Add To Cart
            </button>
          </div>
        )}
      </div>

      <div className="py-5 flex flex-col gap-y-1">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <p className="text-[12px] font-body text-text/50">{pros}</p>
        <p className="text-primary text-sm font-bold">PKR {price}</p>
      </div>
    </div>
  );
}

export default ProductCard;
