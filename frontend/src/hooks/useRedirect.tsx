'use client';

import {
  PageParams,
  popPage,
  previousPage,
  pushPage,
} from '@/redux/slice/page-params';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useHandleBackNavigation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handlePopState = () => {
      dispatch(popPage());
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [dispatch]);
};

const useRedirect = () => {
  useHandleBackNavigation();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const prevPageParams = useSelector(previousPage);

  const redirect = (newParams: PageParams) => {
    if (!newParams.url) return;

    const nextPage: PageParams = {
      url: newParams.url,
      origin_url: pathname,
      params: newParams.params,
    };

    dispatch(pushPage(nextPage));
    router.push(newParams.url);
  };

  const goBack = () => {
    if (prevPageParams?.origin_url) {
      dispatch(popPage());
      router.push(prevPageParams.origin_url);
    } else {
      console.warn('Redirect stack empty. Going to home.');
      router.push('/');
    }
  };

  return { redirect, goBack };
};

export default useRedirect;
