import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import React from 'react';

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '600']
});

export default function Logo() {
  return (
    <div className='flex items-center gap-x-2'>
      <p className={cn('font-semibold', font.className)}>Profilee</p>
    </div>
  );
}
