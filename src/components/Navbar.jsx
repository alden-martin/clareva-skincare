"use client";
import { Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const pages = [
    {
      name: "Shop",
      href: "/shop",
    },
    {
      name: "Skin Concerns",
      href: "/skin-concerns",
    },
    {
      name: "Ingredients",
      href: "/ingredients",
    },
    {
      name: "Routine",
      href: "/routine",
    },
    {
      name: "Our Story",
      href: "/story",
    },
  ];

  return (
    <div
      className={`flex justify-between items-center p-6 fixed w-full ${scrolled ? "bg-background/90  " : "bg-hero-background"} z-50`}
    >
      {/* Logo */}
      <div className="flex gap-x-14 items-center">
        <h1 className="serif text-4xl tracking-tight text-foreground font-bold">
          Clareva
        </h1>
        {/* Navigation */}
        <ul className="flex gap-x-14 ">
          {pages.map((page, idx) => (
            <li key={idx}>
              <Link
                className="text-text/65 hover:text-text transition-colors text-[14px] font-body uppercase"
                href={page.href}
              >
                {page.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-x-10 mr-5">
        <Search
          className="text-text/65 hover:text-text transition-colors"
          size={20}
        />
        <User
          className="text-text/65 hover:text-text transition-colors"
          size={20}
        />
        <ShoppingCart
          className="text-text/65 hover:text-text transition-colors"
          size={20}
        />
      </div>
    </div>
  );
}

export default Navbar;
