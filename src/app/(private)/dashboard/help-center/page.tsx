'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Lightbulb, 
  Bug, 
  Plus, 
  Settings,
  Send,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Code2,
  Users,
  Zap,
  Heart,
  MessageCircle,
  ArrowLeft,
  Star,
  ThumbsUp,
  Eye,
  Paperclip,
  X,
  Upload,
  FileImage,
  File,
  Download,
  Filter,
  Search,
  TrendingUp,
  Calendar,
  Clock,
  Mail,
  Phone,
  Globe,
  Twitter,
  Github,
  Linkedin,
  ExternalLink,
  ChevronRight,
  MoreHorizontal,
  Flag,
  Bookmark,
  Share2,
  ShieldAlert
} from 'lucide-react';

interface SuggestionFormData {
  title: string;
  category: string;
  priority: string;
  description: string;
  email: string;
  name: string;
  expectedImpact: string;
  userStory: string;
  acceptanceCriteria: string;
  attachments: Array<{
    id: string;
    name: string;
    size: string;
    type: string;
  }>;
  tags: string[];
  isAnonymous: boolean;
  allowUpdates: boolean;
}

interface RecentSuggestion {
  id: string;
  title: string;
  category: string;
  status: 'pending' | 'in-review' | 'planned' | 'in-progress' | 'completed' | 'rejected';
  votes: number;
  comments: number;
  date: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  priority: string;
  tags: string[];
  excerpt: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  department: string;
}

const categories = [
  {
    id: 'enhancement',
    label: 'Enhancement',
    description: 'Improve an existing feature',
    icon: Sparkles,
    color: 'bg-blue-500/10 text-blue-600 border-blue-200',
    examples: ['Better UI/UX', 'Performance improvements', 'New options']
  },
  {
    id: 'bug-fix',
    label: 'Bug Fix',
    description: 'Report a bug or issue',
    icon: Bug,
    color: 'bg-red-500/10 text-red-600 border-red-200',
    examples: ['Application crashes', 'Incorrect data', 'UI glitches']
  },
  {
    id: 'new-feature',
    label: 'New Feature',
    description: 'Suggest a new feature',
    icon: Plus,
    color: 'bg-green-500/10 text-green-600 border-green-200',
    examples: ['New functionality', 'Additional tools', 'New integrations']
  },
  {
    id: 'integration',
    label: 'Integration',
    description: 'Third-party service integration',
    icon: Code2,
    color: 'bg-purple-500/10 text-purple-600 border-purple-200',
    examples: ['API connections', 'External services', 'Platform sync']
  },
  {
    id: 'ui-ux',
    label: 'UI/UX',
    description: 'User interface improvements',
    icon: Eye,
    color: 'bg-pink-500/10 text-pink-600 border-pink-200',
    examples: ['Design changes', 'User experience', 'Accessibility']
  },
  {
    id: 'performance',
    label: 'Performance',
    description: 'Speed and optimization',
    icon: Zap,
    color: 'bg-yellow-500/10 text-yellow-600 border-yellow-200',
    examples: ['Load times', 'Optimization', 'Resource usage']
  },
  {
    id: 'security',
    label: 'Security',
    description: 'Security improvements',
    icon: ShieldAlert,
    color: 'bg-orange-500/10 text-orange-600 border-orange-200',
    examples: ['Authentication', 'Data protection', 'Privacy']
  },
  {
    id: 'other',
    label: 'Other',
    description: 'Other type of request',
    icon: Settings,
    color: 'bg-gray-500/10 text-gray-600 border-gray-200',
    examples: ['Documentation', 'General feedback', 'Miscellaneous']
  }
];

const priorities = [
  { 
    value: 'low', 
    label: 'Low', 
    color: 'bg-gray-100 text-gray-800',
    description: 'Nice to have, not urgent'
  },
  { 
    value: 'medium', 
    label: 'Medium', 
    color: 'bg-yellow-100 text-yellow-800',
    description: 'Important but not critical'
  },
  { 
    value: 'high', 
    label: 'High', 
    color: 'bg-orange-100 text-orange-800',
    description: 'Important and time-sensitive'
  },
  { 
    value: 'critical', 
    label: 'Critical', 
    color: 'bg-red-100 text-red-800',
    description: 'Urgent, blocks functionality'
  }
];

