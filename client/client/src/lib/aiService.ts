import type { BriefFormData } from '@/contexts/BriefFormContext';

export interface CreativeBriefOutput {
  campaignTitle: string;
  headlineOptions: string[];
  toneOfVoiceGuide: string;
  recommendedChannels: Array<{
    channel: string;
    budgetPercentage: number;
    rationale: string;
  }>;
  visualDirection: string;
}

/**
 * Generate creative brief using mock AI response
 * In production, this would call an actual API endpoint
 */
export async function generateCreativeBrief(formData: BriefFormData): Promise<CreativeBriefOutput> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const { clientDetails, campaignObjective, creativePreferences } = formData;

  // Generate dynamic content based on form inputs
  const campaignTitle = `${clientDetails.clientName} - ${campaignObjective.objective.charAt(0).toUpperCase() + campaignObjective.objective.slice(1)} Campaign`;

  const headlineOptions = [
    `Discover What Makes ${clientDetails.clientName} Different`,
    `Transform Your ${clientDetails.industry} Experience with ${clientDetails.clientName}`,
    `Why ${clientDetails.clientName} Leads the ${clientDetails.industry} Market`,
  ];

  const toneGuide = `Adopt a ${creativePreferences.tone} tone that resonates with ${campaignObjective.targetAudience}. The messaging should feel authentic and aligned with ${clientDetails.clientName}'s brand values.`;

  const channels = [
    {
      channel: 'Google Ads',
      budgetPercentage: 35,
      rationale: 'High-intent search traffic for conversion-focused campaigns',
    },
    {
      channel: 'Meta Ads (Facebook & Instagram)',
      budgetPercentage: 40,
      rationale: 'Excellent audience targeting and visual storytelling capabilities',
    },
    {
      channel: 'LinkedIn',
      budgetPercentage: 15,
      rationale: 'B2B reach and professional audience engagement',
    },
    {
      channel: 'TikTok',
      budgetPercentage: 10,
      rationale: 'Emerging platform for younger demographics and viral potential',
    },
  ];

  const visualDirection = `Create ${creativePreferences.imageryStyle} visuals with a ${creativePreferences.colorDirection} color palette. The hero image should feature ${campaignObjective.targetAudience} in a relatable scenario that highlights ${clientDetails.clientName}'s unique value proposition. ${creativePreferences.dos ? `Include: ${creativePreferences.dos}` : ''} ${creativePreferences.donts ? `Avoid: ${creativePreferences.donts}` : ''}`;

  return {
    campaignTitle,
    headlineOptions,
    toneOfVoiceGuide: toneGuide,
    recommendedChannels: channels,
    visualDirection,
  };
}
