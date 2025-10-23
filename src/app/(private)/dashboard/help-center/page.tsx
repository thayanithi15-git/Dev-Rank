'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  HelpCircle,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  FileText,
  Search,
  Filter,
  RefreshCw,
  Eye,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Zap,
  Shield,
  Settings,
  LifeBuoy,
  ArrowLeft,
  Loader2,
  ChevronLeft,
  ChevronDown,
  Tag,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useHelpCenterStore } from '@/store/helpCenter/help';
import Header from '@/components/layout/header';

const categories = [
  {
    value: 'technical',
    label: 'Technical Issue',
    description: 'Problems with features or functionality',
    icon: Settings,
    color: 'bg-blue-500/10 text-blue-600 border-blue-200'
  },
  {
    value: 'bug',
    label: 'Bug Report',
    description: 'Report bugs or errors',
    icon: AlertCircle,
    color: 'bg-red-500/10 text-red-600 border-red-200'
  },
  {
    value: 'account',
    label: 'Account Help',
    description: 'Account, billing, or subscription issues',
    icon: User,
    color: 'bg-purple-500/10 text-purple-600 border-purple-200'
  },
  {
    value: 'feature',
    label: 'Feature Request',
    description: 'Suggest new features or improvements',
    icon: Zap,
    color: 'bg-green-500/10 text-green-600 border-green-200'
  },
  {
    value: 'security',
    label: 'Security',
    description: 'Security concerns or questions',
    icon: Shield,
    color: 'bg-orange-500/10 text-orange-600 border-orange-200'
  },
  {
    value: 'other',
    label: 'Other',
    description: 'General questions or feedback',
    icon: HelpCircle,
    color: 'bg-gray-500/10 text-gray-600 border-gray-200'
  }
];

const priorities = [
  {
    value: 'low',
    label: 'Low Priority',
    color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    description: 'Not urgent, can wait'
  },
  {
    value: 'medium',
    label: 'Medium Priority',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    description: 'Important but not critical'
  },
  {
    value: 'high',
    label: 'High Priority',
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    description: 'Needs attention soon'
  },
  {
    value: 'critical',
    label: 'Critical',
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    description: 'Urgent, blocking work'
  }
];

const statusOptions = [
  { value: 'all', label: 'All Status', icon: FileText },
  { value: 'pending', label: 'Pending', icon: Clock },
  { value: 'in-progress', label: 'In Progress', icon: RefreshCw },
  { value: 'resolved', label: 'Resolved', icon: CheckCircle },
  { value: 'closed', label: 'Closed', icon: AlertCircle }
];

const quickLinks = [
  {
    title: 'Documentation',
    description: 'Browse our comprehensive guides',
    icon: BookOpen,
    href: '#',
    color: 'bg-blue-500/10 text-blue-600'
  },
  {
    title: 'API Reference',
    description: 'Technical API documentation',
    icon: FileText,
    href: '#',
    color: 'bg-purple-500/10 text-purple-600'
  },
  {
    title: 'Community',
    description: 'Join our community forum',
    icon: MessageSquare,
    href: '#',
    color: 'bg-green-500/10 text-green-600'
  },
  {
    title: 'Status Page',
    description: 'Check system status',
    icon: Zap,
    href: '#',
    color: 'bg-orange-500/10 text-orange-600'
  }
];

const faqs = [
  {
    question: 'How do I verify my profile?',
    answer: 'Go to Settings > Profile > Verification and follow the steps to connect your coding platforms.'
  },
  {
    question: 'How long does support response take?',
    answer: 'We typically respond within 24 hours for normal priority requests, and within 4 hours for critical issues.'
  },
  {
    question: 'Can I update my submitted request?',
    answer: 'Yes, you can view your requests and add additional comments or information from the "My Requests" tab.'
  },
  {
    question: 'What information should I include?',
    answer: 'Include detailed steps to reproduce the issue, screenshots if applicable, and any error messages you received.'
  }
];

