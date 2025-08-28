"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"

export default function AnimatedLoginButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gooey filter SVG */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="gooey-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Background ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full cursor-pointer bg-primary/20"
        animate={{
          scale: isHovered ? [1, 1.4, 1.2] : 1,
          opacity: isHovered ? [0.3, 0, 0.1] : 0,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut"
        }}
      />

      {/* Arrow button that slides out */}
      <motion.button
        className="absolute right-0 w-10 h-10 cursor-pointer rounded-full bg-primary/80 backdrop-blur-sm text-primary-foreground border border-border/20 flex items-center justify-center shadow-md"
        style={{ filter: "url(#gooey-filter)" }}
        animate={{
          x: isHovered ? -48 : -12,
          scale: isHovered ? 1.05 : 1,
          backgroundColor: isHovered ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.8)"
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25
        }}
      >
        <motion.svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{
            rotate: isHovered ? 45 : 0,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 17L17 7M17 7H7M17 7V17"
            animate={{
              pathLength: isHovered ? [0, 1] : 1,
              pathOffset: isHovered ? [0, 0.2, 0] : 0
            }}
            transition={{ duration: 0.4 }}
          />
        </motion.svg>
      </motion.button>

      {/* Main login button */}
      <motion.button
        className="relative px-5 py-1.5 cursor-pointer rounded-full bg-primary/80 backdrop-blur-sm text-primary-foreground font-medium text-sm border border-border/20 shadow-lg overflow-hidden"
        style={{ filter: "url(#gooey-filter)" }}
        whileHover={{
          scale: 1.02,
          backgroundColor: "hsl(var(--primary) / 0.9)",
          boxShadow: "0 8px 25px hsl(var(--primary) / 0.3)"
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r cursor-pointer from-transparent via-primary-foreground/30 to-transparent -translate-x-full"
          animate={{
            translateX: isHovered ? "200%" : "-100%"
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut"
          }}
        />

        {/* Inner glow */}
        <motion.div
          className="absolute inset-0 bg-primary/20 rounded-full"
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            opacity: isHovered ? [0.5, 0.8, 0.5] : 0.3
          }}
          transition={{
            duration: 1,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut"
          }}
        />

        {/* Button text */}
        <span className="relative z-10 text-white">Login</span>

        {/* Floating particles */}
        {isHovered && [...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-foreground rounded-full pointer-events-none"
            style={{
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              y: [-10, -30],
              x: [0, (Math.random() - 0.5) * 20],
            }}
            transition={{
              duration: 1,
              delay: i * 0.1,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.button>

      {/* Pulsing border effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary/50"
        animate={{
          scale: isHovered ? [1, 1.15, 1.08] : 1,
          opacity: isHovered ? [0, 0.6, 0] : 0,
        }}
        transition={{
          duration: 1.2,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut"
        }}
      />

      {/* Corner sparkles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary opacity-80"
          style={{
            top: i < 2 ? '-4px' : 'calc(100% - 4px)',
            left: i % 2 === 0 ? '-4px' : 'calc(100% - 4px)',
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          }}
          animate={{
            rotate: isHovered ? 360 : 0,
            scale: isHovered ? [0, 1.2, 0.8] : 0,
            opacity: isHovered ? [0, 0.8, 0.6] : 0,
          }}
          transition={{
            duration: 0.8,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Magnetic field effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background: isHovered 
            ? "radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)"
            : "transparent"
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  )
}