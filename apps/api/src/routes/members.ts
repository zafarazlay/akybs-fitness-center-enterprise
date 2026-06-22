import { Router } from 'express';
import { z } from 'zod';
import { supabaseAdmin } from '../supabase.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

const createMemberSchema = z.object({
  email: z.string().email(),
  full_name: z.string().min(2),
  phone: z.string().optional(),
  member_id: z.string().min(1),
  membership_plan_id: z.string().uuid(),
  monthly_fee: z.number().nonnegative(),
  admission_fee: z.number().nonnegative().default(0),
  address: z.string().optional(),
  cnic: z.string().optional()
});

router.use(requireAuth, requireRole(['super_admin', 'admin']));

router.get('/', async (_req, res) => {
  const { data, error } = await supabaseAdmin.from('members').select('*, membership_plans(name)');
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

router.post('/', async (req, res) => {
  const payload = createMemberSchema.parse(req.body);

  const existing = await supabaseAdmin.from('members').select('id').eq('email', payload.email).maybeSingle();
  if (existing.data) return res.status(409).json({ error: 'Member email already exists' });

  const invite = await supabaseAdmin.auth.admin.inviteUserByEmail(payload.email, {
    data: { full_name: payload.full_name, role: 'member' }
  });
  if (invite.error) return res.status(400).json({ error: invite.error.message });

  await supabaseAdmin.from('users').insert({
    id: invite.data.user.id,
    email: payload.email,
    full_name: payload.full_name,
    role: 'member'
  });

  const { data, error } = await supabaseAdmin.from('members').insert({
    ...payload,
    user_id: invite.data.user.id,
    created_by: (req as any).user.id
  }).select().single();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

router.patch('/:id', async (req, res) => {
  const { data, error } = await supabaseAdmin.from('members').update(req.body).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

router.post('/:id/suspend', async (req, res) => {
  const { error } = await supabaseAdmin.from('members').update({ status: 'suspended' }).eq('id', req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ ok: true });
});

router.post('/:id/activate', async (req, res) => {
  const { error } = await supabaseAdmin.from('members').update({ status: 'active' }).eq('id', req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ ok: true });
});

export default router;
