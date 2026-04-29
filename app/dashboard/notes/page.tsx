'use client';

import { useState, useMemo } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useNotes } from '@/lib/context/NotesContext';
import { NotesList } from '@/components/notes/NotesList';
import { FilterBar } from '@/components/notes/FilterBar';
import { ViewToggle } from '@/components/notes/ViewToggle';
import { EmptyNotes } from '@/components/notes/EmptyNotes';

export default function NotesPage() {
  const { notes, isLoading } = useNotes();
  const [selectedDate, setSelectedDate] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort notes
  const filteredAndSortedNotes = useMemo(() => {
    let filtered = notes;

    // Filter by date
    if (selectedDate !== 'all') {
      const filterDate = new Date(selectedDate);
      filtered = filtered.filter((note) => {
        const noteDate = new Date(note.createdAt);
        return (
          noteDate.getFullYear() === filterDate.getFullYear() &&
          noteDate.getMonth() === filterDate.getMonth() &&
          noteDate.getDate() === filterDate.getDate()
        );
      });
    }

    // Sort
    const sorted = [...filtered];
    sorted.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
    });

    return sorted;
  }, [notes, selectedDate, sortOrder]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notes</h1>
          <p className="text-muted-foreground mt-2">
            Manage all your voice notes and action items
          </p>
        </div>

        {/* Controls */}
        {notes.length > 0 && (
          <div className="flex items-center justify-between flex-wrap gap-4">
            <FilterBar
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              sortOrder={sortOrder}
              onSortChange={setSortOrder}
            />
            <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
          </div>
        )}

        {/* Notes List or Empty State */}
        {filteredAndSortedNotes.length > 0 ? (
          <NotesList notes={filteredAndSortedNotes} viewMode={viewMode} />
        ) : notes.length > 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No notes found for the selected filter
            </p>
          </div>
        ) : (
          <EmptyNotes />
        )}
      </div>
    </DashboardLayout>
  );
}
