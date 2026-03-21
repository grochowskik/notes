'use client';

import { NavbarLogo } from './components/NavbarLogo';
import { NavbarSection } from './components/NavbarSection';
import { NavbarUser } from './components/NavbarUser';
import { navbarStyles } from './Navbar.styles';

const Navbar = () => {
  const { wrapper, inner, content } = navbarStyles.navbar;

  return (
    <nav className={wrapper}>
      <div className={inner}>
        <div className={content}>
          <NavbarLogo />
          <NavbarSection />
          <NavbarUser />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
