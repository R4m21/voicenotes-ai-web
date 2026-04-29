'use client';

import { Search } from 'lucide-react';
import { EmptyStateBase } from '@/components/shared/EmptyStateBase';

interface EmptySearchStateProps {
  query: string;
}

export function EmptySearchState({ query }: EmptySearchStateProps) {
  return (
    <EmptyStateBase
      icon={<Search size={48} />}
      title="No results found"
      description={`We couldn't find any notes matching "${query}". Try a different search term or browse all your notes.`}
    />
  );
}
