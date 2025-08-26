"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { memo } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
  className?: string
  id?: string
}

export const AnimatedSection = memo(function AnimatedSection({ 
  children, 
  className, 
  delay = 0,
  id,
  ...props 
}: AnimatedSectionProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94], 
        delay 
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
})
