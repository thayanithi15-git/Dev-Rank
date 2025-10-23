'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { PanelLeftIcon, Bell, Moon, Sun } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useSidebarStore } from '@/store/layoutStore';
import { useThemeStore } from '@/store/layoutStore';
import { cn } from '@/lib/utils';
import { useDashboardStore } from '@/store/dashboard/dashboard';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';

type HeaderProps = {
    title?: string;
    subtitle?: string;
    username?: string;
    desc?: string;
    avatar?: string;
};

const Header: React.FC<HeaderProps> = ({
    title = 'Dashboard',
    subtitle = 'Learner Portal',
    username = 'User Name',
    desc = 'NSQF Level 4',
    avatar = 'U',
}) => {
    const { isOpen, toggleSidebar } = useSidebarStore();
    const { isDark, toggleTheme } = useThemeStore();
    const [ role, setRole ] = useState('user');

    const [sessionData, setSessionData] = useState<any>(null);
    const {
        dashboardData,
        platforms,
        externalProfiles,
        isDashboardLoading,
        isPlatformsLoading,
        isProfilesLoading,
        fetchDashboardStats,
    } = useDashboardStore();

    useEffect(() => {
        fetchDashboardStats();
    }, [fetchDashboardStats]);

    // ✅ Load session from localStorage
    useEffect(() => {
        const savedSession = localStorage.getItem("credxUser");
        if (savedSession) {
            setSessionData(JSON.parse(savedSession));
        } else {
            // router.push("/");
        }
    }, []);

    const sections =
        sessionData?.role?.toLowerCase();

    const getUserInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        if (role) {
            setRole(role);
        }
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
            <div className="container flex h-16 items-center justify-between px-4">
                {/* Left Section */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleSidebar}
                        aria-label="Toggle sidebar"
                        className="cursor-pointer"
                    >
                        <PanelLeftIcon className="h-10 w-10" />
                    </Button>

                    <div>
                        <span className="text-xl font-bold text-primary">{title}</span>
                        <div className="text-xs text-muted-foreground">{role=='user' ? 'Learner Portal' : 'Recruiter Portal'}</div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive"></span>
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleTheme}
                        className="h-9 w-9 p-0 cursor-pointer"
                        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {isDark ? (
                            <Sun className="h-4 w-4 transition-all" />
                        ) : (
                            <Moon className="h-4 w-4 transition-all" />
                        )}
                    </Button>

                    <Separator orientation="vertical" className="h-8" />

                    <div className="flex items-center gap-3">
                        <div className="hidden text-right sm:block">
                            <div className="text-sm font-semibold">{dashboardData.user?.firstName} {dashboardData.user?.lastName}</div>
                            {/* <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div
                                            className="text-xs text-muted-foreground max-w-[130px] truncate cursor-default"
                                        >
                                            {dashboardData.user?.bio}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="max-w-xs">
                                        {dashboardData.user?.bio}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider> */}
                            <p className="text-muted-foreground text-xs">@{dashboardData.user?.username}</p>
                        </div>
                        <Avatar className="w-11 h-11 border-2 border-primary/20">
                            <AvatarImage src={dashboardData.user?.avatar} />
                            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                                {dashboardData.user?.firstName?.[0]}{dashboardData.user?.lastName?.[0]}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
