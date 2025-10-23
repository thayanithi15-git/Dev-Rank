'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, 
  MapPin, 
  Calendar, 
  Globe, 
  Mail, 
  Phone,
  Github, 
  Linkedin, 
  Twitter,
  ExternalLink,
  Star,
  Trophy,
  Award,
  Target,
  TrendingUp,
  Code2,
  GitCommit,
  Activity,
  BarChart3,
  PieChart,
  Download,
  Share2,
  Edit,
  Eye,
  ThumbsUp,
  MessageCircle,
  Users,
  Briefcase,
  GraduationCap,
  FileText,
  Zap,
  Heart,
  BookOpen,
  Coffee,
  Clock,
  CheckCircle,
  Plus,
  Settings,
  Share,
  Facebook,
  Instagram,
  Send,
  X
} from 'lucide-react';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  bio: string;
  location: string;
  website: string;
  company: string;
  jobTitle: string;
  profileImage: string;
  bannerImage: string;
  joinedDate: string;
  lastActive: string;
  isVerified: boolean;
  profileCompletion: number;
  overallScore: number;
  globalRank: number;
  countryRank: number;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

interface Skill {
  name: string;
  level: number;
  rank: string;
  color: string;
  category: string;
}

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  logo?: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  featured: boolean;
  stars: number;
  views: number;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  gpa?: number;
}

interface ActivityData {
  date: string;
  count: number;
}

const mockUser: UserProfile = {
  id: '1',
  firstName: 'Rocky',
  lastName: 'Rocky',
  username: 'Rocky-Dev',
  email: 'Rocky@devrank.com',
  bio: 'A developer looking for a role 🔭 Currently looking for a role 💬 2+ days remaining from Active status',
  location: 'New Delhi, India',
  website: 'https://Rockydev.com',
  company: 'DevRank',
  jobTitle: 'Full Stack Developer',
  profileImage: '/api/placeholder/120/120',
  bannerImage: 'https://i.pinimg.com/474x/9e/ac/9c/9eac9ccf80d7bcfde82f44fbf31baa8c.jpg',
  joinedDate: '2023-01-15',
  lastActive: '2 hours ago',
  isVerified: true,
  profileCompletion: 44,
  overallScore: 50.8,
  globalRank: 2847,
  countryRank: 156,
  socialLinks: {
    github: 'https://github.com/Rocky-Rocky',
    linkedin: 'https://linkedin.com/in/Rocky-Rocky',
    twitter: 'https://twitter.com/Rocky_Rocky',
    website: 'https://Rockydev.com'
  }
};

const topSkills: Skill[] = [
  { name: 'ReactJS', level: 77, rank: 'Top 77%', color: 'bg-blue-500', category: 'Frontend' },
  { name: 'Sequelize', level: 34, rank: 'Top 34%', color: 'bg-green-500', category: 'Database' },
  { name: 'NodeJS', level: 61, rank: 'Top 61%', color: 'bg-yellow-500', category: 'Backend' },
  { name: 'JavaScript', level: 85, rank: 'Top 15%', color: 'bg-purple-500', category: 'Language' },
  { name: 'TypeScript', level: 72, rank: 'Top 28%', color: 'bg-indigo-500', category: 'Language' },
  { name: 'Python', level: 68, rank: 'Top 32%', color: 'bg-red-500', category: 'Language' }
];

const workExperience: WorkExperience[] = [
  {
    id: '1',
    company: 'DevRank',
    position: 'Senior Full Stack Developer',
    startDate: '2023-06-01',
    current: true,
    description: 'Leading development of AI-powered developer ranking platform. Built scalable microservices architecture and implemented real-time analytics dashboard.',
    logo: '/api/placeholder/40/40'
  },
  {
    id: '2',
    company: 'TechCorp',
    position: 'Frontend Developer',
    startDate: '2022-01-15',
    endDate: '2023-05-30',
    current: false,
    description: 'Developed responsive web applications using React and TypeScript. Collaborated with design team to implement pixel-perfect UI components.',
    logo: '/api/placeholder/40/40'
  }
];

const projects: Project[] = [
  {
    id: '1',
    name: 'DevRank Analytics',
    description: 'Real-time analytics dashboard for developer metrics and insights',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    liveUrl: 'https://analytics.devrank.com',
    githubUrl: 'https://github.com/Rocky/devrank-analytics',
    image: '/api/placeholder/300/200',
    featured: true,
    stars: 247,
    views: 1542
  },
  {
    id: '2',
    name: 'Code Challenge Platform',
    description: 'Interactive coding challenge platform with real-time collaboration',
    techStack: ['Vue.js', 'Python', 'WebSocket', 'MongoDB'],
    liveUrl: 'https://challenges.dev',
    githubUrl: 'https://github.com/Rocky/code-challenges',
    image: '/api/placeholder/300/200',
    featured: true,
    stars: 156,
    views: 892
  }
];

