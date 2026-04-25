import { useState } from 'react';
import { Contact } from '@/lib/supabase';

interface Props {
  contacts: Contact[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  onSelectAll: () => void;
  onRowClick: (c: Contact) => void;
  onDelete: (ids: string[]) => void;
  onStatusChange: (id: string, status: 'read' | 'unread') => void;
  selectMode: boolean;
  onSelectModeChange: (v: boolean) => void;
}

export default function ContactTable({
  contacts, selectedIds, onSelect, onSelectAll, onRowClick,
  onDelete, onStatusChange, selectMode, onSelectModeChange,
}: Props) {
  const [longPressTimer, setLongPressTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const formatDate = (d: string) =>
    new Date(d).toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });

  const truncate = (s: string | null, n = 30) => {
    if (!s) return '-';
    return s.length > n ? s.slice(0, n) + '...' : s;
  };

  const handleTouchStart = (id: string) => {
    const t = setTimeout(() => {
      onSelectModeChange(true);
      onSelect(id);
    }, 600);
    setLongPressTimer(t);
  };

  const handleTouchEnd = () => {
    if (longPressTimer) clearTimeout(longPressTimer);
  };

  const BulkBar = (
    <div className="flex items-center gap-3 px-4 py-3 bg-[#f8f7f4] border-b border-[#0a0a0a]/8">
      <button onClick={onSelectAll} className="text-xs text-[#0a0a0a]/60 hover:text-[#0a0a0a] cursor-pointer whitespace-nowrap">
        {selectedIds.length === contacts.length ? '전체 해제' : '전체 선택'}
      </button>
      <span className="text-xs text-[#0a0a0a]/40">{selectedIds.length}개 선택됨</span>
      <div className="flex-1" />
      {selectedIds.length > 0 && (
        <button
          onClick={() => onDelete(selectedIds)}
          className="text-xs px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className="ri-delete-bin-line mr-1" />
          선택 삭제
        </button>
      )}
      <button
        onClick={() => { onSelectModeChange(false); }}
        className="text-xs text-[#0a0a0a]/40 hover:text-[#0a0a0a] cursor-pointer whitespace-nowrap"
      >
        취소
      </button>
    </div>
  );

