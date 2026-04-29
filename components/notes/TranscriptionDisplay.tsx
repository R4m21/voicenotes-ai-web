'use client';

import { StreamingText } from '@/components/animations/StreamingText';

interface TranscriptionDisplayProps {
  text: string;
  isComplete: boolean;
}

export function TranscriptionDisplay({
  text,
  isComplete,
}: TranscriptionDisplayProps) {
  return (
    <div className="text-sm text-foreground leading-relaxed">
      <StreamingText text={text} speed={15} isComplete={isComplete} />
    </div>
  );
}
