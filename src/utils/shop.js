import toast from "react-hot-toast";
import { supabase } from "@/lib/supabaseClient";

const addToCart = async (
  id,
  user,
  quantity = 1,
  size = null,
  refreshCart = null,
) => {
  if (!user) {
    throw new Error("User not found");
  }

  try {
    // Check if cart already exists for this user
    const { data: existingCart, error: fetchError } = await supabase
      .from("cart")
      .select("*")
      .eq("userId", user.id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      throw fetchError;
    }

    if (existingCart) {
      // Cart exists, check if product already in cart with same size
      const products = existingCart.products || [];
      const existingProductIndex = products.findIndex(
        (product) => product.id === id && product.size === size,
      );

      let updatedProducts;
      if (existingProductIndex !== -1) {
        // Product exists with same size, increment amount by quantity
        updatedProducts = [...products];
        updatedProducts[existingProductIndex] = {
          ...updatedProducts[existingProductIndex],
          amount: updatedProducts[existingProductIndex].amount + quantity,
        };
      } else {
        // Product doesn't exist or has different size, add new entry
        updatedProducts = [...products, { id, size, amount: quantity }];
      }

      const { error: updateError } = await supabase
        .from("cart")
        .update({ products: updatedProducts })
        .eq("cartId", existingCart.cartId);

      if (updateError) throw updateError;
    } else {
      // No cart exists, create new one with quantity and size
      const { error: insertError } = await supabase.from("cart").insert({
        userId: user.id,
        products: [{ id, size, amount: quantity }],
      });

      if (insertError) throw insertError;
    }

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
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
    if (error) {
        throw error;
    }
    return data;
};

export { addToCart, getProduct };
