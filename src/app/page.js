
// Components
import Hero from "./components/Hero";
// import Services from "./components/Services";
// import About from "./components/About";
import Why from "./components/Why";
// import Testimonial from "./components/Testimonial";
import Cta from "./components/Cta";
import BackToTopBtn from "./components/BackToTopBtn";

export const metadata = {
  title: "EmailToolHub | Online Email Marketing Tool for Free! | Email Extractor, Free Email Validator, Free Email Deliverability Check, HTML Editor, Email Splitter",
  description:
    "EmailToolHub offers free and powerful tools for email marketing, including email extraction, validation, inbox delivery checks, HTML editing, and more to boost your campaigns effortlessly.",
};

export default function Home() {
  return (
    <main className="max-w-[1920px] bg-white mx-auto relative overflow-hidden">
      <Hero />
      {/* <Services /> */}
      {/* <About /> */}
      <Why />
      {/* <Testimonial /> */}
      <Cta />
      <BackToTopBtn />
    </main>
  );
}
