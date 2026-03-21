'use client';

import { RouteGuard } from '@/core';
import { NotesSection } from '@/features/notes';
import { Page } from '@/ui';

export default function DashboardPage() {
  return (
    <RouteGuard requireAuth roles={['user']}>
      <Page>
        <NotesSection />
      </Page>
    </RouteGuard>
  );
}
