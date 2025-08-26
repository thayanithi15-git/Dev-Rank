"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

// Dynamically import MeshGradient with no SSR
const MeshGradient = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.MeshGradient),
  { ssr: false }
)

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [themeColors, setThemeColors] = useState({
    background: '#000000',
    primary: '#ff6b35',
    accent: '#ff8c42',
    muted: '#333333',
    foreground: '#ffffff'
  })

  // Performance optimization: Only mount shaders after component is ready
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Get CSS custom properties from the document
    const updateThemeColors = () => {
      const root = document.documentElement
      const computedStyle = getComputedStyle(root)

      // Helper function to get CSS variable with fallbacks
      const getCSSVar = (varName: string, fallback: string) => {
        const value = computedStyle.getPropertyValue(varName).trim()
        return value || fallback
      }

      const newColors = {
        background: getCSSVar('--background', '#000000'),
        primary: getCSSVar('--primary', '#ff6b35'),
        accent: getCSSVar('--accent', '#ff8c42'),
        muted: getCSSVar('--muted', '#333333'),
        foreground: getCSSVar('--foreground', '#ffffff')
      }

      setThemeColors(newColors)
      
      // Debug log in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Theme colors updated:', newColors)
      }
    }

    // Update colors on mount
    updateThemeColors()

    // Listen for theme changes (if you have a theme switcher)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' &&
          (mutation.attributeName === 'class' || mutation.attributeName === 'data-theme')) {
          setTimeout(updateThemeColors, 100) // Small delay to ensure CSS is applied
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme']
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Throttle mouse events to improve performance
    let mouseTimeout: NodeJS.Timeout;
    
    const handleMouseEnter = () => {
      clearTimeout(mouseTimeout);
      setIsActive(true);
    };
    
    const handleMouseLeave = () => {
      mouseTimeout = setTimeout(() => setIsActive(false), 300);
    };

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter, { passive: true })
      container.addEventListener("mouseleave", handleMouseLeave, { passive: true })
    }

    return () => {
      clearTimeout(mouseTimeout);
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  // Convert oklch colors to hex
  const convertColor = (color: string): string => {
    if (!color) return '#000000'
    
    // If it's already a hex color, return it
    if (color.startsWith('#')) return color
    
    // If it's an oklch color, convert it to a more appropriate color
    if (color.startsWith('oklch(')) {
      // Extract the lightness value from oklch
      const match = color.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/)
      if (match) {
        const lightness = parseFloat(match[1])
        const chroma = parseFloat(match[2])
        const hue = parseFloat(match[3])
        
        // Convert based on lightness and context
        if (lightness < 0.2) {
          // Very dark colors - use dark grays/blacks
          return lightness < 0.1 ? '#000000' : '#1a1a1a'
        } else if (lightness > 0.9) {
          // Very light colors - use light grays/whites
          return lightness > 0.98 ? '#ffffff' : '#f5f5f5'
        } else if (chroma > 0.1) {
          // Colors with high chroma - these are the orange/accent colors
          if (hue >= 35 && hue <= 55) {
            // Orange range - adjust based on lightness
            if (lightness > 0.7) return '#ff8c42'  // Light orange
            else if (lightness > 0.6) return '#ff6b35'  // Medium orange
            else return '#e55a2b'  // Darker orange
          }
        }
        
        // For low chroma colors (grays), use appropriate gray scale
        const grayValue = Math.round(lightness * 255)
        return `rgb(${grayValue}, ${grayValue}, ${grayValue})`
      }
    }
    
    // Fallback for other color formats
    return color.startsWith('rgb') ? color : '#000000'
  }

  const gradientColors = [
    convertColor(themeColors.background),
    convertColor(themeColors.muted),
    convertColor(themeColors.primary),
    convertColor(themeColors.accent),
    convertColor(themeColors.background)
  ]

  const wireframeColors = [
    convertColor(themeColors.background),
    convertColor(themeColors.muted),
    convertColor(themeColors.foreground),
    convertColor(themeColors.background)
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative overflow-hidden">
      {/* Fallback gradient background for when shaders are loading */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-background via-muted to-background opacity-80" />
      
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Background Shaders - Only render when mounted and on client side */}
      {isMounted && typeof window !== 'undefined' && (
        <>
          <MeshGradient
            className="absolute inset-0 w-full h-full"
            colors={gradientColors}
            speed={isActive ? 0.2 : 0.1}
          />
          <MeshGradient
            className="absolute inset-0 w-full h-full opacity-20"
            colors={wireframeColors}
            speed={isActive ? 0.15 : 0.05}
          />
        </>
      )}

      {children}
    </div>
  )
}