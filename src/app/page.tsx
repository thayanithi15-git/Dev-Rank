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

        {/* Optional: Uncomment if you want the testimonial grid */}
        <AnimatedSection
          id="testimonials-section"
          className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16"
          delay={0.2}
        >
          <TestimonialGridSection />
        </AnimatedSection>


        <AnimatedSection id="faq-section" className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-7" delay={0.2}>
          <FAQSection />
        </AnimatedSection>

        <AnimatedSection className="relative z-10 w-full mt-8 md:mt-16" delay={0.2}>
          <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] max-w-[1320px] mx-auto px-4 md:px-6 lg:px-8">
            <Background src="./videos/alt.mp4" placeholder="/images/alt-placeholder.png" />
            <div className="relative z-10 flex flex-col justify-center items-center h-full gap-6 md:gap-8 lg:gap-9 max-w-4xl mx-auto px-4">
              <div className="flex flex-col justify-center items-center gap-3 md:gap-4 text-center">
                <h2 className="text-foreground text-2xl md:text-4xl lg:text-5xl xl:text-[68px] font-semibold leading-tight md:leading-tight lg:leading-[76px] break-words max-w-[300px] md:max-w-[435px]">
                  Coding made effortless
                </h2>
                <p className="text-muted-foreground text-xs md:text-sm lg:text-base font-medium leading-relaxed break-words max-w-lg md:max-w-xl lg:max-w-2xl px-2">
                  Hear how developers ship products faster, collaborate seamlessly, and build with confidence using Pointer's
                  powerful AI tools
                </p>
              </div>
              <Link href="https://vercel.com/home" target="_blank" rel="noopener noreferrer">
                <Button
                  className="px-6 md:px-8 lg:px-[30px] py-2 md:py-3 bg-secondary text-secondary-foreground text-sm md:text-base font-medium leading-6 rounded-[99px] shadow-[0px_0px_0px_4px_rgba(255,255,255,0.13)] hover:bg-secondary/90 transition-all duration-200"
                  size="lg"
                >
                  Signup for free
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
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