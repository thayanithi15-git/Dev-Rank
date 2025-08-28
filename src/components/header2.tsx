"use client"


import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import ThemeToggleButton from "./ui/theme-toggle-button"
import AnimatedLoginButton from "./loginButton/loginbutton"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 md:px-10 md:py-2 transition-all duration-500",
        isScrolled
          ? "backdrop-blur-3xl bg-background/10 border-b border-white/20 shadow-2xl before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/[0.08] before:via-white/[0.05] before:to-white/[0.08] before:rounded-lg before:-z-10"
          : "bg-transparent border-b border-transparent",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {/* Logo */}
      <div className="flex items-center">
        {/* <svg
          fill="currentColor"
          viewBox="0 0 147 70"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="w-10 h-10 md:w-14 md:h-14 text-foreground"
        >
          <path d="M56 50.2031V14H70V60.1562C70 65.5928 65.5928 70 60.1562 70C57.5605 70 54.9982 68.9992 53.1562 67.1573L0 14H19.7969L56 50.2031Z"></path>
          <path d="M147 56H133V23.9531L100.953 56H133V70H96.6875C85.8144 70 77 61.1856 77 50.3125V14H91V46.1562L123.156 14H91V0H127.312C138.186 0 147 8.81439 147 19.6875V56Z"></path>

        </svg> */}

        <svg fill="currentColor" aria-hidden="true" className="w-8 h-8 md:w-10 md:h-10 text-foreground" viewBox="0 0 256 227" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
          <title>Tapcart</title>
          <g>
            <path d="M243.56268,83.2548079 L172.835493,12.5279481 C168.883105,8.55729097 164.184897,5.40655793 159.011302,3.25664474 C153.837707,1.10673154 148.29022,1.42108547e-14 142.687729,1.42108547e-14 C137.085239,1.42108547e-14 131.537752,1.10673154 126.364157,3.25664474 C121.190562,5.40655793 116.492354,8.55729097 112.539965,12.5279481 L81.0655716,44.1530775 C97.5194499,46.7776571 112.498713,55.1825716 123.312777,67.8584357 C134.126841,80.5341033 140.06721,96.6501035 140.06721,113.312209 C140.06721,129.974315 134.126841,146.090315 123.312777,158.765982 C112.498713,171.442305 97.5194499,179.846696 81.0655716,182.471799 L112.69057,214.126918 C116.642958,218.097641 121.341166,221.247896 126.514761,223.398267 C131.688356,225.547984 137.235843,226.654601 142.838334,226.654601 C148.440825,226.654601 153.988312,225.547984 159.161907,223.398267 C164.335502,221.247896 169.03371,218.097641 172.986098,214.126918 L243.56268,143.36961 C251.526389,135.394115 256,124.583325 256,113.312209 C256,102.041093 251.526389,91.2309577 243.56268,83.2548079 Z M80.1003927,45.1174052 L81.0649168,44.1526192 C71.0614984,42.5569963 60.8309289,43.1504439 51.0790856,45.8921021 C41.3271768,48.6338259 32.2861216,53.4583455 24.5796195,60.0330214 C16.8731174,66.6077628 10.6846441,74.7757697 6.44109795,83.9744359 C2.19757149,93.1724472 -4.12114787e-13,103.181759 -4.12114787e-13,113.312209 C-4.12114787e-13,123.442004 2.19757149,133.451316 6.44109795,142.649327 C10.6846441,151.847994 16.8731174,160.016 24.5796195,166.590873 C32.2861216,173.16509 41.3271768,177.989675 51.0790856,180.731334 C60.8309289,183.472992 71.0614984,184.066898 81.0649168,182.471144 L80.1003927,181.50662 C62.0217528,163.415735 51.8663547,138.887487 51.8663547,113.312209 C51.8663547,87.7362765 62.0217528,63.2077661 80.1003927,45.1174052 Z" />
          </g>
        </svg>

      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-2 lg:gap-6">
        <a
          href="#"
          className="text-foreground/95 hover:text-white hover:font-semibold text-sm font-medium px-4 py-2 rounded-full hover:bg-white/30 hover:backdrop-blur-sm transition-all duration-200 hover:shadow-lg"
        >
          Features
        </a>
        <a
          href="#"
          className="text-foreground/95 hover:text-white hover:font-semibold text-sm font-medium px-4 py-2 rounded-full hover:bg-white/30 hover:backdrop-blur-sm transition-all duration-200 hover:shadow-lg"
        >
          Pricing
        </a>
        <a
          href="#"
          className="text-foreground/95 hover:text-white hover:font-semibold text-sm font-medium px-4 py-2 rounded-full hover:bg-white/30 hover:backdrop-blur-sm transition-all duration-200 hover:shadow-lg"
        >
          Docs
        </a>
      </nav>

      {/* Right side controls - Desktop */}
      <div className="hidden md:flex items-center gap-4">
        <ThemeToggleButton />

        {/* Login Button Group with Arrow */}
        <AnimatedLoginButton />
      </div>

      {/* Mobile controls */}
      <div className="md:hidden flex items-center gap-3">
        <ThemeToggleButton />
        <button
          className="text-foreground p-2 rounded-full hover:bg-white/10 hover:backdrop-blur-sm transition-all duration-200 focus:outline-none hover:shadow-lg"
          aria-label="Open menu"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full right-4 mt-2 w-44 rounded-xl bg-background/90 backdrop-blur-3xl shadow-2xl border border-white/20 flex flex-col z-50 animate-fade-in before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/[0.05] before:to-white/[0.02] before:rounded-xl before:-z-10">
            <a
              href="#"
              className="px-5 py-3 text-foreground/95 hover:text-primary hover:bg-white/10 hover:backdrop-blur-sm rounded-t-xl text-base font-medium transition-all duration-150"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#"
              className="px-5 py-3 text-foreground/95 hover:text-primary hover:bg-white/10 hover:backdrop-blur-sm text-base font-medium transition-all duration-150"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#"
              className="px-5 py-3 text-foreground/95 hover:text-primary hover:bg-white/10 hover:backdrop-blur-sm text-base font-medium transition-all duration-150"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </a>
            <button
              className="mt-2 mb-2 mx-4 px-4 py-2 rounded-full bg-primary/80 backdrop-blur-sm text-primary-foreground font-medium text-base transition-all duration-200 hover:bg-primary/90 focus:outline-none shadow-lg border border-white/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </motion.header>
  )
}
