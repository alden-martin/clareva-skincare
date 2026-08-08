// context/ProductContext.jsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("products").select("*");
      
      if (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } else {
        setProducts(data);
      }
    } catch (error) {
      console.error("Product fetch error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    products,
    loading,
    fetchProducts,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

// Custom hook for easy consumption
export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
