'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { ArrowUpRight, Github, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tech: string[];
  github?: string;
  live?: string;
  year: string;
  category: string;
}

interface ProjectsProps {
  heroScrollProgress: number;
}

// --- Project Data ---
const projects: Project[] = [
  {
    id: 1,
    title: "NEXUS",
    subtitle: "E-Commerce Revolution",
    description: "Redefining online shopping with immersive product experiences and seamless checkout flows that convert visitors into loyal customers.",
    image: "https://lebwork.b-cdn.net/stuff/photo-1441986300917-64674bd600d8.jpg",
    tech: ["React", "Node.js", "Three.js", "Stripe"],
    github: "#",
    live: "#",
    year: "2024",
    category: "E-Commerce"
  },
  {
    id: 2,
    title: "VELOCITY",
    subtitle: "Financial Innovation",
    description: "Next-generation banking platform that transforms complex financial operations into intuitive, secure, and lightning-fast experiences.",
    image: "https://lebwork.b-cdn.net/stuff/images_PC%20System.jpg",
    tech: ["React Native", "TypeScript", "Blockchain", "AI"],
    github: "#",
    live: "#",
    year: "2024",
    category: "FinTech"
  },
  {
    id: 3,
    title: "LUMINA",
    subtitle: "Brand Transformation",
    description: "Complete visual identity system that captures the essence of sustainable luxury and resonates across all digital touchpoints.",
    image: "https://lebwork.b-cdn.net/stuff/istockphoto-1152845300-2048x2048.jpg",
    tech: ["Figma", "After Effects", "WebGL", "Webflow"],
    live: "#",
    year: "2024",
    category: "Branding"
  },
  {
    id: 4,
    title: "AURORA",
    subtitle: "AI-Powered Analytics",
    description: "Revolutionary data visualization platform that transforms complex datasets into actionable insights through intelligent automation.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2340&auto=format&fit=crop",
    tech: ["Python", "TensorFlow", "D3.js", "FastAPI"],
    github: "#",
    live: "#",
    year: "2024",
    category: "AI/ML"
  }
];

