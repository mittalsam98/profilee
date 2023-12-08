import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { getServerAuthSession } from '@/server/auth';

export default async function MobileMenuNavbar() {
  const session = await getServerAuthSession();

  return (
    <div className='flex items-center justify-center lg:hidden'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MenuIcon className='h-6 w-6' />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' sideOffset={16}>
          <DropdownMenuItem asChild>
            <Link className='flex items-center gap-3 p-2 text-lg' href='/pricing'>
              Pricing
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link className='flex items-center gap-3 p-2 text-lg' href='/blog'>
              Blog
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              href={session ? '/api/auth/signout' : '/api/auth/signin'}
              className='flex items-center gap-3 p-2 text-lg'
            >
              {session ? 'Sign out' : 'Sign in'}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
