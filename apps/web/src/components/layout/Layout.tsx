import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar, Header, adminNavItems, memberNavItems } from '../navigation/Sidebar';
import { Button } from '../ui/Button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  variant?: 'admin' | 'member';
  title?: string;
  subtitle?: string;
}

export function Layout({
  children,
  variant = 'admin',
  title = 'Dashboard',
  subtitle,
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();

  const navItems = variant === 'admin' ? adminNavItems : memberNavItems;

  return (
    <div className="h-screen flex overflow-hidden bg-neutral-50 dark:bg-neutral-950">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          items={navItems}
          title="AKYSB"
          logo={
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
          }
          open={sidebarOpen}
        />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-30 bg-black/50 md:hidden"
            />
            <Sidebar
              items={navItems}
              title="AKYSB"
              mobile
              open={true}
              onClose={() => setMobileMenuOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          title={title}
          subtitle={subtitle}
          showMenu
          onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          rightContent={
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                title={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
              >
                {resolvedTheme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </Button>
            </div>
          }
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 max-w-7xl mx-auto w-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
