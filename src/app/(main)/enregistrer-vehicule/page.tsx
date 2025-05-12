"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import StepHeader from "@/components/StepHeader";
import { useFormStore } from "@/lib/formStore";
import VehicleInfoForm from "@/components/forms/VehicleInfoForm";
import OwnerInfoForm from "@/components/forms/OwnerInfoForm";
import LinkedPersonsForm from "@/components/forms/LinkedPersonsForm";
import SummaryForm from "@/components/forms/SummaryForm";
import StartRegisterForm from "@/components/forms/StartRegisterForm";
import RegistrationSuccessScreen from "@/components/RegistrationSuccessScreen";
import { useMutation } from "@tanstack/react-query";
import { registerVehicle } from "@/services/endpoints";
import { FormData } from "@/types";
import { toast } from "react-hot-toast";
import { formatOwnerInfo } from "@/utils/common";

export default function VehicleRegistrationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const { formData } = useFormStore();

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push("/");
    }
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleStart = () => {
    setCurrentStep(1);
  };

  const RegisterVehicleMutation = useMutation({
    mutationFn: async (data: FormData) => await registerVehicle(data),
    onSuccess: async () => {
      toast.success("Enregistrement réussi !");

      handleNext();
    },
    onError: (error: any) => {
      if (error?.response?.data) {
        toast.error(
          error?.response?.data?.message || "Échec de l'enregistrement"
        );
      } else {
        toast.error("Erreur lors du processus", error);
      }
    },
  });

  const handleSubmit = () => {
    const dataToSend = formatOwnerInfo(formData);

    RegisterVehicleMutation.mutate(dataToSend);
  };

  const renderForm = () => {
    switch (currentStep) {
      case 0:
        return <StartRegisterForm onStart={handleStart} />;
      case 1:
        return (
          <VehicleInfoForm
            onSubmit={handleNext}
            handlePrevious={handlePrevious}
          />
        );
      case 2:
        return (
          <OwnerInfoForm
            onSubmit={handleNext}
            handlePrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <LinkedPersonsForm
            onSubmit={handleNext}
            handlePrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <SummaryForm
            onSubmit={handleSubmit}
            handlePrevious={handlePrevious}
            isLoading={RegisterVehicleMutation.isPending}
          />
        );
      case 5:
        return <RegistrationSuccessScreen />;
      default:
        return <StartRegisterForm onStart={handleStart} />;
    }
  };

  const displayOption =
    currentStep === 0 || currentStep === 4 || currentStep === 5;

  return (
    <div className="min-h-screen">
      <Breadcrumb title="Enregistrer Mon Véhicule" />
      <div className="max-w-4xl mx-auto p-4 pb-20">
        {!displayOption && <StepHeader currentStep={currentStep} />}

        <div className="mt-8">{renderForm()}</div>
      </div>
    </div>
  );
}
