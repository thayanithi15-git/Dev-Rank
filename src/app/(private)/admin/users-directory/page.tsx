'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Users,
  Search,
  Filter,
  UserCheck,
  UserX,
  Shield,
  ShieldAlert,
  Mail,
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  UserCog,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { useUserDirectoryStore, User } from '@/store/userDirectory/user';
import Header from '@/components/layout/header';

// User Card Component
const UserCard = ({ user, onViewDetails, onToggleStatus, onChangeRole, onDelete }: {
  user: User;
  onViewDetails: (user: User) => void;
  onToggleStatus: (userId: string, isActive: boolean) => void;
  onChangeRole: (userId: string, role: 'user' | 'admin') => void;
  onDelete: (userId: string) => void;
}) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <Card className="professional-shadow hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16 border-2 border-border">
            <AvatarImage src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">
              {user.firstName?.[0]}{user.lastName?.[0] || user.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg text-foreground">
                    {user.firstName && user.lastName 
                      ? `${user.firstName} ${user.lastName}` 
                      : user.username}
                  </h3>
                  {user.role === 'admin' && (
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      <Shield className="w-3 h-3 mr-1" />
                      Admin
                    </Badge>
                  )}
                  <Badge className={user.isActive 
                    ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-800' 
                    : 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-950 dark:text-gray-200 dark:border-gray-800'
                  }>
                    {user.isActive ? <UserCheck className="w-3 h-3 mr-1" /> : <UserX className="w-3 h-3 mr-1" />}
                    {user.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">@{user.username}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Mail className="w-3 h-3" />
                  {user.email}
                </div>
                {user.bio && (
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{user.bio}</p>
                )}
              </div>

              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowActions(!showActions)}
                  className="h-8 w-8 p-0"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
                
                {showActions && (
                  <div className="absolute right-0 top-10 w-48 bg-card border border-border rounded-lg shadow-lg z-10">
                    <div className="p-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => {
                          onViewDetails(user);
                          setShowActions(false);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => {
                          onToggleStatus(user._id, !user.isActive);
                          setShowActions(false);
                        }}
                      >
                        {user.isActive ? <UserX className="w-4 h-4 mr-2" /> : <UserCheck className="w-4 h-4 mr-2" />}
                        {user.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => {
                          onChangeRole(user._id, user.role === 'admin' ? 'user' : 'admin');
                          setShowActions(false);
                        }}
                      >
                        <UserCog className="w-4 h-4 mr-2" />
                        Make {user.role === 'admin' ? 'User' : 'Admin'}
                      </Button>
                      <div className="border-t border-border my-1" />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete ${user.username}?`)) {
                            onDelete(user._id);
                            setShowActions(false);
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete User
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </div>
              {user.externalProfiles && user.externalProfiles.length > 0 && (
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  {user.externalProfiles.length} linked profiles
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// User Details Modal
const UserDetailsModal = ({ user, onClose }: { user: User; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto ">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              User Details
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <XCircle className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-24 h-24 border-4 border-border">
              <AvatarImage src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
                {user.firstName?.[0]}{user.lastName?.[0] || user.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground mb-1">
                {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username}
              </h3>
              <p className="text-muted-foreground mb-2">@{user.username}</p>
              <div className="flex gap-2">
                <Badge className={user.isActive 
                  ? 'bg-green-100 text-green-800 border-green-200' 
                  : 'bg-gray-100 text-gray-800 border-gray-200'
                }>
                  {user.isActive ? 'Active' : 'Inactive'}
                </Badge>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  {user.role === 'admin' ? 'Administrator' : 'User'}
                </Badge>
              </div>
            </div>
          </div>

          {user.bio && (
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Bio</h4>
              <p className="text-foreground">{user.bio}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Email</h4>
              <p className="text-foreground">{user.email}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">User ID</h4>
              <p className="text-foreground font-mono text-sm">{user._id}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Created At</h4>
              <p className="text-foreground">{new Date(user.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Last Updated</h4>
              <p className="text-foreground">{new Date(user.updatedAt).toLocaleString()}</p>
            </div>
          </div>

          {user.externalProfiles && user.externalProfiles.length > 0 && (
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">External Profiles</h4>
              <div className="flex flex-wrap gap-2">
                {user.externalProfiles.map((profile, index) => (
                  <Badge key={index} variant="secondary" className="font-mono text-xs">
                    {profile}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Main User Directory Component
export default function UserDirectoryPage() {
  const {
    users,
    selectedUser,
    pagination,
    isLoading,
    filters,
    fetchUsers,
    fetchUserById,
    updateUserStatus,
    updateUserRole,
    deleteUser,
    setPage,
    setSearch,
    setRoleFilter,
    clearSelectedUser
  } = useUserDirectoryStore();

  const [searchInput, setSearchInput] = useState('');
  const [viewingUser, setViewingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (value: string) => {
    setSearchInput(value);
    const timeoutId = setTimeout(() => {
      setSearch(value);
    }, 500);
    return () => clearTimeout(timeoutId);
  };

  const handleViewDetails = (user: User) => {
    setViewingUser(user);
    fetchUserById(user._id);
  };

  return (
    <div className="min-h-screen bg-background">
      

        
      <Header title='Users Directory' />
        {viewingUser && <UserDetailsModal user={viewingUser} onClose={() => setViewingUser(null)} />}

      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Stats */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="professional-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Total Users</span>
                    </div>
                    <span className="font-bold text-lg">{pagination?.totalUsers || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">Active</span>
                    </div>
                    <span className="font-bold text-green-600">
                      {users.filter(u => u.isActive).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UserX className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-muted-foreground">Inactive</span>
                    </div>
                    <span className="font-bold text-gray-600">
                      {users.filter(u => !u.isActive).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Admins</span>
                    </div>
                    <span className="font-bold text-primary">
                      {users.filter(u => u.role === 'admin').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filters Card */}
            <Card className="professional-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role-filter">Role</Label>
                  {/* <Select value={filters.role} onValueChange={setRoleFilter}>
                    <SelectTrigger id="role-filter">
                      <SelectValue placeholder="All Roles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Roles</SelectItem>
                      <SelectItem value="user">Users</SelectItem>
                      <SelectItem value="admin">Admins</SelectItem>
                    </SelectContent>
                  </Select> */}
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setRoleFilter('');
                    setSearchInput('');
                    setSearch('');
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="professional-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <UserCog className="w-4 h-4 mr-2" />
                  Bulk Actions
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <ShieldAlert className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Controls */}
            <Card className="professional-shadow">
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by username, email, or name..."
                      className="pl-10"
                      value={searchInput}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={filters.limit.toString()} onValueChange={(value) => setPage(1)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 per page</SelectItem>
                        <SelectItem value="10">10 per page</SelectItem>
                        <SelectItem value="20">20 per page</SelectItem>
                        <SelectItem value="50">50 per page</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loading State */}
            {isLoading && (
              <Card className="professional-shadow">
                <CardContent className="p-12 text-center">
                  <RefreshCw className="w-8 h-8 text-primary mx-auto mb-4 animate-spin" />
                  <p className="text-muted-foreground">Loading users...</p>
                </CardContent>
              </Card>
            )}

            {/* Empty State */}
            {!isLoading && users.length === 0 && (
              <Card className="professional-shadow">
                <CardContent className="p-12 text-center">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-bold mb-2">No Users Found</h3>
                  <p className="text-muted-foreground">
                    {filters.search || filters.role 
                      ? "Try adjusting your filters or search terms" 
                      : "There are no users in the system yet"}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* User Cards */}
            {!isLoading && users.length > 0 && (
              <div className="space-y-4">
                {users.map((user) => (
                  <UserCard
                    key={user._id}
                    user={user}
                    onViewDetails={handleViewDetails}
                    onToggleStatus={updateUserStatus}
                    onChangeRole={updateUserRole}
                    onDelete={deleteUser}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <Card className="professional-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Page {pagination.currentPage} of {pagination.totalPages}
                      <span className="ml-2">
                        ({pagination.totalUsers} total users)
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={!pagination.hasPrev}
                        onClick={() => setPage(parseInt(pagination.currentPage) - 1)}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={!pagination.hasNext}
                        onClick={() => setPage(parseInt(pagination.currentPage) + 1)}
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}