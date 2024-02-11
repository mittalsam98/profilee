import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '600']
});

type LogoProps = {
  height: number;
  width: number;
  className?: string;
};

export default function Logo({ height, width, className }: LogoProps) {
  return (
    <Link className={cn('font-semibold', font.className, className)} href='/'>
      <Image
        src='/profilee.svg'
        height={height}
        width={width}
        alt='Profilee Logo'
        className='rounded-xl'
      />
    </Link>
  );
}
