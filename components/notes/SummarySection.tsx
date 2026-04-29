'use client';

import { Zap } from 'lucide-react';
import { CollapsibleSection } from '@/components/shared/CollapsibleSection';

interface SummarySectionProps {
  summary: string;
}

export function SummarySection({ summary }: SummarySectionProps) {
  return (
    <CollapsibleSection
      title="Summary"
      icon={<Zap size={20} />}
      defaultOpen={true}
    >
      <p className="text-sm text-foreground leading-relaxed">{summary}</p>
    </CollapsibleSection>
  );
}
