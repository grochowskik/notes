'use client';

import { useRedirect } from '@/hooks';
import { Button } from '@/ui';

export default function Home() {
  const { redirect } = useRedirect();
  const onClick = () => {
    redirect({ url: '/dashboard' });
  };
  return <Button label="dashboard" onClick={onClick} />;
}
