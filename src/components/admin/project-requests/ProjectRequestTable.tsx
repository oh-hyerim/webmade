import { ProjectRequest } from '@/lib/projectRequests';

type Props = {
  requests: ProjectRequest[];
  selectedIds: string[];
  onSelect: (id: string) => void;
  onSelectAll: () => void;
  onOpen: (request: ProjectRequest) => void;
  onDelete: (ids: string[]) => void;
};

function formatDate(value: string) {
  return new Date(value).toLocaleString('ko-KR', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function summarize(values: string[]) {
  if (!values || values.length === 0) return '-';
  if (values.length <= 2) return values.join(', ');
  return `${values.slice(0, 2).join(', ')} 외 ${values.length - 2}`;
}

export default function ProjectRequestTable({
  requests,
  selectedIds,
  onSelect,
  onSelectAll,
  onOpen,
  onDelete,
}: Props) {
  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-lg py-16 flex items-center justify-center">
        <p className="text-sm text-[#0a0a0a]/30">제작요청서가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 bg-[#f8f7f4] border-b border-[#0a0a0a]/8">
        <button onClick={onSelectAll} className="text-xs text-[#0a0a0a]/60 hover:text-[#0a0a0a] cursor-pointer whitespace-nowrap">
          {selectedIds.length === requests.length ? '전체 해제' : '전체 선택'}
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
      </div>

      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#0a0a0a]/6">
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedIds.length === requests.length && requests.length > 0}
                  onChange={onSelectAll}
                  className="cursor-pointer"
                />
              </th>
              <th className="text-left px-4 py-3 text-[10px] text-[#0a0a0a]/35 tracking-widest uppercase font-normal">제출일</th>
              <th className="text-left px-4 py-3 text-[10px] text-[#0a0a0a]/35 tracking-widest uppercase font-normal">업체명</th>
              <th className="text-left px-4 py-3 text-[10px] text-[#0a0a0a]/35 tracking-widest uppercase font-normal">담당자</th>
              <th className="text-left px-4 py-3 text-[10px] text-[#0a0a0a]/35 tracking-widest uppercase font-normal">연락처</th>
              <th className="text-left px-4 py-3 text-[10px] text-[#0a0a0a]/35 tracking-widest uppercase font-normal">업종</th>
              <th className="text-left px-4 py-3 text-[10px] text-[#0a0a0a]/35 tracking-widest uppercase font-normal">제작 목적</th>
              <th className="text-left px-4 py-3 text-[10px] text-[#0a0a0a]/35 tracking-widest uppercase font-normal">상태</th>
              <th className="w-28 px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border-b border-[#0a0a0a]/4 hover:bg-[#f8f7f4] transition-colors">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(request.id)}
                    onChange={() => onSelect(request.id)}
                    className="cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3 text-xs text-[#0a0a0a]/40 whitespace-nowrap">{formatDate(request.created_at)}</td>
                <td className="px-4 py-3 text-sm text-[#0a0a0a] font-medium">{request.company_name}</td>
                <td className="px-4 py-3 text-sm text-[#0a0a0a]/70 whitespace-nowrap">{request.client_name}</td>
                <td className="px-4 py-3 text-sm text-[#0a0a0a]/60 whitespace-nowrap">{request.phone}</td>
                <td className="px-4 py-3 text-sm text-[#0a0a0a]/60">{request.business_type}</td>
                <td className="px-4 py-3 text-sm text-[#0a0a0a]/50">{summarize(request.main_purpose)}</td>
                <td className="px-4 py-3">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f5f4f0] text-[#0a0a0a]/55 whitespace-nowrap">
                    {request.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onOpen(request)}
                      className="px-2.5 py-1.5 text-xs border border-[#0a0a0a]/15 rounded-md text-[#0a0a0a]/60 hover:text-[#0a0a0a] hover:border-[#0a0a0a]/30 cursor-pointer whitespace-nowrap"
                    >
                      상세보기
                    </button>
                    <button
                      onClick={() => onDelete([request.id])}
                      className="w-7 h-7 flex items-center justify-center text-[#0a0a0a]/20 hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <i className="ri-delete-bin-line text-xs" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden divide-y divide-[#0a0a0a]/6">
        {requests.map((request) => (
          <div key={request.id} className="p-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={selectedIds.includes(request.id)}
                onChange={() => onSelect(request.id)}
                className="mt-1 cursor-pointer flex-shrink-0"
              />
              <button onClick={() => onOpen(request)} className="flex-1 min-w-0 text-left cursor-pointer">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#0a0a0a] truncate">{request.company_name}</p>
                    <p className="text-xs text-[#0a0a0a]/45 mt-1">{request.client_name} · {request.phone}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f5f4f0] text-[#0a0a0a]/55 whitespace-nowrap">
                    {request.status}
                  </span>
                </div>
                <p className="text-xs text-[#0a0a0a]/45">{request.business_type}</p>
                <p className="text-xs text-[#0a0a0a]/55 mt-2 line-clamp-2">{summarize(request.main_purpose)}</p>
                <p className="text-[10px] text-[#0a0a0a]/30 mt-2">{formatDate(request.created_at)}</p>
              </button>
              <button
                onClick={() => onDelete([request.id])}
                className="w-7 h-7 flex items-center justify-center text-[#0a0a0a]/20 hover:text-red-400 transition-colors cursor-pointer flex-shrink-0"
              >
                <i className="ri-delete-bin-line text-xs" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
