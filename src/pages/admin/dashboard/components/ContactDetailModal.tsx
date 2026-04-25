import { useState, useEffect } from 'react';
import { supabase, Contact } from '@/lib/supabase';

interface Props {
  contact: Contact | null;
  onClose: () => void;
  onUpdate: (updated: Contact) => void;
  onDelete: (id: string) => void;
}

export default function ContactDetailModal({ contact, onClose, onUpdate, onDelete }: Props) {
  const [memo, setMemo] = useState('');
  const [savingMemo, setSavingMemo] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (contact) setMemo(contact.admin_memo || '');
  }, [contact]);

  if (!contact) return null;

  const formatDate = (d: string) =>
    new Date(d).toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });

  const handleCopyPhone = () => {
    if (contact.phone) {
      navigator.clipboard.writeText(contact.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveMemo = async () => {
    setSavingMemo(true);
    const { data } = await supabase
      .from('contacts')
      .update({ admin_memo: memo || null })
      .eq('id', contact.id)
      .select()
      .maybeSingle();
    if (data) onUpdate(data as Contact);
    setSavingMemo(false);
  };

  const handleDeleteMemo = async () => {
    setMemo('');
    const { data } = await supabase
      .from('contacts')
      .update({ admin_memo: null })
      .eq('id', contact.id)
      .select()
      .maybeSingle();
    if (data) onUpdate(data as Contact);
  };

  const handleStatusToggle = async () => {
    const newStatus = contact.status === 'unread' ? 'read' : 'unread';
    const { data } = await supabase
      .from('contacts')
      .update({ status: newStatus })
      .eq('id', contact.id)
      .select()
      .maybeSingle();
    if (data) onUpdate(data as Contact);
  };

  const handleDelete = async () => {
    if (!confirm('\uC774 \uBB38\uC758\uB97C \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?')) return;
    await supabase.from('contacts').delete().eq('id', contact.id);
    onDelete(contact.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#0a0a0a]/8">
          <div className="flex items-center gap-3">
            <span className="font-medium text-[#0a0a0a] text-sm">{contact.name}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${contact.status === 'unread' ? 'bg-red-50 text-red-500' : 'bg-[#0a0a0a]/6 text-[#0a0a0a]/40'}`}>
              {contact.status === 'unread' ? '미확인' : '확인'}
            </span>
            {contact.type && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f5f4f0] text-[#0a0a0a]/50">{contact.type}</span>
            )}
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center text-[#0a0a0a]/40 hover:text-[#0a0a0a] cursor-pointer">
            <i className="ri-close-line text-lg" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Contact info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-[#0a0a0a]/35 tracking-widest uppercase mb-1">연락처</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-[#0a0a0a]">{contact.phone || '-'}</p>
                {contact.phone && (
                  <button onClick={handleCopyPhone} className="w-5 h-5 flex items-center justify-center text-[#0a0a0a]/30 hover:text-[#0a0a0a] cursor-pointer transition-colors">
                    <i className={copied ? 'ri-check-line text-green-500' : 'ri-file-copy-line text-xs'} />
                  </button>
                )}
              </div>
            </div>
            <div>
              <p className="text-[10px] text-[#0a0a0a]/35 tracking-widest uppercase mb-1">이메일</p>
              <p className="text-sm text-[#0a0a0a]">{contact.email || '-'}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#0a0a0a]/35 tracking-widest uppercase mb-1">접수일시</p>
              <p className="text-sm text-[#0a0a0a]">{formatDate(contact.created_at)}</p>
            </div>
            {contact.industry && (
              <div>
                <p className="text-[10px] text-[#0a0a0a]/35 tracking-widest uppercase mb-1">업종</p>
                <p className="text-sm text-[#0a0a0a]">{contact.industry}</p>
              </div>
            )}
          </div>

          {/* Message */}
          {contact.message && (
            <div>
              <p className="text-[10px] text-[#0a0a0a]/35 tracking-widest uppercase mb-2">문의 내용</p>
              <p className="text-sm text-[#0a0a0a]/70 leading-relaxed bg-[#f8f7f4] rounded-md p-4 whitespace-pre-wrap">{contact.message}</p>
            </div>
          )}

          {/* Admin memo */}
          <div>
            <p className="text-[10px] text-[#0a0a0a]/35 tracking-widest uppercase mb-2">관리자 메모</p>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              rows={3}
              placeholder="메모를 입력하세요..."
              className="w-full px-3 py-3 border border-[#0a0a0a]/10 rounded-md text-sm text-[#0a0a0a] placeholder-[#0a0a0a]/25 focus:outline-none focus:border-[#0a0a0a]/25 resize-none transition-colors"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleSaveMemo}
                disabled={savingMemo}
                className="px-4 py-2 bg-[#0a0a0a] text-white text-xs rounded-md hover:bg-[#0a0a0a]/85 transition-colors cursor-pointer disabled:opacity-40 whitespace-nowrap"
              >
                {savingMemo ? '저장 중...' : '메모 저장'}
              </button>
              {contact.admin_memo && (
                <button
                  onClick={handleDeleteMemo}
                  className="px-4 py-2 border border-red-200 text-red-400 text-xs rounded-md hover:bg-red-50 transition-colors cursor-pointer whitespace-nowrap"
                >
                  메모 삭제
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#0a0a0a]/8">
          <button
            onClick={handleStatusToggle}
            className="text-xs px-4 py-2 border border-[#0a0a0a]/15 rounded-md text-[#0a0a0a]/60 hover:border-[#0a0a0a]/30 hover:text-[#0a0a0a] transition-colors cursor-pointer whitespace-nowrap"
          >
            {contact.status === 'unread' ? '확인으로 변경' : '미확인으로 변경'}
          </button>
          <button
            onClick={handleDelete}
            className="text-xs px-4 py-2 text-red-400 hover:text-red-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-delete-bin-line mr-1" />
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
