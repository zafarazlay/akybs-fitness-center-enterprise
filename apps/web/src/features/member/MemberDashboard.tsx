export function MemberDashboard() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Member Dashboard</h1>
      <section className="grid md:grid-cols-3 gap-4">
        <div className="card">Profile</div>
        <div className="card">Ledger</div>
        <div className="card">Upload Payment Proof</div>
      </section>
    </main>
  );
}
