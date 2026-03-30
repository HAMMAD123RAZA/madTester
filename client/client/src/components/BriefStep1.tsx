import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useBriefForm, type ClientDetails } from '@/contexts/BriefFormContext';

export function BriefStep1() {
  const { formData, updateClientDetails, nextStep } = useBriefForm();
  const [data, setData] = useState<ClientDetails>(formData.clientDetails);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!data.clientName.trim()) newErrors.clientName = 'Client name is required';
    if (!data.industry.trim()) newErrors.industry = 'Industry is required';
    if (!data.website.trim()) newErrors.website = 'Website is required';
    if (!data.competitors.trim()) newErrors.competitors = 'Competitors are required';
    return newErrors;
  };

  const handleNext = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      updateClientDetails(data);
      nextStep();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Client Details</h2>
        <p className="text-muted-foreground">Tell us about your client and their market position</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Client Name</label>
          <input
            type="text"
            value={data.clientName}
            onChange={e => setData({ ...data, clientName: e.target.value })}
            placeholder="e.g., Lumiere Skincare"
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {errors.clientName && <p className="text-xs text-accent-danger mt-1">{errors.clientName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Industry</label>
          <input
            type="text"
            value={data.industry}
            onChange={e => setData({ ...data, industry: e.target.value })}
            placeholder="e.g., Beauty & Skincare"
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {errors.industry && <p className="text-xs text-accent-danger mt-1">{errors.industry}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Website</label>
          <input
            type="url"
            value={data.website}
            onChange={e => setData({ ...data, website: e.target.value })}
            placeholder="https://example.com"
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {errors.website && <p className="text-xs text-accent-danger mt-1">{errors.website}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Key Competitors</label>
          <textarea
            value={data.competitors}
            onChange={e => setData({ ...data, competitors: e.target.value })}
            placeholder="List main competitors (comma-separated)"
            rows={3}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          />
          {errors.competitors && <p className="text-xs text-accent-danger mt-1">{errors.competitors}</p>}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleNext} className="gap-2">
          Next: Campaign Objective
        </Button>
      </div>
    </div>
  );
}
