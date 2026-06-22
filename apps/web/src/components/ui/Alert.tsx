import React from 'react';
import { AlertCircle, Check, X, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  icon?: React.ReactNode;
  closeable?: boolean;  onClose?: () => void;
}

const iconMap = {
  primary: <Info className="w-5 h-5 flex-shrink-0" />,
  success: <Check className="w-5 h-5 flex-shrink-0" />,
  warning: <AlertCircle className="w-5 h-5 flex-shrink-0" />,
  error: <AlertCircle className="w-5 h-5 flex-shrink-0" />,
  info: <Info className="w-5 h-5 flex-shrink-0" />,
};

const variantClasses = {
  primary: 'alert-primary',
  success: 'alert-success',
  warning: 'alert-warning',
  error: 'alert-error',
  info: 'alert-primary',
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'primary',
      icon = iconMap[variant],
      children,
      closeable,
      onClose,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(true);

    if (!visible) return null;

    const handleClose = () => {
      setVisible(false);
      onClose?.();
    };

    return (
      <div
        ref={ref}
        className={cn(variantClasses[variant], className)}
        {...props}
      >
        {icon}
        <div className="flex-1">{children}</div>
        {closeable && (
          <button
            onClick={handleClose}
            className="text-current opacity-60 hover:opacity-100 transition-opacity flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert };
