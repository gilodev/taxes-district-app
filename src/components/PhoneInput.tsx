import React, { useState, useEffect } from "react";

interface PhoneInputProps {
  countryCode: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function PhoneInput({
  countryCode,
  value,
  onChange,
  className = "",
}: PhoneInputProps) {
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    // Format the phone number for display
    const phoneWithoutCode = value.replace(countryCode, "");
    setDisplayValue(phoneWithoutCode);
  }, [value, countryCode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    onChange(`${countryCode}${newValue}`);
  };

  return (
    <div
      className={`flex items-center border border-gray-300 rounded overflow-hidden ${className}`}>
      <div className="bg-gray-100 px-3 py-3 text-gray-700 border-r border-gray-300">
        {countryCode}
      </div>
      <input
        type="text"
        value={displayValue}
        onChange={handleChange}
        className="flex-1 p-3 focus:outline-none"
        placeholder="00 00 00 00"
      />
    </div>
  );
}
