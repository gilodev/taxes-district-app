"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import SpinLoading from "./spin-loading";

type ColorVariant = "blue" | "orange";
type IconPosition = "left" | "right";
type ButtonType = "button" | "submit" | "reset";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  color?: ColorVariant;
  className?: string;
  icon?: LucideIcon;
  iconPosition?: IconPosition;
  iconClassName?: string;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
  weight?: string;
  padding?: string;
  disabled?: boolean;
  type?: ButtonType;
  form?: string;
  isLoading?: boolean;
  loadingText?: string;
}

const Button = ({
  href,
  onClick,
  children,
  variant = "primary",
  color = "orange",
  className = "",
  icon: Icon,
  iconPosition = "left",
  iconClassName = "",
  fullWidth = false,
  size = "md",
  weight = "font-light",
  padding,
  disabled = false,
  type = "button",
  form,
  isLoading = false,
  loadingText = "Chargement...",
}: ButtonProps) => {
  const baseStyles =
    "rounded-md flex items-center justify-center transition-all duration-200 ease-in-out";

  // Size variations
  const sizeStyles = {
    sm: `text-xs py-2 ${padding || "px-3"}`,
    md: `text-sm py-3 ${padding || "px-5"}`,
    lg: `text-lg py-3.5 ${padding || "px-6"}`,
  };

  // Color maps for primary and outline variants
  const colorMap = {
    blue: {
      primary: "bg-blue hover:bg-blue-500 text-white",
      outline: "border border-blue text-blue hover:bg-blue-50",
    },
    orange: {
      primary: "bg-orange hover:bg-orange-500 text-white",
      outline: "border border-orange text-orange hover:bg-orange-50",
    },
  };

  const colorStyles = colorMap[color][variant];

  const widthClass = fullWidth ? "w-full" : "";

  // Disabled styles
  const disabledStyles =
    disabled || isLoading
      ? "opacity-50 cursor-not-allowed pointer-events-none"
      : "";

  const allStyles = `${baseStyles} ${colorStyles} ${sizeStyles[size]} ${weight} ${widthClass} ${disabledStyles} ${className}`;

  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20,
  };

  const iconSpacing = {
    sm: "mr-1",
    md: "mr-2",
    lg: "mr-2",
  };

  // Contenu normal
  const normalContent = (
    <>
      {Icon && iconPosition === "left" && (
        <Icon
          size={iconSizes[size]}
          className={`${iconSpacing[size]} ${iconClassName}`}
        />
      )}
      {children}
      {Icon && iconPosition === "right" && (
        <Icon size={iconSizes[size]} className={`ml-2 ${iconClassName}`} />
      )}
    </>
  );

  // Loading Content
  const loadingContent = (
    <div className="flex items-center justify-center">
      <SpinLoading />
      {loadingText}
    </div>
  );

  const content = isLoading ? loadingContent : normalContent;

  // Return Link or Button based on href prop
  if (href && !disabled && !isLoading) {
    return (
      <Link href={href} className={allStyles}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={allStyles}
      disabled={disabled || isLoading}
      type={type}
      form={form}>
      {content}
    </button>
  );
};

export default Button;
