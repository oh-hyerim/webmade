import { FormEvent, useMemo, useState } from 'react';
import { createProjectRequest } from '@/lib/projectRequests';

const PROJECT_REQUEST_SUBMIT_COOLDOWN_MS = 60_000;
const PROJECT_REQUEST_LAST_SUBMIT_KEY = 'webmade:last-project-request-submit';

const mainPurposeOptions = [
  '신규 고객 문의 증가',
  '예약 증가',
  '회사 소개 / 신뢰도 강화',
  '제품 판매',
  '광고 랜딩페이지',
  '포트폴리오 소개',
  '채용 목적',
];

const primaryCtaOptions = [
  '전화 문의',
  '카카오톡 상담',
  '견적 문의',
  '예약하기',
  '상품 구매',
  '방문 유도',
  '기타',
];

const requiredPageOptions = [
  '메인 홈',
  '회사소개',
  '서비스 소개',
  '가격 안내',
  '포트폴리오',
  '후기',
  '문의하기',
  '예약 페이지',
  '오시는 길',
  '기타',
];

const requiredFeatureOptions = [
  '문의폼',
  '관리자페이지',
  '예약 기능',
  '팝업창',
  '후기 등록',
  '게시판',
  '파일 업로드',
  '회원가입 / 로그인',
  '결제 기능',
  '다국어',
  '모바일 최적화',
  'SEO 검색노출',
  '기타',
];

const designMoodOptions = [
  '깔끔하고 심플하게',
  '고급스럽고 프리미엄하게',
  '젊고 트렌디하게',
  '전문적이고 신뢰감 있게',
  '따뜻하고 친근하게',
  '감성적이고 세련되게',
  '강렬하고 눈에 띄게',
  '잘 모르니 추천받고 싶음',
];

const materialOptions = [
  '로고 있음',
  '로고 없음',
  '사진 제공 가능',
  '사진 없음',
  '회사 소개 문구 있음',
  '문구 제작 필요',
  '가격표 있음',
  '기존 홈페이지 있음',
  '도메인 있음',
  '아무 자료 없음',
];

type MultiField =
  | 'main_purpose'
  | 'primary_cta'
  | 'required_pages'
  | 'required_features'
  | 'design_mood'
  | 'provided_materials';

type MultiValues = Record<MultiField, string[]>;

const emptyMultiValues: MultiValues = {
  main_purpose: [],
  primary_cta: [],
  required_pages: [],
  required_features: [],
  design_mood: [],
  provided_materials: [],
};

