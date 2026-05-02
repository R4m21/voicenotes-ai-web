'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useNotes } from '@/lib/context/NotesContext';
import { VoiceRecorder } from '@/components/notes/VoiceRecorder';
import { RecordingTimer } from '@/components/notes/RecordingTimer';
import { TranscriptionDisplay } from '@/components/notes/TranscriptionDisplay';
import { SummarySection } from '@/components/notes/SummarySection';
import { ActionItemsSection } from '@/components/notes/ActionItemsSection';
import { KeywordsSection } from '@/components/notes/KeywordsSection';
import { Save, X } from 'lucide-react';

const MOCK_TRANSCRIPTION = `Discussed the upcoming Q1 features with the team. Key points: we need to prioritize the search optimization feature that customers have been asking for. The current search takes too long for large datasets.`;

const MOCK_SUMMARY =
  'Team reviewed Q1 roadmap priorities including search optimization and performance improvements.';

const MOCK_ACTIONS = [
  { id: '1', text: 'Implement search optimization feature', priority: 'High' as const, completed: false },
  { id: '2', text: 'Review API rate limiting strategy', priority: 'High' as const, completed: false },
  { id: '3', text: 'Improve dashboard performance', priority: 'Medium' as const, completed: false },
];

const MOCK_KEYWORDS = ['roadmap', 'search', 'performance', 'optimization'];

export default function AddNotePage() {
  const router = useRouter();
  const { createNote } = useNotes();

  const [title, setTitle] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcription, setTranscription] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setTranscription('');
    setShowAnalysis(false);
  };

  const handleStopRecording = async (audioBlob: Blob) => {
    setIsRecording(false);
    // Simulate transcription streaming
    setTranscription("");
    setShowAnalysis(false);
    // Start transcription

    const formData = new FormData();
    formData.append("file", audioBlob, `recording.webm`);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transcribe`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      setTranscription(data.transcription);
      setShowAnalysis(true);
    } catch (error) {
      console.error(error);
      alert(`Transcription failed: ${error}`);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !transcription.trim()) {
      alert('Please add a title and record a note');
      return;
    }

    setIsSaving(true);
    try {
      await createNote({
        title,
        transcription,
        summary: MOCK_SUMMARY,
        actionItems: MOCK_ACTIONS,
        keywords: MOCK_KEYWORDS,
      });
      router.push('/dashboard/notes');
    } catch (error) {
      console.error('Failed to save note:', error);
      alert('Failed to save note');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">New Voice Note</h1>
          <p className="text-muted-foreground mt-2">
            Record and transcribe your thoughts
          </p>
        </div>

        {/* Title Input */}
        <div className="mb-6 space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-foreground">
            Note Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for your note..."
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Recording Section */}
        <div className="border-2 border-dashed border-border rounded-lg p-8 mb-6 text-center">
          <div className="space-y-4">
            {/* Mic Button */}
            <VoiceRecorder
              isRecording={isRecording}
              onStart={handleStartRecording}
              onStop={handleStopRecording}
            />

            {/* Recording Timer */}
            {isRecording && (
              <RecordingTimer seconds={recordingTime} setSeconds={setRecordingTime} />
            )}

            {/* Status Text */}
            {isRecording && (
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <p className="text-sm font-medium text-red-600 dark:text-red-400">
                  Recording…
                </p>
              </div>
            )}

            {!isRecording && transcription === '' && (
              <p className="text-sm text-muted-foreground">
                {title ? 'Click the microphone to start recording' : 'Enter a title and click to record'}
              </p>
            )}
          </div>
        </div>

        {/* Transcription */}
        {transcription && (
          <div className="mb-6 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3">Transcription</h3>
            {!showAnalysis ? (
              <div className="text-muted-foreground text-sm mb-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span>AI is analyzing your note…</span>
              </div>
            ) : null}
            <TranscriptionDisplay
              text={transcription}
              isComplete={showAnalysis}
            />
          </div>
        )}

        {/* AI Analysis Sections */}
        {showAnalysis && (
          <div className="space-y-4 mb-6">
            <SummarySection summary={MOCK_SUMMARY} />
            <ActionItemsSection actionItems={MOCK_ACTIONS} />
            <KeywordsSection keywords={MOCK_KEYWORDS} />
          </div>
        )}

        {/* Action Buttons */}
        {transcription && (
          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={isSaving || !title.trim()}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save size={20} />
              {isSaving ? 'Saving…' : 'Save Note'}
            </button>
            <button
              onClick={() => {
                setTitle('');
                setTranscription('');
                setShowAnalysis(false);
                setRecordingTime(0);
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
            >
              <X size={20} />
              Clear
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
