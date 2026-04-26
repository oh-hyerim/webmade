import { useEffect, useMemo, useState } from 'react';
import {
  formatProjectRequestForGpt,
  PROJECT_REQUEST_STATUSES,
  ProjectRequest,
  ProjectRequestStatus,
  updateProjectRequest,
} from '@/lib/projectRequests';

type Props = {
  request: ProjectRequest | null;
  onClose: () => void;
  onSaved: (request: ProjectRequest) => void;
};

function text(value?: string | null) {
  return value && value.trim() ? value : '-';
}

function list(value?: string[] | null) {
  return value && value.length > 0 ? value.join(', ') : '-';
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] text-[#0a0a0a]/35 tracking-widest uppercase mb-1">{label}</p>
      <div className="text-sm text-[#0a0a0a]/75 leading-relaxed whitespace-pre-wrap break-words">{value}</div>
    </div>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-[#0a0a0a]/8 rounded-lg p-4">
      <h3 className="text-sm font-medium text-[#0a0a0a] mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </section>
  );
}

export default function ProjectRequestDetailModal({ request, onClose, onSaved }: Props) {
  const [memo, setMemo] = useState('');
  const [status, setStatus] = useState<ProjectRequestStatus>('대기');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  useEffect(() => {
    if (!request) return;
    setMemo(request.admin_memo || '');
    setStatus(request.status);
    setMessage('');
    setCopyMessage('');
  }, [request]);

  const gptText = useMemo(
    () => request ? formatProjectRequestForGpt({ ...request, status, admin_memo: memo.trim() || null }) : '',
    [memo, request, status],
  );
  const hasChanges = request ? status !== request.status || memo !== (request.admin_memo || '') : false;

  if (!request) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(gptText);
      setCopyMessage('GPT용 내용이 복사되었습니다.');
    } catch {
      setCopyMessage('복사에 실패했습니다. 브라우저 권한을 확인해 주세요.');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const updated = await updateProjectRequest(request.id, {
        status,
        admin_memo: memo.trim() || null,
      });
      if (updated) onSaved(updated);
      setMessage('저장되었습니다.');
    } catch {
      setMessage('저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 md:px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative bg-white rounded-lg w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-5 md:px-6 py-4 border-b border-[#0a0a0a]/8">
          <div className="min-w-0">
            <p className="text-xs text-[#0a0a0a]/35 mb-1">{new Date(request.created_at).toLocaleString('ko-KR')}</p>
            <h2 className="font-serif text-xl md:text-2xl text-[#0a0a0a] truncate">{request.company_name}</h2>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleCopy}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 border border-[#0a0a0a]/15 rounded-md text-xs text-[#0a0a0a]/60 hover:text-[#0a0a0a] hover:border-[#0a0a0a]/30 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-file-copy-line" />
              GPT용 복사
            </button>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-[#0a0a0a]/40 hover:text-[#0a0a0a] cursor-pointer">
              <i className="ri-close-line text-lg" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto px-5 md:px-6 py-5 space-y-4">
          <button
            onClick={handleCopy}
            className="sm:hidden w-full flex items-center justify-center gap-1.5 px-3 py-3 border border-[#0a0a0a]/15 rounded-md text-xs text-[#0a0a0a]/70 cursor-pointer"
          >
            <i className="ri-file-copy-line" />
            GPT용 복사
          </button>
          {copyMessage && <p className="text-xs text-[#0a0a0a]/45">{copyMessage}</p>}

          <DetailSection title="기본 정보">
            <Row label="업체명" value={text(request.company_name)} />
            <Row label="담당자명" value={text(request.client_name)} />
            <Row label="연락처" value={text(request.phone)} />
            <Row label="이메일" value={text(request.email)} />
            <Row label="카카오톡 ID" value={text(request.kakao_id)} />
          </DetailSection>

          <DetailSection title="사업 정보">
            <Row label="업종" value={text(request.business_type)} />
            <Row label="지역" value={text(request.business_region)} />
            <Row label="운영 기간" value={text(request.business_period)} />
            <Row label="주요 고객층" value={text(request.target_customers)} />
            <div className="md:col-span-2">
              <Row label="경쟁업체/참고업체" value={text(request.competitor_links)} />
            </div>
          </DetailSection>

          <DetailSection title="제작 방향">
            <Row label="홈페이지 제작 목적" value={list(request.main_purpose)} />
            <Row label="전환 목표" value={list(request.primary_cta)} />
            <Row label="필수 페이지" value={list(request.required_pages)} />
            <Row label="필요 기능" value={list(request.required_features)} />
          </DetailSection>

          <DetailSection title="디자인">
            <Row label="원하는 분위기" value={list(request.design_mood)} />
            <Row label="선호 컬러" value={text(request.preferred_colors)} />
            <Row label="피하고 싶은 컬러" value={text(request.disliked_colors)} />
            <div className="md:col-span-2">
              <Row label="참고 사이트" value={text(request.reference_sites)} />
            </div>
            <div className="md:col-span-2">
              <Row label="싫은 사이트" value={text(request.disliked_sites)} />
            </div>
          </DetailSection>

          <DetailSection title="준비 자료">
            <Row label="제공 가능한 자료" value={list(request.provided_materials)} />
            <Row label="로고 보유 여부" value={text(request.has_logo)} />
            <Row label="기존 홈페이지" value={text(request.existing_website)} />
            <Row label="도메인 보유 여부" value={text(request.has_domain)} />
          </DetailSection>

          <DetailSection title="일정">
            <Row label="희망 오픈일" value={text(request.desired_launch_date)} />
            <Row label="급한 일정 여부" value={text(request.urgency)} />
          </DetailSection>

          <DetailSection title="추가 요청사항">
            <div className="md:col-span-2">
              <Row label="꼭 들어갔으면 하는 내용" value={text(request.must_include_content)} />
            </div>
            <div className="md:col-span-2">
              <Row label="고객이 자주 묻는 질문" value={text(request.frequently_asked_questions)} />
            </div>
            <div className="md:col-span-2">
              <Row label="추가 요청사항" value={text(request.additional_requests)} />
            </div>
          </DetailSection>

          <section className="border border-[#0a0a0a]/8 rounded-lg p-4">
            <h3 className="text-sm font-medium text-[#0a0a0a] mb-4">관리</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="block">
                <span className="block text-xs text-[#0a0a0a]/50 mb-2">상태</span>
                <select
                  value={status}
                  onChange={(event) => {
                    setStatus(event.target.value as ProjectRequestStatus);
                    setMessage('');
                  }}
                  className="w-full px-3 py-2.5 border border-[#0a0a0a]/10 rounded-md text-sm text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a]/30"
                >
                  {PROJECT_REQUEST_STATUSES.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label className="block md:col-span-2">
                <span className="block text-xs text-[#0a0a0a]/50 mb-2">관리자 메모</span>
                <textarea
                  value={memo}
                  onChange={(event) => {
                    setMemo(event.target.value);
                    setMessage('');
                  }}
                  rows={4}
                  className="w-full px-3 py-3 border border-[#0a0a0a]/10 rounded-md text-sm text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a]/30 resize-y"
                  placeholder="기획 방향, 확인할 내용, 진행 메모를 남겨주세요."
                />
              </label>
            </div>
            {message && <p className="text-xs text-[#0a0a0a]/45 mt-3">{message}</p>}
            {hasChanges && !message && <p className="text-xs text-amber-600 mt-3">저장되지 않은 변경사항이 있습니다.</p>}
          </section>
        </div>

        <div className="flex items-center justify-end gap-2 px-5 md:px-6 py-4 border-t border-[#0a0a0a]/8">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs text-[#0a0a0a]/45 hover:text-[#0a0a0a] cursor-pointer"
          >
            닫기
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className="px-5 py-2.5 bg-[#0a0a0a] text-white text-xs rounded-md hover:bg-[#0a0a0a]/85 transition-colors cursor-pointer disabled:opacity-40"
          >
            {saving ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>
    </div>
  );
}
