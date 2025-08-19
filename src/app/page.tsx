'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Code2,
  Trophy,
  TrendingUp,
  Users,
  Star,
  Github,
  ChevronRight,
  Bot,
  BarChart3,
  Shield,
  Zap,
  Brain,
  Target,
  ArrowRight,
  CheckCircle,
  Moon,
  Sun
} from 'lucide-react';
import { Header } from '@/components/ui/header';
import { ModeToggle } from '@/components/toggle-theme';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/ui/app-sidebar';

export default function DevRankPage() {
  const [isDark, setIsDark] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Analysis",
      description: "Advanced algorithms analyze your code quality, contributions, and technical skills across multiple platforms."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Comprehensive Metrics",
      description: "Track performance across GitHub, Stack Overflow, coding challenges, and open-source contributions."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Skill Assessment",
      description: "Get detailed insights into your strengths and areas for improvement with personalized recommendations."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Verified Rankings",
      description: "Tamper-proof ranking system with blockchain verification and transparent scoring methodology."
    }
  ];

  const topDevelopers = [
    { name: "Alex Chen", rank: 1, score: 98.5, specialty: "Full Stack", avatar: "AC" },
    { name: "Sarah Kim", rank: 2, score: 97.2, specialty: "Machine Learning", avatar: "SK" },
    { name: "Marcus Johnson", rank: 3, score: 96.8, specialty: "DevOps", avatar: "MJ" },
    { name: "Elena Rodriguez", rank: 4, score: 95.9, specialty: "Frontend", avatar: "ER" }
  ];

  return (
    // <SidebarProvider defaultOpen={true}>
    //     <AppSidebar />
    <div className={`min-h-screen bg-background text-foreground transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/95 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Code2 className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              DevRank
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#rankings" className="text-muted-foreground hover:text-foreground transition-colors">Rankings</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </nav>

          <div className="flex items-center space-x-4">
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button> */}
            <ModeToggle />
            <Button variant="outline" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-primary to-chart-2 hover:opacity-90">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* <Header className="w-full flex justify-between border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <ProfileDropdown />
        </div>
      </Header> */}

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div
            className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
              }`}
          >
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <Bot className="h-4 w-4 mr-2" />
              AI-Powered Developer Insights
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-chart-2 bg-clip-text text-transparent leading-tight">
              Rank Your Developer Skills with AI Precision
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get comprehensive analysis of your coding abilities, track your progress, and discover where you stand among developers worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-primary to-chart-2 hover:opacity-90 px-8">
                <Zap className="h-5 w-5 mr-2" />
                Analyze My Profile
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                <Github className="h-5 w-5 mr-2" />
                Connect GitHub
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { label: "Developers Ranked", value: "50K+" },
              { label: "Skills Analyzed", value: "200+" },
              { label: "Code Repositories", value: "1M+" },
              { label: "AI Accuracy", value: "99.2%" }
            ].map((stat, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-1000 delay-${index * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
              >
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose DevRank?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform provides the most comprehensive developer assessment available today.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50"
              >
                <CardHeader>
                  <div className="p-2 bg-primary/10 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rankings Preview */}
      <section id="rankings" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Global Developer Rankings
              </h2>
              <p className="text-muted-foreground mb-8">
                See how you measure up against developers worldwide. Our AI analyzes code quality,
                contribution frequency, project complexity, and community engagement.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Real-time skill assessment",
                  "Multi-platform integration",
                  "Peer comparison analytics",
                  "Career advancement insights"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Button className="bg-gradient-to-r from-primary to-chart-2">
                View Full Rankings
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <span>Top Developers</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topDevelopers.map((dev, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="text-2xl font-bold text-primary">#{dev.rank}</div>
                      <Avatar>
                        <AvatarFallback className="bg-primary/10">{dev.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{dev.name}</div>
                        <div className="text-sm text-muted-foreground">{dev.specialty}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{dev.score}</div>
                      <Progress value={dev.score} className="w-20 h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How DevRank Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our sophisticated AI system analyzes multiple data points to create your comprehensive developer profile.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Connect Your Accounts",
                description: "Link your GitHub, Stack Overflow, and other developer platforms for comprehensive analysis.",
                icon: <Github className="h-8 w-8" />
              },
              {
                step: "02",
                title: "AI Analysis",
                description: "Our AI examines your code quality, contribution patterns, and technical expertise across all platforms.",
                icon: <Brain className="h-8 w-8" />
              },
              {
                step: "03",
                title: "Get Your Rank",
                description: "Receive your detailed developer profile with rankings, insights, and personalized improvement recommendations.",
                icon: <TrendingUp className="h-8 w-8" />
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Profile Card */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Developer Profile
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get a comprehensive view of your coding abilities and see how you stack up.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden shadow-xl">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-chart-2/10 pb-0">
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl mb-2">John Developer</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">Rank #247</Badge>
                      <Badge className="bg-chart-2/20 text-chart-2">Full Stack Developer</Badge>
                    </div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-3xl font-bold text-primary">92.4</div>
                    <div className="text-sm text-muted-foreground">Overall Score</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center">
                      <Star className="h-4 w-4 mr-2 text-primary" />
                      Top Skills
                    </h4>
                    <div className="space-y-3">
                      {[
                        { skill: "TypeScript", level: 95 },
                        { skill: "React", level: 88 },
                        { skill: "Node.js", level: 82 },
                        { skill: "Python", level: 76 }
                      ].map((item, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{item.skill}</span>
                            <span className="text-muted-foreground">{item.level}%</span>
                          </div>
                          <Progress value={item.level} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4 flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2 text-primary" />
                      Activity Metrics
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Commits", value: "1,247", trend: "+12%" },
                        { label: "PRs", value: "89", trend: "+8%" },
                        { label: "Issues", value: "156", trend: "+15%" },
                        { label: "Stars", value: "432", trend: "+22%" }
                      ].map((metric, index) => (
                        <div key={index} className="bg-muted/50 rounded-lg p-3">
                          <div className="text-2xl font-bold">{metric.value}</div>
                          <div className="text-xs text-muted-foreground">{metric.label}</div>
                          <div className="text-xs text-chart-4 font-medium">{metric.trend}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-chart-2/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Discover Your Developer Rank?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of developers who trust DevRank for accurate skill assessment and career insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-primary to-chart-2 hover:opacity-90 px-8">
              Start Free Analysis
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              View Demo Profile
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-primary" />
              Free to start
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-primary" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-primary" />
              Instant results
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Code2 className="h-5 w-5 text-primary" />
                </div>
                <span className="font-bold text-lg">DevRank</span>
              </div>
              <p className="text-muted-foreground text-sm">
                AI-powered developer profiling platform helping developers understand and improve their skills.
              </p>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "API", "Documentation"]
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Contact"]
              },
              {
                title: "Resources",
                links: ["Help Center", "Community", "Status", "Privacy"]
              }
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border/40 mt-8 pt-8 text-center text-muted-foreground text-sm">
            © 2025 DevRank. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
    // </SidebarProvider>
  );
}