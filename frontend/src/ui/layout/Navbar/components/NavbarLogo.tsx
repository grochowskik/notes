'use client';

import Link from 'next/link';
import { navbarStyles } from '../Navbar.styles';

export const NavbarLogo = () => {
  const { container, link, text } = navbarStyles.logo;
  return (
    <div className={container}>
      <Link href="/dashboard" className={link}>
        <span className={text}>YourLogo</span>
      </Link>
    </div>
  );
};
