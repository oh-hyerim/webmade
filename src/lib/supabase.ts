import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Contact = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  industry: string | null;
  type: string | null;
  message: string | null;
  status: 'unread' | 'read';
  admin_memo: string | null;
  created_at: string;
};
