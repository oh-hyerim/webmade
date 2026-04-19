import type { Session, User } from '@supabase/supabase-js';

/** Supabase Auth 사용자 메타데이터의 관리자 역할 (대시보드에서 user_metadata.role = 'admin' 설정) */
export function isAdminUser(user: User | null | undefined): boolean {
  const role = user?.user_metadata && (user.user_metadata as Record<string, unknown>).role;
  return role === 'admin';
}

export function isAdminSession(session: Session | null | undefined): boolean {
  return !!session?.user && isAdminUser(session.user);
}
