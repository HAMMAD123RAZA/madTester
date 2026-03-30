import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useBriefForm, type CampaignObjective } from '@/contexts/BriefFormContext';

export function BriefStep2() {
  const { formData, updateCampaignObjective, nextStep, prevStep } = useBriefForm();
  const [data, setData] = useState<CampaignObjective>(formData.campaignObjective);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!data.targetAudience.trim()) newErrors.targetAudience = 'Target audience is required';
    if (data.budget <= 0) newErrors.budget = 'Budget must be greater than 0';
    return newErrors;
  };

  const handleNext = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      updateCampaignObjective(data);
      nextStep();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Campaign Objective</h2>
        <p className="text-muted-foreground">Define the campaign goals and target audience</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Campaign Objective</label>
          <div className="space-y-2">
            {(['awareness', 'consideration', 'conversion'] as const).map(obj => (
              <label key={obj} className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input
                  type="radio"
                  name="objective"
                  value={obj}
                  checked={data.objective === obj}
                  onChange={e => setData({ ...data, objective: e.target.value as typeof obj })}
                  className="h-4 w-4"
                />
                <div>
                  <p className="font-medium text-foreground capitalize">{obj}</p>
                  <p className="text-xs text-muted-foreground">
                    {obj === 'awareness' && 'Build brand recognition and reach'}
                    {obj === 'consideration' && 'Drive interest and engagement'}
                    {obj === 'conversion' && 'Generate sales and direct response'}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Target Audience</label>
          <textarea
            value={data.targetAudience}
            onChange={e => setData({ ...data, targetAudience: e.target.value })}
            placeholder="Describe your ideal customer: demographics, interests, behaviors, pain points..."
            rows={4}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          />
          {errors.targetAudience && <p className="text-xs text-accent-danger mt-1">{errors.targetAudience}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Budget (USD)</label>
          <input
            type="number"
            value={data.budget || ''}
            onChange={e => setData({ ...data, budget: parseFloat(e.target.value) || 0 })}
            placeholder="50000"
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {errors.budget && <p className="text-xs text-accent-danger mt-1">{errors.budget}</p>}
        </div>
      </div>

      <div className="flex justify-between">
        <Button onClick={prevStep} variant="outline">
          Back
        </Button>
        <Button onClick={handleNext} className="gap-2">
          Next: Creative Preferences
        </Button>
      </div>
    </div>
  );
}
