'use client';

import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Users,
  UserCheck,
  UserCog,
  UserX,
  Shield,
  CheckCircle2,
  Clock,
  AlertCircle,
  LifeBuoy,
  TrendingUp,
  Activity,
  RefreshCw,
  Calendar,
  Mail,
  AlertTriangle,
} from 'lucide-react';
import Header from '@/components/layout/header';
import { useAdminDashboardStore } from '@/store/dashboard/adminDashboard';
import { formatDistanceToNow } from 'date-fns';
import { AnimatePresence } from 'framer-motion';
import { Toast } from '@/utils/toast/toast';
import { useToastStore } from '@/utils/toast/store';

export default function AdminDashboard() {
  const {
    stats,
    recentActivity,
    isLoading,
    error,
    lastFetched,
    fetchDashboardStats,
    refreshStats,
  } = useAdminDashboardStore();

  const { toast, hideToast } = useToastStore();

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  const formatTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return 'Recently';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'low':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'resolved'
      ? 'bg-green-500/10 text-green-600 border-green-500/20'
      : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            description={toast.description}
            type={toast.type}
            onClose={hideToast}
          />
        )}
      </AnimatePresence>

      <Header />

      <main className="p-4 lg:p-6 py-6 space-y-6 w-full mx-auto">

        {/* Error State */}
        {error && (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <div>
                  <p className="font-semibold text-destructive">Error Loading Dashboard</p>
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Users Card */}
          <Card className="professional-shadow hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-3 w-32" />
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                    <p className="text-3xl font-bold text-primary mt-1">
                      {stats?.users.total || 0}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-xs">
                      <div className="flex items-center gap-1">
                        <UserCheck className="w-3 h-3 text-green-600" />
                        <span className="text-muted-foreground">
                          {stats?.users.active || 0} active
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UserX className="w-3 h-3 text-red-600" />
                        <span className="text-muted-foreground">
                          {stats?.users.inactive || 0} inactive
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Admin Users Card */}
          <Card className="professional-shadow hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-16" />
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Admin Users</p>
                    <p className="text-3xl font-bold text-foreground mt-1">
                      {stats?.users.admins || 0}
                    </p>
                    <p className="text-xs text-blue-600 flex items-center gap-1 mt-3">
                      <Shield className="w-3 h-3" />
                      Platform moderators
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                    <UserCog className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Verified Profiles Card */}
          <Card className="professional-shadow hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-16" />
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Profiles</p>
                    <p className="text-3xl font-bold text-foreground mt-1">
                      {stats?.profiles.total || 0}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-xs">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                        <span className="text-muted-foreground">
                          {stats?.profiles.verified || 0} verified
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-yellow-600" />
                        <span className="text-muted-foreground">
                          {stats?.profiles.unverified || 0} pending
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Help Requests Card */}
          <Card className="professional-shadow hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-16" />
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Help Requests</p>
                    <p className="text-3xl font-bold text-foreground mt-1">
                      {stats?.helpRequests.total || 0}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-xs">
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-yellow-600" />
                        <span className="text-muted-foreground">
                          {stats?.helpRequests.pending || 0} pending
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-600" />
                        <span className="text-muted-foreground">
                          {stats?.helpRequests.resolved || 0} resolved
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                    <LifeBuoy className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Users - Takes 2 columns */}
          <div className="lg:col-span-2">
            <Card className="professional-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Recent Users
                </CardTitle>
                <CardDescription>
                  Recently registered users on the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="w-12 h-12 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                    </div>
                  ))
                ) : recentActivity?.users && recentActivity.users.length > 0 ? (
                  recentActivity.users.map((user) => (
                    <div
                      key={user._id}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12 border-2 border-primary/20">
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {user.username.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-foreground">
                            {user.username}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Mail className="w-3 h-3 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-1">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatTime(user.createdAt)}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">No recent users</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Help Requests - Takes 1 column */}
          <div>
            <Card className="professional-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LifeBuoy className="w-5 h-5 text-purple-600" />
                  Help Requests
                </CardTitle>
                <CardDescription>
                  Recent support requests from users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full" />
                  ))
                ) : recentActivity?.helpRequests &&
                  recentActivity.helpRequests.length > 0 ? (
                  recentActivity.helpRequests.map((request) => (
                    <div
                      key={request._id}
                      className="p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={getPriorityColor(request.priority)}>
                          {request.priority}
                        </Badge>
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                      <p className="font-medium text-sm text-foreground line-clamp-2 mb-2">
                        {request.subject}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          By @{request.userId.username}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatTime(request.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <LifeBuoy className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground text-sm">
                      No help requests
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats Summary */}
            <Card className="professional-shadow mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="w-5 h-5 text-primary" />
                  Platform Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))
                ) : (
                  <>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">Active Rate</span>
                      </div>
                      <span className="text-sm font-bold">
                        {stats?.users.total
                          ? Math.round(
                              (stats.users.active / stats.users.total) * 100
                            )
                          : 0}
                        %
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">Verified Profiles</span>
                      </div>
                      <span className="text-sm font-bold">
                        {stats?.profiles.total
                          ? Math.round(
                              (stats.profiles.verified / stats.profiles.total) *
                                100
                            )
                          : 0}
                        %
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium">Pending Requests</span>
                      </div>
                      <span className="text-sm font-bold">
                        {stats?.helpRequests.pending || 0}
                      </span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}