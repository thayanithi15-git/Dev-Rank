'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    Award,
    BookOpen,
    Users,
    Shield,
    TrendingUp,
    Settings,
    LayoutDashboard,
    Bell,
    Activity,
    Briefcase,
    HelpCircle,
    GraduationCap,
    Target,
    FileText,
    BarChart3,
    UserPlus,
    Search,
    Star,
    Download,
    Share2,
    MessageSquare,
    Building,
    Zap,
    CheckCircle,
    Globe,
    Eye,
    Plus,
    NotepadTextDashed,
    UserCheck,
    Edit3,
    HighlighterIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useSidebarStore } from '@/store/layoutStore';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useAuthStore } from '@/store/auth/me';
import { useToastStore } from '@/utils/toast/store';
import { AnimatePresence } from 'framer-motion';
import { Toast } from '@/utils/toast/toast';
import { useDashboardStore } from '@/store/dashboard/dashboard';

interface SidebarItem {
    icon: React.ElementType;
    label: string;
    href: string;
    badge?: string;
    description?: string;
}

interface SidebarSection {
    title: string;
    items: SidebarItem[];
}

/* ---------------- User/Learner Sidebar ---------------- */
const userSections: SidebarSection[] = [
    {
        title: "Insights",
        items: [
            {
                icon: LayoutDashboard,
                label: "Dashboard",
                href: "/dashboard",
                description: "Your learning insights and stats",
            },
            {
                icon: BarChart3,
                label: "Rank Analysis",
                href: "/dashboard/rank-analysis",
                description: "Badges, certificates, and milestones",
            },
            {
                icon: UserCheck,
                label: "Profile Insights",
                href: "/dashboard/profile-insights",
                description: "Badges, certificates, and milestones",
            },
        ],
    },
    {
        title: "Developer Tools",
        items: [
            {
                icon: Edit3,
                label: "Profile Builder",
                href: "/dashboard/profile-builder",
                description: "Courses ongoing",
            },
            {
                icon: FileText,
                label: "External Profiles",
                href: "/dashboard/external-profiles",
                description: "Browse and enroll in new courses",
            },
        ],
    },
    {
        title: "Support & Settings",
        items: [
            {
                icon: Settings,
                label: "Account Settings",
                href: "/dashboard/settings",
                description: "Share your verified profile",
            },
            {
                icon: HelpCircle,
                label: "Help Center",
                href: "/dashboard/help-center",
                description: "Manage account preferences",
            },
        ],
    },
];

/* ---------------- Recruiter Sidebar ---------------- */
const recruiterSections: SidebarSection[] = [
    {
        title: "Overview",
        items: [
            {
                icon: LayoutDashboard,
                label: "Dashboard",
                href: "/admin",
                description: "Hiring metrics and trends",
            },
            {
                icon: BarChart3,
                label: "Rank Analysis",
                href: "/admin/rank-analysis",
                description: "Badges, certificates, and milestones",
            },
        ],
    },
    {
        title: "Talent Search",
        items: [
            {
                icon: Users,
                label: "Users Directory",
                href: "/admin/users-directory",
                description: "Browse all verified profiles",
            },
        ],
    },
    // {
    //     title: "Company & Tools",
    //     items: [
    //         {
    //             icon: Building,
    //             label: "Company Profile",
    //             href: "/admin/company",
    //             description: "Manage company information",
    //         },
    //         {
    //             icon: Plus,
    //             label: "Post New Job",
    //             href: "/admin/jobs",
    //             description: "Create job listing",
    //         },
    //     ],
    // },
    {
        title: "Support",
        items: [
            {
                icon: HelpCircle,
                label: "Help Center",
                href: "/admin/help-center",
                description: "FAQs and support",
            },
        ],
    },
];

