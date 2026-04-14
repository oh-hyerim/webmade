import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import AdminLayout from './components/AdminLayout';
import StatsSection from './components/StatsSection';
import ContactsTab from './components/ContactsTab';
import RequestsTab from './components/RequestsTab';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'contacts' | 'requests'>('contacts');
  const [stats, setStats] = useState({ contactTotal: 0, contactUnread: 0, requestTotal: 0, requestUnread: 0 });
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [{ count: ct }, { count: cu }, { count: rt }, { count: ru }] = await Promise.all([
          supabase.from('contacts').select('*', { count: 'exact', head: true }),
          supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('status', 'unread'),
          supabase.from('requests').select('*', { count: 'exact', head: true }),
          supabase.from('requests').select('*', { count: 'exact', head: true }).eq('status', 'unread'),
        ]);
        const unread = (cu ?? 0) + (ru ?? 0);
        setStats({ contactTotal: ct ?? 0, contactUnread: cu ?? 0, requestTotal: rt ?? 0, requestUnread: ru ?? 0 });
        if (unread > 0) setShowBanner(true);
      } catch {
        // stats 로드 실패 시 기본값 유지
      }
    };
    fetchStats();
  }, []);

  const totalUnread = stats.contactUnread + stats.requestUnread;

  return (
    <AdminLayout unreadCount={totalUnread}>
      {showBanner && totalUnread > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="ri-notification-3-line text-red-400 text-sm"></i>
            <span className="text-sm text-red-600 font-medium">미확인 항목이 <strong>{totalUnread}건</strong> 있습니다.</span>
          </div>
          <button onClick={() => setShowBanner(false)} className="text-red-300 hover:text-red-500 cursor-pointer transition-colors">
            <i className="ri-close-line text-sm"></i>
          </button>
        </div>
      )}

      <StatsSection {...stats} />

      {/* Tabs */}
      <div className="flex gap-1 bg-[#F1F5F9] p-1 rounded-xl w-fit mb-5">
        {(['contacts', 'requests'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors whitespace-nowrap ${activeTab === tab ? 'bg-white text-[#0F172A]' : 'text-[#64748B] hover:text-[#0F172A]'}`}
          >
            {tab === 'contacts' ? (
              <span className="flex items-center gap-1.5">
                상담 문의
                {stats.contactUnread > 0 && <span className="text-[10px] bg-red-400 text-white px-1.5 py-0.5 rounded-full">{stats.contactUnread}</span>}
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                제작 요청서
                {stats.requestUnread > 0 && <span className="text-[10px] bg-red-400 text-white px-1.5 py-0.5 rounded-full">{stats.requestUnread}</span>}
              </span>
            )}
          </button>
        ))}
      </div>

      {activeTab === 'contacts' ? <ContactsTab /> : <RequestsTab />}
    </AdminLayout>
  );
}