export default function HelpCenterPage() {
  const [activeTab, setActiveTab] = useState('submit');
  const [showRequestDetails, setShowRequestDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    subject,
    message,
    category,
    priority,
    isSubmitting,
    isLoadingRequests,
    isLoadingDetails,
    helpRequests,
    currentRequest,
    pagination,
    statusFilter,
    setSubject,
    setMessage,
    setCategory,
    setPriority,
    submitHelpRequest,
    fetchHelpRequests,
    fetchHelpRequestDetails,
    setStatusFilter,
    setCurrentPage,
    resetForm
  } = useHelpCenterStore();

  useEffect(() => {
    if (activeTab === 'requests') {
      fetchHelpRequests();
    }
  }, [activeTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitHelpRequest();
    if (success) {
      setActiveTab('requests');
    }
  };

  const handleViewDetails = async (requestId: string) => {
    await fetchHelpRequestDetails(requestId);
    setShowRequestDetails(true);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; icon: any }> = {
      pending: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', icon: Clock },
      'in-progress': { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', icon: RefreshCw },
      resolved: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', icon: CheckCircle },
      closed: { color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200', icon: AlertCircle }
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {status.replace('-', ' ')}
      </Badge>
    );
  };

  const getPriorityBadge = (priorityValue: string) => {
    const priorityObj = priorities.find(p => p.value === priorityValue);
    return (
      <Badge className={priorityObj?.color || 'bg-gray-100 text-gray-800'}>
        {priorityObj?.label || priorityValue}
      </Badge>
    );
  };

  const getCategoryInfo = (categoryValue: string) => {
    return categories.find(c => c.value === categoryValue) || categories[categories.length - 1];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredRequests = helpRequests.filter(request =>
    request.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showRequestDetails && currentRequest) {
    const categoryInfo = getCategoryInfo(currentRequest.category);
    const CategoryIcon = categoryInfo.icon;

    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
            <Button variant="ghost" size="sm" onClick={() => setShowRequestDetails(false)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Requests
            </Button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto p-4 lg:p-6 space-y-6">
          {isLoadingDetails ? (
            <Card className="professional-shadow">
              <CardContent className="p-12 flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Loading request details...</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="professional-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${categoryInfo.color}`}>
                          <CategoryIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <Badge variant="secondary" className="text-xs">
                            #{currentRequest._id.slice(-8)}
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="text-2xl">{currentRequest.subject}</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        {getStatusBadge(currentRequest.status)}
                        {getPriorityBadge(currentRequest.priority)}
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {categoryInfo.label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Description</h4>
                    <p className="text-foreground whitespace-pre-wrap">{currentRequest.message}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Created</p>
                        <p className="text-sm text-muted-foreground">{formatDate(currentRequest.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Last Updated</p>
                        <p className="text-sm text-muted-foreground">{formatDate(currentRequest.updatedAt)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="professional-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Timeline & Updates</CardTitle>
                  <CardDescription>Track the progress of your request</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Request Submitted</p>
                        <p className="text-sm text-muted-foreground">{formatDate(currentRequest.createdAt)}</p>
                        <p className="text-sm text-muted-foreground mt-1">Your request has been received and is in the queue for review.</p>
                      </div>
                    </div>

                    {currentRequest.status !== 'pending' && (
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                          <RefreshCw className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Under Review</p>
                          <p className="text-sm text-muted-foreground">{formatDate(currentRequest.updatedAt)}</p>
                          <p className="text-sm text-muted-foreground mt-1">Our team is currently investigating your request.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">

      <Header title='Help Center' />

      <div className="w-full mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="submit" className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Submit Request
                </TabsTrigger>
                <TabsTrigger value="requests" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  My Requests
                  {helpRequests.length > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {helpRequests.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              {/* Submit Request Tab */}
              <TabsContent value="submit" className="space-y-6 mt-6">
                <Card className="professional-shadow">
                  <CardHeader>
                    <CardTitle>Submit a Help Request</CardTitle>
                    <CardDescription>
                      Fill out the form below and our team will get back to you as soon as possible
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Subject */}
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="Brief description of your issue"
                          className="h-12"
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          Minimum 10 characters
                        </p>
                      </div>

                      {/* Category */}
                      <div className="space-y-3">
                        <Label>Category *</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {categories.map((cat) => (
                            <label key={cat.value} className="cursor-pointer">
                              <input
                                type="radio"
                                name="category"
                                value={cat.value}
                                checked={category === cat.value}
                                onChange={(e) => setCategory(e.target.value)}
                                className="sr-only"
                              />
                              <div className={`
                                p-4 border-2 rounded-lg transition-all duration-200
                                ${category === cat.value
                                  ? 'border-primary bg-primary/5 shadow-md'
                                  : 'border-border hover:border-primary/50'
                                }
                              `}>
                                <div className="flex items-start gap-3">
                                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${cat.color}`}>
                                    <cat.icon className="w-5 h-5" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium text-sm">{cat.label}</h4>
                                    <p className="text-xs text-muted-foreground mt-1">{cat.description}</p>
                                  </div>
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Priority */}
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority Level *</Label>
                        <Select value={priority} onValueChange={setPriority}>
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {priorities.map(p => (
                              <SelectItem key={p.value} value={p.value}>
                                <div className="flex items-center gap-3">
                                  <Badge className={p.color}>
                                    {p.label}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">{p.description}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <Label htmlFor="message">Detailed Description *</Label>
                        <Textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Please provide as much detail as possible about your issue..."
                          rows={8}
                          className="resize-none"
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          Minimum 20 characters. Include steps to reproduce, error messages, or any other relevant information.
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={resetForm}
                          disabled={isSubmitting}
                        >
                          Clear Form
                        </Button>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="professional-gradient text-primary-foreground gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              Submit Request
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* My Requests Tab */}
              <TabsContent value="requests" className="space-y-6 mt-6">
                <Card className="professional-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>My Requests</CardTitle>
                        <CardDescription>
                          View and manage your submitted help requests
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fetchHelpRequests()}
                        disabled={isLoadingRequests}
                      >
                        <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingRequests ? 'animate-spin' : ''}`} />
                        Refresh
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search requests..."
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
                    {isLoadingRequests && (
                      <div className="py-12 flex flex-col items-center justify-center">
                        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                        <p className="text-muted-foreground">Loading your requests...</p>
                      </div>
                    )}

                    {/* Empty State */}
                    {!isLoadingRequests && filteredRequests.length === 0 && (
                      <div className="py-12 text-center">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                          <MessageSquare className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold mb-2">No Requests Found</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                          {searchTerm
                            ? 'No requests match your search criteria'
                            : 'You haven\'t submitted any help requests yet'
                          }
                        </p>
                        <Button onClick={() => setActiveTab('submit')}>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Your First Request
                        </Button>
                      </div>
                    )}

                    {/* Requests List */}
                    {!isLoadingRequests && filteredRequests.length > 0 && (
                      <div className="space-y-4">
                        {filteredRequests.map((request) => {
                          const categoryInfo = getCategoryInfo(request.category);
                          const CategoryIcon = categoryInfo.icon;

                          return (
                            <Card
                              key={request._id}
                              className="hover:shadow-lg transition-all duration-200 cursor-pointer"
                              onClick={() => handleViewDetails(request._id)}
                            >
                              <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${categoryInfo.color} flex-shrink-0`}>
                                    <CategoryIcon className="w-6 h-6" />
                                  </div>

                                  <div className="flex-1 space-y-3">
                                    <div className="flex items-start justify-between gap-4">
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                          <Badge variant="secondary" className="text-xs">
                                            #{request._id.slice(-8)}
                                          </Badge>
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2 leading-tight">
                                          {request.subject}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                          {request.message}
                                        </p>
                                      </div>
                                      <div className="flex flex-col items-end gap-2">
                                        {getStatusBadge(request.status)}
                                        {getPriorityBadge(request.priority)}
                                      </div>
                                    </div>

                                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                                      <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1">
                                          <Calendar className="w-3 h-3" />
                                          {formatDate(request.createdAt)}
                                        </div>
                                        <Badge variant="outline" className="text-xs">
                                          <Tag className="w-3 h-3 mr-1" />
                                          {categoryInfo.label}
                                        </Badge>
                                      </div>
                                      <Button variant="ghost" size="sm" className="h-auto p-0">
                                        <span className="text-xs">View Details</span>
                                        <ChevronRight className="w-3 h-3 ml-1" />
                                      </Button>
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
                            disabled={!pagination.hasPrev || isLoadingRequests}
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(pagination.currentPage + 1)}
                            disabled={!pagination.hasNext || isLoadingRequests}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <Card className="professional-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Quick Links</CardTitle>
                <CardDescription>Popular resources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={index}
                      href={link.href}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${link.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm group-hover:text-primary transition-colors">
                          {link.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{link.description}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </a>
                  );
                })}
              </CardContent>
            </Card>

            {/* Support Info */}
            <Card className="professional-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Need Immediate Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Email Support</p>
                    <p className="text-xs text-muted-foreground">support@devrank.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Phone Support</p>
                    <p className="text-xs text-muted-foreground">Available Mon-Fri 9AM-5PM EST</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Live Chat</p>
                    <p className="text-xs text-muted-foreground">Chat with our team in real-time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="professional-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Expected Response Times</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm">Critical</span>
                  </div>
                  <span className="text-sm font-medium">2-4 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">High</span>
                  </div>
                  <span className="text-sm font-medium">8-12 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Medium</span>
                  </div>
                  <span className="text-sm font-medium">24 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <span className="text-sm">Low</span>
                  </div>
                  <span className="text-sm font-medium">2-3 days</span>
                </div>
              </CardContent>
            </Card>

            {/* FAQs */}
            <Card className="professional-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((faq, index) => (
                  <details key={index} className="group">
                    <summary className="flex items-center justify-between cursor-pointer font-medium text-sm py-2">
                      {faq.question}
                      <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                    </summary>
                    <p className="text-sm text-muted-foreground mt-2 pl-4">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="professional-shadow bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  Pro Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Include screenshots or error messages when reporting bugs</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Provide step-by-step instructions to reproduce issues</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Check our documentation before submitting a request</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Set the correct priority level for faster responses</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}