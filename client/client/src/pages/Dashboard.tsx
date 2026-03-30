import { BarChart3, Zap, Eye, MousePointerClick, ShoppingCart, TrendingUp, Moon, Sun, FileText } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { CampaignTable } from '@/components/CampaignTable';
import { DateRangePicker } from '@/components/DateRangePicker';
import { KPICard } from '@/components/KPICard';
import { PerformanceChart } from '@/components/PerformanceChart';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { useDateRange } from '@/hooks/useDateRange';
import { useDarkMode } from '@/hooks/useDarkMode';
import { calculateCTR, calculateConversionRate, formatCurrency, formatNumber } from '@/lib/formatters';
import mockData from '@/data/mockData.json';

/**
 * Dashboard Page Component
 * 
 * Design Philosophy: Modern Data Minimalism
 * - Information hierarchy through contrast and strategic color accents
 * - Purposeful density with efficient information packing
 * - Sophisticated restraint with minimal ornamentation
 * - Accessibility-first approach with high contrast ratios
 * 
 * Layout: Asymmetric sidebar + main content area with card-based sections
 * Typography: Inter (body) with strategic font weight hierarchy
 * Color: Deep slate blue primary with vibrant accents for positive metrics
 */

export default function Dashboard() {
  const { isDark, toggleDarkMode } = useDarkMode();
  const { dateRange, setPreset, setCustomRange } = useDateRange();
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(mockData.campaigns[0].id);
  const [filteredPerformanceData, setFilteredPerformanceData] = useState(mockData.performanceData);
  const [, navigate] = useLocation();

  // Filter performance data based on date range
  useEffect(() => {
    const filtered = mockData.performanceData.filter(d => {
      const date = new Date(d.date);
      return date >= dateRange.startDate && date <= dateRange.endDate;
    });
    setFilteredPerformanceData(filtered);
  }, [dateRange]);

  // Calculate aggregate metrics
  const totalMetrics = filteredPerformanceData.reduce(
    (acc, d) => ({
      impressions: acc.impressions + d.impressions,
      clicks: acc.clicks + d.clicks,
      conversions: acc.conversions + d.conversions,
      spend: acc.spend + d.spend,
    }),
    { impressions: 0, clicks: 0, conversions: 0, spend: 0 }
  );

  const selectedCampaign = mockData.campaigns.find(c => c.id === selectedCampaignId);

  return (
    <div className={`flex h-screen overflow-hidden ${isDark ? 'dark' : ''}`}>
      {/* Sidebar */}
      <Sidebar
        clients={mockData.clients}
        campaigns={mockData.campaigns}
        selectedCampaign={selectedCampaignId}
        onCampaignSelect={setSelectedCampaignId}
        onSettingsClick={() => console.log('Settings clicked')}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Campaign Dashboard</h1>
              <p className="text-muted-foreground mt-1">Monitor and optimize your advertising campaigns in real-time</p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => navigate('/brief')}
                className="gap-2"
              >
                <FileText className="h-4 w-4" />
                Create Brief
              </Button>
              <Button
                onClick={toggleDarkMode}
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Date Range Picker */}
          <div className="mb-8 p-4 border border-border rounded-lg bg-card">
            <h2 className="text-sm font-semibold text-foreground mb-4">Date Range</h2>
            <DateRangePicker
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              preset={dateRange.preset}
              onPresetChange={setPreset}
              onCustomRangeChange={setCustomRange}
            />
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <KPICard
              label="Total Impressions"
              value={formatNumber(totalMetrics.impressions)}
              icon={<Eye className="h-6 w-6" />}
              trend="up"
              change={12}
            />
            <KPICard
              label="Total Clicks"
              value={formatNumber(totalMetrics.clicks)}
              icon={<MousePointerClick className="h-6 w-6" />}
              trend="up"
              change={8}
            />
            <KPICard
              label="Total Conversions"
              value={formatNumber(totalMetrics.conversions)}
              icon={<ShoppingCart className="h-6 w-6" />}
              trend="up"
              change={15}
            />
            <KPICard
              label="Total Spend"
              value={formatCurrency(totalMetrics.spend)}
              icon={<Zap className="h-6 w-6" />}
              trend="neutral"
            />
            <KPICard
              label="Average CTR"
              value={formatNumber(calculateCTR(totalMetrics.clicks, totalMetrics.impressions)) + '%'}
              icon={<BarChart3 className="h-6 w-6" />}
              trend="up"
              change={3}
            />
            <KPICard
              label="Average ROAS"
              value={(totalMetrics.conversions * 100 / totalMetrics.spend).toFixed(2) + 'x'}
              icon={<TrendingUp className="h-6 w-6" />}
              trend="up"
              change={5}
            />
          </div>

          {/* Performance Chart */}
          <div className="mb-8">
            <PerformanceChart data={filteredPerformanceData} isDark={isDark} />
          </div>

          {/* Campaign Table */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">All Campaigns</h2>
            <CampaignTable
              campaigns={mockData.campaigns as Array<{
                id: string;
                name: string;
                client: string;
                status: 'active' | 'paused' | 'completed';
                budget: number;
                spend: number;
                impressions: number;
                clicks: number;
                conversions: number;
                ctr: number;
                roas: number;
                channel: string;
              }>}
              selectedCampaignId={selectedCampaignId}
              onCampaignSelect={setSelectedCampaignId}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
