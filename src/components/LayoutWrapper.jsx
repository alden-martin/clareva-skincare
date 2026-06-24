"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

const hideLayoutPaths = ["/login", "/signup"];

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const hideLayout = hideLayoutPaths.includes(pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
