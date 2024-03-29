import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { getServerAuthSession } from '@/server/auth';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';

export default async function MobileMenuNavbar() {
  const session = await getServerAuthSession();

  return (
    <div className='flex items-center justify-center lg:hidden'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MenuIcon className='h-6 w-6' />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' sideOffset={16} className='bg-white'>
          <DropdownMenuItem asChild>
            <Link className='flex items-center gap-3 p-2 text-lg' href='#pricing'>
              Pricing
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href={session ? '/api/auth/signout' : '/auth/register'}
              className='flex items-center gap-3 p-2 text-lg'
            >
              {session ? 'Logout' : 'Sign up'}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
