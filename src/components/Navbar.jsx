"use client";
import {
  Cross,
  Search,
  ShoppingCart,
  User,
  X,
  Menu,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/contexts/ProductContext";
import Image from "next/image";
import toast from "react-hot-toast";
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();
  const { cartItems, cartProducts, refreshCart } = useCart();
  const { products } = useProducts();
  const router = useRouter();

  // Refresh cart when cart is opened
  useEffect(() => {
    if (cartOpen) {
      refreshCart();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);
  // Configuration for navbar styles per page
  const navbarStyles = {
    "/": {
      default:
        "bg-linear-to-r from-hero-background/50 lg:from-hero-background to-transparent to-30%",
      scrolled: "bg-background",
      iconStyle: "text-white hover:text-white",
      scrollIcon: "text-text/65 hover:text-text",
    },
    // Use startsWith for dynamic routes like /product/1, /product/2, etc.
    "/product": {
      match: "startsWith",
      default: "bg-secondary/90",
      scrolled: "bg-background",
      iconStyle: "text-white hover:text-white",
      scrollIcon: "text-text/65 hover:text-text",
    },
    "/story": {
      default: "bg-secondary",
      scrolled: "bg-background",
      iconStyle: "text-white hover:text-white",
      scrollIcon: "text-text/65 hover:text-text",
    },
    "/contact": {
      default: "bg-linear-to-r from-hero-background to-transparent to-30%",
      scrolled: "bg-background",
      iconStyle: "text-white hover:text-white",
      scrollIcon: "text-text/65 hover:text-text",
    },
    "/shop": {
      default: "bg-linear-to-r from-hero-background to-transparent to-30%",
      scrolled: "bg-background",
      iconStyle: "text-white hover:text-white",
      scrollIcon: "text-text/65 hover:text-text",
    },
    "/user": {
      default: "bg-background",
      scrolled: "bg-background",
      iconStyle: "text-text/65 hover:text-text",
      scrollIcon: "text-text/65 hover:text-text",
    },
    "/checkout": {
      default: "bg-card",
      scrolled: "bg-background",
      iconStyle: "text-text/65 hover:text-text",
      scrollIcon: "text-text/65 hover:text-text",
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
    iconStyle: "text-white hover:text-white",
    scrollIcon: "text-text/65 hover:text-text",
  };
  const getTotalCartCount = () => {
    return cartItems.length;
    // return cartItems.reduce((total, item) => total + (item.amount || 0), 0);
  };

  const getSubtotal = () => {
    return cartProducts.reduce((total, product) => {
      const priceString = product.price || "0";
      // Extract numeric value from price string (e.g., "PKR 1000" -> 1000)
      const priceMatch = priceString.match(/[\d,]+\.?\d*/);
      const price = priceMatch
        ? parseFloat(priceMatch[0].replace(/,/g, ""))
        : 0;
      return total + price * (product.amount || 0);
    }, 0);
  };

  const deleteCartItem = async (productId, size = null) => {
    try {
      // Filter out the item to be deleted (considering both id and size)
      const updatedCartItems = cartItems.filter(
        (item) => !(item.id === productId && item.size === size),
      );

      // Update the cart in localStorage
      localStorage.setItem("clarevaCart", JSON.stringify(updatedCartItems));

      // Refresh cart from context
      refreshCart();

      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error deleting cart item:", error);
      toast.error("Error removing item from cart");
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      setIsSearching(true);
      setTimeout(() => {
        const results =
          products?.filter((product) =>
            product.name?.toLowerCase().includes(query.toLowerCase()),
          ) || [];
        setSearchResults(results);
        setIsSearching(false);
      }, 300);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
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
      name: "Home",
      href: "/",
    },
    {
      name: "Shop",
      href: "/shop",
    },
    // {
    //   name: "Skin Concerns",
    //   href: "/skin-concerns",
    // },
    // {
    //   name: "Ingredients",
    //   href: "/ingredients",
    // },
    // {
    //   name: "Routine",
    //   href: "/routine",
    // },
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
    <>
      <nav
        className={`flex justify-between items-center p-6 w-full z-50 ${
          scrolled ? currentStyle.scrolled : currentStyle.default
        }`}
        style={{ position: "fixed", top: 0, left: 0, right: 0 }}
      >
        {/* Logo */}
        <div className="flex gap-x-14 items-center">
          <Link href={"/"}>
            <h1 className="serif text-4xl tracking-tight text-foreground font-bold">
              Claréva
            </h1>
          </Link>
          {/* Desktop Navigation */}
          <ul className="hidden lg:flex gap-x-14">
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
        <div className="flex gap-x-10 mr-5 items-center">
          <button
            onClick={() => setSearchOpen(true)}
            className="cursor-pointer"
          >
            <Search
              className={`${scrolled ? currentStyle.scrollIcon : currentStyle.iconStyle} transition-colors`}
              size={20}
            />
          </button>
          {/* <Link href={user ? "/user" : "/signup"}>
          <User
            className={`${scrolled ? currentStyle.scrollIcon : currentStyle.iconStyle} transition-colors`}
            size={20}
          />
        </Link> */}
          <button
            onClick={() => {
              // if (!user) {
              //   router.push("/login");
              // }
              setCartOpen(true);
              console.log(cartProducts);
            }}
            className="relative cursor-pointer"
          >
            <ShoppingCart
              className={`${scrolled ? currentStyle.scrollIcon : currentStyle.iconStyle} transition-colors`}
              size={20}
            />
            {getTotalCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalCartCount()}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden"
          >
            <Menu
              className={`${scrolled ? "text-text/65 hover:text-text" : "text-white hover:text-white"} transition-colors`}
              size={20}
            />
          </button>
        </div>
      </nav>
      {/* Cart */}
      {cartOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed inset-0 bg-black/50 z-[9999]"
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
              {cartProducts.length === 0 ? (
                <p className="text-text/65 text-center py-10">
                  Your cart is empty
                </p>
              ) : (
                <div className="flex flex-col gap-4">
                  {cartProducts.map((product, index) => (
                    <div
                      key={`${product.id}-${product.size || "default"}-${index}`}
                      className="flex gap-4 p-4 bg-secondary/50 hover:bg-secondary/70 rounded-lg"
                    >
                      <div className="w-20 h-20 bg-background rounded-lg flex items-center justify-center">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <span className="text-text/65 text-xs">No image</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {product.name || "Product"}
                        </h3>
                        <p className="text-sm text-text/65">
                          {product.price || "Price not available"}
                        </p>
                        <p className="text-sm font-medium">
                          Qty: {product.amount || 0}
                        </p>
                        {product.size && typeof product.size === "string" && (
                          <p className="text-xs text-text/50 mt-1">
                            Size: {product.size}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => deleteCartItem(product.id, product.size)}
                        className="p-2 hover:bg-destructive/10 text-text/65 hover:text-destructive rounded-lg transition-colors"
                        title="Remove from cart"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            <div className="p-6 border-t border-border">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold">
                  Rs. {getSubtotal().toLocaleString()}
                </span>
              </div>
              <button
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                onClick={() => {
                  router.push("/checkout");
                  setCartOpen(false);
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 h-screen"
        >
          <div className="absolute top-0 left-0 right-0 bg-background shadow-xl flex flex-col max-h-screen">
            {/* Search Header */}
            <div className="flex items-center gap-4 p-6 border-b border-border">
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                  setSearchResults([]);
                }}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-lg"
                autoFocus
              />
            </div>

            {/* Search Results */}
            <div className="flex-1 overflow-y-auto p-6">
              {isSearching ? (
                <div className="flex items-center justify-center py-10">
                  <p className="text-text/65">Searching...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="flex flex-col gap-4">
                  <p className="text-text/65 text-sm">
                    {searchResults.length} result
                    {searchResults.length !== 1 ? "s" : ""} found
                  </p>
                  <div className="flex gap-4 overflow-x-auto pb-4">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.id}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                          setSearchResults([]);
                        }}
                        className="shrink-0 w-48 bg-secondary/50 hover:bg-secondary/70 rounded-lg p-4 transition-colors"
                      >
                        <div className="relative h-32 w-full mb-3">
                          <Image
                            src={product.image}
                            fill
                            alt={product.name}
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-sm font-medium">
                          PKR {product.discounted_price || product.price}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : searchQuery.length > 0 ? (
                <div className="flex items-center justify-center py-10">
                  <p className="text-text/65">No products found</p>
                </div>
              ) : (
                <div className="flex items-center justify-center py-10">
                  <p className="text-text/65">Start typing to search...</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="fixed inset-0 bg-black/50 z-50"
        >
          <div className="absolute left-0 top-0 h-full w-full max-w-md bg-background shadow-xl flex flex-col">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h1 className="text-2xl font-heading font-bold">Menu</h1>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto p-6">
              <ul className="flex flex-col gap-y-6">
                {pages.map((page, idx) => (
                  <li key={idx}>
                    <Link
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-text/65 hover:text-text transition-colors text-[18px] font-body uppercase"
                      href={page.href}
                    >
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default Navbar;
