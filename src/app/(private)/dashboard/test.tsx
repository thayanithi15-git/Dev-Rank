'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Code2, 
  Trophy, 
  TrendingUp, 
  Github, 
  Linkedin, 
  MessageSquare,
  FileText,
  Star,
  Eye,
  Download,
  Plus,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
  Award,
  Target,
  Activity,
  Users,
  BarChart3,
  Calendar,
  MapPin,
  Mail,
  Globe
} from 'lucide-react';

interface SkillData {
  skill: string;
  score: number;
  trend: string;
  color: string;
}

interface ConnectedPlatform {
  name: string;
  icon: React.ComponentType<any>;
  connected: boolean;
  repos?: number;
  stars?: number;
  contributions?: number;
  connections?: number;
  endorsements?: number;
  reputation?: number;
  answers?: number;
}

interface RecentActivity {
  type: string;
  message: string;
  time: string;
  icon: React.ComponentType<any>;
}

interface SidebarItem {
  name: string;
  icon: React.ComponentType<any>;
  active?: boolean;
}

export default function DevRankDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const skillData: SkillData[] = [
    { skill: 'JavaScript', score: 92, trend: '+5%', color: 'bg-yellow-500' },
    { skill: 'React', score: 88, trend: '+3%', color: 'bg-blue-500' },
    { skill: 'TypeScript', score: 85, trend: '+8%', color: 'bg-blue-600' },
    { skill: 'Node.js', score: 83, trend: '+2%', color: 'bg-green-500' },
    { skill: 'Python', score: 79, trend: '+6%', color: 'bg-green-600' },
    { skill: 'PostgreSQL', score: 76, trend: '+4%', color: 'bg-blue-700' },
  ];

  const connectedPlatforms: ConnectedPlatform[] = [
    { name: 'GitHub', icon: Github, connected: true, repos: 47, stars: 1243, contributions: 892 },
    { name: 'LinkedIn', icon: Linkedin, connected: true, connections: 534, endorsements: 89 },
    { name: 'StackOverflow', icon: MessageSquare, connected: true, reputation: 2847, answers: 156 },
  ];

  const recentActivity: RecentActivity[] = [
    { type: 'skill_update', message: 'JavaScript skill score increased to 92', time: '2 hours ago', icon: TrendingUp },
    { type: 'portfolio_view', message: '12 new portfolio views from recruiters', time: '5 hours ago', icon: Eye },
    { type: 'github_sync', message: 'GitHub data synchronized successfully', time: '1 day ago', icon: Github },
    { type: 'rank_update', message: 'Global rank improved to #2,847', time: '2 days ago', icon: Trophy },
  ];

  const sidebarItems: SidebarItem[] = [
    { name: 'Dashboard', icon: BarChart3, active: true },
    { name: 'Skills Analysis', icon: Target },
    { name: 'Portfolio', icon: FileText },
    { name: 'Rankings', icon: Trophy },
    { name: 'Connections', icon: Users },
    { name: 'Activity', icon: Activity },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Code2 className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg instrument">DevRank</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <Button
              key={index}
              variant={item.active ? "secondary" : "ghost"}
              className={`w-full justify-start gap-3 ${item.active ? 'bg-primary/10 text-primary' : ''}`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-4">
              <div className="text-sm font-medium text-primary mb-2">Upgrade to Pro</div>
              <div className="text-xs text-muted-foreground mb-3">
                Unlock advanced analytics and premium features
              </div>
              <Button size="sm" className="w-full professional-gradient text-primary-foreground">
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-card border-b border-border px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, Alex</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/api/placeholder/32/32" />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">AK</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-6 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="professional-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overall Score</p>
                    <p className="text-2xl font-bold text-primary">8.7/10</p>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +0.3 this month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="professional-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Global Rank</p>
                    <p className="text-2xl font-bold text-foreground">#2,847</p>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +156 this week
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="professional-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Portfolio Views</p>
                    <p className="text-2xl font-bold text-foreground">1,247</p>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      +23 today
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="professional-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Recruiter Interest</p>
                    <p className="text-2xl font-bold text-foreground">89%</p>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      High demand
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Skills Analysis */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="professional-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Skill Analysis</span>
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Skill
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    AI-powered analysis of your technical expertise
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skillData.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${skill.color}`}></div>
                          <span className="font-medium">{skill.skill}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">{skill.trend}</Badge>
                          <span className="text-sm font-bold">{skill.score}%</span>
                        </div>
                      </div>
                      <Progress value={skill.score} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Portfolio Section */}
              <Card className="professional-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Portfolio Overview</span>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Public
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Your data-backed developer portfolio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-4 border border-primary/10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">Portfolio Status</span>
                      </div>
                      <p className="text-2xl font-bold text-primary mb-1">Active</p>
                      <p className="text-sm text-muted-foreground">Last updated 2 days ago</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-lg p-4 border border-blue-500/10">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                          <Download className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium">Downloads</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600 mb-1">127</p>
                      <p className="text-sm text-muted-foreground">This month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Connected Platforms */}
              <Card className="professional-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Connected Platforms</CardTitle>
                  <CardDescription>
                    Your linked professional accounts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {connectedPlatforms.map((platform, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center">
                          <platform.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{platform.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {platform.name === 'GitHub' && `${platform.repos} repos`}
                            {platform.name === 'LinkedIn' && `${platform.connections} connections`}
                            {platform.name === 'StackOverflow' && `${platform.reputation} reputation`}
                          </p>
                        </div>
                      </div>
                      <Badge variant={platform.connected ? "default" : "secondary"} className="text-xs">
                        {platform.connected ? 'Connected' : 'Connect'}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="professional-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                  <CardDescription>
                    Latest updates and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                        <activity.icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-tight">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="professional-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start gap-3" variant="outline">
                    <FileText className="w-4 h-4" />
                    Update Resume
                  </Button>
                  <Button className="w-full justify-start gap-3" variant="outline">
                    <Github className="w-4 h-4" />
                    Sync GitHub
                  </Button>
                  <Button className="w-full justify-start gap-3" variant="outline">
                    <Trophy className="w-4 h-4" />
                    View Rankings
                  </Button>
                  <Button className="w-full justify-start gap-3 professional-gradient text-primary-foreground">
                    <ExternalLink className="w-4 h-4" />
                    Share Portfolio
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}