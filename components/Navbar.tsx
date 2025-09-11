'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StaggeredMenu from './ui/StaggeredMenu';

interface NavbarProps {
  scrollProgress?: number;
}

const Navbar: React.FC<NavbarProps> = ({ scrollProgress = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const isScrolled = scrollProgress > 0.1;

  const navItems = [
    { label: 'Home', ariaLabel: 'Go to Home section', link: '#home' },
    { label: 'Services', ariaLabel: 'Go to Services section', link: '#services' },
    { label: 'Projects', ariaLabel: 'Go to Projects section', link: '#projects' },
    { label: 'Contact', ariaLabel: 'Go to Contact section', link: '#contact' },
  ];

  const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
  ];

  // Smooth scroll function
  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const navbarHeight = 80; // Adjust based on your navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle navigation clicks
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    const sectionId = link.replace('#', '');
    smoothScrollTo(sectionId);
    setIsMobileMenuOpen(false);
  };

  // Track active section while scrolling
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

    // Observe all sections
    navItems.forEach((item) => {
      const sectionId = item.link.replace('#', '');
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [navItems]);

  useEffect(() => {
    const body = document.body;
    if (isMobileMenuOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }

    return () => {
      body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Add smooth scrolling CSS to the document
  useEffect(() => {
    // Add CSS custom properties for smooth scrolling
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      
      /* Custom scrollbar for webkit browsers */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
      }
      
      ::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.5);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled ? 'py-4' : 'py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Animated background */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              className="absolute inset-0 backdrop-blur-md"
              style={{
                background: 'rgba(0, 0, 0, 0.8)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        <div className="relative max-w-7xl mx-auto px-6 flex items-center justify-between h-12">
          {/* Logo */}
          <motion.div
            className="hidden md:block text-white font-light text-xl tracking-wider"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <a 
              href="#home" 
              className="block"
              onClick={(e) => handleNavClick(e, '#home')}
            >
              <img src="https://lebwork.b-cdn.net/stuff/mahmoud.png" alt="iDevelopit Logo" className="w-12 h-12" />
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => {
              const sectionId = item.link.replace('#', '');
              const isActive = activeSection === sectionId;
              
              return (
                <motion.a
                  key={item.label}
                  href={item.link}
                  aria-label={item.ariaLabel}
                  onClick={(e) => handleNavClick(e, item.link)}
                  className={`text-sm tracking-wider transition-colors duration-300 uppercase relative group ${
                    isActive 
                      ? 'text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  <motion.span
                    className={`absolute -bottom-1 left-0 h-px bg-white transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </motion.a>
              );
            })}
          </div>

          {/* CTA Button */}
          <motion.button
            className="hidden md:block px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-xs tracking-wider uppercase"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => handleNavClick(e as any, '#contact')}
          >
            Let's Talk
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-[50] overflow-hidden md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <StaggeredMenu
            position="right"
            items={navItems.map(item => ({
              ...item,
              onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, item.link)
            }))}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={true}
            menuButtonColor="#fff"
            openMenuButtonColor="#fff"
            changeMenuColorOnOpen={false}
            colors={['#B19EEF', '#5227FF']}
            logoUrl='https://lebwork.b-cdn.net/stuff/mahmoud.png'
            accentColor="#ff6b6b"
            onMenuOpen={() => console.log('Menu opened')}
            onMenuClose={() => {
              console.log('Menu closed');
              setIsMobileMenuOpen(false);
            }}
          />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Navbar;