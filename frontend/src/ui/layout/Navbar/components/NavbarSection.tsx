'use client';

import { Nav, navigation } from '@/config';
import { navbarStyles } from '../Navbar.styles';
import { NavbarItem } from './NavbarItem';

export const NavbarSection = () => {
  const { container } = navbarStyles.section;

  return (
    <div className={container}>
      {navigation.map((nav: Nav) => {
        return <NavbarItem key={nav.href} nav={nav} />;
      })}
    </div>
  );
};
