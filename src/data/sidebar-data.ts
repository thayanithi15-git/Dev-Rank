import {
  CalendarDays,
  CloudDownload,
  Database,
  File,
  FolderOpen,
  HelpCircle,
  History,
  LayoutDashboard,
  PartyPopper,
  RefreshCw,
  Settings,
  ShieldEllipsis,
  UserCheck,
  UserCog,
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
        name: "CNC Machines Club",
        logo: ShieldEllipsis,
        plan: "Smart Maintenance",
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
            title: "Machine Overview",
            url: "/dashboard/machines-overview",
            icon: Wrench,
          },
          {
            title: "Version Tracker",
            url: "/dashboard/version-tracker",
            icon: FolderOpen,
          },
          {
            title: "Part Programs",
            url: "/dashboard/part-programs",
            icon: File,
          },
          {
            title: "File Preview",
            url: "/dashboard/file-preview",
            icon: FolderOpen,
          },
          // {
          //   title: "Document Library",
          //   url: "/dashboard/documents",
          //   icon: FolderOpen,
          // },
          // {
          //   title: "Backup Center",
          //   url: "/dashboard/backups",
          //   icon: Database,
          // },
          ...(appRole === "admin" || appRole === "super admin"
            ? [
              {
                title: "Backup Center",
                url: "/dashboard/backups",
                icon: Database,
              },
            ]
            : []),
        ],
      },
      {
        title: "Management Console",
        items: [
          ...(appRole === "admin" || appRole === "super admin"
            ? [
              {
                title: "User Access Control",
                url: "/dashboard/users-manage",
                icon: UserCog,
              },
              // {
              //   title: "System Reports",
              //   url: "/dashboard/reports",
              //   icon: CalendarDays,
              // },
              {
                title: "Resource Allocation",
                url: "/dashboard/resource-allocation",
                icon: UserCheck,
              },
            ]
            : []),
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
          // {
          //   title: "Sync Monitor",
          //   url: "/dashboard/sync-status",
          //   icon: RefreshCw,
          // },
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
      name: "CNC Machines Club",
      logo: ShieldEllipsis,
      plan: "Smart Maintenance",
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
          title: "Machine Overview",
          url: "/dashboard/machines-overview",
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
          title: "Sync Monitor",
          url: "/dashboard/sync-status",
          icon: RefreshCw,
        },
      ],
    },
  ]
};