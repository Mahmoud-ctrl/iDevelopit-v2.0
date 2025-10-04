"use client"

import { useLayoutEffect, useRef, useMemo } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Highlighter } from "./ui/highlighter"

gsap.registerPlugin(ScrollTrigger)

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

const ScrambleWord = ({ children }: { children: string }) => {
  return (
    <span className="scramble-word">
      {children.split("").map((char, index) => (
        <span
          key={index}
          className="letter inline-block"
          style={{ whiteSpace: "pre" }} // Preserve spaces
        >
          {char}
        </span>
      ))}
    </span>
  )
}

const HorizontalScrollSection = () => {
  const componentRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const words = [
    "Crafting", "Modern", "Web", "Applications","With", "Digital", "Solutions", "That",
    "Scale", "Seamlessly", "Across", "Every", "Platform", "And", "Device", "Flawlessly",
  ]

  const floatingCircles = useMemo(() => {
    return [...Array(10)].map((_, i) => ({
      id: i,
      width: seededRandom(i * 123) * 80 + 20,
      height: seededRandom(i * 456) * 80 + 20,
      left: seededRandom(i * 789) * 110,
      top: seededRandom(i * 321) * 100,
      animationDelay: i * 0.3,
    }))
  }, []) 

  const scrollShapes = useMemo(() => {
    return [...Array(8)].map((_, i) => ({
      id: i,
      width: 15 + i * 5,
      height: 15 + i * 5,
      left: 110 + i * 50,
      top: 10 + i * 10,
    }))
  }, []) 

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const slider = sliderRef.current
      const sections = gsap.utils.toArray<HTMLElement>(".word-container")

      const pin = gsap.to(slider, {
        x: () =>
          slider
            ? -(slider.scrollWidth - document.documentElement.clientWidth) + "px"
            : "0px",
        ease: "none",
        scrollTrigger: {
          trigger: componentRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => (slider ? "+=" + slider.scrollWidth : "+=0"),
          invalidateOnRefresh: true,
        },
      })

      sections.forEach((section, index) => {
        const animationType = index % 5

        let animation
        const word = section.querySelector(".word-animate")

        switch (animationType) {
          case 0:
            animation = gsap.from(word, {
              yPercent: -150,
              opacity: 0,
              rotation: -25,
              ease: "power2.out",
            })
            break

          case 1:
            animation = gsap.from(word, {
              scale: 0.3,
              opacity: 0,
              filter: "blur(15px)",
              ease: "power3.out",
            })
            break

          case 2:
            animation = gsap.from(word, {
              rotationX: -90,
              yPercent: 50,
              opacity: 0,
              transformOrigin: "bottom center",
              ease: "power2.inOut",
            })
            break

          case 3:
            const letters = section.querySelectorAll(".letter")
            animation = gsap.from(letters, {
              y: 80,
              opacity: 0,
              rotationX: -45,
              stagger: {
                each: 0.03,
                from: "random",
              },
              ease: "back.out(1.7)",
            })
            break

          case 4:
          default:
            animation = gsap.from(word, {
              yPercent: 150,
              opacity: 0,
              rotation: 25,
              ease: "power2.out",
            })
            break
        }

        ScrollTrigger.create({
          trigger: section,
          containerAnimation: pin,
          start: "left 80%", 
          end: "center 60%", 
          animation: animation,
          scrub: 1.2,
          toggleActions: "play reverse play reverse",
        })
      })

      gsap.to(".floating-circle", {
        y: "+=25",
        x: "+=15",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.3,
      })

      gsap.to(".scroll-shape", {
        rotation: 360,
        x: "-120vw",
        scrollTrigger: {
          trigger: componentRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, componentRef)

    return () => ctx.revert()
  }, [])

  const getWordContent = (word: string, index: number) => {
    const baseContent = index % 5 === 3 ? (
      <ScrambleWord>{word}</ScrambleWord>
    ) : (
      <span className="word-animate inline-block">{word}</span>
    )
    
    // Apply highlighter to specific words while preserving animations
    switch (index) {
      case 0: // "Crafting"
        return (
          <Highlighter action="underline" color="#FF6B6B" isView={true}>
            {baseContent}
          </Highlighter>
        )
      case 2: // "Web"
        return (
          <Highlighter action="highlight" color="#4ECDC4" isView={true}>
            {baseContent}
          </Highlighter>
        )
      case 4: // "With"
        return (
          <Highlighter action="circle" color="#FFE66D" isView={true}>
            {baseContent}
          </Highlighter>
        )
      case 6: // "Solutions"
        return (
          <Highlighter action="box" color="#A8E6CF" isView={true}>
            {baseContent}
          </Highlighter>
        )
      case 8: // "Scale"
        return (
          <Highlighter action="underline" color="#FFB3BA" isView={true}>
            {baseContent}
          </Highlighter>
        )
      case 12: // "Platform"
        return (
          <span className="text-black">
          <Highlighter action="highlight" color="#FFDFBA" isView={true}>
            {baseContent}
          </Highlighter>
          </span>
        )
      default:
        return baseContent
    }
  }

  return (
    <div ref={componentRef} className="relative h-[100vh] w-full overflow-hidden bg-black text-white font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingCircles.map((circle) => (
          <div
            key={`circle-${circle.id}`}
            className="floating-circle absolute rounded-full border border-white/20"
            style={{
              width: `${circle.width}px`,
              height: `${circle.height}px`,
              left: `${circle.left}%`,
              top: `${circle.top}%`,
              animationDelay: `${circle.animationDelay}s`,
            }}
          />
        ))}

        {scrollShapes.map((shape) => (
          <div
            key={`scroll-shape-${shape.id}`}
            className="scroll-shape absolute bg-white/30 rounded-full"
            style={{
              width: `${shape.width}px`,
              height: `${shape.height}px`,
              left: `${shape.left}%`,
              top: `${shape.top}%`,
            }}
          />
        ))}

        {/* SVG paths for subtle background detail */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1400 900">
          <path
            className="animated-path"
            d="M0,300 Q200,150 400,300 T800,300 Q1000,150 1200,300"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="2"
            fill="none"
          />
          <path
            className="animated-path"
            d="M0,700 Q400,400 800,700 T1400,200"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div ref={sliderRef} className="flex w-max items-center px-[10vw]">
          {words.map((word, index) => (
            <div key={index} className="word-container flex-shrink-0 px-4 md:px-8">
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter">
                {getWordContent(word, index)}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HorizontalScrollSection