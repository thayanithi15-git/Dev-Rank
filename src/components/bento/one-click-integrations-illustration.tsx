import React, { useState, useEffect } from "react"

interface PlatformRankingsProps {
  className?: string
}

const PlatformRankings: React.FC<PlatformRankingsProps> = ({ className = "" }) => {
  const [animatedPercentages, setAnimatedPercentages] = useState<Record<string, number>>({})

  // Platform data with rankings
  const platforms = [
    { name: "GitHub", percentage: 92 },
    { name: "LeetCode", percentage: 78 },
    { name: "LinkedIn", percentage: 85 },
    { name: "CodeChef", percentage: 67 },
    { name: "HackerRank", percentage: 73 },
    { name: "Codeforces", percentage: 81 },
    // { name: "Stack Overflow", percentage: 89 },
    // { name: "GeeksforGeeks", percentage: 76 },
  ]

  // Animation effect for percentages
  useEffect(() => {
    const timer = setTimeout(() => {
      platforms.forEach((platform, index) => {
        setTimeout(() => {
          let current = 0
          const increment = platform.percentage / 30
          const animate = () => {
            current += increment
            if (current <= platform.percentage) {
              setAnimatedPercentages(prev => ({
                ...prev,
                [platform.name]: Math.min(Math.floor(current), platform.percentage)
              }))
              requestAnimationFrame(animate)
            }
          }
          animate()
        }, index * 100)
      })
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="px-7 py-2 transition-all duration-300">

        {/* Platforms List */}
        <div className="space-y-3 sm:space-y-4">
          {platforms.map((platform) => {
            const percentage = animatedPercentages[platform.name] || 0
            return (
              <div key={platform.name} className="flex items-center justify-between">
                {/* Platform name */}
                <span className="text-sm sm:text-base font-medium text-foreground flex-1 min-w-0">
                  <span className="truncate">{platform.name}</span>
                </span>
                
                {/* Progress bar and percentage */}
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  {/* Progress bar */}
                  <div className="w-16 sm:w-20 h-2 bg-muted/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  
                  {/* Percentage text */}
                  <span className="text-sm sm:text-base font-bold text-foreground min-w-[2.5rem] text-right">
                    {percentage}%
                  </span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default PlatformRankings