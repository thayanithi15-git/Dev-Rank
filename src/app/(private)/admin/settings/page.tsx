'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import {
  User,
  Settings,
  Shield,
  Bell,
  Eye,
  Globe,
  Key,
  Trash2,
  AlertTriangle,
  Menu,
  X,
  Lock,
  Download,
  CheckCircle,
  XCircle,
  RefreshCw,
  Plus,
  Unlink,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { useSettingsStore } from '@/store/settings/settings';
import Header from '@/components/layout/header';

const settingsSections = [
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'integrations', label: 'Integrations', icon: Globe },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: Eye },
  { id: 'data', label: 'Data & Export', icon: Download },
  { id: 'danger', label: 'Danger Zone', icon: AlertTriangle },
];

const platformIcons: Record<string, string> = {
  github: '🐙',
  leetcode: '🔢',
  codeforces: '🏆',
  codechef: '👨‍🍳',
  hackerrank: '🎯',
  linkedin: '💼',
  stackoverflow: '📚',
  topcoder: '🎓',
  atcoder: '🎌',
  geeksforgeeks: '💻',
};

const platformColors: Record<string, string> = {
  github: 'bg-gray-900 text-white',
  leetcode: 'bg-yellow-500 text-white',
  codeforces: 'bg-blue-600 text-white',
  codechef: 'bg-orange-600 text-white',
  hackerrank: 'bg-green-600 text-white',
  linkedin: 'bg-blue-700 text-white',
  stackoverflow: 'bg-orange-500 text-white',
  topcoder: 'bg-red-600 text-white',
  atcoder: 'bg-purple-600 text-white',
  geeksforgeeks: 'bg-green-700 text-white',
};

