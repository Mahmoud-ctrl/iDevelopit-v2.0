'use client';

import { useState } from "react";
import Hero from "../../components/Hero";
import Projects from "../../components/Projects";
import Navbar from "../../components/Navbar";
import StatsSection from "../../components/Stats";
import ServicesSection from "../../components/Services";
import HorizontalScroll from "../../components/ScrollTransition";
import ContactForm from "../../components/Contact";
import Footer from "../../components/Footer";

export default function Home() {
  const [heroScrollProgress, setHeroScrollProgress] = useState(0);
  
  return (
    <>
      <Navbar scrollProgress={heroScrollProgress} />
      <Hero onScrollProgress={setHeroScrollProgress}/>
      <ServicesSection />
      <Projects heroScrollProgress={heroScrollProgress}/>
      <HorizontalScroll />
      <StatsSection />
      <ContactForm />
      <Footer />
    </>
  );
}