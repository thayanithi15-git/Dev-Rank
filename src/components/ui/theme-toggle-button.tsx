"use client"

import React from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"


import { Switch } from "@/components/animate-ui/base/switch"

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

    console.log("style ELement", styleElement)
    console.log("name", name)

    if (!styleElement) {
      styleElement = document.createElement("style")
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }

    styleElement.textContent = css

    console.log("content updated")
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
  }, [theme, setTheme])

  return (
    <div className="flex items-center">
      <Switch
        checked={theme === "dark"}
        onCheckedChange={() => toggleTheme()}
        leftIcon={<SunIcon className="size-5" />}
        rightIcon={<MoonIcon className="size-5" />}
        thumbIcon={theme === "dark" ? <MoonIcon className="size-3" /> : <SunIcon className="size-3" />}
        aria-label="Theme Toggle Button"
        className="mx-1"
      />
      <span className="sr-only">Theme Toggle</span>
      {showLabel && (
        <>
          <span className="ml-2 border rounded-full px-2">
            variant = {variant}
          </span>
          <span className="ml-2 border rounded-full px-2">
            start = {start}
          </span>
        </>
      )}
    </div>
  )
}
