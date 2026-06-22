import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
  {
    variants: {
      variant: {
        primary: 'bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300',
        secondary: 'bg-secondary-100 dark:bg-secondary-950 text-secondary-700 dark:text-secondary-300',
        success: 'bg-success-100 dark:bg-success-950 text-success-700 dark:text-success-300',
        warning: 'bg-warning-100 dark:bg-warning-950 text-warning-700 dark:text-warning-300',
        error: 'bg-error-100 dark:bg-error-950 text-error-700 dark:text-error-300',
        neutral: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'sm',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {icon && <span className="mr-1 flex items-center">{icon}</span>}
      {children}
    </div>
  )
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
