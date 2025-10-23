'use client';

import React from 'react';
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
  User, Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, Code2,
  Briefcase, GraduationCap, Target, DollarSign, Building, CheckCircle,
  ChevronRight, Upload, X, Plus, Trash2, Trophy, Zap, Coffee, Star,
  Brain, FileText, Monitor, Palette, Eye, Loader2
} from 'lucide-react';
import { useProfileBuilderStore } from '@/store/profile/builder';
import Header from '@/components/layout/header';
import ProfileImageUploader from './profile-image';

const steps = [
  { id: 1, title: 'Personal Info', icon: User, description: 'Basic information' },
  { id: 2, title: 'Platforms', icon: Globe, description: 'Social profiles' },
  { id: 3, title: 'Skills & Experience', icon: Code2, description: 'Technical expertise' },
  { id: 4, title: 'Career Goals', icon: Target, description: 'Job preferences' },
  { id: 5, title: 'Portfolio', icon: Briefcase, description: 'Projects & achievements' },
];

const techSkills = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust', 'PHP', 'Ruby',
  'React', 'Vue.js', 'Angular', 'Svelte', 'Node.js', 'Express', 'FastAPI', 'Django', 'Flask',
  'Next.js', 'Nuxt.js', 'Gatsby', 'React Native', 'Flutter', 'Swift', 'Kotlin',
  'HTML', 'CSS', 'SASS', 'Tailwind CSS', 'Bootstrap', 'Material-UI',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'SQLite', 'Firebase',
  'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins',
  'Git', 'GitHub', 'GitLab', 'Figma', 'Adobe XD'
];

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'India', 'Australia',
  'Singapore', 'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Switzerland', 'Japan'
];

const currencies = ['USD', 'EUR', 'GBP', 'INR', 'CAD', 'AUD', 'SGD', 'JPY'];

