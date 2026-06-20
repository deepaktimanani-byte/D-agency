"use client";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-navy text-white rounded-full hover:bg-navy-dark shadow-sm hover:shadow-md active:scale-[0.98]",
        outline:
          "border-2 border-navy text-navy rounded-full hover:bg-navy hover:text-white active:scale-[0.98]",
        ghost:
          "text-navy hover:text-navy-dark underline-offset-4 hover:underline",
        teal:
          "bg-accent-teal text-white rounded-full hover:opacity-90 shadow-sm active:scale-[0.98]",
        dark:
          "bg-bg-dark text-white rounded-full hover:opacity-90 shadow-sm active:scale-[0.98]",
      },
      size: {
        sm: "px-5 py-2 text-sm",
        md: "px-7 py-3 text-base",
        lg: "px-9 py-4 text-base",
        icon: "w-10 h-10 rounded-full",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
