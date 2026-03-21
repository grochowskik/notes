'use client';

import { useRouter, usePathname } from 'next/navigation';
import type { MouseEvent } from 'react';
import { styles } from './Tabs.styles';
import { cn } from '@/utils';

type TabsProps = {
  activeTab: string;
  onClick?: (name: string) => void;
  tabs: Array<{
    name: string;
    label: string;
    disabled?: boolean;
  }>;
};

const Tabs = ({ activeTab, onClick, tabs }: TabsProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleTabChange = (tabName: string) => {
    const segments = pathname.split('/').filter(Boolean);

    if (!activeTab) {
      router.push(`${pathname.replace(/\/$/, '')}/${tabName}`);
    } else if (!tabName) {
      const newPath = `/${segments.slice(0, -1).join('/')}`;
      router.replace(newPath);
    } else {
      const newPath = `/${[...segments.slice(0, -1), tabName].join('/')}`;
      router.replace(newPath);
    }
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;
    if (onClick) {
      onClick(name);
    } else {
      handleTabChange(name);
    }
  };

  return (
    <div className={styles.container}>
      {tabs?.map((tab) => (
        <button
          key={tab.name}
          name={tab.name}
          onClick={handleClick}
          disabled={tab.disabled}
          className={cn([
            styles.tab,
            tab.name === activeTab && styles.active,
            tab.disabled && styles.disabled,
          ])}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
