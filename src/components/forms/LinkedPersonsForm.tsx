"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { linkedPersonSchema } from "@/lib/validation";
import { useFormStore } from "@/lib/formStore";
import Button from "../Button";
import NavigationButtons from "../NavigationButtons";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

// Schema for the form's submission array
const linkedPersonsSchema = z.object({
  linkedPersons: z.array(linkedPersonSchema),
});

type LinkedPersonsFormData = z.infer<typeof linkedPersonsSchema>;

type Props = {
  onSubmit: () => void;
  handlePrevious: () => void;
};

export default function LinkedPersonsPage({ onSubmit, handlePrevious }: Props) {
  const { setLinkedPersons, formData } = useFormStore();

  console.log("before before", formData);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LinkedPersonsFormData>({
    resolver: zodResolver(linkedPersonsSchema),
    defaultValues: {
      linkedPersons:
        formData.linkedPersons.length > 0
          ? formData.linkedPersons
          : [{ id: 1, nom: "", role: "", telephone: "" }],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "linkedPersons",
  });

  const submitForm = (data: LinkedPersonsFormData) => {
    setLinkedPersons(data.linkedPersons as any);
    onSubmit();
  };

  const handleAddPerson = () => {
    append({
      nom: "",
      role: "",
      telephone: "",
    });
  };

  return (
    <>
      <h2 className="text-3xl md:text-4xl font-bold text-black text-center tracking-wider">
        Saisissez les informations des personnes
        <br />
        liées au véhicule
      </h2>
      <p className="text-center text-xl text-gray-600 mt-2 mb-10 tracking-wide">
        Ces personnes seront liées au véhicule et pourront s'identifier pour
        suivre l'activité du véhicule sur la plateforme du DAA.
      </p>

      <form
        id="linkedPersonsForm"
        onSubmit={handleSubmit(submitForm)}
        className="space-y-8 max-w-3xl mx-auto text-sm">
        <div className="bg-white shadow-sm rounded-xl p-8 space-y-6 w-full mb-5">
          {fields.map((field, index) => (
            <div key={field.id}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-blue">
                  Personne {index + 1}
                </h3>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700">
                    Supprimer
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="col-span-1 md:col-span-2">
                  <label className="block font-semibold text-gray-700 mb-2">
                    Nom et prénoms
                  </label>
                  <input
                    {...register(`linkedPersons.${index}.nom`)}
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded bg-gray-50"
                  />
                  {errors.linkedPersons?.[index]?.nom && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.linkedPersons[index]?.nom?.message}
                    </p>
                  )}
                </div>

                <div className="col-span-1">
                  <label className="block font-semibold text-gray-700 mb-2">
                    Rôle
                  </label>
                  <div className="relative">
                    <select
                      {...register(`linkedPersons.${index}.role`)}
                      className="w-full p-3 border border-gray-300 rounded bg-gray-50 appearance-none">
                      <option value="">Sélectionner un rôle</option>
                      <option value="Chauffeur">Chauffeur</option>
                      <option value="Gestionnaire">Gestionnaire</option>
                      <option value="Co-propriétaire">Co-propriétaire</option>
                      <option value="Autre">Autre</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <MdOutlineKeyboardArrowDown
                        className="text-gray-700"
                        size={25}
                      />
                    </div>
                  </div>
                  {errors.linkedPersons?.[index]?.role && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.linkedPersons[index]?.role?.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Numéro de téléphone
                    <span className="text-xs text-gray-500 font-normal ml-1">
                      (un lien sera envoyé par sms sur le numéro saisi pour la
                      confirmation de la personne)
                    </span>
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
                      {...register(`linkedPersons.${index}.telephone`)}
                      className="flex-1 p-3 bg-gray-50 border border-gray-300 rounded focus:ring-0 focus:outline-none"
                    />
                  </div>

                  {errors.linkedPersons?.[index]?.telephone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.linkedPersons[index]?.telephone?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            onClick={handleAddPerson}
            color="orange"
            weight="font-bold">
            <span className="font-bold mr-2">+</span> Ajouter une personne
          </Button>
        </div>
      </form>
      <div className="py-5 mt-4 max-w-3xl mx-auto">
        <NavigationButtons
          prevLabel="Précédent"
          nextLabel="Suivant"
          onPrevious={handlePrevious}
          formId="linkedPersonsForm"
        />
      </div>
    </>
  );
}
