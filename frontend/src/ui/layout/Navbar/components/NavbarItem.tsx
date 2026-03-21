'use client';

import Link from 'next/link';
import { navbarStyles } from '../Navbar.styles';
import { Nav } from '@/config';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils';

export const NavbarItem = ({ nav }: { nav: Nav }) => {
  const { base, active, inactive } = navbarStyles.navItem;
  const pathname = usePathname();

  const isActive = pathname === nav.href || pathname.startsWith(nav.href + '/');
  return (
    <Link
      href={nav.href}
      className={cn([base, isActive && active, !isActive && inactive])}
    >
      {nav.name}
    </Link>
  );
};
