import useScrollTop from '@/hooks/use-scroll-top';
import { cn } from '@/lib/utils';
import React from 'react';
import MobileMenuNavbar from './mobile-menu-navbar';
import DesktopMenu from './desktop-navbar';
import { Button, buttonVariants } from '@/components/ui/button';
import Logo from '@/components/logo';
import { getServerAuthSession } from '@/server/auth';
import Link from 'next/link';
import { RiAdminFill } from 'react-icons/ri';

export default async function DesktopNavbar() {
  const session = await getServerAuthSession();

  return (
    <div
      className={cn(
        'z-50 bg-background dark:bg-[#1F1F1F] fixed top-0  w-full p-6 flex justify-between',
        'border-b shadow-sm'
      )}
    >
      <div className='flex gap-x-12'>
        <Logo />
        <DesktopMenu />
      </div>
      <div className='flex gap-x-6'>
        <div className='flex gap-x-6 items-center'>
          {session && (
            <div>
              <Link className='flex  items-center' href={'/builder'}>
                Admin
                <RiAdminFill />
              </Link>
            </div>
          )}
          <Link
            href={session ? '/api/auth/signout' : '/api/auth/signin'}
            className={buttonVariants({ variant: 'outline' })}
          >
            {session ? 'Logout' : 'Login'}
          </Link>
        </div>
        <MobileMenuNavbar />
      </div>
    </div>
  );
}
