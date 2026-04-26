import { PROJECT_REQUEST_STATUSES, ProjectRequestFilters as Filters } from '@/lib/projectRequests';

type Props = {
  filters: Filters;
  onChange: (filters: Filters) => void;
};

export default function ProjectRequestFilters({ filters, onChange }: Props) {
  const set = (partial: Partial<Filters>) => onChange({ ...filters, ...partial });

  return (
    <div className="bg-white rounded-lg p-4 mb-4 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          type="text"
          value={filters.companyName}
          onChange={(event) => set({ companyName: event.target.value })}
          placeholder="업체명 검색"
          className="px-4 py-2.5 border border-[#0a0a0a]/10 rounded-md text-sm text-[#0a0a0a] placeholder-[#0a0a0a]/25 focus:outline-none focus:border-[#0a0a0a]/25 transition-colors"
        />
        <input
          type="text"
          value={filters.clientName}
          onChange={(event) => set({ clientName: event.target.value })}
          placeholder="담당자명 검색"
          className="px-4 py-2.5 border border-[#0a0a0a]/10 rounded-md text-sm text-[#0a0a0a] placeholder-[#0a0a0a]/25 focus:outline-none focus:border-[#0a0a0a]/25 transition-colors"
        />
        <input
          type="tel"
          value={filters.phone}
          onChange={(event) => set({ phone: event.target.value })}
          placeholder="연락처 검색"
          className="px-4 py-2.5 border border-[#0a0a0a]/10 rounded-md text-sm text-[#0a0a0a] placeholder-[#0a0a0a]/25 focus:outline-none focus:border-[#0a0a0a]/25 transition-colors"
        />
        <input
          type="text"
          value={filters.businessType}
          onChange={(event) => set({ businessType: event.target.value })}
          placeholder="업종 검색"
          className="px-4 py-2.5 border border-[#0a0a0a]/10 rounded-md text-sm text-[#0a0a0a] placeholder-[#0a0a0a]/25 focus:outline-none focus:border-[#0a0a0a]/25 transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => set({ status: 'all' })}
          className={`px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
            filters.status === 'all' ? 'bg-[#0a0a0a] text-white' : 'bg-[#f8f7f4] text-[#0a0a0a]/50 hover:text-[#0a0a0a]'
          }`}
        >
          전체
        </button>
        {PROJECT_REQUEST_STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => set({ status })}
            className={`px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
              filters.status === status ? 'bg-[#0a0a0a] text-white' : 'bg-[#f8f7f4] text-[#0a0a0a]/50 hover:text-[#0a0a0a]'
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}
