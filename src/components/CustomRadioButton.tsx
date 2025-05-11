import React from "react";
import { UseFormRegister } from "react-hook-form";

interface CustomRadioButtonProps {
  label: string;
  value: string;
  name: string;
  register?: UseFormRegister<any> | (() => void);
  disabled?: boolean;
  checked?: boolean;
  onChange?: (value: string) => void;
}

export default function CustomRadioButton({
  label,
  value,
  name,
  register,
  disabled = false,
  checked,
  onChange,
}: CustomRadioButtonProps) {
  const handleChange = () => {
    if (onChange && !disabled) {
      onChange(value);
    }
  };

  const registerProps = React.useMemo((): Record<string, any> => {
    if (typeof register === "function") {
      if ("name" in register && register.name !== "") {
        try {
          const result = register(name);

          return result && typeof result === "object" ? result : {};
        } catch {
          return {};
        }
      }
    }
    return {};
  }, [register, name]);

  return (
    <label
      className={`inline-flex items-center cursor-pointer group ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      }`}>
      <div className="relative flex items-center justify-center">
        <input
          type="radio"
          value={value}
          disabled={disabled}
          checked={checked}
          {...registerProps}
          onChange={(e) => {
            if (
              registerProps &&
              "onChange" in registerProps &&
              typeof registerProps.onChange === "function"
            ) {
              registerProps.onChange(e);
            }
            handleChange();
          }}
          className="sr-only peer"
        />
        <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:bg-orange-500 transition-colors duration-200">
          <div className="w-5 h-5 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500 opacity-0 scale-0 peer-checked:opacity-100 peer-checked:scale-100 transition-all duration-200"></div>
          </div>
        </div>
      </div>
      <span className="ml-2 text-sm">{label}</span>
    </label>
  );
}
