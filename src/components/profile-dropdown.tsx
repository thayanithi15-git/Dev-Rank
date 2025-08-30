"use client";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
// import { useAuthMeStore } from '@/store/auth/me/me';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { decryptData } from './utils/crypto';


export function ProfileDropdown() {

  // const { fetchMe, userDetails, TokenExpired } = useAuthMeStore();
  const router = useRouter();

  // useEffect(() => {
  //   if (TokenExpired) {
  //     localStorage.clear()
  //     router.push('/sign-in')
  //   }
  // }, [TokenExpired])

  function handleLogout() {
    localStorage.clear()
    router.push('/sign-in')
  }

  function getInitials(name?: string | null): string {
    if (!name || !name.trim()) return ""; // fallback for null/undefined/empty

    const words = name.trim().split(/\s+/);
    if (words.length === 0) return "";

    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }

    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  }

  const newEncryptedRole = localStorage.getItem("role");
  const appRole = newEncryptedRole ? decryptData(newEncryptedRole) : null;

  const userDetails = {
    name: localStorage.getItem("name") || '',
    email: localStorage.getItem("email") || ''
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src='/avatars/01.png' alt='@shadcn' />
            <AvatarFallback className='rounded-lg'>{getInitials(userDetails?.name || 'D')}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm leading-none font-medium'>{userDetails?.name || 'David John'}</p>
            <p className='text-muted-foreground text-xs leading-none'>
              {userDetails?.email || 'davidjohn@devrank.com'}
            </p>
            <p className='flex py-2 text-green-600 font-semibold'>
              {appRole?.charAt(0).toUpperCase() + appRole?.slice(1) || 'Super Admin'}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href='/settings'>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href='/settings'>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href='/settings'>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
