import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async () => {
  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

  const { data: overdue } = await supabase
    .from('ledgers')
    .select('*, members(email, full_name, user_id)')
    .in('status', ['unpaid', 'partial', 'overdue']);

  // Send emails via configured SMTP provider webhook or external mail service.
  for (const row of overdue ?? []) {
    await supabase.from('notifications').insert({
      user_id: row.members.user_id,
      title: 'Fee Reminder',
      body: `Dear ${row.members.full_name}, your fee is pending.`,
      type: 'fee_reminder'
    });
  }

  return new Response(JSON.stringify({ processed: overdue?.length ?? 0 }));
});