// --- Individual Project Panel ---
const ProjectPanel: React.FC<{ 
  project: Project; 
  index: number; 
  isActive: boolean;
  heroProgress: number;
}> = ({ project, index, isActive, heroProgress }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      id='projects'
      className="min-w-full h-screen flex items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0, x: 100 }}
      animate={{ 
        opacity: heroProgress > 0.5 ? 1 : 0,
        x: heroProgress > 0.5 ? 0 : 100
      }}
      transition={{ 
        duration: 1.2,
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div 
          className="w-full h-full bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <motion.div
          className="absolute inset-0 bg-black"
          animate={{
            opacity: isHovered ? 0.4 : 0.7
          }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>

      {/* Content Grid */}
      <div className="relative z-20 max-w-7xl mx-auto px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center h-full">
          
          {/* Left Content - Project Info */}
          <div className="lg:col-span-6 space-y-8">
            {/* Project Number & Meta */}
            <motion.div
              className="flex items-start gap-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: isActive ? 1 : 0.7,
                x: isActive ? 0 : -30,
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-7xl md:text-9xl font-bold text-white/20 leading-none">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="pt-4">
                <p className="text-white/60 text-sm tracking-widest uppercase mb-2">
                  {project.year} • {project.category}
                </p>
                <div className="w-16 h-px bg-white/30" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: isActive ? 1 : 0.8,
                y: isActive ? 0 : 20,
              }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] mb-4">
                {project.title}
              </h2>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-white/80 mb-6">
                {project.subtitle}
              </h3>
            </motion.div>

            {/* Description */}
            <motion.p 
              className="text-base md:text-lg text-white/70 leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isActive ? 1 : 0.6,
                y: isActive ? 0 : 15,
              }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {project.description}
            </motion.p>

            {/* Tech Stack */}
            <motion.div 
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isActive ? 1 : 0.7,
                y: isActive ? 0 : 15,
              }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {project.tech.map((tech) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1.5 text-sm font-medium text-white/80 border border-white/20 rounded-full backdrop-blur-sm"
                  whileHover={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    scale: 1.05 
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isActive ? 1 : 0.7,
                y: isActive ? 0 : 15,
              }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {project.live && (
                <motion.a
                  href={project.live}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-all duration-300 group text-sm md:text-base"
                  whileHover={{ scale: 1.05, gap: '0.75rem' }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Live
                  <ArrowUpRight 
                    size={18} 
                    className="group-hover:rotate-45 transition-transform duration-300" 
                  />
                </motion.a>
              )}
              {project.github && (
                <motion.a
                  href={project.github}
                  className="flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 group text-sm md:text-base"
                  whileHover={{ scale: 1.05, gap: '0.75rem' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={18} />
                  Source
                </motion.a>
              )}
            </motion.div>
          </div>

          {/* Right Content - Visual Element */}
          <div className="lg:col-span-5 lg:col-start-8 flex justify-center lg:justify-end">
            <motion.div
              className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden"
              animate={{
                scale: isHovered ? 1.02 : 1,
                rotate: isHovered ? (index % 2 === 0 ? 1 : -1) : 0,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ 
                opacity: 1, 
                y: 0 
              }}
              viewport={{ once: true }}
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/30" />
              
              {/* Floating accent */}
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Horizontal Projects Component ---
const HorizontalProjects: React.FC<ProjectsProps> = ({ heroScrollProgress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  // Smooth scrolling with spring physics
  const x = useMotionValue(0);
  const smoothX = useSpring(x, { 
    damping: 50, 
    stiffness: 400,
    restDelta: 0.5 
  });

  // Detect if the section is in view
  const isInView = useInView(containerRef, { amount: 0.5, once: false });

  // Navigation functions - wrapped in useCallback to prevent unnecessary re-renders
  const scrollToProject = useCallback((index: number) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const targetX = -index * container.clientWidth;
    x.set(targetX);
    setCurrentIndex(index);
    
    // Update navigation state
    setCanScrollLeft(index > 0);
    setCanScrollRight(index < projects.length - 1);
  }, [x]);

  const nextProject = useCallback(() => {
    if (currentIndex < projects.length - 1) {
      scrollToProject(currentIndex + 1);
    }
  }, [currentIndex, scrollToProject]);

  const prevProject = useCallback(() => {
    if (currentIndex > 0) {
      scrollToProject(currentIndex - 1);
    }
  }, [currentIndex, scrollToProject]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevProject();
      if (e.key === 'ArrowRight') nextProject();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextProject, prevProject]);

  // Touch/swipe handling for mobile
  useEffect(() => {
    let startX = 0;
    let isDragging = false;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isDragging) return;
      
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) {
          nextProject();
        } else {
          prevProject();
        }
      }
      
      isDragging = false;
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd, { passive: false });
      
      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [nextProject, prevProject]);

  return (
    <section 
      ref={containerRef}
      className="relative bg-black min-h-screen overflow-hidden"
    >
      
      {/* Main Horizontal Scroll Container */}
      <motion.div
        ref={scrollContainerRef}
        className="flex h-screen"
        style={{ x: smoothX }}
      >
        {projects.map((project, index) => (
          <ProjectPanel
            key={project.id}
            project={project}
            index={index}
            isActive={index === currentIndex}
            heroProgress={heroScrollProgress}
          />
        ))}
      </motion.div>

      {/* Navigation Controls - Only show when section is in view */}
      {isInView && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <motion.div 
            className="flex items-center gap-4 px-6 py-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Previous Button */}
            <motion.button
              onClick={prevProject}
              disabled={!canScrollLeft}
              className="p-2 rounded-full text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              whileHover={canScrollLeft ? { scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' } : {}}
              whileTap={canScrollLeft ? { scale: 0.9 } : {}}
            >
              <ChevronLeft size={20} />
            </motion.button>

            {/* Dot Indicators */}
            <div className="flex items-center gap-2">
              {projects.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => scrollToProject(index)}
                  className="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer"
                  animate={{
                    backgroundColor: index === currentIndex ? '#ffffff' : 'rgba(255,255,255,0.3)',
                    scale: index === currentIndex ? 1.2 : 1,
                  }}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              onClick={nextProject}
              disabled={!canScrollRight}
              className="p-2 rounded-full text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              whileHover={canScrollRight ? { scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' } : {}}
              whileTap={canScrollRight ? { scale: 0.9 } : {}}
            >
              <ChevronRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      )}

      {/* Project Counter - Only show when section is in view */}
      {isInView && (
        <motion.div 
          className="fixed top-1/2 right-8 transform -translate-y-1/2 z-50 text-white/60"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-sm font-mono tracking-wider">
            <span className="text-white text-lg">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="mx-2">/</span>
            <span>{String(projects.length).padStart(2, '0')}</span>
          </div>
        </motion.div>
      )}

      {/* Progress Bar - Only show when section is in view */}
      {isInView && (
        <motion.div 
          className="fixed bottom-0 left-0 right-0 h-1 bg-white/10 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-white"
            animate={{
              width: `${((currentIndex + 1) / projects.length) * 100}%`
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>
      )}

      {/* Keyboard Hint - Only show when section is in view */}
      {isInView && (
        <motion.div
          className="fixed bottom-20 right-8 text-white/40 text-xs z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <p>← → Navigate</p>
        </motion.div>
      )}
    </section>
  );
};

export default HorizontalProjects;