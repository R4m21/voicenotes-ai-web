'use client';

import { Calendar, ArrowUpDown } from 'lucide-react';

interface FilterBarProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  sortOrder: 'latest' | 'oldest';
  onSortChange: (order: 'latest' | 'oldest') => void;
}

export function FilterBar({
  selectedDate,
  onDateChange,
  sortOrder,
  onSortChange,
}: FilterBarProps) {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {/* Date Filter */}
      <div className="flex items-center gap-2">
        <Calendar size={18} className="text-muted-foreground" />
        <select
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All dates</option>
          <option value={today}>Today</option>
          <option value={new Date(Date.now() - 86400000).toISOString().split('T')[0]}>
            Yesterday
          </option>
          <option value={new Date(Date.now() - 604800000).toISOString().split('T')[0]}>
            This week
          </option>
        </select>
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2">
        <ArrowUpDown size={18} className="text-muted-foreground" />
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value as 'latest' | 'oldest')}
          className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="latest">Latest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>
    </div>
  );
}
