'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Github, 
  Linkedin, 
  Twitter,
  Code2, 
  Briefcase, 
  GraduationCap,
  Target,
  DollarSign,
  Building,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Upload,
  X,
  Plus,
  Trash2,
  ExternalLink,
  Star,
  Award,
  Trophy,
  Zap,
  Coffee,
  Monitor,
  Smartphone,
  Database,
  Cloud,
  Shield,
  Palette,
  Brain,
  FileText,
  Link,
  Eye,
  Settings
} from 'lucide-react';

interface FormData {
  // Step 1: Personal Information
  firstName: string;
  lastName: string;
  displayName: string;
  username: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
  country: string;
  timezone: string;
  gender: string;
  dateOfBirth: string;
  profileImage: string;
  bannerImage: string;
  
  // Step 2: Platform Connections
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
  portfolio: string;
  leetcode: string;
  hackerrank: string;
  codechef: string;
  codeforces: string;
  stackoverflow: string;
  behance: string;
  dribbble: string;
  medium: string;
  devto: string;
  hashnode: string;
  
  // Step 3: Skills & Experience
  currentRole: string;
  seniorityLevel: string;
  yearsOfExperience: string;
  primarySkills: string[];
  secondarySkills: string[];
  languages: string[];
  frameworks: string[];
  databases: string[];
  cloudPlatforms: string[];
  tools: string[];
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    url: string;
  }>;
  
  // Step 4: Career Preferences
  jobTypes: string[];
  workArrangement: string[];
  availableForWork: string;
  expectedSalary: string;
  salaryCurrency: string;
  preferredCompanySize: string[];
  preferredIndustries: string[];
  willingToRelocate: string;
  remoteWorkPreference: string;
  noticePeriod: string;
  
  // Step 5: Portfolio & Projects
  projects: Array<{
    name: string;
    description: string;
    techStack: string[];
    liveUrl: string;
    githubUrl: string;
    image: string;
    featured: boolean;
  }>;
  achievements: Array<{
    title: string;
    description: string;
    date: string;
    type: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    startYear: string;
    endYear: string;
    gpa: string;
  }>;
  workExperience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    current: boolean;
  }>;
}

const steps = [
  { id: 1, title: 'Personal Info', icon: User, description: 'Basic information and profile setup' },
  { id: 2, title: 'Platforms', icon: Globe, description: 'Connect your social and coding profiles' },
  { id: 3, title: 'Skills & Experience', icon: Code2, description: 'Your technical expertise and background' },
  { id: 4, title: 'Career Goals', icon: Target, description: 'Job preferences and career aspirations' },
  { id: 5, title: 'Portfolio', icon: Briefcase, description: 'Showcase your projects and achievements' },
];

const techSkills = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust', 'PHP', 'Ruby',
  'React', 'Vue.js', 'Angular', 'Svelte', 'Node.js', 'Express', 'FastAPI', 'Django', 'Flask',
  'Next.js', 'Nuxt.js', 'Gatsby', 'React Native', 'Flutter', 'Swift', 'Kotlin', 'Xamarin',
  'HTML', 'CSS', 'SASS', 'Tailwind CSS', 'Bootstrap', 'Material-UI', 'Chakra UI',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'SQLite', 'DynamoDB', 'Firebase',
  'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins',
  'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Jira', 'Slack', 'Figma', 'Adobe XD'
];

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'India', 'Australia',
  'Singapore', 'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Switzerland', 'Japan',
  'South Korea', 'China', 'Brazil', 'Mexico', 'Argentina', 'Chile'
];

const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'INR', 'SGD', 'JPY', 'KRW', 'CNY'];

