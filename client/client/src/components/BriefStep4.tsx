import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useBriefForm } from '@/contexts/BriefFormContext';
import { generateCreativeBrief, type CreativeBriefOutput } from '@/lib/aiService';
import { exportToPDF } from '@/lib/pdfExport';

export function BriefStep4() {
  const { formData, prevStep, resetForm } = useBriefForm();
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiOutput, setAiOutput] = useState<CreativeBriefOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const output = await generateCreativeBrief(formData);
      setAiOutput(output);
    } catch (err) {
      setError('Failed to generate creative brief. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportPDF = async () => {
    if (aiOutput) {
      try {
        await exportToPDF(formData, aiOutput);
      } catch (err) {
        setError('Failed to export PDF. Please try again.');
        console.error(err);
      }
    }
  };

  if (aiOutput) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Creative Brief Generated</h2>
          <p className="text-muted-foreground">Review the AI-generated creative direction below</p>
        </div>

        {/* Campaign Title */}
        <div className="p-4 border border-border rounded-lg bg-card">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Campaign Title</h3>
          <p className="text-lg font-bold text-foreground">{aiOutput.campaignTitle}</p>
        </div>

        {/* Headline Options */}
        <div className="p-4 border border-border rounded-lg bg-card">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Headline Options</h3>
          <div className="space-y-2">
            {aiOutput.headlineOptions.map((headline, idx) => (
              <div key={idx} className="p-3 bg-muted/30 rounded-lg">
                <p className="text-foreground">{headline}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tone of Voice */}
        <div className="p-4 border border-border rounded-lg bg-card">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Tone of Voice Guide</h3>
          <p className="text-foreground">{aiOutput.toneOfVoiceGuide}</p>
        </div>

        {/* Recommended Channels */}
        <div className="p-4 border border-border rounded-lg bg-card">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Recommended Channels & Budget Allocation</h3>
          <div className="space-y-2">
            {aiOutput.recommendedChannels.map((channel, idx) => (
              <div key={idx} className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-foreground">{channel.channel}</p>
                  <p className="text-sm font-bold text-accent">{channel.budgetPercentage}%</p>
                </div>
                <p className="text-xs text-muted-foreground">{channel.rationale}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Direction */}
        <div className="p-4 border border-border rounded-lg bg-card">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Visual Direction</h3>
          <p className="text-foreground">{aiOutput.visualDirection}</p>
        </div>

        {error && (
          <div className="p-3 bg-accent-danger/10 border border-accent-danger/20 rounded-lg text-accent-danger text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-2 justify-between">
          <Button onClick={() => { resetForm(); setAiOutput(null); }} variant="outline">
            Start New Brief
          </Button>
          <Button onClick={handleExportPDF} className="gap-2">
            Export as PDF
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Review & Submit</h2>
        <p className="text-muted-foreground">Review your campaign brief before generating creative direction</p>
      </div>

      {/* Summary */}
      <div className="space-y-4">
        <div className="p-4 border border-border rounded-lg bg-card">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Client Details</h3>
          <div className="space-y-2 text-sm">
            <p><span className="text-muted-foreground">Client:</span> <span className="text-foreground font-medium">{formData.clientDetails.clientName}</span></p>
            <p><span className="text-muted-foreground">Industry:</span> <span className="text-foreground font-medium">{formData.clientDetails.industry}</span></p>
            <p><span className="text-muted-foreground">Website:</span> <span className="text-foreground font-medium">{formData.clientDetails.website}</span></p>
          </div>
        </div>

        <div className="p-4 border border-border rounded-lg bg-card">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Campaign Objective</h3>
          <div className="space-y-2 text-sm">
            <p><span className="text-muted-foreground">Objective:</span> <span className="text-foreground font-medium capitalize">{formData.campaignObjective.objective}</span></p>
            <p><span className="text-muted-foreground">Budget:</span> <span className="text-foreground font-medium">${formData.campaignObjective.budget.toLocaleString()}</span></p>
          </div>
        </div>

        <div className="p-4 border border-border rounded-lg bg-card">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Creative Preferences</h3>
          <div className="space-y-2 text-sm">
            <p><span className="text-muted-foreground">Tone:</span> <span className="text-foreground font-medium">{formData.creativePreferences.tone}</span></p>
            <p><span className="text-muted-foreground">Imagery:</span> <span className="text-foreground font-medium">{formData.creativePreferences.imageryStyle}</span></p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-accent-danger/10 border border-accent-danger/20 rounded-lg text-accent-danger text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-between">
        <Button onClick={prevStep} variant="outline" disabled={isGenerating}>
          Back
        </Button>
        <Button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="gap-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Creative Brief'
          )}
        </Button>
      </div>
    </div>
  );
}
