-- AKYBS Fitness Center Management System - Initial PostgreSQL Schema

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

create type app_role as enum ('super_admin','admin','member');
create type member_status as enum ('active','inactive','suspended');
create type payment_status as enum ('pending','approved','rejected');
create type ledger_status as enum ('paid','partial','unpaid','overdue');
create type transaction_type as enum ('credit','debit');
create type payment_method as enum ('cash','bank','easypaisa','jazzcash','other');

create table public.roles (
  id uuid primary key default gen_random_uuid(),
  name app_role unique not null,
  description text,
  created_at timestamptz default now()
);

create table public.permissions (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  description text
);

create table public.role_permissions (
  role_id uuid references public.roles(id) on delete cascade,
  permission_id uuid references public.permissions(id) on delete cascade,
  primary key (role_id, permission_id)
);

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text not null,
  role app_role not null default 'member',
  is_active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.membership_plans (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  description text,
  monthly_fee numeric(12,2) not null check (monthly_fee >= 0),
  admission_fee numeric(12,2) not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.members (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references public.users(id) on delete set null,
  member_id text unique not null,
  full_name text not null,
  profile_photo_url text,
  phone text,
  email text unique not null,
  cnic text,
  address text,
  date_of_birth date,
  join_date date not null default current_date,
  membership_plan_id uuid references public.membership_plans(id),
  monthly_fee numeric(12,2) not null default 0,
  admission_fee numeric(12,2) not null default 0,
  status member_status not null default 'active',
  notes text,
  created_by uuid references public.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  scheduled_at timestamptz,
  is_published boolean default false,
  created_by uuid references public.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.members(id) on delete cascade,
  amount numeric(12,2) not null check (amount > 0),
  payment_month date not null,
  payment_date date not null default current_date,
  method payment_method not null,
  reference_number text,
  proof_url text,
  notes text,
  status payment_status not null default 'pending',
  approved_by uuid references public.users(id),
  approved_at timestamptz,
  rejection_reason text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.ledgers (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.members(id) on delete cascade,
  ledger_month date not null,
  due_amount numeric(12,2) not null default 0,
  paid_amount numeric(12,2) not null default 0,
  payment_date date,
  method payment_method,
  late_fee numeric(12,2) not null default 0,
  outstanding_balance numeric(12,2) generated always as (greatest((due_amount + late_fee) - paid_amount, 0)) stored,
  status ledger_status not null default 'unpaid',
  waived_late_fee boolean not null default false,
  unique(member_id, ledger_month)
);

create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references public.members(id) on delete set null,
  payment_id uuid references public.payments(id) on delete set null,
  type transaction_type not null,
  amount numeric(12,2) not null check (amount > 0),
  category text not null,
  transaction_date date not null default current_date,
  month date,
  method payment_method,
  notes text,
  is_deleted boolean not null default false,
  created_by uuid references public.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.expenses (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  amount numeric(12,2) not null check (amount > 0),
  expense_date date not null default current_date,
  notes text,
  created_by uuid references public.users(id),
  created_at timestamptz default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  title text not null,
  body text not null,
  type text not null default 'info',
  read_at timestamptz,
  created_at timestamptz default now()
);

create table public.receipts (
  id uuid primary key default gen_random_uuid(),
  payment_id uuid unique references public.payments(id) on delete cascade,
  receipt_number text unique not null,
  qr_payload text not null,
  pdf_url text,
  issued_at timestamptz default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id),
  role app_role,
  action text not null,
  table_name text,
  record_id uuid,
  ip_address inet,
  previous_value jsonb,
  new_value jsonb,
  created_at timestamptz default now()
);

create table public.email_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id),
  member_id uuid references public.members(id),
  template_key text not null,
  to_email text not null,
  subject text not null,
  status text not null,
  provider_response jsonb,
  sent_at timestamptz default now()
);

create table public.backups (
  id uuid primary key default gen_random_uuid(),
  backup_type text not null,
  file_url text,
  status text not null default 'created',
  created_by uuid references public.users(id),
  created_at timestamptz default now()
);

create table public.settings (
  key text primary key,
  value jsonb not null,
  updated_by uuid references public.users(id),
  updated_at timestamptz default now()
);

