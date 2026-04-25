import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Contact } from '@/lib/supabase';

interface Props {
  contacts: Contact[];
}

export default function StatsCharts({ contacts }: Props) {
  const monthlyData = useMemo(() => {
    const map: Record<string, number> = {};
    contacts.forEach((c) => {
      const d = new Date(c.created_at);
      const key = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`;
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([month, count]) => ({ month, count }));
  }, [contacts]);

  const readCount = contacts.filter((c) => c.status === 'read').length;
  const unreadCount = contacts.filter((c) => c.status === 'unread').length;
  const readRate = contacts.length > 0 ? Math.round((readCount / contacts.length) * 100) : 0;

  const pieData = [
    { name: '확인', value: readCount },
    { name: '미확인', value: unreadCount },
  ];

  const typeData = useMemo(() => {
    const map: Record<string, number> = {};
    contacts.forEach((c) => {
      const t = c.type || '기타';
      map[t] = (map[t] || 0) + 1;
    });
    return Object.entries(map).map(([type, count]) => ({ type, count }));
  }, [contacts]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Monthly chart */}
      <div className="md:col-span-2 bg-white rounded-lg p-5">
        <p className="text-xs text-[#0a0a0a]/40 tracking-widest uppercase mb-4">월별 문의 수</p>
        {monthlyData.length > 0 ? (
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={monthlyData} barSize={20}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#0a0a0a66' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#0a0a0a66' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{ fontSize: 12, border: 'none', background: '#fff', borderRadius: 6 }}
                cursor={{ fill: '#f5f4f0' }}
              />
              <Bar dataKey="count" name="문의 수" fill="#0a0a0a" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-40 flex items-center justify-center text-[#0a0a0a]/25 text-sm">데이터 없음</div>
        )}
      </div>

      {/* Right column: pie + type */}
      <div className="space-y-4">
        {/* Read rate */}
        <div className="bg-white rounded-lg p-5">
          <p className="text-xs text-[#0a0a0a]/40 tracking-widest uppercase mb-3">처리율</p>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={80} height={80}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={25} outerRadius={38} dataKey="value" strokeWidth={0}>
                  <Cell fill="#0a0a0a" />
                  <Cell fill="#f0ede8" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div>
              <p className="text-2xl font-light text-[#0a0a0a]">{readRate}%</p>
              <p className="text-xs text-[#0a0a0a]/40">{readCount}/{contacts.length} 확인</p>
            </div>
          </div>
        </div>

        {/* Type breakdown */}
        <div className="bg-white rounded-lg p-5">
          <p className="text-xs text-[#0a0a0a]/40 tracking-widest uppercase mb-3">유형별</p>
          <div className="space-y-2">
            {typeData.length > 0 ? typeData.map(({ type, count }) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-xs text-[#0a0a0a]/60">{type}</span>
                <span className="text-xs font-medium text-[#0a0a0a]">{count}</span>
              </div>
            )) : (
              <p className="text-xs text-[#0a0a0a]/25">데이터 없음</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
