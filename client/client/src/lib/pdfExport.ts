import { jsPDF } from 'jspdf';
import type { BriefFormData } from '@/contexts/BriefFormContext';
import type { CreativeBriefOutput } from './aiService';

export async function exportToPDF(formData: BriefFormData, aiOutput: CreativeBriefOutput) {
  const doc = new jsPDF();
  let yPosition = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  // Helper function to add text with wrapping
  const addWrappedText = (text: string, fontSize: number, isBold: boolean = false) => {
    doc.setFontSize(fontSize);
    if (isBold) {
      doc.setFont('Helvetica', 'bold');
    } else {
      doc.setFont('Helvetica', 'normal');
    }

    const lines = doc.splitTextToSize(text, contentWidth) as string[];
    const lineHeight = fontSize * 0.5;

    lines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += lineHeight;
    });

    doc.setFont('Helvetica', 'normal');
  };

  // Title
  addWrappedText('CREATIVE BRIEF', 24, true);
  yPosition += 10;

  // Campaign Title
  addWrappedText(aiOutput.campaignTitle, 16, true);
  yPosition += 8;

  // Client Details Section
  addWrappedText('CLIENT INFORMATION', 12, true);
  yPosition += 5;
  addWrappedText(`Client: ${formData.clientDetails.clientName}`, 10);
  addWrappedText(`Industry: ${formData.clientDetails.industry}`, 10);
  addWrappedText(`Website: ${formData.clientDetails.website}`, 10);
  yPosition += 8;

  // Campaign Objective Section
  addWrappedText('CAMPAIGN OBJECTIVE', 12, true);
  yPosition += 5;
  addWrappedText(`Objective: ${formData.campaignObjective.objective.toUpperCase()}`, 10);
  addWrappedText(`Budget: $${formData.campaignObjective.budget.toLocaleString()}`, 10);
  addWrappedText(`Target Audience: ${formData.campaignObjective.targetAudience}`, 10);
  yPosition += 8;

  // Headline Options Section
  addWrappedText('HEADLINE OPTIONS', 12, true);
  yPosition += 5;
  aiOutput.headlineOptions.forEach((headline, idx) => {
    addWrappedText(`${idx + 1}. ${headline}`, 10);
    yPosition += 2;
  });
  yPosition += 5;

  // Tone of Voice Section
  addWrappedText('TONE OF VOICE GUIDE', 12, true);
  yPosition += 5;
  addWrappedText(aiOutput.toneOfVoiceGuide, 10);
  yPosition += 8;

  // Recommended Channels Section
  addWrappedText('RECOMMENDED CHANNELS & BUDGET ALLOCATION', 12, true);
  yPosition += 5;
  aiOutput.recommendedChannels.forEach(channel => {
    addWrappedText(`${channel.channel} - ${channel.budgetPercentage}%`, 10, true);
    addWrappedText(channel.rationale, 9);
    yPosition += 3;
  });
  yPosition += 5;

  // Visual Direction Section
  addWrappedText('VISUAL DIRECTION', 12, true);
  yPosition += 5;
  addWrappedText(aiOutput.visualDirection, 10);

  // Save the PDF
  doc.save(`${formData.clientDetails.clientName}-creative-brief.pdf`);
}
