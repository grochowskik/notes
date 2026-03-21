'use client';

import { RootState } from '@/redux/store';
import { Loader, Navbar } from '@/ui';
import { useSelector } from 'react-redux';
import { pageStyles } from './page.styles';

type PageProps = {
  children?: React.ReactNode;
  loading?: boolean;
  title?: string;
};

const Page = ({ children, loading, title }: PageProps) => {
  const loggedIn = useSelector((state: RootState) => state.user.loggedIn);
  const { container, title: titleClass } = pageStyles;

  return (
    <div className={container}>
      {loggedIn && <Navbar />}
      {title && <h1 className={titleClass}>{title}</h1>}
      <Loader loading={loading}>{children}</Loader>
    </div>
  );
};

export default Page;
