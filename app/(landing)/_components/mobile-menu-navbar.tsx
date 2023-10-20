import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';

export default function MobileMenuNavbar() {
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
            <Link className='flex items-center gap-3 p-2 text-lg' href={'/login'}>
              Login
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
