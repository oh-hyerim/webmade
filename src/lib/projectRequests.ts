import { supabase } from './supabase';

export const PROJECT_REQUEST_STATUSES = ['대기', '검토중', '진행중', '완료', '보류'] as const;

export type ProjectRequestStatus = (typeof PROJECT_REQUEST_STATUSES)[number];

export type ProjectRequest = {
  id: string;
  created_at: string;
  updated_at: string | null;
  status: ProjectRequestStatus;
  client_name: string;
  phone: string;
  email: string | null;
  kakao_id: string | null;
  company_name: string;
  business_type: string;
  business_region: string | null;
  business_period: string | null;
  target_customers: string | null;
  competitor_links: string | null;
  main_purpose: string[];
  primary_cta: string[];
  required_pages: string[];
  required_features: string[];
  design_mood: string[];
  preferred_colors: string | null;
  disliked_colors: string | null;
  reference_sites: string | null;
  disliked_sites: string | null;
  provided_materials: string[];
  has_logo: string | null;
  has_domain: string | null;
  existing_website: string | null;
  desired_launch_date: string | null;
  urgency: string | null;
  must_include_content: string | null;
  frequently_asked_questions: string | null;
  additional_requests: string | null;
  admin_memo: string | null;
};

export type ProjectRequestInsert = Omit<ProjectRequest, 'id' | 'created_at' | 'updated_at' | 'status' | 'admin_memo'> & {
  status?: ProjectRequestStatus;
  admin_memo?: string | null;
};

export type ProjectRequestFilters = {
  companyName: string;
  clientName: string;
  phone: string;
  status: 'all' | ProjectRequestStatus;
  businessType: string;
};

export type ProjectRequestUpdate = Partial<Pick<ProjectRequest, 'status' | 'admin_memo'>>;

export async function createProjectRequest(payload: ProjectRequestInsert) {
  const { status: _status, admin_memo: _adminMemo, ...publicPayload } = payload;
  const { error } = await supabase.from('project_requests').insert({
    ...publicPayload,
    status: '대기',
    admin_memo: null,
  });

  if (error) throw error;
}

export async function fetchProjectRequests(filters: ProjectRequestFilters) {
  let query = supabase
    .from('project_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters.companyName.trim()) {
    query = query.ilike('company_name', `%${filters.companyName.trim()}%`);
  }
  if (filters.clientName.trim()) {
    query = query.ilike('client_name', `%${filters.clientName.trim()}%`);
  }
  if (filters.phone.trim()) {
    query = query.ilike('phone', `%${filters.phone.trim()}%`);
  }
  if (filters.businessType.trim()) {
    query = query.ilike('business_type', `%${filters.businessType.trim()}%`);
  }
  if (filters.status !== 'all') {
    query = query.eq('status', filters.status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data || []) as ProjectRequest[];
}

export async function updateProjectRequest(id: string, payload: ProjectRequestUpdate) {
  const { data, error } = await supabase
    .from('project_requests')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data as ProjectRequest | null;
}

export async function deleteProjectRequests(ids: string[]) {
  const { error } = await supabase.from('project_requests').delete().in('id', ids);
  if (error) throw error;
}

export function formatProjectRequestForGpt(request: ProjectRequest) {
  const list = (value?: string[] | null) => (value && value.length > 0 ? value.join(', ') : '-');
  const text = (value?: string | null) => value && value.trim() ? value.trim() : '-';

  return `[기본 정보]
업체명: ${text(request.company_name)}
담당자명: ${text(request.client_name)}
연락처: ${text(request.phone)}
이메일: ${text(request.email)}
카카오톡 ID: ${text(request.kakao_id)}

[사업 정보]
업종: ${text(request.business_type)}
지역: ${text(request.business_region)}
운영 기간: ${text(request.business_period)}
주요 고객층: ${text(request.target_customers)}
경쟁업체/참고업체: ${text(request.competitor_links)}

[홈페이지 제작 목적]
선택한 목적: ${list(request.main_purpose)}

[전환 목표]
방문자가 가장 먼저 하길 원하는 행동: ${list(request.primary_cta)}

[필수 페이지]
필요한 페이지: ${list(request.required_pages)}

[필요 기능]
필요한 기능: ${list(request.required_features)}

[디자인 방향]
원하는 분위기: ${list(request.design_mood)}
선호 컬러: ${text(request.preferred_colors)}
피하고 싶은 컬러: ${text(request.disliked_colors)}
참고 사이트: ${text(request.reference_sites)}
싫은 사이트: ${text(request.disliked_sites)}

[준비 자료]
제공 가능한 자료: ${list(request.provided_materials)}
기존 홈페이지: ${text(request.existing_website)}
도메인 보유 여부: ${text(request.has_domain)}

[일정]
희망 오픈일: ${text(request.desired_launch_date)}
급한 일정 여부: ${text(request.urgency)}

[추가 요청사항]
꼭 들어갔으면 하는 내용: ${text(request.must_include_content)}
고객이 자주 묻는 질문: ${text(request.frequently_asked_questions)}
추가 요청사항: ${text(request.additional_requests)}

[관리자 메모]
관리자 메모: ${text(request.admin_memo)}`;
}