export default function ProfileBuilder() {
  const store = useProfileBuilderStore();
  const progressPercentage = (store.currentStep / steps.length) * 100;

  const renderVerticalStepper = () => (
    <div className="space-y-2">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-start gap-3">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${store.currentStep >= step.id
                ? 'bg-primary border-primary text-primary-foreground shadow-lg'
                : 'border-muted-foreground/30 text-muted-foreground'
                }`}
            >
              {store.currentStep > step.id ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <step.icon className="w-5 h-5" />
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-0.5 h-16 mt-2 transition-colors ${store.currentStep > step.id ? 'bg-primary' : 'bg-muted'
                  }`}
              />
            )}
          </div>
          <div className="flex-1 pt-1">
            <h3 className={`font-semibold text-sm ${store.currentStep === step.id ? 'text-primary' : 'text-foreground'
              }`}>
              {step.title}
            </h3>
            <p className="text-xs text-muted-foreground">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Images</CardTitle>
          <CardDescription>Upload your profile picture and banner</CardDescription>
        </CardHeader>
        {/* <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={store.profileImage} />
              <AvatarFallback>
                {store.firstName?.[0]}{store.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" className="gap-2">
              <Upload className="w-4 h-4" />
              Upload Photo
            </Button>
          </div>
        </CardContent> */}
        <div className='m-4'>
          <ProfileImageUploader
            store={store}
            onUpload={(url?: any) => store.setField("profileImage", url)} // ✅ correct way
          />
        </ div>

      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={store.firstName}
                onChange={(e) => store.setField('firstName', e.target.value)}
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={store.lastName}
                onChange={(e) => store.setField('lastName', e.target.value)}
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={store.displayName}
                onChange={(e) => store.setField('displayName', e.target.value)}
                placeholder="How you want to be displayed"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username *</Label>
              <Input
                id="username"
                value={store.username}
                onChange={(e) => store.setField('username', e.target.value)}
                placeholder="johndoe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={store.bio}
              onChange={(e) => store.setField('bio', e.target.value)}
              placeholder="Tell us about yourself..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={store.email}
                onChange={(e) => store.setField('email', e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={store.phone}
                onChange={(e) => store.setField('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Select value={store.country} onValueChange={(value) => store.setField('country', value)}>
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
                value={store.location}
                onChange={(e) => store.setField('location', e.target.value)}
                placeholder="San Francisco, CA"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={store.timezone} onValueChange={(value) => store.setField('timezone', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                  <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                  <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                  <SelectItem value="UTC+5:30">IST (UTC+5:30)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPlatforms = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Professional Platforms
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Label>
              <Input
                value={store.socialLinks.linkedin || ''}
                onChange={(e) => store.setSocialLink('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Twitter className="w-4 h-4" />
                Twitter
              </Label>
              <Input
                value={store.socialLinks.twitter || ''}
                onChange={(e) => store.setSocialLink('twitter', e.target.value)}
                placeholder="https://twitter.com/username"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Personal Website
              </Label>
              <Input
                value={store.socialLinks.website || ''}
                onChange={(e) => store.setSocialLink('website', e.target.value)}
                placeholder="https://yourwebsite.com"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Portfolio URL
              </Label>
              <Input
                value={store.socialLinks.portfolio || ''}
                onChange={(e) => store.setSocialLink('portfolio', e.target.value)}
                placeholder="https://portfolio.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Coding Platforms
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Github className="w-4 h-4" />
                GitHub
              </Label>
              <Input
                value={store.socialLinks.github || ''}
                onChange={(e) => store.setSocialLink('github', e.target.value)}
                placeholder="https://github.com/username"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Stack Overflow
              </Label>
              <Input
                value={store.socialLinks.stackoverflow || ''}
                onChange={(e) => store.setSocialLink('stackoverflow', e.target.value)}
                placeholder="https://stackoverflow.com/users/id"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                LeetCode
              </Label>
              <Input
                value={store.socialLinks.leetcode || ''}
                onChange={(e) => store.setSocialLink('leetcode', e.target.value)}
                placeholder="https://leetcode.com/username"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                HackerRank
              </Label>
              <Input
                value={store.socialLinks.hackerrank || ''}
                onChange={(e) => store.setSocialLink('hackerrank', e.target.value)}
                placeholder="https://hackerrank.com/username"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSkillsExperience = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Current Role & Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Current Role</Label>
              <Select value={store.currentRole} onValueChange={(value) => store.setField('currentRole', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend-developer">Frontend Developer</SelectItem>
                  <SelectItem value="backend-developer">Backend Developer</SelectItem>
                  <SelectItem value="fullstack-developer">Full Stack Developer</SelectItem>
                  <SelectItem value="mobile-developer">Mobile Developer</SelectItem>
                  <SelectItem value="devops-engineer">DevOps Engineer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Seniority Level</Label>
              <Select value={store.seniorityLevel} onValueChange={(value) => store.setField('seniorityLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                  <SelectItem value="mid">Mid-level (3-5 years)</SelectItem>
                  <SelectItem value="senior">Senior (6-9 years)</SelectItem>
                  <SelectItem value="lead">Lead (10+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Technical Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Primary Skills</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {store.primarySkills.map((skill, index) => (
                <Badge key={index} variant="default" className="gap-1">
                  {skill}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => store.removeSkill('primary', skill)}
                  />
                </Badge>
              ))}
            </div>
            <Select onValueChange={(value) => store.addSkill('primary', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Add primary skill" />
              </SelectTrigger>
              <SelectContent>
                {techSkills.filter(skill => !store.primarySkills.includes(skill)).map(skill => (
                  <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Secondary Skills</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {store.secondarySkills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {skill}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => store.removeSkill('secondary', skill)}
                  />
                </Badge>
              ))}
            </div>
            <Select onValueChange={(value) => store.addSkill('secondary', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Add secondary skill" />
              </SelectTrigger>
              <SelectContent>
                {techSkills.filter(skill => !store.secondarySkills.includes(skill) && !store.primarySkills.includes(skill)).map(skill => (
                  <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Work Experience
            </span>
            <Button onClick={store.addWorkExperience} size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Experience
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {store.workExperience.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Building className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No work experience added yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {store.workExperience.map((exp, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-medium">Experience #{index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => store.removeWorkExperience(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => store.updateWorkExperience(index, 'company', e.target.value)}
                        placeholder="Company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Input
                        value={exp.position}
                        onChange={(e) => store.updateWorkExperience(index, 'position', e.target.value)}
                        placeholder="Job title"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => store.updateWorkExperience(index, 'startDate', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => store.updateWorkExperience(index, 'endDate', e.target.value)}
                        disabled={exp.current}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => store.updateWorkExperience(index, 'current', e.target.checked)}
                      />
                      <span className="text-sm">I currently work here</span>
                    </label>
                  </div>
                  <div className="mt-4">
                    <Label>Description</Label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => store.updateWorkExperience(index, 'description', e.target.value)}
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Job Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Job Types *</Label>
            <div className="grid grid-cols-3 gap-3">
              {['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'].map(type => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={store.jobTypes.includes(type)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        store.setField('jobTypes', [...store.jobTypes, type]);
                      } else {
                        store.setField('jobTypes', store.jobTypes.filter(t => t !== type));
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
            <div className="grid grid-cols-3 gap-3">
              {['Remote', 'Hybrid', 'On-site'].map(arrangement => (
                <label key={arrangement} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={store.workArrangement.includes(arrangement)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        store.setField('workArrangement', [...store.workArrangement, arrangement]);
                      } else {
                        store.setField('workArrangement', store.workArrangement.filter(a => a !== arrangement));
                      }
                    }}
                  />
                  <span className="text-sm">{arrangement}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Availability</Label>
              <Select value={store.availableForWork} onValueChange={(value) => store.setField('availableForWork', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediately">Available immediately</SelectItem>
                  <SelectItem value="within-month">Within a month</SelectItem>
                  <SelectItem value="within-quarter">Within 3 months</SelectItem>
                  <SelectItem value="not-looking">Not currently looking</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Notice Period</Label>
              <Select value={store.noticePeriod} onValueChange={(value) => store.setField('noticePeriod', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select notice period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="2-weeks">2 weeks</SelectItem>
                  <SelectItem value="1-month">1 month</SelectItem>
                  <SelectItem value="2-months">2 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Salary Expectations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Expected Salary (Annual)</Label>
              <Input
                value={store.expectedSalary}
                onChange={(e) => store.setField('expectedSalary', e.target.value)}
                placeholder="80000"
              />
            </div>
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select value={store.salaryCurrency} onValueChange={(value) => store.setField('salaryCurrency', value)}>
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Company Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Preferred Industries</Label>
            <div className="grid grid-cols-3 gap-3">
              {['Technology', 'Finance', 'Healthcare', 'E-commerce', 'Education', 'Gaming', 'Fintech', 'AI/ML', 'Cybersecurity'].map(industry => (
                <label key={industry} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={store.preferredIndustries.includes(industry)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        store.setField('preferredIndustries', [...store.preferredIndustries, industry]);
                      } else {
                        store.setField('preferredIndustries', store.preferredIndustries.filter(i => i !== industry));
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              Projects Showcase
            </span>
            <Button onClick={store.addProject} size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Project
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {store.projects.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Code2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No projects added yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {store.projects.map((project, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-medium">Project #{index + 1}</h4>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={project.featured}
                          onChange={(e) => store.updateProject(index, 'featured', e.target.checked)}
                        />
                        <span className="text-sm">Featured</span>
                      </label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => store.removeProject(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Project Name</Label>
                        <Input
                          value={project.name}
                          onChange={(e) => store.updateProject(index, 'name', e.target.value)}
                          placeholder="My Awesome Project"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Project Image URL</Label>
                        <Input
                          value={project.image}
                          onChange={(e) => store.updateProject(index, 'image', e.target.value)}
                          placeholder="https://project-image.com/image.png"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={project.description}
                        onChange={(e) => store.updateProject(index, 'description', e.target.value)}
                        placeholder="Describe your project..."
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Live URL</Label>
                        <Input
                          value={project.liveUrl}
                          onChange={(e) => store.updateProject(index, 'liveUrl', e.target.value)}
                          placeholder="https://project-demo.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>GitHub URL</Label>
                        <Input
                          value={project.githubUrl}
                          onChange={(e) => store.updateProject(index, 'githubUrl', e.target.value)}
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
                                store.updateProject(index, 'techStack', newTechStack);
                              }}
                            />
                          </Badge>
                        ))}
                      </div>
                      <Select onValueChange={(value) => {
                        if (value && !project.techStack.includes(value)) {
                          store.updateProject(index, 'techStack', [...project.techStack, value]);
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Education
            </span>
            <Button onClick={store.addEducation} size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Education
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {store.education.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No education added yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {store.education.map((edu, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-medium">Education #{index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => store.removeEducation(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Institution</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => store.updateEducation(index, 'institution', e.target.value)}
                        placeholder="University name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => store.updateEducation(index, 'degree', e.target.value)}
                        placeholder="Bachelor's, Master's, etc."
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label>Field of Study</Label>
                      <Input
                        value={edu.field}
                        onChange={(e) => store.updateEducation(index, 'field', e.target.value)}
                        placeholder="Computer Science"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Start Year</Label>
                      <Input
                        value={edu.startYear}
                        onChange={(e) => store.updateEducation(index, 'startYear', e.target.value)}
                        placeholder="2020"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Year</Label>
                      <Input
                        value={edu.endYear}
                        onChange={(e) => store.updateEducation(index, 'endYear', e.target.value)}
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Profile Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted/20 rounded-lg">
              <Avatar className="w-16 h-16">
                <AvatarImage src={store.profileImage} />
                <AvatarFallback>
                  {store.firstName?.[0]}{store.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-lg">{store.displayName || `${store.firstName} ${store.lastName}`}</h3>
                <p className="text-muted-foreground">@{store.username}</p>
                <p className="text-sm">{store.currentRole} • {store.location}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">{store.primarySkills.length}</div>
                <div className="text-sm text-muted-foreground">Primary Skills</div>
              </div>
              <div className="text-center p-4 bg-blue-500/5 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{store.projects.length}</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center p-4 bg-green-500/5 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{store.workExperience.length}</div>
                <div className="text-sm text-muted-foreground">Experience</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCurrentStep = () => {
    switch (store.currentStep) {
      case 1: return renderPersonalInfo();
      case 2: return renderPlatforms();
      case 3: return renderSkillsExperience();
      case 4: return renderCareerPreferences();
      case 5: return renderPortfolio();
      default: return renderPersonalInfo();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title='Create Your Developer Profile' />

      <div className="container mx-auto px-4 py-8 w-full">
        {/* <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Create Your Developer Profile
          </h1>
          <p className="text-muted-foreground">
            Showcase your skills and experience to the world
          </p>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Vertical Stepper */}
          <div className="lg:col-span-3">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Progress</CardTitle>
                <Progress value={progressPercentage} className="mt-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Step {store.currentStep} of {steps.length}
                </p>
              </CardHeader>
              <CardContent>
                {renderVerticalStepper()}
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Forms */}
          <div className="lg:col-span-9">
            <div className="mb-6">
              {renderCurrentStep()}
            </div>

            {/* Navigation */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={store.prevStep}
                    disabled={store.currentStep === 1 || store.isLoading}
                  >
                    Previous
                  </Button>

                  {store.currentStep === steps.length ? (
                    <Button
                      onClick={store.submitProfile}
                      disabled={store.isLoading}
                      className="gap-2"
                    >
                      {store.isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Creating Profile...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Create Profile
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={store.nextStep}
                      disabled={store.isLoading}
                      className="gap-2"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}