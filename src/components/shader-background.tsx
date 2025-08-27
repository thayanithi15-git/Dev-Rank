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
  const [colors, setColors] = useState({
    background: '#020202',
    foreground: '#eeeeee',
    primary: '#f77036',
    accent: '#fd8965',
    muted: '#0b0b0b'
  })

  // Performance optimization: Only mount shaders after component is ready
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Get computed CSS colors and convert OKLCH to hex
  useEffect(() => {
    const updateColors = () => {
      if (typeof window === 'undefined') return
      
      const style = getComputedStyle(document.documentElement)
      const isDark = document.documentElement.classList.contains('dark')
      
      // Fallback colors based on theme
      const fallbacks = isDark ? {
        background: '#020202',
        foreground: '#eeeeee', 
        primary: '#f77036',
        accent: '#fd8965',
        muted: '#0b0b0b'
      } : {
        background: '#fefefe',
        foreground: '#1a1a1a',
        primary: '#ff6b35', 
        accent: '#ff8c42',
        muted: '#f0f0f0'
      }
      
      const convertOklchToHex = (oklchValue: string, fallback: string): string => {
        if (!oklchValue || oklchValue.trim() === '') return fallback
        
        // If it's already a hex color, return it
        if (oklchValue.startsWith('#')) return oklchValue
        
        // Parse OKLCH values
        const match = oklchValue.match(/oklch\(([^)]+)\)/)
        if (!match) return fallback
        
        const values = match[1].split(' ').map(v => parseFloat(v.trim()))
        if (values.length < 3) return fallback
        
        const [l, c, h] = values
        
        // Convert specific OKLCH values to known hex colors
        // Background colors
        if (l <= 0.1 && c <= 0.02) return isDark ? '#020202' : '#fefefe'
        if (l >= 0.95 && c <= 0.02) return isDark ? '#eeeeee' : '#1a1a1a'
        
        // Orange primary colors (around hue 42-45)
        if (c >= 0.15 && h >= 40 && h <= 50) {
          if (l >= 0.7) return isDark ? '#f77036' : '#ff6b35'
          if (l >= 0.65) return '#ff6b35'
          return '#e55a2b'
        }
        
        // Orange accent colors (around hue 35-40) 
        if (c >= 0.12 && h >= 30 && h <= 40) {
          if (l >= 0.75) return isDark ? '#fd8965' : '#ff8c42'
          return '#ff7043'
        }
        
        // Muted colors (low chroma)
        if (c <= 0.05) {
          if (l <= 0.15) return isDark ? '#0b0b0b' : '#f0f0f0'
          if (l >= 0.9) return isDark ? '#f0f0f0' : '#0b0b0b'
          const intensity = Math.round(l * 255)
          const hex = intensity.toString(16).padStart(2, '0')
          return `#${hex}${hex}${hex}`
        }
        
        return fallback
      }
      
      setColors({
        background: convertOklchToHex(style.getPropertyValue('--background'), fallbacks.background),
        foreground: convertOklchToHex(style.getPropertyValue('--foreground'), fallbacks.foreground),
        primary: convertOklchToHex(style.getPropertyValue('--primary'), fallbacks.primary),
        accent: convertOklchToHex(style.getPropertyValue('--accent'), fallbacks.accent),
        muted: convertOklchToHex(style.getPropertyValue('--muted'), fallbacks.muted)
      })
    }

    // Initial update with delay to ensure CSS is loaded
    setTimeout(updateColors, 200)
    
    // Listen for theme changes
    const observer = new MutationObserver(() => {
      setTimeout(updateColors, 100)
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme']
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Throttle mouse events to improve performance
    let mouseTimeout: NodeJS.Timeout

    const handleMouseEnter = () => {
      clearTimeout(mouseTimeout)
      setIsActive(true)
    }

    const handleMouseLeave = () => {
      mouseTimeout = setTimeout(() => setIsActive(false), 300)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter, { passive: true })
      container.addEventListener("mouseleave", handleMouseLeave, { passive: true })
    }

    return () => {
      clearTimeout(mouseTimeout)
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  // Color arrays using the computed CSS values
  const gradientColors = [
    colors.background,
    colors.muted,
    colors.primary,
    colors.accent,
    colors.background
  ]

  const wireframeColors = [
    colors.background,
    colors.muted,
    colors.foreground,
    colors.background
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