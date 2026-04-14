import { useState } from 'react';
import type { FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import Seo from '@/components/feature/Seo';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const textarea = form.querySelector('textarea');
    if (textarea && textarea.value.length > 500) {
      alert('내용은 500자 이내로 입력해주세요.');
      return;
    }
    setLoading(true);
    const fd = new FormData(form);
    const payload = {
      name: fd.get('name') as string,
      phone: fd.get('phone') as string,
      email: (fd.get('email') as string) || null,
      industry: fd.get('industry') as string,
      type: (fd.get('type') as string) || null,
      message: fd.get('message') as string,
      status: 'unread',
    };
    try {
      const { error } = await supabase.from('contacts').insert(payload);
      if (error) throw error;
      setSubmitted(true);
    } catch {
      alert('전송 중 오류가 발생했습니다. 카카오톡으로 문의해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-20 min-h-screen bg-white">
      <Seo
        title="홈페이지 제작 문의 | 웹메이드 상담 신청"
        description="홈페이지 제작 비용과 상담이 궁금하신가요? 웹메이드에서 빠르고 전문적인 상담을 받아보세요. 카카오톡 문의 가능."
        ogTitle="문의하기"
        ogDescription="홈페이지 제작 상담 바로가기"
        canonical="https://webmade.co.kr/contact"
      />
      {/* Hero */}
      <section className="bg-[#F8FAFC] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
          <span className="text-[#1E5EFF] text-xs font-semibold tracking-widest uppercase mb-3 block">Contact</span>
          <h1 className="text-3xl md:text-5xl font-bold text-[#0F172A] leading-tight mb-4">상담 문의</h1>
          <p className="text-[#64748B] text-base md:text-lg max-w-xl mx-auto">
            아래 내용만 보내주시면 상담이 더 빠르게 진행됩니다.<br />
            전국 어디서든 비대면으로 진행 가능합니다.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Info */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <h2 className="text-xl font-bold text-[#0F172A] mb-4">이런 내용을 보내주세요</h2>
              <ul className="flex flex-col gap-3">
                {['업종 (예: 피부과, 인테리어, 학원 등)', '필요한 페이지 수 또는 구성', '참고하고 싶은 사이트 (있다면)', '원하는 분위기나 색상', '예산 범위 (대략적으로도 OK)'].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#64748B]">
                    <i className="ri-check-line text-[#22C55E] mt-0.5 shrink-0"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#F8FAFC] rounded-2xl p-6">
              <p className="text-[#0F172A] font-semibold text-sm mb-3">카카오톡으로 빠르게 문의</p>
              <p className="text-[#64748B] text-xs mb-4 leading-relaxed">폼 작성이 번거로우시면 카카오톡으로 편하게 연락주세요. 보통 당일 내 답변드립니다.</p>
              <a
                href="https://pf.kakao.com/_xcBxnxlX/friend"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#FEE500] text-[#3C1E1E] font-semibold px-5 py-3 rounded-full text-sm whitespace-nowrap cursor-pointer hover:bg-[#f5dc00] transition-colors w-full justify-center"
              >
                <i className="ri-kakao-talk-fill text-base"></i>
                카카오톡으로 문의하기
              </a>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { icon: 'ri-time-line', label: '연락 가능 시간', value: '평일 15:00 - 18:00' },
                { icon: 'ri-map-pin-line', label: '상담 방식', value: '전국 비대면 상담 가능' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center bg-[#1E5EFF]/10 rounded-xl shrink-0">
                    <i className={`${item.icon} text-[#1E5EFF] text-sm`}></i>
                  </div>
                  <div>
                    <p className="text-[#94A3B8] text-xs">{item.label}</p>
                    <p className="text-[#0F172A] text-sm font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full gap-5 py-20 text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-[#22C55E]/10 rounded-full">
                  <i className="ri-check-line text-[#22C55E] text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">문의가 접수되었습니다!</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">빠른 시일 내에 카카오톡 또는 이메일로 연락드리겠습니다.<br />급하신 경우 카카오톡으로 직접 문의해주세요.</p>
                <a
                  href="https://pf.kakao.com/_xcBxnxlX/friend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FEE500] text-[#3C1E1E] font-semibold px-6 py-3 rounded-full text-sm whitespace-nowrap cursor-pointer hover:bg-[#f5dc00] transition-colors"
                >
                  <i className="ri-kakao-talk-fill"></i>
                  카카오톡 바로가기
                </a>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[#0F172A] text-sm font-medium mb-1.5 block">이름 <span className="text-red-400">*</span></label>
                    <input name="name" required type="text" placeholder="홍길동" className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder-[#CBD5E1] focus:outline-none focus:border-[#1E5EFF] bg-[#F8FAFC]" />
                  </div>
                  <div>
                    <label className="text-[#0F172A] text-sm font-medium mb-1.5 block">연락처 <span className="text-red-400">*</span></label>
                    <input name="phone" required type="tel" placeholder="010-0000-0000" className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder-[#CBD5E1] focus:outline-none focus:border-[#1E5EFF] bg-[#F8FAFC]" />
                  </div>
                </div>
                <div>
                  <label className="text-[#0F172A] text-sm font-medium mb-1.5 block">이메일</label>
                  <input name="email" type="email" placeholder="example@email.com" className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder-[#CBD5E1] focus:outline-none focus:border-[#1E5EFF] bg-[#F8FAFC]" />
                </div>
                <div>
                  <label className="text-[#0F172A] text-sm font-medium mb-1.5 block">업종 <span className="text-red-400">*</span></label>
                  <input name="industry" required type="text" placeholder="예: 피부과, 인테리어, 학원, 컨설팅 등" className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder-[#CBD5E1] focus:outline-none focus:border-[#1E5EFF] bg-[#F8FAFC]" />
                </div>
                <div>
                  <label className="text-[#0F172A] text-sm font-medium mb-1.5 block">홈페이지 유형</label>
                  <select name="type" className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#0F172A] focus:outline-none focus:border-[#1E5EFF] bg-[#F8FAFC] cursor-pointer">
                    <option value="">선택해주세요</option>
                    <option value="회사소개형">회사소개형</option>
                    <option value="서비스안내형">서비스 안내형</option>
                    <option value="상담유도형">상담 유도형</option>
                    <option value="기타">기타 (상담 후 결정)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#0F172A] text-sm font-medium mb-1.5 block">문의 내용 <span className="text-red-400">*</span></label>
                  <textarea
                    name="message"
                    required
                    maxLength={500}
                    rows={5}
                    placeholder="필요한 페이지 구성, 참고 사이트, 원하는 분위기 등을 자유롭게 적어주세요. (최대 500자)"
                    className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder-[#CBD5E1] focus:outline-none focus:border-[#1E5EFF] bg-[#F8FAFC] resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1E5EFF] text-white font-semibold py-4 rounded-xl whitespace-nowrap cursor-pointer hover:bg-[#1a4fd8] transition-colors disabled:opacity-60 text-sm"
                >
                  {loading ? '전송 중...' : '문의 보내기'}
                </button>
                <p className="text-[#94A3B8] text-xs text-center">
                  급하신 경우{' '}
                  <a href="https://pf.kakao.com/_xcBxnxlX/friend" target="_blank" rel="noopener noreferrer" className="text-[#ca9f00] font-medium">카카오톡</a>
                  으로 바로 문의해주세요.
                </p>
                <div className="flex items-start gap-3 bg-[#FFF7ED] border border-[#FED7AA] rounded-xl px-4 py-4">
                  <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                    <i className="ri-error-warning-line text-[#EA580C] text-base"></i>
                  </div>
                  <p className="text-[#9A3412] text-xs leading-relaxed">
                    웹메이드는 <strong className="text-[#C2410C] font-semibold">소개형·안내형 홈페이지 제작</strong>에 집중합니다.<br />
                    쇼핑몰 및 로그인 기능 개발은 진행하지 않습니다.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
