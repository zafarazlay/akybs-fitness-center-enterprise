import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  const body = await req.json();
  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

  const { data: invite, error } = await supabase.auth.admin.inviteUserByEmail(body.email, {
    data: { full_name: body.full_name, role: 'member' }
  });

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });

  return new Response(JSON.stringify({ user: invite.user }), { headers: { 'content-type': 'application/json' } });
});