export default function AccountSettingsPage() {
  const [activeSection, setActiveSection] = useState('security');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [profilePublic, setProfilePublic] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [showActivity, setShowActivity] = useState(true);

  const [username, setUsername] = useState("User");
  const [userEmail, setUserEmail] = useState("user@example.com");

  useEffect(() => {
    // Only runs in the browser
    const storedName = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("userEmail");

    if (storedName) setUsername(storedName);
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  const {
    currentPassword,
    newPassword,
    confirmPassword,
    isChangingPassword,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    changePassword,

    platforms,
    isLoadingPlatforms,
    fetchPlatforms,

    isExportingData,
    exportData,

    deletePassword,
    deleteConfirmation,
    isDeletingAccount,
    setDeletePassword,
    setDeleteConfirmation,
    deleteAccount,
  } = useSettingsStore();

  // Fetch platforms on mount
  useEffect(() => {
    if (activeSection === 'integrations' && !platforms) {
      fetchPlatforms();
    }
  }, [activeSection, platforms, fetchPlatforms]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    await changePassword();
  };

  const handleExportData = async () => {
    await exportData();
  };

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    await deleteAccount();
  };

  const getStatusColor = (isVerified: boolean) => {
    return isVerified
      ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800'
      : 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/30 dark:text-gray-400 dark:border-gray-700';
  };

  const renderSidebar = () => (
    <aside className={`
      fixed top-0 left-0 h-[100%] w-64 bg-card border-b border-r border-border z-50 transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto
    `}>
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold ">Settings</h2>
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
            className={`w-full justify-start gap-3 ${activeSection === section.id ? 'bg-primary/10 text-primary' : ''
              } ${section.id === 'danger' ? 'text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950' : ''}`}
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

      <div className="my-4 mt-[50%] mx-4 bottom-4 left-4 right-4">
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/api/placeholder/100/100" />
                <AvatarFallback>DD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{username}</p>
                <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 ">Security</h2>
        <p className="text-muted-foreground">Manage your account security and authentication</p>
      </div>

      <Card className="professional-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            Change Password
          </CardTitle>
          <CardDescription>Update your password to keep your account secure</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                disabled={isChangingPassword}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 8 characters)"
                disabled={isChangingPassword}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                disabled={isChangingPassword}
              />
            </div>
            <Button
              type="submit"
              className="professional-gradient text-primary-foreground"
              disabled={isChangingPassword}
            >
              {isChangingPassword ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Changing Password...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Save Password
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  const renderIntegrationsSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 ">Integrations</h2>
        <p className="text-muted-foreground">Connect your coding platforms to sync your data</p>
      </div>

      {isLoadingPlatforms ? (
        <Card className="professional-shadow">
          <CardContent className="p-12 text-center">
            <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading platforms...</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {platforms && platforms.connectedPlatforms.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Connected Platforms ({platforms.totalConnected})
              </h3>
              <div className="grid gap-4">
                {platforms.connectedPlatforms.map((platform) => (
                  <Card key={platform.platform} className="professional-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${platformColors[platform.platform] || 'bg-gray-500 text-white'
                            }`}>
                            {platformIcons[platform.platform] || '🔗'}
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium capitalize">{platform.platform}</h3>
                              <Badge className={getStatusColor(platform.isVerified)}>
                                {platform.isVerified ? (
                                  <>
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Verified
                                  </>
                                ) : (
                                  <>
                                    <XCircle className="w-3 h-3 mr-1" />
                                    Unverified
                                  </>
                                )}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">@{platform.username}</p>
                            <p className="text-xs text-muted-foreground">
                              Last checked: {new Date(platform.lastChecked).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(platform.profileUrl, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Profile
                          </Button>
                          <Button variant="outline" size="sm">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Sync
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Unlink className="w-4 h-4 mr-2" />
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {platforms && platforms.availablePlatforms.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                Available Platforms ({platforms.totalAvailable})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {platforms.availablePlatforms.map((platform) => (
                  <Card key={platform} className="professional-shadow hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${platformColors[platform] || 'bg-gray-500 text-white'
                            }`}>
                            {platformIcons[platform] || '🔗'}
                          </div>
                          <div>
                            <p className="font-medium capitalize">{platform}</p>
                            <p className="text-xs text-muted-foreground">Not connected</p>
                          </div>
                        </div>
                        <Button size="sm" className="professional-gradient text-primary-foreground">
                          <Plus className="w-4 h-4 mr-1" />
                          Connect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 ">Notifications</h2>
        <p className="text-muted-foreground">Manage how you receive notifications</p>
      </div>

      <Card className="professional-shadow">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose how you want to be notified about updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive updates and alerts via email</p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-muted-foreground">Receive push notifications in browser</p>
            </div>
            <Switch
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 ">Privacy</h2>
        <p className="text-muted-foreground">Control your privacy and visibility settings</p>
      </div>

      <Card className="professional-shadow">
        <CardHeader>
          <CardTitle>Profile Visibility</CardTitle>
          <CardDescription>Control who can see your profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Public Profile</p>
              <p className="text-sm text-muted-foreground">Make your profile visible to everyone</p>
            </div>
            <Switch
              checked={profilePublic}
              onCheckedChange={setProfilePublic}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Show Email Address</p>
              <p className="text-sm text-muted-foreground">Display your email on public profile</p>
            </div>
            <Switch
              checked={showEmail}
              onCheckedChange={setShowEmail}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Show Activity Status</p>
              <p className="text-sm text-muted-foreground">Display when you're active</p>
            </div>
            <Switch
              checked={showActivity}
              onCheckedChange={setShowActivity}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDataSection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 ">Data & Export</h2>
        <p className="text-muted-foreground">Download and manage your data</p>
      </div>

      <Card className="professional-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" />
            Export Your Data
          </CardTitle>
          <CardDescription>
            Download a complete copy of your profile data, integrations, and activity history
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm mb-4">
              Your export will include all data associated with your account in Excel format.
              This process may take a few moments.
            </p>
          </div>
          <Button
            onClick={handleExportData}
            disabled={isExportingData}
            className="professional-gradient text-primary-foreground"
          >
            {isExportingData ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Preparing Export...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download Data Export
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderDangerZone = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-red-600 dark:text-red-500 ">Danger Zone</h2>
        <p className="text-muted-foreground">Irreversible and destructive actions</p>
      </div>

      <Card className="border-red-200 dark:border-red-900 professional-shadow">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-500 flex items-center gap-2">
            <Trash2 className="w-5 h-5" />
            Delete Account
          </CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data. This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-red-800 dark:text-red-400 mb-2">This will permanently:</p>
                <ul className="list-disc list-inside space-y-1 text-red-700 dark:text-red-500">
                  <li>Delete your profile and all personal data</li>
                  <li>Remove all your platform integrations</li>
                  <li>Delete all your activity history</li>
                  <li>Cancel any active subscriptions</li>
                </ul>
              </div>
            </div>
          </div>

          <form onSubmit={handleDeleteAccount} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deletePassword">Confirm Your Password</Label>
              <Input
                id="deletePassword"
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="Enter your password"
                disabled={isDeletingAccount}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deleteConfirmation">Type "DELETE" to confirm</Label>
              <Input
                id="deleteConfirmation"
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder="Type DELETE in capital letters"
                disabled={isDeletingAccount}
              />
            </div>
            <Button
              type="submit"
              variant="destructive"
              disabled={isDeletingAccount}
            >
              {isDeletingAccount ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting Account...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete My Account Permanently
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'security':
        return renderSecuritySection();
      case 'integrations':
        return renderIntegrationsSection();
      case 'notifications':
        return renderNotificationsSection();
      case 'privacy':
        return renderPrivacySection();
      case 'data':
        return renderDataSection();
      case 'danger':
        return renderDangerZone();
      default:
        return renderSecuritySection();
    }
  };

  return (
    <div className="min-h-screen bg-background ">

      <Header title='Account Settings' />

      <div className='flex min-h-screen'>

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
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <div className="lg:hidden bg-card border-b border-border p-4 sticky top-0 z-30">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Badge variant="secondary" className="capitalize">
                {settingsSections.find(s => s.id === activeSection)?.label}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto">
            {renderContent()}
          </div>
        </div>

      </div>
    </div>
  );
}