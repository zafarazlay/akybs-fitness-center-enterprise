import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { StatCard } from '../../components/dashboard/StatCard';

const data = [
  { month: 'Jan', revenue: 12000 },
  { month: 'Feb', revenue: 18000 },
  { month: 'Mar', revenue: 24000 }
];

export function AdminDashboard() {
  return (
    <main className="p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-slate-500">Realtime business overview</p>
      </header>

      <section className="grid md:grid-cols-4 gap-4">
        <StatCard title="Total Members" value="0" />
        <StatCard title="Active Members" value="0" />
        <StatCard title="Monthly Collection" value="Rs. 0" />
        <StatCard title="Outstanding Dues" value="Rs. 0" />
      </section>

      <section className="card h-80">
        <h2 className="font-semibold mb-4">Revenue Graph</h2>
        <ResponsiveContainer width="100%" height="85%">
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line dataKey="revenue" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </main>
  );
}
