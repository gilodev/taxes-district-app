"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FileUpload from "@/components/FileUpload";
import { physicalPersonSchema, moralPersonSchema } from "@/lib/validation";
import { useFormStore } from "@/lib/formStore";
import { PhysicalPerson, MoralPerson } from "@/types";
import CustomRadioButton from "../CustomRadioButton";
import NavigationButtons from "../NavigationButtons";
import { useEffect, useRef, useState } from "react";

type Props = {
  onSubmit: () => void;
  handlePrevious: () => void;
};

export default function OwnerInfoPage({ onSubmit, handlePrevious }: Props) {
  const { setPersonType, setPhysicalPerson, setMoralPerson, formData } =
    useFormStore();

  // Separate file states for each person type
  const [physicalFileName, setPhysicalFileName] = useState<string | null>(null);
  const [moralFileName, setMoralFileName] = useState<string | null>(null);

  const physicalFileRef = useRef<any>(null);
  const moralFileRef = useRef<any>(null);

  // Track validation errors for display when Next button is clicked
  const [showPhysicalErrors, setShowPhysicalErrors] = useState(false);
  const [showMoralErrors, setShowMoralErrors] = useState(false);

  // Determine the current person type from store
  const personType = formData.ownerInfo.typePerson;

  // Setup forms for both types
  const physicalForm = useForm<PhysicalPerson>({
    resolver: zodResolver(physicalPersonSchema) as any,
    defaultValues: formData.ownerInfo.physical || {
      nom: "",
      prenoms: "",
      cni: "",
      telephone: "",
      email: "",
    },
    mode: "onChange",
  });

  const moralForm = useForm<MoralPerson>({
    resolver: zodResolver(moralPersonSchema) as any,
    defaultValues: formData.ownerInfo.moral || {
      rccm: "",
      telephone: "",
      email: "",
    },
    mode: "onChange",
  });

  // Handling person type change
  const handlePersonTypeChange = (type: "physical" | "moral") => {
    if (type === personType) return;

    // Clear form data of the non-selected type
    if (type === "physical") {
      // Clear moral person data
      setMoralPerson({
        rccm: "",
        telephone: "",
        email: "",
        rccmFile: undefined,
      });
      setMoralFileName(null);
      moralForm.reset({
        rccm: "",
        telephone: "",
        email: "",
      });
      setShowMoralErrors(false);
    } else {
      // Clear physical person data
      setPhysicalPerson({
        nom: "",
        prenoms: "",
        cni: "",
        telephone: "",
        email: "",
        cniFile: undefined,
      });
      setPhysicalFileName(null);
      physicalForm.reset({
        nom: "",
        prenoms: "",
        cni: "",
        telephone: "",
        email: "",
      });
      setShowPhysicalErrors(false);
    }

    // Set the new person type
    setPersonType(type);
  };

  // Submit handler for physical person
  const submitPhysicalForm: any = (data: PhysicalPerson) => {
    setPhysicalPerson(data);

    onSubmit();
  };

  // Submit handler for moral person
  const submitMoralForm: any = (data: MoralPerson) => {
    setMoralPerson(data);

    onSubmit();
  };

  useEffect(() => {
    const hasPhysicalData =
      formData.ownerInfo.physical &&
      (formData.ownerInfo.physical.nom ||
        formData.ownerInfo.physical.prenoms ||
        formData.ownerInfo.physical.cni ||
        formData.ownerInfo.physical.telephone);

    const hasMoralData =
      formData.ownerInfo.moral &&
      (formData.ownerInfo.moral.rccm || formData.ownerInfo.moral.telephone);

    // Définir le type en fonction des données disponibles
    if (hasPhysicalData && !hasMoralData && personType !== "physical") {
      setPersonType("physical");
    } else if (hasMoralData && !hasPhysicalData && personType !== "moral") {
      setPersonType("moral");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.ownerInfo, personType]);

  useEffect(() => {
    if (personType === "physical" && formData.ownerInfo.physical) {
      Object.entries(formData.ownerInfo.physical).forEach(([key, value]) => {
        if (key !== "cniFile" && value) {
          physicalForm.setValue(key as any, value);
        }
      });
    } else if (personType === "moral" && formData.ownerInfo.moral) {
      Object.entries(formData.ownerInfo.moral).forEach(([key, value]) => {
        if (key !== "rccmFile" && value) {
          moralForm.setValue(key as any, value);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personType, formData.ownerInfo.physical, formData.ownerInfo.moral]);

  // Update selected file name when form data changes
  useEffect(() => {
    // Only update physical file if we're on physical person type
    if (personType === "physical" && formData.ownerInfo.physical?.cniFile) {
      setPhysicalFileName(formData.ownerInfo.physical.cniFile.name);
      physicalForm.setValue("cniFile", formData.ownerInfo.physical.cniFile);
    }

    // Only update moral file if we're on moral person type
    if (personType === "moral" && formData.ownerInfo.moral?.rccmFile) {
      setMoralFileName(formData.ownerInfo.moral.rccmFile.name);
      moralForm.setValue("rccmFile", formData.ownerInfo.moral.rccmFile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    personType,
    formData.ownerInfo.physical?.cniFile,
    formData.ownerInfo.moral?.rccmFile,
  ]);

  // Handle file upload for CNI
  const handleFileUploadCNI = (file: File) => {
    physicalForm.setValue("cniFile", file);
    setPhysicalFileName(file.name);
  };

  // Handle file upload for RCCM
  const handleFileUploadRCCM = (file: File) => {
    moralForm.setValue("rccmFile", file);
    setMoralFileName(file.name);
  };

  return (
    <>
      <h2 className="text-2xl md:text-4xl font-bold text-black text-center tracking-wider">
        Saisissez les informations du propriétaire
      </h2>
      <p className="text-center text-xl text-gray-600 mt-2 mb-10 tracking-wide">
        Saisissez exactement les informations inscrites sur la carte grise du
        véhicule
      </p>

      <div className="space-y-8 max-w-3xl mx-auto text-sm">
        <div className="bg-white shadow-sm rounded-xl p-8 space-y-6 w-full">
          <div className="flex space-x-6 mb-6">
            <CustomRadioButton
              label="Personne physique"
              value="physical"
              name="typePerson"
              checked={personType === "physical"}
              onChange={() => handlePersonTypeChange("physical")}
            />
            <CustomRadioButton
              label="Personne moral (Entreprise)"
              value="moral"
              name="typePerson"
              checked={personType === "moral"}
              onChange={() => handlePersonTypeChange("moral")}
            />
          </div>

          {personType === "physical" ? (
            <form
              id="physicalPersonForm"
              onSubmit={(e) => {
                e.preventDefault();
                setShowPhysicalErrors(true);
                physicalForm.handleSubmit(submitPhysicalForm)();
              }}
              className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="nom"
                    className="block font-semibold text-gray-700 mb-2">
                    Nom
                  </label>
                  <input
                    {...physicalForm.register("nom")}
                    type="text"
                    id="nom"
                    className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                    placeholder="KONAN"
                  />
                  {showPhysicalErrors && physicalForm.formState.errors.nom && (
                    <p className="text-red-500 text-sm mt-1">
                      {physicalForm.formState.errors.nom.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="prenoms"
                    className="block font-semibold text-gray-700 mb-2">
                    Prénoms
                  </label>
                  <input
                    {...physicalForm.register("prenoms")}
                    type="text"
                    id="prenoms"
                    className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                    placeholder="Kouadio Emmanuel"
                  />
                  {showPhysicalErrors &&
                    physicalForm.formState.errors.prenoms && (
                      <p className="text-red-500 text-sm mt-1">
                        {physicalForm.formState.errors.prenoms.message}
                      </p>
                    )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="cni"
                    className="block font-semibold text-gray-700 mb-2">
                    Numéro de CNI
                  </label>
                  <input
                    {...physicalForm.register("cni")}
                    type="text"
                    id="cni"
                    className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                  />
                  {showPhysicalErrors && physicalForm.formState.errors.cni && (
                    <p className="text-red-500 text-sm mt-1">
                      {physicalForm.formState.errors.cni.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="telephone_physical"
                    className="block font-semibold text-gray-700 mb-2">
                    Numéro de téléphone
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
                      id="telephone_physical"
                      {...physicalForm.register("telephone")}
                      className="flex-1 p-3 bg-gray-50 border border-gray-300 rounded focus:ring-0 focus:outline-none"
                    />
                  </div>
                  {showPhysicalErrors &&
                    physicalForm.formState.errors.telephone && (
                      <p className="text-red-500 text-sm mt-1">
                        {physicalForm.formState.errors.telephone.message}
                      </p>
                    )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email_physical"
                  className="block font-semibold text-gray-700 mb-2">
                  Adresse e-mail
                </label>
                <input
                  {...physicalForm.register("email")}
                  type="email"
                  id="email_physical"
                  className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                />
                {showPhysicalErrors && physicalForm.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {physicalForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <FileUpload
                ref={physicalFileRef}
                label={
                  physicalFileName ? (
                    <span>
                      Fichier sélectionné :{" "}
                      <span className="font-semibold">{physicalFileName}</span>
                      <span className="text-gray-500">
                        {" "}
                        (Cliquez pour changer)
                      </span>
                    </span>
                  ) : (
                    <>
                      Cliquez ici pour Joindre{" "}
                      <span className="text-gray-500 font-bold">votre CNI</span>{" "}
                      ou glissez-déposer
                    </>
                  )
                }
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUploadCNI}
              />
              {showPhysicalErrors && physicalForm.formState.errors.cniFile && (
                <p className="text-red-500 text-sm mt-1">
                  {physicalForm.formState.errors.cniFile.message}
                </p>
              )}
            </form>
          ) : (
            <form
              id="moralPersonForm"
              onSubmit={(e) => {
                e.preventDefault();
                setShowMoralErrors(true);
                moralForm.handleSubmit(submitMoralForm)();
              }}
              className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <label
                    htmlFor="rccm"
                    className="block font-semibold text-gray-700 mb-2">
                    Numéro RCCM
                  </label>
                  <input
                    {...moralForm.register("rccm")}
                    type="text"
                    id="rccm"
                    className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                  />
                  {showMoralErrors && moralForm.formState.errors.rccm && (
                    <p className="text-red-500 text-sm mt-1">
                      {moralForm.formState.errors.rccm.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="telephone_moral"
                    className="block font-semibold text-gray-700 mb-2">
                    Numéro de téléphone
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
                      id="telephone_moral"
                      {...moralForm.register("telephone")}
                      className="flex-1 p-3 bg-gray-50 border border-gray-300 rounded focus:ring-0 focus:outline-none"
                    />
                  </div>
                  {showMoralErrors && moralForm.formState.errors.telephone && (
                    <p className="text-red-500 text-sm mt-1">
                      {moralForm.formState.errors.telephone.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email_moral"
                  className="block font-semibold text-gray-700 mb-2">
                  Adresse e-mail
                </label>
                <input
                  {...moralForm.register("email")}
                  type="email"
                  id="email_moral"
                  className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                />
                {showMoralErrors && moralForm.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {moralForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <FileUpload
                ref={moralFileRef}
                label={
                  moralFileName ? (
                    <span>
                      Fichier sélectionné :{" "}
                      <span className="font-semibold">{moralFileName}</span>
                      <span className="text-gray-500">
                        {" "}
                        (Cliquez pour changer)
                      </span>
                    </span>
                  ) : (
                    <>
                      Cliquez ici pour Joindre{" "}
                      <span className="text-gray-500 font-bold">
                        votre RCCM
                      </span>{" "}
                      ou glissez-déposer
                    </>
                  )
                }
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUploadRCCM}
              />
              {showMoralErrors && moralForm.formState.errors.rccmFile && (
                <p className="text-red-500 text-sm mt-1">
                  {moralForm.formState.errors.rccmFile.message}
                </p>
              )}
            </form>
          )}
        </div>
      </div>

      <div className="py-5 mt-4 max-w-3xl mx-auto">
        <NavigationButtons
          prevLabel="Précédent"
          nextLabel="Suivant"
          onPrevious={handlePrevious}
          formId={
            personType === "physical" ? "physicalPersonForm" : "moralPersonForm"
          }
        />
      </div>
    </>
  );
}
