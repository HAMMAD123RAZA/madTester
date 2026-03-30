import React, { createContext, useContext, useState } from 'react';

export interface ClientDetails {
  clientName: string;
  industry: string;
  website: string;
  competitors: string;
}

export interface CampaignObjective {
  objective: 'awareness' | 'consideration' | 'conversion';
  targetAudience: string;
  budget: number;
}

export interface CreativePreferences {
  tone: string;
  imageryStyle: string;
  colorDirection: string;
  dos: string;
  donts: string;
}

export interface BriefFormData {
  clientDetails: ClientDetails;
  campaignObjective: CampaignObjective;
  creativePreferences: CreativePreferences;
}

interface BriefFormContextType {
  formData: BriefFormData;
  currentStep: number;
  updateClientDetails: (data: ClientDetails) => void;
  updateCampaignObjective: (data: CampaignObjective) => void;
  updateCreativePreferences: (data: CreativePreferences) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
}

const BriefFormContext = createContext<BriefFormContextType | undefined>(undefined);

const initialFormData: BriefFormData = {
  clientDetails: {
    clientName: '',
    industry: '',
    website: '',
    competitors: '',
  },
  campaignObjective: {
    objective: 'awareness',
    targetAudience: '',
    budget: 0,
  },
  creativePreferences: {
    tone: '',
    imageryStyle: '',
    colorDirection: '',
    dos: '',
    donts: '',
  },
};

export function BriefFormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<BriefFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);

  const updateClientDetails = (data: ClientDetails) => {
    setFormData(prev => ({ ...prev, clientDetails: data }));
  };

  const updateCampaignObjective = (data: CampaignObjective) => {
    setFormData(prev => ({ ...prev, campaignObjective: data }));
  };

  const updateCreativePreferences = (data: CreativePreferences) => {
    setFormData(prev => ({ ...prev, creativePreferences: data }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
  };

  return (
    <BriefFormContext.Provider
      value={{
        formData,
        currentStep,
        updateClientDetails,
        updateCampaignObjective,
        updateCreativePreferences,
        nextStep,
        prevStep,
        resetForm,
      }}
    >
      {children}
    </BriefFormContext.Provider>
  );
}

export function useBriefForm() {
  const context = useContext(BriefFormContext);
  if (context === undefined) {
    throw new Error('useBriefForm must be used within BriefFormProvider');
  }
  return context;
}
