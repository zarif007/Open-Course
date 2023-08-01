import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

const buttonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-rose-800 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-rose-900 disabled:pointer-events-none dark:focus:ring-offset-black",
  {
    variants: {
      variant: {
        default:
          "bg-black text-white hover:bg-slate-800 dark:bg-slate-200 dark:text-black dark:hover:bg-slate-100",
        destructive: "text-white hover:bg-red-600 dark:hover:bg-red-600",
        outline:
          "bg-black text-white hover:bg-slate-800 dark:bg-slate-200 dark:text-black dark:hover:bg-slate-100 border border-slate-200 dark:border-slate-700",
        subtle:
          "bg-slate-100 text-black hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100",
        ghost:
          "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-black dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent",
        bigButton: "py-6 px-8 bg-rose-500 text-slate-100 text-xl font-bold",
        bigButtonOutline:
          "py-6 px-8 border-2 border-rose-500 text-slate-600 dark:text-slate-100 text-xl font-bold",
        general:
          "text-slate-100 bg-gray-800 hover:bg-gray-950 focus:ring-2 focus:outline-none focus:ring-gray-900 dark:focus:ring-slate-300  font-medium rounded-md text-sm px-8 py-2 font-semibold text-center mr-3 md:mr-0 dark:bg-slate-100 dark:text-gray-900 dark:hover:bg-slate-300 dark:focus:ring-slate-300",
        generalOutline:
          "text-white border-2 border-rose-500 hover:border-rose-800 focus:ring-2 focus:outline-none focus:ring-rose-300 font-medium rounded-md text-sm px-8 py-2 font-semibold text-center mr-3 md:mr-0 dark:border-rose-500 dark:hover:border-rose-800 dark:focus:ring-rose-800",
        generalBlue:
          "text-white bg-rose-500 hover:bg-rose-800 focus:ring-2 focus:outline-none focus:ring-rose-300 font-medium rounded-md text-sm px-8 py-2 font-semibold text-center mr-3 md:mr-0 dark:bg-rose-500 dark:hover:bg-rose-800 dark:focus:ring-rose-800",
        generalOutlineBlue:
          "text-white border-2 border-rose-500 hover:border-rose-800 focus:ring-2 focus:outline-none focus:ring-rose-300 font-medium rounded-md text-sm px-8 py-2 font-semibold text-center mr-3 md:mr-0 dark:border-rose-500 dark:hover:border-rose-800 dark:focus:ring-rose-800",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, isLoading, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
