insert into public.membership_plans(name, monthly_fee, admission_fee, description)
values
('Elder Only Gym', 1000, 0, 'Gym access'),
('Elder Gym + Indoor Games', 1500, 0, 'Gym and games'),
('Elder Only Indoor Games', 500, 0, 'Games only'),
('Children Indoor Games', 500, 0, 'Children games')
on conflict (name) do nothing;
