import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const cardVariant = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "border shadow-sm",
        ghost: "border-none shadow-none",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "ghost" }
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardVariant({ variant }), className)}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const cardTitleVariant = cva(
  "text-2xl font-semibold leading-none tracking-tight",
  {
    variants: {
      variant: {
        default: "text-start",
        center: "text-center",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & { variant?: "default" | "center" }
>(({ className, variant, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(cardTitleVariant({ variant }), className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const cardDescriptionVariant = cva("text-sm text-muted-foreground", {
  variants: {
    variant: {
      default: "text-start",
      center: "text-center",
    },
  },
  defaultVariants: { variant: "default" },
});

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    variant?: "default" | "center";
  }
>(({ className, variant, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(cardDescriptionVariant({ variant }), className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
