'use client'

import React, { useEffect, useState } from 'react';
import { useExternalProfilesStore, ExternalProfile } from '@/store/external-profiles/profiles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Github, Linkedin, Code2, Trophy, CheckCircle, XCircle, AlertCircle,
  Loader2, Plus, RefreshCw, Trash2, Edit2, ExternalLink, Copy,
  Shield, Clock, Target, Star, Calendar, MapPin, Building, GraduationCap,
  X, Eye, ChevronRight, MoreHorizontal, Zap
} from 'lucide-react';
import Header from '@/components/layout/header';

export default function ExternalProfilesPage() {
  const {
    platforms,
    profiles,
    selectedProfile,
    isLoading,
    error,
    fetchPlatforms,
    fetchProfiles,
    addProfile,
    updateProfile,
    deleteProfile,
    regenerateCode,
    verifyProfile,
    fetchProfileData,
    fetchSingleProfileData,
    fetchAllProfilesData,
    setSelectedProfile,
    reset
  } = useExternalProfilesStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [username, setUsername] = useState('');
  const [editingProfile, setEditingProfile] = useState<ExternalProfile | null>(null);
  const [deletingProfile, setDeletingProfile] = useState<ExternalProfile | null>(null);

  useEffect(() => {
    fetchPlatforms();
    fetchProfiles();
    return () => reset();
  }, []);

  const getPlatformIcon = (platform: string) => {
    const icons: { [key: string]: JSX.Element } = {
      leetcode: <Code2 className="w-5 h-5" />,
      github: <Github className="w-5 h-5" />,
      linkedin: <Linkedin className="w-5 h-5" />,
      hackerrank: <Code2 className="w-5 h-5" />,
      codechef: <Code2 className="w-5 h-5" />,
      codeforces: <Code2 className="w-5 h-5" />,
      stackoverflow: <Code2 className="w-5 h-5" />,
      topcoder: <Trophy className="w-5 h-5" />,
      atcoder: <Code2 className="w-5 h-5" />,
      geeksforgeeks: <Code2 className="w-5 h-5" />,
    };
    return icons[platform.toLowerCase()] || <Code2 className="w-5 h-5" />;
  };

  const getPlatformColor = (platform: string) => {
    const colors: { [key: string]: string } = {
      leetcode: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-300',
      github: 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-900/20 dark:text-gray-300',
      linkedin: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/20 dark:text-blue-300',
      hackerrank: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/20 dark:text-green-300',
      codechef: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/20 dark:text-orange-300',
      codeforces: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/20 dark:text-red-300',
    };
    return colors[platform.toLowerCase()] || 'bg-muted text-muted-foreground';
  };

  const handleAddProfile = async () => {
    if (!selectedPlatform || !username.trim()) return;
    const success = await addProfile(selectedPlatform, username.trim());
    if (success) {
      setShowAddModal(false);
      setSelectedPlatform('');
      setUsername('');
      fetchProfiles();
    }
  };

  const handleUpdateProfile = async () => {
    if (!editingProfile || !username.trim()) return;
    const success = await updateProfile(editingProfile._id, username.trim());
    if (success) {
      setShowEditModal(false);
      setEditingProfile(null);
      setUsername('');
      fetchProfiles();
    }
  };

  const handleDeleteProfile = async () => {
    if (!deletingProfile) return;
    const success = await deleteProfile(deletingProfile._id);
    if (success) {
      setShowDeleteConfirm(false);
      setDeletingProfile(null);
      fetchProfiles();
    }
  };

  const handleVerifyProfile = async (profileId: string) => {
    const success = await verifyProfile(profileId);
    if (success) {
      fetchProfiles();
    }
  };

  const handleRegenerateCode = async (profileId: string) => {
    await regenerateCode(profileId);
    fetchProfiles();
  };

  const handleFetchData = async (profileId: string) => {
    await fetchSingleProfileData(profileId);
  };

  const handleViewDetails = async (profile: ExternalProfile) => {
    setSelectedProfile(profile);
    if (profile.isVerified && !profile.profileData) {
      await fetchProfileData(profile._id);
    }
    setShowDetailModal(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const renderStatsOverview = () => {
    const verifiedCount = profiles.filter(p => p.isVerified).length;
    const pendingCount = profiles.filter(p => !p.isVerified).length;
    const totalProblems = profiles.reduce((sum, p) => sum + (p.profileData?.stats?.total_solved || 0), 0);

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="professional-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Profiles</p>
                <p className="text-3xl font-bold">{profiles.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="professional-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Verified</p>
                <p className="text-3xl font-bold text-green-600">{verifiedCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="professional-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Problems</p>
                <p className="text-3xl font-bold text-primary">{totalProblems}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderProfileCard = (profile: ExternalProfile) => {
    const platform = platforms.find(p => p.name === profile.platform);

    return (
      <Card key={profile._id} className="professional-shadow hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getPlatformColor(profile.platform)}`}>
                {getPlatformIcon(profile.platform)}
              </div>
              <div>
                <h3 className="font-semibold text-lg capitalize">{profile.platform}</h3>
                <p className="text-sm text-muted-foreground">@{profile.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {profile.isVerified ? (
                <Badge className="bg-green-100 text-green-800 border-green-300 dark:bg-green-900/20 dark:text-green-300">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              ) : (
                <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                  <Clock className="w-3 h-3 mr-1" />
                  Pending
                </Badge>
              )}
            </div>
          </div>

          {/* Stats Preview */}
          {profile.profileData?.stats && (
            <div className="grid grid-cols-4 gap-2 mb-4 p-3 bg-muted/50 rounded-lg">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="text-lg font-bold">{profile.profileData.stats.total_solved || 0}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Easy</p>
                <p className="text-lg font-bold text-green-600">{profile.profileData.stats.easy_solved || 0}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Medium</p>
                <p className="text-lg font-bold text-yellow-600">{profile.profileData.stats.medium_solved || 0}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Hard</p>
                <p className="text-lg font-bold text-red-600">{profile.profileData.stats.hard_solved || 0}</p>
              </div>
            </div>
          )}

          {/* Verification Section */}
          {!profile.isVerified && profile.verificationCode && (
            <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Verification Required</p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                    Add this code to your {platform?.displayName} profile
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <code className="flex-1 px-3 py-2 bg-white dark:bg-gray-900 border border-yellow-300 dark:border-yellow-700 rounded text-sm font-mono">
                  {profile.verificationCode}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(profile.verificationCode || '')}
                  suppressHydrationWarning
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            {!profile.isVerified && (
              <>
                <Button
                  size="sm"
                  variant="default"
                  className="professional-gradient text-primary-foreground"
                  onClick={() => handleVerifyProfile(profile._id)}
                  disabled={isLoading}
                  suppressHydrationWarning
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verify
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRegenerateCode(profile._id)}
                  disabled={isLoading}
                  suppressHydrationWarning
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  New Code
                </Button>
              </>
            )}

            {profile.isVerified && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleFetchData(profile._id)}
                disabled={isLoading}
                suppressHydrationWarning
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync Data
              </Button>
            )}

            <Button
              size="sm"
              variant="outline"
              onClick={() => handleViewDetails(profile)}
              suppressHydrationWarning
            >
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setEditingProfile(profile);
                setUsername(profile.username);
                setShowEditModal(true);
              }}
              suppressHydrationWarning
            >
              <Edit2 className="w-4 h-4" />
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="text-destructive"
              onClick={() => {
                setDeletingProfile(profile);
                setShowDeleteConfirm(true);
              }}
              suppressHydrationWarning
            >
              <Trash2 className="w-4 h-4" />
            </Button>

            <Button
              size="sm"
              variant="outline"
              asChild
              suppressHydrationWarning
            >
              <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  // LeetCode Component
  const LeetCodeProfile = ({ profile, isLoading }) => {
    const stats = profile.profileData?.stats;
    const submissions = profile.profileData?.submissions;
    const profileInfo = profile.profileData?.profile;

    return (
      <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg capitalize text-foreground">{profile.platform}</h3>
                <p className="text-sm text-muted-foreground">@{profile.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {profile.isVerified ? (
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              ) : (
                <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                  <Clock className="w-3 h-3 mr-1" />
                  Pending
                </Badge>
              )}
            </div>
          </div>

          {/* Profile Info */}
          {profileInfo?.realName && (
            <div className="mb-4 text-sm">
              <span className="text-muted-foreground">Name: </span>
              <span className="font-medium text-foreground">{profileInfo.realName}</span>
            </div>
          )}

          {/* Stats Preview */}
          {stats && (
            <div className="grid grid-cols-4 gap-2 mb-4 p-3 bg-muted/50 rounded-lg">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="text-lg font-bold text-foreground">{stats.total_solved || 0}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Easy</p>
                <p className="text-lg font-bold text-green-600">{stats.easy_solved || 0}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Medium</p>
                <p className="text-lg font-bold text-yellow-600">{stats.medium_solved || 0}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Hard</p>
                <p className="text-lg font-bold text-red-600">{stats.hard_solved || 0}</p>
              </div>
            </div>
          )}

          {/* Progress Bars */}
          {submissions && (
            <div className="space-y-3 mb-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Easy</span>
                  <span className="font-medium text-foreground">{submissions.easy?.solved || 0} / {submissions.easy?.total || 0}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${((submissions.easy?.solved || 0) / (submissions.easy?.total || 1)) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Medium</span>
                  <span className="font-medium text-foreground">{submissions.medium?.solved || 0} / {submissions.medium?.total || 0}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${((submissions.medium?.solved || 0) / (submissions.medium?.total || 1)) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Hard</span>
                  <span className="font-medium text-foreground">{submissions.hard?.solved || 0} / {submissions.hard?.total || 0}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: `${((submissions.hard?.solved || 0) / (submissions.hard?.total || 1)) * 100}%` }} />
                </div>
              </div>
            </div>
          )}

          {/* Verification Section */}
          {!profile.isVerified && profile.verificationCode && (
            <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Verification Required</p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">Add this code to your LeetCode profile</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <code className="flex-1 px-3 py-2 bg-white dark:bg-gray-900 border border-yellow-300 dark:border-yellow-700 rounded text-sm font-mono">
                  {profile.verificationCode}
                </code>
                <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(profile.verificationCode || '')} suppressHydrationWarning>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Actions */}
          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            {!profile.isVerified && (
              <>
                <Button
                  size="sm"
                  variant="default"
                  className="professional-gradient text-primary-foreground"
                  onClick={() => handleVerifyProfile(profile._id)}
                  disabled={isLoading}
                  suppressHydrationWarning
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verify
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRegenerateCode(profile._id)}
                  disabled={isLoading}
                  suppressHydrationWarning
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  New Code
                </Button>
              </>
            )}

            {profile.isVerified && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleFetchData(profile._id)}
                disabled={isLoading}
                suppressHydrationWarning
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync Data
              </Button>
            )}

            <Button
              size="sm"
              variant="outline"
              onClick={() => handleViewDetails(profile)}
              suppressHydrationWarning
            >
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setEditingProfile(profile);
                setUsername(profile.username);
                setShowEditModal(true);
              }}
              suppressHydrationWarning
            >
              <Edit2 className="w-4 h-4" />
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="text-destructive"
              onClick={() => {
                setDeletingProfile(profile);
                setShowDeleteConfirm(true);
              }}
              suppressHydrationWarning
            >
              <Trash2 className="w-4 h-4" />
            </Button>

            <Button
              size="sm"
              variant="outline"
              asChild
              suppressHydrationWarning
            >
              <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  // GitHub Component
  const GitHubProfile = ({ profile, isLoading }) => {
    const stats = profile.profileData?.stats;
    const profileInfo = profile.profileData?.profile;
    const languages = profile.profileData?.languages;

    return (
      <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-foreground/10 text-foreground border border-border">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg capitalize text-foreground">{profile.platform}</h3>
                <p className="text-sm text-muted-foreground">@{profile.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {profile.isVerified ? (
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              ) : (
                <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                  <Clock className="w-3 h-3 mr-1" />
                  Pending
                </Badge>
              )}
            </div>
          </div>

          {/* Profile Info */}
          {profileInfo && (
            <div className="space-y-2 mb-4">
              {profileInfo.name && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Name: </span>
                  <span className="font-medium text-foreground">{profileInfo.name}</span>
                </div>
              )}
              {profileInfo.bio && (
                <p className="text-sm text-muted-foreground">{profileInfo.bio}</p>
              )}
              <div className="flex flex-wrap gap-3 text-sm">
                {profileInfo.company && (
                  <div className="flex items-center gap-1">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{profileInfo.company}</span>
                  </div>
                )}
                {profileInfo.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{profileInfo.location}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-4 gap-2 mb-4 p-3 bg-muted/50 rounded-lg">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Repos</p>
                <p className="text-lg font-bold text-foreground">{stats.public_repos || 0}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Followers</p>
                <p className="text-lg font-bold text-foreground">{stats.followers || 0}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Following</p>
                <p className="text-lg font-bold text-foreground">{stats.following || 0}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Stars</p>
                <p className="text-lg font-bold text-foreground">{stats.total_stars || 0}</p>
              </div>
            </div>
          )}

          {/* Languages */}
          {languages && Object.keys(languages).length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Top Languages:</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(languages).slice(0, 5).map(([lang, count]) => (
                  <Badge key={lang} variant="secondary" className="bg-muted text-foreground">
                    {lang} ({count})
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Verification Section */}
          {!profile.isVerified && profile.verificationCode && (
            <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Verification Required</p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">Add this code to your GitHub profile</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <code className="flex-1 px-3 py-2 bg-white dark:bg-gray-900 border border-yellow-300 dark:border-yellow-700 rounded text-sm font-mono">
                  {profile.verificationCode}
                </code>
                <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(profile.verificationCode || '')} suppressHydrationWarning>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Actions */}
          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            {!profile.isVerified && (
              <>
                <Button
                  size="sm"
                  variant="default"
                  className="professional-gradient text-primary-foreground"
                  onClick={() => handleVerifyProfile(profile._id)}
                  disabled={isLoading}
                  suppressHydrationWarning
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verify
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRegenerateCode(profile._id)}
                  disabled={isLoading}
                  suppressHydrationWarning
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  New Code
                </Button>
              </>
            )}

            {profile.isVerified && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleFetchData(profile._id)}
                disabled={isLoading}
                suppressHydrationWarning
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync Data
              </Button>
            )}

            <Button
              size="sm"
              variant="outline"
              onClick={() => handleViewDetails(profile)}
              suppressHydrationWarning
            >
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setEditingProfile(profile);
                setUsername(profile.username);
                setShowEditModal(true);
              }}
              suppressHydrationWarning
            >
              <Edit2 className="w-4 h-4" />
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="text-destructive"
              onClick={() => {
                setDeletingProfile(profile);
                setShowDeleteConfirm(true);
              }}
              suppressHydrationWarning
            >
              <Trash2 className="w-4 h-4" />
            </Button>

            <Button
              size="sm"
              variant="outline"
              asChild
              suppressHydrationWarning
            >
              <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  // HackerRank Component
  const HackerRankProfile = ({ profile, isLoading }) => {
    const stats = profile.profileData?.stats;
    const profileInfo = profile.profileData?.profile;

    return (
      <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-green-500/10 text-green-600 border border-green-500/20">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg capitalize text-foreground">{profile.platform}</h3>
                <p className="text-sm text-muted-foreground">@{profile.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {profile.isVerified ? (
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              ) : (
                <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                  <Clock className="w-3 h-3 mr-1" />
                  Pending
                </Badge>
              )}
            </div>
          </div>

          {/* Profile Info */}
          {profileInfo && (
            <div className="space-y-2 mb-4">
              {profileInfo.country && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{profileInfo.country}</span>
                </div>
              )}
              {profileInfo.school && (
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{profileInfo.school}</span>
                </div>
              )}
            </div>
          )}

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-muted/50 rounded-lg">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Score</p>
                <p className="text-lg font-bold text-foreground">{stats.hackerrank_score || 0}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Level</p>
                <p className="text-lg font-bold text-foreground">{stats.level || 0}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Active Days</p>
                <p className="text-lg font-bold text-foreground">{stats.total_submission_days || 0}</p>
              </div>
            </div>
          )}

          {/* Verification Section */}
          {!profile.isVerified && profile.verificationCode && (
            <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Verification Required</p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">Add this code to your HackerRank profile</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <code className="flex-1 px-3 py-2 bg-white dark:bg-gray-900 border border-yellow-300 dark:border-yellow-700 rounded text-sm font-mono">
                  {profile.verificationCode}
                </code>
                <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(profile.verificationCode || '')} suppressHydrationWarning>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Actions */}
          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            {!profile.isVerified && (
              <>
                <Button
                  size="sm"
                  variant="default"
                  className="professional-gradient text-primary-foreground"
                  onClick={() => handleVerifyProfile(profile._id)}
                  disabled={isLoading}
                  suppressHydrationWarning
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verify
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRegenerateCode(profile._id)}
                  disabled={isLoading}
                  suppressHydrationWarning
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  New Code
                </Button>
              </>
            )}

            {profile.isVerified && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleFetchData(profile._id)}
                disabled={isLoading}
                suppressHydrationWarning
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync Data
              </Button>
            )}

            <Button
              size="sm"
              variant="outline"
              onClick={() => handleViewDetails(profile)}
              suppressHydrationWarning
            >
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setEditingProfile(profile);
                setUsername(profile.username);
                setShowEditModal(true);
              }}
              suppressHydrationWarning
            >
              <Edit2 className="w-4 h-4" />
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="text-destructive"
              onClick={() => {
                setDeletingProfile(profile);
                setShowDeleteConfirm(true);
              }}
              suppressHydrationWarning
            >
              <Trash2 className="w-4 h-4" />
            </Button>

            <Button
              size="sm"
              variant="outline"
              asChild
              suppressHydrationWarning
            >
              <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Generic Profile Component for other platforms
  const GenericProfile = ({ profile, isLoading }) => {
    const getPlatformIcon = (platform) => {
      const icons = {
        linkedin: <Linkedin className="w-5 h-5" />,
        codechef: <Code2 className="w-5 h-5" />,
        codeforces: <Code2 className="w-5 h-5" />,
      };
      return icons[platform.toLowerCase()] || <Code2 className="w-5 h-5" />;
    };

    const getPlatformColor = (platform) => {
      const colors = {
        linkedin: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
        codechef: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
        codeforces: 'bg-red-500/10 text-red-600 border-red-500/20',
      };
      return colors[platform.toLowerCase()] || 'bg-muted text-muted-foreground';
    };

    return (
      <Card className="bg-card border-border hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getPlatformColor(profile.platform)}`}>
                {getPlatformIcon(profile.platform)}
              </div>
              <div>
                <h3 className="font-semibold text-lg capitalize text-foreground">{profile.platform}</h3>
                <p className="text-sm text-muted-foreground">@{profile.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {profile.isVerified ? (
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              ) : (
                <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                  <Clock className="w-3 h-3 mr-1" />
                  Pending
                </Badge>
              )}
            </div>
          </div>

          {/* Verification Section */}
          {!profile.isVerified && profile.verificationCode && (
            <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Verification Required</p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">Add this code to your {profile.platform} profile</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <code className="flex-1 px-3 py-2 bg-white dark:bg-gray-900 border border-yellow-300 dark:border-yellow-700 rounded text-sm font-mono">
                  {profile.verificationCode}
                </code>
                <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(profile.verificationCode || '')} suppressHydrationWarning>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            {!profile.isVerified && (
              <>
                <Button
                  size="sm"
                  variant="default"
                  className="professional-gradient text-primary-foreground"
                  onClick={() => handleVerifyProfile(profile._id)}
                  disabled={isLoading}
                  suppressHydrationWarning
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verify
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRegenerateCode(profile._id)}
                  disabled={isLoading}
                  suppressHydrationWarning
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  New Code
                </Button>
              </>
            )}

            {profile.isVerified && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleFetchData(profile._id)}
                disabled={isLoading}
                suppressHydrationWarning
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync Data
              </Button>
            )}

            <Button
              size="sm"
              variant="outline"
              onClick={() => handleViewDetails(profile)}
              suppressHydrationWarning
            >
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setEditingProfile(profile);
                setUsername(profile.username);
                setShowEditModal(true);
              }}
              suppressHydrationWarning
            >
              <Edit2 className="w-4 h-4" />
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="text-destructive"
              onClick={() => {
                setDeletingProfile(profile);
                setShowDeleteConfirm(true);
              }}
              suppressHydrationWarning
            >
              <Trash2 className="w-4 h-4" />
            </Button>

            <Button
              size="sm"
              variant="outline"
              asChild
              suppressHydrationWarning
            >
              <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderAddModal = () => {
    if (!showAddModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Add External Profile</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)} suppressHydrationWarning>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <CardDescription>Connect a new platform profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Platform</label>
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger suppressHydrationWarning>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <SelectItem key={platform.name} value={platform.name}>
                      <div className="flex items-center gap-2">
                        {getPlatformIcon(platform.name)}
                        <span>{platform.displayName}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Username</label>
              <Input
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                suppressHydrationWarning
              />
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1 professional-gradient text-primary-foreground"
                onClick={handleAddProfile}
                disabled={isLoading || !selectedPlatform || !username.trim()}
                suppressHydrationWarning
              >
                {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                Add Profile
              </Button>
              <Button variant="outline" onClick={() => setShowAddModal(false)} suppressHydrationWarning>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderEditModal = () => {
    if (!showEditModal || !editingProfile) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Edit Profile</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowEditModal(false)} suppressHydrationWarning>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <CardDescription>Update your {editingProfile.platform} username</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Platform</label>
              <Input value={editingProfile.platform} disabled className="capitalize" suppressHydrationWarning />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Username</label>
              <Input
                placeholder="Enter new username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                suppressHydrationWarning
              />
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1 professional-gradient text-primary-foreground"
                onClick={handleUpdateProfile}
                disabled={isLoading || !username.trim()}
                suppressHydrationWarning
              >
                {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Edit2 className="w-4 h-4 mr-2" />}
                Update
              </Button>
              <Button variant="outline" onClick={() => setShowEditModal(false)} suppressHydrationWarning>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderDeleteConfirm = () => {
    if (!showDeleteConfirm || !deletingProfile) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-destructive">Delete Profile</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowDeleteConfirm(false)} suppressHydrationWarning>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Are you sure you want to delete your <strong className="capitalize">{deletingProfile.platform}</strong> profile (@{deletingProfile.username})? This action cannot be undone.
            </p>

            <div className="flex gap-2">
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleDeleteProfile}
                disabled={isLoading}
                suppressHydrationWarning
              >
                {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Trash2 className="w-4 h-4 mr-2" />}
                Delete
              </Button>
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} suppressHydrationWarning>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderDetailModal = () => {
    if (!showDetailModal || !selectedProfile) return null;

    const profileData = selectedProfile.profileData;
    const stats = profileData?.stats;
    const recentActivity = profileData?.recentActivity?.last7Days;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 z-10 bg-background border-b border-border p-6 flex items-center justify-between rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getPlatformColor(selectedProfile.platform)}`}>
                {getPlatformIcon(selectedProfile.platform)}
              </div>
              <div>
                <h2 className="text-2xl font-bold capitalize">{selectedProfile.platform}</h2>
                <p className="text-muted-foreground">@{selectedProfile.username}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowDetailModal(false)} suppressHydrationWarning>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {/* Profile Info */}
            {profileData?.profile && (
              <Card className="professional-shadow">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profileData.profile.realName && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground w-24">Name:</span>
                      <span className="font-medium">{profileData.profile.realName}</span>
                    </div>
                  )}

                  {profileData.profile.aboutMe && (
                    <div className="flex items-start gap-2">
                      <span className="text-sm text-muted-foreground w-24">About:</span>
                      <span className="text-sm">{profileData.profile.aboutMe}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    {profileData.profile.school && (
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{profileData.profile.school}</span>
                      </div>
                    )}

                    {profileData.profile.company && (
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{profileData.profile.company}</span>
                      </div>
                    )}

                    {profileData.profile.country && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{profileData.profile.country}</span>
                      </div>
                    )}

                    {profileData.profile.ranking && (
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Rank: #{profileData.profile.ranking.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  {profileData.profile.skillTags && profileData.profile.skillTags.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {profileData.profile.skillTags.map((skill, i) => (
                          <Badge key={i} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Statistics */}
            {stats && (
              <Card className="professional-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Problem Solving Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="p-4 text-center bg-muted/50">
                      <div className="text-3xl font-bold text-primary">{stats.total_solved || 0}</div>
                      <div className="text-sm text-muted-foreground mt-1">Total Solved</div>
                    </Card>

                    <Card className="p-4 text-center bg-green-50 dark:bg-green-900/10">
                      <div className="text-3xl font-bold text-green-600">{stats.easy_solved || 0}</div>
                      <div className="text-sm text-muted-foreground mt-1">Easy</div>
                    </Card>

                    <Card className="p-4 text-center bg-yellow-50 dark:bg-yellow-900/10">
                      <div className="text-3xl font-bold text-yellow-600">{stats.medium_solved || 0}</div>
                      <div className="text-sm text-muted-foreground mt-1">Medium</div>
                    </Card>

                    <Card className="p-4 text-center bg-red-50 dark:bg-red-900/10">
                      <div className="text-3xl font-bold text-red-600">{stats.hard_solved || 0}</div>
                      <div className="text-sm text-muted-foreground mt-1">Hard</div>
                    </Card>
                  </div>

                  {profileData.submissions && (
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Easy Progress</span>
                        <span className="font-medium">
                          {profileData.submissions.easy?.solved || 0} / {profileData.submissions.easy?.total || 0}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${((profileData.submissions.easy?.solved || 0) / (profileData.submissions.easy?.total || 1)) * 100}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Medium Progress</span>
                        <span className="font-medium">
                          {profileData.submissions.medium?.solved || 0} / {profileData.submissions.medium?.total || 0}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: `${((profileData.submissions.medium?.solved || 0) / (profileData.submissions.medium?.total || 1)) * 100}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Hard Progress</span>
                        <span className="font-medium">
                          {profileData.submissions.hard?.solved || 0} / {profileData.submissions.hard?.total || 0}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${((profileData.submissions.hard?.solved || 0) / (profileData.submissions.hard?.total || 1)) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Tabs for Badges and Activity */}
            <Tabs defaultValue="badges" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="badges">Badges</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="badges" className="space-y-4">
                <Card className="professional-shadow">
                  <CardContent className="p-6">
                    {profileData?.badges && profileData.badges.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {profileData.badges.map((badge) => (
                          <Card key={badge.id} className="p-4 text-center hover:shadow-md transition-shadow">
                            <img
                              src={badge.icon.startsWith('http') ? badge.icon : `https://leetcode.com${badge.icon}`}
                              alt={badge.displayName}
                              className="w-16 h-16 mx-auto mb-2 object-contain"
                            />
                            <h5 className="font-medium text-sm">{badge.displayName}</h5>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(badge.creationDate).toLocaleDateString()}
                            </p>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Trophy className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>No badges earned yet</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <Card className="professional-shadow">
                  <CardContent className="p-6">
                    {recentActivity && recentActivity.problems && recentActivity.problems.length > 0 ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">Last 7 Days</h4>
                          <Badge>{recentActivity.problemsSolved} problems solved</Badge>
                        </div>

                        {recentActivity.problems.map((problem, index) => (
                          <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h5 className="font-medium">{problem.title}</h5>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="secondary" className="text-xs capitalize">
                                    {problem.language}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(problem.solvedAt).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              <Button variant="outline" size="sm" asChild suppressHydrationWarning>
                                <a href={problem.url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>No recent activity</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Last Updated */}
            {profileData?.lastFetched && (
              <div className="text-center text-sm text-muted-foreground">
                Last updated: {new Date(profileData.lastFetched).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background" suppressHydrationWarning>
      <Header title="External Profiles" />

      <div className="w-full mx-auto p-4 lg:p-6 space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            {/* <h1 className="text-3xl font-bold">External Profiles</h1> */}
            <p className="text-muted-foreground text-md">Manage your coding platform profiles</p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={fetchAllProfilesData}
              disabled={isLoading || profiles.length === 0}
              suppressHydrationWarning
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Sync All
            </Button>
            <Button
              className="professional-gradient text-primary-foreground"
              onClick={() => setShowAddModal(true)}
              suppressHydrationWarning
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Profile
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && profiles.length === 0 && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <Card className="border-destructive">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 text-destructive">
                <AlertCircle className="w-5 h-5" />
                <div>
                  <p className="font-medium">Failed to load profiles</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="mt-4"
                onClick={fetchProfiles}
                suppressHydrationWarning
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Stats Overview */}
        {!isLoading && profiles.length > 0 && renderStatsOverview()}

        {/* Profiles Grid */}
        {!isLoading && profiles.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {profiles.map((profile) => {
              switch (profile.platform.toLowerCase()) {
                case "leetcode":
                  return (
                    <LeetCodeProfile
                      key={profile._id}
                      profile={profile}
                      // onEdit={onEdit}
                      // onDelete={onDelete}
                      // onVerify={onVerify}
                      // onRegenerateCode={onRegenerateCode}
                      // onFetchData={onFetchData}
                      // onViewDetails={onViewDetails}
                      isLoading={isLoading}
                    />
                  );

                case "hackerrank":
                  return (
                    <HackerRankProfile
                      key={profile._id}
                      profile={profile}
                      isLoading={isLoading}
                    />
                  );

                case "github":
                  return (
                    <GitHubProfile
                      key={profile._id}
                      profile={profile}
                      isLoading={isLoading}
                    />
                  )

                // case "codeforces":
                //   return (
                //     <CodeforcesProfile
                //       key={profile._id}
                //       profile={profile}
                //       onEdit={onEdit}
                //       onDelete={onDelete}
                //       onVerify={onVerify}
                //       onRegenerateCode={onRegenerateCode}
                //       onFetchData={onFetchData}
                //       onViewDetails={onViewDetails}
                //       isLoading={isLoading}
                //     />
                //   );

                default:
                  return (
                    <GenericProfile
                      key={profile._id}
                      profile={profile}
                      // onEdit={onEdit}
                      // onDelete={onDelete}
                      // onVerify={onVerify}
                      // onRegenerateCode={onRegenerateCode}
                      // onFetchData={onFetchData}
                      // onViewDetails={onViewDetails}
                      isLoading={isLoading}
                    />
                  );
              }
            })}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && profiles.length === 0 && (
          <Card className="professional-shadow">
            <CardContent className="p-12 text-center">
              <Shield className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No Profiles Yet</h3>
              <p className="text-muted-foreground mb-6">
                Start by connecting your first coding platform profile
              </p>
              <Button
                className="professional-gradient text-primary-foreground"
                onClick={() => setShowAddModal(true)}
                suppressHydrationWarning
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Profile
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modals */}
      {renderAddModal()}
      {renderEditModal()}
      {renderDeleteConfirm()}
      {renderDetailModal()}
    </div>
  );
}