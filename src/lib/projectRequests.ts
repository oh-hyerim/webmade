import { supabase } from './supabase';

const PROJECT_REQUESTS_TABLE = import.meta.env.VITE_PROJECT_REQUESTS_TABLE || 'requests';

export const PROJECT_REQUEST_STATUSES = ['대기', '검토중', '진행중', '완료', '보류'] as const;

export type ProjectRequestStatus = (typeof PROJECT_REQUEST_STATUSES)[number];

export type ProjectRequest = {
  id: string;
  created_at: string | null;
  name: string;
  email: string | null;
  company_name: string | null;
  industry: string | null;
  services: string | null;
  purpose: string | null;
  target: string | null;
  keywords: string | null;
  region: string | null;
  competitors: string | null;
  faq_topics: string | null;
  key_points: string | null;
  emphasis: string | null;
  must_have: string | null;
  detail: string | null;
  menu: string | null;
  mood: string | null;
  color_main: string | null;
  color_ref: string | null;
  ref_site: string | null;
  avoid_style: string | null;
  phone: string | null;
  kakao: string | null;
  contact_other: string | null;
  extra: string | null;
  status: string | null;
  admin_note: string | null;
  admin_memo: string | null;
};

export type ProjectRequestInsert = Omit<ProjectRequest, 'id' | 'created_at'> & {
  id?: string;
  created_at?: string | null;
};

export type ProjectRequestFilters = {
  companyName: string;
  clientName: string;
  phone: string;
  status: 'all' | string;
  businessType: string;
};

export type ProjectRequestUpdate = Partial<Pick<ProjectRequest, 'status' | 'admin_memo' | 'admin_note'>>;

export async function createProjectRequest(payload: ProjectRequestInsert) {
  // insert 직전 payload 전체 로그(실제 원인 파악용)
  console.log('[project-request] insert payload', {
    table: PROJECT_REQUESTS_TABLE,
    payload,
  });

  const attempt = async (body: ProjectRequestInsert) => supabase.from(PROJECT_REQUESTS_TABLE).insert(body);
  let { error } = await attempt(payload);

  // 실제 에러가 "id NOT NULL"일 때만(=원인 기반) 재시도
  if (error && (error.code === '23502' || /null value/i.test(error.message)) && /id/i.test(error.message)) {
    const withId = { ...payload, id: crypto.randomUUID() };
    console.warn('[project-request] retry insert with generated id due to NOT NULL violation', {
      table: PROJECT_REQUESTS_TABLE,
      code: error.code,
      message: error.message,
    });
    console.log('[project-request] retry payload', { table: PROJECT_REQUESTS_TABLE, payload: withId });
    ({ error } = await attempt(withId));
  }

  if (error) {
    console.error('Project request insert failed', error);
    console.error('Project request insert failed (details)', {
      table: PROJECT_REQUESTS_TABLE,
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
      payloadKeys: Object.keys(payload),
    });
    throw error;
  }
}

export async function fetchProjectRequests(filters: ProjectRequestFilters) {
  let query = supabase
    .from(PROJECT_REQUESTS_TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (filters.companyName.trim()) {
    query = query.ilike('company_name', `%${filters.companyName.trim()}%`);
  }
  if (filters.clientName.trim()) {
    query = query.ilike('name', `%${filters.clientName.trim()}%`);
  }
  if (filters.phone.trim()) {
    query = query.ilike('phone', `%${filters.phone.trim()}%`);
  }
  if (filters.businessType.trim()) {
    query = query.ilike('industry', `%${filters.businessType.trim()}%`);
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
    .from(PROJECT_REQUESTS_TABLE)
    .update({ ...payload })
    .eq('id', id)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data as ProjectRequest | null;
}

export async function deleteProjectRequests(ids: string[]) {
  const { error } = await supabase.from(PROJECT_REQUESTS_TABLE).delete().in('id', ids);
  if (error) throw error;
}

export function formatProjectRequestForGpt(request: ProjectRequest) {
  const text = (value?: string | null) => value && value.trim() ? value.trim() : '-';

  return `[기본 정보]
업체명: ${text(request.company_name)}
담당자명: ${text(request.name)}
연락처: ${text(request.phone)}
이메일: ${text(request.email)}
카카오: ${text(request.kakao)}

[사업 정보]
업종: ${text(request.industry)}
지역: ${text(request.region)}
주요 고객층: ${text(request.target)}
경쟁업체/참고업체: ${text(request.competitors)}

[홈페이지 제작 목적]
목적: ${text(request.purpose)}
서비스/페이지 구성: ${text(request.menu)}

[디자인 방향]
원하는 분위기: ${text(request.mood)}
선호 컬러: ${text(request.color_main)}
참고 컬러: ${text(request.color_ref)}
참고 사이트: ${text(request.ref_site)}
피하고 싶은 스타일/사이트: ${text(request.avoid_style)}

[준비 자료]
FAQ 주제: ${text(request.faq_topics)}
꼭 들어갔으면 하는 내용: ${text(request.must_have)}
상세/추가: ${text(request.detail)}
기타: ${text(request.extra)}

[관리자 메모]
관리자 메모: ${text(request.admin_memo)}`;
}
