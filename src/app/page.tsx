"use client"

import { Header } from "@/components/header2"
import { HeroSection } from "@/components/hero-section1"
import PulsingCircle from "@/components/pulsing-circle"
import ShaderBackground from "@/components/shader-background"
import { DashboardPreview } from "@/components/dashboard-preview"
import { SocialProof } from "@/components/social-proof"
import { BentoSection } from "@/components/bento-section"
import { LargeTestimonial } from "@/components/large-testimonial"
import { PricingSection } from "@/components/pricing-section"
import { TestimonialGridSection } from "@/components/testimonial-grid-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { FooterSection } from "@/components/footer-section"
import { AnimatedSection } from "@/components/animated-section"
import { Background } from "@/components/videobackground"

export default function ShaderShowcase() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section with Shader Background */}
      <div className="relative">
        <ShaderBackground>
          <Header />
          <HeroSection />
          <PulsingCircle />
        </ShaderBackground>

      </div>

      {/* Main Content with Themed Background */}
      <div className="relative bg-background">
        
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto px-6 pt-16" delay={0.1}>
          <SocialProof />
        </AnimatedSection>

        <AnimatedSection id="features-section" className="relative z-10 max-w-[1320px] mx-auto mt-10" delay={0.2}>
          <BentoSection />
        </AnimatedSection>
        
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-12" delay={0.2}>
          <LargeTestimonial />
        </AnimatedSection>

        <AnimatedSection
          id="pricing-section"
          className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16"
          delay={0.2}
        >
          <PricingSection />
        </AnimatedSection>
        
        {/* Optional: Uncomment if you want the testimonial grid
        <AnimatedSection
          id="testimonials-section"
          className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16"
          delay={0.2}
        >
          <TestimonialGridSection />
        </AnimatedSection> 
        */}
        
        <AnimatedSection id="faq-section" className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
          <FAQSection />
        </AnimatedSection>
        
        <AnimatedSection className="relative h-screen z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
        <Background src="./videos/alt.mp4" placeholder="/images/alt-placeholder.png" />
        </AnimatedSection>

        {/* <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
          <FooterSection />
        </AnimatedSection> */}
      </div>
    </div>
  )
}



// <div className="min-h-screen bg-background relative overflow-hidden pb-0">
//     <div className="relative z-10">
//       <main className="max-w-[1320px] mx-auto relative">
//         {/* <HeroSection /> */}
//         {/* Dashboard Preview Wrapper */}
//         <div className="absolute bottom-[-150px] md:bottom-[-400px] left-1/2 transform -translate-x-1/2 z-30">
//           <AnimatedSection>
//             <DashboardPreview />
//           </AnimatedSection>
//         </div>
//       </main>