"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  isOpen,
  onClick,
}) => {
  return (
    <div className="bg-white p-5 mb-5 rounded-lg shadow-sm">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={onClick}>
        <span className="font-medium text-gray-700 text-md">{question}</span>
        <ChevronDown
          className={`text-gray-500 transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          size={20}
        />
      </button>

      {isOpen && (
        <div className="mt-4 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: "Comment payer une taxe transport",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla rhoncus orci, eu eleifend neque pellentesque non. Donec nibh massa, pretium eget euismod vel, tristique sit amet purus. Sed eu ultricies elit, non eleifend nisi. Ut id posuere nibh. In ut rhoncus libero. Duis iaculis augue id nisi condimentum vulputate.",
    },
    {
      question: "Quels sont les délais de paiement pour les taxes",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla rhoncus orci, eu eleifend neque pellentesque non. Donec nibh massa, pretium eget euismod vel, tristique sit amet purus. Sed eu ultricies elit, non eleifend nisi. Ut id posuere nibh. In ut rhoncus libero. Duis iaculis augue id nisi condimentum vulputate.",
    },
    {
      question: "Comment obtenir un reçu de paiement",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla rhoncus orci, eu eleifend neque pellentesque non. Donec nibh massa, pretium eget euismod vel, tristique sit amet purus. Sed eu ultricies elit, non eleifend nisi. Ut id posuere nibh. In ut rhoncus libero. Duis iaculis augue id nisi condimentum vulputate.",
    },
    {
      question: "Que faire en cas de difficulté technique",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla rhoncus orci, eu eleifend neque pellentesque non. Donec nibh massa, pretium eget euismod vel, tristique sit amet purus. Sed eu ultricies elit, non eleifend nisi. Ut id posuere nibh. In ut rhoncus libero. Duis iaculis augue id nisi condimentum vulputate.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full pb-15 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 tracking-wide text-center leading-10 text-gray-700">
          Questions fréquentes
        </h2>

        <div>
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
