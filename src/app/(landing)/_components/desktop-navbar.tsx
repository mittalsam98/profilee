'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLink = ({ className, ...props }: React.ComponentProps<typeof Link>) => {
  const pathname = usePathname();
  const isActive = pathname === props.href;
  return (
    <Link
      className={cn(
        'inline-flex items-center gap-x-2.5 rounded text-sm font-medium',
        isActive ? '' : 'hover:text-primary text-muted-foreground ',
        className
      )}
      {...props}
    />
  );
};
export default function DesktopMenu() {
  return (
    <nav className={'hidden items-center space-x-8 lg:flex'}>
      <NavLink href='#pricing' scroll={true}>
        Pricing
      </NavLink>
      {/* <NavLink href='/admin'>Admin</NavLink> */}
    </nav>
  );
}
