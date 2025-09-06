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
import { FooterSection } from "@/components/footer-section"
import { AnimatedSection } from "@/components/animated-section"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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

        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto px-6 pt-14" delay={0.1}>
          <SocialProof />
        </AnimatedSection>

        <AnimatedSection id="features-section" className="relative z-10 max-w-[1320px] mx-auto" delay={0.2}>
          <BentoSection />
        </AnimatedSection>

        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto" delay={0.2}>
          <LargeTestimonial />
        </AnimatedSection>

        <AnimatedSection
          id="pricing-section"
          className="relative z-10 max-w-[1320px] mx-auto"
          delay={0.2}
        >
          <PricingSection />
        </AnimatedSection>

        {/* Optional: Uncomment if you want the testimonial grid */}
        <AnimatedSection
          id="testimonials-section"
          className="relative z-10 max-w-[1320px] mx-auto"
          delay={0.2}
        >
          <TestimonialGridSection />
        </AnimatedSection>


        <AnimatedSection id="faq-section" className="relative z-10 max-w-[1320px] mx-auto" delay={0.2}>
          <FAQSection />
        </AnimatedSection>

        <AnimatedSection className="relative z-10 w-full mt-8 md:mt-16" delay={0.2}>
          <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] max-w-[1320px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-muted/20 to-secondary rounded-2xl" />
            <div className="relative z-10 flex flex-col justify-center items-center h-full gap-4 md:gap-6 lg:gap-8 max-w-4xl mx-auto px-4">
              <div className="flex flex-col justify-center items-center gap-2 md:gap-3 text-center">
                <h2 className="text-foreground text-xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight break-words max-w-[300px] md:max-w-[435px]">
                  Join the DevRank Revolution
                </h2>
                <p className="text-muted-foreground text-xs md:text-sm lg:text-base font-medium leading-relaxed break-words max-w-lg md:max-w-xl px-2">
                  Sign up today and take the first step towards elevating your developer journey or recruitment process
                </p>
                <p className="text-muted-foreground text-xs md:text-sm lg:text-base font-medium leading-relaxed break-words max-w-lg md:max-w-xl px-2">
                  {"No credit card required. Start your free trial now!"}
                </p>
              </div>
              <Link href="https://vercel.com/home" target="_blank" rel="noopener noreferrer">
                <Button
                  className="px-4 md:px-6 lg:px-8 py-2 md:py-3 bg-primary text-primary-foreground text-sm md:text-base font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200 border border-border/20"
                  size="lg"
                >
                  Signup for free
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-26" delay={0.2}>
          <FooterSection />
          
        </AnimatedSection>
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