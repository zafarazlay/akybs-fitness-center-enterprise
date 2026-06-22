import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { cn } from '../../lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    direction: 'up' | 'down';
    value: number;
  };
  footer?: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

const variantColors = {
  primary: 'from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900',
  secondary: 'from-secondary-50 to-secondary-100 dark:from-secondary-950 dark:to-secondary-900',
  success: 'from-success-50 to-success-100 dark:from-success-950 dark:to-success-900',
  warning: 'from-warning-50 to-warning-100 dark:from-warning-950 dark:to-warning-900',
  error: 'from-error-50 to-error-100 dark:from-error-950 dark:to-error-900',
};

const variantIconColors = {
  primary: 'text-primary-600 dark:text-primary-400',
  secondary: 'text-secondary-600 dark:text-secondary-400',
  success: 'text-success-600 dark:text-success-400',
  warning: 'text-warning-600 dark:text-warning-400',
  error: 'text-error-600 dark:text-error-400',
};

export function StatsCard({
  title,
  value,
  icon,
  trend,
  footer,
  onClick,
  loading,
  variant = 'primary',
}: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, translateY: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        interactive={!!onClick}
        premium
        className={cn(
          'relative overflow-hidden group',
          onClick && 'cursor-pointer'
        )}
        onClick={onClick}
      >
        {/* Background Gradient */}
        <div
          className={cn(
            'absolute inset-0 opacity-10 bg-gradient-to-br',
            variantColors[variant]
          )}
        />

        {/* Content */}
        <div className="relative z-10 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                {title}
              </p>
              {loading ? (
                <div className="h-8 w-24 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
              ) : (
                <h3 className="text-3xl font-bold text-neutral-900 dark:text-white">
                  {value}
                </h3>
              )}
            </div>

            {icon && (
              <motion.div
                whileHover={{ rotate: 10 }}
                className={cn(
                  'p-3 rounded-xl bg-gradient-to-br',
                  variantColors[variant],
                  variantIconColors[variant]
                )}
              >
                {icon}
              </motion.div>
            )}
          </div>

          {/* Trend */}
          {trend && (
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'flex items-center gap-1 text-sm font-semibold',
                  trend.direction === 'up'
                    ? 'text-success-600 dark:text-success-400'
                    : 'text-error-600 dark:text-error-400'
                )}
              >
                {trend.direction === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{trend.value}%</span>
              </div>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                vs last month
              </span>
            </div>
          )}

          {/* Footer */}
          {footer && (
            <div className="text-xs text-neutral-600 dark:text-neutral-400 pt-2 border-t border-neutral-200 dark:border-neutral-800">
              {footer}
            </div>
          )}
        </div>

        {/* Hover Arrow */}
        {onClick && (
          <motion.div
            className="absolute right-4 bottom-4 text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}

export function StatsCardSkeleton() {
  return (
    <Card premium>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
            <div className="h-8 w-32 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
          </div>
          <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-xl animate-pulse" />
        </div>
        <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
      </div>
    </Card>
  );
}
