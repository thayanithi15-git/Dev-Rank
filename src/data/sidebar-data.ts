import {
  BarChart3,
  BookmarkCheck,
  CalendarDays,
  CloudDownload,
  Database,
  Edit3,
  File,
  FileText,
  FolderOpen,
  HelpCircle,
  History,
  LayoutDashboard,
  PartyPopper,
  RefreshCw,
  Settings,
  Settings2,
  ShieldEllipsis,
  UserCheck,
  UserCog,
  Users,
  Wrench
} from "lucide-react";

import { type SidebarData } from "@/types/types";
import { decryptData } from "@/components/utils/crypto";

// Helper function to safely get localStorage values
const getLocalStorageItem = (key: string, defaultValue: string): string => {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  return localStorage.getItem(key) || defaultValue;
};

// Function to generate sidebar data (call this from useEffect)
export const generateSidebarData = (): SidebarData => {
  const name = getLocalStorageItem("name", "Guest User");
  const email = getLocalStorageItem("email", "guest@domain.com");

  const newEncryptedRole = localStorage.getItem("role");
  const appRole = newEncryptedRole ? decryptData(newEncryptedRole) : null;

  const formattedRole = appRole ?? ''
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    user: {
      name: `${name} (${formattedRole})`,
      email: email,
      avatar: "/avatars/admin.jpg",
    },
    teams: [
      {
        name: "Dev Rank",
        logo: ShieldEllipsis,
        plan: "Developer Profiling & Ranking Platform",
      },
    ],
    navGroups: [
      {
        title: "Insights",
        items: [
          {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
          },
          {
            title: "Rank Analysis",
            url: "/dashboard/rank-analysis",
            icon: BarChart3,
          },
          {
            title: "Profile Insights",
            url: "/dashboard/profile-insights",
            icon: UserCheck,
          },
        ],
      },
      {
        title: "Developer Tools",
        items: [
          {
            title: "Profile Builder",
            url: "/dashboard/profile-builder",
            icon: Edit3,
          },
          {
            title: "Portfolio Preview",
            url: "/dashboard/portfolio-preview",
            icon: FileText,
          },
        ],
      },
      // {
      //   title: "Recruiter Console",
      //   items: [
      //     {
      //       title: "Talent Search",
      //       url: "/dashboard/talent-search",
      //       icon: Users,
      //     },
      //     {
      //       title: "Shortlist",
      //       url: "/dashboard/shortlist",
      //       icon: BookmarkCheck,
      //     },
      //   ],
      // },
      {
        title: "Support & Settings",
        items: [
          {
            title: "Account Settings",
            url: "/dashboard/settings",
            icon: Settings,
          },
          {
            title: "Help Center",
            url: "/dashboard/help-center",
            icon: HelpCircle,
          },
        ],
      },
    ]
  };
};

// Default export for initial render (with fallback values)
export const sidebarData: SidebarData = {
  user: {
    name: "Guest User (Operator)",
    email: "guest@domain.com",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    {
      name: "Dev Rank",
      logo: ShieldEllipsis,
      plan: "Developer Profiling Platform",
    },
  ],
  navGroups: [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Rank Analyze",
          url: "/dashboard/rank-analyze",
          icon: Wrench,
        },
        {
          title: "Document Library",
          url: "/dashboard/documents",
          icon: FolderOpen,
        },
        {
          title: "Backup Center",
          url: "/dashboard/backups",
          icon: Database,
        },
      ],
    },
    {
      title: "Administration",
      items: [
        {
          title: "Activity Tracking",
          url: "/dashboard/activity-logs",
          icon: History,
        },
      ],
    },
    {
      title: "Assistance",
      items: [
        {
          title: "Help Center",
          url: "/dashboard/help-center",
          icon: HelpCircle,
        },
        {
          title: "Settings",
          url: "/dashboard/settings",
          icon: Settings2,
        },
      ],
    },
  ]
};