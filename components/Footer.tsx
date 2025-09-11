'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // Smooth scroll function (same as navbar)
  const smoothScrollTo = (elementId: string) => {
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
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    const sectionId = link.replace('#', '');
    smoothScrollTo(sectionId);
  };

  const navLinks = [
    { label: 'Home', link: '#home' },
    { label: 'Services', link: '#services' },
    { label: 'Projects', link: '#projects' },
    { label: 'Contact', link: '#contact' }
  ];

  const socialLinks = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
  ];

  return (
    <footer className="relative bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Logo and Brand Section */}
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <img 
                src="https://lebwork.b-cdn.net/stuff/mahmoud.png" 
                alt="iDevelopit Logo" 
                className="w-10 h-10"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-white font-light text-lg tracking-wider">
                iDevelopit
              </span>
              <span className="text-gray-400 text-xs tracking-wide">
                Digital Solutions
              </span>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div 
            className="flex items-center space-x-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.link}
                onClick={(e) => handleNavClick(e, link.link)}
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm tracking-wide uppercase relative group"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-px bg-white w-0 group-hover:w-full transition-all duration-300"
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex items-center space-x-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors duration-300 text-sm tracking-wide"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {social.label}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div 
          className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        />

        {/* Bottom Section */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* Copyright */}
          <div className="text-gray-500 text-xs tracking-wide">
            © {currentYear} iDevelopit. All rights reserved.
          </div>

          {/* Specialties */}
          <div className="flex flex-wrap items-center gap-4 text-xs tracking-widest text-gray-600 uppercase">
            <span>Web Development</span>
            <span className="text-gray-700">•</span>
            <span>Custom Systems</span>
            <span className="text-gray-700">•</span>
            <span>UI/UX Design</span>
            <span className="text-gray-700">•</span>
            <span>Brand Strategy</span>
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={(e) => handleNavClick(e as any, '#home')}
            className="text-gray-500 hover:text-white transition-colors duration-300 text-xs tracking-wide uppercase group flex items-center space-x-2"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            <span>Back to Top</span>
            <motion.span
              className="group-hover:-translate-y-1 transition-transform duration-300"
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              ↑
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;