'use client';

import { useNotes } from '@/lib/context/NotesContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { FileText, CheckSquare, Zap } from 'lucide-react';

export default function DashboardPage() {
  const { notes } = useNotes();

  // Calculate stats
  const totalNotes = notes.length;
  const totalActions = notes.reduce(
    (sum, note) => sum + note.actionItems.length,
    0
  );
  const completedActions = notes.reduce(
    (sum, note) => sum + note.actionItems.filter((a) => a.completed).length,
    0
  );

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back! Here&apos;s your notes overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            icon={<FileText size={24} />}
            label="Total Notes"
            value={totalNotes}
            trend={totalNotes > 0 ? `${totalNotes} recorded` : 'Start recording'}
          />
          <StatsCard
            icon={<CheckSquare size={24} />}
            label="Total Action Items"
            value={totalActions}
            trend={
              completedActions > 0
                ? `${completedActions} completed`
                : 'No items completed yet'
            }
          />
          <StatsCard
            icon={<Zap size={24} />}
            label="Recent Activity"
            value={notes.length > 0 ? 'Active' : 'No activity'}
            trend={
              notes.length > 0
                ? `Last note: ${notes[0].createdAt.toLocaleDateString()}`
                : 'Create your first note'
            }
          />
        </div>

        {/* Recent Notes Preview */}
        {notes.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Recent Notes</h2>
            <div className="grid grid-cols-1 gap-4">
              {notes.slice(0, 3).map((note) => (
                <div
                  key={note.id}
                  className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-semibold text-foreground">{note.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {note.summary}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">
                      {note.createdAt.toLocaleDateString()}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      {note.actionItems.length} actions
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
