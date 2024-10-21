import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EmailTooHub",
  description: "Best site for email marketing",
};

// Search Context Provider
import { SearchContextProvider } from "./context/Search";
// import Header from "./components/Header";
import Footer from "./components/Footer";
import dynamic from 'next/dynamic';

export default function RootLayout({ children }) {

  const ComponentWithNoSSR = dynamic(() => import('./components/Header'), { ssr: false });

  return (
    <SearchContextProvider>
      <html lang="en">
        <body className={inter.className}>
          <ComponentWithNoSSR />
          {children}
          <Footer />
        </body>
      </html>
    </SearchContextProvider>
  );
}
