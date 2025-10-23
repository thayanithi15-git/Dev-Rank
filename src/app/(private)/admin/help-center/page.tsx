// pages/admin/help-center.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  LifeBuoy,
  Search,
  RefreshCw,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  User,
  Zap,
  Shield,
  HelpCircle,
  Calendar,
  Mail,
  Send,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Tag,
  MessageSquare,
  Trash2,
  Eye,
  XCircle,
  Activity,
} from 'lucide-react';
import { useAdminHelpCenterStore } from '@/store/helpCenter/adminHelpcenter';
import Header from '@/components/layout/header';

const categories = {
  technical: { label: 'Technical Issue', icon: Settings, color: 'bg-blue-500/10 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800' },
  bug: { label: 'Bug Report', icon: AlertCircle, color: 'bg-red-500/10 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800' },
  account: { label: 'Account Help', icon: User, color: 'bg-purple-500/10 text-purple-600 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800' },
  feature: { label: 'Feature Request', icon: Zap, color: 'bg-green-500/10 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' },
  security: { label: 'Security', icon: Shield, color: 'bg-orange-500/10 text-orange-600 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800' },
  other: { label: 'Other', icon: HelpCircle, color: 'bg-gray-500/10 text-gray-600 border-gray-200 dark:bg-gray-800/20 dark:text-gray-400 dark:border-gray-700' },
};

const statusOptions = [
  { value: 'all', label: 'All Status', icon: Activity },
  { value: 'pending', label: 'Pending', icon: Clock },
  { value: 'in-progress', label: 'In Progress', icon: RefreshCw },
  { value: 'resolved', label: 'Resolved', icon: CheckCircle },
  { value: 'closed', label: 'Closed', icon: XCircle },
];

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  resolved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  closed: 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300',
};

const priorityColors: Record<string, string> = {
  low: 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300',
  medium: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  high: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  critical: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
};

