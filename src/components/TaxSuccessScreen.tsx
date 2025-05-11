"use client";

import { FaCheck } from "react-icons/fa";
import Button from "./Button";
import { MdOutlineFileDownload } from "react-icons/md";

export default function TaxSuccessScreen() {
  const getAttestation = () => {};

  const getMacaron = () => {};

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray mb-3">
          Taxe sur les taxis interurbains
          <br />
          ou ceux dotés d’un compteur
        </h1>
        <p className="text-md text-gray-700 mb-8">Confirmation du paiement</p>
      </div>
      <div className="bg-white p-8 shadow-sm rounded-lg mb-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-6 flex items-center justify-center w-24 h-24 bg-green-100 rounded-xl">
            <FaCheck className="text-green-500 text-5xl" />
          </div>
          <p className="text-md text-gray-700 text-green-500 text-center">
            Paiement accepté
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
        <div className="col-span-1 md:col-span-2">
          <Button
            size="lg"
            className="w-full"
            color="orange"
            onClick={getAttestation}
            weight="font-bold">
            Attestation d'acquittement
            <MdOutlineFileDownload size={25} className="ml-2" />
          </Button>
        </div>
        <div className="col-span-1">
          <Button
            size="lg"
            className="w-full bg-orange-50"
            variant="outline"
            onClick={getMacaron}
            color="orange"
            weight="font-bold">
            Macaron <MdOutlineFileDownload size={25} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
