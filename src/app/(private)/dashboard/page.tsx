'use client';

import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Trophy,
  TrendingUp,
  Github,
  Eye,
  Award,
  Target,
  Activity,
  Users,
  Calendar,
  MapPin,
  Code2,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  Star,
  Zap,
  Globe,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Clock,
  Copy,
  Linkedin,
  GraduationCap,
  Building,
} from 'lucide-react';
import Header from '@/components/layout/header';
import { useDashboardStore } from '@/store/dashboard/dashboard';
import { formatDistanceToNow } from 'date-fns';
import { useToastStore } from '@/utils/toast/store';
import { AnimatePresence } from 'framer-motion';
import { Toast } from '@/utils/toast/toast';

export default function Dashboard() {
  const {
    dashboardData,
    platforms,
    externalProfiles,
    isDashboardLoading,
    isPlatformsLoading,
    isProfilesLoading,
    fetchAllData,
  } = useDashboardStore();

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const isLoading = isDashboardLoading || isPlatformsLoading || isProfilesLoading;

  // Helper function to get platform icon
  const getPlatformIcon = (platformName: string) => {
    const icons: Record<string, any> = {
      github: Github,
      leetcode: Code2,
      hackerrank: Code2,
      codechef: Code2,
      codeforces: Code2,
      linkedin: Users,
      stackoverflow: MessageSquare,
      topcoder: Trophy,
      atcoder: Code2,
      geeksforgeeks: Code2,
    };
    return icons[platformName.toLowerCase()] || Globe;
  };

  const LeetCodeProfile = ({ profile, isLoading }) => {
    const stats = profile.profileData?.stats;
    const submissions = profile.profileData?.submissions;
    const profileInfo = profile.profileData?.profile;
    const Icon = getPlatformIcon(profile.platform);
    return (
      <div key={profile._id} className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold capitalize flex items-center gap-2">
                {profile.platform}
                {profile.isVerified && (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                )}
              </p>
              <p className="text-sm text-muted-foreground">@{profile.username}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <a href={profile.profileUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>

        {profile.profileData && (
          <div className="space-y-3 mt-4">
            {profile.profileData?.stats && (
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-background/50 p-2 rounded text-center">
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="text-lg font-bold text-primary">
                    {profile.profileData?.stats.total_solved}
                  </p>
                </div>
                <div className="bg-green-500/10 p-2 rounded text-center">
                  <p className="text-xs text-muted-foreground">Easy</p>
                  <p className="text-lg font-bold text-green-600">
                    {profile.profileData?.stats.easy_solved}
                  </p>
                </div>
                <div className="bg-yellow-500/10 p-2 rounded text-center">
                  <p className="text-xs text-muted-foreground">Medium</p>
                  <p className="text-lg font-bold text-yellow-600">
                    {profile.profileData?.stats.medium_solved}
                  </p>
                </div>
                <div className="bg-red-500/10 p-2 rounded text-center">
                  <p className="text-xs text-muted-foreground">Hard</p>
                  <p className="text-lg font-bold text-red-600">
                    {profile.profileData?.stats.hard_solved}
                  </p>
                </div>
              </div>
            )}

            {profile.profileData?.profile && (
              <div className="space-y-2">
                {profile.profileData?.profile.realName && (
                  <p className="text-sm">
                    <span className="text-muted-foreground">Name:</span>{' '}
                    <span className="font-medium">{profile.profileData?.profile.realName}</span>
                  </p>
                )}
                {profile.profileData?.profile.ranking && (
                  <p className="text-sm">
                    <span className="text-muted-foreground">Ranking:</span>{' '}
                    <span className="font-medium">#{profile.profileData?.profile.ranking.toLocaleString()}</span>
                  </p>
                )}
                {profile.profileData?.profile.skillTags && profile.profileData?.profile.skillTags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {profile.profileData?.profile.skillTags.slice(0, 5).map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}

            {profile.profileData?.badges && profile.profileData?.badges.length > 0 && (
              <div className="space-y-2 mt-3">
                <p className="text-xs text-muted-foreground font-medium">Recent Badges:</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {profile.profileData?.badges.slice(0, 3).map((badge) => (
                    <div key={badge.id} className="flex items-center gap-1 bg-background/50 px-2 py-1 rounded">
                      <Star className="w-3 h-3 text-yellow-600" />
                      <span className="text-xs font-medium">{badge.displayName}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {profile.profileData?.recentActivity?.last7Days && (
              <div className="space-y-2 mt-3 pt-3 border-t border-border">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground font-medium">Last 7 Days Activity:</p>
                  <Badge variant="secondary" className="text-xs">
                    {profile.profileData?.recentActivity.last7Days.problemsSolved} solved
                  </Badge>
                </div>
                {profile.profileData?.recentActivity.last7Days?.problems?.length > 0 && (
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {profile.profileData?.recentActivity.last7Days.problems.slice(0, 3).map((problem, idx) => (
                      <a
                        key={idx}
                        href={problem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 bg-background/50 hover:bg-background rounded text-xs group"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate group-hover:text-primary transition-colors">
                            {problem.title}
                          </p>
                          <p className="text-muted-foreground">
                            {formatTime(problem.solvedAt)} • {problem.language}
                          </p>
                        </div>
                        <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors ml-2 flex-shrink-0" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <Badge variant={profile.status === 'verified' ? 'default' : 'secondary'}>
            {profile.status}
          </Badge>
          <p className="text-xs text-muted-foreground">
            Updated {formatTime(profile.updatedAt)}
          </p>
        </div>
      </div>
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
        </CardContent>
      </Card>
    );
  };

  // Helper function to format time
  const formatTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Recently';
    }
  };

  const { showToast, toast, hideToast } = useToastStore();

  return (
    <div className="min-h-screen bg-background">

      {/* <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            description={toast.description}
            type={toast.type}
            onClose={hideToast}
          />
        )}
      </AnimatePresence> */}

      <Header />

      <main className="p-4 lg:p-6 py-6 space-y-6 w-full mx-auto">
        {/* User Profile Header */}
        {/* <Card className="professional-shadow border-primary/10">
          <CardContent className="p-6">
            {isLoading ? (
              <div className="flex items-center gap-4">
                <Skeleton className="w-16 h-16 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-64" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 border-2 border-primary/20">
                    <AvatarImage src={dashboardData.user?.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                      {dashboardData.user?.firstName?.[0]}{dashboardData.user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">
                      {dashboardData.user?.firstName} {dashboardData.user?.lastName}
                    </h1>
                    <p className="text-muted-foreground ">@{dashboardData.user?.username}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {dashboardData.user?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Joined {dashboardData.user?.joinedAt && formatTime(dashboardData.user.joinedAt)}
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card> */}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="professional-shadow">
            <CardContent className="p-6">
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-8 w-20" />
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Problems Solved</p>
                    <p className="text-3xl font-bold text-primary">
                      {dashboardData.stats?.totalProblemsSolved || 0}
                    </p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      Keep going!
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-primary" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="professional-shadow">
            <CardContent className="p-6">
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-8 w-20" />
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Global Rank</p>
                    <p className="text-3xl font-bold text-foreground">
                      #{dashboardData.stats?.globalRank?.toLocaleString() || 'N/A'}
                    </p>
                    <p className="text-xs text-blue-600 flex items-center gap-1 mt-1">
                      <Trophy className="w-3 h-3" />
                      Rising
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="professional-shadow">
            <CardContent className="p-6">
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-8 w-20" />
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Platforms Connected</p>
                    <p className="text-3xl font-bold text-foreground">
                      {dashboardData.stats?.platformsConnected || 0}
                    </p>
                    <p className="text-xs text-purple-600 flex items-center gap-1 mt-1">
                      <Globe className="w-3 h-3" />
                      {platforms.length} available
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="professional-shadow">
            <CardContent className="p-6">
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-8 w-20" />
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Profile Completeness</p>
                    <p className="text-3xl font-bold text-foreground">
                      {dashboardData.stats?.profileCompleteness || 0}%
                    </p>
                    <Progress
                      value={dashboardData.stats?.profileCompleteness || 0}
                      className="h-2 mt-2"
                    />
                  </div>
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Platform Statistics */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="professional-shadow">
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
                <CardDescription>
                  Your coding statistics across different platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-12 w-full" />
                    </div>
                  ))
                ) : dashboardData.platformStats.length > 0 ? (
                  dashboardData.platformStats.map((platform, index) => {
                    const Icon = getPlatformIcon(platform.platform);
                    return (
                      <div key={index} className="p-4 bg-muted/30 rounded-lg border border-border">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold capitalize">{platform.platform}</p>
                              <p className="text-sm text-muted-foreground">@{platform.username}</p>
                            </div>
                          </div>
                          <Badge variant={platform.hasData ? "default" : "secondary"}>
                            {platform.hasData ? 'Active' : 'Pending'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Problems Solved</p>
                            <p className="text-2xl font-bold text-primary">{platform.problemsSolved}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Last Updated</p>
                            <p className="text-sm font-medium">{formatTime(platform.lastUpdated)}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No platform statistics available</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* External Profiles Detail */}
            <Card className="professional-shadow">
              <CardHeader>
                <CardTitle>Connected Profiles Detail</CardTitle>
                <CardDescription>
                  Detailed information from your connected accounts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  Array.from({ length: 2 }).map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full" />
                  ))
                ) : externalProfiles.length > 0 ? (
                  externalProfiles.map((profile) => {
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

                  })
                ) : (
                  <div className="text-center py-8">
                    <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No external profiles connected</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Connect Platform
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Recent Problems Solved - Global View */}
            <Card className="professional-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Recent Problem Solving</CardTitle>
                <CardDescription>
                  Your latest solved problems across platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))
                ) : (() => {
                  // Collect all recent problems from all profiles
                  const allRecentProblems: Array<{
                    title: string;
                    url: string;
                    solvedAt: string;
                    language: string;
                    platform: string;
                  }> = [];

                  externalProfiles.forEach(profile => {
                    if (profile.profileData?.recentActivity?.last7Days?.problems) {
                      profile.profileData?.recentActivity.last7Days.problems.forEach(problem => {
                        allRecentProblems.push({
                          ...problem,
                          platform: profile.platform,
                        });
                      });
                    }
                  });

                  // Sort by date
                  allRecentProblems.sort((a, b) =>
                    new Date(b.solvedAt).getTime() - new Date(a.solvedAt).getTime()
                  );

                  return allRecentProblems.length > 0 ? (
                    allRecentProblems.slice(0, 5).map((problem, idx) => {
                      const Icon = getPlatformIcon(problem.platform);
                      return (
                        <a
                          key={idx}
                          href={problem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-3 bg-muted/30 hover:bg-muted/50 rounded-lg transition-colors group"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center flex-shrink-0">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                {problem.title}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs capitalize">
                                  {problem.platform}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {problem.language}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {formatTime(problem.solvedAt)}
                              </p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                          </div>
                        </a>
                      );
                    })
                  ) : (
                    <div className="text-center py-8">
                      <Code2 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground text-sm">No recent problems</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Solve problems to see them here
                      </p>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>

            {/* Available Platforms */}
            <Card className="professional-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Available Platforms</CardTitle>
                <CardDescription>
                  {platforms.length} platforms to connect
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))
                ) : platforms.length > 0 ? (
                  platforms.map((platform) => {
                    const Icon = getPlatformIcon(platform.name);
                    const isConnected = externalProfiles.some(p => p.platform === platform.name);
                    return (
                      <div key={platform.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{platform.displayName}</p>
                            {platform.supportsAutoVerification && (
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Zap className="w-3 h-3" />
                                Auto-verify
                              </p>
                            )}
                          </div>
                        </div>
                        <Badge variant={isConnected ? "default" : "outline"} className="text-xs">
                          {isConnected ? 'Connected' : 'Connect'}
                        </Badge>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No platforms available
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="professional-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>
                  Your latest achievements and updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))
                ) : dashboardData.recentActivity.length > 0 ? (
                  dashboardData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                        <Activity className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-tight">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground text-sm">No recent activity</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Start solving problems to see activity
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="professional-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Achievements</CardTitle>
                <CardDescription>
                  Your earned badges and milestones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))
                ) : dashboardData.achievements.length > 0 ? (
                  dashboardData.achievements.map((achievement) => (
                    <div key={achievement.id} className="flex gap-3 p-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Trophy className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{achievement.title}</p>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatTime(achievement.earnedAt)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground text-sm">No achievements yet</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Keep coding to unlock badges
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="professional-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))
                ) : (
                  <>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Total Score</span>
                      </div>
                      <span className="text-sm font-bold">{dashboardData.stats?.totalScore || 0}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium">Profile Views</span>
                      </div>
                      <span className="text-sm font-bold">-</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium">Streak Days</span>
                      </div>
                      <span className="text-sm font-bold">-</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="professional-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start gap-3" variant="outline">
                  <Target className="w-4 h-4" />
                  Set Weekly Goal
                </Button>
                <Button className="w-full justify-start gap-3" variant="outline">
                  <Globe className="w-4 h-4" />
                  Connect Platform
                </Button>
                <Button className="w-full justify-start gap-3" variant="outline">
                  <Trophy className="w-4 h-4" />
                  View Rankings
                </Button>
                <Button className="w-full justify-start gap-3 professional-gradient text-primary-foreground">
                  <ExternalLink className="w-4 h-4" />
                  Share Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}