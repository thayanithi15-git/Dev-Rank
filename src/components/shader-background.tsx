"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { MeshGradient } from "@paper-design/shaders-react"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [themeColors, setThemeColors] = useState({
    background: '#000000',
    primary: '#ff6b35',
    accent: '#ff8c42',
    muted: '#333333',
    foreground: '#ffffff'
  })

  useEffect(() => {
    // Get CSS custom properties from the document
    const updateThemeColors = () => {
      const root = document.documentElement
      const computedStyle = getComputedStyle(root)

      setThemeColors({
        background: computedStyle.getPropertyValue('--background').trim() || '#000000',
        primary: computedStyle.getPropertyValue('--primary').trim() || '#ff6b35',
        accent: computedStyle.getPropertyValue('--accent').trim() || '#ff8c42',
        muted: computedStyle.getPropertyValue('--muted').trim() || '#333333',
        foreground: computedStyle.getPropertyValue('--foreground').trim() || '#ffffff'
      })
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
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  // Convert oklch colors to hex if needed
  const convertColor = (color: string): string => {
    if (color.startsWith('oklch(')) {
      // For now, return fallback colors for oklch values
      // In a real implementation, you might want to use a color conversion library
      if (color.includes('0.65 0.15 45')) return '#ff6b35' // Primary orange
      if (color.includes('0.7 0.12 35')) return '#ff8c42'  // Accent orange
      if (color.includes('0.08 0 0')) return '#141414'     // Dark background
      if (color.includes('0.95 0 0')) return '#f5f5f5'     // Light foreground
      return '#ff6b35' // Default orange
    }
    return color || '#ff6b35'
  }

  const gradientColors = [
    convertColor(themeColors.background),
    convertColor(themeColors.primary),
    convertColor(themeColors.accent),
    convertColor(themeColors.muted),
    convertColor(themeColors.foreground)
  ]

  const wireframeColors = [
    convertColor(themeColors.background),
    convertColor(themeColors.foreground),
    convertColor(themeColors.primary),
    convertColor(themeColors.background)
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative overflow-hidden">
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

      {/* Background Shaders */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={gradientColors}
        speed={isActive ? 0.5 : 0.3}
        backgroundColor={convertColor(themeColors.background)}
      />
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-60"
        colors={wireframeColors}
        speed={isActive ? 0.3 : 0.2}
        wireframe="true"
        backgroundColor="transparent"
      />

      {children}
    </div>
  )
}