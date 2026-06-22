import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  data: any[];
  type?: 'line' | 'area' | 'bar' | 'pie';
  height?: number;
  loading?: boolean;
  action?: React.ReactNode;
}

const COLORS = ['#5b60ff', '#9254ff', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4'];

export function ChartCard({
  title,
  subtitle,
  data,
  type = 'line',
  height = 320,
  loading,
  action,
}: ChartCardProps) {
  if (loading) {
    return (
      <Card premium>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-5 w-32 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse mb-2" />
              <div className="h-4 w-48 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
            </div>
          </div>
          <div
            className="bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"
            style={{ height }}
          />
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card premium className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {action}
        </div>

        {type === 'line' && (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis stroke="currentColor" />
              <YAxis stroke="currentColor" />
              <Tooltip contentStyle={{ borderRadius: '8px' }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#5b60ff"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        {type === 'area' && (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5b60ff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#5b60ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis stroke="currentColor" />
              <YAxis stroke="currentColor" />
              <Tooltip contentStyle={{ borderRadius: '8px' }} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#5b60ff"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {type === 'bar' && (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis stroke="currentColor" />
              <YAxis stroke="currentColor" />
              <Tooltip contentStyle={{ borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="value" fill="#5b60ff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}

        {type === 'pie' && (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </Card>
    </motion.div>
  );
}

