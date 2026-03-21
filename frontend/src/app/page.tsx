'use client';

import { Button } from '@/ui';
import { useRedirect } from '@/hooks';

export default function Home() {
  const { redirect } = useRedirect();
  const onClick = () => {
    redirect({ url: '/dashboard' });
  };
  return <Button label="dashboard" onClick={onClick} />;
}