function Field({
  label,
  name,
  required,
  type = 'text',
  placeholder,
  maxLength = 120,
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <label className="block">
      <span className="block text-xs text-[#0a0a0a]/50 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-white border border-[#0a0a0a]/10 rounded-md text-sm text-[#0a0a0a] placeholder-[#0a0a0a]/25 focus:outline-none focus:border-[#0a0a0a]/35 transition-colors"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  rows = 4,
  placeholder,
  maxLength = 1200,
}: {
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <label className="block">
      <span className="block text-xs text-[#0a0a0a]/50 mb-2">{label}</span>
      <textarea
        name={name}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-white border border-[#0a0a0a]/10 rounded-md text-sm text-[#0a0a0a] placeholder-[#0a0a0a]/25 focus:outline-none focus:border-[#0a0a0a]/35 transition-colors resize-y"
      />
    </label>
  );
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-lg p-5 md:p-7 border border-[#0a0a0a]/6">
      <div className="mb-5">
        <h2 className="font-serif text-xl text-[#0a0a0a]">{title}</h2>
        {description && <p className="text-xs md:text-sm text-[#0a0a0a]/45 leading-relaxed mt-2">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function CheckboxGroup({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const toggle = (option: string) => {
    onChange(value.includes(option) ? value.filter((item) => item !== option) : [...value, option]);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {options.map((option) => (
        <label
          key={option}
          className={`flex items-center gap-2 px-3 py-3 rounded-md border text-sm cursor-pointer transition-colors ${
            value.includes(option)
              ? 'border-[#0a0a0a] bg-[#0a0a0a] text-white'
              : 'border-[#0a0a0a]/10 bg-[#f8f7f4] text-[#0a0a0a]/65 hover:border-[#0a0a0a]/25'
          }`}
        >
          <input
            type="checkbox"
            checked={value.includes(option)}
            onChange={() => toggle(option)}
            className="sr-only"
          />
          <span className={`w-4 h-4 rounded border flex-shrink-0 ${value.includes(option) ? 'border-white bg-white' : 'border-[#0a0a0a]/20'}`}>
            {value.includes(option) && <i className="ri-check-line text-[#0a0a0a] text-sm leading-4" />}
          </span>
          <span>{option}</span>
        </label>
      ))}
    </div>
  );
}

function withOther(values: string[], other: unknown) {
  const otherText = String(other || '').trim();
  return otherText ? [...values, `기타: ${otherText}`] : values;
}

function text(fd: FormData, key: string) {
  const value = String(fd.get(key) || '').trim();
  return value || null;
}

function ReferenceSiteManager({
  label,
  helperText,
  sites,
  input,
  editingIndex,
  onInputChange,
  onSave,
  onEdit,
  onRemove,
  onCancelEdit,
}: {
  label: string;
  helperText: string;
  sites: string[];
  input: string;
  editingIndex: number | null;
  onInputChange: (value: string) => void;
  onSave: () => void;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
  onCancelEdit: () => void;
}) {
  return (
    <div>
      <span className="block text-xs text-[#0a0a0a]/50 mb-2">{label}</span>
      <div className="flex gap-2">
        <input
          type="url"
          value={input}
          onChange={(event) => onInputChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              onSave();
            }
          }}
          placeholder="https://example.com"
          className="flex-1 px-4 py-3 bg-white border border-[#0a0a0a]/10 rounded-md text-sm text-[#0a0a0a] placeholder-[#0a0a0a]/25 focus:outline-none focus:border-[#0a0a0a]/35 transition-colors"
        />
        <button
          type="button"
          onClick={onSave}
          disabled={!input.trim()}
          className="w-20 flex-shrink-0 px-3 py-3 bg-[#0a0a0a] text-white text-xs rounded-md hover:bg-[#0a0a0a]/85 transition-colors cursor-pointer disabled:opacity-35 whitespace-nowrap"
        >
          {editingIndex === null ? '확인' : '수정'}
        </button>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2">
        <p className="text-xs text-[#0a0a0a]/35">{helperText}</p>
          {editingIndex !== null && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="text-xs text-[#0a0a0a]/45 hover:text-[#0a0a0a] transition-colors cursor-pointer whitespace-nowrap"
            >
              취소
            </button>
          )}
      </div>

      {sites.length > 0 && (
        <div className="mt-3 space-y-2">
          {sites.map((site, index) => (
            <div key={`${site}-${index}`} className="flex items-center gap-2 px-3 py-2.5 rounded-md bg-[#f8f7f4] border border-[#0a0a0a]/8">
              <span className="flex-1 text-sm text-[#0a0a0a]/70 break-all">{site}</span>
              <button
                type="button"
                onClick={() => onEdit(index)}
                className="w-8 h-8 flex items-center justify-center rounded-md text-[#0a0a0a]/45 hover:text-[#0a0a0a] hover:bg-white transition-colors cursor-pointer"
                aria-label="참고 사이트 수정"
                title="수정"
              >
                <i className="ri-pencil-line" />
              </button>
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="w-8 h-8 flex items-center justify-center rounded-md text-[#0a0a0a]/35 hover:text-red-500 hover:bg-white transition-colors cursor-pointer"
                aria-label="참고 사이트 삭제"
                title="삭제"
              >
                <i className="ri-subtract-line" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectRequestPage() {
  const [multiValues, setMultiValues] = useState<MultiValues>(emptyMultiValues);
  const [hasDomain, setHasDomain] = useState('');
  const [referenceSites, setReferenceSites] = useState<string[]>([]);
  const [referenceSiteInput, setReferenceSiteInput] = useState('');
  const [editingReferenceIndex, setEditingReferenceIndex] = useState<number | null>(null);
  const [dislikedSites, setDislikedSites] = useState<string[]>([]);
  const [dislikedSiteInput, setDislikedSiteInput] = useState('');
  const [editingDislikedIndex, setEditingDislikedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const hasLogo = useMemo(() => {
    if (multiValues.provided_materials.includes('로고 있음')) return '있음';
    if (multiValues.provided_materials.includes('로고 없음')) return '없음';
    return null;
  }, [multiValues.provided_materials]);

  const setMulti = (field: MultiField, value: string[]) => {
    setMultiValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleReferenceSiteSave = () => {
    const nextSite = referenceSiteInput.trim();
    if (!nextSite) return;

    setReferenceSites((prev) => {
      if (editingReferenceIndex === null) return [...prev, nextSite];
      return prev.map((site, index) => index === editingReferenceIndex ? nextSite : site);
    });
    setReferenceSiteInput('');
    setEditingReferenceIndex(null);
  };

  const handleReferenceSiteEdit = (index: number) => {
    setReferenceSiteInput(referenceSites[index] || '');
    setEditingReferenceIndex(index);
  };

  const handleReferenceSiteRemove = (index: number) => {
    setReferenceSites((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
    if (editingReferenceIndex === index) {
      setReferenceSiteInput('');
      setEditingReferenceIndex(null);
    }
  };

  const handleDislikedSiteSave = () => {
    const nextSite = dislikedSiteInput.trim();
    if (!nextSite) return;

    setDislikedSites((prev) => {
      if (editingDislikedIndex === null) return [...prev, nextSite];
      return prev.map((site, index) => index === editingDislikedIndex ? nextSite : site);
    });
    setDislikedSiteInput('');
    setEditingDislikedIndex(null);
  };

  const handleDislikedSiteEdit = (index: number) => {
    setDislikedSiteInput(dislikedSites[index] || '');
    setEditingDislikedIndex(index);
  };

  const handleDislikedSiteRemove = (index: number) => {
    setDislikedSites((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
    if (editingDislikedIndex === index) {
      setDislikedSiteInput('');
      setEditingDislikedIndex(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setError('');

    const fd = new FormData(event.currentTarget);
    if (String(fd.get('website') || '').trim()) {
      setLoading(false);
      return;
    }
    const lastSubmit = Number(window.localStorage.getItem(PROJECT_REQUEST_LAST_SUBMIT_KEY) || 0);
    if (Date.now() - lastSubmit < PROJECT_REQUEST_SUBMIT_COOLDOWN_MS) {
      setError('잠시 후 다시 제출해주세요.');
      setLoading(false);
      return;
    }

    try {
      await createProjectRequest({
        client_name: String(fd.get('client_name') || '').trim(),
        phone: String(fd.get('phone') || '').trim(),
        email: text(fd, 'email'),
        kakao_id: text(fd, 'kakao_id'),
        company_name: String(fd.get('company_name') || '').trim(),
        business_type: String(fd.get('business_type') || '').trim(),
        business_region: text(fd, 'business_region'),
        business_period: text(fd, 'business_period'),
        target_customers: text(fd, 'target_customers'),
        competitor_links: text(fd, 'competitor_links'),
        main_purpose: withOther(multiValues.main_purpose, fd.get('main_purpose_other')),
        primary_cta: withOther(multiValues.primary_cta, fd.get('primary_cta_other')),
        required_pages: withOther(multiValues.required_pages, fd.get('required_pages_other')),
        required_features: multiValues.required_features,
        design_mood: withOther(multiValues.design_mood, fd.get('design_mood_other')),
        preferred_colors: text(fd, 'preferred_colors'),
        disliked_colors: text(fd, 'disliked_colors'),
        reference_sites: referenceSites.length > 0 ? referenceSites.join('\n') : null,
        disliked_sites: dislikedSites.length > 0 ? dislikedSites.join('\n') : null,
        provided_materials: multiValues.provided_materials,
        has_logo: hasLogo,
        has_domain: hasDomain || text(fd, 'has_domain'),
        existing_website: text(fd, 'existing_website'),
        desired_launch_date: text(fd, 'desired_launch_date'),
        urgency: text(fd, 'urgency'),
        must_include_content: text(fd, 'must_include_content'),
        frequently_asked_questions: text(fd, 'frequently_asked_questions'),
        additional_requests: text(fd, 'additional_requests'),
      });
      window.localStorage.setItem(PROJECT_REQUEST_LAST_SUBMIT_KEY, String(Date.now()));
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (submitError) {
      console.error('Project request submit failed', submitError);
      setError('제출 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#f8f7f4] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl bg-white rounded-lg p-8 md:p-10 text-center border border-[#0a0a0a]/6">
          <div className="w-12 h-12 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center mx-auto mb-6">
            <i className="ri-check-line text-xl" />
          </div>
          <h1 className="font-serif text-2xl md:text-3xl text-[#0a0a0a] mb-4">제작 요청서가 제출되었습니다.</h1>
          <p className="text-sm text-[#0a0a0a]/55 leading-relaxed">
            검토 후 제작 기획에 반영하겠습니다.
            <br />
            필요한 내용이 있으면 별도로 연락드리겠습니다.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f7f4] px-4 py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 md:mb-10">
          <p className="text-xs tracking-widest uppercase text-[#0a0a0a]/35 mb-3">Webmade Project Request</p>
          <h1 className="font-serif text-3xl md:text-5xl text-[#0a0a0a] leading-tight mb-4">홈페이지 제작 요청서</h1>
          <p className="text-sm md:text-base text-[#0a0a0a]/55 leading-relaxed max-w-2xl">
            제작 방향을 잡기 위한 사전 질문지입니다. 확정되지 않은 항목은 편하게 비워두셔도 됩니다.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-[#0a0a0a]/45">
            <span className="px-3 py-1.5 rounded-full bg-white border border-[#0a0a0a]/8">총 12개 섹션</span>
            <span className="px-3 py-1.5 rounded-full bg-white border border-[#0a0a0a]/8">* 표시는 필수 입력</span>
            <span className="px-3 py-1.5 rounded-full bg-white border border-[#0a0a0a]/8">예상 작성 시간 10분 내외</span>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <Section title="1. 담당자 기본 정보" description="제작 진행 중 연락드릴 담당자 정보를 적어주세요.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="담당자명" name="client_name" required />
              <Field label="연락처" name="phone" type="tel" required placeholder="010-0000-0000" />
              <Field label="이메일" name="email" type="email" />
              <Field label="카카오톡 ID" name="kakao_id" />
              <div className="md:col-span-2">
                <Field label="업체명 / 브랜드명" name="company_name" required />
              </div>
            </div>
          </Section>

          <Section title="2. 사업 정보" description="업종과 고객층을 알면 홈페이지 구조와 문구 방향을 더 정확히 잡을 수 있습니다.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="업종" name="business_type" required placeholder="예: 피부관리실, 카페, 법률사무소" />
              <Field label="지역" name="business_region" placeholder="예: 서울 강남구" />
              <Field label="운영 기간" name="business_period" placeholder="예: 오픈 예정, 3년" />
              <Field label="주요 고객층" name="target_customers" placeholder="예: 30대 여성, 지역 소상공인" />
              <div className="md:col-span-2">
                <TextArea label="경쟁업체 또는 참고 업체 링크" name="competitor_links" rows={3} />
              </div>
            </div>
          </Section>

          <Section title="3. 홈페이지 제작 목적" description="가장 중요한 목적을 중심으로 여러 개 선택해 주세요.">
            <CheckboxGroup
              options={mainPurposeOptions}
              value={multiValues.main_purpose}
              onChange={(value) => setMulti('main_purpose', value)}
            />
            <div className="mt-4">
              <Field label="기타 직접 입력" name="main_purpose_other" />
            </div>
          </Section>

          <Section title="4. 방문자가 가장 먼저 하길 원하는 행동" description="홈페이지에서 가장 먼저 유도해야 할 행동을 골라주세요.">
            <CheckboxGroup
              options={primaryCtaOptions}
              value={multiValues.primary_cta}
              onChange={(value) => setMulti('primary_cta', value)}
            />
            <div className="mt-4">
              <Field label="기타 직접 입력" name="primary_cta_other" />
            </div>
          </Section>

          <Section title="5. 필수 페이지 구성" description="필요해 보이는 페이지를 모두 선택해 주세요. 실제 구성은 제작 기획 단계에서 조정할 수 있습니다.">
            <CheckboxGroup
              options={requiredPageOptions}
              value={multiValues.required_pages}
              onChange={(value) => setMulti('required_pages', value)}
            />
            <div className="mt-4">
              <Field label="기타 직접 입력" name="required_pages_other" />
            </div>
          </Section>

          <Section title="6. 필요한 기능" description="기능이 확정되지 않았더라도 필요할 수 있는 항목을 편하게 선택해 주세요.">
            <CheckboxGroup
              options={requiredFeatureOptions}
              value={multiValues.required_features}
              onChange={(value) => setMulti('required_features', value)}
            />
          </Section>

          <Section title="7. 원하는 디자인 방향" description="정확한 디자인을 몰라도 괜찮습니다. 가까운 분위기를 선택해 주세요.">
            <CheckboxGroup
              options={designMoodOptions}
              value={multiValues.design_mood}
              onChange={(value) => setMulti('design_mood', value)}
            />
            <div className="mt-4">
              <Field label="기타 직접 입력" name="design_mood_other" />
            </div>
          </Section>

          <Section title="8. 컬러" description="브랜드 컬러가 있으면 적어주시고, 피하고 싶은 색이 있으면 함께 알려주세요.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="선호 컬러" name="preferred_colors" placeholder="예: 흰색, 블랙, 짙은 그린" />
              <Field label="피하고 싶은 컬러" name="disliked_colors" placeholder="예: 너무 강한 빨강, 형광색" />
            </div>
          </Section>

          <Section title="9. 참고 사이트" description="마음에 드는 사이트와 싫은 사이트를 함께 주시면 방향 잡기가 훨씬 쉬워집니다.">
            <div className="space-y-4">
              <ReferenceSiteManager
                label="마음에 드는 사이트 URL"
                helperText="입력창 하나에 URL 하나만 넣고 확인을 눌러 저장해 주세요."
                sites={referenceSites}
                input={referenceSiteInput}
                editingIndex={editingReferenceIndex}
                onInputChange={setReferenceSiteInput}
                onSave={handleReferenceSiteSave}
                onEdit={handleReferenceSiteEdit}
                onRemove={handleReferenceSiteRemove}
                onCancelEdit={() => {
                  setReferenceSiteInput('');
                  setEditingReferenceIndex(null);
                }}
              />
              <ReferenceSiteManager
                label="절대 이런 느낌은 싫은 사이트"
                helperText="피하고 싶은 사이트도 URL 하나씩 확인을 눌러 저장해 주세요."
                sites={dislikedSites}
                input={dislikedSiteInput}
                editingIndex={editingDislikedIndex}
                onInputChange={setDislikedSiteInput}
                onSave={handleDislikedSiteSave}
                onEdit={handleDislikedSiteEdit}
                onRemove={handleDislikedSiteRemove}
                onCancelEdit={() => {
                  setDislikedSiteInput('');
                  setEditingDislikedIndex(null);
                }}
              />
            </div>
          </Section>

          <Section title="10. 준비 자료" description="현재 준비된 자료를 기준으로 제작 범위와 일정이 달라질 수 있습니다.">
            <CheckboxGroup
              options={materialOptions}
              value={multiValues.provided_materials}
              onChange={(value) => setMulti('provided_materials', value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              <Field label="기존 홈페이지 주소" name="existing_website" placeholder="https://..." />
              <label className="block">
                <span className="block text-xs text-[#0a0a0a]/50 mb-2">도메인 보유 여부</span>
                <select
                  name="has_domain"
                  value={hasDomain}
                  onChange={(event) => setHasDomain(event.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#0a0a0a]/10 rounded-md text-sm text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a]/35 transition-colors"
                >
                  <option value="">선택 안 함</option>
                  <option value="있음">있음</option>
                  <option value="없음">없음</option>
                  <option value="확인 필요">확인 필요</option>
                </select>
              </label>
            </div>
          </Section>

          <Section title="11. 일정" description="희망 일정이 정해져 있다면 알려주세요. 무리한 일정은 별도로 조율합니다.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="희망 오픈일" name="desired_launch_date" type="date" />
              <label className="block">
                <span className="block text-xs text-[#0a0a0a]/50 mb-2">급한 일정 여부</span>
                <select
                  name="urgency"
                  className="w-full px-4 py-3 bg-white border border-[#0a0a0a]/10 rounded-md text-sm text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a]/35 transition-colors"
                >
                  <option value="보통">보통</option>
                  <option value="2주 이내">2주 이내</option>
                  <option value="1개월 이내">1개월 이내</option>
                  <option value="날짜 협의 필요">날짜 협의 필요</option>
                </select>
              </label>
            </div>
          </Section>

          <Section title="12. 추가 요청사항" description="꼭 반영해야 하는 내용이나 자주 받는 질문을 적어주세요.">
            <div className="space-y-4">
              <TextArea label="꼭 들어갔으면 하는 내용" name="must_include_content" />
              <TextArea label="고객이 자주 묻는 질문" name="frequently_asked_questions" />
              <TextArea label="추가 요청사항" name="additional_requests" />
            </div>
          </Section>

          {error && (
            <div role="alert" className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-md px-4 py-3">
              {error}
            </div>
          )}

          <div className="sticky bottom-0 bg-[#f8f7f4]/95 backdrop-blur py-4 border-t border-[#0a0a0a]/6">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:justify-between">
              <p className="text-xs text-[#0a0a0a]/45">
                필수 항목을 작성한 뒤 제출해 주세요. 제출 후에는 검토를 거쳐 제작 기획에 반영됩니다.{' '}
                <a href="/privacy" className="underline underline-offset-2 hover:text-[#0a0a0a]">개인정보처리방침</a>
              </p>
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto min-w-56 px-8 py-4 bg-[#0a0a0a] text-white text-sm font-medium rounded-md hover:bg-[#0a0a0a]/85 transition-colors cursor-pointer disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {loading && <i className="ri-loader-4-line animate-spin" />}
              {loading ? '제출 중...' : '제작 요청서 제출'}
            </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
