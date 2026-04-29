'use client';

import { Grid2X2, List } from 'lucide-react';

interface ViewToggleProps {
  viewMode: 'grid' | 'list';
  onViewChange: (mode: 'grid' | 'list') => void;
}

export function ViewToggle({ viewMode, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 border border-border rounded-lg p-1">
      <button
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded transition-colors ${
          viewMode === 'grid'
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:bg-muted'
        }`}
        title="Grid view"
      >
        <Grid2X2 size={18} />
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`p-2 rounded transition-colors ${
          viewMode === 'list'
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:bg-muted'
        }`}
        title="List view"
      >
        <List size={18} />
      </button>
    </div>
  );
}
