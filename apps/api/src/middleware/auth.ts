import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../supabase.js';

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Missing token' });

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) return res.status(401).json({ error: 'Invalid token' });

  const { data: profile } = await supabaseAdmin.from('users').select('*').eq('id', data.user.id).single();
  (req as any).user = profile;
  next();
}

export function requireRole(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}
