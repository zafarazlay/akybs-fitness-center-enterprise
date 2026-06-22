import React, { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { StatsCard, StatsCardSkeleton } from '../../components/dashboard/StatsCard';
import { ChartCard } from '../../components/dashboard/ChartCard';
import { DataTable } from '../../components/data/DataTable';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Users,
  UserCheck,
  DollarSign,
  AlertCircle,
  TrendingUp,
  Plus,
  MoreVertical,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency, formatNumber } from '../../lib/utils';

// Mock data
const revenueData = [
  { month: 'Jan', revenue: 45000, goal: 50000 },
  { month: 'Feb', revenue: 52000, goal: 50000 },
  { month: 'Mar', revenue: 48000, goal: 50000 },
  { month: 'Apr', revenue: 61000, goal: 50000 },
  { month: 'May', revenue: 55000, goal: 50000 },
  { month: 'Jun', revenue: 67000, goal: 50000 },
];

const membershipGrowthData = [
  { month: 'Jan', new: 12, total: 145 },
  { month: 'Feb', new: 19, total: 164 },
  { month: 'Mar', new: 15, total: 179 },
  { month: 'Apr', new: 22, total: 201 },
  { month: 'May', new: 18, total: 219 },
  { month: 'Jun', new: 25, total: 244 },
];

const paymentStatusData = [
  { name: 'Paid', value: 85 },
  { name: 'Pending', value: 12 },
  { name: 'Overdue', value: 8 },
];

const recentActivities = [
  {
    id: 1,
    member: 'John Doe',
    action: 'Renewed Membership',
    amount: 5000,
    date: '2024-06-20',
    status: 'completed',
  },
  {
    id: 2,
    member: 'Jane Smith',
    action: 'New Enrollment',
    amount: 3500,
    date: '2024-06-19',
    status: 'pending',
  },
  {
    id: 3,
    member: 'Mike Johnson',
    action: 'Payment Received',
    amount: 4500,
    date: '2024-06-18',
    status: 'completed',
  },
  {
    id: 4,
    member: 'Sarah Williams',
    action: 'Payment Overdue',
    amount: 5000,
    date: '2024-06-15',
    status: 'failed',
  },
  {
    id: 5,
    member: 'Tom Brown',
    action: 'Membership Renewal',
    amount: 6000,
    date: '2024-06-14',
    status: 'pending',
  },
];

export function AdminDashboard() {
  const [loading, setLoading] = useState(false);

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
    <Layout variant="admin" title="Dashboard" subtitle="Realtime business overview">
      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* KPI Cards */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Members"
              value="244"
              icon={<Users className="w-6 h-6" />}
              trend={{ direction: 'up', value: 12.5 }}
              variant="primary"
              footer="25 new this month"
            />
            <StatsCard
              title="Active Members"
              value="198"
              icon={<UserCheck className="w-6 h-6" />}
              trend={{ direction: 'up', value: 8.2 }}
              variant="success"
              footer="81% of total members"
            />
            <StatsCard
              title="Monthly Revenue"
              value={formatCurrency(67000)}
              icon={<DollarSign className="w-6 h-6" />}
              trend={{ direction: 'up', value: 15.3 }}
              variant="secondary"
              footer="34% above goal"
            />
            <StatsCard
              title="Outstanding Dues"
              value={formatCurrency(45000)}
              icon={<AlertCircle className="w-6 h-6" />}
              trend={{ direction: 'down', value: 5.1 }}
              variant="warning"
              footer="From 18 overdue members"
            />
          </div>
        </motion.div>

        {/* Charts Grid */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ChartCard
                title="Revenue Trend"
                subtitle="Monthly revenue vs. goal"
                data={revenueData}
                type="area"
                height={300}
              />
            </div>

            <ChartCard
              title="Payment Status"
              subtitle="Current payment distribution"
              data={paymentStatusData}
              type="pie"
              height={300}
            />
          </div>
        </motion.div>

        {/* Secondary Charts */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard
              title="Membership Growth"
              subtitle="New and total members trend"
              data={membershipGrowthData}
              type="bar"
              height={280}
            />

            {/* Quick Stats */}
            <Card premium className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button fullWidth variant="primary" icon={<Plus className="w-4 h-4" />}>
                    Add New Member
                  </Button>
                  <Button
                    fullWidth
                    variant="secondary"
                    icon={<DollarSign className="w-4 h-4" />}
                  >
                    Record Payment
                  </Button>
                  <Button fullWidth variant="tertiary" icon={<Users className="w-4 h-4" />}>
                    Send Announcement
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">
                  Key Metrics
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">Conversion Rate</span>
                    <span className="font-semibold">81%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-success-500"
                      initial={{ width: 0 }}
                      animate={{ width: '81%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-sm mt-4">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      Collection Rate
                    </span>
                    <span className="font-semibold">92%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-success-500"
                      initial={{ width: 0 }}
                      animate={{ width: '92%' }}
                      transition={{ duration: 1, delay: 0.7 }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div variants={itemVariants}>
          <DataTable
            title="Recent Activities"
            columns={[
              {
                key: 'member',
                label: 'Member',
                sortable: true,
              },
              {
                key: 'action',
                label: 'Action',
                sortable: true,
              },
              {
                key: 'amount',
                label: 'Amount',
                render: (value) => formatCurrency(value),
              },
              {
                key: 'date',
                label: 'Date',
                sortable: true,
              },
              {
                key: 'status',
                label: 'Status',
                render: (value) => (
                  <Badge
                    variant={
                      value === 'completed'
                        ? 'success'
                        : value === 'pending'
                          ? 'warning'
                          : 'error'
                    }
                  >
                    {value}
                  </Badge>
                ),
              },
            ]}
            data={recentActivities}
            paginated
            rowsPerPage={5}
            exportable
          />
        </motion.div>
      </motion.div>
    </Layout>
  );
}