export default function AdminHelpCenterPage() {
  const {
    helpRequests,
    currentRequest,
    pagination,
    isLoading,
    isLoadingDetails,
    isSubmittingReply,
    isUpdatingStatus,
    isDeleting,
    statusFilter,
    searchTerm,
    adminResponse,
    newStatus,
    fetchAllHelpRequests,
    fetchHelpRequestDetails,
    replyToHelpRequest,
    updateHelpRequestStatus,
    deleteHelpRequest,
    setStatusFilter,
    setCurrentPage,
    setSearchTerm,
    setAdminResponse,
    setNewStatus,
    resetReplyForm,
  } = useAdminHelpCenterStore();

  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showReplyDialog, setShowReplyDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchAllHelpRequests();
  }, [fetchAllHelpRequests]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleViewDetails = async (requestId: string) => {
    await fetchHelpRequestDetails(requestId);
    setShowDetailsDialog(true);
  };

  const handleReply = async (requestId: string) => {
    await fetchHelpRequestDetails(requestId);
    setShowReplyDialog(true);
  };

  const handleSubmitReply = async () => {
    if (!currentRequest) return;

    const success = await replyToHelpRequest(currentRequest._id);
    if (success) {
      setShowReplyDialog(false);
      setShowDetailsDialog(false);
      resetReplyForm();
    }
  };

  const handleStatusUpdate = async (requestId: string, status: string) => {
    const success = await updateHelpRequestStatus(requestId, status);
    if (success && showDetailsDialog) {
      await fetchHelpRequestDetails(requestId);
    }
  };

  const handleDeleteClick = (requestId: string) => {
    setRequestToDelete(requestId);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!requestToDelete) return;

    const success = await deleteHelpRequest(requestToDelete);
    if (success) {
      setShowDeleteDialog(false);
      setShowDetailsDialog(false);
      setRequestToDelete(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = statusOptions.find(s => s.value === status);
    const Icon = statusConfig?.icon || Clock;

    return (
      <Badge className={`${statusColors[status] || statusColors.pending} flex items-center gap-1 font-medium`}>
        <Icon className="w-3 h-3" />
        {status.replace('-', ' ')}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    return (
      <Badge variant="outline" className={`${priorityColors[priority] || priorityColors.low} font-medium`}>
        {priority.toUpperCase()}
      </Badge>
    );
  };

  const getCategoryInfo = (categoryValue: string) => {
    return categories[categoryValue as keyof typeof categories] || categories.other;
  };

  const filteredRequests = helpRequests.filter(request =>
    request.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.userId.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.userId.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats
  const stats = {
    total: helpRequests.length,
    pending: helpRequests.filter(r => r.status === 'pending').length,
    inProgress: helpRequests.filter(r => r.status === 'in-progress').length,
    resolved: helpRequests.filter(r => r.status === 'resolved').length,
  };

  return (
    <div className="min-h-screen bg-background">

      <Header title='Help Center' />

      <main className="container mx-auto p-4 lg:p-8 py-6 space-y-6">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="professional-shadow border-border hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Requests</p>
                  <p className="text-3xl font-bold text-foreground">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="professional-shadow border-border hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-500">{stats.pending}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="professional-shadow border-border hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">In Progress</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-500">{stats.inProgress}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="professional-shadow border-border hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Resolved</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-500">{stats.resolved}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="professional-shadow border-border">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <CardTitle className="text-2xl">All Help Requests</CardTitle>
                <CardDescription className="mt-1">
                  View, respond, and manage user support requests
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search requests, users, or emails..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(option => {
                    const Icon = option.icon;
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="py-12 flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Loading help requests...</p>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && filteredRequests.length === 0 && (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">No Requests Found</h3>
                <p className="text-sm text-muted-foreground">
                  {searchTerm
                    ? 'No requests match your search criteria'
                    : 'No help requests available'
                  }
                </p>
              </div>
            )}

            {/* Requests List */}
            {!isLoading && filteredRequests.length > 0 && (
              <div className="space-y-4">
                {filteredRequests.map((request) => {
                  const categoryInfo = getCategoryInfo(request.category);
                  const CategoryIcon = categoryInfo.icon;

                  return (
                    <Card
                      key={request._id}
                      className="border-border hover:shadow-md transition-all duration-200 hover:border-primary/30"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${categoryInfo.color} flex-shrink-0 border`}>
                            <CategoryIcon className="w-6 h-6" />
                          </div>

                          <div className="flex-1 space-y-3 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <Badge variant="secondary" className="text-xs font-mono">
                                    #{request._id.slice(-8)}
                                  </Badge>
                                  {getStatusBadge(request.status)}
                                  {getPriorityBadge(request.priority)}
                                </div>

                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleViewDetails(request._id)}
                                    className="gap-1"
                                  >
                                    <Eye className="w-4 h-4" />
                                    View
                                  </Button>
                                  <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => handleReply(request._id)}
                                    disabled={request.status === 'closed' || request.status === 'resolved'}
                                    className="gap-1"
                                  >
                                    <Send className="w-4 h-4" />
                                    Reply
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteClick(request._id)}
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  Showing page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalRequests} total)
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(pagination.currentPage - 1)}
                    disabled={!pagination.hasPrev}
                    className="gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(pagination.currentPage + 1)}
                    disabled={!pagination.hasNext}
                    className="gap-1"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* View Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-primary" />
              Request Details
            </DialogTitle>
            <DialogDescription>
              View complete details of the help request
            </DialogDescription>
          </DialogHeader>

          {isLoadingDetails ? (
            <div className="py-8 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : currentRequest ? (
            <div className="space-y-6">
              {/* Request Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="font-mono">
                    #{currentRequest._id}
                  </Badge>
                  {getStatusBadge(currentRequest.status)}
                  {getPriorityBadge(currentRequest.priority)}
                </div>

                <div>
                  <h3 className="font-semibold text-xl mb-2">{currentRequest.subject}</h3>
                  <p className="text-muted-foreground">{currentRequest.message}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <Label className="text-xs text-muted-foreground">User</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {currentRequest.userId?.username?.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">@{currentRequest.userId.username}</p>
                        <p className="text-xs text-muted-foreground">{currentRequest.userId.email}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">Category</Label>
                    <div className="mt-1">
                      <Badge variant="outline" className={getCategoryInfo(currentRequest.category).color}>
                        {getCategoryInfo(currentRequest.category).label}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">Created</Label>
                    <p className="text-sm font-medium mt-1">{formatDate(currentRequest.createdAt)}</p>
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground">Last Updated</Label>
                    <p className="text-sm font-medium mt-1">{formatDate(currentRequest.updatedAt)}</p>
                  </div>
                </div>

                {/* Admin Response */}
                {currentRequest.adminResponse && (
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <Label className="text-sm font-semibold text-primary mb-2 block">Admin Response</Label>
                    <p className="text-sm text-foreground">{currentRequest.adminResponse}</p>
                    {currentRequest.respondedAt && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Responded on {formatDate(currentRequest.respondedAt)}
                      </p>
                    )}
                  </div>
                )}

                {/* Status Update */}
                {/* <div className="space-y-3">
                  <Label className="text-sm font-semibold">Update Status</Label>
                  <div className="flex items-center gap-3">
                    <Select
                      value={currentRequest.status}
                      onValueChange={(value) => handleStatusUpdate(currentRequest._id, value)}
                      disabled={isUpdatingStatus}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.filter(s => s.value !== 'all').map(option => {
                          const Icon = option.icon;
                          return (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                <Icon className="w-4 h-4" />
                                {option.label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    {isUpdatingStatus && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
                  </div>
                </div> */}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <Button
                  variant="default"
                  onClick={() => {
                    setShowDetailsDialog(false);
                    setShowReplyDialog(true);
                  }}
                  disabled={currentRequest.status === 'closed' || currentRequest.status === 'resolved'}
                  className="gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Reply
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setShowDetailsDialog(false);
                    handleDeleteClick(currentRequest._id);
                  }}
                  className="gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Request
                </Button>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={showReplyDialog} onOpenChange={setShowReplyDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Send className="w-6 h-6 text-primary" />
              Send Reply
            </DialogTitle>
            <DialogDescription>
              Respond to the user's help request
            </DialogDescription>
          </DialogHeader>

          {currentRequest && (
            <div className="space-y-4">
              {/* Request Summary */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-semibold mb-1">{currentRequest.subject}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{currentRequest.message}</p>
              </div>

              {/* Response Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-response">Your Response *</Label>
                  <Textarea
                    id="admin-response"
                    placeholder="Enter your response to the user (minimum 10 characters)..."
                    value={adminResponse}
                    onChange={(e) => setAdminResponse(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    {adminResponse.length} characters {adminResponse.length < 10 && `(${10 - adminResponse.length} more required)`}
                  </p>
                </div>

                {/* <div className="space-y-2">
                  <Label htmlFor="new-status">Update Status (Optional)</Label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger id="new-status">
                      <SelectValue placeholder="Keep current status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Keep current status</SelectItem>
                      {statusOptions.filter(s => s.value !== 'all').map(option => {
                        const Icon = option.icon;
                        return (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4" />
                              {option.label}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div> */}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowReplyDialog(false);
                resetReplyForm();
              }}
              disabled={isSubmittingReply}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitReply}
              disabled={isSubmittingReply || adminResponse.length < 10}
              className="gap-2"
            >
              {isSubmittingReply ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Reply
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              Delete Help Request
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this help request? This action cannot be undone and the user will not be notified.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                'Delete Request'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}