export default function DevRankProfileBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    // Initialize with empty values
    firstName: '',
    lastName: '',
    displayName: '',
    username: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    country: '',
    timezone: '',
    gender: '',
    dateOfBirth: '',
    profileImage: '',
    bannerImage: '',
    github: '',
    linkedin: '',
    twitter: '',
    website: '',
    portfolio: '',
    leetcode: '',
    hackerrank: '',
    codechef: '',
    codeforces: '',
    stackoverflow: '',
    behance: '',
    dribbble: '',
    medium: '',
    devto: '',
    hashnode: '',
    currentRole: '',
    seniorityLevel: '',
    yearsOfExperience: '',
    primarySkills: [],
    secondarySkills: [],
    languages: [],
    frameworks: [],
    databases: [],
    cloudPlatforms: [],
    tools: [],
    certifications: [],
    jobTypes: [],
    workArrangement: [],
    availableForWork: '',
    expectedSalary: '',
    salaryCurrency: 'USD',
    preferredCompanySize: [],
    preferredIndustries: [],
    willingToRelocate: '',
    remoteWorkPreference: '',
    noticePeriod: '',
    projects: [],
    achievements: [],
    education: [],
    workExperience: []
  });

  const progressPercentage = (currentStep / steps.length) * 100;

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addToArray = (field: string, item: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof FormData] as any[]), item]
    }));
  };

  const removeFromArray = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof FormData] as any[]).filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addSkill = (category: 'primarySkills' | 'secondarySkills', skill: string) => {
    if (skill && !formData[category].includes(skill)) {
      updateFormData(category, [...formData[category], skill]);
    }
  };

  const removeSkill = (category: 'primarySkills' | 'secondarySkills', skill: string) => {
    updateFormData(category, formData[category].filter(s => s !== skill));
  };

  const addProject = () => {
    addToArray('projects', {
      name: '',
      description: '',
      techStack: [],
      liveUrl: '',
      githubUrl: '',
      image: '',
      featured: false
    });
  };

  const updateProject = (index: number, field: string, value: any) => {
    const updatedProjects = formData.projects.map((project, i) => 
      i === index ? { ...project, [field]: value } : project
    );
    updateFormData('projects', updatedProjects);
  };

  const addWorkExperience = () => {
    addToArray('workExperience', {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false
    });
  };

  const updateWorkExperience = (index: number, field: string, value: any) => {
    const updatedExperience = formData.workExperience.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    updateFormData('workExperience', updatedExperience);
  };

  const renderStepIndicator = () => (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                currentStep >= step.id 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : 'border-muted-foreground text-muted-foreground'
              }`}
            >
              {currentStep > step.id ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <step.icon className="w-5 h-5" />
              )}
            </div>
            {index < steps.length - 1 && (
              <div 
                className={`hidden lg:block w-16 xl:w-24 h-0.5 ml-2 transition-colors ${
                  currentStep > step.id ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold">{steps[currentStep - 1].title}</h2>
        <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
      </div>
      <Progress value={progressPercentage} className="mt-4" />
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* Profile Images */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Images</CardTitle>
          <CardDescription>Upload your profile picture and banner image</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="space-y-3">
              <Label>Profile Picture</Label>
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={formData.profileImage} />
                  <AvatarFallback className="text-xl">
                    {formData.firstName?.[0]}{formData.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Photo
                </Button>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <Label>Banner Image</Label>
              <div className="border-2 border-dashed border-muted rounded-lg h-32 flex items-center justify-center bg-muted/20">
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload banner image</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => updateFormData('firstName', e.target.value)}
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => updateFormData('lastName', e.target.value)}
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={formData.displayName}
                onChange={(e) => updateFormData('displayName', e.target.value)}
                placeholder="How you want to be displayed"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username *</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => updateFormData('username', e.target.value)}
                placeholder="johndoe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => updateFormData('bio', e.target.value)}
              placeholder="Tell us about yourself, your experience, and what you're passionate about..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Select value={formData.country} onValueChange={(value) => updateFormData('country', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">City/Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
                placeholder="San Francisco, CA"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={formData.timezone} onValueChange={(value) => updateFormData('timezone', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                  <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                  <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                  <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                  <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                  <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                  <SelectItem value="UTC+5:30">Indian Standard Time (UTC+5:30)</SelectItem>
                  <SelectItem value="UTC+8">Singapore Time (UTC+8)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => updateFormData('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPlatformConnections = () => (
    <div className="space-y-6">
      {/* Professional Platforms */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Professional Platforms
          </CardTitle>
          <CardDescription>Connect your professional social media profiles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                value={formData.linkedin}
                onChange={(e) => updateFormData('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter" className="flex items-center gap-2">
                <Twitter className="w-4 h-4" />
                Twitter
              </Label>
              <Input
                id="twitter"
                value={formData.twitter}
                onChange={(e) => updateFormData('twitter', e.target.value)}
                placeholder="https://twitter.com/username"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="website" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Personal Website
              </Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => updateFormData('website', e.target.value)}
                placeholder="https://yourwebsite.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Portfolio URL
              </Label>
              <Input
                id="portfolio"
                value={formData.portfolio}
                onChange={(e) => updateFormData('portfolio', e.target.value)}
                placeholder="https://portfolio.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coding Platforms */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Coding Platforms
          </CardTitle>
          <CardDescription>Link your coding challenge and development profiles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="github" className="flex items-center gap-2">
                <Github className="w-4 h-4" />
                GitHub
              </Label>
              <Input
                id="github"
                value={formData.github}
                onChange={(e) => updateFormData('github', e.target.value)}
                placeholder="https://github.com/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stackoverflow" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Stack Overflow
              </Label>
              <Input
                id="stackoverflow"
                value={formData.stackoverflow}
                onChange={(e) => updateFormData('stackoverflow', e.target.value)}
                placeholder="https://stackoverflow.com/users/id"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="leetcode" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                LeetCode
              </Label>
              <Input
                id="leetcode"
                value={formData.leetcode}
                onChange={(e) => updateFormData('leetcode', e.target.value)}
                placeholder="https://leetcode.com/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hackerrank" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                HackerRank
              </Label>
              <Input
                id="hackerrank"
                value={formData.hackerrank}
                onChange={(e) => updateFormData('hackerrank', e.target.value)}
                placeholder="https://hackerrank.com/username"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="codechef" className="flex items-center gap-2">
                <Coffee className="w-4 h-4" />
                CodeChef
              </Label>
              <Input
                id="codechef"
                value={formData.codechef}
                onChange={(e) => updateFormData('codechef', e.target.value)}
                placeholder="https://codechef.com/users/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="codeforces" className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                Codeforces
              </Label>
              <Input
                id="codeforces"
                value={formData.codeforces}
                onChange={(e) => updateFormData('codeforces', e.target.value)}
                placeholder="https://codeforces.com/profile/username"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content & Design Platforms */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Content & Design Platforms
          </CardTitle>
          <CardDescription>Share your content creation and design profiles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="medium" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Medium
              </Label>
              <Input
                id="medium"
                value={formData.medium}
                onChange={(e) => updateFormData('medium', e.target.value)}
                placeholder="https://medium.com/@username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="devto" className="flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                Dev.to
              </Label>
              <Input
                id="devto"
                value={formData.devto}
                onChange={(e) => updateFormData('devto', e.target.value)}
                placeholder="https://dev.to/username"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="behance" className="flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                Behance
              </Label>
              <Input
                id="behance"
                value={formData.behance}
                onChange={(e) => updateFormData('behance', e.target.value)}
                placeholder="https://behance.net/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dribbble" className="flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Dribbble
              </Label>
              <Input
                id="dribbble"
                value={formData.dribbble}
                onChange={(e) => updateFormData('dribbble', e.target.value)}
                placeholder="https://dribbble.com/username"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSkillsExperience = () => (
    <div className="space-y-6">
      {/* Current Role & Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Current Role & Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentRole">Current Role</Label>
              <Select value={formData.currentRole} onValueChange={(value) => updateFormData('currentRole', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend-developer">Frontend Developer</SelectItem>
                  <SelectItem value="backend-developer">Backend Developer</SelectItem>
                  <SelectItem value="fullstack-developer">Full Stack Developer</SelectItem>
                  <SelectItem value="mobile-developer">Mobile Developer</SelectItem>
                  <SelectItem value="devops-engineer">DevOps Engineer</SelectItem>
                  <SelectItem value="data-scientist">Data Scientist</SelectItem>
                  <SelectItem value="ml-engineer">ML Engineer</SelectItem>
                  <SelectItem value="ui-ux-designer">UI/UX Designer</SelectItem>
                  <SelectItem value="product-manager">Product Manager</SelectItem>
                  <SelectItem value="software-architect">Software Architect</SelectItem>
                  <SelectItem value="tech-lead">Tech Lead</SelectItem>
                  <SelectItem value="cto">CTO</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="seniorityLevel">Seniority Level</Label>
              <Select value={formData.seniorityLevel} onValueChange={(value) => updateFormData('seniorityLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="intern">Intern</SelectItem>
                  <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                  <SelectItem value="mid">Mid-level (3-5 years)</SelectItem>
                  <SelectItem value="senior">Senior (6-9 years)</SelectItem>
                  <SelectItem value="lead">Lead (10-15 years)</SelectItem>
                  <SelectItem value="principal">Principal (15+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="yearsOfExperience">Years of Experience</Label>
            <Select value={formData.yearsOfExperience} onValueChange={(value) => updateFormData('yearsOfExperience', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-1">0-1 years</SelectItem>
                <SelectItem value="2-3">2-3 years</SelectItem>
                <SelectItem value="4-5">4-5 years</SelectItem>
                <SelectItem value="6-7">6-7 years</SelectItem>
                <SelectItem value="8-10">8-10 years</SelectItem>
                <SelectItem value="10+">10+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Technical Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Technical Skills
          </CardTitle>
          <CardDescription>Add your primary and secondary technical skills</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <Label>Primary Skills (Your main expertise)</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.primarySkills.map((skill, index) => (
                  <Badge key={index} variant="default" className="gap-1">
                    {skill}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => removeSkill('primarySkills', skill)}
                    />
                  </Badge>
                ))}
              </div>
              <Select onValueChange={(value) => addSkill('primarySkills', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Add primary skill" />
                </SelectTrigger>
                <SelectContent>
                  {techSkills.filter(skill => !formData.primarySkills.includes(skill)).map(skill => (
                    <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Secondary Skills (Additional competencies)</Label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.secondarySkills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {skill}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => removeSkill('secondarySkills', skill)}
                    />
                  </Badge>
                ))}
              </div>
              <Select onValueChange={(value) => addSkill('secondarySkills', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Add secondary skill" />
                </SelectTrigger>
                <SelectContent>
                  {techSkills.filter(skill => !formData.secondarySkills.includes(skill) && !formData.primarySkills.includes(skill)).map(skill => (
                    <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Work Experience
            </span>
            <Button onClick={addWorkExperience} size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Experience
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formData.workExperience.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Building className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No work experience added yet</p>
              <p className="text-sm">Click "Add Experience" to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.workExperience.map((exp, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-medium">Experience #{index + 1}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeFromArray('workExperience', index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                        placeholder="Company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Input
                        value={exp.position}
                        onChange={(e) => updateWorkExperience(index, 'position', e.target.value)}
                        placeholder="Job title"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateWorkExperience(index, 'startDate', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateWorkExperience(index, 'endDate', e.target.value)}
                        disabled={exp.current}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={exp.current}
                        onChange={(e) => updateWorkExperience(index, 'current', e.target.checked)}
                      />
                      <span className="text-sm">I currently work here</span>
                    </label>
                  </div>
                  <div className="mt-4">
                    <Label>Description</Label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => updateWorkExperience(index, 'description', e.target.value)}
                      placeholder="Describe your role and achievements..."
                      rows={3}
                    />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderCareerPreferences = () => (
    <div className="space-y-6">
      {/* Job Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Job Preferences
          </CardTitle>
          <CardDescription>Tell us about your ideal work situation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>What types of jobs are you interested in? *</Label>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'].map(type => (
                <label key={type} className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={formData.jobTypes.includes(type)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateFormData('jobTypes', [...formData.jobTypes, type]);
                      } else {
                        updateFormData('jobTypes', formData.jobTypes.filter(t => t !== type));
                      }
                    }}
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Work Arrangement</Label>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {['Remote', 'Hybrid', 'On-site'].map(arrangement => (
                <label key={arrangement} className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={formData.workArrangement.includes(arrangement)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateFormData('workArrangement', [...formData.workArrangement, arrangement]);
                      } else {
                        updateFormData('workArrangement', formData.workArrangement.filter(a => a !== arrangement));
                      }
                    }}
                  />
                  <span className="text-sm">{arrangement}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Are you available for work opportunities?</Label>
              <Select value={formData.availableForWork} onValueChange={(value) => updateFormData('availableForWork', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediately">Available immediately</SelectItem>
                  <SelectItem value="within-month">Within a month</SelectItem>
                  <SelectItem value="within-quarter">Within 3 months</SelectItem>
                  <SelectItem value="not-looking">Not currently looking</SelectItem>
                  <SelectItem value="open-opportunities">Open to opportunities</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Notice Period</Label>
              <Select value={formData.noticePeriod} onValueChange={(value) => updateFormData('noticePeriod', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select notice period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="1-week">1 week</SelectItem>
                  <SelectItem value="2-weeks">2 weeks</SelectItem>
                  <SelectItem value="1-month">1 month</SelectItem>
                  <SelectItem value="2-months">2 months</SelectItem>
                  <SelectItem value="3-months">3 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Are you willing to relocate?</Label>
              <Select value={formData.willingToRelocate} onValueChange={(value) => updateFormData('willingToRelocate', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Relocation preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes, anywhere</SelectItem>
                  <SelectItem value="within-country">Within my country</SelectItem>
                  <SelectItem value="specific-locations">Specific locations only</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Remote Work Preference</Label>
              <Select value={formData.remoteWorkPreference} onValueChange={(value) => updateFormData('remoteWorkPreference', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Remote preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="remote-only">Remote only</SelectItem>
                  <SelectItem value="hybrid-preferred">Hybrid preferred</SelectItem>
                  <SelectItem value="office-preferred">Office preferred</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Salary Expectations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Salary Expectations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Expected Salary (Annual)</Label>
              <Input
                value={formData.expectedSalary}
                onChange={(e) => updateFormData('expectedSalary', e.target.value)}
                placeholder="80000"
              />
            </div>
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select value={formData.salaryCurrency} onValueChange={(value) => updateFormData('salaryCurrency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(currency => (
                    <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Company Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Preferred Company Size</Label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'Startup (1-10)', value: 'startup' },
                { label: 'Small (11-50)', value: 'small' },
                { label: 'Medium (51-200)', value: 'medium' },
                { label: 'Large (201+)', value: 'large' }
              ].map(size => (
                <label key={size.value} className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={formData.preferredCompanySize.includes(size.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateFormData('preferredCompanySize', [...formData.preferredCompanySize, size.value]);
                      } else {
                        updateFormData('preferredCompanySize', formData.preferredCompanySize.filter(s => s !== size.value));
                      }
                    }}
                  />
                  <span className="text-sm">{size.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Preferred Industries</Label>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {[
                'Technology', 'Finance', 'Healthcare', 'E-commerce', 'Education', 
                'Entertainment', 'Gaming', 'Fintech', 'Blockchain', 'AI/ML',
                'Cybersecurity', 'Cloud Services'
              ].map(industry => (
                <label key={industry} className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={formData.preferredIndustries.includes(industry)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateFormData('preferredIndustries', [...formData.preferredIndustries, industry]);
                      } else {
                        updateFormData('preferredIndustries', formData.preferredIndustries.filter(i => i !== industry));
                      }
                    }}
                  />
                  <span className="text-sm">{industry}</span>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPortfolio = () => (
    <div className="space-y-6">
      {/* Projects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              Projects Showcase
            </span>
            <Button onClick={addProject} size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Project
            </Button>
          </CardTitle>
          <CardDescription>Showcase your best work and projects</CardDescription>
        </CardHeader>
        <CardContent>
          {formData.projects.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Code2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No projects added yet</p>
              <p className="text-sm">Click "Add Project" to showcase your work</p>
            </div>
          ) : (
            <div className="space-y-6">
              {formData.projects.map((project, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-medium">Project #{index + 1}</h4>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          checked={project.featured}
                          onChange={(e) => updateProject(index, 'featured', e.target.checked)}
                        />
                        <span className="text-sm">Featured</span>
                      </label>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeFromArray('projects', index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Project Name</Label>
                        <Input
                          value={project.name}
                          onChange={(e) => updateProject(index, 'name', e.target.value)}
                          placeholder="My Awesome Project"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Project Image URL</Label>
                        <Input
                          value={project.image}
                          onChange={(e) => updateProject(index, 'image', e.target.value)}
                          placeholder="https://project-image.com/image.png"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={project.description}
                        onChange={(e) => updateProject(index, 'description', e.target.value)}
                        placeholder="Describe your project, its features, and impact..."
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Live URL</Label>
                        <Input
                          value={project.liveUrl}
                          onChange={(e) => updateProject(index, 'liveUrl', e.target.value)}
                          placeholder="https://project-demo.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>GitHub URL</Label>
                        <Input
                          value={project.githubUrl}
                          onChange={(e) => updateProject(index, 'githubUrl', e.target.value)}
                          placeholder="https://github.com/username/project"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Tech Stack</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.techStack.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="gap-1">
                            {tech}
                            <X 
                              className="w-3 h-3 cursor-pointer" 
                              onClick={() => {
                                const newTechStack = project.techStack.filter((_, i) => i !== techIndex);
                                updateProject(index, 'techStack', newTechStack);
                              }}
                            />
                          </Badge>
                        ))}
                      </div>
                      <Select onValueChange={(value) => {
                        if (value && !project.techStack.includes(value)) {
                          updateProject(index, 'techStack', [...project.techStack, value]);
                        }
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Add technology" />
                        </SelectTrigger>
                        <SelectContent>
                          {techSkills.filter(skill => !project.techStack.includes(skill)).map(skill => (
                            <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Education
            </span>
            <Button 
              onClick={() => addToArray('education', {
                institution: '',
                degree: '',
                field: '',
                startYear: '',
                endYear: '',
                gpa: ''
              })} 
              size="sm" 
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Education
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formData.education.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No education added yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.education.map((edu, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-medium">Education #{index + 1}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeFromArray('education', index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Institution</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => {
                          const updatedEducation = formData.education.map((item, i) => 
                            i === index ? { ...item, institution: e.target.value } : item
                          );
                          updateFormData('education', updatedEducation);
                        }}
                        placeholder="University name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => {
                          const updatedEducation = formData.education.map((item, i) => 
                            i === index ? { ...item, degree: e.target.value } : item
                          );
                          updateFormData('education', updatedEducation);
                        }}
                        placeholder="Bachelor's, Master's, etc."
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label>Field of Study</Label>
                      <Input
                        value={edu.field}
                        onChange={(e) => {
                          const updatedEducation = formData.education.map((item, i) => 
                            i === index ? { ...item, field: e.target.value } : item
                          );
                          updateFormData('education', updatedEducation);
                        }}
                        placeholder="Computer Science"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Start Year</Label>
                      <Input
                        value={edu.startYear}
                        onChange={(e) => {
                          const updatedEducation = formData.education.map((item, i) => 
                            i === index ? { ...item, startYear: e.target.value } : item
                          );
                          updateFormData('education', updatedEducation);
                        }}
                        placeholder="2020"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Year</Label>
                      <Input
                        value={edu.endYear}
                        onChange={(e) => {
                          const updatedEducation = formData.education.map((item, i) => 
                            i === index ? { ...item, endYear: e.target.value } : item
                          );
                          updateFormData('education', updatedEducation);
                        }}
                        placeholder="2024"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Final Review */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Profile Preview
          </CardTitle>
          <CardDescription>Review your profile before creating</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted/20 rounded-lg">
              <Avatar className="w-16 h-16">
                <AvatarImage src={formData.profileImage} />
                <AvatarFallback className="text-xl">
                  {formData.firstName?.[0]}{formData.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-lg">{formData.displayName || `${formData.firstName} ${formData.lastName}`}</h3>
                <p className="text-muted-foreground">@{formData.username}</p>
                <p className="text-sm">{formData.currentRole} • {formData.location}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">{formData.primarySkills.length}</div>
                <div className="text-sm text-muted-foreground">Primary Skills</div>
              </div>
              <div className="text-center p-4 bg-blue-500/5 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{formData.projects.length}</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center p-4 bg-green-500/5 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{formData.workExperience.length}</div>
                <div className="text-sm text-muted-foreground">Work Experience</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderPersonalInfo();
      case 2: return renderPlatformConnections();
      case 3: return renderSkillsExperience();
      case 4: return renderCareerPreferences();
      case 5: return renderPortfolio();
      default: return renderPersonalInfo();
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground instrument mb-2">
            Create Your Developer Profile
          </h1>
          <p className="text-muted-foreground">
            Tell us about yourself to get started with DevRank and showcase your skills to the world
          </p>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Form Content */}
        <div className="mb-8">
          {renderCurrentStep()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-border">
          <Button 
            variant="outline" 
            onClick={prevStep} 
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="text-sm text-muted-foreground">
            Step {currentStep} of {steps.length}
          </div>

          {currentStep === steps.length ? (
            <Button className="professional-gradient text-primary-foreground gap-2">
              <CheckCircle className="w-4 h-4" />
              Create Profile
            </Button>
          ) : (
            <Button onClick={nextStep} className="gap-2">
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}