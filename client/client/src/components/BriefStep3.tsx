import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useBriefForm, type CreativePreferences } from '@/contexts/BriefFormContext';

export function BriefStep3() {
  const { formData, updateCreativePreferences, nextStep, prevStep } = useBriefForm();
  const [data, setData] = useState<CreativePreferences>(formData.creativePreferences);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!data.tone.trim()) newErrors.tone = 'Tone is required';
    if (!data.imageryStyle.trim()) newErrors.imageryStyle = 'Imagery style is required';
    if (!data.colorDirection.trim()) newErrors.colorDirection = 'Color direction is required';
    return newErrors;
  };

  const handleNext = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      updateCreativePreferences(data);
      nextStep();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Creative Preferences</h2>
        <p className="text-muted-foreground">Guide the creative direction for your campaign</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Tone of Voice</label>
          <textarea
            value={data.tone}
            onChange={e => setData({ ...data, tone: e.target.value })}
            placeholder="e.g., Professional, friendly, playful, inspirational, educational..."
            rows={3}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          />
          {errors.tone && <p className="text-xs text-accent-danger mt-1">{errors.tone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Imagery Style</label>
          <textarea
            value={data.imageryStyle}
            onChange={e => setData({ ...data, imageryStyle: e.target.value })}
            placeholder="e.g., Minimalist, lifestyle photography, abstract, product-focused, lifestyle with people..."
            rows={3}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          />
          {errors.imageryStyle && <p className="text-xs text-accent-danger mt-1">{errors.imageryStyle}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Color Direction</label>
          <textarea
            value={data.colorDirection}
            onChange={e => setData({ ...data, colorDirection: e.target.value })}
            placeholder="e.g., Bold blues and oranges, pastel palette, monochrome, vibrant and energetic..."
            rows={3}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          />
          {errors.colorDirection && <p className="text-xs text-accent-danger mt-1">{errors.colorDirection}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Do's</label>
          <textarea
            value={data.dos}
            onChange={e => setData({ ...data, dos: e.target.value })}
            placeholder="What should the creative include? (e.g., Include customer testimonials, showcase product benefits, use authentic imagery)"
            rows={3}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Don'ts</label>
          <textarea
            value={data.donts}
            onChange={e => setData({ ...data, donts: e.target.value })}
            placeholder="What should be avoided? (e.g., Avoid competitor branding, no generic stock photos, no misleading claims)"
            rows={3}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button onClick={prevStep} variant="outline">
          Back
        </Button>
        <Button onClick={handleNext} className="gap-2">
          Next: Review & Submit
        </Button>
      </div>
    </div>
  );
}
