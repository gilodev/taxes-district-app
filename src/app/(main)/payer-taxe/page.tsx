"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import StartTaxForm from "@/components/forms/StartTaxForm";
import SummaryTaxForm from "@/components/forms/SummaryTaxForm";
import TaxSuccessScreen from "@/components/TaxSuccessScreen";

export default function VehicleRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleStart = () => {
    setCurrentStep(1);
  };

  const handleSubmit = () => {
    handleNext();
  };

  const renderForm = () => {
    switch (currentStep) {
      case 0:
        return <StartTaxForm onStart={handleStart} />;
      case 1:
        return <SummaryTaxForm onSubmit={handleSubmit} />;
      case 2:
        return <TaxSuccessScreen />;
      default:
        return <StartTaxForm onStart={handleStart} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Breadcrumb title="Payer ma Taxe" />
      <div className="max-w-4xl mx-auto p-4 pb-20">
        <div className="mt-8">{renderForm()}</div>
      </div>
    </div>
  );
}
