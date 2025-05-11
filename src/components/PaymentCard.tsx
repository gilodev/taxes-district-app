"use client";

import Image from "next/image";
import React from "react";

interface PaymentCardProps {
  title: string | React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  title,
  imageSrc,
  imageAlt,
  imageWidth = 80,
  imageHeight = 80,
}) => {
  return (
    <div className="flex-1 px-8 py-5 bg-white rounded-lg shadow-sm relative flex flex-col">
      <h3 className="text-xl leading-6 font-medium text-gray-700 mb-5 text-left">
        {title}
      </h3>

      <div className="flex-grow"></div>

      <div className="flex items-start mb-6">
        <div className="h-20 w-full relative">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            className="object-contain w-full h-full"
            style={{ objectPosition: "left" }}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
