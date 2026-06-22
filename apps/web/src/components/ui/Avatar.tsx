import React from 'react';
import { cn } from '../../lib/utils';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-2xl',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function stringToColor(str: string): string {
  const colors = [
    '#5b60ff',
    '#9254ff',
    '#22c55e',
    '#f59e0b',
    '#ef4444',
    '#06b6d4',
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, name = 'User', size = 'md', className }, ref) => {
    const initials = getInitials(name);
    const bgColor = stringToColor(name);

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-center rounded-full font-semibold text-white flex-shrink-0',
          sizeMap[size],
          className
        )}
        style={{ backgroundColor: src ? undefined : bgColor }}
      >
        {src ? (
          <img src={src} alt={name} className="w-full h-full rounded-full object-cover" />
        ) : (
          initials
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };
