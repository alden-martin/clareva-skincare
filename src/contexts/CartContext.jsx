"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";
import { supabase } from "@/lib/supabaseClient";
import { getProduct } from "@/utils/shop";
import toast from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    if (!user) {
      setCartItems([]);
      setCartProducts([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error: cartError } = await supabase
        .from("cart")
        .select("products")
        .eq("userId", user.id)
        .single();

      if (cartError) {
        if (cartError.code !== "PGRST116") {
          console.error("Cart fetch error:", cartError);
        }
        setCartItems([]);
        setCartProducts([]);
        setLoading(false);
        return;
      }

      if (data && data.products) {
        setCartItems(data.products);

        // Fetch product details for each cart item
        const productPromises = data.products.map(async (item) => {
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
      } else {
        setCartItems([]);
        setCartProducts([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartItems([]);
      setCartProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1, size = null) => {
    if (!user) {
      toast.error("Please sign in to add to cart");
      return;
    }

    try {
      const { data: existingCart, error: fetchError } = await supabase
        .from("cart")
        .select("*")
        .eq("userId", user.id)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        throw fetchError;
      }

      if (existingCart) {
        const products = existingCart.products || [];
        const existingProductIndex = products.findIndex(
          (product) => product.id === productId && product.size === size
        );

        let updatedProducts;
        if (existingProductIndex !== -1) {
          updatedProducts = [...products];
          updatedProducts[existingProductIndex] = {
            ...updatedProducts[existingProductIndex],
            amount: updatedProducts[existingProductIndex].amount + quantity,
          };
        } else {
          updatedProducts = [...products, { id: productId, amount: quantity, size }];
        }

        const { error: updateError } = await supabase
          .from("cart")
          .update({ products: updatedProducts })
          .eq("cartId", existingCart.cartId);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase.from("cart").insert({
          userId: user.id,
          products: [{ id: productId, amount: quantity, size }],
        });

        if (insertError) throw insertError;
      }

      toast.success("Added to cart");
      await fetchCart();
    } catch (error) {
      console.error("Cart error:", error);
      toast.error(error.message);
    }
  };

  const removeFromCart = async (productId, size = null) => {
    if (!user) {
      toast.error("Please sign in to remove items");
      return;
    }

    try {
      const { data: existingCart, error: fetchError } = await supabase
        .from("cart")
        .select("*")
        .eq("userId", user.id)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      if (existingCart) {
        const products = existingCart.products || [];
        const updatedProducts = products.filter(
          (item) => !(item.id === productId && item.size === size)
        );

        const { error: updateError } = await supabase
          .from("cart")
          .update({ products: updatedProducts })
          .eq("cartId", existingCart.cartId);

        if (updateError) throw updateError;

        toast.success("Item removed from cart");
        await fetchCart();
      }
    } catch (error) {
      console.error("Error removing cart item:", error);
      toast.error("Error removing item from cart");
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("cart")
        .update({ products: [] })
        .eq("userId", user.id);

      if (error) {
        console.error("Error clearing cart:", error);
        toast.error("Error clearing cart");
      } else {
        setCartItems([]);
        setCartProducts([]);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Error clearing cart");
    }
  };

  const getCartCount = () => {
    return cartItems.length;
  };

  const getSubtotal = () => {
    return cartProducts.reduce((total, product) => {
      const priceString = product.price || "0";
      const priceMatch = priceString.match(/[\d,]+\.?\d*/);
      const price = priceMatch
        ? parseFloat(priceMatch[0].replace(/,/g, ""))
        : 0;
      return total + price * (product.amount || 0);
    }, 0);
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const value = {
    cartItems,
    cartProducts,
    loading,
    addToCart,
    removeFromCart,
    clearCart,
    fetchCart,
    getCartCount,
    getSubtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
