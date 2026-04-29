'use client';

import { useState, useEffect, useMemo } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useNotes } from '@/lib/context/NotesContext';
import { SearchBar } from '@/components/search/SearchBar';
import { RecentSearches } from '@/components/search/RecentSearches';
import { SearchResults } from '@/components/search/SearchResults';
import { EmptySearchState } from '@/components/search/EmptySearchState';

export default function SearchPage() {
  const { notes, searchNotes, isLoading } = useNotes();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(notes);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('recentSearches');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (!value.trim()) {
      setResults(notes);
      return;
    }

    setIsSearching(true);
    try {
      const searchResults = await searchNotes(value);
      setResults(searchResults);

      // Save to recent searches
      if (value.trim()) {
        const updated = [
          value,
          ...recentSearches.filter((s) => s !== value),
        ].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleRecentSearch = (search: string) => {
    setQuery(search);
    handleSearch(search);
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Search Notes</h1>
          <p className="text-muted-foreground mt-2">
            Find notes by keywords, title, or content
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar value={query} onChange={handleSearch} />

        {/* Recent Searches */}
        {!query && recentSearches.length > 0 && (
          <RecentSearches
            searches={recentSearches}
            onSearch={handleRecentSearch}
          />
        )}

        {/* Results */}
        {query && (
          <div className="mt-8">
            {isSearching ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-muted rounded-lg" />
                ))}
              </div>
            ) : results.length > 0 ? (
              <SearchResults
                results={results}
                query={query}
              />
            ) : (
              <EmptySearchState query={query} />
            )}
          </div>
        )}

        {/* Initial State */}
        {!query && recentSearches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Use the search bar above to find your notes
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
