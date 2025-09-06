'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggleButton = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (theme === 'dark' || (!theme && systemTheme)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <div className="p-8 bg-background min-h-screen flex items-center justify-center">
      <style jsx global>{`
        :root {
          --background: 0 0% 100%;
          --foreground: 222.2 84% 4.9%;
          --primary: 24 100% 60%;
          --primary-foreground: 210 40% 98%;
          --secondary: 210 40% 96%;
          --border: 214.3 31.8% 91.4%;
          --ring: 24 100% 60%;
        }
        
        .dark {
          --background: 222.2 84% 4.9%;
          --foreground: 210 40% 98%;
          --primary: 24 100% 60%;
          --primary-foreground: 222.2 84% 4.9%;
          --secondary: 217.2 32.6% 17.5%;
          --border: 217.2 32.6% 17.5%;
          --ring: 24 100% 60%;
        }
      `}</style>

      <motion.button
        onClick={toggleTheme}
        className="relative w-16 h-8 bg-secondary rounded-full p-1 cursor-pointer border-2 border-border hover:border-ring/50 transition-all duration-300 shadow-lg"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20"
          animate={{
            scale: isDark ? [1, 1.2, 1] : [1, 1.1, 1],
            opacity: isDark ? [0.3, 0.6, 0.3] : [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Toggle circle */}
        <motion.div
          className="relative w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-md"
          animate={{
            x: isDark ? 28 : 0,
            rotate: isDark ? 360 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            duration: 0.6
          }}
        >
          {/* Icon container with rotation */}
          <motion.div
            animate={{
              rotate: isDark ? 0 : 180,
              scale: isDark ? [1, 1.2, 1] : [1, 0.8, 1]
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut"
            }}
          >
            {isDark ? (
              <Moon className="w-3.5 h-3.5 text-primary-foreground" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-primary-foreground" />
            )}
          </motion.div>
        </motion.div>

        {/* Animated background track */}
        <motion.div
          className="absolute inset-1 rounded-full"
          animate={{
            backgroundColor: isDark 
              ? 'hsl(var(--primary) / 0.1)' 
              : 'hsl(var(--primary) / 0.05)'
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Particle effects */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              top: '50%',
              left: isDark ? '20%' : '80%',
            }}
            animate={{
              y: [-2, -6, -2],
              x: [0, Math.random() * 4 - 2, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.button>
    </div>
  );
};

export default ThemeToggleButton;