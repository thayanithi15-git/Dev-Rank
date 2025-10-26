'use client'

import React, { useEffect, useState } from 'react';
import { useRankAnalysisStore, RankUser } from '@/store/rankUser/rank';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Trophy, Medal, Award, Github, Linkedin, MessageSquare, MapPin, Calendar,
  TrendingUp, TrendingDown, Minus, Search, Filter, Download, ExternalLink,
  Star, Code2, Users, Crown, Zap, Mail, Phone, Building, GraduationCap,
  Clock, Target, Eye, Heart, Share2, BookOpen, Briefcase, ChevronLeft,
  ChevronRight, MoreHorizontal, SortAsc, SortDesc, CheckCircle, XCircle,
  AlertCircle, Loader2, X
} from 'lucide-react';
import Header from '@/components/layout/header';

export default function RankAnalysisPage() {
  const {
    users,
    topUsers,
    selectedUser,
    pagination,
    filters,
    isLoading,
    error,
    setSearch,
    setPlatform,
    setCountry,
    setSortBy,
    setSortOrder,
    setPage,
    setSelectedUser,
    fetchRankings,
    reset
  } = useRankAnalysisStore();

  const [searchInput, setSearchInput] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [activeTab, setActiveTab] = useState('weekly');

  useEffect(() => {
    fetchRankings();
    return () => reset();
  }, []);

  const formatExperience = (exp: number) => {
    if (exp >= 1000000) return `${(exp / 1000000).toFixed(1)}M`;
    if (exp >= 1000) return `${(exp / 1000).toFixed(1)}K`;
    return exp.toString();
  };

  const getFlagEmoji = (countryCode: string) => {
    if (!countryCode) return '🌍';
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  const getPodiumIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-green-700" />;
      case 2: return <Medal className="w-6 h-6 text-gray-600" />;
      case 3: return <Award className="w-6 h-6 text-red-700" />;
      default: return <Trophy className="w-6 h-6 text-gray-600" />;
    }
  };

  const getTrendIcon = (user: RankUser) => {
    const rank = user?.rank ?? 0;
    const prevRank = user?.previousRank ?? rank; // if previousRank missing, treat as no change

    if (rank === prevRank) {
      return <Minus className="w-3 h-3 text-muted-foreground" />;
    }
    if (rank < prevRank) {
      return <TrendingUp className="w-3 h-3 text-green-500" />;
    }
    return <TrendingDown className="w-3 h-3 text-red-500" />;
  };

  const getTrendValue = (user: RankUser) => {
    const rank = user?.rank ?? 0;
    const prevRank = user?.previousRank ?? rank; // fallback
    return Math.abs(rank - prevRank);
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

  const handleSearch = () => {
    setSearch(searchInput);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1);

    if (startPage > 1) {
      buttons.push(
        <Button key="first" variant="outline" size="sm" onClick={() => setPage(1)} suppressHydrationWarning>
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
          variant={pagination.currentPage === i ? "default" : "outline"}
          size="sm"
          onClick={() => setPage(i)}
          className={pagination.currentPage === i ? "professional-gradient text-primary-foreground" : ""}
          suppressHydrationWarning
        >
          {i}
        </Button>
      );
    }

    if (endPage < pagination.totalPages) {
      if (endPage < pagination.totalPages - 1) {
        buttons.push(<span key="dots2" className="px-2">...</span>);
      }
      buttons.push(
        <Button key="last" variant="outline" size="sm" onClick={() => setPage(pagination.totalPages)} suppressHydrationWarning>
          {pagination.totalPages}
        </Button>
      );
    }

    return buttons;
  };

  const renderTopPerformers = () => {
    if (!topUsers || topUsers.length === 0) return null;

    const top3 = topUsers.slice(0, 3);
    const orderedTop3 = [top3[1], top3[0], top3[2]].filter(Boolean);

    return (
      <Card className="professional-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Top Performers
          </CardTitle>
          <CardDescription>
            Leading developers this {activeTab} • Showing {pagination.totalUsers} results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-end justify-center gap-8 py-5">
            {orderedTop3.map((user, index) => {
              const actualRank = index === 1 ? 1 : index === 0 ? 2 : 3;
              const order = index === 1 ? 'order-1 lg:order-2' : index === 0 ? 'order-2 lg:order-1' : 'order-3';
              const avatarSize = actualRank === 1 ? 'w-20 h-20' : actualRank === 2 ? 'w-16 h-16' : 'w-14 h-14';
              const nameSize = actualRank === 1 ? 'text-xl' : 'text-lg';
              const scoreSize = actualRank === 1 ? 'text-3xl' : actualRank === 2 ? 'text-2xl' : 'text-xl';

              return (
                <div
                  key={user._id}
                  className={`flex flex-col items-center space-y-4 ${order} cursor-pointer hover:scale-105 transition-transform`}
                  onClick={() => { setSelectedUser(user); setShowDetailModal(true); }}
                >
                  <Avatar className={`${avatarSize} ring-4 ${actualRank === 1 ? 'ring-yellow-400' : actualRank === 2 ? 'ring-gray-300' : 'ring-orange-400'}`}>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-lg font-bold">
                      {user.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className={`font-bold ${nameSize}`}>
                      {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username}
                    </h3>
                    <p className="text-muted-foreground text-sm">@{user.username}</p>
                    <p className={`${scoreSize} font-bold ${actualRank === 1 ? 'text-primary' : actualRank === 2 ? 'text-gray-600' : 'text-orange-600'}`}>
                      {user.totalProblemsSolved}
                    </p>
                    <div className="flex items-center gap-1 justify-center mt-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{user.platformsCount} platforms</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center mt-2">
                      {user.externalProfiles?.map((profile, i) => (
                        <div key={i} className="w-4 h-4 text-muted-foreground">
                          {profile.platform === 'leetcode' && <Code2 className="w-4 h-4" />}
                          {profile.platform === 'github' && <Github className="w-4 h-4" />}
                          {profile.platform === 'codeforces' && <Code2 className="w-4 h-4" />}
                        </div>
                      ))}
                    </div>
                    {actualRank === 1 && (
                      <Badge className="mt-2 bg-yellow-100 text-yellow-800 border-yellow-300">
                        Champion
                      </Badge>
                    )}
                  </div>
                  <div className={` ${getPodiumHeight(actualRank)} w-${actualRank === 1 ? '48' : actualRank === 2 ? '48' : '48'} bg-gradient-to-t ${getPodiumColor(actualRank)} rounded-t-lg flex flex-col items-center justify-start pt-3`}>
                    {getPodiumIcon(actualRank)}
                    <span className="text-white font-bold text-2xl mt-2">
                      {actualRank === 1 ? '1st' : actualRank === 2 ? '2nd' : '3rd'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  };


  const renderDetailModal = () => {
    if (!selectedUser || !showDetailModal) return null;

    const leetcodeProfile = selectedUser.externalProfiles?.find(p => p.platform === 'leetcode');
    const profileData = leetcodeProfile?.profileData;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 ">
        <div className="bg-background h-[43rem] overflow-y-auto rounded-lg max-w-4xl w-full my-8">
          <div className="sticky top-0 z-100 bg-background border-b border-border p-6 flex items-center justify-between rounded-t-lg">
            <h2 className="text-2xl font-bold">Developer Profile</h2>
            <Button variant="ghost" size="sm" onClick={() => setShowDetailModal(false)} suppressHydrationWarning>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Avatar className="w-24 h-24 ring-4 ring-border">
                    <AvatarImage src={selectedUser.avatar} />
                    <AvatarFallback className="text-2xl font-bold">
                      {selectedUser.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold">
                      {selectedUser.firstName && selectedUser.lastName
                        ? `${selectedUser.firstName} ${selectedUser.lastName}`
                        : selectedUser.username}
                    </h3>
                    {leetcodeProfile?.isVerified && (
                      <CheckCircle className="w-6 h-6 text-blue-500" />
                    )}
                  </div>
                  <p className="text-muted-foreground">@{selectedUser.username}</p>
                  <p className="text-sm">{selectedUser.bio || profileData?.profile?.aboutMe || 'No bio available'}</p>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{profileData?.profile?.country || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {new Date(selectedUser.createdAt).getFullYear()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:ml-auto space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="text-center p-4">
                    <div className="text-2xl font-bold text-primary">{selectedUser.totalScore}</div>
                    <div className="text-sm text-muted-foreground">Total Score</div>
                  </Card>
                  <Card className="text-center p-4">
                    <div className="text-2xl font-bold">{selectedUser.totalProblemsSolved}</div>
                    <div className="text-sm text-muted-foreground">Problems Solved</div>
                  </Card>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 professional-gradient text-primary-foreground" suppressHydrationWarning>
                    <Mail className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                  <Button variant="outline" size="sm" suppressHydrationWarning>
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" suppressHydrationWarning>
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <Target className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-xl font-bold">{profileData?.stats?.total_solved || 0}</div>
                <div className="text-sm text-muted-foreground">Total Solved</div>
              </Card>
              <Card className="p-4 text-center">
                <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-500" />
                <div className="text-xl font-bold">{profileData?.stats?.easy_solved || 0}</div>
                <div className="text-sm text-muted-foreground">Easy</div>
              </Card>
              <Card className="p-4 text-center">
                <AlertCircle className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                <div className="text-xl font-bold">{profileData?.stats?.medium_solved || 0}</div>
                <div className="text-sm text-muted-foreground">Medium</div>
              </Card>
              <Card className="p-4 text-center">
                <XCircle className="w-6 h-6 mx-auto mb-2 text-red-500" />
                <div className="text-xl font-bold">{profileData?.stats?.hard_solved || 0}</div>
                <div className="text-sm text-muted-foreground">Hard</div>
              </Card>
            </div>

            {/* Tabs for detailed info */}
            <Tabs defaultValue="platforms" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="platforms">Platforms</TabsTrigger>
                <TabsTrigger value="badges">Badges</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="platforms" className="space-y-4">
                <div className="grid gap-4">
                  {selectedUser.externalProfiles?.map((profile, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            {profile.platform === 'leetcode' && <Code2 className="w-5 h-5" />}
                            {profile.platform === 'github' && <Github className="w-5 h-5" />}
                            {profile.platform === 'codeforces' && <Code2 className="w-5 h-5" />}
                          </div>
                          <div>
                            <h5 className="font-medium flex items-center gap-2 capitalize">
                              {profile.platform}
                              {profile.isVerified && <CheckCircle className="w-4 h-4 text-blue-500" />}
                            </h5>
                            <p className="text-sm text-muted-foreground">@{profile.username}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          {profile.profileData?.stats && (
                            <>
                              <div className="text-sm">
                                <span className="font-bold">{profile.profileData.stats.total_solved}</span> problems
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Rank: {profile.profileData.profile?.ranking || 'N/A'}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="badges" className="space-y-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {profileData?.badges?.map((badge) => (
                    <Card key={badge.id} className="p-4 text-center">
                      <img src={badge.icon} alt={badge.displayName} className="w-12 h-12 mx-auto mb-2" />
                      <h5 className="font-medium text-sm">{badge.displayName}</h5>
                      <p className="text-xs text-muted-foreground">{new Date(badge.creationDate).toLocaleDateString()}</p>
                    </Card>
                  ))}
                  {(!profileData?.badges || profileData.badges.length === 0) && (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                      No badges earned yet
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <div className="space-y-3">
                  {profileData?.recentActivity?.last7Days?.problems?.map((problem, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">{problem.title}</h5>
                          <p className="text-sm text-muted-foreground">
                            Solved in {problem.language} • {new Date(problem.solvedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" asChild suppressHydrationWarning>
                          <a href={problem.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </Card>
                  ))}
                  {(!profileData?.recentActivity?.last7Days?.problems || profileData.recentActivity.last7Days.problems.length === 0) && (
                    <div className="text-center py-8 text-muted-foreground">
                      No recent activity
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background" suppressHydrationWarning>
      <Header title='Developer Rankings' />

      <div className="w-full mx-auto p-4 lg:p-6 space-y-6">


        {/* Time Period Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">


          <TabsContent value={activeTab} className="space-y-6">
            {/* Loading State */}
            {isLoading && (
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
                      <p className="font-medium">Failed to load rankings</p>
                      <p className="text-sm">{error}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={fetchRankings}
                    suppressHydrationWarning
                  >
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Top 3 Podium */}
            {!isLoading && !error && renderTopPerformers()}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              {/* <TabsList className="grid w-full lg:w-auto grid-cols-3">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList> */}

              {/* Advanced Filters */}
              {!isLoading && !error && (
                <div className="flex justify-between w-full gap-3">
                  <div className="flex flex-wrap gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search developers..."
                        className="pl-10 w-64"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        suppressHydrationWarning
                      />
                    </div>

                    <Button variant="outline" size="default" onClick={handleSearch} suppressHydrationWarning>
                      Search
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Select value={filters.platform ?? "all"} onValueChange={(value) => setPlatform(value === "all" ? "" : value)}>
                      <SelectTrigger className="w-40" suppressHydrationWarning>
                        <SelectValue placeholder="Platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Platforms</SelectItem>
                        <SelectItem value="leetcode">LeetCode</SelectItem>
                        <SelectItem value="codeforces">Codeforces</SelectItem>
                        <SelectItem value="github">GitHub</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filters.country ?? "all"} onValueChange={(value) => setCountry(value === "all" ? "" : value)}>
                      <SelectTrigger className="w-40" suppressHydrationWarning>
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Countries</SelectItem>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="IN">India</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="SG">Singapore</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filters.sortBy ?? "totalScore"} onValueChange={setSortBy}>
                      <SelectTrigger className="w-32" suppressHydrationWarning>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="totalScore">Score</SelectItem>
                        <SelectItem value="totalProblemsSolved">Problems</SelectItem>
                        <SelectItem value="platformsCount">Platforms</SelectItem>
                        <SelectItem value="createdAt">Join Date</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSortOrder(filters.sortOrder === 'asc' ? 'desc' : 'asc')}
                      suppressHydrationWarning
                    >
                      {filters.sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              )}

            </div>

            {/* Rankings Table */}
            {!isLoading && !error && users?.length > 0 && (
              <Card className="professional-shadow">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        Full Rankings
                      </CardTitle>
                      <CardDescription>
                        Showing {users?.length} of {pagination.totalUsers} developers
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Table Header */}
                    <div className="hidden lg:grid grid-cols-8 gap-4 pb-3 border-b border-border text-sm font-medium text-muted-foreground">
                      <div>Rank</div>
                      <div className="col-span-2">Developer</div>
                      <div>Platform</div>
                      <div>Problems</div>
                      <div>Score</div>
                      <div>Status</div>
                      <div>Trend</div>
                    </div>

                    {/* Table Rows */}
                    <div className="space-y-3">
                      {users.map((user, index) => {
                        const rank = ((pagination.currentPage - 1) * 20) + index + 1;
                        return (
                          <div
                            key={user._id}
                            className="grid grid-cols-2 lg:grid-cols-8 gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors border border-border cursor-pointer"
                            onClick={() => { setSelectedUser(user); setShowDetailModal(true); }}
                          >
                            {/* Rank */}
                            <div className="hidden lg:flex items-center gap-2">
                              <span className="font-bold text-lg">#{rank}</span>
                              {rank <= 3 && (
                                <div className="w-6 h-6">
                                  {getPodiumIcon(rank)}
                                </div>
                              )}
                            </div>

                            {/* Developer Info */}
                            <div className="col-span-1 lg:col-span-2">
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <Avatar className="w-10 h-10">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback>
                                      {user.username.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  {/* Mobile rank indicator */}
                                  <div className="lg:hidden absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                    <span className="text-xs font-bold text-primary-foreground">#{rank}</span>
                                  </div>
                                  {user.externalProfiles?.some(p => p.isVerified) && (
                                    <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                                      <CheckCircle className="w-2 h-2" />
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium text-sm lg:text-base">
                                    {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username}
                                  </p>
                                  <p className="text-xs lg:text-sm text-muted-foreground">@{user.username}</p>
                                </div>
                              </div>
                            </div>

                            {/* Platform - Desktop only */}
                            <div className="hidden lg:flex items-center">
                              <div className="flex flex-wrap gap-1">
                                {user.externalProfiles?.slice(0, 2).map((profile, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs capitalize">
                                    {profile.platform}
                                  </Badge>
                                ))}
                                {(user.externalProfiles?.length || 0) > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{(user.externalProfiles?.length || 0) - 2}
                                  </Badge>
                                )}
                              </div>
                            </div>

                            {/* Problems Solved */}
                            <div className="hidden lg:flex items-center">
                              <span className="font-bold">{user.totalProblemsSolved}</span>
                            </div>

                            {/* Score */}
                            <div className="col-span-1 lg:col-span-1">
                              <div className="text-right lg:text-left">
                                <p className="font-bold text-lg">{user.totalScore}</p>
                                <div className="flex items-center gap-1 justify-end lg:justify-start">
                                  <Star className="w-3 h-3 text-yellow-500" />
                                  <span className="text-xs text-muted-foreground">{user.platformsCount} platforms</span>
                                </div>
                              </div>
                            </div>

                            {/* Status - Desktop only */}
                            <div className="hidden lg:flex items-center">
                              {user.isActive ? (
                                <Badge className="bg-green-100 text-green-800 border-green-300 text-xs">
                                  Active
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-xs">
                                  Inactive
                                </Badge>
                              )}
                            </div>

                            {/* Trend - Desktop only */}
                            <div className="hidden lg:flex items-center gap-1">
                              {getTrendIcon(user)}
                              <span className={`text-sm font-medium ${user.previousRank && user.rank < user.previousRank ? 'text-green-600' :
                                user.previousRank && user.rank > user.previousRank ? 'text-red-600' :
                                  'text-muted-foreground'
                                }`}>
                                {getTrendValue(user) === 0 ? '0' :
                                  user.previousRank && user.rank < user.previousRank ? `+${getTrendValue(user)}` :
                                    user.previousRank && user.rank > user.previousRank ? `-${getTrendValue(user)}` : '0'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
                      <div className="text-sm text-muted-foreground">
                        Page {pagination.currentPage} of {pagination.totalPages}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPage(pagination.currentPage - 1)}
                          disabled={!pagination.hasPrev || isLoading}
                          suppressHydrationWarning
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
                          onClick={() => setPage(pagination.currentPage + 1)}
                          disabled={!pagination.hasNext || isLoading}
                          suppressHydrationWarning
                        >
                          Next
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Empty State */}
            {!isLoading && !error && users?.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No developers found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <Button onClick={() => {
                    setSearchInput('');
                    setPlatform('');
                    setCountry('');
                    fetchRankings();
                  }} suppressHydrationWarning>
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Detail Modal */}
        {renderDetailModal()}
      </div>
    </div>
  );
}