import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const ServicesVideoSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundToggle, setShowSoundToggle] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const isInView = useInView(containerRef, { 
    amount: isMobile ? 0.3 : 0.5
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Smooth scroll-based transforms
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, isMobile ? 1.05 : 1.1]);

  // Simple video loading - just the basics
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
      setHasError(false);
    };

    const handleError = () => {
      setHasError(true);
      // Simple cache-bust retry - just once
      const currentSrc = video.src;
      if (!currentSrc.includes('?t=')) {
        video.src = currentSrc + '?t=' + Date.now();
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('play', () => setIsPlaying(true));
    video.addEventListener('pause', () => setIsPlaying(false));

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('play', () => setIsPlaying(true));
      video.removeEventListener('pause', () => setIsPlaying(false));
    };
  }, []);

  // Auto-play when in view
  useEffect(() => {
    if (videoRef.current && isLoaded && isInView && !isPlaying) {
      videoRef.current.play().catch(() => {
        // Ignore autoplay failures
      });
    } else if (videoRef.current && isPlaying && !isInView) {
      videoRef.current.pause();
    }
  }, [isInView, isLoaded, isPlaying]);

  const handleSoundToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <motion.section 
      ref={containerRef}
      className={`relative bg-black flex items-center justify-center overflow-hidden ${
        isMobile ? 'min-h-[80vh] py-8' : 'min-h-screen'
      }`}
      style={{ opacity }}
      id="services"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-black to-black" />
      
      {/* Grid overlay */}
      <div 
        className={`absolute inset-0 ${isMobile ? 'opacity-[0.01]' : 'opacity-[0.02]'}`}
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: isMobile ? '30px 30px' : '50px 50px'
        }}
      />

      <div className={`relative w-full mx-auto px-4 ${
        isMobile ? 'py-6' : 'max-w-[95vw] sm:max-w-[90vw] lg:max-w-[85vw] xl:max-w-[80vw] sm:px-6 py-12 sm:py-20'
      }`}>
        {/* Video Container */}
        <motion.div 
          className="relative mx-auto"
          style={{ scale }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
          onMouseEnter={() => !isMobile && setShowSoundToggle(true)}
          onMouseLeave={() => !isMobile && setShowSoundToggle(false)}
          onTouchStart={() => isMobile && setShowSoundToggle(true)}
        >
          
          {/* Main Video Frame */}
          <div className="relative group cursor-pointer" onClick={handleSoundToggle}>
            
            {/* Border glow */}
            <motion.div 
              className={`absolute -inset-[1px] sm:-inset-[2px] rounded-lg sm:rounded-xl opacity-0 ${isMobile ? 'group-active:opacity-100' : 'group-hover:opacity-100'} transition-opacity duration-500`}
              style={{
                background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05), rgba(255,255,255,0.1))',
              }}
              animate={isPlaying ? { opacity: 0.3 } : {}}
            />
            
            {/* Video Container with Mobile-Specific Styling */}
            <div className={`relative bg-gray-900/50 overflow-hidden backdrop-blur-sm border border-gray-800/50 ${
              isMobile ? 'rounded-lg mx-2' : 'rounded-lg sm:rounded-xl'
            }`}>
              
              <div className={`relative ${
                isMobile 
                  ? 'aspect-[4/3] max-h-[50vh]' // Taller aspect ratio and max height on mobile
                  : 'aspect-video'
              }`}>
                <video
                  ref={videoRef}
                  className={`w-full h-full ${
                    isMobile 
                      ? 'object-cover object-center' // Better cropping on mobile
                      : 'object-cover'
                  }`}
                  poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect width='1920' height='1080' fill='%23111'/%3E%3Ctext x='960' y='500' text-anchor='middle' dominant-baseline='middle' font-family='system-ui' font-size='48' fill='%23555' font-weight='300'%3EServices Overview%3C/text%3E%3Ctext x='960' y='580' text-anchor='middle' dominant-baseline='middle' font-family='system-ui' font-size='24' fill='%23777'%3ELoading...%3C/text%3E%3C/svg%3E"
                  muted={isMuted}
                  loop
                  playsInline
                  preload="metadata"
                  src="https://lebwork.b-cdn.net/stuff/Services-iDevelopIt.mp4"
                >
                  <source src="https://lebwork.b-cdn.net/stuff/Services-iDevelopIt.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Sound Toggle - Repositioned for mobile */}
                {isLoaded && (
                  <motion.div 
                    className={`absolute ${
                      isMobile ? 'top-3 right-3' : 'top-3 sm:top-6 right-3 sm:right-6'
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: showSoundToggle || isMobile ? 1 : 0,
                      scale: showSoundToggle || isMobile ? 1 : 0.8
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.button
                      onClick={handleSoundToggle}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-full bg-black/70 backdrop-blur-sm border border-white/20 text-white hover:bg-black/80 hover:border-white/30 transition-all duration-300 ${
                        isMobile ? 'text-xs' : 'sm:space-x-2 sm:px-4 text-xs sm:text-sm'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isMuted ? (
                        <>
                          <svg className={`${isMobile ? 'w-3 h-3' : 'w-3 h-3 sm:w-4 sm:h-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                          </svg>
                          {!isMobile && <span className="font-medium hidden sm:inline">Sound Off</span>}
                        </>
                      ) : (
                        <>
                          <svg className={`${isMobile ? 'w-3 h-3' : 'w-3 h-3 sm:w-4 sm:h-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          </svg>
                          {!isMobile && <span className="font-medium hidden sm:inline">Sound On</span>}
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                )}

                {/* Simple Loading State */}
                {!isLoaded && !hasError && (
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isLoaded ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                      <motion.div
                        className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <p className="text-white/80 text-xs sm:text-sm">Loading video...</p>
                    </div>
                  </motion.div>
                )}

                {/* Error State */}
                {hasError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="text-center text-white/80">
                      <p className="text-sm mb-2">Video unavailable</p>
                      <button 
                        onClick={() => window.location.reload()} 
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full text-xs transition-all"
                      >
                        Refresh Page
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status Indicator - Repositioned for mobile */}
          <motion.div 
            className={`absolute left-1/2 transform -translate-x-1/2 ${
              isMobile ? '-bottom-6' : '-bottom-8 sm:-bottom-12'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 sm:space-x-3 text-gray-500 text-xs sm:text-sm">
              <motion.div 
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                animate={{ 
                  backgroundColor: hasError ? "#ef4444" : isPlaying ? "#10b981" : "#6b7280",
                  scale: isPlaying ? [1, 1.2, 1] : 1
                }}
                transition={{ 
                  backgroundColor: { duration: 0.3 },
                  scale: { duration: 1, repeat: isPlaying ? Infinity : 0 }
                }}
              />
              <span>
                {hasError ? "Error" : isPlaying ? "Playing" : isLoaded ? "Ready" : "Loading..."}
              </span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-600">{isMuted ? "Muted" : "Sound on"}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Description - Tighter spacing on mobile */}
        <div className={`text-center px-2 sm:px-4 ${
          isMobile ? 'py-8 mt-8' : 'py-8 sm:py-12 md:py-20'
        }`}>
          <p className={`text-gray-400 mb-6 sm:mb-8 font-light ${
            isMobile ? 'text-lg' : 'text-base sm:text-xl md:text-2xl'
          }`}>READY TO TRANSFORM YOUR BUSINESS?</p>
          <div className={`flex items-center justify-center ${
            isMobile ? 'flex-col gap-4' : 'flex-col sm:flex-row gap-4 sm:gap-6'
          }`}>
            <motion.button 
              className={`border border-white text-white hover:bg-white hover:text-black transition-all duration-300 tracking-wider uppercase cursor-pointer ${
                isMobile ? 'w-full px-6 py-3 text-sm' : 'w-full sm:w-auto px-6 sm:px-8 py-3 text-xs sm:text-sm'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
              document.querySelector('#contact')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
              
            >
              Start a Project           
            </motion.button>
            <button 
            onClick={() => {
              document.querySelector('#testimonials')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
            className={`text-white/80 hover:text-white font-bold underline hover:no-underline transition-all cursor-pointer ${
              isMobile ? 'text-base' : 'text-sm sm:text-base md:text-lg'
            }`}>
              What Clients Say
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ServicesVideoSection;