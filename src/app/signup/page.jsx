"use client";

import React, { useState } from "react";

function page() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-hero-background text-text flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-y-5  p-10 rounded-2xl bg-background">
        <h1 className="font-heading text-3xl font-bold text-primary italic">
          Sign Up
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
        <button className="bg-linear-to-r from-primary/80 to-primary py-4 px-8 rounded-2xl text-white text-sm font-body shadow-xl  hover:bg-secondary-foreground hover:scale-105 transition-all delay-50 uppercase">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default page;
