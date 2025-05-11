"use client";

import { ArrowRight, ArrowUp } from "lucide-react";

interface ITaxCard {
  title: string | React.ReactNode;
  icon: string;
  category: string;
  categoryColor?: string;
  arrowPosition?: string;
}

const TaxCard = ({
  title,
  icon,
  category,
  categoryColor = "bg-orange-100 text-orange-500",
  arrowPosition = "left",
}: ITaxCard) => {
  return (
    <div className="flex-1 px-6 pt-6 pb-2 bg-white rounded-lg shadow-sm relative flex flex-col h-full">
      {/* Category badge */}
      <div
        className={`self-start px-2 py-1 rounded-full text-xs font-light mb-4 ${categoryColor}`}>
        {category}
      </div>

      <h3 className="text-md font-bold text-gray-700 mb-1 text-left">
        {title}
      </h3>

      {/* Flex grow pour pousser l'icône vers le bas et assurer l'alignement */}
      <div className="flex-grow"></div>

      <div className="flex items-start mb-4">
        <img
          src={icon}
          alt={typeof title === "string" ? title : "tax icon"}
          className="h-16 w-16 text-orange-500"
        />
      </div>

      {arrowPosition === "right" ? (
        <div className="absolute top-2 right-3">
          <ArrowUp size={40} className="text-orange-400" />
        </div>
      ) : (
        <div className="absolute bottom-2 right-3">
          <ArrowRight size={40} className="text-gray-300" />
        </div>
      )}
    </div>
  );
};

export default TaxCard;
