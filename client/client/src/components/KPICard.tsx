import { TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react';

interface KPICardProps {
  label: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export function KPICard({ label, value, change, icon, trend = 'neutral' }: KPICardProps) {
  const trendColor = trend === 'up' ? 'text-accent-success' : trend === 'down' ? 'text-accent-danger' : 'text-muted-foreground';
  const trendBg = trend === 'up' ? 'bg-accent-success/10' : trend === 'down' ? 'bg-accent-danger/10' : 'bg-muted/50';

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-accent/30">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-accent/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>

          {change !== undefined && (
            <div className={`mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${trendBg}`}>
              {trend === 'up' ? (
                <TrendingUp className="h-3 w-3 text-accent-success" />
              ) : trend === 'down' ? (
                <TrendingDown className="h-3 w-3 text-accent-danger" />
              ) : null}
              <span className={trendColor}>{Math.abs(change)}% {trend === 'up' ? 'increase' : trend === 'down' ? 'decrease' : 'change'}</span>
            </div>
          )}
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110">
          {icon}
        </div>
      </div>
    </div>
  );
}
