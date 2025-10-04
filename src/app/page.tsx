'use client';
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Navbar from "../components/Navbar";
import StatsSection from "../components/Stats";
import ServicesSection from "../components/Services";
import HorizontalScroll from "../components/ScrollTransition";
import ContactForm from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  
  return (
    <>
      <Navbar />
      <Hero />
      <ServicesSection />
      <Projects />
      <HorizontalScroll />
      <StatsSection />
      <ContactForm />
      <Footer />
    </>
  );
}