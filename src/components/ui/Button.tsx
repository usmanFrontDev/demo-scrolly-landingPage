import React from "react";
import clsx from "clsx";
import { useTheme } from "../../context/ThemeContext";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "secondary",
  disabled = false,
  onClick,
  className,
  children,
}) => {
  const { theme } = useTheme();

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      theme === "dark"
        ? "rounded-full border border-transparent bg-textPrimary text-button hover:bg-transparent hover:border-textPrimary hover:text-textPrimary"
        : "rounded-full border border-transparent bg-button text-textPrimary hover:text-button hover:bg-transparent hover:border-button",
    secondary:
      "bg-[#0C0C0C] text-white border border-white rounded-full",
  };

  return (
    <button
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      className={clsx(
        "px-6 py-3 text-base flex cursor-pointer hover:shadow-2xl items-center font-semibold sm:text-lg justify-start gap-2 transition-all duration-200 font-Urbanist",
        variantStyles[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
