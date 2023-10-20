import useScrollTop from '@/hooks/use-scroll-top';
import { cn } from '@/lib/utils';
import React from 'react';
import Logo from './logo';
import MobileMenuNavbar from './mobile-menu-navbar';
import DesktopMenu from './desktop-navbar';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

export default function DesktopNavbar() {
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
      </div>{' '}
      <div className='flex gap-x-6'>
        {/* <ThemeToggle /> */}
        <Button variant='outline' className='lg:flex items-center justify-center hidden' size='lg'>
          Login
        </Button>
        <MobileMenuNavbar />
      </div>
    </div>
  );
}