const Sidebar: React.FC = () => {
    const { isOpen } = useSidebarStore();
    const pathname = usePathname();
    const router = useRouter();
    const { logout, fetchMe, checkAuth, user } = useAuthStore();

    const [sessionData, setSessionData] = useState<any>(null);

    const { showToast, toast, hideToast } = useToastStore();

    const unauthorized = () => {
        showToast("Logging Out", "Unauthorized Access.", "error");
        router.push("/");
        return false;
    }

    const {
        dashboardData,
        platforms,
        externalProfiles,
        isDashboardLoading,
        isPlatformsLoading,
        isProfilesLoading,
        fetchDashboardStats,
    } = useDashboardStore();

    // ✅ Load session from localStorage
    useEffect(() => {
        const savedSession = localStorage.getItem("token");
        if (!savedSession) {
            unauthorized();
        }
    }, []);

    useEffect(() => {
        fetchDashboardStats();
        checkAuth();
        fetchMe();
    }, [checkAuth, fetchMe]);

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    // ✅ Decide sidebar sections based on role
    const sections =
        user?.role?.toLowerCase() === "recruiter" || user?.role?.toLowerCase() === "admin"
            ? recruiterSections
            : userSections;

    const SidebarButton: React.FC<{
        item: SidebarItem;
        isActive: boolean;
    }> = ({ item, isActive }) => {
        const content = (
            <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                    "w-full justify-start gap-2 h-10 my-1 transition-all duration-200 hover:bg-primary/15 hover:text-primary",
                    isActive && "bg-primary/10 text-primary",
                    !isOpen && "justify-center px-0"
                )}
                asChild
            >
                <Link href={item.href}>
                    <div className={` ${isOpen ? '' : 'justify-center'} flex items-center gap-2 w-full `}>
                        {React.createElement(item.icon, {
                            className: cn("h-5 w-5 flex-shrink-0", isActive && "text-primary"),
                        })}
                        {isOpen && <span className="truncate flex-1">{item.label}</span>}
                        {isOpen && item.badge && (
                            <Badge variant="secondary" className="ml-auto bg-primary/20 text-primary text-xs">
                                {item.badge}
                            </Badge>
                        )}
                    </div>
                </Link>
            </Button>
        );

        if (!isOpen && item.description) {
            return (
                <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>{content}</TooltipTrigger>
                    <TooltipContent side="right" className="ml-2">
                        <p className="font-medium text-[14px]">{item.label}</p>
                        <p className="text-[10px]">{item.description}</p>
                    </TooltipContent>
                </Tooltip>
            );
        }

        return content;
    };

    const getUserInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <TooltipProvider>
            <aside className={cn(
                "fixed left-0 top-0 z-40 h-full shadow-md bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
                isOpen ? 'w-64' : 'w-16'
            )}>



                {/* Logo and Description */}
                <div className="p-4 border-b border-sidebar-border w-full flex items-center justify-center">
                    <div className="flex items-center gap-3 w-full mx-10">
                        <div className={`flex-shrink-0 items-center justify-center ${isOpen ? '-ml-3' : ''} `}>
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                                <svg fill="#d86d38" aria-hidden="true" className="w-8 h-8 md:w-10 md:h-10 text-foreground" viewBox="0 0 256 227" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                                    <title>Tapcart</title>
                                    <g>
                                        <path d="M243.56268,83.2548079 L172.835493,12.5279481 C168.883105,8.55729097 164.184897,5.40655793 159.011302,3.25664474 C153.837707,1.10673154 148.29022,1.42108547e-14 142.687729,1.42108547e-14 C137.085239,1.42108547e-14 131.537752,1.10673154 126.364157,3.25664474 C121.190562,5.40655793 116.492354,8.55729097 112.539965,12.5279481 L81.0655716,44.1530775 C97.5194499,46.7776571 112.498713,55.1825716 123.312777,67.8584357 C134.126841,80.5341033 140.06721,96.6501035 140.06721,113.312209 C140.06721,129.974315 134.126841,146.090315 123.312777,158.765982 C112.498713,171.442305 97.5194499,179.846696 81.0655716,182.471799 L112.69057,214.126918 C116.642958,218.097641 121.341166,221.247896 126.514761,223.398267 C131.688356,225.547984 137.235843,226.654601 142.838334,226.654601 C148.440825,226.654601 153.988312,225.547984 159.161907,223.398267 C164.335502,221.247896 169.03371,218.097641 172.986098,214.126918 L243.56268,143.36961 C251.526389,135.394115 256,124.583325 256,113.312209 C256,102.041093 251.526389,91.2309577 243.56268,83.2548079 Z M80.1003927,45.1174052 L81.0649168,44.1526192 C71.0614984,42.5569963 60.8309289,43.1504439 51.0790856,45.8921021 C41.3271768,48.6338259 32.2861216,53.4583455 24.5796195,60.0330214 C16.8731174,66.6077628 10.6846441,74.7757697 6.44109795,83.9744359 C2.19757149,93.1724472 -4.12114787e-13,103.181759 -4.12114787e-13,113.312209 C-4.12114787e-13,123.442004 2.19757149,133.451316 6.44109795,142.649327 C10.6846441,151.847994 16.8731174,160.016 24.5796195,166.590873 C32.2861216,173.16509 41.3271768,177.989675 51.0790856,180.731334 C60.8309289,183.472992 71.0614984,184.066898 81.0649168,182.471144 L80.1003927,181.50662 C62.0217528,163.415735 51.8663547,138.887487 51.8663547,113.312209 C51.8663547,87.7362765 62.0217528,63.2077661 80.1003927,45.1174052 Z" />
                                    </g>
                                </svg>
                            </div>
                        </div>
                        {isOpen && (
                            <div className="overflow-hidden w-full">
                                <h1
                                    className="font-extrabold w-full text-start
                                        text-2xl 
                                        bg-gradient-to-r from-primary via-accent to-primary
                                        bg-clip-text text-transparent
                                        leading-tight
                                        drop-shadow-md"
                                >
                                    Dev Rank
                                </h1>
                                <p className="text-xs text-muted-foreground w-full truncate">
                                    {user?.role === "recruiter" || user?.role === "admin"
                                        ? "Talent Discovery Portal"
                                        : "Talent Discovery Portal"
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <ScrollArea className="flex-1 py-4">
                    <nav className="space-y-4 px-3">
                        {sections.map((section) => (
                            <div key={section.title} className="space-y-2">
                                {isOpen && (
                                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
                                        {section.title}
                                    </h3>
                                )}
                                {section.items.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <SidebarButton
                                            key={item.href}
                                            item={item}
                                            isActive={isActive}
                                        />
                                    );
                                })}
                                <Separator />
                            </div>
                        ))}
                    </nav>
                </ScrollArea>

                {/* Footer with User Profile */}
                <div className="p-4 border-t border-sidebar-border">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className={`cursor-pointer ${isOpen ? '' : '-ml-2'} `}>

                            <div className="flex items-center gap-3">
                                <Avatar className="w-12 h-12 border-2 border-primary/20">
                                    <AvatarImage src={dashboardData.user?.avatar} />
                                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                                        {dashboardData.user?.firstName?.[0]}{dashboardData.user?.lastName?.[0]}
                                    </AvatarFallback>
                                </Avatar>

                                {isOpen && (
                                    <div className="hidden text-left sm:block">
                                        <div className="text-sm font-semibold">{dashboardData.user?.firstName} {dashboardData.user?.lastName}</div>
                                        <p className="text-muted-foreground text-xs">{dashboardData.user?.email}</p>
                                        <Badge
                                            variant="outline"
                                            className={cn(
                                                "text-xs mt-1 px-2 py-0.5 rounded-md",
                                                user?.role === "recruiter" || user?.role === "admin"
                                                    ? "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20"
                                                    : "bg-primary/10 text-primary border-primary/20"
                                            )}
                                        >
                                            {user?.role === "recruiter" || user?.role === "admin" ? "Recruiter" : "Learner"}
                                        </Badge>
                                    </div>
                                )}

                            </div>

                            {/* <Button
                                variant="ghost"
                                className="w-full p-2 h-auto hover:bg-sidebar-accent/50 transition-colors rounded-xl"
                            >
                                <div className="flex items-center gap-3 w-full">
                                    <Avatar className="h-11 w-11 border-2 border-sidebar-border shadow-sm">
                                        <AvatarFallback className={cn(
                                            "text-sm font-bold text-white",
                                            user?.role === "recruiter"
                                                ? "bg-gradient-to-br from-purple-600 to-pink-600"
                                                : "bg-gradient-to-br from-primary to-accent"
                                        )}>
                                            {user?.username ? getUserInitials(user.username) : "U"}
                                        </AvatarFallback>
                                    </Avatar>

                                    {isOpen && (
                                        <div className="flex-1 min-w-0 text-left">
                                            <p className="text-sm font-medium text-sidebar-foreground truncate">
                                                {user?.username || "User"}
                                            </p>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {user?.email || ""}
                                            </p>
                                            <Badge
                                                variant="outline"
                                                className={cn(
                                                    "text-xs mt-1 px-2 py-0.5 rounded-md",
                                                    user?.role === "recruiter"
                                                        ? "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20"
                                                        : "bg-primary/10 text-primary border-primary/20"
                                                )}
                                            >
                                                {user?.role === "recruiter" ? "Recruiter" : "Learner"}
                                            </Badge>
                                        </div>
                                    )}
                                </div>
                            </Button> */}
                        </DropdownMenuTrigger>

                        {/* Dropdown opens to the right of the profile */}
                        <DropdownMenuContent
                            align="end"
                            side="right"
                            sideOffset={8}
                            className="w-64 p-4 rounded-xl font-poppins shadow-lg border border-border bg-background"
                        >
                            {/* Profile Header */}
                            <div className="flex items-center gap-3 pb-3 border-b border-border">
                               <Avatar className="w-14 h-14 border-2 border-primary/20">
                                    <AvatarImage src={dashboardData.user?.avatar} />
                                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                                        {dashboardData.user?.firstName?.[0]}{dashboardData.user?.lastName?.[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-foreground truncate">
                                        {user?.username || "User"}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {user?.email || ""}
                                    </p>
                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            "text-xs mt-1 px-2 py-0.5",
                                            user?.role === "recruiter" || user?.role === "admin"
                                                ? "bg-purple-500/10 text-purple-700 dark:text-purple-400"
                                                : "bg-primary/10 text-primary"
                                        )}
                                    >
                                        {user?.role === "recruiter" || user?.role === "admin" ? "Recruiter Account" : "Learner Account"}
                                    </Badge>
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="mt-3 space-y-2 text-sm">
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-muted-foreground">Account Type:</span>
                                    <span className="font-medium text-xs text-foreground">
                                        {user?.role === "recruiter" || user?.role === "admin" ? "Recruiter" : "Learner"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-muted-foreground">Email:</span>
                                    <span className="font-medium text-xs text-foreground truncate max-w-[140px]">
                                        {user?.email || "N/A"}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-muted-foreground">Signed In:</span>
                                    <span className="font-medium text-xs text-foreground">
                                        {/* {user?.signedInAt
                                            ? formatDate(user.signedInAt)
                                            : "N/A"} */}
                                        Yes
                                    </span>
                                </div>
                                {user?.role === "user" && (
                                    <>
                                        <Separator className="my-2" />
                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-muted-foreground">Credentials:</span>
                                            <span className="font-medium text-xs text-foreground">15</span>
                                        </div>
                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-muted-foreground">NSQF Credits:</span>
                                            <span className="font-medium text-xs text-foreground">245</span>
                                        </div>
                                    </>
                                )}
                                {user?.role === "recruiter" || user?.role === "admin" && (
                                    <>
                                        <Separator className="my-2" />
                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-muted-foreground">Active Jobs:</span>
                                            <span className="font-medium text-xs text-foreground">12</span>
                                        </div>
                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-muted-foreground">Shortlisted:</span>
                                            <span className="font-medium text-xs text-foreground">24</span>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-3 space-y-2">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-sm"
                                    size="sm"
                                >
                                    <Settings className="mr-2 h-4 w-4" />
                                    Account Settings
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-sm"
                                    size="sm"
                                >
                                    <Eye className="mr-2 h-4 w-4" />
                                    {user?.role === "recruiter" || user?.role === "admin" ? "View Company Profile" : "View Profile"}
                                </Button>
                            </div>

                            {/* Logout Button */}
                            <div className="mt-2 pt-3 cursor-pointer border-t border-border">
                                <Button
                                    onClick={handleLogout}
                                    variant="ghost"
                                    className="w-full justify-start cursor-pointer py-2 hover:text-white text-red-500 hover:bg-red-500"
                                >
                                    <LogOut className="mr-2 h-4 w-4" /> Logout
                                </Button>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </aside>
        </TooltipProvider>
    );
};

export default Sidebar;