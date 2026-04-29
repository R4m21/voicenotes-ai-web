'use client';

import { Mic, Square } from 'lucide-react';
import { PulseAnimation } from '@/components/animations/PulseAnimation';

interface VoiceRecorderProps {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
}

export function VoiceRecorder({
  isRecording,
  onStart,
  onStop,
}: VoiceRecorderProps) {
  if (isRecording) {
    return (
      <PulseAnimation>
        <button
          onClick={onStop}
          className="mx-auto w-24 h-24 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-lg"
        >
          <Square size={32} fill="currentColor" />
        </button>
      </PulseAnimation>
    );
  }

  return (
    <button
      onClick={onStart}
      className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white flex items-center justify-center transition-all shadow-lg hover:shadow-xl"
    >
      <Mic size={40} />
    </button>
  );
}
