import { motion } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

interface ClientTestimonialsProps {
  className?: string;
}

const topRowTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Marketing Director",
    company: "TechFlow Solutions",
    quote: "Our new website exceeded all expectations. The design is stunning and conversion rates increased by 240%. The team's attention to detail is incredible.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CEO",
    company: "GreenScale Ventures",
    quote: "Working with this agency transformed our entire digital presence. Professional, innovative, and delivered exactly what we envisioned.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "CloudFirst Analytics",
    quote: "The e-commerce platform they built for us is flawless. User experience is seamless and our sales have tripled since launch.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "David Park",
    role: "CTO",
    company: "NextGen Robotics",
    quote: "Exceptional technical expertise. They integrated complex features seamlessly while maintaining perfect performance and load times.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Founder",
    company: "Meridian Consulting",
    quote: "From concept to launch, every detail was handled with precision. The website perfectly represents our brand and drives real results.",
    avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face"
  }
];

const bottomRowTestimonials: Testimonial[] = [
  {
    id: 6,
    name: "James Wilson",
    role: "VP Marketing",
    company: "InnovateTech",
    quote: "Outstanding web development work. The custom dashboard they created has streamlined our entire workflow and improved team productivity.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 7,
    name: "Maria Garcia",
    role: "Creative Director",
    company: "Design Studio Plus",
    quote: "The redesign completely transformed our online presence. Modern, functional, and perfectly captures our creative vision.",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 8,
    name: "Robert Kim",
    role: "Operations Manager",
    company: "LogiFlow Systems",
    quote: "The web application they developed has revolutionized our business processes. Intuitive interface with powerful functionality.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 9,
    name: "Anna Foster",
    role: "Brand Manager",
    company: "Future Brands",
    quote: "Incredible attention to brand consistency across all digital touchpoints. The website truly reflects who we are as a company.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 10,
    name: "Alex Turner",
    role: "CEO",
    company: "Growth Dynamics",
    quote: "Professional, efficient, and creative. The new website has become our most powerful sales tool and client acquisition channel.",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face"
  }
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div className="flex-shrink-0 w-80 md:w-96 bg-black rounded-3xl p-8 mr-6 border border-gray-800 hover:border-gray-700 transition-all duration-300">
      {/* Profile */}
      <div className="flex items-center mb-6">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-4">
          <h4 className="text-white font-medium text-lg">{testimonial.name}</h4>
          <p className="text-gray-400 text-sm">{testimonial.role} at {testimonial.company}</p>
        </div>
      </div>

      {/* Quote */}
      <blockquote className="text-gray-300 leading-relaxed text-base">
        "{testimonial.quote}"
      </blockquote>
    </div>
  );
};

const ScrollingRow: React.FC<{ 
  testimonials: Testimonial[];
  direction: 'left' | 'right';
  isPaused: boolean;
}> = ({ testimonials, direction, isPaused }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    const scroll = () => {
      if (!isPaused && scrollContainer) {
        const scrollSpeed = direction === 'left' ? 1 : -1;
        scrollContainer.scrollLeft += scrollSpeed;
        
        // Reset scroll for seamless loop
        if (direction === 'left') {
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
            scrollContainer.scrollLeft = 0;
          }
        } else {
          if (scrollContainer.scrollLeft <= 0) {
            scrollContainer.scrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
          }
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused, direction]);

  // Duplicate testimonials for seamless scrolling
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="relative overflow-hidden mb-8">
      <div 
        ref={scrollRef}
        className="flex overflow-x-hidden"
        style={{ 
          scrollBehavior: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <TestimonialCard 
            key={`${testimonial.id}-${index}`} 
            testimonial={testimonial} 
          />
        ))}
      </div>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
    </div>
  );
};

const ClientTestimonials: React.FC<ClientTestimonialsProps> = ({ 
  className = ""
}) => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div id='testimonials' className={`w-full min-h-screen bg-black text-white ${className}`}>
      
      {/* Header */}
      <div className="px-8 md:px-16 pt-16 pb-12">
        <div className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6">
          TESTIMONIALS
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight max-w-4xl">
          Don't take our word for it!<br />
          <span className="text-gray-400">Hear it from our clients.</span>
        </h1>
      </div>

      {/* Two Scrolling Rows */}
      <div 
        className="px-8 md:px-16 pb-16"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Top Row - Scrolls Right */}
        <ScrollingRow 
          testimonials={topRowTestimonials}
          direction="left"
          isPaused={isPaused}
        />

        {/* Bottom Row - Scrolls Left */}
        <ScrollingRow 
          testimonials={bottomRowTestimonials}
          direction="right"
          isPaused={isPaused}
        />
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .flex::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ClientTestimonials;