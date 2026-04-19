import { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import Seo from '@/components/feature/Seo';
import { SEO_PAGES } from '@/config/seo';

/* ─────────────────────────────────────────────
   MultiSelect 컴포넌트
───────────────────────────────────────────── */
interface MultiSelectProps {
  name: string;
  options: string[];
  placeholder?: string;
}

function MultiSelect({ name, options, placeholder = '선택하세요' }: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggle = (v: string) => {
    setSelected((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  };

  const addCustom = () => {
    const val = customInput.trim();
    if (val && !selected.includes(val)) {
      setSelected((prev) => [...prev, val]);
    }
    setCustomInput('');
  };

  const remove = (v: string) => setSelected((prev) => prev.filter((x) => x !== v));

  const displayValue = selected.join(', ');

  return (
    <div ref={ref} className="relative">
      <input type="hidden" name={name} value={displayValue} />

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-left bg-[#F8FAFC] focus:outline-none focus:border-[#1E5EFF] transition-colors flex items-center justify-between gap-2 cursor-pointer"
      >
        <span className={selected.length === 0 ? 'text-[#CBD5E1]' : 'text-[#0F172A]'}>
          {selected.length === 0 ? placeholder : `${selected.length}개 선택됨`}
        </span>
        <i className={`ri-arrow-down-s-line text-[#94A3B8] transition-transform ${open ? 'rotate-180' : ''}`}></i>
      </button>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {selected.map((v) => (
            <span
              key={v}
              className="inline-flex items-center gap-1 bg-[#EEF2FF] text-[#1E5EFF] text-xs font-medium px-2.5 py-1 rounded-full"
            >
              {v}
              <button
                type="button"
                onClick={() => remove(v)}
                className="w-3 h-3 flex items-center justify-center cursor-pointer hover:text-[#1a4fd8]"
              >
                <i className="ri-close-line text-xs"></i>
              </button>
            </span>
          ))}
        </div>
      )}

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-[#E2E8F0] rounded-xl shadow-lg overflow-hidden">
          <div className="max-h-64 overflow-y-auto">
            {options.map((opt) => {
              const checked = selected.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggle(opt)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors cursor-pointer ${
                    checked ? 'bg-[#EEF2FF] text-[#1E5EFF]' : 'text-[#334155] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <span
                    className={`w-4 h-4 flex-shrink-0 rounded border flex items-center justify-center transition-colors ${
                      checked ? 'bg-[#1E5EFF] border-[#1E5EFF]' : 'border-[#CBD5E1]'
                    }`}
                  >
                    {checked && <i className="ri-check-line text-white text-[10px]"></i>}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
          <div className="border-t border-[#E2E8F0] px-3 py-2.5 flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustom(); } }}
              placeholder="직접 입력 후 추가"
              className="flex-1 text-sm border border-[#E2E8F0] rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#1E5EFF] bg-[#F8FAFC] placeholder-[#CBD5E1]"
            />
            <button
              type="button"
              onClick={addCustom}
              className="text-xs font-semibold text-white bg-[#1E5EFF] px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer hover:bg-[#1a4fd8] transition-colors"
            >
              추가
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   옵션 데이터
───────────────────────────────────────────── */
const PURPOSE_OPTIONS = ['홍보', '문의', '예약', '구매', '브랜딩'];

const FAQ_OPTIONS = [
  '가격 / 비용', '효과 및 결과', '소요 시간', '고객 후기', '위치 / 오시는 길',
  '예약 방법', '상담 절차', '전문가 경력', '시술 / 서비스 종류', '부작용 / 주의사항',
  '할인 / 이벤트', '주차 가능 여부', '운영 시간', '재방문 혜택',
];

const KEY_POINTS_OPTIONS = [
  '신뢰감', '고급스러움', '빠른 상담', '친근함', '전문성', '가성비',
  '오랜 경력', '수상 / 인증', '고객 만족도', '투명한 가격',
  '편리한 접근성', '최신 장비 / 기술', '맞춤형 서비스', '빠른 응답 속도',
];

const EMPHASIS_OPTIONS = [
  '고객 후기', '전후 사진', '전문가 경력', '상담 안내', '수상 / 인증',
  '가격 안내', '서비스 상세 설명', '이벤트 / 프로모션', '팀 소개',
  '시공 / 작업 사례', '언론 보도', '파트너사 / 협력사', '보증 / 환불 정책', '자주 묻는 질문',
];

const MOOD_OPTIONS = [
  '깔끔함', '전문적', '감성적', '모던', '따뜻함', '고급스러움',
  '미니멀', '활기찬', '신뢰감 있는', '젊고 트렌디한',
  '자연 친화적', '럭셔리', '심플하고 직관적', '밝고 화사한',
];

/* ─────────────────────────────────────────────
   메인 페이지
───────────────────────────────────────────── */
export default function RequestPage() {
  const seo = SEO_PAGES['/request'];
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageLen, setMessageLen] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (form: HTMLFormElement): Record<string, string> => {
    const errs: Record<string, string> = {};
    const get = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | null)?.value?.trim() ?? '';

    if (!get('company_name')) errs.company_name = '업체명을 입력해주세요.';
    if (!get('industry')) errs.industry = '업종을 입력해주세요.';
    if (!get('purpose')) errs.purpose = '홈페이지 목적을 선택해주세요.';
    if (!get('keywords')) errs.keywords = '검색 키워드를 입력해주세요.';
    if (!get('region')) errs.region = '주요 활동 지역을 입력해주세요.';
    if (!get('name')) errs.name = '이름을 입력해주세요.';

    // 연락 방법: 3개 중 1개 이상
    const phone = get('phone');
    const kakao = get('kakao');
    const contactOther = get('contact_other');
    if (!phone && !kakao && !contactOther) {
      errs.contact = '전화번호, 카카오톡 링크, 기타 연락 방법 중 하나 이상 입력해주세요.';
    }

    return errs;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // 첫 번째 에러 필드로 스크롤
      const firstKey = Object.keys(errs)[0];
      const el = form.querySelector(`[data-error="${firstKey}"]`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setErrors({});
    const textarea = form.querySelector('textarea[name="detail"]') as HTMLTextAreaElement | null;
    if (textarea && textarea.value.length > 500) return;
    setLoading(true);
    const fd = new FormData(form);
    const getString = (key: string) => (fd.get(key) as string)?.trim() || null;
    const payload = {
      name: getString('name'),
      email: getString('email'),
      company_name: getString('company_name'),
      industry: getString('industry'),
      services: getString('services'),
      purpose: getString('purpose'),
      target: getString('target'),
      keywords: getString('keywords'),
      region: getString('region'),
      competitors: getString('competitors'),
      faq_topics: getString('faq_topics'),
      key_points: getString('key_points'),
      emphasis: getString('emphasis'),
      must_have: getString('must_have'),
      detail: getString('detail'),
      menu: getString('menu'),
      mood: getString('mood'),
      color_main: getString('color_main'),
      color_ref: getString('color_ref'),
      ref_site: getString('ref_site'),
      avoid_style: getString('avoid_style'),
      phone: getString('phone'),
      kakao: getString('kakao'),
      contact_other: getString('contact_other'),
      extra: getString('extra'),
      status: 'unread',
    };
    try {
      const { error } = await supabase.from('requests').insert(payload);
      if (error) throw error;
      setSubmitted(true);
    } catch {
      alert('전송 중 오류가 발생했습니다. 카카오톡으로 문의해주세요.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-5 py-20">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 flex items-center justify-center bg-[#1E5EFF]/10 rounded-full mx-auto mb-5">
            <i className="ri-check-line text-[#1E5EFF] text-3xl"></i>
          </div>
          <h2 className="text-xl font-bold text-[#0F172A] mb-2">요청서가 접수되었습니다!</h2>
          <p className="text-[#64748B] text-sm leading-relaxed mb-6">
            내용을 검토한 후 빠른 시일 내에<br />카카오톡 또는 연락처로 연락드리겠습니다.
          </p>
          <a
            href="https://pf.kakao.com/_xcBxnxlX/friend"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FEE500] text-[#3C1E1E] font-semibold px-6 py-3 rounded-full text-sm whitespace-nowrap cursor-pointer hover:bg-[#f5dc00] transition-colors"
          >
            <i className="ri-kakao-talk-fill text-base"></i>
            카카오톡으로 추가 문의
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] py-14 md:py-20 px-5">
      <Seo
        title={seo.title}
        description={seo.description}
        ogTitle={seo.ogTitle}
        ogDescription={seo.ogDescription}
        path="/request"
        noindex
      />
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-[#1E5EFF] text-xs font-semibold tracking-widest uppercase mb-3 block">Request Form</span>
          <h1 className="text-2xl md:text-4xl font-bold text-[#0F172A] mb-3">홈페이지 제작 요청서</h1>
          <p className="text-[#64748B] text-sm leading-relaxed">
            아래 내용을 작성해주시면 맞춤 견적과 상담을 도와드립니다.<br />
            <span className="text-[#94A3B8]">* 표시 항목은 필수입니다.</span>
          </p>
        </div>

        <form
          id="homepage-request-form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          {/* 기본 정보 */}
          <Section title="기본 정보" required>
            <Field label="업체명" required>
              <div data-error="company_name">
                <input name="company_name" type="text" placeholder="예: 홍길동 피부과" className={inputClass} />
                {errors.company_name && <p className="text-xs text-red-400 mt-1">{errors.company_name}</p>}
              </div>
            </Field>
            <Field label="업종" required>
              <div data-error="industry">
                <input name="industry" type="text" placeholder="예: 피부과, 인테리어, 학원, 카페 등" className={inputClass} />
                {errors.industry && <p className="text-xs text-red-400 mt-1">{errors.industry}</p>}
              </div>
            </Field>
            <Field label="제공 서비스">
              <input name="services" type="text" placeholder="예: 피부 관리, 레이저 시술, 상담 등" className={inputClass} />
            </Field>
          </Section>

          {/* 홈페이지 목적 */}
          <Section title="홈페이지 목적" required>
            <Field label="주요 목적" hint="여러 개 선택 가능 · 직접 입력도 가능합니다">
              <div data-error="purpose">
                <MultiSelect name="purpose" options={PURPOSE_OPTIONS} placeholder="홈페이지 목적을 선택하세요" />
                {errors.purpose && <p className="text-xs text-red-400 mt-1">{errors.purpose}</p>}
              </div>
            </Field>
          </Section>

          {/* 타겟 고객 */}
          <Section title="타겟 고객">
            <Field label="주 고객층">
              <input name="target" type="text" placeholder="예: 30~40대 여성, 소상공인, 학부모 등" className={inputClass} />
            </Field>
          </Section>

          {/* 검색 키워드 */}
          <Section title="고객이 실제 검색할 것 같은 키워드" required>
            <Field label="검색 키워드" required hint="최소 5개 이상, 쉼표로 구분해주세요">
              <div data-error="keywords">
                <textarea
                  name="keywords"
                  rows={3}
                  placeholder="예: 강남 피부과, 레이저 시술 추천, 피부 관리 잘하는 곳, 강남역 피부과 가격, 피부과 상담"
                  className={`${inputClass} resize-none`}
                />
                {errors.keywords && <p className="text-xs text-red-400 mt-1">{errors.keywords}</p>}
              </div>
            </Field>
          </Section>

          {/* 주요 활동 지역 */}
          <Section title="주요 활동 지역" required>
            <Field label="지역" required hint="오프라인/지역 기반일 경우 반드시 작성">
              <div data-error="region">
                <input name="region" type="text" placeholder="예: 서울 강남, 부산 해운대, 전국 온라인" className={inputClass} />
                {errors.region && <p className="text-xs text-red-400 mt-1">{errors.region}</p>}
              </div>
            </Field>
          </Section>

          {/* 경쟁 업체 */}
          <Section title="경쟁 업체 또는 참고 업체">
            <Field label="경쟁/참고 업체" hint="검색했을 때 같이 나오는 업체 또는 비슷한 업체">
              <input name="competitors" type="text" placeholder="예: OO피부과, OO인테리어 등" className={inputClass} />
            </Field>
          </Section>

          {/* 고객 궁금증 */}
          <Section title="고객이 문의하기 전 가장 궁금해하는 것">
            <Field label="주요 궁금증" hint="여러 개 선택 가능 · 직접 입력도 가능합니다">
              <MultiSelect name="faq_topics" options={FAQ_OPTIONS} placeholder="궁금해하는 항목을 선택하세요" />
            </Field>
          </Section>

          {/* 강조 포인트 */}
          <Section title="강조 포인트">
            <Field label="중요하게 생각하는 포인트" hint="여러 개 선택 가능 · 직접 입력도 가능합니다">
              <MultiSelect name="key_points" options={KEY_POINTS_OPTIONS} placeholder="중요 포인트를 선택하세요" />
            </Field>
            <Field label="강조하고 싶은 요소" hint="여러 개 선택 가능 · 직접 입력도 가능합니다">
              <MultiSelect name="emphasis" options={EMPHASIS_OPTIONS} placeholder="강조 요소를 선택하세요" />
            </Field>
          </Section>

          {/* 홈페이지 필수 내용 */}
          <Section title="홈페이지에 꼭 들어갔으면 하는 내용">
            <Field label="필수 포함 내용">
              <textarea
                name="must_have"
                rows={3}
                maxLength={500}
                placeholder="예: 원장 소개, 시술 전후 사진, 오시는 길, 예약 폼 등"
                className={`${inputClass} resize-none`}
              />
            </Field>
          </Section>

          {/* 제공 서비스 상세 */}
          <Section title="제공 서비스 상세" optional>
            <Field label="서비스 상세 설명" hint="가능하면 구체적으로 작성">
              <textarea
                name="detail"
                rows={4}
                maxLength={500}
                onChange={(e) => setMessageLen(e.target.value.length)}
                placeholder="각 서비스명, 가격, 특징 등을 자유롭게 적어주세요. (최대 500자)"
                className={`${inputClass} resize-none`}
              />
              <p className={`text-xs mt-1 text-right ${messageLen > 480 ? 'text-red-400' : 'text-[#94A3B8]'}`}>{messageLen}/500</p>
            </Field>
          </Section>

          {/* 메뉴 구성 */}
          <Section title="메뉴 구성" optional>
            <Field label="원하는 페이지 구성" hint="없으면 비워두셔도 됩니다">
              <input name="menu" type="text" placeholder="예: 홈, 서비스 소개, 후기, 문의하기" className={inputClass} />
            </Field>
          </Section>

          {/* 디자인 */}
          <Section title="원하는 분위기 / 디자인">
            <Field label="분위기 / 느낌" hint="여러 개 선택 가능 · 직접 입력도 가능합니다">
              <MultiSelect name="mood" options={MOOD_OPTIONS} placeholder="원하는 분위기를 선택하세요" />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="선호 메인 컬러">
                <input name="color_main" type="text" placeholder="예: 화이트, 네이비, 베이지" className={inputClass} />
              </Field>
              <Field label="참고 색상">
                <input name="color_ref" type="text" placeholder="예: 골드 포인트, 파스텔 계열" className={inputClass} />
              </Field>
            </div>
            <Field label="참고 사이트" optional>
              <input name="ref_site" type="text" placeholder="참고하고 싶은 사이트 URL" className={inputClass} />
            </Field>
            <Field label="피하고 싶은 스타일" optional>
              <input name="avoid_style" type="text" placeholder="예: 너무 화려한 디자인, 어두운 배경 등" className={inputClass} />
            </Field>
          </Section>

          {/* 연락 방법 */}
          <Section title="고객이 문의할 수 있는 방식" required>
            <p className="text-xs text-[#64748B] -mt-2 mb-1">
              아래 3가지 중 <span className="font-semibold text-[#0F172A]">하나 이상</span> 입력해주세요.
            </p>
            <div data-error="contact" className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="전화번호">
                  <input name="phone" type="tel" placeholder="010-0000-0000" className={inputClass} />
                </Field>
                <Field label="카카오톡 오픈채팅 링크">
                  <input name="kakao" type="text" placeholder="https://open.kakao.com/..." className={inputClass} />
                </Field>
              </div>
              <Field label="기타 연락 방법">
                <input name="contact_other" type="text" placeholder="예: 인스타그램 DM, 이메일 등" className={inputClass} />
              </Field>
              {errors.contact && <p className="text-xs text-red-400">{errors.contact}</p>}
            </div>
          </Section>

          {/* 기타 요청사항 */}
          <Section title="기타 요청사항" optional>
            <Field label="추가로 전달하고 싶은 내용">
              <textarea
                name="extra"
                rows={3}
                maxLength={500}
                placeholder="자유롭게 작성해주세요. (최대 500자)"
                className={`${inputClass} resize-none`}
              />
            </Field>
          </Section>

          {/* 제출자 정보 */}
          <Section title="제출자 정보" required>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="이름" required>
                <div data-error="name">
                  <input name="name" type="text" placeholder="홍길동" className={inputClass} />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>
              </Field>
              <Field label="이메일">
                <input name="email" type="email" placeholder="example@email.com" className={inputClass} />
              </Field>
            </div>
          </Section>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1E5EFF] text-white font-semibold py-4 rounded-xl text-sm whitespace-nowrap cursor-pointer hover:bg-[#1a4fd8] transition-colors disabled:opacity-60"
          >
            {loading ? '제출 중...' : '요청서 제출하기'}
          </button>
          <p className="text-center text-xs text-[#94A3B8] pb-4">
            제출 후 평일 15:00~18:00 내 연락드립니다.
          </p>
        </form>
      </div>
    </main>
  );
}

/* ─────────────────────────────────────────────
   공통 스타일 / 헬퍼 컴포넌트
───────────────────────────────────────────── */
const inputClass =
  'w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder-[#CBD5E1] focus:outline-none focus:border-[#1E5EFF] bg-[#F8FAFC] transition-colors';

function Section({
  title,
  required,
  optional,
  children,
}: {
  title: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 md:p-6">
      <div className="flex items-center gap-1.5 mb-5">
        <h2 className="text-sm font-bold text-[#0F172A]">{title}</h2>
        {required && <span className="text-red-400 text-sm font-semibold">*</span>}
        {optional && (
          <span className="text-[10px] font-medium text-[#94A3B8] bg-[#F1F5F9] px-2 py-0.5 rounded-full whitespace-nowrap">
            선택
          </span>
        )}
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  required,
  optional,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <label className="text-xs font-semibold text-[#334155]">{label}</label>
        {required && <span className="text-red-400 text-xs">*</span>}
        {optional && <span className="text-[10px] text-[#94A3B8]">(선택)</span>}
      </div>
      {hint && <p className="text-[10px] text-[#94A3B8] -mt-0.5">{hint}</p>}
      {children}
    </div>
  );
}
