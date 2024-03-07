import Logo from '@/components/logo';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getServerAuthSession } from '@/server/auth';
import Link from 'next/link';
import { RiAdminFill } from 'react-icons/ri';
import DesktopMenu from './desktop-navbar';
import MobileMenuNavbar from './mobile-menu-navbar';

export default async function DesktopNavbar() {
  const session = await getServerAuthSession();

  return (
    <div
      className={cn(
        'container w-full bg-background dark:bg-[#1F1F1F] px-6 py-3 flex justify-between items-center '
      )}
    >
      <div className='flex gap-x-12'>
        <Logo height={42} width={42} />
        <DesktopMenu />
      </div>
      <div className='flex gap-x-6'>
        <div className='flex gap-x-4 items-center'>
          {session && (
            <Link
              className={buttonVariants({ variant: 'outline', size: 'lgp6' })}
              href={'/builder'}
            >
              Admin
              <RiAdminFill />
            </Link>
          )}
          <Link
            className='hidden lg:flex bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-1 px-5 dark:focus:ring-offset-gray-800 text-lg'
            href={session ? '/api/auth/signout' : '/auth/login'}
          >
            {session ? 'Logout' : 'Login'}
          </Link>
          <Button variant='outline' className='rounded-full px-5 py-1 text-lg'>
            Signup
          </Button>
        </div>
        <MobileMenuNavbar />
      </div>
    </div>
  );
}
