'use client';

import { useEffect } from 'react';

interface RecordingTimerProps {
  seconds: number;
  setSeconds: (seconds: number) => void;
}

export function RecordingTimer({ seconds, setSeconds }: RecordingTimerProps) {
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, setSeconds]);

  const minutes = Math.floor(seconds / 60);
  const displaySeconds = seconds % 60;
  const formatted = `${minutes.toString().padStart(2, '0')}:${displaySeconds
    .toString()
    .padStart(2, '0')}`;

  return (
    <div className="text-3xl font-mono font-bold text-foreground">
      {formatted}
    </div>
  );
}
