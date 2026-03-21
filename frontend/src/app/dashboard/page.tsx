'use client';

import { RouteGuard } from '@/core';
import { DashboardShowcase } from '@/features/dashboard';
import { Page } from '@/ui';

export default function DashboardPage() {
  return (
    <RouteGuard requireAuth roles={['user', 'manager', 'admin']}>
      <Page>
        <DashboardShowcase />
      </Page>
    </RouteGuard>
  );
}
