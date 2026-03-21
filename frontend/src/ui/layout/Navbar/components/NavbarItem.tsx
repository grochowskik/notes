'use client';

import { Nav } from '@/config';
import { cn } from '@/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navbarStyles } from '../Navbar.styles';

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
