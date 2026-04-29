'use client';

import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useNotes } from '@/lib/context/NotesContext';
import { SummarySection } from '@/components/notes/SummarySection';
import { ActionItemsSection } from '@/components/notes/ActionItemsSection';
import { KeywordsSection } from '@/components/notes/KeywordsSection';
import { ArrowLeft, Trash2 } from 'lucide-react';

export default function NoteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { notes, deleteNote } = useNotes();
  const id = params.id as string;

  const note = notes.find((n) => n.id === id);

  if (!note) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center">
          <p className="text-muted-foreground">Note not found</p>
        </div>
      </DashboardLayout>
    );
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id);
        router.push('/dashboard/notes');
      } catch (error) {
        console.error('Failed to delete note:', error);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex-1">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
            >
              <ArrowLeft size={20} />
              Back to notes
            </button>
            <h1 className="text-3xl font-bold text-foreground">{note.title}</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Created {note.createdAt.toLocaleDateString()} at{' '}
              {note.createdAt.toLocaleTimeString()}
            </p>
          </div>
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg text-muted-foreground hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>

        {/* Transcription */}
        <div className="mb-6 p-6 rounded-lg border border-border bg-muted/30">
          <h2 className="text-sm font-semibold text-foreground mb-3">
            Transcription
          </h2>
          <p className="text-sm text-foreground leading-relaxed">
            {note.transcription}
          </p>
        </div>

        {/* AI Sections */}
        <div className="space-y-4">
          <SummarySection summary={note.summary} />
          <ActionItemsSection actionItems={note.actionItems} />
          <KeywordsSection keywords={note.keywords} />
        </div>
      </div>
    </DashboardLayout>
  );
}
