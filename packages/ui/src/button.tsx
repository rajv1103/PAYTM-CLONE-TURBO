"use client";

import { ReactNode, MouseEvent } from "react";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: Variant;
  size?: Size;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  primary: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-400",
  secondary: "bg-gray-200 hover:bg-gray-300 focus:ring-gray-400 text-gray-800",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3.5 text-lg",
};

export const Button = ({
  children,
  onClick,
  loading = false,
  disabled = false,
  variant = "primary",
  size = "md",
  className = "",
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      type="button"
      className={twMerge(
        "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 active:scale-95",
        variantStyles[variant],
        sizeStyles[size],
        isDisabled
          ? "cursor-not-allowed opacity-50"
          : "shadow-md hover:shadow-lg",
        className
      )}
    >
      {loading && (
        <svg
          className="absolute left-3 w-4 h-4 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l-3 3 3 3v4a8 8 0 01-8-8z"
          />
        </svg>
      )}
      <span className={loading ? "opacity-0" : "opacity-100 transition-opacity"}>
        {children}
      </span>
      {/* Ripple effect */}
      <span className="ripple absolute inset-0 rounded-2xl bg-white/20 opacity-0 transition-opacity duration-300 pointer-events-none"></span>
      <style>{`
        button:active .ripple {
          opacity: 1;
          transition: opacity 0s;
        }
      `}</style>
    </button>
  );
};
