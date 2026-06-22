# Backup & Recovery Guide

## Backup Strategy
- Daily logical DB backup
- Weekly full export
- Monthly archive
- Supabase Storage backup for receipts and payment proofs

## Restore
1. Put system in maintenance mode.
2. Restore PostgreSQL dump.
3. Restore storage files.
4. Run ledger recalculation script.
5. Verify dashboards and reports.
