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
          background: '#020202',
          primary: '#f77036',
          accent: '#fd8965',
          muted: '#0b0b0b',
          foreground: '#eeeeee'
        })

  // Performance optimization: Only mount shaders after component is ready
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const updateThemeColors = () => {
      // Wait for next tick to ensure styles are computed
      requestAnimationFrame(() => {
        const root = document.documentElement
        const computedStyle = getComputedStyle(root)

        // Helper function to get CSS variable with fallbacks
        const getCSSVar = (varName: string, fallback: string) => {
          const value = computedStyle.getPropertyValue(varName).trim()
          return value || fallback
        }

        // Check if we're in dark mode
        const isDark = document.documentElement.classList.contains('dark') ||
          document.documentElement.getAttribute('data-theme') === 'dark'

        // Provide better fallbacks based on theme with more reliable detection
        const lightTheme = {
          background: '#fefefe',
          primary: '#ff6b35',
          accent: '#ff8c42',
          muted: '#f0f0f0',
          foreground: '#1a1a1a'
        }

        const darkTheme = {
          background: '#020202',
          primary: '#f77036',
          accent: '#fd8965',
          muted: '#0b0b0b',
          foreground: '#eeeeee'
        }

        // First try to get CSS variables, fallback to theme-appropriate defaults
        let newColors = isDark ? { ...darkTheme } : { ...lightTheme }

        // Try to read CSS variables (might fail in production)
        try {
          const cssVars = {
            background: getCSSVar('--background', ''),
            primary: getCSSVar('--primary', ''),
            accent: getCSSVar('--accent', ''),
            muted: getCSSVar('--muted', ''),
            foreground: getCSSVar('--foreground', '')
          }

          // Only use CSS variables if they're actually available
          Object.keys(cssVars).forEach(key => {
            const colorKey = key as keyof typeof newColors
            if (cssVars[colorKey] && cssVars[colorKey].trim() !== '') {
              newColors[colorKey] = cssVars[colorKey]
            }
          })
        } catch (error) {
          console.log('CSS variables not available, using theme defaults')
        }

        // Convert OKLCH colors to hex if needed
        const colorKeys = ['background', 'primary', 'accent', 'muted', 'foreground'] as const
        colorKeys.forEach(key => {
          const originalColor = newColors[key]
          newColors[key] = convertOklchToHex(newColors[key])

          // Debug log for production issues
          if (originalColor !== newColors[key]) {
            console.log(`Converted ${key}: ${originalColor} -> ${newColors[key]}`)
          }
        })

        setThemeColors(newColors)

        // Debug log in development
        console.log('Theme colors updated:', newColors)
        console.log('Is dark mode:', isDark)
      })
    }

    // Initial update with a delay to ensure CSS is loaded
    const initialTimer = setTimeout(updateThemeColors, 200)

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      let shouldUpdate = false
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' &&
          (mutation.attributeName === 'class' || mutation.attributeName === 'data-theme')) {
          shouldUpdate = true
        }
      })

      if (shouldUpdate) {
        setTimeout(updateThemeColors, 100)
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme']
    })

    // Listen for CSS load events (in case styles are loaded after component mount)
    const handleLoad = () => updateThemeColors()
    window.addEventListener('load', handleLoad)

    return () => {
      clearTimeout(initialTimer)
      observer.disconnect()
      window.removeEventListener('load', handleLoad)
    }
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

  // Enhanced OKLCH to hex conversion
  const convertOklchToHex = (color: string): string => {
    if (!color) return '#000000'

    // If it's already a hex color, return it
    if (color.startsWith('#')) return color

    // If it's an RGB color, convert to hex
    if (color.startsWith('rgb')) {
      const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
      if (match) {
        const r = parseInt(match[1]).toString(16).padStart(2, '0')
        const g = parseInt(match[2]).toString(16).padStart(2, '0')
        const b = parseInt(match[3]).toString(16).padStart(2, '0')
        return `#${r}${g}${b}`
      }
    }

    // If it's an oklch color, convert it to hex
    if (color.includes('oklch(')) {
      const match = color.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/)
      if (match) {
        const lightness = parseFloat(match[1])
        const chroma = parseFloat(match[2])
        const hue = parseFloat(match[3])

        // Use proper OKLCH to RGB conversion
        return oklchToHex(lightness, chroma, hue)
      }
    }

    // Fallback
    return color.startsWith('#') ? color : '#000000'
  }

  // Proper OKLCH to hex conversion function
  const oklchToHex = (l: number, c: number, h: number): string => {
    // Handle specific values from your CSS theme

    // Very dark colors (background dark mode)
    if (l <= 0.12 && c <= 0.02) {
      return l <= 0.08 ? '#0a0a0a' : '#1f1f1f'
    }

    // Very light colors (background light mode)
    if (l >= 0.94 && c <= 0.02) {
      return l >= 0.98 ? '#fefefe' : '#f5f5f5'
    }

    // Orange colors (primary/accent)
    if (c >= 0.12 && h >= 35 && h <= 55) {
      if (l >= 0.7) return '#ff8c42'  // Light orange accent
      if (l >= 0.65) return '#ff6b35' // Primary orange
      return '#e55a2b' // Darker orange
    }

    // Red-orange colors
    if (c >= 0.15 && h >= 20 && h <= 35) {
      if (l >= 0.7) return '#ff7043'
      return '#f4511e'
    }

    // Gray colors (muted, secondary)
    if (c <= 0.05) {
      const intensity = Math.round(l * 255)
      const hex = intensity.toString(16).padStart(2, '0')
      return `#${hex}${hex}${hex}`
    }

    // Fallback for other colors - maintain some color while being safe
    const r = Math.round((l + c * Math.cos(h * Math.PI / 180) * 0.5) * 255)
    const g = Math.round((l + c * Math.cos((h + 120) * Math.PI / 180) * 0.5) * 255)
    const b = Math.round((l + c * Math.cos((h + 240) * Math.PI / 180) * 0.5) * 255)

    const clamp = (val: number) => Math.max(0, Math.min(255, val))
    const toHex = (n: number) => clamp(n).toString(16).padStart(2, '0')

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }

  const gradientColors = [
    themeColors.background,
    themeColors.muted,
    themeColors.primary,
    themeColors.accent,
    themeColors.background
  ].filter(color => color && color !== '#000000') // Remove any black fallbacks

  const wireframeColors = [
    themeColors.background,
    themeColors.muted,
    themeColors.foreground,
    themeColors.background
  ].filter(color => color && color !== '#000000') // Remove any black fallbacks

  // Ensure we have at least some colors
  if (gradientColors.length < 3) {
    gradientColors.push('#ff6b35', '#ff8c42', '#f0f0f0')
  }

  if (wireframeColors.length < 3) {
    wireframeColors.push('#333333', '#ffffff', '#f0f0f0')
  }

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