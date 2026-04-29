'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Note, NotesContextType } from '@/lib/types';
import { notesService } from '@/lib/services/notesService';

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load notes on mount
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await notesService.getNotes();
      setNotes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load notes');
    } finally {
      setIsLoading(false);
    }
  };

  const createNote = async (
    note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Note> => {
    try {
      setError(null);
      const newNote = await notesService.createNote(note);
      setNotes((prev) => [newNote, ...prev]);
      return newNote;
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'Failed to create note';
      setError(errorMsg);
      throw err;
    }
  };

  const updateNote = async (
    id: string,
    updates: Partial<Note>
  ): Promise<Note> => {
    try {
      setError(null);
      const updatedNote = await notesService.updateNote(id, updates);
      setNotes((prev) =>
        prev.map((note) => (note.id === id ? updatedNote : note))
      );
      return updatedNote;
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'Failed to update note';
      setError(errorMsg);
      throw err;
    }
  };

  const deleteNote = async (id: string): Promise<void> => {
    try {
      setError(null);
      await notesService.deleteNote(id);
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'Failed to delete note';
      setError(errorMsg);
      throw err;
    }
  };

  const searchNotes = async (query: string): Promise<Note[]> => {
    try {
      setError(null);
      return await notesService.searchNotes(query);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'Failed to search notes';
      setError(errorMsg);
      throw err;
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        isLoading,
        error,
        createNote,
        updateNote,
        deleteNote,
        searchNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes(): NotesContextType {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}
