"use client";

import Button from "@/components/Button";

interface SummaryTaxFormProps {
  onSubmit: () => void;
}

export default function SummaryTaxForm({ onSubmit }: SummaryTaxFormProps) {
  const handlePay = () => {
    onSubmit();
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-gray">
            Taxe sur les taxis interurbains
            <br />
            ou ceux dotés d’un compteur
          </h1>
          <p className="text-sm text-gray-500 my-3">P E R I O D E</p>
          <p className="text-md text-gray-700 mb-8">Janvier - Février - Mars</p>
        </div>

        <div className="w-full bg-white p-8 shadow-sm rounded">
          <div className="mb-5">
            <p className="text-sm font-semibold text-gray-700">
              Dernier paiement effectué
            </p>
            <p className="text-sm text-gray-700">Période 04/2025 - 06/2025</p>
            <p className="text-sm text-gray-700">25 000 FCFA</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-5">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Plaque d'immatriculation
              </p>
              <div className="border border-orange-200 bg-orange-50 rounded-md text-sm p-3">
                AA 038 TY
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Modèle du véhicule
              </p>
              <div className="border border-orange-200 bg-orange-50 rounded-md text-sm p-3">
                Suzuki
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center border border-orange-200 bg-orange-50 rounded-md text-sm p-5 mb-5">
            <div>
              <p className="text-sm font-semibold text-gray-700">
                Somme restante à payer
              </p>
              <p className="text-sm text-gray-700">Période 04/2025 - 06/2025</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-orange">25 000 FCFA</p>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <Button
              color="blue"
              weight="font-bold"
              padding="px-10"
              onClick={handlePay}>
              Payer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
