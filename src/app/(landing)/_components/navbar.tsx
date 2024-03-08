import Logo from '@/components/logo';
import { cn } from '@/lib/utils';
import { getServerAuthSession } from '@/server/auth';
import Link from 'next/link';
import DesktopMenu from './desktop-navbar';
import MobileMenuNavbar from './mobile-menu-navbar';

export default async function DesktopNavbar() {
  const session = await getServerAuthSession();

  return (
    <div
      className={cn(
        'container w-full dark:bg-[#1F1F1F] px-6 pt-4 pb-3 flex justify-between items-center '
      )}
    >
      <div className='flex gap-x-2 items-center'>
        <Logo height={42} width={42} />
        <span className='hidden md:flex text-xl uppercase font-bold'>Profilee</span>
      </div>
      <div className='flex gap-x-6'>
        <div className='flex gap-x-2 items-center'>
          <DesktopMenu />
          {session && (
            <Link className={cn('px-5 py-1 text-md relative')} href={'/builder'}>
              Dashboard
              <svg
                className='absolute -bottom-0.5 w-2/3 max-h-1.5'
                viewBox='0 0 55 5'
                xmlns='http://www.w3.org/2000/svg'
                preserveAspectRatio='none'
              >
                <path d='M0.652466 4.00002C15.8925 2.66668 48.0351 0.400018 54.6853 2.00002'></path>
              </svg>
            </Link>
          )}{' '}
          {!session && (
            <Link className={cn('rounded-full px-5 py-1 text-md')} href={'/auth/login'}>
              Sign in
            </Link>
          )}
          <Link
            className='hidden lg:flex bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-1 px-4 dark:focus:ring-offset-gray-800 text-lg'
            href={session ? '/api/auth/signout' : '/auth/register'}
          >
            {session ? 'Logout' : 'Sign up'}
          </Link>
        </div>
        <MobileMenuNavbar />
      </div>
    </div>
  );
}
