"use client"

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Search Context Provider
import { SearchContextProvider } from "./context/Search";
// import Header from "./components/Header";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import dynamic from 'next/dynamic';
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const ComponentWithNoSSR = dynamic(() => import('./components/Header'), { ssr: false });

  const noHeaderFooter = pathname.includes("login") || pathname.includes("signup");

  return (
    <SearchContextProvider>
      <html lang="en">
        <body className={inter.className}>
          <CustomCursor />
          {!noHeaderFooter && <ComponentWithNoSSR />}
          {children}
          {!noHeaderFooter && <Footer />}
        </body>
      </html>
    </SearchContextProvider>
  );
}