  if (contacts.length === 0) {
    return (
      <div className="bg-white rounded-lg py-16 flex items-center justify-center">
        <p className="text-sm text-[#0a0a0a]/30">문의 내역이 없습니다</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      {selectMode && BulkBar}

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#0a0a0a]/6">
              {selectMode && (
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === contacts.length && contacts.length > 0}
                    onChange={onSelectAll}
                    className="cursor-pointer"
                  />
                </th>
              )}
              <th className="text-left px-4 py-3 text-[10px] text-[#0a0a0a]/35 tracking-widest uppercase font-normal">이름</th>
              <th className="text-left px-4 py-3 text-[10px] text-[#0a0a0a]/35 tracking-widest uppercase font-normal">연락처</th>
              <th className="text-left px-4 py-3 text-[10px] text-[#0a0a0a]/35 tracking-widest uppercase font-normal hidden lg:table-cell">이메일</th>
              <th className="text-left px-4 py-3 text-[10px] text-[#0a0a0a]/35 tracking-widest uppercase font-normal">내용</th>
              <th className="text-left px-4 py-3 text-[10px] text-[#0a0a0a]/35 tracking-widest uppercase font-normal">유형</th>
              <th className="text-left px-4 py-3 text-[10px] text-[#0a0a0a]/35 tracking-widest uppercase font-normal">상태</th>
              <th className="text-left px-4 py-3 text-[10px] text-[#0a0a0a]/35 tracking-widest uppercase font-normal">접수일</th>
              <th className="w-10 px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr
                key={c.id}
                className={`border-b border-[#0a0a0a]/4 hover:bg-[#f8f7f4] transition-colors cursor-pointer ${c.status === 'unread' ? 'bg-[#fffdf9]' : ''} ${selectedIds.includes(c.id) ? 'bg-[#f0ede8]' : ''}`}
                onClick={() => selectMode ? onSelect(c.id) : onRowClick(c)}
              >
                {selectMode && (
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(c.id)}
                      onChange={() => onSelect(c.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="cursor-pointer"
                    />
                  </td>
                )}
                <td className="px-4 py-3">
                  <span className={`text-sm whitespace-nowrap ${c.status === 'unread' ? 'font-medium text-[#0a0a0a]' : 'text-[#0a0a0a]/70'}`}>
                    {c.name}
                  </span>
                  {c.status === 'unread' && <span className="ml-2 w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />}
                </td>
                <td className="px-4 py-3 text-sm text-[#0a0a0a]/60 whitespace-nowrap">{c.phone || '-'}</td>
                <td className="px-4 py-3 text-sm text-[#0a0a0a]/60 hidden lg:table-cell">{truncate(c.email, 20)}</td>
                <td className="px-4 py-3 text-sm text-[#0a0a0a]/50">{truncate(c.message)}</td>
                <td className="px-4 py-3">
                  {c.type && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f5f4f0] text-[#0a0a0a]/50 whitespace-nowrap">{c.type}</span>}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); onStatusChange(c.id, c.status === 'unread' ? 'read' : 'unread'); }}
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium cursor-pointer transition-colors whitespace-nowrap ${c.status === 'unread' ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-[#0a0a0a]/6 text-[#0a0a0a]/40 hover:bg-[#0a0a0a]/10'}`}
                  >
                    {c.status === 'unread' ? '미확인' : '확인'}
                  </button>
                </td>
                <td className="px-4 py-3 text-xs text-[#0a0a0a]/35 whitespace-nowrap">{formatDate(c.created_at)}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete([c.id]); }}
                    className="w-6 h-6 flex items-center justify-center text-[#0a0a0a]/20 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <i className="ri-delete-bin-line text-xs" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden divide-y divide-[#0a0a0a]/6">
        {contacts.map((c) => (
          <div
            key={c.id}
            className={`px-4 py-4 cursor-pointer transition-colors active:bg-[#f5f4f0] ${c.status === 'unread' ? 'bg-[#fffdf9]' : ''} ${selectedIds.includes(c.id) ? 'bg-[#f0ede8]' : ''}`}
            onClick={() => selectMode ? onSelect(c.id) : onRowClick(c)}
            onTouchStart={() => !selectMode && handleTouchStart(c.id)}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                {selectMode && (
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(c.id)}
                    onChange={() => onSelect(c.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="cursor-pointer flex-shrink-0"
                  />
                )}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-sm font-medium ${c.status === 'unread' ? 'text-[#0a0a0a]' : 'text-[#0a0a0a]/70'}`}>
                    {c.name}
                  </span>
                  {c.status === 'unread' && <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block flex-shrink-0" />}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={(e) => { e.stopPropagation(); onStatusChange(c.id, c.status === 'unread' ? 'read' : 'unread'); }}
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium cursor-pointer transition-colors whitespace-nowrap ${c.status === 'unread' ? 'bg-red-50 text-red-500' : 'bg-[#0a0a0a]/6 text-[#0a0a0a]/40'}`}
                >
                  {c.status === 'unread' ? '미확인' : '확인'}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete([c.id]); }}
                  className="w-6 h-6 flex items-center justify-center text-[#0a0a0a]/20 active:text-red-400 transition-colors cursor-pointer"
                >
                  <i className="ri-delete-bin-line text-xs" />
                </button>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              {c.phone && (
                <span className="text-xs text-[#0a0a0a]/50">{c.phone}</span>
              )}
              {c.type && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f5f4f0] text-[#0a0a0a]/50">{c.type}</span>
              )}
              <span className="text-[10px] text-[#0a0a0a]/30">{formatDate(c.created_at)}</span>
            </div>

            {c.message && (
              <p className="mt-2 text-xs text-[#0a0a0a]/50 leading-relaxed line-clamp-2">{c.message}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
