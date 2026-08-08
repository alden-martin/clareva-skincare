import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

const addToCart = async (id, quantity = 1, size = null, refreshCart = null) => {
  try {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(
      localStorage.getItem("clarevaCart") || "[]",
    );

    // Check if product already in cart with same size
    const existingProductIndex = existingCart.findIndex(
      (product) => product.id === id && product.size === size,
    );

    let updatedCart;
    if (existingProductIndex !== -1) {
      // Product exists with same size, increment amount by quantity
      updatedCart = [...existingCart];
      updatedCart[existingProductIndex] = {
        ...updatedCart[existingProductIndex],
        amount: updatedCart[existingProductIndex].amount + quantity,
      };
    } else {
      // Product doesn't exist or has different size, add new entry
      updatedCart = [...existingCart, { id, size, amount: quantity }];
    }

    // Save to localStorage
    localStorage.setItem("clarevaCart", JSON.stringify(updatedCart));

    // Refresh cart in context if refreshCart function is provided
    if (refreshCart) {
      refreshCart();
    }

    toast.success("Added to cart");
  } catch (error) {
    console.error("Cart error:", error);
    toast.error(error.message);
  }
};

const getProduct = async (id) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }
  return data;
};


export { addToCart, getProduct };
