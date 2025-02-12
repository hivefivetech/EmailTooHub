"use client"

import { Inter } from "next/font/google";
import Script from "next/script";
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
        <head>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-EWDYDJLEC2"></Script>
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-EWDYDJLEC2');
            `}
          </Script>
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0953680178451901"
            crossOrigin="anonymous"
          />
        </head>
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
