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
                    <div
                        className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4 relative"
                        style={{
                            filter: "url(#glass-effect)",
                        }}
                    >
                        <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
                        <span className="text-white/90 text-xs font-light relative z-10">
                            ✨ New Paper Shaders Experience
                        </span>
                    </div>
                    <Reveal>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight mb-6">
                            <AnimatedText text="Design furniture for" delay={0.5} />
                            <br />
                            <span className="italic font-light">
                                <AnimatedText text="spaces that breathe." delay={1.1} />
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
                            Designed in Belgium, crafted to endure — timeless pieces for modern living.
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
                <BlurPanel className="mx-2 sm:mx-6 mb-4 sm:mb-6 px-3 sm:px-6 py-3 sm:py-4 bg-black/24 backdrop-blur-md border-white/20 w-full max-w-2xl">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-white/90 w-full">
                        <div className="flex items-center gap-2">
                            <PackageCheck className="w-4 h-4 text-green-400" />
                            <span className="text-sm">Free shipping</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Rocket className="w-4 h-4 text-amber-400" />
                            <span className="text-sm">Delivered in 6 weeks</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-blue-400" />
                            <span className="text-sm">Lifetime guarantee</span>
                        </div>
                    </div>
                </BlurPanel>
            </motion.div>

             {/* Gradient Transition Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10" />
        </section>
    )
}
