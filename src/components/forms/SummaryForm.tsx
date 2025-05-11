"use client";

import { useFormStore } from "@/lib/formStore";
import { MdAttachFile, MdOutlineKeyboardArrowDown } from "react-icons/md";
import NavigationButtons from "../NavigationButtons";

type Props = {
  onSubmit: () => void;
  handlePrevious: () => void;
  isLoading?: boolean;
};

export default function SummaryForm({
  onSubmit,
  handlePrevious,
  isLoading = false,
}: Props) {
  const { formData } = useFormStore();
  const { vehicleInfo, ownerInfo, linkedPersons } = formData;

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Résumé
      </h2>

      {/* Informations du véhicule */}
      <div className="bg-white shadow-sm rounded-xl p-8 w-full mb-6 ">
        <h3 className="text-md text-orange-500 mb-6 font-semibold">
          Informations du véhicule
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-6">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Marque du véhicule
            </p>
            <div className="border border-orange-200 bg-orange-50 rounded-md text-sm p-3">
              {vehicleInfo.marque || "-"}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Modèle du véhicule
            </p>
            <div className="border border-orange-200 bg-orange-50 rounded-md text-sm p-3">
              {vehicleInfo.modele || "-"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-6">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Date de mise en circulation
            </p>
            <div className="border border-orange-200 bg-orange-50 rounded-md text-sm p-3">
              {vehicleInfo.dateCirculation || "-"}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Numéro de carte grise
            </p>
            <div className="border border-orange-200 bg-orange-50 rounded-md text-sm p-3">
              {vehicleInfo.carteGrise || "-"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 mb-6">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Utilisation
            </p>
            <div className="border border-orange-200 bg-orange-50 rounded-md text-sm p-3">
              {vehicleInfo.utilisation || "-"}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Préciser</p>
            <div className="border border-orange-200 bg-orange-50 rounded-md text-sm p-3">
              {vehicleInfo.preciser || "-"}
            </div>
          </div>

          <div className="flex items-end">
            <div className="bg-gray-500 rounded-md text-sm text-gray-50 font-semibold p-3 flex items-center justify-center w-full">
              <MdAttachFile className="mr-2 opacity-60" size={20} />
              <span className="text-sm opacity-60">carte grise</span>
            </div>
          </div>
        </div>
      </div>

      {/* Type de personne */}
      <div className="bg-white shadow-sm rounded-xl p-8 w-full mb-6">
        <h3 className="text-md font-semibold text-orange-500 mb-6">
          Type de personne
        </h3>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="border border-orange-200 bg-orange-50 relative rounded-md text-sm p-3">
            <span>
              {ownerInfo.typePerson === "physical"
                ? "Personne physique"
                : "Personne morale (Entreprise)"}
            </span>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <MdOutlineKeyboardArrowDown
                className="text-orange h-5"
                size={25}
              />
            </div>
          </div>
        </div>

        {ownerInfo.typePerson === "physical" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">Nom</p>
              <div className="border border-orange-200 bg-orange-50 rounded-md text-sm p-3">
                {ownerInfo?.physical?.nom || "-"}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Prénoms
              </p>
              <div className="border border-orange-200 bg-orange-50 rounded-md text-sm p-3">
                {ownerInfo?.physical?.prenoms || "-"}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Numéro CNI
              </p>
              <div className="border border-orange-200 bg-orange-50 rounded-md text-sm p-3">
                {ownerInfo?.physical?.cni || "-"}
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Numéro RCCM
            </p>
            <div className="border border-orange-200 bg-orange-50 rounded-md text-sm p-3">
              {ownerInfo?.moral?.rccm || "-"}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Numéro de téléphone
            </p>
            <div className="border border-orange-200 bg-orange-50 rounded-md text-sm p-3">
              {ownerInfo.typePerson === "physical"
                ? ownerInfo?.physical?.telephone || "-"
                : ownerInfo?.moral?.telephone || "-"}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Adresse e-mail
            </p>
            <div className="border border-orange-200 bg-orange-50 rounded-md text-sm p-3">
              {ownerInfo.typePerson === "physical"
                ? ownerInfo?.physical?.email || "-"
                : ownerInfo?.moral?.email || "-"}
            </div>
          </div>
        </div>
      </div>

      {/* Personnes liées */}
      {linkedPersons.length > 0 &&
        linkedPersons.map((person, index) => (
          <div
            key={index}
            className="bg-white shadow-sm rounded-xl p-8 w-full mb-6">
            <h3 className="text-md font-semibold text-orange-500 mb-6">
              Personne {index + 1}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-5">
              <div className="col-span-1 md:col-span-2">
                <p className="text-sm font-semibold text-gray-700 mb-1">Nom</p>
                <div className="border border-orange-200 bg-orange-50 rounded-md text-sm p-3">
                  {person.nom || "-"}
                </div>
              </div>

              <div className="col-span-1 md:col-span-1">
                <p className="text-sm font-semibold text-gray-700 mb-1">Rôle</p>
                <div className="border border-orange-200 bg-orange-50 rounded-md text-sm p-3">
                  {person.role || "-"}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Numéro de téléphone
                </p>
                <div className="border border-orange-200 bg-orange-50 rounded-md text-sm p-3">
                  {person.telephone || "-"}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Adresse e-mail
                </p>
                <div className="border border-orange-200 bg-orange-50 rounded-md text-sm p-3">
                  -
                </div>
              </div>
            </div>
          </div>
        ))}
      <div className="py-5 mt-4">
        <NavigationButtons
          prevLabel="Retour"
          nextLabel="Valider"
          isLoading={isLoading}
          loadingText="Enregistrement..."
          onPrevious={handlePrevious}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
