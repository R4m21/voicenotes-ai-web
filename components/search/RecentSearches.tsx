'use client';

import { Clock } from 'lucide-react';

interface RecentSearchesProps {
  searches: string[];
  onSearch: (search: string) => void;
}

export function RecentSearches({ searches, onSearch }: RecentSearchesProps) {
  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Clock size={18} />
        Recent Searches
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((search) => (
          <button
            key={search}
            onClick={() => onSearch(search)}
            className="px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground text-sm transition-colors border border-border"
          >
            {search}
          </button>
        ))}
      </div>
    </div>
  );
}
