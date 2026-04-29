'use client';

import Link from 'next/link';
import { Mic } from 'lucide-react';
import { EmptyStateBase } from '@/components/shared/EmptyStateBase';

export function EmptyNotes() {
  return (
    <EmptyStateBase
      icon={<Mic size={48} />}
      title="No notes yet"
      description="Start recording your first voice note to organize your thoughts and ideas."
      action={{
        label: 'Record New Note',
        onClick: () => {
          // This will be handled by the action prop
          window.location.href = '/dashboard/add';
        },
      }}
    />
  );
}
