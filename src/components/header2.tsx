"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { use, useEffect, useState } from "react"
import ThemeToggleButton from "./ui/theme-toggle-button"
import AnimatedLoginButton from "./loginButton/loginbutton"
import { useRouter } from "next/navigation"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const router = useRouter();

  const handleSignin = () => {
    router.push('/signin');
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [mobileMenuOpen])

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500",
        // Responsive padding
        "px-3 py-2 sm:px-4 sm:py-3 md:px-6 lg:px-10 md:py-2",
        // Responsive height
        "h-14 sm:h-16 md:h-18",
        isScrolled
          ? "backdrop-blur-3xl bg-background/10 border-b border-white/20 shadow-2xl before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/[0.08] before:via-white/[0.05] before:to-white/[0.08] before:rounded-lg before:-z-10"
          : "bg-transparent border-b border-transparent",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center">
            <svg fill="currentColor" aria-hidden="true" className="w-8 h-8 md:w-10 md:h-10 text-foreground" viewBox="0 0 256 227" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
              <title>Tapcart</title>
              <g>
                <path d="M243.56268,83.2548079 L172.835493,12.5279481 C168.883105,8.55729097 164.184897,5.40655793 159.011302,3.25664474 C153.837707,1.10673154 148.29022,1.42108547e-14 142.687729,1.42108547e-14 C137.085239,1.42108547e-14 131.537752,1.10673154 126.364157,3.25664474 C121.190562,5.40655793 116.492354,8.55729097 112.539965,12.5279481 L81.0655716,44.1530775 C97.5194499,46.7776571 112.498713,55.1825716 123.312777,67.8584357 C134.126841,80.5341033 140.06721,96.6501035 140.06721,113.312209 C140.06721,129.974315 134.126841,146.090315 123.312777,158.765982 C112.498713,171.442305 97.5194499,179.846696 81.0655716,182.471799 L112.69057,214.126918 C116.642958,218.097641 121.341166,221.247896 126.514761,223.398267 C131.688356,225.547984 137.235843,226.654601 142.838334,226.654601 C148.440825,226.654601 153.988312,225.547984 159.161907,223.398267 C164.335502,221.247896 169.03371,218.097641 172.986098,214.126918 L243.56268,143.36961 C251.526389,135.394115 256,124.583325 256,113.312209 C256,102.041093 251.526389,91.2309577 243.56268,83.2548079 Z M80.1003927,45.1174052 L81.0649168,44.1526192 C71.0614984,42.5569963 60.8309289,43.1504439 51.0790856,45.8921021 C41.3271768,48.6338259 32.2861216,53.4583455 24.5796195,60.0330214 C16.8731174,66.6077628 10.6846441,74.7757697 6.44109795,83.9744359 C2.19757149,93.1724472 -4.12114787e-13,103.181759 -4.12114787e-13,113.312209 C-4.12114787e-13,123.442004 2.19757149,133.451316 6.44109795,142.649327 C10.6846441,151.847994 16.8731174,160.016 24.5796195,166.590873 C32.2861216,173.16509 41.3271768,177.989675 51.0790856,180.731334 C60.8309289,183.472992 71.0614984,184.066898 81.0649168,182.471144 L80.1003927,181.50662 C62.0217528,163.415735 51.8663547,138.887487 51.8663547,113.312209 C51.8663547,87.7362765 62.0217528,63.2077661 80.1003927,45.1174052 Z" />
              </g>
            </svg>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg md:text-xl font-bold text-foreground">DevRank</h1>
            <p className="text-xs text-muted-foreground -mt-1">Developer Rankings</p>
          </div>
        </div>
      </div>

      {/* Desktop Navigation - Hidden on mobile/tablet */}
      <nav className="hidden lg:flex items-center gap-1 xl:gap-6">
        <a
          href="#rankings"
          className="text-foreground/95 hover:text-white hover:font-semibold text-sm font-medium px-4 py-2 rounded-full hover:bg-white/30 hover:backdrop-blur-sm transition-all duration-200 hover:shadow-lg"
        >
          Rankings
        </a>
        <a
          href="#developers"
          className="text-foreground/95 hover:text-white hover:font-semibold text-sm font-medium px-4 py-2 rounded-full hover:bg-white/30 hover:backdrop-blur-sm transition-all duration-200 hover:shadow-lg"
        >
          Developers
        </a>
        <a
          href="#for-recruiters"
          className="text-foreground/95 hover:text-white hover:font-semibold text-sm font-medium px-4 py-2 rounded-full hover:bg-white/30 hover:backdrop-blur-sm transition-all duration-200 hover:shadow-lg"

        >
          For Recruiters
        </a>
        <a
          href="#pricing"
          className="text-foreground/95 hover:text-white hover:font-semibold text-sm font-medium px-4 py-2 rounded-full hover:bg-white/30 hover:backdrop-blur-sm transition-all duration-200 hover:shadow-lg"
        >
          Pricing
        </a>
      </nav>

      {/* Right side controls - Desktop */}
      <div className="hidden lg:flex items-center gap-3 xl:gap-4">
        <ThemeToggleButton />

        {/* Login Button Group with Arrow - Updated for DevRank */}
        <div
          id="gooey-btn"
          className="relative flex items-center group"
          style={{ filter: "url(#gooey-filter)" }}
        >
          <button className="absolute right-0 px-3 py-2 rounded-full bg-primary/80 backdrop-blur-sm text-primary-foreground font-normal text-sm transition-all duration-300 hover:bg-primary/90 cursor-pointer h-10 flex items-center justify-center -translate-x-16 group-hover:-translate-x-24 z-0 border border-white/20">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </button>
          <button className="px-6 py-2 rounded-full bg-primary/80 backdrop-blur-sm text-primary-foreground font-normal text-sm transition-all duration-300 hover:bg-primary/90 cursor-pointer h-10 flex items-center z-10 shadow-lg border border-white/20">
            Join DevRank
          </button>

        </div>
      </div>

      {/* Mobile/Tablet controls */}
      <div className="lg:hidden flex items-center gap-2 sm:gap-3 mobile-menu-container relative">
        <ThemeToggleButton />
        <button
          className="text-foreground p-1.5 sm:p-2 rounded-full hover:bg-white/10 hover:backdrop-blur-sm transition-all duration-200 focus:outline-none hover:shadow-lg"
          aria-label="Open menu"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          <svg
            width="24"
            height="24"
            className="sm:w-7 sm:h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile dropdown menu - Improved positioning and responsiveness */}
        {mobileMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-40 sm:w-44 md:w-48 rounded-xl bg-background/90 backdrop-blur-3xl shadow-2xl border border-white/20 flex flex-col z-50 animate-fade-in before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/[0.05] before:to-white/[0.02] before:rounded-xl before:-z-10">
            <a
              href="#rankings"
              className="px-5 py-3 text-foreground/95 hover:text-primary hover:bg-white/10 hover:backdrop-blur-sm rounded-t-xl text-base font-medium transition-all duration-150"

              onClick={() => setMobileMenuOpen(false)}
            >
              Rankings
            </a>
            <a
              href="#developers"
              className="px-5 py-3 text-foreground/95 hover:text-primary hover:bg-white/10 hover:backdrop-blur-sm text-base font-medium transition-all duration-150"
              onClick={() => setMobileMenuOpen(false)}
            >
              Developers
            </a>
            <a
              href="#for-recruiters"
              className="px-5 py-3 text-foreground/95 hover:text-primary hover:bg-white/10 hover:backdrop-blur-sm text-base font-medium transition-all duration-150"
              onClick={() => setMobileMenuOpen(false)}
            >
              For Recruiters
            </a>
            <a
              href="#pricing"
              className="px-5 py-3 text-foreground/95 hover:text-primary hover:bg-white/10 hover:backdrop-blur-sm text-base font-medium transition-all duration-150"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <button
              className="mt-1.5 sm:mt-2 mb-1.5 sm:mb-2 mx-3 sm:mx-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/80 backdrop-blur-sm text-primary-foreground font-medium text-sm sm:text-base transition-all duration-200 hover:bg-primary/90 focus:outline-none shadow-lg border border-white/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              Join DevRank
            </button>
          </div>
        )}
      </div>
    </motion.header>
  )
}