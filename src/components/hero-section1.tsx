"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { PackageCheck, Rocket, ShieldCheck } from "lucide-react"
import { Reveal } from "./reveal"
import { BlurPanel } from "./blur-panel"

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    })

    const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 0.95])
    const imageY = useTransform(scrollYProgress, [0, 1], [0, -50])
    const contentY = useTransform(scrollYProgress, [0, 1], [0, 100])
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
        return (
            <span>
                {text.split("").map((char, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: delay + index * 0.03,
                            ease: [0.21, 0.47, 0.32, 0.98],
                        }}
                        style={{ display: char === " " ? "inline" : "inline-block" }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </span>
        )
    }

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex flex-col justify-between overflow-hidden"
        >
            {/* Content */}
            <motion.div
                className="relative z-10 flex flex-1 items-center justify-center"
                style={{ y: contentY, opacity: contentOpacity }}
            >
                <div className="w-full max-w-5xl px-4 mx-auto text-center text-white flex flex-col items-center">

                    <Reveal>
                        <div
                            className="inline-flex border-white/30 shadow-sm hover:shadow-2xl items-center px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm mb-6 relative border"
                            style={{
                                boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full" />
                            <span className="text-white font-medium text-sm relative z-10">
                                🚀 Revolutionizing Developer Rankings
                            </span>
                        </div>
                    </Reveal>
                    <Reveal>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight mb-6 bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                            <AnimatedText text="Elevate your" delay={0.5} />
                            <br />
                            <span className="text-white italic bg-clip-text font-extrabold">
                                <AnimatedText text="coding journey" delay={1.1} />
                            </span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <motion.p
                            className="text-base sm:text-lg md:text-xl text-white/90 mb-8 md:mb-12 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                        >
                            Join the next generation of developers. Track your progress, compete globally, and showcase your skills with our comprehensive ranking platform.
                        </motion.p>
                    </Reveal>


                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                        <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer">
                            Pricing
                        </button>
                        <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-white text-black font-normal text-xs transition-all duration-200 hover:bg-white/90 cursor-pointer">
                            Get Started
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Info Strip */}
            <motion.div
                className="w-full absolute bottom-0 left-0 right-0 z-20 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
                <BlurPanel className="mx-2 sm:mx-6 mb-4 sm:mb-6 px-3 sm:px-6 py-3 sm:py-4 bg-card/80 backdrop-blur-md border-border w-full max-w-2xl professional-shadow">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-muted-foreground w-full">
                        <div className="flex items-center gap-2">
                            <PackageCheck className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">Free to start</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Rocket className="w-4 h-4 text-accent" />
                            <span className="text-sm font-medium">Real-time rankings</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">GitHub integration</span>
                        </div>
                    </div>
                </BlurPanel>
            </motion.div>

            {/* Gradient Transition Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10" />
        </section>
    )
}
