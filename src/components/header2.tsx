"use client"


import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

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
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 md:px-10 md:py-2 transition-all duration-300",
        "backdrop-blur-md border-b border-white/[0.04]",
        isScrolled ? "bg-white/10 shadow-lg" : "bg-white/5",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {/* Logo */}
      <div className="flex items-center">
        <svg
          fill="currentColor"
          viewBox="0 0 147 70"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="w-10 h-10 md:w-14 md:h-14 text-white"
        >
          <path d="M56 50.2031V14H70V60.1562C70 65.5928 65.5928 70 60.1562 70C57.5605 70 54.9982 68.9992 53.1562 67.1573L0 14H19.7969L56 50.2031Z"></path>
          <path d="M147 56H133V23.9531L100.953 56H133V70H96.6875C85.8144 70 77 61.1856 77 50.3125V14H91V46.1562L123.156 14H91V0H127.312C138.186 0 147 8.81439 147 19.6875V56Z"></path>
        </svg>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-2 lg:gap-6">
        <a
          href="#"
          className="text-white/80 hover:text-white text-sm font-light px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          Features
        </a>
        <a
          href="#"
          className="text-white/80 hover:text-white text-sm font-light px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          Pricing
        </a>
        <a
          href="#"
          className="text-white/80 hover:text-white text-sm font-light px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          Docs
        </a>
      </nav>

      {/* Mobile menu button */}
      <div className="md:hidden flex items-center">
        <button
          className="text-white p-2 rounded-full hover:bg-white/10 transition-all duration-200 focus:outline-none"
          aria-label="Open menu"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full right-4 mt-2 w-44 rounded-xl bg-black/90 shadow-lg border border-white/10 flex flex-col z-50 animate-fade-in">
            <a
              href="#"
              className="px-5 py-3 text-white/90 hover:bg-white/10 rounded-t-xl text-base font-light transition-all duration-150"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#"
              className="px-5 py-3 text-white/90 hover:bg-white/10 text-base font-light transition-all duration-150"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#"
              className="px-5 py-3 text-white/90 hover:bg-white/10 text-base font-light transition-all duration-150"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </a>
            <button
              className="mt-2 mb-2 mx-4 px-4 py-2 rounded-full bg-white text-black font-medium text-base transition-all duration-200 hover:bg-white/90 focus:outline-none shadow"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </button>
          </div>
        )}
      </div>

      {/* Login Button Group with Arrow */}
      <div
        id="gooey-btn"
        className="relative items-center group ml-2 hidden md:flex"
        style={{ filter: "url(#gooey-filter)" }}
      >
        <button className="absolute right-0 px-3 py-2 rounded-full bg-white text-black font-normal text-sm transition-all duration-300 hover:bg-white/90 cursor-pointer h-10 items-center justify-center -translate-x-12 group-hover:-translate-x-20 z-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </button>
        <button className="px-6 py-2 rounded-full bg-white text-black font-normal text-sm transition-all duration-300 hover:bg-white/90 cursor-pointer h-10 flex items-center z-10 shadow-md">
          Login
        </button>
      </div>
    </motion.header>
  )
}
