import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EmailToolHub | Online Email Marketing Tool for Free! | Email Extractor, Free Email Validator, Free Email Deliverability Check, HTML Editor, Email Splitter",
  description:
    "EmailToolHub offers free and powerful tools for email marketing, including email extraction, validation, inbox delivery checks, HTML editing, and more to boost your campaigns effortlessly.",
};

// Search Context Provider
import { SearchContextProvider } from "./context/Search";
// import Header from "./components/Header";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import dynamic from 'next/dynamic';

export default function RootLayout({ children }) {

  const ComponentWithNoSSR = dynamic(() => import('./components/Header'), { ssr: false });

  return (
    <SearchContextProvider>
      <html lang="en">
        <body className={inter.className}>
          <CustomCursor />
          <ComponentWithNoSSR />
          {children}
          <Footer />
        </body>
      </html>
    </SearchContextProvider>
  );
}
