'use client';

import { CheckSquare } from 'lucide-react';
import { CollapsibleSection } from '@/components/shared/CollapsibleSection';
import { PriorityBadge } from '@/components/shared/Badge';
import { ActionItem } from '@/lib/types';

interface ActionItemsSectionProps {
  actionItems: ActionItem[];
}

export function ActionItemsSection({
  actionItems,
}: ActionItemsSectionProps) {
  return (
    <CollapsibleSection
      title="Action Items"
      icon={<CheckSquare size={20} />}
      defaultOpen={true}
    >
      <div className="space-y-3">
        {actionItems.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-background/50"
          >
            <input
              type="checkbox"
              checked={item.completed}
              readOnly
              className="mt-1 w-4 h-4 rounded border-border cursor-pointer"
            />
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm ${
                  item.completed
                    ? 'text-muted-foreground line-through'
                    : 'text-foreground'
                }`}
              >
                {item.text}
              </p>
            </div>
            <PriorityBadge priority={item.priority} />
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}
