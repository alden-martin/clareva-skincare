import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import AosProvider from "@/providers/AosProvider";
import { UserProvider } from "@/contexts/UserContext";
import { CartProvider } from "@/contexts/CartContext";
import { ProductProvider } from "@/contexts/ProductContext";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title:
    "Clareva Skincare Pakistan | Premium Face Wash & Serums for Glowing Skin",
  description:
    "Shop Clareva Skincare for premium face wash, Vitamin C serum, Retinol serum, and skincare essentials in Pakistan. Discover science-backed formulas for healthy, glowing skin.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col w-screen overflow-x-hidden">
        <AosProvider />
        <UserProvider>
          <CartProvider>
            <ProductProvider>
              <LayoutWrapper>
                {children}
                <Toaster />
              </LayoutWrapper>
            </ProductProvider>
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
