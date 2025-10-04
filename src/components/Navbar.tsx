'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Sling as Hamburger } from 'hamburger-react'
import Shuffle from './Shuffle';


const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  
  const hasBackground = scrollY > 50;

  const navItems = useMemo(() => [
    { label: 'Home', ariaLabel: 'Go to Home section', link: '#home' },
    { label: 'Services', ariaLabel: 'Go to Services section', link: '#services' },
    { label: 'Projects', ariaLabel: 'Go to Projects section', link: '#projects' },
    { label: 'Contact', ariaLabel: 'Go to Contact section', link: '#contact' },
  ], []);

  const socialItems = useMemo(() => [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
  ], []);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);

    if (currentScrollY < lastScrollY || currentScrollY < 100) {
      setIsVisible(true);
    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
      setIsMobileMenuOpen(false);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    return () => window.removeEventListener('scroll', scrollListener);
  }, [handleScroll]);

  // Smooth scroll function
  const smoothScrollTo = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  // Handle navigation clicks
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, link: string) => {
    e.preventDefault();
    const sectionId = link.replace('#', '');
    smoothScrollTo(sectionId);
    setIsMobileMenuOpen(false);
  }, [smoothScrollTo]);

  // Track active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const sectionId = item.link.replace('#', '');
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [navItems]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Optimized animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1] as const,
        when: "afterChildren" as const,
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1] as const,
        when: "beforeChildren" as const,
        staggerChildren: 0.08,
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 50 },
    open: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const }
    }
  };

  const backgroundVariants = {
    closed: {
      clipPath: "circle(0% at calc(100% - 40px) 40px)",
      transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const }
    },
    open: {
      clipPath: "circle(150% at calc(100% - 40px) 40px)",
      transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const }
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out ${
          hasBackground ? 'py-4' : 'py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ 
          y: isVisible ? 0 : -100,
          transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
        }}
      >
        {/* Navbar Background */}
        <AnimatePresence>
          {hasBackground && !isMobileMenuOpen && (
            <motion.div
              className="absolute inset-0 backdrop-blur-md"
              style={{
                background: "rgba(0, 0, 0, 0.8)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>

        <div className="relative max-w-7xl mx-auto px-6 flex items-center justify-between h-12">
          {/* Logo - Hide on mobile when menu is open */}
          <motion.div
            className={`text-white font-light text-xl tracking-wider transition-opacity duration-200 ${
              isMobileMenuOpen ? 'md:opacity-100 opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <a 
              href="#home" 
              className="block"
              onClick={(e) => handleNavClick(e, '#home')}
            >
              <Image 
                src="https://lebwork.b-cdn.net/stuff/mahmoud.png" 
                alt="iDevelopit Logo" 
                width={40}
                height={40}
                className="w-10 h-10 md:w-12 md:h-12" 
                priority
              />
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const sectionId = item.link.replace('#', '');
              const isActive = activeSection === sectionId;
              
              return (
                <motion.a
                  key={item.label}
                  href={item.link}
                  aria-label={item.ariaLabel}
                  onClick={(e) => handleNavClick(e, item.link)}
                  className={`text-sm tracking-wider transition-colors duration-300 uppercase relative group ${
                    isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-white transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </motion.a>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <button
            className="hidden md:block px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-xs tracking-wider uppercase"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Let&apos;s Talk
          </button>

          {/* Mobile Menu Button - Hide when menu is open */}
          <div className={`md:hidden transition-opacity duration-200 ${
            isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}>
            <Hamburger 
              toggled={isMobileMenuOpen} 
              toggle={setIsMobileMenuOpen}
              color="#ffffff"
              size={20}
            />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-50"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {/* Background */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
              }}
              variants={backgroundVariants}
            />

            {/* Grid Pattern */}
            <motion.div 
              className="absolute inset-0 opacity-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                }}
              />
            </motion.div>

            {/* Mobile Navbar Controls */}
            <div className="absolute top-0 left-0 right-0 px-6 py-6 z-10">
              <div className="flex items-center justify-between">
                <motion.div
                  className="text-black font-light text-xl tracking-wider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <a 
                    href="#home" 
                    className="block"
                    onClick={(e) => handleNavClick(e, '#home')}
                  >
                    <Image 
                      src="https://lebwork.b-cdn.net/stuff/mahmoud.png" 
                      alt="iDevelopit Logo" 
                      width={40}
                      height={40}
                      className="w-10 h-10" 
                    />
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Hamburger 
                    toggled={isMobileMenuOpen} 
                    toggle={setIsMobileMenuOpen}
                    color="#000000"
                    size={20}
                  />
                </motion.div>
              </div>
            </div>

            {/* Menu Content */}
            <div className="relative h-full flex flex-col px-8 pt-24 pb-8">
              {/* Navigation Items */}
              <div className="space-y-6 mb-16">
                {navItems.map((item, index) => {
                  const sectionId = item.link.replace('#', '');
                  const isActive = activeSection === sectionId;

                  return (
                    <motion.div
                      key={item.label}
                      variants={itemVariants}
                      className="relative"
                    >
                      <div className="flex items-center justify-between">
                        <motion.a
                          href={item.link}
                          onClick={(e) => handleNavClick(e, item.link)}
                          className="text-5xl font-bold tracking-tight text-black hover:text-gray-700 transition-colors"
                          whileHover={{ x: 8 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Shuffle
                            text={item.label.toUpperCase()}
                            shuffleDirection="right"
                            duration={0.9}
                            animationMode="evenodd"
                            shuffleTimes={1}
                            ease="power3.out"
                            stagger={0.03}
                            threshold={0.1}
                            triggerOnce={true}
                            triggerOnHover={true}
                            respectReducedMotion={true}
                          />
                        </motion.a>
                        <span className="text-sm text-gray-400">
                          0{index + 1}
                        </span>
                      </div>
                      {isActive && (
                        <motion.div
                          className="h-0.5 bg-black mt-2 w-1/2"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Section */}
              <div className="mt-auto">
                <motion.div 
                  variants={itemVariants}
                  className="flex space-x-8 mb-6"
                >
                  {socialItems.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 hover:text-black transition-colors tracking-wider"
                      whileHover={{ y: -2 }}
                    >
                      {social.label}
                    </motion.a>
                  ))}
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  className="text-xs text-gray-400 tracking-widest uppercase"
                >
                  Digital Agency • Web Solutions
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;