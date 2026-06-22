import { Router } from 'express';
import { supabaseAdmin } from '../supabase.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);

router.post('/cash', requireRole(['super_admin', 'admin']), async (req, res) => {
  const { data, error } = await supabaseAdmin.from('payments').insert({
    ...req.body,
    method: 'cash',
    status: 'approved',
    approved_by: (req as any).user.id,
    approved_at: new Date().toISOString()
  }).select().single();

  if (error) return res.status(400).json({ error: error.message });

  await supabaseAdmin.from('transactions').insert({
    member_id: data.member_id,
    payment_id: data.id,
    type: 'credit',
    amount: data.amount,
    category: 'membership_payment',
    transaction_date: data.payment_date,
    month: data.payment_month,
    method: data.method,
    created_by: (req as any).user.id
  });

  res.status(201).json(data);
});

router.post('/:id/approve', requireRole(['super_admin', 'admin']), async (req, res) => {
  const { data, error } = await supabaseAdmin.from('payments').update({
    status: 'approved',
    approved_by: (req as any).user.id,
    approved_at: new Date().toISOString()
  }).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });

  await supabaseAdmin.from('transactions').insert({
    member_id: data.member_id,
    payment_id: data.id,
    type: 'credit',
    amount: data.amount,
    category: 'online_payment',
    transaction_date: data.payment_date,
    month: data.payment_month,
    method: data.method,
    created_by: (req as any).user.id
  });

  await supabaseAdmin.from('notifications').insert({
    user_id: req.body.member_user_id,
    title: 'Payment Approved',
    body: 'Your payment has been approved.',
    type: 'payment'
  });

  res.json(data);
});

router.post('/:id/reject', requireRole(['super_admin', 'admin']), async (req, res) => {
  const { data, error } = await supabaseAdmin.from('payments').update({
    status: 'rejected',
    rejection_reason: req.body.reason ?? 'Rejected by admin'
  }).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default router;