const education: Education[] = [
  {
    id: '1',
    institution: 'Delhi University',
    degree: 'Bachelor of Technology',
    field: 'Computer Science',
    startYear: '2020',
    endYear: '2024',
    gpa: 3.8
  }
];

// Mock GitHub-style activity data
const generateActivityData = (): ActivityData[] => {
  const data: ActivityData[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 365);
  
  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    data.push({
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 10)
    });
  }
  return data;
};

const activityData = generateActivityData();

const weeklyStats = [
  { day: 'Mon', commits: 5, hours: 6.5 },
  { day: 'Tue', commits: 8, hours: 7.2 },
  { day: 'Wed', commits: 3, hours: 4.1 },
  { day: 'Thu', commits: 12, hours: 8.5 },
  { day: 'Fri', commits: 7, hours: 6.8 },
  { day: 'Sat', commits: 2, hours: 2.3 },
  { day: 'Sun', commits: 1, hours: 1.5 }
];

export default function DevRankProfileView() {
  const [selectedPeriod, setSelectedPeriod] = useState('year');
  const [activeTab, setActiveTab] = useState('overview');

  const getActivityColor = (count: number) => {
    if (count === 0) return 'bg-gray-200';
    if (count <= 2) return 'bg-green-200';
    if (count <= 4) return 'bg-green-400';
    if (count <= 6) return 'bg-green-600';
    return 'bg-green-800';
  };

  const renderGitHubHeatmap = () => {
    const weeks: ActivityData[][] = [];
    let currentWeek: ActivityData[] = [];
    
    activityData.forEach((day, index) => {
      currentWeek.push(day);
      if ((index + 1) % 7 === 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });
    
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    const totalContributions = activityData.reduce((sum, day) => sum + day.count, 0);

    return (
      <Card className="professional-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              GitHub Heatmap
            </CardTitle>
            <Select defaultValue="year">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Month labels */}
            <div className="flex justify-between text-xs text-muted-foreground px-4">
              {months.map(month => (
                <span key={month}>{month}</span>
              ))}
            </div>
            
            {/* Heatmap grid */}
            <div className="grid grid-cols-53 gap-1 max-w-full">
              {weeks.map((week, weekIndex) => (
                week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-3 h-3 rounded-sm ${getActivityColor(day.count)}`}
                    title={`${day.count} contributions on ${day.date}`}
                  />
                ))
              ))}
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                <strong>{totalContributions}</strong> contributions in the last year
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-gray-200" />
                  <div className="w-3 h-3 rounded-sm bg-green-200" />
                  <div className="w-3 h-3 rounded-sm bg-green-400" />
                  <div className="w-3 h-3 rounded-sm bg-green-600" />
                  <div className="w-3 h-3 rounded-sm bg-green-800" />
                </div>
                <span className="text-xs text-muted-foreground">More</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderSkillsPieChart = () => (
    <Card className="professional-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Top Skills
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topSkills.slice(0, 3).map((skill, index) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${skill.color}`} />
                  <span className="font-medium">{skill.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">{skill.rank}</Badge>
                  <span className="text-sm font-bold">{skill.level}%</span>
                </div>
              </div>
              <Progress value={skill.level} className="h-2" />
            </div>
          ))}
          <Button variant="outline" className="w-full mt-4">
            View All Skills
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderWeeklyChart = () => (
    <Card className="professional-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Weekly Stats
          </CardTitle>
          <Select defaultValue="commits">
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="commits">Commits</SelectItem>
              <SelectItem value="hours">Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-32 flex items-end justify-between gap-2">
            {weeklyStats.map((stat, index) => (
              <div key={stat.day} className="flex flex-col items-center gap-2 flex-1">
                <div 
                  className="bg-primary rounded-t w-full transition-all duration-300"
                  style={{ height: `${(stat.commits / 12) * 100}%`, minHeight: '4px' }}
                />
                <span className="text-xs text-muted-foreground">{stat.day}</span>
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Last 7 days activity
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
        {/* Profile Header */}
        <Card className="professional-shadow">
          <div className="relative">
            {/* Banner */}
            <div className="h-32 lg:h-48 bg-gradient-to-r from-primary/20 to-accent/20 rounded-t-lg">
                <img src={mockUser?.bannerImage} alt='banner' className='h-full w-full' />
            </div>
            
            {/* Profile Info */}
            <div className="relative px-6 pb-6">
              <div className="flex flex-col lg:flex-row gap-6 -mt-16 lg:-mt-20">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="w-24 h-24 lg:w-32 lg:h-32 border-4 border-background">
                    <AvatarImage src={mockUser.profileImage} />
                    <AvatarFallback className="text-2xl lg:text-3xl">
                      {mockUser.firstName[0]}{mockUser.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  {mockUser.isVerified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 space-y-4 lg:mt-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="space-y-2">
                      <h1 className="text-2xl lg:text-3xl font-bold">
                        {mockUser.firstName} {mockUser.lastName}
                      </h1>
                      <p className="text-muted-foreground">@{mockUser.username}</p>
                      <p className="text-sm">{mockUser.bio}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {mockUser.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {mockUser.jobTitle} at {mockUser.company}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Joined {new Date(mockUser.joinedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col lg:items-end gap-3">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                        <Button size="sm" className="professional-gradient text-primary-foreground">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        {mockUser.socialLinks.github && (
                          <Button variant="ghost" size="sm">
                            <Github className="w-4 h-4" />
                          </Button>
                        )}
                        {mockUser.socialLinks.linkedin && (
                          <Button variant="ghost" size="sm">
                            <Linkedin className="w-4 h-4" />
                          </Button>
                        )}
                        {mockUser.socialLinks.twitter && (
                          <Button variant="ghost" size="sm">
                            <Twitter className="w-4 h-4" />
                          </Button>
                        )}
                        {mockUser.socialLinks.website && (
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="professional-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overall Score</p>
                  <p className="text-2xl font-bold text-primary">{mockUser.overallScore}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +2.5 this month
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
                  <p className="text-2xl font-bold text-foreground">#{mockUser.globalRank}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Profile Views</p>
                  <p className="text-2xl font-bold text-foreground">2,847</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    +47 today
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
                  <p className="text-sm font-medium text-muted-foreground">Profile Completion</p>
                  <p className="text-2xl font-bold text-foreground">{mockUser.profileCompletion}%</p>
                  <Progress value={mockUser.profileCompletion} className="mt-2" />
                </div>
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* GitHub Heatmap */}
            {renderGitHubHeatmap()}

            {/* Skills & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderSkillsPieChart()}
              {renderWeeklyChart()}
            </div>

            {/* Coding Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="professional-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">Human Dev</CardTitle>
                    <Select defaultValue="week">
                      <SelectTrigger className="w-20 h-6 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">Week</SelectItem>
                        <SelectItem value="month">Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-2xl font-bold text-yellow-500">0</div>
                  <div className="text-xs text-muted-foreground">Weekly Rank</div>
                  <div className="text-xs text-muted-foreground">Last 7 Days</div>
                  <div className="flex items-center gap-2 text-xs">
                    <Github className="w-3 h-3" />
                    <X className="w-3 h-3" />
                    <Activity className="w-3 h-3" />
                    <Coffee className="w-3 h-3" />
                    <BookOpen className="w-3 h-3" />
                  </div>
                </CardContent>
              </Card>

              <Card className="professional-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">Coding Stats</CardTitle>
                    <Select>
                      <SelectTrigger className="w-20 h-6 text-xs">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-blue-500 text-sm">Data is empty</div>
                </CardContent>
              </Card>

              <Card className="professional-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">LeetCode</CardTitle>
                    <Select>
                      <SelectTrigger className="w-20 h-6 text-xs">
                        <SelectValue placeholder="Platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="leetcode">LeetCode</SelectItem>
                        <SelectItem value="codechef">CodeChef</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-red-500 text-sm">Can't show LeetCode Stats</div>
                </CardContent>
              </Card>
            </div>

            {/* Yearly and Monthly Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="professional-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Yearly Stats</CardTitle>
                    <Select defaultValue="commits">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="commits">Commits</SelectItem>
                        <SelectItem value="prs">PRs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-32 flex items-end justify-between gap-1">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                      <div key={month} className="flex flex-col items-center gap-1 flex-1">
                        <div 
                          className="bg-primary rounded-t w-full"
                          style={{ height: `${Math.random() * 80 + 20}%` }}
                        />
                        <span className="text-xs text-muted-foreground">{month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="professional-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Monthly Stats</CardTitle>
                    <Select defaultValue="current">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current">Current</SelectItem>
                        <SelectItem value="previous">Previous</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-32 flex items-end justify-between gap-1">
                    {Array.from({ length: 30 }, (_, i) => (
                      <div key={i} className="flex flex-col items-center gap-1 flex-1">
                        <div 
                          className="bg-red-400 rounded-t w-full"
                          style={{ height: `${Math.random() * 80 + 10}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* GitHub Stats */}
            <Card className="professional-shadow">
              <CardHeader>
                <CardTitle>GitHub Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <div className="w-24 h-24 rounded-full border-8 border-primary/20 relative">
                      <div className="absolute inset-2 rounded-full border-4 border-primary flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">Top</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold">16</div>
                    <div className="text-xs text-muted-foreground">Today</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">0</div>
                    <div className="text-xs text-muted-foreground">This week</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">0</div>
                    <div className="text-xs text-muted-foreground">This month</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">0</div>
                    <div className="text-xs text-muted-foreground">PR Merged</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Completion */}
            <Card className="professional-shadow">
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
                <CardDescription>{mockUser.profileCompletion}%</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={mockUser.profileCompletion} />
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Basic profile info</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Social links added</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Plus className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Add work experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Plus className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Upload resume</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Promote Yourself */}
            <Card className="professional-shadow">
              <CardHeader>
                <CardTitle>Promote Yourself</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FileText className="w-4 h-4" />
                  Generate CV
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Twitter className="w-4 h-4" />
                  Share on Twitter
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Linkedin className="w-4 h-4" />
                  Share on LinkedIn
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Facebook className="w-4 h-4" />
                  Share on Facebook
                </Button>
              </CardContent>
            </Card>

            {/* Scores & Badges */}
            <Card className="professional-shadow">
              <CardHeader>
                <CardTitle>Scores & Badges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-primary">{mockUser.overallScore}</div>
                    <div className="text-xs text-muted-foreground">CodersRank Score ®</div>
                    <div className="text-xs text-muted-foreground">Last updated at Sep 5, 2023</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-blue-600">Top 1%</div>
                    <div className="text-xs text-muted-foreground">CodersRank Rank</div>
                  </div>
                </div>
                
                <div className="p-3 bg-muted/30 rounded-lg">
                  <div className="text-sm font-medium mb-2">Highlights your badges</div>
                  <div className="text-xs text-muted-foreground mb-2">Gey Highlight</div>
                  <Button size="sm" className="professional-gradient text-primary-foreground w-full">
                    Connect your accounts
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="professional-shadow">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Users className="w-4 h-4" />
                  Invite friends, colleagues
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <MessageCircle className="w-4 h-4" />
                  How does our scoring work?
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Target className="w-4 h-4" />
                  How to use integrate
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Plus className="w-4 h-4" />
                  How to add languages?
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Work Experience & Portfolio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Work Experience */}
          <Card className="professional-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  Work Experience
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Linkedin className="w-4 h-4 mr-2" />
                  Add from LinkedIn
                </Button>
              </div>
              <CardDescription>List your work history, including any contracts or freelance</CardDescription>
            </CardHeader>
            <CardContent>
              {workExperience.length === 0 ? (
                <div className="text-center py-8">
                  <Briefcase className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="font-medium mb-2">Add your work experience</h3>
                  <Button className="professional-gradient text-primary-foreground">
                    <Linkedin className="w-4 h-4 mr-2" />
                    Add from LinkedIn
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {workExperience.map((exp) => (
                    <div key={exp.id} className="flex gap-4 p-4 border rounded-lg">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{exp.position}</h4>
                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                        <p className="text-xs text-muted-foreground">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </p>
                        <p className="text-sm mt-2">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Portfolio */}
          <Card className="professional-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-primary" />
                  Portfolio
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </div>
              <CardDescription>Add some compelling projects here to demonstrate your experience</CardDescription>
            </CardHeader>
            <CardContent>
              {projects.length === 0 ? (
                <div className="text-center py-8">
                  <Code2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="font-medium mb-2">Show your best projects</h3>
                  <Button className="professional-gradient text-primary-foreground">
                    <Linkedin className="w-4 h-4 mr-2" />
                    Add from LinkedIn
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="border rounded-lg overflow-hidden">
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{project.name}</h4>
                          {project.featured && (
                            <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.techStack.map((tech, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              {project.stars}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {project.views}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {project.liveUrl && (
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            )}
                            {project.githubUrl && (
                              <Button variant="ghost" size="sm">
                                <Github className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Education */}
        <Card className="professional-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                Education
              </CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Education
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="flex gap-4 p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{edu.degree}</h4>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    <p className="text-xs text-muted-foreground">
                      {edu.field} • {edu.startYear} - {edu.endYear}
                    </p>
                    {edu.gpa && (
                      <p className="text-xs text-muted-foreground">GPA: {edu.gpa}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}