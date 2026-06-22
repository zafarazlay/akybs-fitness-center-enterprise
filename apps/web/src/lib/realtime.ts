import { supabase } from './supabase';

export function subscribeToAdminRealtime(onChange: () => void) {
  return supabase
    .channel('admin-realtime')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'payments' }, onChange)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'members' }, onChange)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, onChange)
    .subscribe();
}
