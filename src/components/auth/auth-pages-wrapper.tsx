'use client';

import { Button } from '@/components/ui/button';

import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

interface AuthPagesWrapper {
  children: React.ReactNode;
  pageTitle: string;
  flow: 'signup' | 'signin';
  pageSubTitle?: string;
}

export function AuthPagesWrapper({ children, pageTitle, pageSubTitle, flow }: AuthPagesWrapper) {
  return (
    <>
      <div className='flex absolute h-full w-4/6'>
        <div className='h-full w-[400px] hidden md:block bg-zinc-900 p-10 text-white '>
          <div className=' flex h-full items-center justify-center text-lg font-medium'>
            Profilee
          </div>
        </div>
        <div className='w-full flex'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]'>
            <div className='text-[25px]'>
              <h1 className='font-semibold mb-3'>{pageTitle}</h1>
              <p className='text-sm text-muted-foreground'>{pageSubTitle}</p>
            </div>
            <Button className='w-full rounded-2xl' variant='outline'>
              <FcGoogle className='mr-4 text-xl' />
              {flow === 'signin' ? 'Sign In' : 'Sign up'} with Google
            </Button>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
              </div>
            </div>
            {children}
            <AlternateAuthOption flow={flow} />
            <TermAndPolicy />
          </div>
        </div>
      </div>
    </>
  );
}

const AlternateAuthOption = ({ flow }: { flow: 'signup' | 'signin' }) => {
  return (
    <p className='px-8 text-center text-sm text-muted-foreground'>
      {flow == 'signup' ? 'Already have an account? ' : "Don't have an account? "}
      <Link
        href={flow == 'signup' ? '/auth/login' : '/auth/register'}
        className='underline underline-offset-4 hover:text-primary'
      >
        {flow == 'signup' ? 'Sign In' : 'Sign up'}
      </Link>
    </p>
  );
};

const TermAndPolicy = () => {
  return (
    <p className='px-8 text-center text-sm text-muted-foreground'>
      By clicking continue, you agree to our{' '}
      <Link href='/terms' className='underline underline-offset-4 hover:text-primary'>
        Terms of Service
      </Link>{' '}
      and{' '}
      <Link href='/privacy' className='underline underline-offset-4 hover:text-primary'>
        Privacy Policy
      </Link>
      .
    </p>
  );
};
