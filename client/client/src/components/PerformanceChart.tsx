import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface PerformanceData {
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
}

interface PerformanceChartProps {
  data: PerformanceData[];
  isDark?: boolean;
}

export function PerformanceChart({ data, isDark = false }: PerformanceChartProps) {
  const gridColor = isDark ? '#374151' : '#e5e7eb';
  const textColor = isDark ? '#d1d5db' : '#6b7280';
  const tooltipBg = isDark ? '#1f2937' : '#ffffff';
  const tooltipBorder = isDark ? '#4b5563' : '#e5e7eb';

  // Format data for display
  const formattedData = data.map(d => ({
    date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    impressions: Math.round(d.impressions / 1000000),
    clicks: Math.round(d.clicks / 1000),
    conversions: d.conversions,
    spend: Math.round(d.spend / 1000),
  }));

  return (
    <div className="w-full h-80 p-4 bg-card border border-border rounded-lg">
      <h3 className="text-sm font-semibold text-foreground mb-4">30-Day Performance Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="date"
            stroke={textColor}
            style={{ fontSize: '12px' }}
            tick={{ fill: textColor }}
          />
          <YAxis
            stroke={textColor}
            style={{ fontSize: '12px' }}
            tick={{ fill: textColor }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              borderRadius: '8px',
              padding: '8px 12px',
            }}
            labelStyle={{ color: textColor }}
            formatter={(value) => value.toLocaleString()}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="impressions"
            stroke="var(--color-chart-1)"
            strokeWidth={2}
            dot={false}
            name="Impressions (M)"
            isAnimationActive={true}
            animationDuration={800}
          />
          <Line
            type="monotone"
            dataKey="clicks"
            stroke="var(--color-chart-2)"
            strokeWidth={2}
            dot={false}
            name="Clicks (K)"
            isAnimationActive={true}
            animationDuration={800}
          />
          <Line
            type="monotone"
            dataKey="conversions"
            stroke="var(--color-chart-3)"
            strokeWidth={2}
            dot={false}
            name="Conversions"
            isAnimationActive={true}
            animationDuration={800}
          />
          <Line
            type="monotone"
            dataKey="spend"
            stroke="var(--color-chart-4)"
            strokeWidth={2}
            dot={false}
            name="Spend ($K)"
            isAnimationActive={true}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
