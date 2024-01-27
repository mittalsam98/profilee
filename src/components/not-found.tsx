'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <div className='flex flex-col justify-between h-[80vh] '>
        <div className='flex-grow flex px-4 flex-col gap-4 items-center justify-center '>
          <h4 className='scroll-m-20 text-[16px] font-bold tracking-normal'>
            Sorry, this page isn&#39;t available
          </h4>
          <span className='text-[15px] text-[#777777] max-w-[350px] w-full text-center'>
            The link you followed may be broken, or the page may have been removed.
          </span>
          <Button
            asChild
            className='rounded-xl px-4 hover:bg-transparent active:scale-90'
            variant={'outline'}
            size={'sm'}
          >
            <Link href={'/'}>Back</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
