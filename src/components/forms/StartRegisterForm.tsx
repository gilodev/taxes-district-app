"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { licensePlateSchema } from "@/lib/validation";
import { useFormStore } from "@/lib/formStore";
import Image from "next/image";
import Button from "@/components/Button";

interface StartRegisterFormProps {
  onStart: () => void;
}

export default function StartRegisterForm({ onStart }: StartRegisterFormProps) {
  const setLicensePlate = useFormStore((state) => state.setLicensePlate);
  const storedLicensePlate = useFormStore(
    (state) => state.formData.licensePlate
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(licensePlateSchema),
    defaultValues: {
      licensePlate: storedLicensePlate || "",
    },
  });

  const submitForm = (data: { licensePlate: string }) => {
    setLicensePlate(data.licensePlate);
    onStart();
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue mb-2">
            Bienvenue sur l'espace
            <br />
            d'enregistrement de véhicule
          </h1>

          <p className="text-xl mt-4">
            Saisissez le numéro d'immatriculation de votre véhicule et commencez
          </p>
        </div>

        {/* Plates container - centered with fixed width */}
        <div className="flex justify-center items-center my-12 w-full max-w-lg">
          <div className="flex-1">
            <Image
              src="/images/plaque1.svg"
              alt="Plaque 1"
              width={100}
              height={20}
              className="object-contain w-full h-10"
            />
          </div>

          <div className="flex-1">
            <Image
              src="/images/plaque2.svg"
              alt="Plaque 2"
              width={100}
              height={20}
              className="object-contain w-full h-10"
            />
          </div>
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
              className="w-full p-3 border border-gray-300 bg-gray-50 rounded"
              placeholder="AA - 020 - AA"
            />
            {errors.licensePlate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.licensePlate.message as string}
              </p>
            )}
          </div>

          <Button color="blue" weight="font-bold" padding="px-10" type="submit">
            Commencer
          </Button>
        </form>
      </div>
    </div>
  );
}
