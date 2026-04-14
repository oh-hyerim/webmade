import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

interface AdminLayoutProps {
  children: React.ReactNode;
  unreadCount?: number;
}

export default function AdminLayout({ children, unreadCount = 0 }: AdminLayoutProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Nav */}
      <header className="bg-white border-b border-[#E2E8F0] px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center bg-[#0F172A] rounded-lg">
            <i className="ri-shield-keyhole-line text-white text-sm"></i>
          </div>
          <span className="font-bold text-[#0F172A] text-sm">WebMade 관리자</span>
        </div>
        <div className="flex items-center gap-4">
          {unreadCount > 0 && (
            <span className="text-xs font-semibold text-white bg-red-400 px-2.5 py-1 rounded-full whitespace-nowrap">
              미확인 {unreadCount}건
            </span>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#0F172A] cursor-pointer transition-colors whitespace-nowrap"
          >
            <i className="ri-logout-box-r-line"></i>
            로그아웃
          </button>
        </div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
