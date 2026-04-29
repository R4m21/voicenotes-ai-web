interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: string;
}

export function StatsCard({ icon, label, value, trend }: StatsCardProps) {
  return (
    <div className="border border-border rounded-lg p-6 bg-muted/30 hover:bg-muted/50 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-2">{label}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {trend && <p className="text-xs text-green-600 mt-2">{trend}</p>}
        </div>
        <div className="text-muted-foreground">{icon}</div>
      </div>
    </div>
  );
}
