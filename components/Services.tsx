import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, X, Zap, Star, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface Service {
  id: number;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  results: string;
  image: string;
  color: string;
  bgGradient: string;
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  features?: string[];
  clients?: string;
  approach?: string;
}

const ServicesSection = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const services: Service[] = [
    {
      id: 0,
      title: "WEB DEVELOPMENT",
      subtitle: "DIGITAL EXCELLENCE",
      tagline: "SCALABLE & ROBUST SOLUTIONS",
      description: "Full-stack applications engineered to perform, scale, and provide a seamless user experience. We build future-proof digital assets for your business.",
      results: "300% average performance boost across client projects",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      color: "#00D4FF",
      bgGradient: "from-cyan-900 via-blue-900 to-black",
      size: "large",
      features: ["React/Next.js", "Node.js Backend", "Cloud Deployment", "SEO Optimized"],
      clients: "50+ Projects",
      approach: "Agile Development"
    },
    {
      id: 1,
      title: "MOBILE DEVELOPMENT",
      subtitle: "INNOVATIVE MOBILE APPS",
      tagline: "APPS THAT CAPTURE & ENGAGE",
      description: "Native iOS & Android applications designed for high performance and user engagement, turning your ideas into popular, high-rated apps.",
      results: "4.8★ average app store rating with 10M+ downloads",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      color: "#FF0080",
      bgGradient: "from-pink-900 via-purple-900 to-black",
      size: "medium",
      features: ["Native iOS/Android", "React Native", "App Store Launch", "Push Notifications"],
      clients: "25+ Apps Live",
      approach: "User-First Design"
    },
    {
      id: 2,
      title: "UI/UX DESIGN",
      subtitle: "USER-CENTRIC DESIGN",
      tagline: "INTERFACES THAT DELIGHT & CONVERT",
      description: "We craft intuitive and beautiful user experiences based on research and user psychology to increase engagement and conversion rates.",
      results: "250% conversion rate increase through strategic design",
      image: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      color: "#FF6B00",
      bgGradient: "from-orange-900 via-red-900 to-black",
      size: "tall",
      features: ["User Research", "Wireframing", "Prototyping", "Design System"],
      clients: "100+ Designs",
      approach: "Data-Driven Design"
    },
    {
      id: 3,
      title: "E-COMMERCE",
      subtitle: "E-COMMERCE SOLUTIONS",
      tagline: "PLATFORMS BUILT FOR GROWTH",
      description: "Online stores architected for maximum conversion and scalability. Every element is optimized to turn browsers into loyal customers.",
      results: "$2M+ revenue generated for clients in first year",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      color: "#00FF88",
      bgGradient: "from-emerald-900 via-green-900 to-black",
      size: "wide",
      features: ["Shopify/WooCommerce", "Payment Integration", "Inventory Management", "Analytics"],
      clients: "30+ Stores",
      approach: "Conversion-Focused"
    },
    {
      id: 4,
      title: "ANALYTICS & GROWTH",
      subtitle: "DATA-DRIVEN STRATEGY",
      tagline: "INSIGHTS THAT DRIVE GROWTH",
      description: "We implement robust tracking systems that provide actionable insights, helping you understand your customers and optimize for growth.",
      results: "500% ROI improvement through data optimization",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      color: "#FFD700",
      bgGradient: "from-yellow-900 via-amber-900 to-black",
      size: "small",
      features: ["Google Analytics 4", "Heat Maps", "A/B Testing", "Growth Optimization"],
      clients: "40+ Campaigns",
      approach: "Metric-Driven"
    },
    {
      id: 5,
      title: "DIGITAL STRATEGY",
      subtitle: "INNOVATIVE ROADMAPS",
      tagline: "BLUEPRINTS FOR SUCCESS",
      description: "Comprehensive digital strategies and technology roadmaps that align with your business goals and give you a competitive edge in the market.",
      results: "10x competitive advantage through strategic planning",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
      color: "#8A2BE2",
      bgGradient: "from-violet-900 via-purple-900 to-black",
      size: "medium",
      features: ["Market Research", "Tech Roadmap", "Competitor Analysis", "Growth Strategy"],
      clients: "20+ Strategies",
      approach: "Research-Based"
    },
    {
      id: 6,
      title: "POS SYSTEMS",
      subtitle: "SMART POINT OF SALE",
      tagline: "STREAMLINED BUSINESS OPERATIONS",
      description: "Custom POS solutions that integrate seamlessly with your business operations, inventory, and customer management systems.",
      results: "40% faster checkout times and improved accuracy",
      image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      color: "#00FFB7",
      bgGradient: "from-teal-900 via-green-900 to-black",
      size: "small",
      features: ["Cloud-Based", "Inventory Sync", "Payment Processing", "Reporting Dashboard"],
      clients: "15+ Systems",
      approach: "Integration-First"
    },
    {
      id: 7,
      title: "CUSTOM SOLUTIONS",
      subtitle: "TAILORED DEVELOPMENT",
      tagline: "YOUR VISION, OUR EXPERTISE",
      description: "Bespoke software solutions designed specifically for your unique business requirements and challenges.",
      results: "100% client satisfaction with custom implementations",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2125&q=80",
      color: "#FF4081",
      bgGradient: "from-rose-900 via-pink-900 to-black",
      size: "wide",
      features: ["Requirements Analysis", "Custom Architecture", "API Development", "System Integration"],
      clients: "35+ Solutions",
      approach: "Consultative Process"
    }
  ];

  const handleServiceClick = (serviceId: number) => {
    if (activeService === serviceId) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveService(null);
        setIsTransitioning(false);
      }, 300);
    } else {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveService(serviceId);
        setIsTransitioning(false);
        // Smooth scroll to the section top
        if (sectionRef.current) {
          sectionRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 300);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const getCardClasses = (size: string) => {
    switch (size) {
      case 'small':
        return 'col-span-1 row-span-1 min-h-[280px]';
      case 'medium':
        return 'col-span-1 md:col-span-1 row-span-2 min-h-[400px]';
      case 'large':
        return 'col-span-1 md:col-span-2 row-span-2 min-h-[500px]';
      case 'wide':
        return 'col-span-1 md:col-span-2 row-span-1 min-h-[320px]';
      case 'tall':
        return 'col-span-1 row-span-3 min-h-[600px]';
      default:
        return 'col-span-1 row-span-1 min-h-[300px]';
    }
  };

  if (activeService !== null) {
    const service = services[activeService];
    return (
      <section 
        ref={sectionRef}
        className={`min-h-screen bg-gradient-to-br ${service.bgGradient} relative overflow-hidden transition-all duration-700 ease-out`}
      >
        {/* Hero Image Overlay */}
        <div className="absolute inset-0">
          <img 
            src={service.image} 
            alt={service.title}
            className={`w-full h-full object-cover transition-all duration-700 ${isTransitioning ? 'scale-110 opacity-0' : 'scale-105 opacity-25'}`}
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        
        {/* Dynamic lighting effect */}
        <div 
          className="absolute inset-0 opacity-20 transition-all duration-700"
          style={{
            background: `radial-gradient(1200px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, ${service.color}50, transparent 70%)`
          }}
        />

        <div className="relative z-20 min-h-screen w-full flex items-center justify-center p-6 md:p-8 lg:p-12">
          {/* Close button */}
          <button
            onClick={() => handleServiceClick(activeService)}
            className="absolute top-4 right-4 md:top-20 md:right-8 w-12 h-12 md:w-16 md:h-16 border-2 border-white/30 rounded-full flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm z-30"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className={`max-w-7xl mx-auto transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Service Content */}
              <div className="text-center lg:text-left">
                <div 
                  className="text-sm md:text-lg font-bold mb-4 tracking-widest opacity-90"
                  style={{ color: service.color }}
                >
                  {service.subtitle}
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-none">
                  {service.title}
                </h1>
                <div 
                  className="text-xl md:text-2xl lg:text-3xl font-semibold mb-8 tracking-wide"
                  style={{ color: service.color }}
                >
                  {service.tagline}
                </div>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
                  {service.description}
                </p>
                
                {/* Features */}
                {service.features && (
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-white/80">
                        <Zap className="w-4 h-4" style={{ color: service.color }} />
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center gap-4 mb-8">
                  <button className="group bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 flex items-center shadow-2xl">
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Service Details */}
              <div className="space-y-6">
                {/* Results */}
                <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center space-x-2 mb-3">
                    <Star className="w-5 h-5" style={{ color: service.color }} />
                    <div className="text-sm text-white/60 tracking-widest">PROVEN RESULTS</div>
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-white">{service.results}</div>
                </div>

                {/* Clients & Approach */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/30 backdrop-blur-lg rounded-xl p-4 border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="w-4 h-4" style={{ color: service.color }} />
                      <div className="text-xs text-white/60 tracking-widest">EXPERIENCE</div>
                    </div>
                    <div className="text-lg font-bold text-white">{service.clients}</div>
                  </div>
                  <div className="bg-black/30 backdrop-blur-lg rounded-xl p-4 border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-4 h-4" style={{ color: service.color }} />
                      <div className="text-xs text-white/60 tracking-widest">APPROACH</div>
                    </div>
                    <div className="text-lg font-bold text-white">{service.approach}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="services" className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-5 transition-all duration-700"
          style={{
            background: `radial-gradient(1400px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.1), transparent 70%)`
          }}
        />
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-gradient-to-br from-gray-900/20 to-transparent" 
               style={{ 
                 backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
                 backgroundSize: '40px 40px'
               }} 
          />
        </div>
      </div>

      <div className={`relative z-10 min-h-screen flex flex-col transition-all duration-700 ${isTransitioning ? 'opacity-60 blur-sm' : 'opacity-100 blur-0'}`}>
        {/* Header */}
        <div className="text-center pt-16 pb-12 px-4">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-light mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent leading-tight">
           OUR SERVICES
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-4xl mx-auto">
            CRAFTING DIGITAL EXPERIENCES THAT DRIVE RESULTS
          </p>
        </div>

        {/* Services Masonry Grid */}
        <div className="flex-1 px-4 md:px-8 pb-16">
          <div className="max-w-8xl">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-min">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceClick(service.id)}
                  className={`group relative bg-gray-900/20 backdrop-blur-sm border border-gray-800/50 rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:border-white/20 hover:shadow-2xl ${getCardClasses(service.size)}`}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/75 group-hover:bg-black/60 transition-all duration-500" />
                  </div>
                  
                  {/* Gradient overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                    style={{ background: `linear-gradient(135deg, ${service.color}40, transparent 60%)` }}
                  />

                  {/* Content */}
                  <div className="relative z-10 p-4 md:p-6 lg:p-8 h-full flex flex-col justify-between">
                    <div>
                      <div 
                        className="text-xs md:text-sm font-bold mb-2 tracking-wider opacity-90"
                        style={{ color: service.color }}
                      >
                        {service.subtitle}
                      </div>
                      <h3 className={`font-semibold mb-3 text-white leading-tight ${
                        service.size === 'large' ? 'text-2xl md:text-4xl' :
                        service.size === 'wide' ? 'text-xl md:text-3xl' :
                        service.size === 'tall' ? 'text-lg md:text-2xl' :
                        'text-lg md:text-xl'
                      }`}>
                        {service.title}
                      </h3>
                      <div 
                        className={`font-medium mb-4 leading-tight ${
                          service.size === 'large' ? 'text-lg md:text-xl' :
                          service.size === 'wide' ? 'text-base md:text-lg' :
                          'text-sm md:text-base'
                        }`}
                        style={{ color: service.color }}
                      >
                        {service.tagline}
                      </div>
                      
                      {/* Show clients and approach for larger cards */}
                      {(service.size === 'large' || service.size === 'wide' || service.size === 'tall') && (
                        <div className="space-y-2 mb-4">
                          <div className="text-sm text-white/70">
                            <span className="font-semibold">Experience:</span> {service.clients}
                          </div>
                          <div className="text-sm text-white/70">
                            <span className="font-semibold">Approach:</span> {service.approach}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Launch indicator */}
                    <div className="flex items-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <span className="font-semibold text-sm md:text-lg">EXPLORE</span>
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 md:ml-3 transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>

                  {/* Hover effect border */}
                  <div 
                    className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ 
                      boxShadow: `inset 0 0 0 2px ${service.color}40` 
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-12 md:py-20 px-4">
          <p className="text-xl md:text-2xl text-gray-400 mb-8 font-light">READY TO TRANSFORM YOUR BUSINESS?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button 
              className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-sm tracking-wider uppercase cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start a Project           
            </motion.button>
            <button className="text-white/80 hover:text-white font-bold text-base md:text-lg underline hover:no-underline transition-all">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;