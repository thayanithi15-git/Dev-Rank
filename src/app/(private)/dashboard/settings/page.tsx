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
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  Settings, 
  Shield, 
  CreditCard,
  Bell,
  Eye,
  Globe,
  Smartphone,
  Key,
  Trash2,
  Upload,
  Github,
  Linkedin,
  Twitter,
  MessageSquare,
  Slack,
  Mail,
  Calendar,
  Database,
  Cloud,
  Zap,
  Code2,
  GitBranch,
  Star,
  Trophy,
  Target,
  BarChart3,
  FileText,
  Palette,
  Monitor,
  Moon,
  Sun,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Unlink,
  Plus,
  Lock,
  Unlock,
  RefreshCw,
  Download,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  connected: boolean;
  status: 'connected' | 'disconnected' | 'error' | 'syncing';
  lastSync?: string;
  data?: {
    username?: string;
    repositories?: number;
    followers?: number;
    contributions?: number;
  };
  color: string;
}

interface SettingsFormData {
  // Profile
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
  
  // Security
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactorEnabled: boolean;
  
  // Preferences
  theme: string;
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  profilePublic: boolean;
  showEmail: boolean;
  showLocation: boolean;
  
  // Privacy
  searchableProfile: boolean;
  allowDirectMessages: boolean;
  showActivity: boolean;
  dataDownload: boolean;
}

const settingsSections = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'integrations', label: 'Integrations', icon: Globe },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: Eye },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'preferences', label: 'Preferences', icon: Settings },
  { id: 'danger', label: 'Danger Zone', icon: AlertTriangle },
];

const integrations: Integration[] = [
  {
    id: 'github',
    name: 'GitHub',
    description: 'Sync repositories, contributions, and profile data',
    icon: Github,
    connected: true,
    status: 'connected',
    lastSync: '2 hours ago',
    data: { username: 'divy-dhra', repositories: 47, contributions: 1234 },
    color: 'bg-gray-900 text-white'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'Import professional experience and connections',
    icon: Linkedin,
    connected: true,
    status: 'connected',
    lastSync: '1 day ago',
    data: { username: 'divy-dhra', followers: 543 },
    color: 'bg-blue-600 text-white'
  },
  {
    id: 'stackoverflow',
    name: 'Stack Overflow',
    description: 'Sync reputation, answers, and badges',
    icon: MessageSquare,
    connected: false,
    status: 'disconnected',
    color: 'bg-orange-500 text-white'
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Get notifications and updates in your workspace',
    icon: Slack,
    connected: true,
    status: 'syncing',
    lastSync: 'Syncing...',
    color: 'bg-purple-600 text-white'
  },
  {
    id: 'leetcode',
    name: 'LeetCode',
    description: 'Import coding challenge stats and rankings',
    icon: Code2,
    connected: false,
    status: 'disconnected',
    color: 'bg-yellow-500 text-white'
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    description: 'Sync GitLab repositories and merge requests',
    icon: GitBranch,
    connected: false,
    status: 'disconnected',
    color: 'bg-orange-600 text-white'
  },
  {
    id: 'bitbucket',
    name: 'Bitbucket',
    description: 'Connect Bitbucket repositories and activity',
    icon: Database,
    connected: true,
    status: 'error',
    lastSync: 'Failed 3 hours ago',
    color: 'bg-blue-700 text-white'
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Show activity status and join community servers',
    icon: MessageSquare,
    connected: false,
    status: 'disconnected',
    color: 'bg-indigo-600 text-white'
  }
];

