// context/UserContext.jsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { signOut as signOutService } from "@/utils/auth";
import { getProduct } from "@/utils/shop";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes (sign‑in, sign‑out, token refresh)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      },
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Fetch cart when user changes
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems([]);
      setCartProducts([]);
    }
  }, [user]);

  const fetchCart = async () => {
    if (!user) {
      setCartItems([]);
      setCartProducts([]);
      return;
    }
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
  };

  const refreshCart = () => {
    fetchCart();
  };

  const signOut = async () => {
    await signOutService();
    // The onAuthStateChange will automatically update the context
  };

  const value = {
    user,
    session,
    loading,
    signOut,
    cartItems,
    cartProducts,
    refreshCart,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// Custom hook for easy consumption
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
