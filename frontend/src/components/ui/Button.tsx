import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant; size?: Size;
}

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-glow hover:-translate-y-0.5",
  secondary: "bg-ink-900 text-white hover:bg-ink-800",
  outline: "border border-ink-200 bg-white text-ink-800 hover:border-brand-500 hover:text-brand-600",
  ghost: "text-ink-700 hover:bg-ink-100",
};
const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm rounded-full",
  md: "h-11 px-5 text-sm rounded-full",
  lg: "h-13 px-7 text-base rounded-full",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus-ring disabled:opacity-50 disabled:pointer-events-none",
        variants[variant], sizes[size], className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
