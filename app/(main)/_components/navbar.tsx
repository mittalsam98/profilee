import useScrollTop from '@/hooks/use-scroll-top';
import { cn } from '@/lib/utils';
import React from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';

export default function Navbar() {
  return (
    <>
      <div className='flex gap-x-12'>
        <Logo />
        {/* <DesktopMenu /> */}
      </div>
      <div className='flex gap-x-6'>
        {/* <ThemeToggle /> */}
        <Button variant='gradient' className='p-3'>
          Publish
        </Button>
        {/* <MobileMenuNavbar /> */}
      </div>
    </>
  );
}
