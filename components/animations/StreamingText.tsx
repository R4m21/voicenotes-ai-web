'use client';

import { useEffect, useState } from 'react';

interface StreamingTextProps {
  text: string;
  speed?: number; // milliseconds per character
  isComplete?: boolean;
}

export function StreamingText({
  text,
  speed = 20,
  isComplete = false,
}: StreamingTextProps) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (isComplete) {
      setDisplayedText(text);
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, isComplete]);

  return (
    <div>
      {displayedText}
      {!isComplete && displayedText.length < text.length && (
        <span className="animate-pulse">_</span>
      )}
    </div>
  );
}
