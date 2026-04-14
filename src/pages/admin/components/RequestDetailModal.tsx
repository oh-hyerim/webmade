import { useState } from 'react';
import { supabase } from '@/lib/supabase';

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

interface Props {
  request: Request;
  onClose: () => void;
  onUpdate: () => void;
}

export default function RequestDetailModal({ request, onClose, onUpdate }: Props) {
  const [note, setNote] = useState(request.admin_note ?? '');
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyPhone = () => {
    if (request.phone) {
      navigator.clipboard.writeText(request.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const saveNote = async () => {
    setSaving(true);
    try {
      await supabase.from('requests').update({ admin_note: note }).eq('id', request.id);
      onUpdate();
    } finally {
      setSaving(false);
    }
  };

  const deleteNote = async () => {
    setSaving(true);
    try {
      await supabase.from('requests').update({ admin_note: '' }).eq('id', request.id);
      setNote('');
      onUpdate();
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async () => {
    const newStatus = request.status === 'unread' ? 'read' : 'unread';
    await supabase.from('requests').update({ status: newStatus }).eq('id', request.id);
    onUpdate();
    onClose();
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });

  const rows: { label: string; value?: string }[] = [
    { label: '업체명', value: request.company_name },
    { label: '업종', value: request.industry },
    { label: '제공 서비스', value: request.services },
    { label: '홈페이지 목적', value: request.purpose },
    { label: '타겟 고객', value: request.target },
    { label: '검색 키워드', value: request.keywords },
    { label: '활동 지역', value: request.region },
    { label: '경쟁 업체', value: request.competitors },
    { label: '고객 궁금증', value: request.faq_topics },
    { label: '강조 포인트', value: request.key_points },
    { label: '강조 요소', value: request.emphasis },
    { label: '필수 포함 내용', value: request.must_have },
    { label: '서비스 상세', value: request.detail },
    { label: '메뉴 구성', value: request.menu },
    { label: '분위기', value: request.mood },
    { label: '메인 컬러', value: request.color_main },
    { label: '참고 색상', value: request.color_ref },
    { label: '참고 사이트', value: request.ref_site },
    { label: '피하고 싶은 스타일', value: request.avoid_style },
    { label: '카카오톡', value: request.kakao },
    { label: '기타 연락', value: request.contact_other },
    { label: '기타 요청', value: request.extra },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30"></div>
      <div
        className="relative bg-white rounded-2xl border border-[#E2E8F0] w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] sticky top-0 bg-white rounded-t-2xl">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-[#0F172A] text-sm">요청서 상세</h2>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${request.status === 'unread' ? 'bg-red-100 text-red-500' : 'bg-[#F1F5F9] text-[#64748B]'}`}>
              {request.status === 'unread' ? '미확인' : '확인됨'}
            </span>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center text-[#94A3B8] hover:text-[#0F172A] cursor-pointer transition-colors">
            <i className="ri-close-line text-lg"></i>
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5">
          {/* 제출자 정보 */}
          <div className="bg-[#F8FAFC] rounded-xl p-4 grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] text-[#94A3B8] mb-1">이름</p>
              <p className="text-sm font-semibold text-[#0F172A]">{request.name}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#94A3B8] mb-1">이메일</p>
              <p className="text-sm text-[#0F172A]">{request.email ?? '-'}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] text-[#94A3B8] mb-1">전화번호</p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[#0F172A]">{request.phone ?? '-'}</span>
                {request.phone && (
                  <button
                    onClick={copyPhone}
                    className="flex items-center gap-1 text-[10px] text-[#64748B] border border-[#E2E8F0] px-2 py-0.5 rounded-full cursor-pointer hover:bg-white transition-colors whitespace-nowrap"
                  >
                    <i className={copied ? 'ri-check-line text-green-500' : 'ri-file-copy-line'}></i>
                    {copied ? '복사됨' : '복사'}
                  </button>
                )}
              </div>
            </div>
            <div>
              <p className="text-[10px] text-[#94A3B8] mb-1">접수일</p>
              <p className="text-sm text-[#0F172A]">{formatDate(request.created_at)}</p>
            </div>
          </div>

          {/* 상세 정보 */}
          <div className="flex flex-col gap-3">
            {rows.map((row) => (
              <div key={row.label}>
                <p className="text-[10px] text-[#94A3B8] mb-1">{row.label}</p>
                <p className={`text-sm leading-relaxed ${row.value ? 'text-[#334155]' : 'text-[#CBD5E1] italic'}`}>
                  {row.value ?? '미입력'}
                </p>
              </div>
            ))}
          </div>

          {/* Admin Note */}
          <div className="border-t border-[#E2E8F0] pt-4">
            <p className="text-[10px] text-[#94A3B8] mb-1.5">관리자 메모</p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="메모를 입력하세요..."
              className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder-[#CBD5E1] focus:outline-none focus:border-[#0F172A] bg-[#F8FAFC] resize-none"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={saveNote}
                disabled={saving}
                className="flex-1 bg-[#0F172A] text-white text-xs font-semibold py-2 rounded-lg cursor-pointer hover:bg-[#1e293b] transition-colors disabled:opacity-60 whitespace-nowrap"
              >
                {saving ? '저장 중...' : '메모 저장'}
              </button>
              {(request.admin_note || note) && (
                <button
                  onClick={deleteNote}
                  disabled={saving}
                  className="text-xs font-semibold text-red-400 border border-red-200 px-4 py-2 rounded-lg cursor-pointer hover:bg-red-50 transition-colors whitespace-nowrap"
                >
                  삭제
                </button>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2 border-t border-[#E2E8F0]">
            <button
              onClick={toggleStatus}
              className="flex-1 border border-[#E2E8F0] text-[#334155] text-xs font-semibold py-2.5 rounded-xl cursor-pointer hover:bg-[#F8FAFC] transition-colors whitespace-nowrap"
            >
              {request.status === 'unread' ? '확인됨으로 변경' : '미확인으로 변경'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
