'use client';

import { Mic, Square } from 'lucide-react';
import { PulseAnimation } from '@/components/animations/PulseAnimation';
import { useRef } from 'react';

interface VoiceRecorderProps {
  isRecording: boolean;
  onStart: () => void;
  onStop: (audioBlob: Blob) => void;
}

export function VoiceRecorder({
  isRecording,
  onStart,
  onStop,
}: VoiceRecorderProps) {  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleStart = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });
      audioChunksRef.current = [];
      onStop(audioBlob);
    };

    mediaRecorder.start();
    onStart();
  };

  const handleStop = () => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current = null;
  };

  if (isRecording) {
    return (
      <PulseAnimation>
        <button
          onClick={handleStop}
          className="mx-auto w-24 h-24 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-lg"
        >
          <Square size={32} fill="currentColor" />
        </button>
      </PulseAnimation>
    );
  }

  return (
    <button
      onClick={handleStart}
      className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white flex items-center justify-center transition-all shadow-lg hover:shadow-xl"
    >
      <Mic size={40} />
    </button>
  );
}