const popularTags = [
  'mobile', 'desktop', 'api', 'dashboard', 'reports', 'analytics', 'notifications',
  'search', 'filters', 'export', 'import', 'automation', 'accessibility', 'performance'
];

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Product Manager',
    avatar: '/api/placeholder/40/40',
    department: 'Product'
  },
  {
    id: '2',
    name: 'Mike Chen',
    role: 'Lead Developer',
    avatar: '/api/placeholder/40/40',
    department: 'Engineering'
  },
  {
    id: '3',
    name: 'Emily Davis',
    role: 'UX Designer',
    avatar: '/api/placeholder/40/40',
    department: 'Design'
  }
];

const recentSuggestions: RecentSuggestion[] = [
  {
    id: '1',
    title: 'Dark mode toggle for better user experience during night coding sessions',
    category: 'enhancement',
    status: 'completed',
    votes: 247,
    comments: 34,
    date: '2024-01-15',
    author: {
      name: 'Alex Rodriguez',
      username: 'alex_dev',
      avatar: '/api/placeholder/32/32',
      verified: true
    },
    priority: 'medium',
    tags: ['ui', 'accessibility', 'theme'],
    excerpt: 'As a developer who works late hours, I would love to have a dark mode option to reduce eye strain...'
  },
  {
    id: '2',
    title: 'GitHub integration for automatic profile synchronization',
    category: 'integration',
    status: 'in-progress',
    votes: 189,
    comments: 28,
    date: '2024-01-10',
    author: {
      name: 'Sarah Kim',
      username: 'sarah_codes',
      avatar: '/api/placeholder/32/32',
      verified: false
    },
    priority: 'high',
    tags: ['github', 'sync', 'automation'],
    excerpt: 'Automatically sync repository stats, contributions, and project data from GitHub to keep profiles updated...'
  },
  {
    id: '3',
    title: 'Mobile application for iOS and Android platforms',
    category: 'new-feature',
    status: 'planned',
    votes: 456,
    comments: 67,
    date: '2024-01-08',
    author: {
      name: 'David Park',
      username: 'mobile_dev',
      avatar: '/api/placeholder/32/32',
      verified: true
    },
    priority: 'high',
    tags: ['mobile', 'ios', 'android', 'app'],
    excerpt: 'A native mobile app would allow developers to access their profiles and rankings on the go...'
  },
  {
    id: '4',
    title: 'Advanced filtering options for developer search',
    category: 'enhancement',
    status: 'in-review',
    votes: 134,
    comments: 19,
    date: '2024-01-05',
    author: {
      name: 'Lisa Zhang',
      username: 'data_analyst',
      avatar: '/api/placeholder/32/32',
      verified: false
    },
    priority: 'medium',
    tags: ['search', 'filters', 'discovery'],
    excerpt: 'Add more granular filters like years of experience, specific technologies, location radius...'
  },
  {
    id: '5',
    title: 'Real-time collaboration features for team projects',
    category: 'new-feature',
    status: 'pending',
    votes: 89,
    comments: 15,
    date: '2024-01-03',
    author: {
      name: 'John Smith',
      username: 'team_lead',
      avatar: '/api/placeholder/32/32',
      verified: true
    },
    priority: 'low',
    tags: ['collaboration', 'teams', 'realtime'],
    excerpt: 'Enable teams to collaborate on projects with real-time updates, shared workspaces...'
  }
];

// Add missing Shield import
const Shield = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

