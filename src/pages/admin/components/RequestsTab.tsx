import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { sanitizeSearchInput } from '@/lib/sanitizeSearch';
import RequestDetailModal from './RequestDetailModal';

interface Request {
  id: string;
  name: string;
  email?: string;
  company_name?: string;
  industry?: string;
  services?: string;
  purpose?: string;
  target?: string;
  keywords?: string;
  region?: string;
  competitors?: string;
  faq_topics?: string;
  key_points?: string;
  emphasis?: string;
  must_have?: string;
  detail?: string;
  menu?: string;
  mood?: string;
  color_main?: string;
  color_ref?: string;
  ref_site?: string;
  avoid_style?: string;
  phone?: string;
  kakao?: string;
  contact_other?: string;
  extra?: string;
  status: string;
  admin_note?: string;
  created_at: string;
}

const PAGE_SIZE = 30;

export default function RequestsTab() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [detail, setDetail] = useState<Request | null>(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateInput, setDateInput] = useState('');

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('requests')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

      if (statusFilter !== 'all') query = query.eq('status', statusFilter);
      if (search) {
        const q = sanitizeSearchInput(search);
        if (q) {
          query = query.or(`name.ilike.%${q}%,phone.ilike.%${q}%,company_name.ilike.%${q}%`);
        }
      }
      if (selectedDates.length === 1) {
        query = query
          .gte('created_at', `${selectedDates[0]}T00:00:00`)
          .lte('created_at', `${selectedDates[0]}T23:59:59`);
      } else if (selectedDates.length > 1) {
        const sorted = [...selectedDates].sort();
        query = query
          .gte('created_at', `${sorted[0]}T00:00:00`)
          .lte('created_at', `${sorted[sorted.length - 1]}T23:59:59`);
      }

      const { data, count, error } = await query;
      if (error) throw error;
      let filtered = data ?? [];
      if (selectedDates.length > 1) {
        filtered = filtered.filter((r) => {
          const d = new Date(r.created_at).toISOString().slice(0, 10);
          return selectedDates.includes(d);
        });
      }
      setRequests(filtered);
      setTotal(selectedDates.length > 1 ? filtered.length : (count ?? 0));
    } catch {
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, search, selectedDates]);

  useEffect(() => { fetchRequests(); }, [fetchRequests]);

  const toggleSelect = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const selectAll = () => {
    if (selected.length === requests.length) setSelected([]);
    else setSelected(requests.map(r => r.id));
  };

  const deleteSelected = async () => {
    if (!window.confirm(`${selected.length}건을 삭제하시겠습니까?`)) return;
    await supabase.from('requests').delete().in('id', selected);
    setSelected([]);
    setEditMode(false);
    fetchRequests();
  };

  const handleRowClick = async (r: Request) => {
    if (editMode) { toggleSelect(r.id); return; }
    if (r.status === 'unread') {
      await supabase.from('requests').update({ status: 'read' }).eq('id', r.id);
      setRequests(prev => prev.map(item => item.id === r.id ? { ...item, status: 'read' } : item));
    }
    setDetail({ ...r, status: 'read' });
  };

  const exportCSV = () => {
    const headers = ['이름', '업체명', '업종', '연락처', '이메일', '목적', '지역', '상태', '접수일'];
    const rows = requests.map(r => [
      r.name, r.company_name ?? '', r.industry ?? '', r.phone ?? '', r.email ?? '',
      r.purpose ?? '', r.region ?? '',
      r.status === 'unread' ? '미확인' : '확인됨',
      new Date(r.created_at).toLocaleDateString('ko-KR'),
    ]);
    const csv = [headers, ...rows].map(row => row.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `requests_${new Date().toISOString().slice(0,10)}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const toggleDate = (d: string) => {
    setSelectedDates(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div>
      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 mb-4 flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 flex-1 min-w-[200px] border border-[#E2E8F0] rounded-xl px-3 py-2 bg-[#F8FAFC]">
          <i className="ri-search-line text-[#94A3B8] text-sm"></i>
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            placeholder="이름, 업체명, 연락처 검색"
            className="flex-1 text-sm bg-transparent focus:outline-none text-[#0F172A] placeholder-[#CBD5E1]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }}
          className="border border-[#E2E8F0] rounded-xl px-3 py-2 text-sm text-[#334155] bg-[#F8FAFC] focus:outline-none cursor-pointer"
        >
          <option value="all">전체 상태</option>
          <option value="unread">미확인</option>
          <option value="read">확인됨</option>
        </select>
        <div className="relative">
          <button
            onClick={() => setShowDatePicker(p => !p)}
            className={`flex items-center gap-1.5 border rounded-xl px-3 py-2 text-sm cursor-pointer transition-colors whitespace-nowrap ${selectedDates.length > 0 ? 'border-[#0F172A] text-[#0F172A] bg-[#F1F5F9]' : 'border-[#E2E8F0] text-[#334155] bg-[#F8FAFC]'}`}
          >
            <i className="ri-calendar-line text-sm"></i>
            날짜 {selectedDates.length > 0 && `(${selectedDates.length})`}
          </button>
          {showDatePicker && (
            <div className="absolute right-0 top-10 z-30 bg-white border border-[#E2E8F0] rounded-xl p-3 shadow-lg w-64">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-[#0F172A]">날짜 선택</p>
                {selectedDates.length > 0 && (
                  <button onClick={() => setSelectedDates([])} className="text-[10px] text-red-400 cursor-pointer whitespace-nowrap">초기화</button>
                )}
              </div>
              <input
                type="date"
                value={dateInput}
                onChange={(e) => { setDateInput(e.target.value); if (e.target.value) toggleDate(e.target.value); }}
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none bg-[#F8FAFC]"
              />
              {selectedDates.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {selectedDates.map(d => (
                    <span key={d} className="inline-flex items-center gap-1 text-[10px] bg-[#F1F5F9] text-[#334155] px-2 py-0.5 rounded-full">
                      {d}
                      <button onClick={() => toggleDate(d)} className="cursor-pointer text-[#94A3B8] hover:text-red-400">
                        <i className="ri-close-line text-[10px]"></i>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-2 ml-auto">
          <button
            onClick={() => { setEditMode(p => !p); setSelected([]); }}
            className={`text-xs font-semibold px-3 py-2 rounded-xl border cursor-pointer transition-colors whitespace-nowrap ${editMode ? 'bg-[#0F172A] text-white border-[#0F172A]' : 'border-[#E2E8F0] text-[#334155] bg-[#F8FAFC]'}`}
          >
            {editMode ? '편집 종료' : '편집'}
          </button>
          <button onClick={exportCSV} className="text-xs font-semibold px-3 py-2 rounded-xl border border-[#E2E8F0] text-[#334155] bg-[#F8FAFC] cursor-pointer hover:bg-[#F1F5F9] transition-colors whitespace-nowrap">
            <i className="ri-download-line mr-1"></i>CSV
          </button>
        </div>
      </div>

      {editMode && (
        <div className="bg-[#0F172A] text-white rounded-xl px-4 py-3 mb-4 flex items-center gap-4">
          <button onClick={selectAll} className="text-xs font-semibold cursor-pointer whitespace-nowrap hover:text-[#94A3B8] transition-colors">
            {selected.length === requests.length ? '전체 해제' : '전체 선택'}
          </button>
          <span className="text-xs text-[#94A3B8]">{selected.length}건 선택됨</span>
          {selected.length > 0 && (
            <button onClick={deleteSelected} className="ml-auto text-xs font-semibold text-red-400 cursor-pointer whitespace-nowrap hover:text-red-300 transition-colors">
              선택 삭제
            </button>
          )}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-[#0F172A] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-20 text-[#94A3B8] text-sm">요청서가 없습니다.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  {editMode && <th className="px-4 py-3 w-10"></th>}
                  <th className="px-4 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase whitespace-nowrap">이름</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase whitespace-nowrap hidden md:table-cell">업체명</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase whitespace-nowrap hidden lg:table-cell">업종</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase whitespace-nowrap">연락처</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase whitespace-nowrap hidden lg:table-cell">목적</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase whitespace-nowrap">상태</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold text-[#94A3B8] uppercase whitespace-nowrap hidden lg:table-cell">접수일</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => handleRowClick(r)}
                    className={`border-b border-[#F1F5F9] cursor-pointer transition-colors hover:bg-[#F8FAFC] ${r.status === 'unread' ? 'bg-red-50/40' : ''} ${selected.includes(r.id) ? 'bg-[#EEF2FF]' : ''}`}
                  >
                    {editMode && (
                      <td className="px-4 py-3">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${selected.includes(r.id) ? 'bg-[#0F172A] border-[#0F172A]' : 'border-[#CBD5E1]'}`}>
                          {selected.includes(r.id) && <i className="ri-check-line text-white text-[10px]"></i>}
                        </div>
                      </td>
                    )}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {r.status === 'unread' && <span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0"></span>}
                        <span className="text-sm font-medium text-[#0F172A] whitespace-nowrap">{r.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#334155] hidden md:table-cell whitespace-nowrap">{r.company_name ?? '-'}</td>
                    <td className="px-4 py-3 text-sm text-[#334155] hidden lg:table-cell whitespace-nowrap">{r.industry ?? '-'}</td>
                    <td className="px-4 py-3 text-sm text-[#334155] whitespace-nowrap">{r.phone ?? '-'}</td>
                    <td className="px-4 py-3 text-xs text-[#334155] hidden lg:table-cell max-w-[120px] truncate">{r.purpose ?? '-'}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${r.status === 'unread' ? 'bg-red-100 text-red-500' : 'bg-[#F1F5F9] text-[#64748B]'}`}>
                        {r.status === 'unread' ? '미확인' : '확인됨'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#94A3B8] hidden lg:table-cell whitespace-nowrap">
                      {new Date(r.created_at).toLocaleDateString('ko-KR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
            className="w-8 h-8 flex items-center justify-center border border-[#E2E8F0] rounded-lg text-[#334155] cursor-pointer hover:bg-[#F8FAFC] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            <i className="ri-arrow-left-s-line text-sm"></i>
          </button>
          <span className="text-xs text-[#64748B]">{page + 1} / {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
            className="w-8 h-8 flex items-center justify-center border border-[#E2E8F0] rounded-lg text-[#334155] cursor-pointer hover:bg-[#F8FAFC] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            <i className="ri-arrow-right-s-line text-sm"></i>
          </button>
        </div>
      )}

      {detail && (
        <RequestDetailModal
          request={detail}
          onClose={() => setDetail(null)}
          onUpdate={() => { fetchRequests(); setDetail(null); }}
        />
      )}
    </div>
  );
}
