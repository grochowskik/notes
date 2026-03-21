'use client';

import { Page } from '@/ui';
import { RouteGuard } from '@/core';
import { NotesSection } from '@/features/notes';

export default function DashboardPage() {
  return (
    <RouteGuard requireAuth roles={['user']}>
      <Page>
        <NotesSection />
      </Page>
    </RouteGuard>
  );
}
