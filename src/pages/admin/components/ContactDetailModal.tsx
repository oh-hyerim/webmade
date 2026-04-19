import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Contact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  industry?: string;
  type?: string;
  message?: string;
  status: string;
  admin_memo?: string;
  created_at: string;
}

interface Props {
  contact: Contact;
  onClose: () => void;
  onUpdate: () => void;
}

export default function ContactDetailModal({ contact, onClose, onUpdate }: Props) {
  const [note, setNote] = useState(contact.admin_memo ?? '');
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyPhone = () => {
    if (contact.phone) {
      navigator.clipboard.writeText(contact.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const saveNote = async () => {
    setSaving(true);
    try {
      await supabase.from('contacts').update({ admin_memo: note }).eq('id', contact.id);
      onUpdate();
    } finally {
      setSaving(false);
    }
  };

  const deleteNote = async () => {
    setSaving(true);
    try {
      await supabase.from('contacts').update({ admin_memo: '' }).eq('id', contact.id);
      setNote('');
      onUpdate();
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async () => {
    const newStatus = contact.status === 'unread' ? 'read' : 'unread';
    await supabase.from('contacts').update({ status: newStatus }).eq('id', contact.id);
    onUpdate();
    onClose();
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/30"></div>
      <div
        className="relative bg-white rounded-2xl border border-[#E2E8F0] w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] sticky top-0 bg-white rounded-t-2xl">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-[#0F172A] text-sm">문의 상세</h2>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${contact.status === 'unread' ? 'bg-red-100 text-red-500' : 'bg-[#F1F5F9] text-[#64748B]'}`}>
              {contact.status === 'unread' ? '미확인' : '확인됨'}
            </span>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center text-[#94A3B8] hover:text-[#0F172A] cursor-pointer transition-colors">
            <i className="ri-close-line text-lg"></i>
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5">
          {/* Info */}
          <div className="grid grid-cols-2 gap-3">
            <InfoRow label="이름" value={contact.name} />
            <div className="col-span-2">
              <p className="text-[10px] text-[#94A3B8] mb-1">연락처</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#0F172A] font-medium">{contact.phone ?? '-'}</span>
                {contact.phone && (
                  <button
                    onClick={copyPhone}
                    className="flex items-center gap-1 text-[10px] text-[#64748B] border border-[#E2E8F0] px-2 py-0.5 rounded-full cursor-pointer hover:bg-[#F8FAFC] transition-colors whitespace-nowrap"
                  >
                    <i className={copied ? 'ri-check-line text-green-500' : 'ri-file-copy-line'}></i>
                    {copied ? '복사됨' : '복사'}
                  </button>
                )}
              </div>
            </div>
            <InfoRow label="이메일" value={contact.email} />
            <InfoRow label="접수일" value={formatDate(contact.created_at)} />
          </div>

          {/* Message */}
          <div>
            <p className="text-[10px] text-[#94A3B8] mb-1.5">문의 내용</p>
            <div className="bg-[#F8FAFC] rounded-xl px-4 py-3 text-sm text-[#334155] leading-relaxed whitespace-pre-wrap">
              {contact.message ?? '-'}
            </div>
          </div>

          {/* Admin Memo */}
          <div>
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
              {(contact.admin_memo || note) && (
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
              {contact.status === 'unread' ? '확인됨으로 변경' : '미확인으로 변경'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-[10px] text-[#94A3B8] mb-1">{label}</p>
      <p className="text-sm text-[#0F172A] font-medium">{value ?? '-'}</p>
    </div>
  );
}
