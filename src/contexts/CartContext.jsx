// context/CartContext.jsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getProduct } from "@/utils/shop";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      // Get cart from localStorage
      const cartData = JSON.parse(localStorage.getItem("clarevaCart") || "[]");
      setCartItems(cartData);

      // Fetch product details for each cart item
      const productPromises = cartData.map(async (item) => {
        try {
          const product = await getProduct(item.id);
          return { ...product, amount: item.amount, size: item.size };
        } catch (error) {
          console.error("Error fetching product:", error);
          return null;
        }
      });

      const products = await Promise.all(productPromises);
      setCartProducts(products.filter((p) => p !== null));
    } catch (error) {
      console.error("Cart fetch error:", error);
      setCartItems([]);
      setCartProducts([]);
    }
  };

  const refreshCart = () => {
    fetchCart();
  };

  const value = {
    cartItems,
    cartProducts,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook for easy consumption
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
