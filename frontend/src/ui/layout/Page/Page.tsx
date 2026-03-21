'use client';

import { Loader, Navbar } from '@/ui';
import { pageStyles } from './page.styles';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

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
