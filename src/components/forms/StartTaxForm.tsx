"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormTaxStore } from "@/lib/formStore";
import Button from "@/components/Button";
import { VehicleTaxInfo } from "@/types";
import { vehicleTaxInfoSchema } from "@/lib/validation";

interface StartTaxFormProps {
  onStart: () => void;
}

export default function StartTaxForm({ onStart }: StartTaxFormProps) {
  const { setVehicleTaxInfo, formData } = useFormTaxStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VehicleTaxInfo>({
    resolver: zodResolver(vehicleTaxInfoSchema),
    defaultValues: formData.VehicleTaxInfo,
    mode: "onChange",
  });

  const submitForm = (data: VehicleTaxInfo) => {
    setVehicleTaxInfo(data);
    onStart();
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-gray mb-15">
            Taxe sur les taxis interurbains
            <br />
            ou ceux dotés d’un compteur
          </h1>
        </div>

        <form
          id="licensePlateForm"
          onSubmit={handleSubmit(submitForm)}
          className="w-full bg-white p-8 shadow-sm rounded">
          <div className="mb-6">
            <label
              htmlFor="licensePlate"
              className="block text-black text-sm font-semibold mb-2">
              Numero de plaque d'immatriculation
            </label>
            <input
              {...register("licensePlate")}
              type="text"
              id="marque"
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Suzuki"
            />
            {errors.licensePlate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.licensePlate.message as string}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="licensePlate"
              className="block text-black text-sm font-semibold mb-2">
              Entrer un numéro de téléphone lié au véhicule
            </label>
            <div className="flex space-x-2">
              <div className="flex items-center bg-gray-50 border border-gray-300 rounded px-3 py-2">
                <div className="flex items-center">
                  <img
                    src="/images/flag-ci.svg"
                    alt="Flag of Côte d'Ivoire"
                    className="w-6 h-6 mr-1"
                  />
                  <span className="text-gray-700 font-medium">+225</span>
                </div>
              </div>
              <input
                type="tel"
                id="telephone"
                {...register("telephone")}
                className="flex-1 p-3 bg-gray-50 border border-gray-300 rounded focus:ring-0 focus:outline-none"
              />
            </div>
            {errors.telephone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.telephone.message as string}
              </p>
            )}
          </div>

          <Button color="blue" weight="font-bold" padding="px-10" type="submit">
            Valider
          </Button>
        </form>
      </div>
    </div>
  );
}
