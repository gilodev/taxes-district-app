import React from "react";

interface StepHeaderProps {
  currentStep: number;
}

export default function StepHeader({ currentStep = 1 }: StepHeaderProps) {
  const steps = [
    { title: "Informations du véhicule", number: 1 },
    { title: "Informations du propriétaire", number: 2 },
    { title: "Personnes liées au véhicule", number: 3 },
  ];

  return (
    <div className="flex items-center justify-between w-full px-2 md:px-6 lg:px-15 mb-8 overflow-hidden">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          {/* Étape */}
          <div
            className={`flex-1 flex items-center justify-center rounded-full py-2 md:py-3 ${
              step.number <= currentStep
                ? "bg-blue text-white"
                : "bg-darkblue text-white"
            }`}>
            <span className="font-medium text-xs whitespace-nowrap px-2 md:px-4">
              <span className="sm:hidden">{step.number}</span>

              <span className="hidden sm:inline">
                {step.number}- {step.title}
              </span>
            </span>
          </div>

          {/* Ligne de connexion entre les étapes */}
          {index < steps.length - 1 && (
            <div
              className={`w-4 md:w-8 lg:w-12 h-1 ${
                step.number < currentStep ? "bg-blue" : "bg-darkblue"
              }`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
