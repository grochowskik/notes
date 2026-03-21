'use client';

import { useClickOutside, useRedirect } from '@/hooks';
import { setLoggedIn } from '@/redux/slice/user';
import { ThemeToggle } from '@/ui';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { navbarStyles } from '../Navbar.styles';

export const NavbarUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { redirect } = useRedirect();
  const { trigger, dropdown, item, divider, container } = navbarStyles.userMenu;

  const handleClickOutside = useCallback(() => setIsOpen(false), []);
  useClickOutside(menuRef, handleClickOutside);

  const handleLogout = useCallback(async () => {
    try {
      document.cookie = 'auth_session=; path=/; max-age=0; SameSite=Lax';

      dispatch(setLoggedIn({ isLoggedIn: false }));

      setIsOpen(false);

      redirect({ url: '/login' });
    } catch (error) {
      console.error('Logout failed', error);
    }
  }, [dispatch, redirect]);

  return (
    <div className={container} ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={trigger}
        aria-label="User menu"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        U
      </button>

      {isOpen && (
        <div className={dropdown} role="menu" aria-orientation="vertical">
          <div className={item} role="menuitem">
            <ThemeToggle />
          </div>

          <hr className={divider} />

          <Link
            href="/settings"
            className={item}
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            Settings
          </Link>

          <hr className={divider} />

          <button className={item} role="menuitem" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