export default function DevRankSuggestionPage() {
  const [formData, setFormData] = useState<SuggestionFormData>({
    title: '',
    category: '',
    priority: 'medium',
    description: '',
    email: '',
    name: '',
    expectedImpact: '',
    userStory: '',
    acceptanceCriteria: '',
    attachments: [],
    tags: [],
    isAnonymous: false,
    allowUpdates: true
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const updateFormData = (field: keyof SuggestionFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      updateFormData('tags', [...formData.tags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    updateFormData('tags', formData.tags.filter(t => t !== tag));
  };

  const addAttachment = (file: any) => {
    const attachment = {
      id: Date.now().toString(),
      name: file.name || 'Attachment',
      size: '2.5 MB',
      type: 'image'
    };
    updateFormData('attachments', [...formData.attachments, attachment]);
  };

  const removeAttachment = (id: string) => {
    updateFormData('attachments', formData.attachments.filter(a => a.id !== id));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      priority: 'medium',
      description: '',
      email: '',
      name: '',
      expectedImpact: '',
      userStory: '',
      acceptanceCriteria: '',
      attachments: [],
      tags: [],
      isAnonymous: false,
      allowUpdates: true
    });
    setIsSubmitted(false);
    setCurrentStep(1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-review': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'planned': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-3 h-3" />;
      case 'in-progress': return <Zap className="w-3 h-3" />;
      case 'in-review': return <Eye className="w-3 h-3" />;
      case 'planned': return <Star className="w-3 h-3" />;
      case 'pending': return <Clock className="w-3 h-3" />;
      case 'rejected': return <X className="w-3 h-3" />;
      default: return <AlertCircle className="w-3 h-3" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    const priorityObj = priorities.find(p => p.value === priority);
    return priorityObj?.color || 'bg-gray-100 text-gray-800';
  };

  const filteredSuggestions = recentSuggestions.filter(suggestion => {
    const matchesStatus = filterStatus === 'all' || suggestion.status === filterStatus;
    const matchesSearch = suggestion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         suggestion.author.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-lg w-full text-center professional-shadow">
          <CardContent className="p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold mb-3 instrument">Thank You!</h2>
            <p className="text-lg text-muted-foreground mb-2">
              Your suggestion has been submitted successfully.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              We'll review it and get back to you soon. You'll receive updates at <strong>{formData.email}</strong>
            </p>
            
            <div className="bg-muted/30 rounded-lg p-4 mb-6">
              <h3 className="font-medium mb-2">What happens next?</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Our team will review your suggestion within 3-5 business days</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>You'll receive email updates on the status</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Community members can vote and comment on your idea</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button onClick={resetForm} className="w-full professional-gradient text-primary-foreground">
                Submit Another Suggestion
              </Button>
              <Button variant="outline" className="w-full" onClick={() => setShowAllSuggestions(true)}>
                <MessageCircle className="w-4 h-4 mr-2" />
                View Community Suggestions
              </Button>
              <Button variant="ghost" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-bold">Feature Requests</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => setShowAllSuggestions(!showAllSuggestions)}>
                <Eye className="w-4 h-4 mr-2" />
                {showAllSuggestions ? 'Submit Request' : 'View All'}
              </Button>
              <Button size="sm" className="professional-gradient text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Quick Submit
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {showAllSuggestions ? (
          // All Suggestions View
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground instrument mb-2">Community Suggestions</h2>
              <p className="text-lg text-muted-foreground">
                Browse and vote on feature requests from the DevRank community
              </p>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search suggestions..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full lg:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-review">In Review</SelectItem>
                      <SelectItem value="planned">Planned</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Suggestions List */}
            <div className="space-y-4">
              {filteredSuggestions.map((suggestion) => (
                <Card key={suggestion.id} className="professional-shadow hover:shadow-lg transition-all duration-200 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center gap-2 min-w-[60px]">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ThumbsUp className="w-4 h-4" />
                        </Button>
                        <span className="text-sm font-bold">{suggestion.votes}</span>
                      </div>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-2">
                            <h3 className="font-bold text-lg leading-tight">{suggestion.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{suggestion.excerpt}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={`${getStatusColor(suggestion.status)} text-xs flex items-center gap-1`}>
                              {getStatusIcon(suggestion.status)}
                              {suggestion.status.replace('-', ' ')}
                            </Badge>
                            <Badge className={`${getPriorityColor(suggestion.priority)} text-xs`}>
                              {suggestion.priority}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {suggestion.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={suggestion.author.avatar} />
                                <AvatarFallback className="text-xs">
                                  {suggestion.author.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{suggestion.author.name}</span>
                              {suggestion.author.verified && (
                                <CheckCircle className="w-3 h-3 text-blue-500" />
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(suggestion.date).toLocaleDateString()}
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              {suggestion.comments}
                            </div>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline" size="lg">
                Load More Suggestions
              </Button>
            </div>
          </div>
        ) : (
          // Submit Form View
          <div>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-primary-foreground" />
                </div>
                <h1 className="text-3xl font-bold text-foreground instrument">Feature Requests & Suggestions</h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Help us improve DevRank by sharing your ideas and suggestions. Every piece of feedback helps us build a better platform for developers worldwide.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2">
                <Card className="professional-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Send className="w-5 h-5 text-primary" />
                          Submit a Feature Request
                        </CardTitle>
                        <CardDescription>
                          Help us improve by sharing your ideas and suggestions
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">Step {currentStep} of 3</Badge>
                    </div>
                    <Progress value={(currentStep / 3) * 100} className="mt-4" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {/* Step 1: Basic Information */}
                      {currentStep >= 1 && (
                        <div className="space-y-6">
                          <div className="flex items-center gap-2 text-primary font-medium">
                            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">1</div>
                            Basic Information
                          </div>

                          {/* Title */}
                          <div className="space-y-2">
                            <Label htmlFor="title">Request Title *</Label>
                            <Input
                              id="title"
                              value={formData.title}
                              onChange={(e) => updateFormData('title', e.target.value)}
                              placeholder="Brief description of your request"
                              className="h-12"
                            />
                            <p className="text-xs text-muted-foreground">
                              A clear and concise title that summarizes your request
                            </p>
                          </div>

                          {/* Category Selection */}
                          <div className="space-y-3">
                            <Label>Category *</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {categories.map((category) => (
                                <label key={category.id} className="cursor-pointer">
                                  <input
                                    type="radio"
                                    name="category"
                                    value={category.id}
                                    checked={formData.category === category.id}
                                    onChange={(e) => updateFormData('category', e.target.value)}
                                    className="sr-only"
                                  />
                                  <div className={`
                                    p-4 border-2 rounded-lg transition-all duration-200 hover:shadow-md
                                    ${formData.category === category.id 
                                      ? 'border-primary bg-primary/5 shadow-md' 
                                      : 'border-border hover:border-primary/50'
                                    }
                                  `}>
                                    <div className="flex items-start gap-3">
                                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${category.color}`}>
                                        <category.icon className="w-4 h-4" />
                                      </div>
                                      <div className="flex-1">
                                        <h4 className="font-medium text-sm">{category.label}</h4>
                                        <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
                                        <div className="mt-2">
                                          <p className="text-xs font-medium text-muted-foreground">Examples:</p>
                                          <p className="text-xs text-muted-foreground">{category.examples.join(', ')}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Priority & Contact Info */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="priority">Priority Level</Label>
                              <Select value={formData.priority} onValueChange={(value) => updateFormData('priority', value)}>
                                <SelectTrigger className="h-12">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {priorities.map(priority => (
                                    <SelectItem key={priority.value} value={priority.value}>
                                      <div className="flex items-center gap-3">
                                        <Badge className={`${priority.color} text-xs`}>
                                          {priority.label}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground">{priority.description}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="expectedImpact">Expected Impact</Label>
                              <Select value={formData.expectedImpact} onValueChange={(value) => updateFormData('expectedImpact', value)}>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Select impact level" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="individual">Individual users</SelectItem>
                                  <SelectItem value="team">Team/Organization</SelectItem>
                                  <SelectItem value="community">Entire community</SelectItem>
                                  <SelectItem value="platform">Platform-wide</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 2: Detailed Description */}
                      {currentStep >= 2 && (
                        <div className="space-y-6">
                          <div className="flex items-center gap-2 text-primary font-medium">
                            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">2</div>
                            Detailed Description
                          </div>

                          {/* Main Description */}
                          <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                              id="description"
                              value={formData.description}
                              onChange={(e) => updateFormData('description', e.target.value)}
                              placeholder="Describe your feature request in detail..."
                              rows={6}
                              className="resize-none"
                            />
                            <p className="text-xs text-muted-foreground">
                              Provide detailed information about your request, including any relevant context or examples.
                            </p>
                          </div>

                          {/* User Story */}
                          <div className="space-y-2">
                            <Label htmlFor="userStory">User Story (Optional)</Label>
                            <Textarea
                              id="userStory"
                              value={formData.userStory}
                              onChange={(e) => updateFormData('userStory', e.target.value)}
                              placeholder="As a [type of user], I want [goal] so that [benefit]..."
                              rows={3}
                              className="resize-none"
                            />
                            <p className="text-xs text-muted-foreground">
                              Describe the request from a user's perspective
                            </p>
                          </div>

                          {/* Acceptance Criteria */}
                          <div className="space-y-2">
                            <Label htmlFor="acceptanceCriteria">Acceptance Criteria (Optional)</Label>
                            <Textarea
                              id="acceptanceCriteria"
                              value={formData.acceptanceCriteria}
                              onChange={(e) => updateFormData('acceptanceCriteria', e.target.value)}
                              placeholder="- The feature should...&#10;- Users should be able to...&#10;- The system should..."
                              rows={4}
                              className="resize-none"
                            />
                            <p className="text-xs text-muted-foreground">
                              Define what "done" looks like for this feature
                            </p>
                          </div>

                          {/* Tags */}
                          <div className="space-y-3">
                            <Label>Tags (Optional)</Label>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {formData.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="gap-1">
                                  {tag}
                                  <X 
                                    className="w-3 h-3 cursor-pointer" 
                                    onClick={() => removeTag(tag)}
                                  />
                                </Badge>
                              ))}
                            </div>
                            <div className="space-y-2">
                              <p className="text-xs text-muted-foreground">Popular tags:</p>
                              <div className="flex flex-wrap gap-2">
                                {popularTags.filter(tag => !formData.tags.includes(tag)).slice(0, 8).map(tag => (
                                  <Button
                                    key={tag}
                                    variant="outline"
                                    size="sm"
                                    className="h-6 text-xs"
                                    onClick={() => addTag(tag)}
                                  >
                                    + {tag}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 3: Contact & Preferences */}
                      {currentStep >= 3 && (
                        <div className="space-y-6">
                          <div className="flex items-center gap-2 text-primary font-medium">
                            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">3</div>
                            Contact & Preferences
                          </div>

                          {/* Contact Information */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Your Name</Label>
                              <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => updateFormData('name', e.target.value)}
                                placeholder="John Doe"
                                className="h-12"
                                disabled={formData.isAnonymous}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email Address</Label>
                              <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => updateFormData('email', e.target.value)}
                                placeholder="john@example.com"
                                className="h-12"
                                disabled={formData.isAnonymous}
                              />
                            </div>
                          </div>

                          {/* Preferences */}
                          <div className="space-y-4">
                            <div className="space-y-3">
                              <h4 className="font-medium">Submission Preferences</h4>
                              <div className="space-y-3">
                                <label className="flex items-center space-x-3">
                                  <input 
                                    type="checkbox" 
                                    checked={formData.isAnonymous}
                                    onChange={(e) => updateFormData('isAnonymous', e.target.checked)}
                                    className="rounded"
                                  />
                                  <div>
                                    <span className="text-sm font-medium">Submit anonymously</span>
                                    <p className="text-xs text-muted-foreground">Your name won't be shown publicly</p>
                                  </div>
                                </label>
                                <label className="flex items-center space-x-3">
                                  <input 
                                    type="checkbox" 
                                    checked={formData.allowUpdates}
                                    onChange={(e) => updateFormData('allowUpdates', e.target.checked)}
                                    className="rounded"
                                  />
                                  <div>
                                    <span className="text-sm font-medium">Receive status updates</span>
                                    <p className="text-xs text-muted-foreground">Get notified when the status changes</p>
                                  </div>
                                </label>
                              </div>
                            </div>
                          </div>

                          {/* Attachments */}
                          <div className="space-y-3">
                            <Label>Attachments (Optional)</Label>
                            <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                              <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground mb-2">
                                Drop files here or click to upload
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Screenshots, mockups, or documents (max 10MB each)
                              </p>
                              <Button variant="outline" size="sm" className="mt-3" onClick={() => addAttachment({ name: 'screenshot.png' })}>
                                <Paperclip className="w-4 h-4 mr-2" />
                                Choose Files
                              </Button>
                            </div>

                            {formData.attachments.length > 0 && (
                              <div className="space-y-2">
                                {formData.attachments.map((attachment) => (
                                  <div key={attachment.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                    <div className="flex items-center gap-3">
                                      <FileImage className="w-5 h-5 text-muted-foreground" />
                                      <div>
                                        <p className="text-sm font-medium">{attachment.name}</p>
                                        <p className="text-xs text-muted-foreground">{attachment.size}</p>
                                      </div>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      onClick={() => removeAttachment(attachment.id)}
                                    >
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Navigation Buttons */}
                      <div className="flex items-center justify-between pt-6 border-t border-border">
                        <Button 
                          variant="outline" 
                          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                          disabled={currentStep === 1}
                          className="gap-2"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Previous
                        </Button>

                        <div className="text-sm text-muted-foreground">
                          Step {currentStep} of 3
                        </div>

                        {currentStep === 3 ? (
                          <Button 
                            onClick={handleSubmit}
                            disabled={isSubmitting || !formData.title || !formData.category || !formData.description}
                            className="professional-gradient text-primary-foreground gap-2"
                          >
                            {isSubmitting ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4" />
                                Submit Request
                              </>
                            )}
                          </Button>
                        ) : (
                          <Button 
                            onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
                            disabled={currentStep === 1 && (!formData.title || !formData.category)}
                            className="gap-2"
                          >
                            Next
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Community Impact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-primary" />
                        <span className="text-sm">Total Suggestions</span>
                      </div>
                      <span className="font-bold">1,247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Implemented</span>
                      </div>
                      <span className="font-bold text-green-600">89</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">In Development</span>
                      </div>
                      <span className="font-bold text-blue-600">23</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-500" />
                        <span className="text-sm">Contributors</span>
                      </div>
                      <span className="font-bold text-purple-600">456</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Team Members */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Our Team</CardTitle>
                    <CardDescription>The people reviewing your suggestions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Recent Suggestions Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Suggestions</CardTitle>
                    <CardDescription>See what others are requesting</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentSuggestions.slice(0, 3).map((suggestion) => (
                      <div key={suggestion.id} className="space-y-2 p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-medium text-sm leading-tight line-clamp-2">{suggestion.title}</h4>
                          <Badge className={`${getStatusColor(suggestion.status)} text-xs flex items-center gap-1 flex-shrink-0`}>
                            {getStatusIcon(suggestion.status)}
                            {suggestion.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>by @{suggestion.author.username}</span>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" />
                              {suggestion.votes}
                            </div>
                            <span>{new Date(suggestion.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full mt-4" onClick={() => setShowAllSuggestions(true)}>
                      View All Suggestions
                    </Button>
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      Tips for Great Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                      <p>Be specific and clear about what you want</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                      <p>Explain why this feature would be valuable</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                      <p>Include examples or use cases if possible</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                      <p>Search existing suggestions to avoid duplicates</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                      <p>Add relevant tags to help with categorization</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}