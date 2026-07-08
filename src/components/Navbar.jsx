"use client";
import { Cross, Search, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();

  // Configuration for navbar styles per page
  const navbarStyles = {
    "/": {
      default: "bg-linear-to-r from-hero-background to-transparent to-30%",
      scrolled: "bg-background/90",
    },
    // Use startsWith for dynamic routes like /product/1, /product/2, etc.
    "/product": {
      match: "startsWith",
      default: "bg-background",
      scrolled: "bg-background/90",
    },
    "/story": {
      default: "bg-secondary",
      scrolled: "bg-background/90",
    },
    "/contact": {
      default: "bg-linear-to-r from-hero-background to-transparent to-30%",
      scrolled: "bg-background/90",
    },
    "/story": {
      default: "bg-linear-to-r from-hero-background to-transparent to-30%",
      scrolled: "bg-background/90",
    },
    // Add more pathnames as needed
  };

  // Get style for current pathname, supports exact match and startsWith for dynamic routes
  const currentStyle = Object.entries(navbarStyles).find(([key, value]) => {
    if (value.match === "startsWith") {
      return pathname.startsWith(key);
    }
    return pathname === key;
  })?.[1] || {
    default: "bg-hero-background",
    scrolled: "bg-background/90",
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    console.log(pathname);

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
    {
      name: "Contact Us",
      href: "/contact",
    },
  ];

  return (
    <div
      className={`flex justify-between items-center p-6 fixed w-full z-50 ${
        scrolled ? currentStyle.scrolled : currentStyle.default
      }`}
    >
      {/* Logo */}
      <div className="flex gap-x-14 items-center">
        <Link href={"/"}>
          <h1 className="serif text-4xl tracking-tight text-foreground font-bold">
            Clareva
          </h1>
        </Link>
        {/* Navigation */}
        <ul className="flex gap-x-14 ">
          {pages.map((page, idx) => (
            <li key={idx}>
              <Link
                className={
                  "text-text/65 hover:text-text transition-colors text-[14px] font-body uppercase"
                }
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
        <Link href={"/signup"}>
          <User
            className={`${scrolled ? "text-text/65 hover:text-text" : "text-white hover:text-white"} transition-colors`}
            size={20}
          />
        </Link>
        <button onClick={() => setCartOpen(true)}>
          <ShoppingCart
            className={`${scrolled ? "text-text/65 hover:text-text" : "text-white hover:text-white"} transition-colors`}
            size={20}
          />
        </button>
      </div>
      {/* Cart */}
      {cartOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed inset-0 bg-black/50 z-50"
        >
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-xl flex flex-col">
            {/* Cart Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h1 className="text-2xl font-heading font-bold">Cart</h1>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              <p className="text-text/65 text-center py-10">
                Your cart is empty
              </p>
            </div>

            {/* Cart Footer */}
            <div className="p-6 border-t border-border">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold">Rs. 0</span>
              </div>
              <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Checkout
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Navbar;
