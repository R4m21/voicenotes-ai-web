export function PulseAnimation({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Pulsing background rings */}
      <div className="absolute inset-0 rounded-full bg-red-500/20 animate-pulse" />
      <div className="absolute inset-0 rounded-full bg-red-500/10 animate-pulse" style={{ animationDelay: '0.5s' }} />
      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
