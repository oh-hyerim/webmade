import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL as string;
/** Publishable(기존 anon) 키 — service_role/secret 키는 서버·Edge에서만 사용 */
const supabasePublishableKey =
  (import.meta.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string | undefined)?.trim() ||
  (import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY as string);

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
