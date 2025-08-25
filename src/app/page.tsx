"use client"

import { Header } from "@/components/header2"
import { HeroSection } from "@/components/hero-section"
import PulsingCircle from "@/components/pulsing-circle"
import ShaderBackground from "@/components/shader-background"

export default function ShaderShowcase() {
  return (<>
    <ShaderBackground>
      <Header />
      <HeroSection />
      <PulsingCircle />
    </ShaderBackground>
  </>
  )
}
