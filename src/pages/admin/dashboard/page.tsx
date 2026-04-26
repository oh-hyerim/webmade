import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { supabase, Contact } from '@/lib/supabase';
import ContactDetailModal from './components/ContactDetailModal';
import ContactFilters, { FilterState } from './components/ContactFilters';
import ContactTable from './components/ContactTable';
import StatsCharts from './components/StatsCharts';

const PAGE_SIZE = 30;

function exportCSV(contacts: Contact[]) {
  const headers = ['이름', '연락처', '이메일', '유형', '상태', '문의내용', '접수일'];
  const rows = contacts.map((c) => [
    c.name,
    c.phone || '',
    c.email || '',
    c.type || '',
    c.status === 'unread' ? '미확인' : '확인',
    (c.message || '').replace(/\n/g, ' '),
    new Date(c.created_at).toLocaleString('ko-KR'),
  ]);
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `contacts_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectMode, setSelectMode] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ status: 'all', type: 'all', search: '', dates: [] });
  const [unreadCount, setUnreadCount] = useState(0);
  const [showUnreadBanner, setShowUnreadBanner] = useState(false);
  const prevCountRef = useRef(0);
  const audioRef = useRef<AudioContext | null>(null);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('contacts').select('*', { count: 'exact' }).order('created_at', { ascending: false });

    if (filters.status !== 'all') query = query.eq('status', filters.status);
    if (filters.type !== 'all') query = query.eq('type', filters.type);
    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,phone.ilike.%${filters.search}%,message.ilike.%${filters.search}%`);
    }
    if (filters.dates.length > 0) {
      const orClauses = filters.dates
        .map(d => `and(created_at.gte.${d}T00:00:00,created_at.lte.${d}T23:59:59)`)
        .join(',');
      query = query.or(orClauses);
    }

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    const { data, count } = await query.range(from, to);

    setContacts((data as Contact[]) || []);
    setTotalCount(count || 0);
    setLoading(false);
  }, [filters, page]);

  const fetchAllForStats = useCallback(async () => {
    const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
    setAllContacts((data as Contact[]) || []);
    const unread = (data as Contact[])?.filter(c => c.status === 'unread').length || 0;
    setUnreadCount(unread);
    if (unread > 0) setShowUnreadBanner(true);

    // Browser notification for new contacts
    if (prevCountRef.current > 0 && (data?.length || 0) > prevCountRef.current) {
      if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        try {
          new Notification('새 문의가 접수되었습니다', { body: '웹메이드 관리자 페이지' });
        } catch {
          // ignore
        }
      }
      playNotificationSound();
    }
    prevCountRef.current = data?.length || 0;
  }, []);

  const playNotificationSound = () => {
    try {
      const AudioCtx = (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext }).AudioContext
        || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.4);
      audioRef.current = ctx;
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/admin/login');
    });
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {});
    }
  }, [navigate]);

  useEffect(() => { fetchContacts(); }, [fetchContacts]);
  useEffect(() => { fetchAllForStats(); }, [fetchAllForStats]);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('contacts-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contacts' }, () => {
        fetchContacts();
        fetchAllForStats();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetchContacts, fetchAllForStats]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const handleUpdate = (updated: Contact) => {
    setContacts(prev => prev.map(c => c.id === updated.id ? updated : c));
    setAllContacts(prev => prev.map(c => c.id === updated.id ? updated : c));
    if (selectedContact?.id === updated.id) setSelectedContact(updated);
  };

  const handleDelete = async (ids: string[]) => {
    if (!confirm(`${ids.length}개의 문의를 삭제하시겠습니까?`)) return;
    await supabase.from('contacts').delete().in('id', ids);
    setContacts(prev => prev.filter(c => !ids.includes(c.id)));
    setAllContacts(prev => prev.filter(c => !ids.includes(c.id)));
    setSelectedIds([]);
    setSelectMode(false);
    fetchContacts();
  };

  const handleStatusChange = async (id: string, status: 'read' | 'unread') => {
    const { data } = await supabase.from('contacts').update({ status }).eq('id', id).select().maybeSingle();
    if (data) handleUpdate(data as Contact);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === contacts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(contacts.map(c => c.id));
    }
  };

  // Sync selectedContact with URL query param ?contact=<id>
  useEffect(() => {
    const contactId = searchParams.get('contact');
    if (!contactId) {
      setSelectedContact(null);
      return;
    }
    const found = contacts.find(c => c.id === contactId) || allContacts.find(c => c.id === contactId);
    if (found) {
      setSelectedContact(found);
    } else {
      supabase.from('contacts').select('*').eq('id', contactId).maybeSingle().then(({ data }) => {
        if (data) setSelectedContact(data as Contact);
      });
    }
  }, [searchParams, contacts, allContacts]);

  const handleRowClick = async (c: Contact) => {
    const params = new URLSearchParams(searchParams);
    params.set('contact', c.id);
    navigate(`/admin?${params.toString()}`);
    if (c.status === 'unread') {
      handleStatusChange(c.id, 'read');
    }
  };

  const handleModalClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('contact');
    const query = params.toString();
    navigate(query ? `/admin?${query}` : '/admin', { replace: true });
  };

  // Handle browser back button to close popup only
  useEffect(() => {
    const onPopState = () => {
      const p = new URLSearchParams(window.location.search);
      if (!p.get('contact')) {
        setSelectedContact(null);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      {/* Unread banner */}
      {showUnreadBanner && unreadCount > 0 && (
        <div className="bg-[#0a0a0a] text-white px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            <span className="text-xs">미확인 문의 {unreadCount}건이 있습니다</span>
          </div>
          <button onClick={() => setShowUnreadBanner(false)} className="text-white/50 hover:text-white cursor-pointer">
            <i className="ri-close-line text-sm" />
          </button>
        </div>
      )}

      {/* Top nav */}
      <header className="bg-white border-b border-[#0a0a0a]/8 px-4 md:px-6 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            <p className="font-serif text-[#0a0a0a] text-base whitespace-nowrap">웹메이드</p>
            <span className="text-[#0a0a0a]/20 text-xs hidden sm:block">|</span>
            <span className="text-xs text-[#0a0a0a]/40 tracking-widest uppercase hidden sm:block">Admin</span>
            {unreadCount > 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-50 text-red-500 font-medium whitespace-nowrap">
                미확인 {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/admin/project-requests')}
              className="flex items-center gap-1 md:gap-1.5 px-2.5 md:px-3 py-1.5 border border-[#0a0a0a]/15 rounded-md text-xs text-[#0a0a0a]/60 hover:border-[#0a0a0a]/30 hover:text-[#0a0a0a] transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-file-list-3-line" />
              <span className="hidden sm:inline">요청서</span>
            </button>
            <button
              onClick={() => exportCSV(allContacts)}
              className="flex items-center gap-1 md:gap-1.5 px-2.5 md:px-3 py-1.5 border border-[#0a0a0a]/15 rounded-md text-xs text-[#0a0a0a]/60 hover:border-[#0a0a0a]/30 hover:text-[#0a0a0a] transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-download-line" />
              <span className="hidden sm:inline">CSV</span>
            </button>
            <button
              onClick={() => setShowStats(v => !v)}
              className={`flex items-center gap-1 md:gap-1.5 px-2.5 md:px-3 py-1.5 border rounded-md text-xs transition-colors cursor-pointer whitespace-nowrap ${showStats ? 'border-[#0a0a0a] text-[#0a0a0a]' : 'border-[#0a0a0a]/15 text-[#0a0a0a]/60 hover:border-[#0a0a0a]/30'}`}
            >
              <i className="ri-bar-chart-line" />
              <span className="hidden sm:inline">통계</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 md:gap-1.5 px-2.5 md:px-3 py-1.5 text-xs text-[#0a0a0a]/40 hover:text-[#0a0a0a] transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-logout-box-line" />
              <span className="hidden sm:inline">로그아웃</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
        {/* Stats */}
        {showStats && <StatsCharts contacts={allContacts} />}

        {/* Summary */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-[#0a0a0a]/50">
            전체 <span className="font-medium text-[#0a0a0a]">{totalCount}</span>건
            {filters.status !== 'all' || filters.type !== 'all' || filters.search || filters.dates.length > 0
              ? ' (필터 적용됨)'
              : ''}
          </p>
          <button
            onClick={() => { setSelectMode(v => !v); setSelectedIds([]); }}
            className="text-xs text-[#0a0a0a]/40 hover:text-[#0a0a0a] cursor-pointer whitespace-nowrap"
          >
            {selectMode ? '선택 취소' : '선택 모드'}
          </button>
        </div>

        {/* Filters */}
        <ContactFilters filters={filters} onChange={(f) => { setFilters(f); setPage(1); }} />

        {/* Table */}
        {loading ? (
          <div className="bg-white rounded-lg py-20 flex items-center justify-center">
            <i className="ri-loader-4-line animate-spin text-[#0a0a0a]/30 text-2xl" />
          </div>
        ) : (
          <ContactTable
            contacts={contacts}
            selectedIds={selectedIds}
            onSelect={(id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])}
            onSelectAll={handleSelectAll}
            onRowClick={handleRowClick}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            selectMode={selectMode}
            onSelectModeChange={setSelectMode}
          />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center border border-[#0a0a0a]/15 rounded-md text-[#0a0a0a]/50 hover:border-[#0a0a0a]/30 disabled:opacity-30 cursor-pointer transition-colors"
            >
              <i className="ri-arrow-left-s-line" />
            </button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 flex items-center justify-center rounded-md text-xs transition-colors cursor-pointer ${page === p ? 'bg-[#0a0a0a] text-white' : 'text-[#0a0a0a]/50 hover:bg-[#f5f4f0]'}`}
                >
                  {p}
                </button>
              );
            })}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 flex items-center justify-center border border-[#0a0a0a]/15 rounded-md text-[#0a0a0a]/50 hover:border-[#0a0a0a]/30 disabled:opacity-30 cursor-pointer transition-colors"
            >
              <i className="ri-arrow-right-s-line" />
            </button>
          </div>
        )}
      </main>

      {/* Detail modal */}
      <ContactDetailModal
        contact={selectedContact}
        onClose={handleModalClose}
        onUpdate={handleUpdate}
        onDelete={(id) => {
          setContacts(prev => prev.filter(c => c.id !== id));
          setAllContacts(prev => prev.filter(c => c.id !== id));
          handleModalClose();
        }}
      />
    </div>
  );
}
