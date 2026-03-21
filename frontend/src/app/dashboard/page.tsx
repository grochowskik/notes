'use client';

import { Page } from '@/ui';
import { RouteGuard } from '@/core';
import { DashboardShowcase } from '@/features/dashboard';

export default function DashboardPage() {
  return (
    <RouteGuard requireAuth roles={['user', 'manager', 'admin']}>
      <Page>
        <DashboardShowcase />
      </Page>
    </RouteGuard>
  );
}
