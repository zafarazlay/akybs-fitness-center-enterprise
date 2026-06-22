import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  premium?: boolean;
  interactive?: boolean;
  padded?: boolean;
  noBorder?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, premium, interactive, padded = true, noBorder, children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 transition-all duration-200',
          padded && 'p-5',
          premium && 'shadow-elevation-1 dark:shadow-elevation-1 bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950',
          interactive && 'cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md',
          noBorder && 'border-0 shadow-sm',
          !premium && 'shadow-sm',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };
