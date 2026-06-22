import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:54321';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0YXJ0ZXIiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMzk0NTA0MCwiZXhwIjoxNjU3NTQ1MDQwfQ.K1mNvDmf9kM5nW8Y6zL9qR8vN7xO2pP3qT5uV6wX7yZ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
