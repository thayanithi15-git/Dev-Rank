"use client"

import React from "react"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import {
  AnimationStart,
  AnimationVariant,
  createAnimation,
} from "./theme-animations"

interface ThemeToggleAnimationProps {
  variant?: AnimationVariant
  start?: AnimationStart
  showLabel?: boolean
  url?: string
}

export default function ThemeToggleButton({
  variant = "circle-blur",
  start = "top-left",
  showLabel = false,
  url = "",
}: ThemeToggleAnimationProps) {
  const { theme, setTheme } = useTheme()

  const styleId = "theme-transition-styles"

  const updateStyles = React.useCallback((css: string, name: string) => {
    if (typeof window === "undefined") return

    let styleElement = document.getElementById(styleId) as HTMLStyleElement

    if (!styleElement) {
      styleElement = document.createElement("style")
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }

    styleElement.textContent = css
  }, [])

  const toggleTheme = React.useCallback(() => {
    const animation = createAnimation(variant, start, url)

    updateStyles(animation.css, animation.name)

    if (typeof window === "undefined") return

    const switchTheme = () => {
      setTheme(theme === "light" ? "dark" : "light")
    }

    if (!document.startViewTransition) {
      switchTheme()
      return
    }

    document.startViewTransition(switchTheme)
  }, [theme, setTheme, variant, start, url, updateStyles])

  const isDark = theme === "dark"

  return (
    <div className="flex items-center cursor-pointer">
      <motion.button
        onClick={toggleTheme}
        className="relative w-14 h-7 cursor-pointer bg-secondary/50 backdrop-blur-sm border border-border hover:border-ring/50 rounded-full p-1 transition-all duration-300 shadow-sm hover:shadow-md"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/10"
          animate={{
            opacity: isDark ? [0.2, 0.4, 0.2] : [0.1, 0.3, 0.1],
            scale: isDark ? [1, 1.05, 1] : [1, 1.02, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Left icon (Sun) */}
        <motion.div
          className="absolute left-1.5 top-1/2 -translate-y-1/2"
          animate={{
            opacity: isDark ? 0.4 : 1,
            scale: isDark ? 0.8 : 1,
            rotate: isDark ? -180 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <Sun className="w-3.5 h-3.5 text-foreground" />
        </motion.div>

        {/* Right icon (Moon) */}
        <motion.div
          className="absolute right-1.5 top-1/2 -translate-y-1/2"
          animate={{
            opacity: isDark ? 1 : 0.4,
            scale: isDark ? 1 : 0.8,
            rotate: isDark ? 0 : 180
          }}
          transition={{ duration: 0.3 }}
        >
          <Moon className="w-3.5 h-3.5 text-foreground" />
        </motion.div>

        {/* Toggle thumb */}
        <motion.div
          className="relative w-5 h-5 bg-primary rounded-full shadow-md flex items-center justify-center border border-primary/20"
          animate={{
            x: isDark ? 24 : 0,
            rotate: isDark ? 360 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        >
          {/* Thumb icon */}
          <motion.div
            animate={{
              rotate: isDark ? -360 : 0,
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 0.5,
              scale: { duration: 0.3 }
            }}
          >
            {isDark ? (
              <Moon className="w-2.5 h-2.5 text-primary-foreground" />
            ) : (
              <Sun className="w-2.5 h-2.5 text-primary-foreground" />
            )}
          </motion.div>

          {/* Sparkle effects */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-primary-foreground rounded-full"
              style={{
                top: '20%',
                left: '50%',
              }}
              animate={{
                y: [-2, -8, -2],
                x: [0, (i - 1) * 3, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/30"
          animate={{
            scale: isDark ? [1, 1.2, 1] : [1, 1.1, 1],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.button>

      <span className="sr-only">Theme Toggle</span>
      
      {showLabel && (
        <div className="ml-3 flex gap-2">
          <span className="text-xs px-2 py-1 bg-secondary/50 text-muted-foreground rounded-full border border-border">
            {variant}
          </span>
          <span className="text-xs px-2 py-1 bg-secondary/50 text-muted-foreground rounded-full border border-border">
            {start}
          </span>
        </div>
      )}
    </div>
  )
}