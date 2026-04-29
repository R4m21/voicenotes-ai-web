'use client';

import { useEffect, useState } from 'react';
import { User, Settings } from 'lucide-react';

export function Header() {
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    setDate(formatted);
  }, []);

  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-8">
      <div>
        <h2 className="text-sm text-muted-foreground">{date}</h2>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
          <Settings size={20} />
        </button>
        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
            <User size={18} />
          </div>
        </button>
      </div>
    </header>
  );
}
