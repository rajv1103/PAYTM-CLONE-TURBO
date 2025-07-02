// apps/user-app/components/TextInput.tsx
"use client";

import React, { InputHTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";

type InputSize = "sm" | "md" | "lg";

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> {
  placeholder?: string;
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  inputSize?: InputSize;
  className?: string;
}

const sizeStyles: Record<InputSize, string> = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-4 py-2",
  lg: "text-lg px-5 py-3",
};

export function TextInput({
  placeholder = "",
  label,
  value = "",
  onChange,
  error,
  iconLeft,
  iconRight,
  inputSize = "md",
  className = "",
  ...rest
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const base = twMerge(
    "w-full bg-white border rounded-lg transition-all duration-200 outline-none",
    sizeStyles[inputSize],
    isFocused
      ? error
        ? "border-red-500 ring-1 ring-red-300"
        : "border-blue-500 ring-1 ring-blue-200"
      : error
      ? "border-red-500"
      : "border-gray-300",
    iconLeft ? "pl-10" : "",
    iconRight ? "pr-10" : "",
    className
  );

  return (
    <div className="relative w-full">
      {label && (
        <label
          className={twMerge(
            "absolute left-4 top-1/2 -translate-y-1/2 bg-white px-1 text-gray-500 transition-all pointer-events-none",
            isFocused || value
              ? "-translate-y-6 text-xs text-blue-600"
              : "text-base"
          )}
        >
          {label}
        </label>
      )}

      {iconLeft && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {iconLeft}
        </span>
      )}

      <input
        {...rest}
        className={base}
        value={value}
        placeholder={isFocused || value ? placeholder : ""}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => onChange(e.target.value)}
      />

      {iconRight && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          {iconRight}
        </span>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
