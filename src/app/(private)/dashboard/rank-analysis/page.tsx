'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Trophy, 
  Medal, 
  Award,
  Github, 
  Linkedin, 
  MessageSquare,
  MapPin,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  Filter,
  Download,
  ExternalLink,
  Star,
  Code2,
  Users,
  Globe,
  Crown,
  Zap,
  Mail,
  Phone,
  Building,
  GraduationCap,
  Clock,
  Target,
  Eye,
  Heart,
  Share2,
  BookOpen,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  SortAsc,
  SortDesc,
  ChevronDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  FileText,
  BarChart3
} from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  experience: string;
  certifications: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  date: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface SocialProfile {
  platform: string;
  username: string;
  url: string;
  followers?: number;
  following?: number;
  repositories?: number;
  stars?: number;
  contributions?: number;
  reputation?: number;
  answers?: number;
  questions?: number;
  verified: boolean;
}

interface WorkExperience {
  company: string;
  position: string;
  duration: string;
  logo?: string;
}

interface Education {
  institution: string;
  degree: string;
  year: string;
  gpa?: number;
}

interface Developer {
  id: number;
  rank: number;
  previousRank?: number;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  country: string;
  countryCode: string;
  city: string;
  timezone: string;
  email?: string;
  phone?: string;
  website?: string;
  experience: number;
  score: number;
  skillScore: number;
  projectScore: number;
  contributionScore: number;
  communityScore: number;
  languages: string[];
  skills: Skill[];
  achievements: Achievement[];
  socialProfiles: SocialProfile[];
  workExperience: WorkExperience[];
  education: Education[];
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  joinedDate: string;
  lastActive: string;
  portfolioViews: number;
  profileViews: number;
  endorsements: number;
  isVerified: boolean;
  isPremium: boolean;
  isAvailableForHire: boolean;
  hourlyRate?: number;
  responseTime: string;
  completedProjects: number;
  clientRating: number;
  preferredWorkType: string[];
  specializations: string[];
}

