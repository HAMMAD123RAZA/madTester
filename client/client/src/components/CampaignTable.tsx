import { ArrowUpDown } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/formatters';

interface Campaign {
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
}

interface CampaignTableProps {
  campaigns: Campaign[];
  selectedCampaignId?: string;
  onCampaignSelect: (campaignId: string) => void;
}

type SortField = keyof Campaign;
type SortOrder = 'asc' | 'desc';

export function CampaignTable({ campaigns, selectedCampaignId, onCampaignSelect }: CampaignTableProps) {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'paused' | 'completed'>('all');

  const sortedAndFilteredCampaigns = useMemo(() => {
    let filtered = campaigns.filter(c => filterStatus === 'all' || c.status === filterStatus);

    return filtered.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (typeof aVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal as string) : (bVal as string).localeCompare(aVal);
      }

      if (typeof aVal === 'number') {
        return sortOrder === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
      }

      return 0;
    });
  }, [campaigns, sortField, sortOrder, filterStatus]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const SortHeader = ({ field, label }: { field: SortField; label: string }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 font-medium text-foreground hover:text-accent transition-colors"
    >
      {label}
      <ArrowUpDown className={`h-4 w-4 ${sortField === field ? 'opacity-100' : 'opacity-30'}`} />
    </button>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-accent-success/10 text-accent-success border border-accent-success/20';
      case 'paused':
        return 'bg-accent-warning/10 text-accent-warning border border-accent-warning/20';
      case 'completed':
        return 'bg-muted text-muted-foreground border border-border';
      default:
        return 'bg-muted text-muted-foreground border border-border';
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter buttons */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'active', 'paused', 'completed'] as const).map(status => (
          <Button
            key={status}
            onClick={() => setFilterStatus(status)}
            variant={filterStatus === status ? 'default' : 'outline'}
            size="sm"
            className="text-xs capitalize"
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-border rounded-lg bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/30">
            <tr>
              <th className="px-4 py-3 text-left">
                <SortHeader field="name" label="Campaign" />
              </th>
              <th className="px-4 py-3 text-left">
                <SortHeader field="client" label="Client" />
              </th>
              <th className="px-4 py-3 text-left">
                <SortHeader field="status" label="Status" />
              </th>
              <th className="px-4 py-3 text-right">
                <SortHeader field="spend" label="Spend" />
              </th>
              <th className="px-4 py-3 text-right">
                <SortHeader field="impressions" label="Impressions" />
              </th>
              <th className="px-4 py-3 text-right">
                <SortHeader field="clicks" label="Clicks" />
              </th>
              <th className="px-4 py-3 text-right">
                <SortHeader field="conversions" label="Conversions" />
              </th>
              <th className="px-4 py-3 text-right">
                <SortHeader field="ctr" label="CTR" />
              </th>
              <th className="px-4 py-3 text-right">
                <SortHeader field="roas" label="ROAS" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedAndFilteredCampaigns.map(campaign => (
              <tr
                key={campaign.id}
                onClick={() => onCampaignSelect(campaign.id)}
                className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedCampaignId === campaign.id ? 'bg-accent/10' : ''
                }`}
              >
                <td className="px-4 py-3 font-medium text-foreground">{campaign.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{campaign.client}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-medium">{formatCurrency(campaign.spend)}</td>
                <td className="px-4 py-3 text-right">{formatNumber(campaign.impressions)}</td>
                <td className="px-4 py-3 text-right">{formatNumber(campaign.clicks)}</td>
                <td className="px-4 py-3 text-right">{formatNumber(campaign.conversions)}</td>
                <td className="px-4 py-3 text-right">{formatPercentage(campaign.ctr)}</td>
                <td className="px-4 py-3 text-right font-semibold text-accent">{campaign.roas.toFixed(2)}x</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedAndFilteredCampaigns.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No campaigns found for the selected filter.
        </div>
      )}
    </div>
  );
}
