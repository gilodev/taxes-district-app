"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FileUpload from "@/components/FileUpload";
import CustomRadioButton from "@/components/CustomRadioButton";
import { vehicleInfoSchema } from "@/lib/validation";
import { useFormStore } from "@/lib/formStore";
import { VehicleInfo } from "@/types";
import NavigationButtons from "../NavigationButtons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useRef } from "react";

type Props = {
  onSubmit: () => void;
  handlePrevious: () => void;
};

export default function VehicleInfoPage({ onSubmit, handlePrevious }: Props) {
  const { setVehicleInfo, formData } = useFormStore();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileUploadRef = useRef<any>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<VehicleInfo>({
    resolver: zodResolver(vehicleInfoSchema),
    defaultValues: formData.vehicleInfo,
    mode: "onChange",
  });

  const utilisation = watch("utilisation");

  useEffect(() => {
    // Reset the "préciser" field when utilisation is not "Autres"
    if (utilisation !== "Autres") {
      setValue("preciser", "");
    }
  }, [utilisation, setValue]);

  // Initialize date and file if available in form data
  useEffect(() => {
    // Initialize date
    if (formData.vehicleInfo.dateCirculation) {
      // Try to parse the date from dd - MM - yyyy format
      const dateParts = formData.vehicleInfo.dateCirculation.split(" - ");
      if (dateParts.length === 3) {
        const day = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; // Months are 0-indexed in JS Date
        const year = parseInt(dateParts[2]);
        if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
          setSelectedDate(new Date(year, month, day));
        }
      }
    }

    // Initialize file name if available
    if (formData.vehicleInfo.carteGriseFile) {
      setSelectedFileName(formData.vehicleInfo.carteGriseFile.name);
    }
  }, [
    formData.vehicleInfo.dateCirculation,
    formData.vehicleInfo.carteGriseFile,
  ]);

  const submitForm = (data: VehicleInfo) => {
    // Check if the file is uploaded
    if (!data.carteGriseFile) {
      setFileError("La carte grise est requise");
      return;
    }

    setVehicleInfo(data);
    onSubmit();
  };

  const handleFileUpload = (file: File) => {
    setValue("carteGriseFile", file);
    setSelectedFileName(file.name);
    setFileError(null);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      // Format ISO 8601 pour l'API
      const isoFormat = format(date, "yyyy-MM-dd");

      setValue("dateCirculation", isoFormat);
    } else {
      setValue("dateCirculation", "");
    }
  };

  return (
    <>
      <h2 className="text-2xl md:text-4xl font-bold text-black text-center tracking-wider">
        Saisissez les informations du véhicule
      </h2>
      <p className="text-center text-xl text-gray-600 mt-2 mb-10 tracking-wide">
        Saisissez exactement les informations inscrites sur la carte grise du
        véhicule
      </p>

      <form
        id="vehicleInfoForm"
        onSubmit={handleSubmit(submitForm)}
        className="max-w-3xl mx-auto text-sm">
        <div className="bg-white shadow-sm rounded-xl p-8 space-y-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="marque"
                className="block font-semibold text-gray-700 mb-2">
                Marque du véhicule
              </label>
              <input
                {...register("marque")}
                type="text"
                id="marque"
                className="w-full p-3 border border-gray-300 rounded"
                placeholder="Suzuki"
              />
              {errors.marque && (
                <p className="text-red-500 mt-1">{errors.marque.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="modele"
                className="block font-semibold text-gray-700 mb-2">
                Modèle du véhicule
              </label>
              <input
                {...register("modele")}
                type="text"
                id="modele"
                className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                placeholder="Dzire"
              />
              {errors.modele && (
                <p className="text-red-500 mt-1">{errors.modele.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="dateCirculation"
                className="block font-semibold text-gray-700 mb-2">
                Date de mise en circulation
              </label>
              <div className="w-full">
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd - MM - yyyy"
                  className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                  placeholderText="JJ - MM - AAAA"
                  locale={fr}
                  id="dateCirculation"
                  wrapperClassName="w-full"
                />
              </div>
              <input type="hidden" {...register("dateCirculation")} />
              {errors.dateCirculation && (
                <p className="text-red-500 mt-1">
                  {errors.dateCirculation.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="carteGrise"
                className="block font-semibold text-gray-700 mb-2">
                Numéro de carte grise
              </label>
              <input
                {...register("carteGrise")}
                type="text"
                id="carteGrise"
                className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                placeholder="050000000"
              />
              {errors.carteGrise && (
                <p className="text-red-500 mt-1">{errors.carteGrise.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-5">
                Utilisation
              </label>
              <div className="flex space-x-4">
                <CustomRadioButton
                  label="VTC"
                  value="VTC"
                  name="utilisation"
                  register={register}
                />

                <CustomRadioButton
                  label="Taxi inter urbain"
                  value="Taxi inter urbain"
                  name="utilisation"
                  register={register}
                />

                <CustomRadioButton
                  label="Autres"
                  value="Autres"
                  name="utilisation"
                  register={register}
                />
              </div>
              {errors.utilisation && (
                <p className="text-red-500 mt-1">
                  {errors.utilisation.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="preciser"
                className="block font-semibold text-gray-700 mb-2">
                Préciser
              </label>
              <input
                {...register("preciser")}
                type="text"
                id="preciser"
                className="w-full p-3 border border-gray-300 rounded"
                disabled={utilisation !== "Autres"}
              />
            </div>
          </div>

          <div>
            <FileUpload
              ref={fileUploadRef}
              label={
                selectedFileName ? (
                  <span>
                    Fichier sélectionné :{" "}
                    <span className="font-semibold">{selectedFileName}</span>
                    <span className="text-gray-500">
                      {" "}
                      (Cliquez pour changer)
                    </span>
                  </span>
                ) : (
                  <>
                    Cliquez ici pour Joindre{" "}
                    <span className="text-gray-500 font-bold">
                      votre carte grise
                    </span>{" "}
                    ou glissez-déposer
                  </>
                )
              }
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
            />
            {fileError && <p className="text-red-500 mt-1">{fileError}</p>}
          </div>
        </div>
      </form>
      <div className="py-5 mt-4 max-w-3xl mx-auto">
        <NavigationButtons
          prevLabel="Précédent"
          nextLabel="Suivant"
          onPrevious={handlePrevious}
          formId="vehicleInfoForm"
        />
      </div>
    </>
  );
}
