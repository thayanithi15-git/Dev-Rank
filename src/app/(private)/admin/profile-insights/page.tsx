'use client';

import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  User,
  MapPin,
  Calendar,
  Mail,
  Edit,
  Save,
  X,
  Upload,
  Loader2,
  CheckCircle,
  Shield,
  Clock
} from 'lucide-react';
import { useProfileStore } from '@/store/profile/view';
import Header from '@/components/layout/header';

export default function ProfilePage() {
  const {
    user,
    isLoading,
    isUpdating,
    isEditMode,
    editData,
    isUploadingAvatar,
    fetchProfile,
    updateProfile,
    setEditMode,
    setEditData,
    uploadAvatar,
  } = useProfileStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleAvatarClick = () => {
    if (isEditMode && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadAvatar(file);
    }
  };

  const handleSave = async () => {
    const success = await updateProfile();
    if (success) {
      setEditMode(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-red-500/10 text-red-600 dark:text-red-400';
      case 'recruiter':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
      case 'developer':
        return 'bg-green-500/10 text-green-600 dark:text-green-400';
      default:
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="professional-shadow max-w-md">
          <CardContent className="p-6 text-center">
            <User className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-medium text-lg mb-2">Profile Not Found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Unable to load your profile. Please try again.
            </p>
            <Button onClick={fetchProfile} className="professional-gradient text-primary-foreground">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      
      <Header title='Profile Insights'/>

      <div className="w-full mx-auto p-4 lg:p-6 space-y-6">
        {/* Profile Header Card */}
        <Card className="professional-shadow">
          <div className="relative">
            {/* Banner Background */}
            {/* <div className="h-32 lg:h-48 bg-gradient-to-r from-primary/20 to-accent/20 rounded-t-lg professional-gradient" /> */}

            {/* Profile Content */}
            <div className="relative px-6 pb-6">
              <div className="flex flex-col lg:flex-row gap-6 mt-5">
                {/* Avatar Section */}
                <div className="relative group">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Avatar
                    className={`w-24 h-24 lg:w-32 lg:h-32 border-4 border-background ${isEditMode ? 'cursor-pointer' : ''
                      }`}
                    onClick={handleAvatarClick}
                  >
                    <AvatarImage src={isEditMode ? editData.avatar : user.avatar} />
                    <AvatarFallback className="text-2xl lg:text-3xl bg-primary/10 text-primary">
                      {user.firstName?.[0] || user.username[0].toUpperCase()}
                      {user.lastName?.[0] || ''}
                    </AvatarFallback>
                  </Avatar>

                  {isEditMode && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer w-24 h-24 lg:w-32 lg:h-32">
                      {isUploadingAvatar ? (
                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                      ) : (
                        <Upload className="w-6 h-6 text-white" />
                      )}
                    </div>
                  )}

                  {user.isActive && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-background">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                {/* User Info Section */}
                <div className="flex-1 space-y-4 lg:mt-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      {!isEditMode ? (
                        <>
                          <div>
                            <h1 className="text-2xl lg:text-3xl font-bold">
                              {user.firstName && user.lastName
                                ? `${user.firstName} ${user.lastName}`
                                : user.username}
                            </h1>
                            <p className="text-muted-foreground">@{user.username}</p>
                          </div>

                          {user.bio && (
                            <p className="text-sm text-muted-foreground max-w-2xl">
                              {user.bio}
                            </p>
                          )}
                        </>
                      ) : (
                        <div className="space-y-4 max-w-2xl">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First Name *</Label>
                              <Input
                                id="firstName"
                                value={editData.firstName}
                                onChange={(e) => setEditData({ firstName: e.target.value })}
                                placeholder="Enter first name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name *</Label>
                              <Input
                                id="lastName"
                                value={editData.lastName}
                                onChange={(e) => setEditData({ lastName: e.target.value })}
                                placeholder="Enter last name"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                              id="bio"
                              value={editData.bio}
                              onChange={(e) => setEditData({ bio: e.target.value })}
                              placeholder="Tell us about yourself..."
                              rows={3}
                              className="resize-none"
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Joined {formatDate(user.createdAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Updated {formatDate(user.updatedAt)}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={getRoleBadgeColor(user.role)}>
                          <Shield className="w-3 h-3 mr-1" />
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                        {user.isActive && (
                          <Badge className="bg-green-500/10 text-green-600 dark:text-green-400">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Active
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {!isEditMode ? (
                        <Button
                          onClick={() => setEditMode(true)}
                          className="professional-gradient text-primary-foreground"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Button>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            onClick={handleCancel}
                            disabled={isUpdating}
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                          <Button
                            onClick={handleSave}
                            disabled={isUpdating}
                            className="professional-gradient text-primary-foreground"
                          >
                            {isUpdating ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                              </>
                            )}
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Information */}
          <Card className="professional-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">User ID</span>
                  <span className="text-sm font-mono">{user._id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Username</span>
                  <span className="text-sm">@{user.username}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Email</span>
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Role</span>
                  <Badge className={getRoleBadgeColor(user.role)}>
                    {user.role}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Status</span>
                  <Badge className={user.isActive ? "bg-green-500/10 text-green-600" : "bg-gray-500/10 text-gray-600"}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* External Profiles */}
          <Card className="professional-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                External Profiles
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user.externalProfiles && user.externalProfiles.length > 0 ? (
                <div className="space-y-2">
                  {user.externalProfiles.map((profile, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <p className="text-sm font-medium">
                        Connected Profile {index + 1}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {typeof profile === 'string' ? profile : profile._id}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MapPin className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                  <p className="text-sm text-muted-foreground">
                    No external profiles connected
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Activity Timeline */}
        <Card className="professional-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Activity Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Account Created</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(user.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Edit className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Last Updated</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(user.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}