interface FilterState {
  search: string;
  country: string;
  city: string;
  technology: string;
  experience: string;
  availability: string;
  verification: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export default function ComprehensiveDevRankRankingsPage() {
  const [activeTab, setActiveTab] = useState('weekly');
  const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    country: 'all',
    city: 'all',
    technology: 'all',
    experience: 'all',
    availability: 'all',
    verification: 'all',
    sortBy: 'rank',
    sortOrder: 'asc'
  });

  const achievements: Achievement[] = [
    { id: '1', title: 'Code Master', description: '1000+ commits this year', icon: Code2, date: '2024-01-15', rarity: 'rare' },
    { id: '2', title: 'Community Hero', description: 'Top 1% contributor', icon: Users, date: '2024-02-20', rarity: 'epic' },
    { id: '3', title: 'Innovation Leader', description: 'Created breakthrough project', icon: Zap, date: '2024-03-10', rarity: 'legendary' },
    { id: '4', title: 'Mentor', description: 'Helped 50+ developers', icon: GraduationCap, date: '2024-01-05', rarity: 'rare' },
  ];

  const topDevelopers: Developer[] = [
    {
      id: 1,
      rank: 1,
      previousRank: 3,
      name: 'Thomas Bartholomew',
      username: 'thomasbart',
      avatar: '/api/placeholder/120/120',
      bio: 'Full-stack engineer with 8+ years building scalable web applications. Passionate about clean code and mentoring.',
      country: 'United States',
      countryCode: 'US',
      city: 'San Francisco',
      timezone: 'PST',
      email: 'thomas@devrank.com',
      website: 'https://thomasbart.dev',
      experience: 35000000,
      score: 95.8,
      skillScore: 94.2,
      projectScore: 97.1,
      contributionScore: 96.5,
      communityScore: 95.3,
      languages: ['TypeScript', 'React', 'Node.js', 'Python', 'Go'],
      skills: [
        { name: 'React', level: 95, experience: '5 years', certifications: 3 },
        { name: 'TypeScript', level: 92, experience: '4 years', certifications: 2 },
        { name: 'Node.js', level: 89, experience: '6 years', certifications: 1 },
        { name: 'AWS', level: 87, experience: '3 years', certifications: 4 },
      ],
      achievements: achievements.slice(0, 3),
      socialProfiles: [
        { platform: 'GitHub', username: 'thomasbart', url: 'https://github.com/thomasbart', repositories: 47, stars: 2847, contributions: 1234, verified: true },
        { platform: 'LinkedIn', username: 'thomas-bartholomew', url: 'https://linkedin.com/in/thomas-bartholomew', followers: 5420, following: 890, verified: true },
        { platform: 'StackOverflow', username: 'thomasbart', url: 'https://stackoverflow.com/users/thomasbart', reputation: 12847, answers: 234, questions: 45, verified: true },
      ],
      workExperience: [
        { company: 'Google', position: 'Senior Software Engineer', duration: '2020-2024', logo: '/api/placeholder/32/32' },
        { company: 'Facebook', position: 'Software Engineer', duration: '2018-2020', logo: '/api/placeholder/32/32' },
      ],
      education: [
        { institution: 'Stanford University', degree: 'MS Computer Science', year: '2018', gpa: 3.9 },
        { institution: 'UC Berkeley', degree: 'BS Computer Science', year: '2016', gpa: 3.8 },
      ],
      trend: 'up',
      trendValue: 2,
      joinedDate: '2019-03-15',
      lastActive: '2 hours ago',
      portfolioViews: 15420,
      profileViews: 8934,
      endorsements: 127,
      isVerified: true,
      isPremium: true,
      isAvailableForHire: true,
      hourlyRate: 150,
      responseTime: '< 1 hour',
      completedProjects: 23,
      clientRating: 4.9,
      preferredWorkType: ['Remote', 'Contract', 'Full-time'],
      specializations: ['Frontend Architecture', 'React Ecosystem', 'TypeScript'],
    },
    {
      id: 2,
      rank: 2,
      previousRank: 1,
      name: 'Jhay Chen Wei',
      username: 'jhay-25',
      avatar: '/api/placeholder/120/120',
      bio: 'Frontend specialist and UX enthusiast. Building beautiful, accessible web experiences for millions of users.',
      country: 'Singapore',
      countryCode: 'SG',
      city: 'Singapore',
      timezone: 'SGT',
      email: 'jhay@devrank.com',
      website: 'https://jhaychen.dev',
      experience: 4200000,
      score: 93.2,
      skillScore: 95.1,
      projectScore: 91.8,
      contributionScore: 92.7,
      communityScore: 93.2,
      languages: ['JavaScript', 'Vue.js', 'Python', 'CSS', 'HTML'],
      skills: [
        { name: 'Vue.js', level: 96, experience: '4 years', certifications: 2 },
        { name: 'JavaScript', level: 94, experience: '6 years', certifications: 1 },
        { name: 'CSS', level: 92, experience: '5 years', certifications: 0 },
        { name: 'Python', level: 85, experience: '3 years', certifications: 2 },
      ],
      achievements: achievements.slice(1, 4),
      socialProfiles: [
        { platform: 'GitHub', username: 'jhay-25', url: 'https://github.com/jhay-25', repositories: 32, stars: 1923, contributions: 987, verified: true },
        { platform: 'LinkedIn', username: 'jhay-chen', url: 'https://linkedin.com/in/jhay-chen', followers: 3240, following: 654, verified: true },
      ],
      workExperience: [
        { company: 'Shopify', position: 'Frontend Lead', duration: '2021-2024', logo: '/api/placeholder/32/32' },
        { company: 'Grab', position: 'Frontend Developer', duration: '2019-2021', logo: '/api/placeholder/32/32' },
      ],
      education: [
        { institution: 'NUS', degree: 'BS Computer Science', year: '2019', gpa: 3.7 },
      ],
      trend: 'stable',
      trendValue: 0,
      joinedDate: '2020-01-10',
      lastActive: '5 hours ago',
      portfolioViews: 12340,
      profileViews: 6780,
      endorsements: 89,
      isVerified: true,
      isPremium: false,
      isAvailableForHire: true,
      hourlyRate: 120,
      responseTime: '< 2 hours',
      completedProjects: 18,
      clientRating: 4.8,
      preferredWorkType: ['Remote', 'Contract'],
      specializations: ['Vue.js', 'Frontend Performance', 'UX/UI'],
    },
    {
      id: 3,
      rank: 3,
      previousRank: 2,
      name: 'Riley Foster',
      username: 'rly6511',
      avatar: '/api/placeholder/120/120',
      bio: 'Backend architect specializing in microservices and cloud infrastructure. Love solving complex distributed systems problems.',
      country: 'Canada',
      countryCode: 'CA',
      city: 'Toronto',
      timezone: 'EST',
      email: 'riley@devrank.com',
      experience: 3800000,
      score: 91.7,
      skillScore: 89.3,
      projectScore: 94.2,
      contributionScore: 91.8,
      communityScore: 91.5,
      languages: ['React', 'GraphQL', 'PostgreSQL', 'Docker', 'Kubernetes'],
      skills: [
        { name: 'GraphQL', level: 94, experience: '3 years', certifications: 1 },
        { name: 'PostgreSQL', level: 91, experience: '5 years', certifications: 2 },
        { name: 'Docker', level: 89, experience: '4 years', certifications: 1 },
        { name: 'Kubernetes', level: 86, experience: '2 years', certifications: 3 },
      ],
      achievements: [achievements[0], achievements[2]],
      socialProfiles: [
        { platform: 'GitHub', username: 'rly6511', url: 'https://github.com/rly6511', repositories: 28, stars: 1654, contributions: 756, verified: true },
        { platform: 'StackOverflow', username: 'riley-foster', url: 'https://stackoverflow.com/users/riley-foster', reputation: 8947, answers: 156, questions: 23, verified: false },
      ],
      workExperience: [
        { company: 'Stripe', position: 'Backend Engineer', duration: '2022-2024', logo: '/api/placeholder/32/32' },
        { company: 'Atlassian', position: 'Software Developer', duration: '2020-2022', logo: '/api/placeholder/32/32' },
      ],
      education: [
        { institution: 'University of Toronto', degree: 'BS Software Engineering', year: '2020', gpa: 3.6 },
      ],
      trend: 'up',
      trendValue: 1,
      joinedDate: '2020-07-22',
      lastActive: '1 day ago',
      portfolioViews: 9870,
      profileViews: 5432,
      endorsements: 67,
      isVerified: false,
      isPremium: true,
      isAvailableForHire: false,
      responseTime: '< 4 hours',
      completedProjects: 12,
      clientRating: 4.7,
      preferredWorkType: ['Full-time'],
      specializations: ['Backend Architecture', 'GraphQL', 'Cloud Infrastructure'],
    }
  ];

  // Generate more developers for pagination demonstration
  const generateMoreDevelopers = (): Developer[] => {
    const additionalDevelopers: Developer[] = [];
    const names = ['Vincent Keller', 'Drew Charles', 'David Wu', 'Arjun Patil', 'Regina Torres', 'Alex Johnson', 'Sarah Kim', 'Michael Brown', 'Lisa Wang', 'James Wilson'];
    const countries = [
      { name: 'India', code: 'IN', cities: ['Mumbai', 'Bangalore', 'Delhi', 'Chennai'] },
      { name: 'Australia', code: 'AU', cities: ['Sydney', 'Melbourne', 'Brisbane'] },
      { name: 'United Kingdom', code: 'GB', cities: ['London', 'Manchester', 'Edinburgh'] },
      { name: 'Germany', code: 'DE', cities: ['Berlin', 'Munich', 'Hamburg'] },
      { name: 'France', code: 'FR', cities: ['Paris', 'Lyon', 'Marseille'] },
    ];

    for (let i = 4; i <= 100; i++) {
      const nameIndex = (i - 4) % names.length;
      const countryIndex = (i - 4) % countries.length;
      const country = countries[countryIndex];
      const cityIndex = (i - 4) % country.cities.length;

      additionalDevelopers.push({
        id: i,
        rank: i,
        previousRank: i + Math.floor(Math.random() * 6) - 3,
        name: `${names[nameIndex]} ${i}`,
        username: `${names[nameIndex].toLowerCase().replace(' ', '')}${i}`,
        avatar: `/api/placeholder/120/120`,
        bio: `Passionate developer with expertise in modern web technologies and ${Math.floor(Math.random() * 8) + 2}+ years of experience.`,
        country: country.name,
        countryCode: country.code,
        city: country.cities[cityIndex],
        timezone: 'UTC',
        experience: Math.floor(Math.random() * 5000000) + 100000,
        score: Math.floor(Math.random() * 30) + 60,
        skillScore: Math.floor(Math.random() * 30) + 60,
        projectScore: Math.floor(Math.random() * 30) + 60,
        contributionScore: Math.floor(Math.random() * 30) + 60,
        communityScore: Math.floor(Math.random() * 30) + 60,
        languages: ['JavaScript', 'Python', 'React', 'Node.js'].slice(0, Math.floor(Math.random() * 4) + 2),
        skills: [
          { name: 'JavaScript', level: Math.floor(Math.random() * 30) + 70, experience: `${Math.floor(Math.random() * 5) + 1} years`, certifications: Math.floor(Math.random() * 3) },
          { name: 'React', level: Math.floor(Math.random() * 30) + 70, experience: `${Math.floor(Math.random() * 4) + 1} years`, certifications: Math.floor(Math.random() * 2) },
        ],
        achievements: achievements.slice(0, Math.floor(Math.random() * 3) + 1),
        socialProfiles: [
          { platform: 'GitHub', username: `user${i}`, url: `https://github.com/user${i}`, repositories: Math.floor(Math.random() * 50) + 10, stars: Math.floor(Math.random() * 1000) + 100, contributions: Math.floor(Math.random() * 500) + 100, verified: Math.random() > 0.5 },
        ],
        workExperience: [
          { company: `Company ${i}`, position: 'Software Developer', duration: '2020-2024' },
        ],
        education: [
          { institution: `University ${i}`, degree: 'BS Computer Science', year: '2020' },
        ],
        trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable',
        trendValue: Math.floor(Math.random() * 10) - 5,
        joinedDate: '2020-01-01',
        lastActive: `${Math.floor(Math.random() * 24)} hours ago`,
        portfolioViews: Math.floor(Math.random() * 5000) + 100,
        profileViews: Math.floor(Math.random() * 3000) + 50,
        endorsements: Math.floor(Math.random() * 100) + 10,
        isVerified: Math.random() > 0.7,
        isPremium: Math.random() > 0.8,
        isAvailableForHire: Math.random() > 0.5,
        hourlyRate: Math.floor(Math.random() * 100) + 50,
        responseTime: `< ${Math.floor(Math.random() * 24) + 1} hours`,
        completedProjects: Math.floor(Math.random() * 20) + 5,
        clientRating: Math.floor(Math.random() * 10) / 10 + 4,
        preferredWorkType: ['Remote', 'Contract', 'Full-time'].slice(0, Math.floor(Math.random() * 3) + 1),
        specializations: ['Frontend', 'Backend', 'Full-stack'].slice(0, Math.floor(Math.random() * 2) + 1),
      });
    }

    return additionalDevelopers;
  };

  const allDevelopers = useMemo(() => {
    return [...topDevelopers, ...generateMoreDevelopers()];
  }, []);

  const countries = [
    { code: 'all', name: 'All Countries' },
    { code: 'US', name: 'United States' },
    { code: 'IN', name: 'India' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'SG', name: 'Singapore' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' }
  ];

  const technologies = [
    'All Technologies', 'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 
    'Node.js', 'Python', 'Django', 'PHP', 'Java', 'PostgreSQL', 'MongoDB', 'GraphQL'
  ];

  const experienceLevels = [
    { value: 'all', label: 'All Experience' },
    { value: 'junior', label: 'Junior (0-2 years)' },
    { value: 'mid', label: 'Mid-level (3-5 years)' },
    { value: 'senior', label: 'Senior (6-10 years)' },
    { value: 'lead', label: 'Lead (10+ years)' }
  ];

  const filteredAndSortedDevelopers = useMemo(() => {
    let filtered = allDevelopers.filter(dev => {
      const matchesSearch = dev.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                           dev.username.toLowerCase().includes(filters.search.toLowerCase()) ||
                           dev.bio.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesCountry = filters.country === 'all' || dev.countryCode === filters.country;
      const matchesTechnology = filters.technology === 'all' || 
                               dev.languages.some(lang => lang.toLowerCase().includes(filters.technology.toLowerCase()));
      const matchesAvailability = filters.availability === 'all' || 
                                 (filters.availability === 'available' && dev.isAvailableForHire) ||
                                 (filters.availability === 'unavailable' && !dev.isAvailableForHire);
      const matchesVerification = filters.verification === 'all' ||
                                 (filters.verification === 'verified' && dev.isVerified) ||
                                 (filters.verification === 'unverified' && !dev.isVerified);

      return matchesSearch && matchesCountry && matchesTechnology && matchesAvailability && matchesVerification;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (filters.sortBy) {
        case 'rank':
          aValue = a.rank;
          bValue = b.rank;
          break;
        case 'score':
          aValue = a.score;
          bValue = b.score;
          break;
        case 'experience':
          aValue = a.experience;
          bValue = b.experience;
          break;
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'views':
          aValue = a.portfolioViews;
          bValue = b.portfolioViews;
          break;
        default:
          aValue = a.rank;
          bValue = b.rank;
      }

      if (typeof aValue === 'string') {
        return filters.sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }

      return filters.sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return filtered;
  }, [allDevelopers, filters]);

  const paginatedDevelopers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedDevelopers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedDevelopers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedDevelopers.length / itemsPerPage);

  const formatExperience = (exp: number) => {
    if (exp >= 1000000) {
      return `${(exp / 1000000).toFixed(1)}M`;
    }
    if (exp >= 1000) {
      return `${(exp / 1000).toFixed(1)}K`;
    }
    return exp.toString();
  };

  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  const getTrendIcon = (trend: string, value: number) => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="w-3 h-3 text-red-500" />;
    return <Minus className="w-3 h-3 text-muted-foreground" />;
  };

  const getPodiumHeight = (rank: number) => {
    switch (rank) {
      case 1: return 'h-32';
      case 2: return 'h-24';
      case 3: return 'h-20';
      default: return 'h-16';
    }
  };

  const getPodiumColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-yellow-600';
      case 2: return 'from-gray-300 to-gray-500';
      case 3: return 'from-orange-400 to-orange-600';
      default: return 'from-gray-200 to-gray-400';
    }
  };

  const getPodiumIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-600" />;
      case 2: return <Medal className="w-6 h-6 text-gray-600" />;
      case 3: return <Award className="w-6 h-6 text-orange-600" />;
      default: return <Trophy className="w-6 h-6 text-gray-600" />;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'legendary': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (startPage > 1) {
      buttons.push(
        <Button key="first" variant="outline" size="sm" onClick={() => setCurrentPage(1)}>
          1
        </Button>
      );
      if (startPage > 2) {
        buttons.push(<span key="dots1" className="px-2">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? "professional-gradient text-primary-foreground" : ""}
        >
          {i}
        </Button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="dots2" className="px-2">...</span>);
      }
      buttons.push(
        <Button key="last" variant="outline" size="sm" onClick={() => setCurrentPage(totalPages)}>
          {totalPages}
        </Button>
      );
    }

    return buttons;
  };

  const renderDeveloperCard = (developer: Developer) => (
    <Card key={developer.id} className="professional-shadow hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => { setSelectedDeveloper(developer); setShowDetailModal(true); }}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className="w-16 h-16 ring-2 ring-border">
              <AvatarImage src={developer.avatar} />
              <AvatarFallback className="text-lg font-bold">
                {developer.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              #{developer.rank}
            </div>
            {developer.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                <CheckCircle className="w-3 h-3" />
              </div>
            )}
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">{developer.name}</h3>
                <p className="text-sm text-muted-foreground">@{developer.username}</p>
              </div>
              <div className="flex items-center gap-1">
                {getTrendIcon(developer.trend, developer.trendValue)}
                <span className={`text-sm font-medium ${
                  developer.trend === 'up' ? 'text-green-600' : 
                  developer.trend === 'down' ? 'text-red-600' : 
                  'text-muted-foreground'
                }`}>
                  {developer.trend === 'stable' ? '0' : 
                    `${developer.trend === 'up' ? '+' : ''}${developer.trendValue}`}
                </span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">{developer.bio}</p>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-lg">{getFlagEmoji(developer.countryCode)}</span>
                <span>{developer.city}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-bold">{developer.score}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4 text-muted-foreground" />
                <span>{formatExperience(developer.portfolioViews)}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {developer.languages.slice(0, 4).map((lang, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {lang}
                </Badge>
              ))}
              {developer.languages.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{developer.languages.length - 4}
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                {developer.isAvailableForHire && (
                  <Badge className="bg-green-100 text-green-800 border-green-300">
                    Available for hire
                  </Badge>
                )}
                {developer.isPremium && (
                  <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                    Premium
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {developer.hourlyRate && `$${developer.hourlyRate}/hr`}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderDetailModal = () => {
    if (!selectedDeveloper || !showDetailModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
          <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Developer Profile</h2>
            <Button variant="ghost" size="sm" onClick={() => setShowDetailModal(false)}>
              <XCircle className="w-5 h-5" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Avatar className="w-24 h-24 ring-4 ring-border">
                    <AvatarImage src={selectedDeveloper.avatar} />
                    <AvatarFallback className="text-2xl font-bold">
                      {selectedDeveloper.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                    #{selectedDeveloper.rank}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold">{selectedDeveloper.name}</h3>
                    {selectedDeveloper.isVerified && (
                      <CheckCircle className="w-6 h-6 text-blue-500" />
                    )}
                  </div>
                  <p className="text-muted-foreground">@{selectedDeveloper.username}</p>
                  <p className="text-sm">{selectedDeveloper.bio}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedDeveloper.city}, {selectedDeveloper.country}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedDeveloper.timezone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {new Date(selectedDeveloper.joinedDate).getFullYear()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:ml-auto space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="text-center p-4">
                    <div className="text-2xl font-bold text-primary">{selectedDeveloper.score}</div>
                    <div className="text-sm text-muted-foreground">Overall Score</div>
                  </Card>
                  <Card className="text-center p-4">
                    <div className="text-2xl font-bold">{formatExperience(selectedDeveloper.experience)}</div>
                    <div className="text-sm text-muted-foreground">Experience</div>
                  </Card>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1 professional-gradient text-primary-foreground">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-xl font-bold">{selectedDeveloper.skillScore}</div>
                <div className="text-sm text-muted-foreground">Skill Score</div>
              </Card>
              <Card className="p-4 text-center">
                <BarChart3 className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <div className="text-xl font-bold">{selectedDeveloper.projectScore}</div>
                <div className="text-sm text-muted-foreground">Project Score</div>
              </Card>
              <Card className="p-4 text-center">
                <Users className="w-6 h-6 mx-auto mb-2 text-green-500" />
                <div className="text-xl font-bold">{selectedDeveloper.communityScore}</div>
                <div className="text-sm text-muted-foreground">Community Score</div>
              </Card>
              <Card className="p-4 text-center">
                <Eye className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                <div className="text-xl font-bold">{formatExperience(selectedDeveloper.portfolioViews)}</div>
                <div className="text-sm text-muted-foreground">Portfolio Views</div>
              </Card>
            </div>

            {/* Tabs for detailed info */}
            <Tabs defaultValue="skills" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>

              <TabsContent value="skills" className="space-y-4">
                <div className="grid gap-4">
                  {selectedDeveloper.skills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{skill.experience}</Badge>
                          <span className="text-sm font-bold">{skill.level}%</span>
                        </div>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                      {skill.certifications > 0 && (
                        <div className="text-xs text-muted-foreground">
                          {skill.certifications} certification{skill.certifications > 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-4">
                <div className="grid gap-4">
                  {selectedDeveloper.achievements.map((achievement) => (
                    <Card key={achievement.id} className={`p-4 border-2 ${getRarityColor(achievement.rarity)}`}>
                      <div className="flex items-center gap-3">
                        <achievement.icon className="w-8 h-8" />
                        <div className="flex-1">
                          <h4 className="font-bold">{achievement.title}</h4>
                          <p className="text-sm">{achievement.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{achievement.date}</p>
                        </div>
                        <Badge className={getRarityColor(achievement.rarity)}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="experience" className="space-y-4">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      Work Experience
                    </h4>
                    <div className="space-y-3">
                      {selectedDeveloper.workExperience.map((work, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex items-center gap-3">
                            {work.logo && (
                              <img src={work.logo} alt={work.company} className="w-10 h-10 rounded" />
                            )}
                            <div>
                              <h5 className="font-medium">{work.position}</h5>
                              <p className="text-sm text-muted-foreground">{work.company}</p>
                              <p className="text-xs text-muted-foreground">{work.duration}</p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold mb-3 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      Education
                    </h4>
                    <div className="space-y-3">
                      {selectedDeveloper.education.map((edu, index) => (
                        <Card key={index} className="p-4">
                          <h5 className="font-medium">{edu.degree}</h5>
                          <p className="text-sm text-muted-foreground">{edu.institution}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-muted-foreground">{edu.year}</p>
                            {edu.gpa && (
                              <Badge variant="secondary" className="text-xs">
                                GPA: {edu.gpa}
                              </Badge>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="social" className="space-y-4">
                <div className="grid gap-4">
                  {selectedDeveloper.socialProfiles.map((profile, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            {profile.platform === 'GitHub' && <Github className="w-5 h-5" />}
                            {profile.platform === 'LinkedIn' && <Linkedin className="w-5 h-5" />}
                            {profile.platform === 'StackOverflow' && <MessageSquare className="w-5 h-5" />}
                          </div>
                          <div>
                            <h5 className="font-medium flex items-center gap-2">
                              {profile.platform}
                              {profile.verified && <CheckCircle className="w-4 h-4 text-blue-500" />}
                            </h5>
                            <p className="text-sm text-muted-foreground">@{profile.username}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {profile.repositories && (
                            <div className="text-sm">
                              <span className="font-bold">{profile.repositories}</span> repos
                            </div>
                          )}
                          {profile.stars && (
                            <div className="text-sm">
                              <span className="font-bold">{formatExperience(profile.stars)}</span> stars
                            </div>
                          )}
                          {profile.followers && (
                            <div className="text-sm">
                              <span className="font-bold">{formatExperience(profile.followers)}</span> followers
                            </div>
                          )}
                          {profile.reputation && (
                            <div className="text-sm">
                              <span className="font-bold">{formatExperience(profile.reputation)}</span> reputation
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="availability" className="space-y-4">
                <div className="grid gap-4">
                  <Card className="p-4">
                    <h5 className="font-medium mb-3">Availability Status</h5>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Available for hire</span>
                        <Badge className={selectedDeveloper.isAvailableForHire ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                          {selectedDeveloper.isAvailableForHire ? 'Yes' : 'No'}
                        </Badge>
                      </div>
                      {selectedDeveloper.hourlyRate && (
                        <div className="flex items-center justify-between">
                          <span>Hourly Rate</span>
                          <span className="font-bold">${selectedDeveloper.hourlyRate}/hr</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span>Response Time</span>
                        <span>{selectedDeveloper.responseTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Completed Projects</span>
                        <span className="font-bold">{selectedDeveloper.completedProjects}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Client Rating</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-bold">{selectedDeveloper.clientRating}</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h5 className="font-medium mb-3">Preferred Work Types</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedDeveloper.preferredWorkType.map((type, index) => (
                        <Badge key={index} variant="secondary">{type}</Badge>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h5 className="font-medium mb-3">Specializations</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedDeveloper.specializations.map((spec, index) => (
                        <Badge key={index} className="professional-gradient text-primary-foreground">{spec}</Badge>
                      ))}
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground instrument">Developer Rankings</h1>
              <p className="text-muted-foreground">
                Discover and compare top developers worldwide based on AI-powered skill analysis
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export ({filteredAndSortedDevelopers.length})
              </Button>
              <Button className="professional-gradient text-primary-foreground gap-2">
                <Zap className="w-4 h-4" />
                Try Premium
              </Button>
            </div>
          </div>

          {/* Call to Action Banner */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-6 text-center">
              <p className="text-foreground mb-4">
                Interested in hiring someone from this list? Try DevRank Pro and access 10 times more 
                profiles with detailed analytics and advanced search filters.
              </p>
              <Button className="professional-gradient text-primary-foreground">
                Try Pro for Free
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Time Period Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <TabsList className="grid w-full lg:w-auto grid-cols-3">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>

            {/* Advanced Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search developers..."
                  className="pl-10 w-64"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                />
              </div>
              
              <Select value={filters.country} onValueChange={(value) => setFilters(prev => ({ ...prev, country: value }))}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.technology} onValueChange={(value) => setFilters(prev => ({ ...prev, technology: value }))}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Technology" />
                </SelectTrigger>
                <SelectContent>
                  {technologies.map((tech) => (
                    <SelectItem key={tech} value={tech.toLowerCase().replace(' ', '-')}>
                      {tech}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.availability} onValueChange={(value) => setFilters(prev => ({ ...prev, availability: value }))}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.verification} onValueChange={(value) => setFilters(prev => ({ ...prev, verification: value }))}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Verification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="unverified">Unverified</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'table' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                >
                  Table
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </Button>
              </div>
            </div>
          </div>

          <TabsContent value={activeTab} className="space-y-6">
            {/* Top 3 Podium */}
            <Card className="professional-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Top Performers
                </CardTitle>
                <CardDescription>
                  Leading developers this {activeTab.slice(0, -2)} • Showing {filteredAndSortedDevelopers.length} results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col lg:flex-row items-end justify-center gap-8 py-8">
                  {/* 2nd Place */}
                  <div className="flex flex-col items-center space-y-4 order-2 lg:order-1 cursor-pointer hover:scale-105 transition-transform" onClick={() => { setSelectedDeveloper(topDevelopers[1]); setShowDetailModal(true); }}>
                    <Avatar className="w-16 h-16 ring-4 ring-gray-300">
                      <AvatarImage src={topDevelopers[1].avatar} />
                      <AvatarFallback className="text-lg font-bold">
                        {topDevelopers[1].name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="font-bold text-lg">{topDevelopers[1].name}</h3>
                      <p className="text-muted-foreground text-sm">@{topDevelopers[1].username}</p>
                      <p className="text-2xl font-bold text-gray-600">{formatExperience(topDevelopers[1].experience)}</p>
                      <div className="flex items-center gap-1 justify-center mt-1">
                        <span className="text-xs text-muted-foreground">{topDevelopers[1].languages.length} languages</span>
                      </div>
                      <div className="flex items-center gap-1 justify-center mt-2">
                        {topDevelopers[1].socialProfiles.map((profile, i) => (
                          <div key={i} className="w-4 h-4 text-muted-foreground">
                            {profile.platform === 'GitHub' && <Github className="w-4 h-4" />}
                            {profile.platform === 'LinkedIn' && <Linkedin className="w-4 h-4" />}
                            {profile.platform === 'StackOverflow' && <MessageSquare className="w-4 h-4" />}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={`${getPodiumHeight(2)} w-24 bg-gradient-to-t ${getPodiumColor(2)} rounded-t-lg flex flex-col items-center justify-start pt-3`}>
                      {getPodiumIcon(2)}
                      <span className="text-white font-bold text-2xl mt-2">2nd</span>
                    </div>
                  </div>

                  {/* 1st Place */}
                  <div className="flex flex-col items-center space-y-4 order-1 lg:order-2 cursor-pointer hover:scale-105 transition-transform" onClick={() => { setSelectedDeveloper(topDevelopers[0]); setShowDetailModal(true); }}>
                    <Avatar className="w-20 h-20 ring-4 ring-yellow-400">
                      <AvatarImage src={topDevelopers[0].avatar} />
                      <AvatarFallback className="text-xl font-bold">
                        {topDevelopers[0].name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="font-bold text-xl">{topDevelopers[0].name}</h3>
                      <p className="text-muted-foreground">@{topDevelopers[0].username}</p>
                      <p className="text-3xl font-bold text-primary">{formatExperience(topDevelopers[0].experience)}</p>
                      <div className="flex items-center gap-1 justify-center mt-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{topDevelopers[0].languages.length} languages</span>
                      </div>
                      <div className="flex items-center gap-1 justify-center mt-2">
                        {topDevelopers[0].socialProfiles.map((profile, i) => (
                          <div key={i} className="w-4 h-4 text-muted-foreground">
                            {profile.platform === 'GitHub' && <Github className="w-4 h-4" />}
                            {profile.platform === 'LinkedIn' && <Linkedin className="w-4 h-4" />}
                            {profile.platform === 'StackOverflow' && <MessageSquare className="w-4 h-4" />}
                          </div>
                        ))}
                      </div>
                      <Badge className="mt-2 bg-yellow-100 text-yellow-800 border-yellow-300">
                        {topDevelopers[0].isVerified ? 'Verified' : 'Rising Star'}
                      </Badge>
                    </div>
                    <div className={`${getPodiumHeight(1)} w-28 bg-gradient-to-t ${getPodiumColor(1)} rounded-t-lg flex flex-col items-center justify-start pt-3`}>
                      {getPodiumIcon(1)}
                      <span className="text-white font-bold text-3xl mt-2">1st</span>
                    </div>
                  </div>

                  {/* 3rd Place */}
                  <div className="flex flex-col items-center space-y-4 order-3 cursor-pointer hover:scale-105 transition-transform" onClick={() => { setSelectedDeveloper(topDevelopers[2]); setShowDetailModal(true); }}>
                    <Avatar className="w-14 h-14 ring-4 ring-orange-400">
                      <AvatarImage src={topDevelopers[2].avatar} />
                      <AvatarFallback className="text-lg font-bold">
                        {topDevelopers[2].name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="font-bold text-lg">{topDevelopers[2].name}</h3>
                      <p className="text-muted-foreground text-sm">@{topDevelopers[2].username}</p>
                      <p className="text-xl font-bold text-orange-600">{formatExperience(topDevelopers[2].experience)}</p>
                      <div className="flex items-center gap-1 justify-center mt-1">
                        <span className="text-xs text-muted-foreground">{topDevelopers[2].languages.length} languages</span>
                      </div>
                      <div className="flex items-center gap-1 justify-center mt-2">
                        {topDevelopers[2].socialProfiles.map((profile, i) => (
                          <div key={i} className="w-4 h-4 text-muted-foreground">
                            {profile.platform === 'GitHub' && <Github className="w-4 h-4" />}
                            {profile.platform === 'LinkedIn' && <Linkedin className="w-4 h-4" />}
                            {profile.platform === 'StackOverflow' && <MessageSquare className="w-4 h-4" />}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={`${getPodiumHeight(3)} w-20 bg-gradient-to-t ${getPodiumColor(3)} rounded-t-lg flex flex-col items-center justify-start pt-3`}>
                      {getPodiumIcon(3)}
                      <span className="text-white font-bold text-xl mt-2">3rd</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rankings Section */}
            <Card className="professional-shadow">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Full Rankings
                    </CardTitle>
                    <CardDescription>
                      Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredAndSortedDevelopers.length)} of {filteredAndSortedDevelopers.length} developers
                    </CardDescription>
                  </div>

                  <div className="flex items-center gap-3">
                    <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rank">Rank</SelectItem>
                        <SelectItem value="score">Score</SelectItem>
                        <SelectItem value="experience">Experience</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="views">Views</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setFilters(prev => ({ ...prev, sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc' }))}
                    >
                      {filters.sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                    </Button>

                    <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {paginatedDevelopers.map(renderDeveloperCard)}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Table Header */}
                    <div className="grid grid-cols-2 lg:grid-cols-8 gap-4 pb-3 border-b border-border text-sm font-medium text-muted-foreground">
                      <div className="hidden lg:block">Rank</div>
                      <div className="col-span-1 lg:col-span-2">Developer</div>
                      <div className="hidden lg:block">Location</div>
                      <div className="hidden lg:block">Skills</div>
                      <div className="col-span-1 lg:col-span-1">Score</div>
                      <div className="hidden lg:block">Status</div>
                      <div className="hidden lg:block">Trend</div>
                    </div>

                    {/* Table Rows */}
                    <div className="space-y-3">
                      {paginatedDevelopers.map((developer) => (
                        <div 
                          key={developer.id} 
                          className="grid grid-cols-2 lg:grid-cols-8 gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors border border-border cursor-pointer"
                          onClick={() => { setSelectedDeveloper(developer); setShowDetailModal(true); }}
                        >
                          {/* Rank */}
                          <div className="hidden lg:flex items-center gap-2">
                            <span className="font-bold text-lg">#{developer.rank}</span>
                            {developer.rank <= 3 && (
                              <div className="w-6 h-6">
                                {getPodiumIcon(developer.rank)}
                              </div>
                            )}
                            {developer.previousRank && developer.previousRank !== developer.rank && (
                              <div className="text-xs text-muted-foreground">
                                {developer.previousRank > developer.rank ? `↑${developer.previousRank - developer.rank}` : `↓${developer.rank - developer.previousRank}`}
                              </div>
                            )}
                          </div>

                          {/* Developer Info */}
                          <div className="col-span-1 lg:col-span-2">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage src={developer.avatar} />
                                  <AvatarFallback>
                                    {developer.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                {/* Mobile rank indicator */}
                                <div className="lg:hidden absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                  <span className="text-xs font-bold text-primary-foreground">#{developer.rank}</span>
                                </div>
                                {developer.isVerified && (
                                  <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                                    <CheckCircle className="w-2 h-2" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-sm lg:text-base">{developer.name}</p>
                                <p className="text-xs lg:text-sm text-muted-foreground">@{developer.username}</p>
                                {/* Mobile location */}
                                <div className="lg:hidden flex items-center gap-1 mt-1">
                                  <span className="text-sm">{getFlagEmoji(developer.countryCode)}</span>
                                  <span className="text-xs text-muted-foreground">{developer.city}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Location - Desktop only */}
                          <div className="hidden lg:flex items-center gap-2">
                            <span className="text-lg">{getFlagEmoji(developer.countryCode)}</span>
                            <div>
                              <p className="font-medium text-sm">{developer.city}</p>
                              <p className="text-xs text-muted-foreground">{developer.country}</p>
                            </div>
                          </div>

                          {/* Skills - Desktop only */}
                          <div className="hidden lg:block">
                            <div className="flex flex-wrap gap-1">
                              {developer.languages.slice(0, 2).map((lang, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {lang}
                                </Badge>
                              ))}
                              {developer.languages.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{developer.languages.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Score */}
                          <div className="col-span-1 lg:col-span-1">
                            <div className="text-right lg:text-left">
                              <p className="font-bold text-lg">{developer.score}</p>
                              <div className="flex items-center gap-1 justify-end lg:justify-start">
                                <Star className="w-3 h-3 text-yellow-500" />
                                <span className="text-xs text-muted-foreground">{formatExperience(developer.experience)}</span>
                              </div>
                              {/* Mobile skills */}
                              <div className="lg:hidden flex flex-wrap gap-1 mt-2 justify-end">
                                {developer.languages.slice(0, 2).map((lang, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {lang}
                                  </Badge>
                                ))}
                                {developer.languages.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{developer.languages.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Status - Desktop only */}
                          <div className="hidden lg:flex items-center gap-1">
                            <div className="flex flex-col gap-1">
                              {developer.isAvailableForHire && (
                                <Badge className="bg-green-100 text-green-800 border-green-300 text-xs">
                                  Available
                                </Badge>
                              )}
                              {developer.isPremium && (
                                <Badge className="bg-purple-100 text-purple-800 border-purple-300 text-xs">
                                  Premium
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Trend - Desktop only */}
                          <div className="hidden lg:flex items-center gap-1">
                            {getTrendIcon(developer.trend, developer.trendValue)}
                            <span className={`text-sm font-medium ${
                              developer.trend === 'up' ? 'text-green-600' : 
                              developer.trend === 'down' ? 'text-red-600' : 
                              'text-muted-foreground'
                            }`}>
                              {developer.trend === 'stable' ? '0' : 
                                `${developer.trend === 'up' ? '+' : ''}${developer.trendValue}`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
                    <div className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>
                      
                      <div className="hidden lg:flex items-center gap-1">
                        {renderPaginationButtons()}
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Detail Modal */}
        {renderDetailModal()}
      </div>
    </div>
  );
}