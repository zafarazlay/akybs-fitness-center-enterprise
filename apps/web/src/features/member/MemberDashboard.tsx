import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { StatsCard } from '../../components/dashboard/StatsCard';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DataTable } from '../../components/data/DataTable';
import {
  DollarSign,
  CreditCard,
  CalendarDays,
  Bell,
  Download,
  Upload,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency, formatDate } from '../../lib/utils';

// Mock data
const membershipStatus = {
  plan: 'Premium Monthly',
  status: 'active',
  startDate: '2024-01-15',
  renewalDate: '2024-07-15',
  amount: 5000,
  daysRemaining: 23,
};

const paymentHistory = [
  {
    id: 1,
    date: '2024-06-15',
    description: 'Premium Monthly Membership',
    amount: 5000,
    status: 'completed',
    method: 'Credit Card',
  },
  {
    id: 2,
    date: '2024-05-15',
    description: 'Premium Monthly Membership',
    amount: 5000,
    status: 'completed',
    method: 'Bank Transfer',
  },
  {
    id: 3,
    date: '2024-04-15',
    description: 'Premium Monthly Membership',
    amount: 5000,
    status: 'completed',
    method: 'Credit Card',
  },
  {
    id: 4,
    date: '2024-03-15',
    description: 'Premium Monthly Membership',
    amount: 5000,
    status: 'completed',
    method: 'Bank Transfer',
  },
];

const announcements = [
  {
    id: 1,
    title: 'New Equipment Arrival',
    date: '2024-06-20',
    category: 'facility',
    read: false,
  },
  {
    id: 2,
    title: 'Summer Fitness Challenge',
    date: '2024-06-18',
    category: 'event',
    read: true,
  },
  {
    id: 3,
    title: 'Maintenance Schedule Update',
    date: '2024-06-15',
    category: 'maintenance',
    read: true,
  },
];

export function MemberDashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <Layout variant="member" title="Welcome Back!" subtitle="Here's your membership overview">
      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Section with Membership Status */}
        <motion.div variants={itemVariants}>
          <Card premium className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">Welcome, John Doe!</h1>
                <p className="text-primary-100">
                  Your membership is active and in good standing
                </p>
              </div>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-6xl opacity-20"
              >
                💪
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
              title="Current Plan"
              value={membershipStatus.plan}
              icon={<CreditCard className="w-6 h-6" />}
              variant="primary"
              footer={`₹${membershipStatus.amount}/month`}
            />
            <StatsCard
              title="Renewal Date"
              value={formatDate(membershipStatus.renewalDate)}
              icon={<CalendarDays className="w-6 h-6" />}
              variant="secondary"
              footer={`${membershipStatus.daysRemaining} days remaining`}
            />
            <StatsCard
              title="Outstanding Balance"
              value={formatCurrency(0)}
              icon={<CheckCircle className="w-6 h-6" />}
              variant="success"
              footer="All payments current"
            />
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Membership & Actions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Membership Card */}
              <Card premium className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-success-500" />
                    Membership Details
                  </h3>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-wide font-semibold">
                        Membership Type
                      </p>
                      <p className="text-base font-semibold text-neutral-900 dark:text-white">
                        {membershipStatus.plan}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-wide font-semibold">
                        Status
                      </p>
                      <Badge variant="success" size="md">
                        {membershipStatus.status}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-wide font-semibold">
                        Member Since
                      </p>
                      <p className="text-base font-semibold text-neutral-900 dark:text-white">
                        {formatDate(membershipStatus.startDate)}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 uppercase tracking-wide font-semibold">
                        Renews On
                      </p>
                      <p className="text-base font-semibold text-neutral-900 dark:text-white">
                        {formatDate(membershipStatus.renewalDate)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">
                    Quick Actions
                  </h4>
                  <div className="space-y-2">
                    <Button
                      fullWidth
                      variant="primary"
                      icon={<Upload className="w-4 h-4" />}
                    >
                      Upload Payment Proof
                    </Button>
                    <Button
                      fullWidth
                      variant="secondary"
                      icon={<Download className="w-4 h-4" />}
                    >
                      Download Receipt
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Payment History */}
              <DataTable
                title="Payment History"
                columns={[
                  {
                    key: 'date',
                    label: 'Date',
                    sortable: true,
                    render: (value) => formatDate(value),
                  },
                  {
                    key: 'description',
                    label: 'Description',
                    sortable: true,
                  },
                  {
                    key: 'amount',
                    label: 'Amount',
                    render: (value) => formatCurrency(value),
                  },
                  {
                    key: 'method',
                    label: 'Method',
                    render: (value) => (
                      <Badge variant="neutral" size="sm">
                        {value}
                      </Badge>
                    ),
                  },
                  {
                    key: 'status',
                    label: 'Status',
                    render: (value) => (
                      <Badge
                        variant={value === 'completed' ? 'success' : 'warning'}
                        size="sm"
                      >
                        {value}
                      </Badge>
                    ),
                  },
                ]}
                data={paymentHistory}
                paginated
                rowsPerPage={5}
                exportable
              />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Announcement Card */}
              <Card premium className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Announcements
                  </h3>
                  {announcements.some((a) => !a.read) && (
                    <Badge variant="error" size="sm">
                      {announcements.filter((a) => !a.read).length}
                    </Badge>
                  )}
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {announcements.map((announcement) => (
                    <motion.button
                      key={announcement.id}
                      whileHover={{ x: 4 }}
                      className="w-full text-left p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p
                            className={`text-sm font-semibold ${
                              announcement.read
                                ? 'text-neutral-600 dark:text-neutral-400'
                                : 'text-neutral-900 dark:text-white'
                            }`}
                          >
                            {announcement.title}
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                            {formatDate(announcement.date)}
                          </p>
                        </div>
                        {!announcement.read && (
                          <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </Card>

              {/* Support Card */}
              <Card premium>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                      Need Help?
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Contact our support team for assistance with your membership.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Button
                      fullWidth
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        window.location.href = 'mailto:support@akysb.com'
                      }
                    >
                      Send Email
                    </Button>
                    <Button
                      fullWidth
                      variant="ghost"
                      size="sm"
                      onClick={() => window.location.href = 'tel:+91-8080808080'}
                    >
                      Call Support
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
}

