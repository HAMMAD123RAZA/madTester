import React from 'react';
import { BriefStep1 } from '@/components/BriefStep1';
import { BriefStep2 } from '@/components/BriefStep2';
import { BriefStep3 } from '@/components/BriefStep3';
import { BriefStep4 } from '@/components/BriefStep4';
import { useBriefForm } from '@/contexts/BriefFormContext';


export default function CreativeBriefBuilder() {
  const { currentStep } = useBriefForm();

  const steps = [
    { number: 1, title: 'Client Details' },
    { number: 2, title: 'Campaign Objective' },
    { number: 3, title: 'Creative Preferences' },
    { number: 4, title: 'Review & Submit' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">AI Creative Brief Builder</h1>
          <p className="text-muted-foreground mt-2">Generate professional creative briefs powered by AI in 4 simple steps</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center h-10 w-10 rounded-full font-bold transition-all duration-300 ${
                    currentStep >= step.number
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step.number}
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                      currentStep > step.number ? 'bg-accent' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            {steps.map(step => (
              <span key={step.number} className="text-center flex-1">{step.title}</span>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-card border border-border rounded-lg p-6 md:p-8">
          {currentStep === 1 && <BriefStep1 />}
          {currentStep === 2 && <BriefStep2 />}
          {currentStep === 3 && <BriefStep3 />}
          {currentStep === 4 && <BriefStep4 />}
        </div>
      </div>
    </div>
  );
}
