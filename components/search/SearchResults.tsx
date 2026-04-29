'use client';

import Link from 'next/link';
import { Note } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

interface SearchResultsProps {
  results: Note[];
  query: string;
}

function highlightText(text: string, query: string) {
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark
        key={index}
        className="bg-blue-200 dark:bg-blue-900 text-inherit font-semibold"
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export function SearchResults({ results, query }: SearchResultsProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Found {results.length} result{results.length !== 1 ? 's' : ''} for "
        <span className="font-semibold text-foreground">{query}</span>"
      </p>

      <div className="space-y-3">
        {results.map((note) => (
          <Link
            key={note.id}
            href={`/dashboard/notes/${note.id}`}
            className="block group border border-border rounded-lg p-4 hover:border-primary/50 hover:bg-muted/50 transition-all"
          >
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
              {highlightText(note.title, query)}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {highlightText(note.summary, query)}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {note.createdAt.toLocaleDateString()}
              </span>
              <span className="text-xs font-medium text-primary group-hover:gap-1 transition-all flex items-center gap-1">
                View <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
