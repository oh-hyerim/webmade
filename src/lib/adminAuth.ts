const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || '')
  .split(',')
  .map((email: string) => email.trim().toLowerCase())
  .filter(Boolean);

export function isAdminEmail(email?: string | null) {
  if (!email) return false;
  return adminEmails.includes(email.trim().toLowerCase());
}

export function hasAdminEmailConfig() {
  return adminEmails.length > 0;
}
