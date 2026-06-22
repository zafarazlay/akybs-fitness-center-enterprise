# REST API Documentation

Base path: `/api/v1`

## Auth
Supabase Auth is used directly from frontend. Admin-only operations use API endpoints with JWT verification.

## Members
- `GET /members`
- `GET /members/:id`
- `POST /members`
- `PATCH /members/:id`
- `POST /members/:id/suspend`
- `POST /members/:id/activate`
- `DELETE /members/:id`

## Payments
- `POST /payments/cash`
- `POST /payments/proof`
- `POST /payments/:id/approve`
- `POST /payments/:id/reject`

## Reports
- `GET /reports/summary?from=&to=`
- `GET /exports/members.xlsx`
- `GET /exports/transactions.csv`

## Receipts
- `GET /receipts/:id.pdf`
- `GET /verify/:receiptNumber`
