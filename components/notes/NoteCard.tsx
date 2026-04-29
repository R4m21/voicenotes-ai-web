'use client';

import Link from 'next/link';
import { Note } from '@/lib/types';
import { ArrowRight, Trash2 } from 'lucide-react';
import { useNotes } from '@/lib/context/NotesContext';

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  const { deleteNote } = useNotes();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(note.id);
      } catch (error) {
        console.error('Failed to delete note:', error);
      }
    }
  };

  return (
    <Link href={`/dashboard/notes/${note.id}`}>
      <div className="group border border-border rounded-lg p-6 hover:border-primary/50 hover:bg-muted/50 transition-all cursor-pointer h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {note.title}
          </h3>
          <button
            onClick={handleDelete}
            className="ml-2 p-1.5 rounded-lg text-muted-foreground hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* Summary */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {note.summary}
        </p>

        {/* Meta */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{note.createdAt.toLocaleDateString()}</span>
            <span>{note.actionItems.length} actions</span>
          </div>

          {/* Keywords */}
          {note.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {note.keywords.slice(0, 3).map((keyword) => (
                <span
                  key={keyword}
                  className="inline-block px-2 py-1 rounded text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                >
                  {keyword}
                </span>
              ))}
              {note.keywords.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{note.keywords.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-xs font-medium text-primary group-hover:gap-2 transition-all flex items-center gap-1">
            View Note <ArrowRight size={14} />
          </span>
          {note.actionItems.some((a) => a.completed) && (
            <span className="text-xs text-green-600 dark:text-green-400">
              {note.actionItems.filter((a) => a.completed).length} completed
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
