import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectRequestDetailModal from '@/components/admin/project-requests/ProjectRequestDetailModal';
import ProjectRequestFilters from '@/components/admin/project-requests/ProjectRequestFilters';
import ProjectRequestTable from '@/components/admin/project-requests/ProjectRequestTable';
import {
  deleteProjectRequests,
  fetchProjectRequests,
  ProjectRequest,
  ProjectRequestFilters as Filters,
} from '@/lib/projectRequests';
import { supabase } from '@/lib/supabase';

const initialFilters: Filters = {
  companyName: '',
  clientName: '',
  phone: '',
  status: 'all',
  businessType: '',
};

function csvValue(value: unknown) {
  const normalized = Array.isArray(value) ? value.join(' / ') : String(value ?? '');
  return `"${normalized.replace(/"/g, '""').replace(/\n/g, ' ')}"`;
}

function exportCSV(requests: ProjectRequest[]) {
  const headers = [
    '제출일',
    '수정일',
    '상태',
    '업체명',
    '담당자명',
    '연락처',
    '이메일',
    '카카오톡 ID',
    '업종',
    '지역',
    '운영 기간',
    '주요 고객층',
    '경쟁업체/참고업체',
    '제작 목적',
    '전환 목표',
    '필수 페이지',
    '필요 기능',
    '디자인 방향',
    '선호 컬러',
    '피하고 싶은 컬러',
    '참고 사이트',
    '싫은 사이트',
    '준비 자료',
    '로고 보유 여부',
    '도메인 보유 여부',
    '기존 홈페이지',
    '희망 오픈일',
    '급한 일정 여부',
    '꼭 들어갔으면 하는 내용',
    '고객이 자주 묻는 질문',
    '추가 요청사항',
    '관리자 메모',
  ];

  const rows = requests.map((request) => [
    new Date(request.created_at).toLocaleString('ko-KR'),
    request.updated_at ? new Date(request.updated_at).toLocaleString('ko-KR') : '',
    request.status,
    request.company_name,
    request.client_name,
    request.phone,
    request.email,
    request.kakao_id,
    request.business_type,
    request.business_region,
    request.business_period,
    request.target_customers,
    request.competitor_links,
    request.main_purpose,
    request.primary_cta,
    request.required_pages,
    request.required_features,
    request.design_mood,
    request.preferred_colors,
    request.disliked_colors,
    request.reference_sites,
    request.disliked_sites,
    request.provided_materials,
    request.has_logo,
    request.has_domain,
    request.existing_website,
    request.desired_launch_date,
    request.urgency,
    request.must_include_content,
    request.frequently_asked_questions,
    request.additional_requests,
    request.admin_memo,
  ]);

  const csv = [headers, ...rows].map((row) => row.map(csvValue).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `project-requests-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function AdminProjectRequestsPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [requests, setRequests] = useState<ProjectRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ProjectRequest | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const hasActiveFilters = filters.companyName || filters.clientName || filters.phone || filters.businessType || filters.status !== 'all';

  const loadRequests = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchProjectRequests(filters);
      setRequests(data);
      setSelectedIds((prev) => prev.filter((id) => data.some((request) => request.id === id)));
    } catch {
      setError('제작요청서를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const handleSelect = (id: string) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    setSelectedIds((prev) => prev.length === requests.length ? [] : requests.map((request) => request.id));
  };

  const handleDelete = async (ids: string[]) => {
    if (ids.length === 0) return;
    if (!confirm(`${ids.length}개의 제작요청서를 삭제하시겠습니까?`)) return;

    try {
      await deleteProjectRequests(ids);
      setRequests((prev) => prev.filter((request) => !ids.includes(request.id)));
      setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
      if (selectedRequest && ids.includes(selectedRequest.id)) setSelectedRequest(null);
    } catch {
      alert('삭제에 실패했습니다.');
    }
  };

  const handleSaved = (updated: ProjectRequest) => {
    setRequests((prev) => prev.map((request) => request.id === updated.id ? updated : request));
    setSelectedRequest(updated);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <header className="bg-white border-b border-[#0a0a0a]/8 px-4 md:px-6 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            <button onClick={() => navigate('/admin')} className="font-serif text-[#0a0a0a] text-base whitespace-nowrap cursor-pointer">
              Webmade
            </button>
            <span className="text-[#0a0a0a]/20 text-xs hidden sm:block">|</span>
            <span className="text-xs text-[#0a0a0a]/40 tracking-widest uppercase hidden sm:block">Project Requests</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportCSV(requests)}
              disabled={requests.length === 0}
              className="flex items-center gap-1 md:gap-1.5 px-2.5 md:px-3 py-1.5 border border-[#0a0a0a]/15 rounded-md text-xs text-[#0a0a0a]/60 hover:border-[#0a0a0a]/30 hover:text-[#0a0a0a] transition-colors cursor-pointer whitespace-nowrap"
              title={requests.length === 0 ? '내보낼 제작요청서가 없습니다.' : '현재 필터 결과를 CSV로 다운로드'}
            >
              <i className="ri-download-line" />
              CSV
            </button>
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center gap-1 md:gap-1.5 px-2.5 md:px-3 py-1.5 border border-[#0a0a0a]/15 rounded-md text-xs text-[#0a0a0a]/60 hover:border-[#0a0a0a]/30 hover:text-[#0a0a0a] transition-colors cursor-pointer whitespace-nowrap"
            >
              문의 관리
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 md:gap-1.5 px-2.5 md:px-3 py-1.5 text-xs text-[#0a0a0a]/40 hover:text-[#0a0a0a] transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-logout-box-line" />
              <span className="hidden sm:inline">로그아웃</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="flex items-end justify-between gap-4 mb-4">
          <div>
            <h1 className="font-serif text-2xl text-[#0a0a0a] mb-1">제작요청서 관리</h1>
            <p className="text-sm text-[#0a0a0a]/45">
              {hasActiveFilters ? '필터 적용 결과' : '전체 제작요청서'} <span className="font-medium text-[#0a0a0a]">{requests.length}</span>건
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={() => setFilters(initialFilters)}
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#0a0a0a]/15 rounded-md text-xs text-[#0a0a0a]/60 hover:text-[#0a0a0a] hover:border-[#0a0a0a]/30 cursor-pointer whitespace-nowrap"
              >
                필터 초기화
              </button>
            )}
            <button
              onClick={loadRequests}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#0a0a0a]/15 rounded-md text-xs text-[#0a0a0a]/60 hover:text-[#0a0a0a] hover:border-[#0a0a0a]/30 cursor-pointer whitespace-nowrap disabled:opacity-40"
            >
              <i className={`ri-refresh-line ${loading ? 'animate-spin' : ''}`} />
              새로고침
            </button>
            <a
              href="/project-request"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#0a0a0a]/15 rounded-md text-xs text-[#0a0a0a]/60 hover:text-[#0a0a0a] hover:border-[#0a0a0a]/30 cursor-pointer whitespace-nowrap"
            >
              작성 링크 열기
              <i className="ri-external-link-line" />
            </a>
          </div>
        </div>

        <ProjectRequestFilters filters={filters} onChange={setFilters} />

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-md px-4 py-3 mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-lg py-20 flex items-center justify-center">
            <i className="ri-loader-4-line animate-spin text-[#0a0a0a]/30 text-2xl" />
          </div>
        ) : (
          <ProjectRequestTable
            requests={requests}
            selectedIds={selectedIds}
            onSelect={handleSelect}
            onSelectAll={handleSelectAll}
            onOpen={setSelectedRequest}
            onDelete={handleDelete}
          />
        )}
      </main>

      <ProjectRequestDetailModal
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
        onSaved={handleSaved}
      />
    </div>
  );
}
