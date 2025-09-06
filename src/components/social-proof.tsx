import Image from "next/image"
import { Github, Code, Trophy, Zap, Users, Briefcase, Globe, BookOpen } from "lucide-react"

export function SocialProof() {
  const platforms = [
    { 
      name: "GitHub", 
      icon: Github, 
      description: "Code repositories & contributions",
      color: "from-slate-600 to-slate-800",
      bgColor: "bg-slate-50 dark:bg-slate-900/50"
    },
    { 
      name: "LeetCode", 
      icon: Code, 
      description: "Algorithm & problem solving",
      color: "from-orange-500 to-yellow-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
    { 
      name: "HackerRank", 
      icon: Trophy, 
      description: "Coding challenges & contests",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    { 
      name: "CodeChef", 
      icon: Zap, 
      description: "Competitive programming",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    { 
      name: "Codeforces", 
      icon: Zap, 
      description: "Programming contests",
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-50 dark:bg-red-900/20"
    },
    { 
      name: "Stack Overflow", 
      icon: BookOpen, 
      description: "Community contributions",
      color: "from-orange-600 to-red-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
    { 
      name: "LinkedIn", 
      icon: Briefcase, 
      description: "Professional profile",
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    { 
      name: "Portfolio", 
      icon: Globe, 
      description: "Personal projects & websites",
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    }
  ]

  return (
    <section className="relative sm:py-16 border lg:py-16 overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-primary text-xs sm:text-sm font-medium">15+ Supported Platforms</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground px-2">
            Connect Your Developer
            <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Ecosystem</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Aggregate your coding profiles from multiple platforms to showcase your complete developer journey
          </p>
        </div>
        
        {/* Platform Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {platforms.map((platform, i) => {
            const IconComponent = platform.icon
            return (
              <div
                key={i}
                className={`group relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-border/50 ${platform.bgColor} backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-primary/30`}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-5 rounded-xl sm:rounded-2xl transition-opacity duration-500`}></div>
                
                {/* Mobile-optimized layout */}
                <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0">
                  {/* Icon with gradient background */}
                  <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 sm:mb-4 rounded-lg sm:rounded-xl bg-gradient-to-br ${platform.color} p-2 sm:p-2.5 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <IconComponent className="w-full h-full text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 sm:flex-none space-y-1 sm:space-y-2">
                    <h3 className="font-semibold text-foreground text-base sm:text-lg group-hover:text-primary transition-colors duration-300">
                      {platform.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {platform.description}
                    </p>
                    
                    {/* Connection Status */}
                    <div className="flex items-center gap-2 pt-1 sm:pt-2">
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-medium text-green-600 dark:text-green-400">Live Integration</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Stats Section */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-card/50 backdrop-blur-xl border border-border/50 shadow-xl">
            <div className="text-center space-y-1 sm:space-y-2">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                15+
              </div>
              <div className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Supported Platforms
              </div>
            </div>
            <div className="text-center space-y-1 sm:space-y-2">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                50K+
              </div>
              <div className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Active Developers
              </div>
            </div>
            <div className="text-center space-y-1 sm:space-y-2">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                1M+
              </div>
              <div className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Profile Connections
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}