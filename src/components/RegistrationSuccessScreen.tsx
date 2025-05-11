"use client";

import { useFormStore } from "@/lib/formStore";
import { FaCheck } from "react-icons/fa";

export default function RegistrationSuccessScreen() {
  const { formData } = useFormStore();
  const { ownerInfo } = formData;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white p-8 shadow-sm rounded">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-6 flex items-center justify-center w-22 h-22 bg-green-50 rounded-xl">
            <FaCheck className="text-green-500 text-5xl" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Enregistrement effectué !
          </h1>

          <p className="text-gray-600 text-lg mb-8">
            Des instructions ont été envoyées à{" "}
            <strong>
              {ownerInfo.typePerson === "physical"
                ? ownerInfo?.physical?.email || "-"
                : ownerInfo?.moral?.email || "-"}
            </strong>{" "}
            pour configurer votre compte.
          </p>
        </div>
      </div>
    </div>
  );
}
