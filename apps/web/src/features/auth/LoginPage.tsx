import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Alert } from '../../components/ui/Alert';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userType, setUserType] = useState<'admin' | 'member'>('member');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Demo credentials
    const testAccounts = [
      { email: 'admin@akybs.com', password: 'Admin@123', role: 'admin' },
      { email: 'member@akybs.com', password: 'Member@123', role: 'member' }
    ];
    
    const account = testAccounts.find(a => a.email === email && a.password === password);
    
    if (account) {
      // Store demo session
      localStorage.setItem('demo_user', JSON.stringify({
        email,
        role: account.role,
        id: Math.random().toString(36).substr(2, 9)
      }));
      navigate(account.role === 'admin' ? '/admin' : '/member');
    } else {
      setError('Invalid credentials. Please check your email and password.');
    }

    setLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 p-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -50, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute w-96 h-96 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl -top-40 -left-40"
        />
        <motion.div
          animate={{
            x: [0, -100, 100, 0],
            y: [0, 50, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, delay: 2 }}
          className="absolute w-96 h-96 bg-gradient-to-r from-secondary-500/20 to-primary-500/20 rounded-full blur-3xl -bottom-40 -right-40"
        />
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo & Branding */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.div
            className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            A
          </motion.div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
            AKYSB Fitness
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Enterprise Management System
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div variants={itemVariants}>
          <Card premium className="space-y-6">
            {/* User Type Selector */}
            <div>
              <label className="label">Login As</label>
              <div className="grid grid-cols-2 gap-3">
                {['admin', 'member'].map((type) => (
                  <motion.button
                    key={type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setUserType(type as 'admin' | 'member')}
                    className={`py-3 px-4 rounded-lg font-semibold transition-all duration-200 border-2 ${
                      userType === type
                        ? 'bg-primary-500 text-white border-primary-500 shadow-md'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border-neutral-300 dark:border-neutral-700 hover:border-primary-500'
                    }`}
                  >
                    {type === 'admin' ? '👤 Admin' : '🏋️ Member'}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Alert variant="error" closeable onClose={() => setError('')}>
                  {error}
                </Alert>
              </motion.div>
            )}

            {/* Demo Credentials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-3 bg-primary-50 dark:bg-primary-950 rounded-lg border border-primary-200 dark:border-primary-800"
            >
              <p className="text-xs font-semibold text-primary-900 dark:text-primary-100 mb-2">
                Demo Credentials:
              </p>
              <p className="text-xs text-primary-800 dark:text-primary-200">
                <strong>Admin:</strong> admin@akybs.com / Admin@123
              </p>
              <p className="text-xs text-primary-800 dark:text-primary-200">
                <strong>Member:</strong> member@akybs.com / Member@123
              </p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div variants={itemVariants}>
                <Input
                  type="email"
                  label="Email Address"
                  placeholder="you@example.com"
                  icon={<Mail className="w-4 h-4" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="space-y-1.5">
                  <label className="label">Password</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      required
                      className="input pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Remember Me & Forgot Password */}
              <motion.div variants={itemVariants} className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded cursor-pointer" />
                  <span className="text-neutral-600 dark:text-neutral-400">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={loading}
                  icon={!loading && <ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </motion.div>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200 dark:border-neutral-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400">
                  Or
                </span>
              </div>
            </div>

            {/* Social Login */}
            <motion.div variants={itemVariants} className="space-y-2">
              <Button
                type="button"
                fullWidth
                variant="outline"
                disabled={loading}
                className="text-neutral-900 dark:text-neutral-50"
              >
                Continue with Google
              </Button>
            </motion.div>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-6 text-sm text-neutral-600 dark:text-neutral-400"
        >
          <p>
            © 2024 AKYSB Fitness Center. All rights reserved.
            <br />
            Built with modern 2026 design standards.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

