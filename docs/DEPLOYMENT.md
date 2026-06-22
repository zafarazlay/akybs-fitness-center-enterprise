# Deployment Guide

## Supabase
1. Create a new project.
2. Disable public signup in Authentication settings.
3. Run `supabase/migrations/001_initial_schema.sql`.
4. Create Storage bucket: `payment-proofs`.
5. Create Storage bucket: `logos`.
6. Deploy Edge Functions:
   - `create-member`
   - `send-reminders`

## Vercel
Set:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_APP_NAME`

Build command:
```bash
npm run build -w apps/web
```

Output:
```bash
apps/web/dist
```

## API Deployment
Deploy `apps/api` with:
```bash
npm run build -w apps/api
npm run start -w apps/api
```
