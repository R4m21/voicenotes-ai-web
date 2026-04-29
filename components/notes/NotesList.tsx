import { Note } from '@/lib/types';
import { NoteCard } from './NoteCard';

interface NotesListProps {
  notes: Note[];
  viewMode: 'grid' | 'list';
}

export function NotesList({ notes, viewMode }: NotesListProps) {
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notes.map((note) => (
        <div key={note.id} className="h-full">
          <NoteCard note={note} />
        </div>
      ))}
    </div>
  );
}
