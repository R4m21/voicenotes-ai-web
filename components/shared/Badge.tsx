interface BadgeProps {
  priority: 'High' | 'Medium' | 'Low';
  children?: React.ReactNode;
}

export function PriorityBadge({ priority, children }: BadgeProps) {
  const styles = {
    High: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border border-red-300 dark:border-red-800',
    Medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-300 dark:border-amber-800',
    Low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-300 dark:border-green-800',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[priority]}`}>
      {children || priority}
    </span>
  );
}

interface TagBadgeProps {
  children: React.ReactNode;
  highlighted?: boolean;
}

export function TagBadge({ children, highlighted = false }: TagBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
        highlighted
          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
          : 'bg-muted text-muted-foreground border border-border'
      }`}
    >
      {children}
    </span>
  );
}
