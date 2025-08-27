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
  const [isDark, setIsDark] = useState(false)

  // Performance optimization: Only mount shaders after component is ready
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Robust theme detection for production
  useEffect(() => {
    const updateTheme = () => {
      if (typeof window === 'undefined') return
      
      // Multiple ways to detect dark mode for reliability
      const htmlEl = document.documentElement
      const darkClass = htmlEl.classList.contains('dark')
      const darkAttr = htmlEl.getAttribute('data-theme') === 'dark'
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      // Use class first, then attribute, then media query as fallback
      const newIsDark = darkClass || darkAttr || (!darkClass && !darkAttr && mediaQuery)
      
      setIsDark(newIsDark)
    }

    // Initial theme detection with multiple attempts for production
    updateTheme()
    setTimeout(updateTheme, 100)
    setTimeout(updateTheme, 500)
    
    // Listen for theme changes
    const observer = new MutationObserver(() => {
      setTimeout(updateTheme, 50)
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme', 'style']
    })

    // Also listen to system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleMediaChange = () => setTimeout(updateTheme, 50)
    mediaQuery.addEventListener('change', handleMediaChange)

    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
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

  // Static color definitions that match your CSS exactly
  const lightTheme = {
    background: '#fefefe',
    foreground: '#262626', 
    primary: '#ff6b35',
    accent: '#ff8c42',
    muted: '#f0f0f0'
  }

  const darkTheme = {
    background: '#141414',
    foreground: '#f3f3f3',
    primary: '#f77036', 
    accent: '#fd8965',
    muted: '#1f1f1f'
  }

  // Use theme-appropriate colors
  const colors = isDark ? darkTheme : lightTheme

  // Color arrays using the theme colors
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