export default function DevRankSettingsPage() {
  const [activeSection, setActiveSection] = useState('account');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState<SettingsFormData>({
    firstName: 'Divy',
    lastName: 'Dhra',
    username: 'divy-dhra',
    email: 'divy.dhra@velzon.com',
    bio: 'Full-stack developer passionate about creating amazing user experiences',
    location: 'San Francisco, CA',
    website: 'https://divydhra.dev',
    company: 'DevRank',
    jobTitle: 'Senior Frontend Developer',
    profileImage: '/api/placeholder/100/100',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    theme: 'system',
    language: 'en',
    timezone: 'America/Los_Angeles',
    emailNotifications: true,
    pushNotifications: false,
    profilePublic: true,
    showEmail: false,
    showLocation: true,
    searchableProfile: true,
    allowDirectMessages: true,
    showActivity: true,
    dataDownload: false
  });

  const [integrationStates, setIntegrationStates] = useState(integrations);

  const updateFormData = (field: keyof SettingsFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleIntegration = (integrationId: string) => {
    setIntegrationStates(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { 
            ...integration, 
            connected: !integration.connected,
            status: !integration.connected ? 'connected' : 'disconnected'
          }
        : integration
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800 border-green-200';
      case 'syncing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'disconnected': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-3 h-3" />;
      case 'syncing': return <RefreshCw className="w-3 h-3 animate-spin" />;
      case 'error': return <XCircle className="w-3 h-3" />;
      case 'disconnected': return <Unlink className="w-3 h-3" />;
      default: return <AlertTriangle className="w-3 h-3" />;
    }
  };

  const renderSidebar = () => (
    <aside className={`
      fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto
    `}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold instrument">Settings</h2>
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
        {settingsSections.map((section) => (
          <Button
            key={section.id}
            variant={activeSection === section.id ? "secondary" : "ghost"}
            className={`w-full justify-start gap-3 ${
              activeSection === section.id ? 'bg-primary/10 text-primary' : ''
            } ${section.id === 'danger' ? 'text-red-600 hover:text-red-700 hover:bg-red-50' : ''}`}
            onClick={() => {
              setActiveSection(section.id);
              setSidebarOpen(false);
            }}
          >
            <section.icon className="w-4 h-4" />
            {section.label}
          </Button>
        ))}
      </nav>

      {/* User Info at Bottom */}
      <div className="absolute bottom-4 left-4 right-4">
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={formData.profileImage} />
                <AvatarFallback>
                  {formData.firstName[0]}{formData.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{formData.firstName} {formData.lastName}</p>
                <p className="text-xs text-muted-foreground truncate">{formData.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );

  const renderAccountSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Account Settings</h2>
        <p className="text-muted-foreground">Manage your account information and preferences</p>
      </div>

      {/* Profile Picture */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>Update your profile photo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={formData.profileImage} />
              <AvatarFallback className="text-xl">
                {formData.firstName[0]}{formData.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-3">
              <Button className="gap-2">
                <Upload className="w-4 h-4" />
                Upload new photo
              </Button>
              <p className="text-sm text-muted-foreground">
                JPG, PNG or GIF. Max size 2MB. Recommended 400x400px.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => updateFormData('firstName', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => updateFormData('lastName', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => updateFormData('username', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => updateFormData('bio', e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => updateFormData('company', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => updateFormData('jobTitle', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => updateFormData('website', e.target.value)}
              />
            </div>
          </div>

          <Button className="professional-gradient text-primary-foreground">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={(e) => updateFormData('currentPassword', e.target.value)}
              placeholder="Enter current password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={(e) => updateFormData('newPassword', e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => updateFormData('confirmPassword', e.target.value)}
              placeholder="Confirm new password"
            />
          </div>
          <Button>Save Password</Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderIntegrationsSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Integrations</h2>
        <p className="text-muted-foreground">Connect your accounts to sync data and enhance your profile</p>
      </div>

      <div className="grid gap-4">
        {integrationStates.map((integration) => (
          <Card key={integration.id} className="professional-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${integration.color}`}>
                    <integration.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{integration.name}</h3>
                      <Badge className={`${getStatusColor(integration.status)} text-xs flex items-center gap-1`}>
                        {getStatusIcon(integration.status)}
                        {integration.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                    {integration.connected && integration.lastSync && (
                      <p className="text-xs text-muted-foreground">Last sync: {integration.lastSync}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {integration.connected && integration.data && (
                    <div className="text-right text-sm text-muted-foreground space-y-1">
                      {integration.data.username && (
                        <p>@{integration.data.username}</p>
                      )}
                      {integration.data.repositories && (
                        <p>{integration.data.repositories} repos</p>
                      )}
                      {integration.data.contributions && (
                        <p>{integration.data.contributions} contributions</p>
                      )}
                      {integration.data.followers && (
                        <p>{integration.data.followers} followers</p>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    {integration.connected && integration.status === 'error' && (
                      <Button variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Retry
                      </Button>
                    )}
                    
                    <Button
                      variant={integration.connected ? "destructive" : "default"}
                      size="sm"
                      onClick={() => toggleIntegration(integration.id)}
                      className={integration.connected ? "" : "professional-gradient text-primary-foreground"}
                    >
                      {integration.connected ? (
                        <>
                          <Unlink className="w-4 h-4 mr-2" />
                          Disconnect
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Connect
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request New Integration</CardTitle>
          <CardDescription>Don't see the platform you need? Let us know!</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="gap-2">
            <Plus className="w-4 h-4" />
            Request Integration
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Security</h2>
        <p className="text-muted-foreground">Manage your account security and authentication</p>
      </div>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS Authentication</p>
              <p className="text-sm text-muted-foreground">Receive codes via text message</p>
            </div>
            <Switch
              checked={formData.twoFactorEnabled}
              onCheckedChange={(checked) => updateFormData('twoFactorEnabled', checked)}
            />
          </div>
          {formData.twoFactorEnabled && (
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm">Two-factor authentication is enabled. You'll receive SMS codes at your registered phone number.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>Manage your active login sessions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Monitor className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Current Session</p>
                  <p className="text-sm text-muted-foreground">Chrome on macOS • San Francisco, CA</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Mobile App</p>
                  <p className="text-sm text-muted-foreground">iPhone • 2 hours ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Revoke</Button>
            </div>
          </div>
          <Button variant="outline">Revoke All Sessions</Button>
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Manage API keys for third-party integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Personal Access Token</p>
                <p className="text-sm text-muted-foreground">Created on Jan 15, 2024 • Last used 2 days ago</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Regenerate</Button>
                <Button variant="outline" size="sm">Delete</Button>
              </div>
            </div>
          </div>
          <Button className="mt-4 gap-2">
            <Plus className="w-4 h-4" />
            Generate New Key
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderPreferencesSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Preferences</h2>
        <p className="text-muted-foreground">Customize your experience and appearance</p>
      </div>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize how DevRank looks for you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Theme</Label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'light', label: 'Light', icon: Sun },
                { value: 'dark', label: 'Dark', icon: Moon },
                { value: 'system', label: 'System', icon: Monitor }
              ].map((theme) => (
                <label key={theme.value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    value={theme.value}
                    checked={formData.theme === theme.value}
                    onChange={(e) => updateFormData('theme', e.target.value)}
                    className="sr-only"
                  />
                  <div className={`
                    p-4 border-2 rounded-lg transition-all duration-200 text-center
                    ${formData.theme === theme.value 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                    }
                  `}>
                    <theme.icon className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">{theme.label}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card>
        <CardHeader>
          <CardTitle>Language & Region</CardTitle>
          <CardDescription>Set your language and timezone preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={formData.language} onValueChange={(value) => updateFormData('language', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={formData.timezone} onValueChange={(value) => updateFormData('timezone', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                  <SelectItem value="America/New_York">Eastern Time</SelectItem>
                  <SelectItem value="Europe/London">GMT</SelectItem>
                  <SelectItem value="Europe/Paris">Central European Time</SelectItem>
                  <SelectItem value="Asia/Tokyo">Japan Standard Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose how you want to be notified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
              <Switch
                checked={formData.emailNotifications}
                onCheckedChange={(checked) => updateFormData('emailNotifications', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive push notifications in browser</p>
              </div>
              <Switch
                checked={formData.pushNotifications}
                onCheckedChange={(checked) => updateFormData('pushNotifications', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Privacy</h2>
        <p className="text-muted-foreground">Control your privacy and data sharing preferences</p>
      </div>

      {/* Profile Visibility */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Visibility</CardTitle>
          <CardDescription>Control who can see your profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Public Profile</p>
                <p className="text-sm text-muted-foreground">Make your profile visible to everyone</p>
              </div>
              <Switch
                checked={formData.profilePublic}
                onCheckedChange={(checked) => updateFormData('profilePublic', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Show Email Address</p>
                <p className="text-sm text-muted-foreground">Display your email on public profile</p>
              </div>
              <Switch
                checked={formData.showEmail}
                onCheckedChange={(checked) => updateFormData('showEmail', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Show Location</p>
                <p className="text-sm text-muted-foreground">Display your location on profile</p>
              </div>
              <Switch
                checked={formData.showLocation}
                onCheckedChange={(checked) => updateFormData('showLocation', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle>Data & Privacy</CardTitle>
          <CardDescription>Manage your data and privacy settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Searchable Profile</p>
                <p className="text-sm text-muted-foreground">Allow others to find you via search</p>
              </div>
              <Switch
                checked={formData.searchableProfile}
                onCheckedChange={(checked) => updateFormData('searchableProfile', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Allow Direct Messages</p>
                <p className="text-sm text-muted-foreground">Let other users message you</p>
              </div>
              <Switch
                checked={formData.allowDirectMessages}
                onCheckedChange={(checked) => updateFormData('allowDirectMessages', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Show Activity Status</p>
                <p className="text-sm text-muted-foreground">Display when you're online</p>
              </div>
              <Switch
                checked={formData.showActivity}
                onCheckedChange={(checked) => updateFormData('showActivity', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Download */}
      <Card>
        <CardHeader>
          <CardTitle>Data Export</CardTitle>
          <CardDescription>Download a copy of your data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Request a copy of all your data including profile information, integrations, and activity history.
            </p>
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              Request Data Export
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDangerZone = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-red-600">Danger Zone</h2>
        <p className="text-muted-foreground">Irreversible and destructive actions</p>
      </div>

      {/* Account Deletion */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Delete Account</CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data. This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-red-800 mb-2">This will permanently:</p>
                <ul className="list-disc list-inside space-y-1 text-red-700">
                  <li>Delete your profile and all personal data</li>
                  <li>Remove all your integrations and connections</li>
                  <li>Cancel any active subscriptions</li>
                  <li>Delete all your activity history</li>
                </ul>
              </div>
            </div>
          </div>
          <Button variant="destructive" className="gap-2">
            <Trash2 className="w-4 h-4" />
            Delete My Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'account':
      case 'profile':
        return renderAccountSection();
      case 'integrations':
        return renderIntegrationsSection();
      case 'security':
        return renderSecuritySection();
      case 'preferences':
      case 'notifications':
        return renderPreferencesSection();
      case 'privacy':
        return renderPrivacySection();
      case 'danger':
        return renderDangerZone();
      default:
        return renderAccountSection();
    }
  };

  return (
    <div className="min-h-screen bg-background flex ">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      {renderSidebar()}

      {/* Main Content */}
      <div className="">
        {/* Mobile Header */}
        <div className="lg:hidden bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Badge variant="secondary">
              {settingsSections.find(s => s.id === activeSection)?.label}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 w-full">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}