create index idx_members_status on public.members(status);
create index idx_members_email on public.members(email);
create index idx_payments_status on public.payments(status);
create index idx_ledgers_member_month on public.ledgers(member_id, ledger_month);
create index idx_transactions_date on public.transactions(transaction_date);
create index idx_audit_logs_record on public.audit_logs(table_name, record_id);

alter publication supabase_realtime add table public.payments;
alter publication supabase_realtime add table public.members;
alter publication supabase_realtime add table public.transactions;
alter publication supabase_realtime add table public.announcements;
alter publication supabase_realtime add table public.notifications;

alter table public.users enable row level security;
alter table public.members enable row level security;
alter table public.membership_plans enable row level security;
alter table public.payments enable row level security;
alter table public.ledgers enable row level security;
alter table public.announcements enable row level security;
alter table public.notifications enable row level security;
alter table public.receipts enable row level security;
alter table public.expenses enable row level security;
alter table public.transactions enable row level security;
alter table public.settings enable row level security;

create or replace function public.current_app_role()
returns app_role language sql stable as $$
  select role from public.users where id = auth.uid()
$$;

create policy "admins manage all users" on public.users for all using (public.current_app_role() in ('super_admin','admin'));
create policy "users read self" on public.users for select using (id = auth.uid());

create policy "admins manage members" on public.members for all using (public.current_app_role() in ('super_admin','admin'));
create policy "members read self member" on public.members for select using (user_id = auth.uid());

create policy "plans visible to authenticated" on public.membership_plans for select to authenticated using (true);
create policy "admins manage plans" on public.membership_plans for all using (public.current_app_role() in ('super_admin','admin'));

create policy "admins manage payments" on public.payments for all using (public.current_app_role() in ('super_admin','admin'));
create policy "members read own payments" on public.payments for select using (
  exists (select 1 from public.members m where m.id = payments.member_id and m.user_id = auth.uid())
);
create policy "members create own proof payments" on public.payments for insert with check (
  exists (select 1 from public.members m where m.id = payments.member_id and m.user_id = auth.uid())
);

create policy "admins manage ledgers" on public.ledgers for all using (public.current_app_role() in ('super_admin','admin'));
create policy "members read own ledgers" on public.ledgers for select using (
  exists (select 1 from public.members m where m.id = ledgers.member_id and m.user_id = auth.uid())
);

create policy "announcements read published" on public.announcements for select using (is_published = true or public.current_app_role() in ('super_admin','admin'));
create policy "admins manage announcements" on public.announcements for all using (public.current_app_role() in ('super_admin','admin'));

create policy "users read own notifications" on public.notifications for select using (user_id = auth.uid());
create policy "admins manage notifications" on public.notifications for all using (public.current_app_role() in ('super_admin','admin'));

create policy "admins manage accounting" on public.expenses for all using (public.current_app_role() in ('super_admin','admin'));
create policy "admins manage transactions" on public.transactions for all using (public.current_app_role() in ('super_admin','admin'));

create policy "members read own receipts" on public.receipts for select using (
  exists (
    select 1 from public.payments p
    join public.members m on m.id = p.member_id
    where p.id = receipts.payment_id and m.user_id = auth.uid()
  ) or public.current_app_role() in ('super_admin','admin')
);

insert into public.roles(name, description) values
('super_admin','System owner'),
('admin','Fitness center administrator'),
('member','Fitness center member');

insert into public.membership_plans(name, monthly_fee, admission_fee, description) values
('Elder Only Gym', 1000, 0, 'Gym access for elders'),
('Elder Gym + Indoor Games', 1500, 0, 'Gym and indoor games access for elders'),
('Elder Only Indoor Games', 500, 0, 'Indoor games access for elders'),
('Children Indoor Games', 500, 0, 'Indoor games access for children');

insert into public.settings(key, value) values
('gym_profile', '{"name":"AKYBS Fitness Center","logo_url":null}'),
('late_fee_rules', '{"due_day":10,"grace_period_days":5,"fixed_fee":300,"percentage_fee":0}'),
('payment_accounts', '{"bank":[],"easypaisa":[],"jazzcash":[]}'),
('receipt_settings', '{"authorized_signature":"Admin","prefix":"AKYBS"}'),;
