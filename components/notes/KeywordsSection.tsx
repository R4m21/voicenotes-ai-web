'use client';

import { Tag } from 'lucide-react';
import { CollapsibleSection } from '@/components/shared/CollapsibleSection';
import { TagBadge } from '@/components/shared/Badge';

interface KeywordsSectionProps {
  keywords: string[];
}

export function KeywordsSection({ keywords }: KeywordsSectionProps) {
  return (
    <CollapsibleSection
      title="Keywords"
      icon={<Tag size={20} />}
      defaultOpen={true}
    >
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <TagBadge key={keyword}>{keyword}</TagBadge>
        ))}
      </div>
    </CollapsibleSection>
  );
}
