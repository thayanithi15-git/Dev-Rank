"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Github, Trophy, Users, Star, Code, Award } from "lucide-react"
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

    const DeveloperRankCard = ({ rank, name, score, avatar, delay = 0 }: { 
        rank: number; 
        name: string; 
        score: number; 
        avatar: string;
        delay?: number;
    }) => {
        const getRankColor = (rank: number) => {
            if (rank === 1) return "text-yellow-500 bg-yellow-500/20 border-yellow-500/40"
            if (rank === 2) return "text-slate-300 bg-slate-300/20 border-slate-300/40"
            if (rank === 3) return "text-orange-500 bg-orange-500/20 border-orange-500/40"
            return "text-primary bg-primary/20 border-primary/40"
        }

        const getRankIcon = (rank: number) => {
            if (rank <= 3) return <Award className="w-4 h-4" />
            return <Trophy className="w-4 h-4" />
        }

        return (
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative bg-card/60 backdrop-blur-xl border border-border/50 rounded-xl p-4 min-w-[220px] shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -8, scale: 1.02 }}
            >
                {/* Rank Badge */}
                <div className="flex items-center justify-between mb-3">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getRankColor(rank)} backdrop-blur-sm`}>
                        {getRankIcon(rank)}
                        <span className="font-bold text-sm">#{rank}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-full">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs text-muted-foreground font-medium">{score.toLocaleString()}</span>
                    </div>
                </div>
                
                {/* Developer Info */}
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 border-2 border-border/50 flex items-center justify-center overflow-hidden">
                        {avatar ? (
                            <Image src={avatar} alt={name} width={48} height={48} className="rounded-full object-cover" />
                        ) : (
                            <Code className="w-6 h-6 text-muted-foreground" />
                        )}
                    </div>
                    <div className="flex-1">
                        <h4 className="font-semibold text-foreground text-sm leading-tight">{name}</h4>
                        <p className="text-muted-foreground text-xs">Full Stack Developer</p>
                    </div>
                </div>
                
                {/* Stats */}
                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                    <div className="flex items-center gap-1">
                        <Github className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground font-medium">GitHub</span>
                        <span className="text-xs text-foreground font-semibold">500+</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Code className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-foreground font-semibold">150</span>
                    </div>
                </div>

                {/* Glow effect for top ranks */}
                {rank <= 3 && (
                    <div className={`absolute inset-0 rounded-xl ${getRankColor(rank).split(' ')[2]} opacity-20 blur-xl -z-10`} />
                )}
            </motion.div>
        )
    }

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen border flex flex-col justify-between overflow-hidden"
        >
            {/* Content */}
            <motion.div
                className="relative z-10 flex flex-1 items-center justify-center pt-20 pb-32"
                style={{ y: contentY, opacity: contentOpacity }}
            >
                <div className="w-full max-w-7xl px-4 mx-auto text-center flex flex-col items-center">

                    <Reveal>
                        <div
                            className="inline-flex border-border/50 shadow-lg hover:shadow-xl items-center px-4 py-2 rounded-full bg-card/40 backdrop-blur-xl mb-6 relative border transition-all duration-300"
                            style={{
                                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                            }}
                        >
                            <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full" />
                            <span className="text-foreground font-medium text-sm relative z-10">
                                🚀 The Ultimate Developer Ranking Platform
                            </span>
                        </div>
                    </Reveal>
                    <Reveal>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight mb-6 bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                            <AnimatedText text="Get Ranked." delay={0.5} />
                            <br />
                            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent italic font-extrabold">
                                <AnimatedText text="Get Hired." delay={1.1} />
                            </span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <motion.p
                            className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 leading-relaxed max-w-3xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                        >
                            Connect your GitHub, LeetCode, and coding profiles to showcase your skills. 
                            Get ranked in our developer community and let top recruiters discover your talent.
                        </motion.p>
                    </Reveal>


                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mb-1">
                        <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-transparent border border-border text-foreground font-medium text-sm transition-all duration-200 hover:bg-muted/50 hover:border-primary/50 cursor-pointer backdrop-blur-sm">
                            Browse Developers
                        </button>
                        <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm transition-all duration-200 hover:bg-primary/90 cursor-pointer shadow-lg hover:shadow-xl">
                            Join as Developer
                        </button>
                    </div>

                    {/* Developer Ranking Cards */}
                    <motion.div 
                        className="mt-8 relative w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                    >
                        {/* Desktop Layout */}
                        <div className="hidden lg:block">
                            <div className="grid grid-cols-5 gap-6 items-end max-w-6xl mx-auto">
                                {/* Rank 4 */}
                                <div className="flex justify-center">
                                    <DeveloperRankCard 
                                        rank={4} 
                                        name="Alex Rivera" 
                                        score={2156} 
                                        avatar="/images/avatars/cameron-williamson.png"
                                        delay={2.0}
                                    />
                                </div>
                                
                                {/* Rank 2 */}
                                <div className="flex justify-center">
                                    <div className="mb-8">
                                        <DeveloperRankCard 
                                            rank={2} 
                                            name="Sarah Chen" 
                                            score={2847} 
                                            avatar="/images/avatars/annette-black.png"
                                            delay={1.7}
                                        />
                                    </div>
                                </div>

                                {/* Rank 1 - Center and highest */}
                                <div className="flex flex-col items-center">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.8, delay: 1.6 }}
                                        className="mb-4"
                                    >
                                        <div className="text-center">
                                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 backdrop-blur-sm">
                                                <Trophy className="w-4 h-4 text-yellow-500" />
                                                <span className="text-yellow-500 font-semibold text-sm">Top Ranked</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                    <DeveloperRankCard 
                                        rank={1} 
                                        name="Marcus Johnson" 
                                        score={3542} 
                                        avatar="/images/avatars/robert-fox.png"
                                        delay={1.8}
                                    />
                                </div>

                                {/* Rank 3 */}
                                <div className="flex justify-center">
                                    <div className="mb-8">
                                        <DeveloperRankCard 
                                            rank={3} 
                                            name="Emma Williams" 
                                            score={2634} 
                                            avatar="/images/avatars/darlene-robertson.png"
                                            delay={1.9}
                                        />
                                    </div>
                                </div>
                                
                                {/* Rank 5 */}
                                <div className="flex justify-center">
                                    <DeveloperRankCard 
                                        rank={5} 
                                        name="David Kim" 
                                        score={1943} 
                                        avatar="/images/avatars/cody-fisher.png"
                                        delay={2.1}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tablet Layout */}
                        <div className="hidden md:block lg:hidden">
                            <div className="flex items-end justify-center gap-4 max-w-4xl mx-auto">
                                <DeveloperRankCard 
                                    rank={2} 
                                    name="Sarah Chen" 
                                    score={2847} 
                                    avatar="/images/avatars/annette-black.png"
                                    delay={1.7}
                                />
                                <div className="flex flex-col items-center">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.8, delay: 1.6 }}
                                        className="mb-4"
                                    >
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 backdrop-blur-sm">
                                            <Trophy className="w-4 h-4 text-yellow-500" />
                                            <span className="text-yellow-500 font-semibold text-sm">Top Ranked</span>
                                        </div>
                                    </motion.div>
                                    <DeveloperRankCard 
                                        rank={1} 
                                        name="Marcus Johnson" 
                                        score={3542} 
                                        avatar="/images/avatars/robert-fox.png"
                                        delay={1.8}
                                    />
                                </div>
                                <DeveloperRankCard 
                                    rank={3} 
                                    name="Emma Williams" 
                                    score={2634} 
                                    avatar="/images/avatars/darlene-robertson.png"
                                    delay={1.9}
                                />
                            </div>
                        </div>

                        {/* Mobile Layout - horizontal scroll */}
                        <div className="md:hidden overflow-x-auto pb-4">
                            <div className="flex gap-4 px-4 min-w-max">
                                <DeveloperRankCard 
                                    rank={1} 
                                    name="Marcus Johnson" 
                                    score={3542} 
                                    avatar="/images/avatars/robert-fox.png"
                                    delay={1.6}
                                />
                                <DeveloperRankCard 
                                    rank={2} 
                                    name="Sarah Chen" 
                                    score={2847} 
                                    avatar="/images/avatars/annette-black.png"
                                    delay={1.7}
                                />
                                <DeveloperRankCard 
                                    rank={3} 
                                    name="Emma Williams" 
                                    score={2634} 
                                    avatar="/images/avatars/darlene-robertson.png"
                                    delay={1.8}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Info Strip */}
            <motion.div
                className="w-full absolute bottom-0 left-0 right-0 z-20 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
                <BlurPanel className="mx-2 sm:mx-6 mb-4 sm:mb-6 px-3 sm:px-6 py-3 sm:py-4 bg-card/60 backdrop-blur-xl border-border/50 w-full max-w-2xl shadow-lg">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-muted-foreground w-full">
                        <div className="flex items-center gap-2">
                            <Github className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-foreground">GitHub Integration</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-accent" />
                            <span className="text-sm font-medium text-foreground">Global Rankings</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-foreground">Recruiter Access</span>
                        </div>
                    </div>
                </BlurPanel>
            </motion.div>

            {/* Gradient Transition Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-10" />
        </section>
    )
}
