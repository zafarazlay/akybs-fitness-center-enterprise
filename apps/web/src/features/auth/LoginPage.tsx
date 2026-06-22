import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else window.location.href = '/admin';
  }

  return (
    <main className="min-h-screen grid place-items-center p-6">
      <form onSubmit={login} className="card w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">AKYBS Fitness Center</h1>
        <p className="text-sm text-slate-500">Admin and member secure login</p>
        <input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="btn w-full">Login</button>
      </form>
    </main>
  );
}
