import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-sm hover:shadow-md',
        secondary: 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 hover:bg-neutral-300 dark:hover:bg-neutral-700 active:bg-neutral-400 dark:active:bg-neutral-600',
        tertiary: 'bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-900 active:bg-primary-300 dark:active:bg-primary-800',
        ghost: 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 active:bg-neutral-200 dark:active:bg-neutral-700',
        success: 'bg-success-500 text-white hover:bg-success-600 active:bg-success-700 shadow-sm hover:shadow-md',
        danger: 'bg-error-500 text-white hover:bg-error-600 active:bg-error-700 shadow-sm hover:shadow-md',
        warning: 'bg-warning-500 text-white hover:bg-warning-600 active:bg-warning-700 shadow-sm hover:shadow-md',
        outline: 'border border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-neutral-50 hover:bg-neutral-50 dark:hover:bg-neutral-900 active:bg-neutral-100 dark:active:bg-neutral-800',
      },
      size: {
        xs: 'px-2.5 py-1.5 text-xs gap-1.5',
        sm: 'px-3 py-2 text-sm gap-2',
        md: 'px-4 py-2.5 text-base gap-2',
        lg: 'px-6 py-3 text-base gap-2.5',
        xl: 'px-8 py-4 text-lg gap-3',
        icon: 'p-2 [&_svg]:w-5 [&_svg]:h-5',
        'icon-sm': 'p-1.5 [&_svg]:w-4 [&_svg]:h-4',
        'icon-lg': 'p-2.5 [&_svg]:w-6 [&_svg]:h-6',
      },
      fullWidth: {
        true: 'w-full',
      },
      loading: {
        true: 'relative text-transparent pointer-events-none',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading,
      icon,
      iconPosition = 'left',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, fullWidth, loading }),
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="spinner" />
          </span>
        )}

        {icon && iconPosition === 'left' && (
          <span className="flex items-center">{icon}</span>
        )}

        {children}

        {icon && iconPosition === 'right' && (
          <span className="flex items-center">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
