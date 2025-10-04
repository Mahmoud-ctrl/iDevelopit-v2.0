'use client';

import React, { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import LiquidEther from './ui/LiquidEther';
import Navbar from './Navbar';


const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <Navbar />
      
      <section 
        id="home"
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
        style={{ 
          position: 'relative',
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      >
        <div 
          className="absolute inset-0 pointer-events-auto"
          style={{
            willChange: 'auto',
            contain: 'layout style paint', 
          }}
        >
          <LiquidEther
            colors={['#5227FF', '#ffffff', '#888888']}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.7} 
            autoIntensity={2.8} 
            takeoverDuration={0.5} 
            autoResumeDelay={100}
            autoRampDuration={0.8}
          />
        </div>

        <motion.div 
          style={{ 
            y, 
            opacity,
            willChange: 'transform, opacity',
          }}
          className="relative z-20 text-center text-white px-6 max-w-4xl mx-auto pointer-events-auto"
        >
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-sm tracking-wider text-gray-400 uppercase">
              Our Work • 2025
            </span>
          </motion.div>

          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-light mb-8 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{
              textRendering: 'optimizeSpeed'
            }}
          >
            iDevelopit
          </motion.h1>
          
          <motion.div
            className="w-24 h-px bg-white mx-auto mb-8"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 1 }}
          />
          
          <motion.p 
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            A digital agency specializing in web & software solutions — building brands, platforms, and systems that scale with purpose.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
          <motion.button
            className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-wider uppercase cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ willChange: 'transform' }}
            onClick={() => {
              document.querySelector('#contact')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          >
            Hire Us
          </motion.button>
            
            <motion.button 
              className="px-8 py-3 text-gray-400 hover:text-white transition-all duration-300 text-sm tracking-wider uppercase cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ willChange: 'transform' }}
            >
              Start a Project
            </motion.button>
          </motion.div>

          {/* Specialties */}
          <motion.div 
            className="mt-16 flex flex-wrap justify-center gap-8 text-xs tracking-widest text-gray-500 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <span>Web Development</span>
            <span>•</span>
            <span>Custom Systems</span>
            <span>•</span>
            <span>UI/UX Design</span>
            <span>•</span>
            <span>Brand Strategy</span>
          </motion.div>
        </motion.div>

        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none"
          style={{ 
            opacity,
            willChange: 'opacity' 
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-16 bg-gradient-to-b from-transparent via-white to-transparent"
            style={{ willChange: 'transform' }}
          />
        </motion.div>
      </section>
    </>
  );
};

export default Hero;