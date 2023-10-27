import useScrollTop from '@/hooks/use-scroll-top';
import { cn } from '@/lib/utils';
import React from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';

export default function Navbar() {
  return (
    <div
      className={cn(
        'z-50 bg-background dark:bg-[#1F1F1F]  w-full py-4 px-6 flex justify-between',
        'border-b shadow-sm'
      )}
    >
      <div className='flex gap-x-12'>
        <Logo />
        {/* <DesktopMenu /> */}
      </div>
      <div className='flex gap-x-6'>
        {/* <ThemeToggle /> */}
        <Button variant='gradient' size='lg'>
          Publish
        </Button>
        {/* <MobileMenuNavbar /> */}
      </div>
    </div>
  );
}
