'use client';

import { useSyncExternalStore } from 'react';
import { Toggle } from '@/ui';

const themeStore = {
  getSnapshot: () => document.documentElement.getAttribute('data-theme'),
  subscribe: (callback: () => void) => {
    const observer = new MutationObserver(callback);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  },
  getServerSnapshot: () => 'light',
};

const ThemeToggle = () => {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot,
  );

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  const isDark = theme === 'dark';

  return (
    <Toggle checked={isDark} onChange={toggle} aria-label="Toggle Theme" />
  );
};

export default ThemeToggle;
