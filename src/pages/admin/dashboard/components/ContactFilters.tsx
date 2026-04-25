import { useState } from 'react';

export interface FilterState {
  status: string;
  type: string;
  search: string;
  dates: string[];
}

interface Props {
  filters: FilterState;
  onChange: (f: FilterState) => void;
}

const MONTHS = ['일', '월', '화', '수', '목', '금', '토'];

function CalendarPicker({ selected, onToggle }: { selected: string[]; onToggle: (d: string) => void }) {
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const { year, month } = viewDate;
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const toKey = (d: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  return (
    <div className="bg-white border border-[#0a0a0a]/10 rounded-lg p-3 w-64">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setViewDate(v => {
          const d = new Date(v.year, v.month - 1);
          return { year: d.getFullYear(), month: d.getMonth() };
        })} className="w-6 h-6 flex items-center justify-center text-[#0a0a0a]/40 hover:text-[#0a0a0a] cursor-pointer">
          <i className="ri-arrow-left-s-line" />
        </button>
        <span className="text-xs font-medium text-[#0a0a0a]">{year}년 {month + 1}월</span>
        <button onClick={() => setViewDate(v => {
          const d = new Date(v.year, v.month + 1);
          return { year: d.getFullYear(), month: d.getMonth() };
        })} className="w-6 h-6 flex items-center justify-center text-[#0a0a0a]/40 hover:text-[#0a0a0a] cursor-pointer">
          <i className="ri-arrow-right-s-line" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {MONTHS.map(d => <div key={d} className="text-center text-[9px] text-[#0a0a0a]/30 py-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const key = toKey(d);
          const isSelected = selected.includes(key);
          return (
            <button
              key={key}
              onClick={() => onToggle(key)}
              className={`text-center text-xs py-1.5 rounded cursor-pointer transition-colors ${isSelected ? 'bg-[#0a0a0a] text-white' : 'text-[#0a0a0a]/60 hover:bg-[#f5f4f0]'}`}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ContactFilters({ filters, onChange }: Props) {
  const [showCalendar, setShowCalendar] = useState(false);

  const set = (partial: Partial<FilterState>) => onChange({ ...filters, ...partial });

  const toggleDate = (d: string) => {
    const dates = filters.dates.includes(d)
      ? filters.dates.filter(x => x !== d)
      : [...filters.dates, d];
    set({ dates });
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-4 space-y-3">
      {/* Search */}
      <div className="relative">
        <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-[#0a0a0a]/30 text-sm" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => set({ search: e.target.value })}
          placeholder="이름, 연락처, 내용 검색..."
          className="w-full pl-9 pr-4 py-2.5 border border-[#0a0a0a]/10 rounded-md text-sm text-[#0a0a0a] placeholder-[#0a0a0a]/25 focus:outline-none focus:border-[#0a0a0a]/25 transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        {/* Status filter */}
        <div className="flex items-center gap-1 bg-[#f8f7f4] rounded-full p-1">
          {[['all', '전체'], ['unread', '미확인'], ['read', '확인']].map(([val, label]) => (
            <button
              key={val}
              onClick={() => set({ status: val })}
              className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer whitespace-nowrap ${filters.status === val ? 'bg-[#0a0a0a] text-white' : 'text-[#0a0a0a]/50 hover:text-[#0a0a0a]'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Type filter */}
        <div className="flex items-center gap-1 bg-[#f8f7f4] rounded-full p-1">
          {[['all', '전체'], ['예약문의', '예약'], ['가격문의', '가격'], ['기타', '기타']].map(([val, label]) => (
            <button
              key={val}
              onClick={() => set({ type: val })}
              className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer whitespace-nowrap ${filters.type === val ? 'bg-[#0a0a0a] text-white' : 'text-[#0a0a0a]/50 hover:text-[#0a0a0a]'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Date filter */}
        <div className="relative">
          <button
            onClick={() => setShowCalendar(v => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-full text-xs transition-colors cursor-pointer whitespace-nowrap ${filters.dates.length > 0 ? 'border-[#0a0a0a] text-[#0a0a0a]' : 'border-[#0a0a0a]/15 text-[#0a0a0a]/50 hover:border-[#0a0a0a]/30'}`}
          >
            <i className="ri-calendar-line" />
            날짜 {filters.dates.length > 0 && `(${filters.dates.length})`}
          </button>
          {showCalendar && (
            <div className="absolute top-full left-0 mt-2 z-20">
              <CalendarPicker selected={filters.dates} onToggle={toggleDate} />
            </div>
          )}
        </div>

        {/* Clear dates */}
        {filters.dates.length > 0 && (
          <button
            onClick={() => set({ dates: [] })}
            className="text-xs text-[#0a0a0a]/40 hover:text-[#0a0a0a] cursor-pointer whitespace-nowrap"
          >
            날짜 초기화
          </button>
        )}
      </div>
    </div>
  );
}
