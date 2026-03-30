import { Calendar } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/formatters';
import type { DateRangePreset } from '@/hooks/useDateRange';

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  preset: DateRangePreset;
  onPresetChange: (preset: DateRangePreset) => void;
  onCustomRangeChange: (startDate: Date, endDate: Date) => void;
}

export function DateRangePicker({
  startDate,
  endDate,
  preset,
  onPresetChange,
  onCustomRangeChange,
}: DateRangePickerProps) {
  const [showCustom, setShowCustom] = useState(false);
  const [tempStart, setTempStart] = useState(startDate);
  const [tempEnd, setTempEnd] = useState(endDate);

  const presets: Array<{ label: string; value: DateRangePreset }> = [
    { label: 'Last 7 days', value: 'last7d' },
    { label: 'Last 30 days', value: 'last30d' },
    { label: 'Last 90 days', value: 'last90d' },
  ];

  const handleCustomApply = () => {
    onCustomRangeChange(tempStart, tempEnd);
    setShowCustom(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Preset buttons */}
      <div className="flex flex-wrap gap-2">
        {presets.map(p => (
          <Button
            key={p.value}
            onClick={() => onPresetChange(p.value)}
            variant={preset === p.value ? 'default' : 'outline'}
            size="sm"
            className="text-xs"
          >
            {p.label}
          </Button>
        ))}
        <Button
          onClick={() => setShowCustom(!showCustom)}
          variant={preset === 'custom' ? 'default' : 'outline'}
          size="sm"
          className="text-xs gap-1"
        >
          <Calendar className="h-3 w-3" />
          Custom
        </Button>
      </div>

      {/* Custom range inputs */}
      {showCustom && (
        <div className="flex flex-col gap-3 p-3 border border-border rounded-lg bg-card">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs font-medium text-muted-foreground">Start Date</label>
              <input
                type="date"
                value={tempStart.toISOString().split('T')[0]}
                onChange={e => setTempStart(new Date(e.target.value))}
                className="w-full mt-1 px-2 py-1 text-sm border border-border rounded-md bg-background text-foreground"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs font-medium text-muted-foreground">End Date</label>
              <input
                type="date"
                value={tempEnd.toISOString().split('T')[0]}
                onChange={e => setTempEnd(new Date(e.target.value))}
                className="w-full mt-1 px-2 py-1 text-sm border border-border rounded-md bg-background text-foreground"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleCustomApply}
              size="sm"
              className="flex-1 text-xs"
            >
              Apply
            </Button>
            <Button
              onClick={() => setShowCustom(false)}
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Display range */}
      <div className="text-xs text-muted-foreground">
        {formatDate(startDate)} — {formatDate(endDate)}
      </div>
    </div>
  );
}
