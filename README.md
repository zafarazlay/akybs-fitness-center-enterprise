# AKYBS Fitness Center Management System — Enterprise Edition

Commercial-grade Gym & Indoor Games Management Platform with Admin and Member dashboards.

## Stack
- React + Vite + TypeScript + Tailwind + ShadCN UI
- Supabase Auth, PostgreSQL, Storage, Realtime, Edge Functions
- Node.js + Express + TypeScript API layer
- Docker, Nginx, GitHub Actions

## Quick Start

```bash
cp .env.example .env
npm install
npm run dev
```

## Apps
- `apps/web` — React frontend
- `apps/api` — Express API layer
- `supabase` — migrations, functions, RLS policies
- `docs` — architecture, manuals, deployment, backup guides

## Production Flow
1. Create Supabase project.
2. Run SQL in `supabase/migrations/001_initial_schema.sql`.
3. Create storage bucket `payment-proofs`.
4. Deploy web app to Vercel.
5. Deploy API to Railway/Render/Fly or VPS.
6. Configure Edge Functions and cron reminders.
