import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Home,
  Users,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number | string;
  submenu?: NavItem[];
}

const adminNavItems: NavItem[] = [
  {
    label: 'Dashboard',
    icon: <Home className="w-5 h-5" />,
    href: '/admin',
  },
  {
    label: 'Members',
    icon: <Users className="w-5 h-5" />,
    href: '/admin/members',
  },
  {
    label: 'Payments',
    icon: <DollarSign className="w-5 h-5" />,
    href: '/admin/payments',
  },
  {
    label: 'Reports',
    icon: <BarChart3 className="w-5 h-5" />,
    href: '/admin/reports',
  },
];

const memberNavItems: NavItem[] = [
  {
    label: 'Dashboard',
    icon: <Home className="w-5 h-5" />,
    href: '/member',
  },
  {
    label: 'Payments',
    icon: <DollarSign className="w-5 h-5" />,
    href: '/member/payments',
  },
];

interface SidebarProps {
  items: NavItem[];
  title: string;
  logo?: React.ReactNode;
  mobile?: boolean;
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({
  items,
  title,
  logo,
  mobile = false,
  open = true,
  onClose,
}: SidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  const NavItemComponent = ({ item, level = 0 }: { item: NavItem; level?: number }) => {
    const active = isActive(item.href);
    const expanded = expandedItems.includes(item.label);
    const hasSubmenu = item.submenu && item.submenu.length > 0;

    return (
      <div key={item.label}>
        {hasSubmenu ? (
          <button
            onClick={() => toggleExpand(item.label)}
            className={cn(
              'w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium',
              'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800',
              expanded && 'bg-neutral-100 dark:bg-neutral-800'
            )}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              {open && <span>{item.label}</span>}
            </div>
            {open && (
              <ChevronDown
                className={cn(
                  'w-4 h-4 transition-transform duration-200',
                  expanded && 'rotate-180'
                )}
              />
            )}
          </button>
        ) : (
          <Link
            to={item.href}
            onClick={mobile ? onClose : undefined}
            className={cn(
              'flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium',
              active
                ? 'bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-300 shadow-sm'
                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            )}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              {open && <span>{item.label}</span>}
            </div>
            {open && item.badge && (
              <span className="text-xs font-semibold bg-primary-500 text-white rounded-full px-2 py-0.5">
                {item.badge}
              </span>
            )}
          </Link>
        )}

        {hasSubmenu && open && (
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="pl-2 mt-1 space-y-1"
              >
                {item.submenu!.map((subitem) => (
                  <NavItemComponent key={subitem.label} item={subitem} level={level + 1} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  };

  return (
    <motion.aside
      animate={{ width: open ? 280 : 80 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'h-screen bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 flex flex-col overflow-hidden',
        mobile && '!w-full absolute inset-0 z-40'
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            {logo}
            <div>
              <h1 className="text-lg font-bold text-neutral-900 dark:text-white">{title}</h1>
              <p className="text-xs text-neutral-500">Admin Panel</p>
            </div>
          </motion.div>
        )}
        {mobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="ml-auto"
          >
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {items.map((item) => (
          <NavItemComponent key={item.label} item={item} />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
        {open && (
          <>
            <Link
              to="/settings"
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium',
                'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              )}
            >
              <Settings className="w-5 h-5" />
              Settings
            </Link>
            <button className={cn(
              'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium',
              'text-error-700 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-950'
            )}>
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </>
        )}
      </div>
    </motion.aside>
  );
}

interface HeaderProps {
  title: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
  onMenuClick?: () => void;
  showMenu?: boolean;
}

export function Header({
  title,
  subtitle,
  rightContent,
  onMenuClick,
  showMenu = false,
}: HeaderProps) {
  return (
    <header className="h-16 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        {showMenu && (
          <Button variant="ghost" size="icon" onClick={onMenuClick}>
            <Menu className="w-5 h-5" />
          </Button>
        )}
        <div>
          <h1 className="text-lg font-bold text-neutral-900 dark:text-white">{title}</h1>
          {subtitle && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">{rightContent}</div>
    </header>
  );
}

export { adminNavItems, memberNavItems };
