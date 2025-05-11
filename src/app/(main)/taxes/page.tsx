"use client";

import TaxCard from "@/components/TaxCard";
import { taxesRow1, taxesRow2 } from "@/lib/data";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TaxPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const goBack = () => {
    router.push("/");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
          Choisir la catégorie de votre taxe
        </h1>

        {/* Search bar */}
        <div className="relative mb-16 max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="Immatriculation du vehicule"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full px-4 py-3 text-gray-500 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-100"
          />
          <button className="absolute right-0 top-0 h-full bg-orange-400 hover:bg-orange-500 px-6 rounded-r-md flex items-center justify-center">
            <span className="text-white mr-2">Rechercher</span>
            <Search size={20} className="text-white" />
          </button>
        </div>

        {/* Tax cards grid - using grid layout for consistent spacing */}
        <div className="w-full mx-auto mb-12">
          {/* First row - 3 cards with equal spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {taxesRow1.map((tax) => (
              <div key={tax.id} className="flex justify-center">
                <div className="w-full" style={{ maxWidth: "280px" }}>
                  <TaxCard
                    title={tax.title}
                    icon={tax.icon}
                    category={tax.category}
                    arrowPosition="right"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Second row - 2 cards centered with specific spacing */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full sm:w-2/3">
              {taxesRow2.map((tax) => (
                <div key={tax.id} className="flex justify-center">
                  <div className="w-full" style={{ maxWidth: "280px" }}>
                    <TaxCard
                      title={tax.title}
                      icon={tax.icon}
                      category={tax.category}
                      arrowPosition="right"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <button
            onClick={goBack}
            className="py-3 font-bold text-gray-500 flex items-center hover:text-gray-700 transition-colors">
            <span className="mr-2">{"<"}</span>Retour
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaxPage;
