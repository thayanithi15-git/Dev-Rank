"use client"

import { Twitter, Github, Linkedin, Mail, ArrowRight, Heart, Code, Users, TrendingUp, Shield, Zap } from "lucide-react"
import { Button } from "./ui/button"

export function FooterSection() {
  return (
    <footer className="relative w-full bg-gradient-to-b from-background to-muted/30">
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 theme-bg-pattern pointer-events-none" /> */}
      
      <div className="relative w-full max-w-[1320px] mx-auto px-5">
        {/* Top Section - Newsletter & CTA */}
        <div className="py-12 md:py-16 border-b border-border/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                Stay ahead of the curve
              </h3>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Get the latest developer insights, rankings, and industry trends delivered to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                />
              </div>
              <Button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 flex items-center gap-2 whitespace-nowrap">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <svg 
                    fill="currentColor" 
                    aria-hidden="true" 
                    className="w-10 h-10 text-primary" 
                    viewBox="0 0 256 227" 
                    version="1.1" 
                    xmlns="http://www.w3.org/2000/svg" 
                    preserveAspectRatio="xMidYMid"
                  >
                    <title>Dev Rank</title>
                    <g>
                      <path d="M243.56268,83.2548079 L172.835493,12.5279481 C168.883105,8.55729097 164.184897,5.40655793 159.011302,3.25664474 C153.837707,1.10673154 148.29022,1.42108547e-14 142.687729,1.42108547e-14 C137.085239,1.42108547e-14 131.537752,1.10673154 126.364157,3.25664474 C121.190562,5.40655793 116.492354,8.55729097 112.539965,12.5279481 L81.0655716,44.1530775 C97.5194499,46.7776571 112.498713,55.1825716 123.312777,67.8584357 C134.126841,80.5341033 140.06721,96.6501035 140.06721,113.312209 C140.06721,129.974315 134.126841,146.090315 123.312777,158.765982 C112.498713,171.442305 97.5194499,179.846696 81.0655716,182.471799 L112.69057,214.126918 C116.642958,218.097641 121.341166,221.247896 126.514761,223.398267 C131.688356,225.547984 137.235843,226.654601 142.838334,226.654601 C148.440825,226.654601 153.988312,225.547984 159.161907,223.398267 C164.335502,221.247896 169.03371,218.097641 172.986098,214.126918 L243.56268,143.36961 C251.526389,135.394115 256,124.583325 256,113.312209 C256,102.041093 251.526389,91.2309577 243.56268,83.2548079 Z M80.1003927,45.1174052 L81.0649168,44.1526192 C71.0614984,42.5569963 60.8309289,43.1504439 51.0790856,45.8921021 C41.3271768,48.6338259 32.2861216,53.4583455 24.5796195,60.0330214 C16.8731174,66.6077628 10.6846441,74.7757697 6.44109795,83.9744359 C2.19757149,93.1724472 -4.12114787e-13,103.181759 -4.12114787e-13,113.312209 C-4.12114787e-13,123.442004 2.19757149,133.451316 6.44109795,142.649327 C10.6846441,151.847994 16.8731174,160.016 24.5796195,166.590873 C32.2861216,173.16509 41.3271768,177.989675 51.0790856,180.731334 C60.8309289,183.472992 71.0614984,184.066898 81.0649168,182.471144 L80.1003927,181.50662 C62.0217528,163.415735 51.8663547,138.887487 51.8663547,113.312209 C51.8663547,87.7362765 62.0217528,63.2077661 80.1003927,45.1174052 Z" />
                    </g>
                  </svg>
                  <div className="absolute -inset-1 bg-primary/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="text-foreground text-2xl font-bold">Dev Rank</div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                Empowering developers with intelligent insights, comprehensive rankings, and data-driven growth strategies.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="text-center p-3 bg-card rounded-lg border border-border">
                  <div className="text-xl font-bold text-primary">50K+</div>
                  <div className="text-xs text-muted-foreground">Developers</div>
                </div>
                <div className="text-center p-3 bg-card rounded-lg border border-border">
                  <div className="text-xl font-bold text-primary">1M+</div>
                  <div className="text-xs text-muted-foreground">Repositories</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground">Follow Us</h4>
                <div className="flex gap-3">
                  <a 
                    href="https://twitter.com/devrank" 
                    aria-label="Follow us on X (Twitter)" 
                    className="group w-10 h-10 flex items-center justify-center rounded-full bg-card border border-border hover:border-primary hover:bg-primary transition-all duration-200"
                  >
                    <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-200" />
                  </a>
                  <a 
                    href="https://github.com/devrank" 
                    aria-label="Follow us on GitHub" 
                    className="group w-10 h-10 flex items-center justify-center rounded-full bg-card border border-border hover:border-primary hover:bg-primary transition-all duration-200"
                  >
                    <Github className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-200" />
                  </a>
                  <a 
                    href="https://linkedin.com/company/devrank" 
                    aria-label="Connect with us on LinkedIn" 
                    className="group w-10 h-10 flex items-center justify-center rounded-full bg-card border border-border hover:border-primary hover:bg-primary transition-all duration-200"
                  >
                    <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-200" />
                  </a>
                  <a 
                    href="mailto:hello@devrank.com" 
                    aria-label="Send us an email" 
                    className="group w-10 h-10 flex items-center justify-center rounded-full bg-card border border-border hover:border-primary hover:bg-primary transition-all duration-200"
                  >
                    <Mail className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-200" />
                  </a>
                </div>
              </div>
            </div>

            {/* Navigation Sections */}
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
              
              {/* Platform */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-foreground">Platform</h3>
                </div>
                <nav className="space-y-3">
                  <a href="#dashboard" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    Analytics Dashboard
                  </a>
                  <a href="#rankings" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    Developer Rankings
                  </a>
                  <a href="#insights" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    Code Insights
                  </a>
                  <a href="#trends" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    Technology Trends
                  </a>
                  <a href="#integrations" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    GitHub Integration
                  </a>
                  <a href="#api" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    Developer API
                  </a>
                </nav>
              </div>

              {/* Community */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-foreground">Community</h3>
                </div>
                <nav className="space-y-3">
                  <a href="#leaderboards" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    Leaderboards
                  </a>
                  <a href="#challenges" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    Coding Challenges
                  </a>
                  <a href="#forums" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    Discussion Forums
                  </a>
                  <a href="#events" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    Developer Events
                  </a>
                  <a href="#mentorship" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    Mentorship Program
                  </a>
                  <a href="#blog" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    Developer Blog
                  </a>
                </nav>
              </div>

              {/* Company & Support */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-foreground">Company</h3>
                </div>
                <nav className="space-y-3">
                  <a href="#about" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    About Us
                  </a>
                  <a href="#careers" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    Careers
                  </a>
                  <a href="#press" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    Press Kit
                  </a>
                  <a href="#contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                    Contact
                  </a>
                </nav>
                
                <div className="pt-4 border-t border-border/50">
                  <h4 className="font-semibold text-foreground text-sm mb-3">Support</h4>
                  <nav className="space-y-3">
                    <a href="#help" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                      Help Center
                    </a>
                    <a href="#docs" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                      Documentation
                    </a>
                    <a href="#status" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
                      System Status
                    </a>
                  </nav>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>© 2025 Dev Rank. All rights reserved.</span>
              <div className="hidden md:flex items-center gap-1 text-xs">
                <span>Made with</span>
                <Heart className="w-3 h-3 text-red-500 fill-current" />
                <span>by developers, for developers</span>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#privacy" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#terms" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#cookies" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}