"use client";

import React, { useState } from "react";
import { signIn } from "@/utils/auth";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import Link from "next/link";

function page() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState("");
  const router = useRouter();
  const { user } = useUser();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCallback("");

    try {
      const { data, error } = await signIn(formData.email, formData.password);

      if (error) throw error;

      toast.success("Login successful!");
      router.push("/");
    } catch (error) {
      setCallback(error.message);
      toast.error(error.message);
      setTimeout(() => setCallback(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-hero-background text-text flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-y-5 p-10 rounded-2xl bg-background">
        <h1 className="font-heading text-3xl font-bold text-primary italic">
          Login
        </h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border border-secondary-foreground py-2 px-10 rounded-2xl pl-5"
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
        <div className="text-center text-sm text-text gap-x-1 flex items-center justify-center">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-linear-to-r from-primary/80 to-primary py-4 px-8 rounded-2xl text-white text-sm font-body shadow-xl hover:bg-secondary-foreground hover:scale-105 transition-all delay-50 uppercase w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <div className="text-center text-sm text-red-500 flex items-center justify-center">
          {callback}
        </div>
      </div>
    </div>
  );
}

export default page;
