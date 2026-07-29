"use client";

import { supabase } from "@/lib/supabaseClient";
import { signUp } from "@/utils/auth";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

function page() {
  const { user } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
  });
  const [callback, setCallback] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingUserData, setPendingUserData] = useState(null);
  const router = useRouter()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    console.log(user);
    // Insert user data when user becomes available after signup
    if (user && pendingUserData) {
      const insertUserData = async () => {
        console.log(
          "User authenticated, inserting pending data:",
          pendingUserData,
        );

        const { error: insertError } = await supabase.from("user").insert({
          Email: pendingUserData.email,
          Name: pendingUserData.name,
          Phone: pendingUserData.phone,
        });

        if (insertError) {
          console.error("Insert error:", insertError);
          setCallback(insertError.message);
          setTimeout(() => setCallback(""), 3000);
        } else {
          console.log("Insert successful");
          toast.success("Account created successfully!");
          router.back()
        }

        setPendingUserData(null); // Clear pending data after insertion
      };

      insertUserData();
    }
  }, [user]);
  const Register = async (e) => {
    e.preventDefault();
    setLoading(true); // make sure you have const [loading, setLoading] = useState(false)

    // 1. Check if any field is empty
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setCallback("Fill all the required fields");
      setTimeout(() => setCallback(""), 3000);
      setLoading(false);
      return;
    }

    // 2. Check password length
    if (formData.password.length < 6) {
      setCallback("Password must be at least 6 characters long");
      setTimeout(() => setCallback(""), 3000);
      setLoading(false);
      return;
    }

    // 3. Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setCallback("Passwords do not match");
      setTimeout(() => setCallback(""), 3000);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await signUp(formData.email, formData.password);

      if (error) throw error;

      // Store user data for insertion when user becomes available in context
      setPendingUserData({
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
      });

      toast.success("Account created successfully!");
      console.log("Signing up with:", formData.email);
    } catch (error) {
      setCallback(error.message);
      setTimeout(() => setCallback(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-hero-background text-text flex items-center justify-center h-screen">
      <form
        className="flex flex-col items-center gap-y-5 p-10 rounded-2xl bg-background  w-96" // fixed height & width
        onSubmit={Register}
      >
        <h1 className="font-heading text-3xl font-bold text-primary italic">
          Sign Up
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="border border-secondary-foreground py-2 px-10 rounded-2xl pl-5 w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border border-secondary-foreground py-2 px-10 rounded-2xl pl-5 w-full"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border border-secondary-foreground py-2 px-10 rounded-2xl pl-5 w-full"
        />

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-secondary-foreground p-2 rounded-2xl pl-5 w-full pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-foreground/50 hover:text-secondary-foreground"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <div className="relative w-full">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border border-secondary-foreground p-2 rounded-2xl pl-5 w-full pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-foreground/50 hover:text-secondary-foreground"
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Always render the container with a fixed height */}
        <div className="text-center text-sm text-text gap-x-1  flex items-center justify-center">
          Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
        </div>
        <div className="text-center text-sm text-red-500  flex items-center justify-center">
          {callback}
        </div>

        <button className="bg-linear-to-r from-primary/80 to-primary py-4 px-8 rounded-2xl text-white text-sm font-body shadow-xl hover:bg-secondary-foreground hover:scale-105 transition-all delay-50 uppercase w-full">
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default page;
