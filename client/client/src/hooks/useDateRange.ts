import { useState } from 'react';

export type DateRangePreset = 'last7d' | 'last30d' | 'last90d' | 'custom';

export interface DateRange {
  startDate: Date;
  endDate: Date;
  preset: DateRangePreset;
}

export function useDateRange() {
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    return {
      startDate,
      endDate,
      preset: 'last30d',
    };
  });

  const setPreset = (preset: DateRangePreset) => {
    const endDate = new Date();
    const startDate = new Date();

    switch (preset) {
      case 'last7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'last30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case 'last90d':
        startDate.setDate(startDate.getDate() - 90);
        break;
      case 'custom':
        break;
    }

    setDateRange({ startDate, endDate, preset });
  };

  const setCustomRange = (startDate: Date, endDate: Date) => {
    setDateRange({ startDate, endDate, preset: 'custom' });
  };

  return { dateRange, setPreset, setCustomRange };
}
