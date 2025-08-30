"use client"

import Link from 'next/link'
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
// import { useAuthMeStore } from '@/store/auth/me/me'
import { decryptData } from '../utils/crypto'

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  const router = useRouter()

  function handleLogout() {
    if (typeof window !== "undefined") {
    localStorage.clear()
    }
    router.push('/sign-in')
  }

  // const { fetchMe, userDetails } = useAuthMeStore();

  // useEffect(() => {
  //   fetchMe();
  // }, [fetchMe])

  function getInitials(name?: string | null): string {
    if (!name || !name.trim()) return ""; // fallback for null/undefined/empty

    const words = name.trim().split(/\s+/);
    if (words.length === 0) return "";

    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }

    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  }

  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
  const [appRole, setAppRole] = useState<string | null>(null);

  useEffect(() => {
    const newEncryptedRole = localStorage.getItem("role");
    const role = newEncryptedRole ? decryptData(newEncryptedRole) : null;

    setAppRole(role);

    setUserDetails({
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("email") || "",
    });
  }, []);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage src={user.avatar} alt={userDetails?.name || 'David John'} />
                <AvatarFallback className='rounded-lg'>{getInitials(userDetails?.name || 'D')}</AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{userDetails?.name ||  'David John'}</span>
                <span className='truncate text-xs'>{userDetails?.email || 'davidjohn@devrank.com'}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal cursor-pointer'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage src={user.avatar} alt={userDetails?.name ||  'David John'} />
                  <AvatarFallback className='rounded-lg'>{getInitials(userDetails?.name || 'D')}</AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>{userDetails?.name || 'David John'}</span>
                  <span className='truncate text-xs'>{userDetails?.email || 'davidjohn@devrank.com'}</span>
                  <p className='flex py-2 text-green-600'>
                    {(appRole ? appRole.charAt(0).toUpperCase() + appRole.slice(1) : 'Super Admin')}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className='text-red-600 cursor-pointer'>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
