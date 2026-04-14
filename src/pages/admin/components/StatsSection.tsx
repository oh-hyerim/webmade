interface StatItem {
  label: string;
  value: number;
  icon: string;
  color: string;
}

interface Props {
  contactTotal: number;
  contactUnread: number;
  requestTotal: number;
  requestUnread: number;
}

export default function StatsSection({ contactTotal, contactUnread, requestTotal, requestUnread }: Props) {
  const stats: StatItem[] = [
    { label: '전체 문의', value: contactTotal, icon: 'ri-message-3-line', color: 'text-[#0F172A]' },
    { label: '미확인 문의', value: contactUnread, icon: 'ri-mail-unread-line', color: 'text-red-400' },
    { label: '전체 요청서', value: requestTotal, icon: 'ri-file-list-3-line', color: 'text-[#0F172A]' },
    { label: '미확인 요청서', value: requestUnread, icon: 'ri-file-warning-line', color: 'text-red-400' },
  ];

  const readRate = contactTotal > 0 ? Math.round(((contactTotal - contactUnread) / contactTotal) * 100) : 0;
  const reqReadRate = requestTotal > 0 ? Math.round(((requestTotal - requestUnread) / requestTotal) * 100) : 0;

  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* 통계 카드 4개 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-[#94A3B8]">{s.label}</p>
              <div className="w-8 h-8 flex items-center justify-center bg-[#F8FAFC] rounded-lg">
                <i className={`${s.icon} ${s.color} text-sm`}></i>
              </div>
            </div>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
      {/* 처리율 카드 2개 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
          <p className="text-xs text-[#94A3B8] mb-3">문의 처리율</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-[#F1F5F9] rounded-full h-2">
              <div className="bg-[#0F172A] h-2 rounded-full transition-all" style={{ width: `${readRate}%` }}></div>
            </div>
            <span className="text-sm font-bold text-[#0F172A] whitespace-nowrap">{readRate}%</span>
          </div>
          <p className="text-[10px] text-[#94A3B8] mt-1">문의 기준</p>
        </div>
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
          <p className="text-xs text-[#94A3B8] mb-3">요청서 처리율</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-[#F1F5F9] rounded-full h-2">
              <div className="bg-[#0F172A] h-2 rounded-full transition-all" style={{ width: `${reqReadRate}%` }}></div>
            </div>
            <span className="text-sm font-bold text-[#0F172A] whitespace-nowrap">{reqReadRate}%</span>
          </div>
          <p className="text-[10px] text-[#94A3B8] mt-1">요청서 기준</p>
        </div>
      </div>
    </div>
  );
}
