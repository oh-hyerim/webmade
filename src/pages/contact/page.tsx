import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import Seo from '@/components/feature/Seo';
import PrivacyPolicyContent from '@/components/PrivacyPolicyContent';
import { SEO_PAGES } from '@/config/seo';
import { KAKAO_CHANNEL_URL } from '@/config/site';

export default function ContactPage() {
  const seo = SEO_PAGES['/contact'];
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
    message?: string;
    privacy?: string;
  }>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    if (fd.get('website')) {
      setSubmitted(true);
      return;
    }

    const name = ((fd.get('name') as string) || '').trim();
    const phone = ((fd.get('phone') as string) || '').trim();
    const email = ((fd.get('email') as string) || '').trim();
    const message = ((fd.get('message') as string) || '').trim();

    const nextErrors: typeof errors = {};
    if (!name) nextErrors.name = '이름을 입력해주세요.';
    const phoneDigits = phone.replace(/\D/g, '');
    if (!phone) nextErrors.phone = '전화번호를 입력해주세요.';
    else if (phoneDigits.length < 9 || phoneDigits.length > 15) {
      nextErrors.phone = '올바른 전화번호를 입력해주세요.';
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = '올바른 이메일 형식을 입력해주세요.';
    }
    if (!message) nextErrors.message = '문의 내용을 입력해주세요.';
    if (message.length > 1500) nextErrors.message = '내용은 1,500자 이내로 입력해주세요.';
    if (!privacyAgreed) nextErrors.privacy = '개인정보 처리방침에 동의해 주세요.';

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    const payload = {
      name,
      phone,
      email: email || null,
      industry: '',
      type: null as string | null,
      message,
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
        title={seo.title}
        description={seo.description}
        ogTitle={seo.ogTitle}
        ogDescription={seo.ogDescription}
        path="/contact"
      />
      <section className="bg-[#F8FAFC] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
          <span className="text-[#1E5EFF] text-xs font-semibold tracking-widest uppercase mb-3 block">Contact</span>
          <h1 className="text-3xl md:text-5xl font-bold text-[#0F172A] leading-tight mb-4">홈페이지 제작 상담</h1>
          <p className="text-[#64748B] text-base md:text-lg max-w-xl mx-auto">
            간단한 상담으로 방향부터 잡아드립니다. 부담 없이 문의주세요
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <a
              href={KAKAO_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#FEE500] text-[#3C1E1E] font-bold px-6 py-3.5 rounded-full text-sm hover:bg-[#f5dc00] transition-colors"
            >
              <i className="ri-kakao-talk-fill text-lg"></i>
              카카오톡 상담
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-6 md:px-10">
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-5 py-16 text-center border border-[#E2E8F0] rounded-2xl bg-[#F8FAFC] px-6">
              <div className="w-16 h-16 flex items-center justify-center bg-[#22C55E]/10 rounded-full">
                <i className="ri-check-line text-[#22C55E] text-3xl"></i>
              </div>
              <p className="text-[#0F172A] text-base font-semibold leading-relaxed max-w-md">
                문의가 접수되었습니다. 빠른 시일 내 연락드리겠습니다.
              </p>
              <p className="text-[#64748B] text-sm leading-relaxed max-w-md">
                급하신 경우 카카오톡으로 알려주시면 더 빠르게 도와드릴 수 있어요.
              </p>
              <a
                href={KAKAO_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#FEE500] text-[#3C1E1E] font-semibold px-6 py-3 rounded-full text-sm whitespace-nowrap cursor-pointer hover:bg-[#f5dc00] transition-colors"
              >
                <i className="ri-kakao-talk-fill"></i>
                카카오톡 바로가기
              </a>
              <Link to="/" className="text-[#1E5EFF] text-sm font-semibold hover:underline">
                홈으로 돌아가기
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website-fake">웹사이트</label>
                <input type="text" id="website-fake" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div>
                <label htmlFor="contact-name" className="text-[#0F172A] text-sm font-medium mb-1.5 block">
                  이름 <span className="text-red-400">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="홍길동"
                  className="w-full border border-[#E2E8F0] rounded-xl px-4 py-4 text-base text-[#0F172A] placeholder-[#CBD5E1] focus:outline-none focus:border-[#1E5EFF] focus:ring-2 focus:ring-[#1E5EFF]/20 bg-[#F8FAFC]"
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="contact-phone" className="text-[#0F172A] text-sm font-medium mb-1.5 block">
                  전화번호 <span className="text-red-400">*</span>
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="010-1234-5678"
                  className="w-full border border-[#E2E8F0] rounded-xl px-4 py-4 text-base text-[#0F172A] placeholder-[#CBD5E1] focus:outline-none focus:border-[#1E5EFF] focus:ring-2 focus:ring-[#1E5EFF]/20 bg-[#F8FAFC]"
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="contact-email" className="text-[#0F172A] text-sm font-medium mb-1.5 block">
                  이메일
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="선택 입력 (name@example.com)"
                  className="w-full border border-[#E2E8F0] rounded-xl px-4 py-4 text-base text-[#0F172A] placeholder-[#CBD5E1] focus:outline-none focus:border-[#1E5EFF] focus:ring-2 focus:ring-[#1E5EFF]/20 bg-[#F8FAFC]"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="contact-message" className="text-[#0F172A] text-sm font-medium mb-1.5 block">
                  문의 내용 <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  maxLength={1500}
                  rows={6}
                  placeholder="업종, 원하시는 일정, 참고 사이트 등을 자유롭게 적어주세요."
                  className="w-full border border-[#E2E8F0] rounded-xl px-4 py-4 text-base text-[#0F172A] placeholder-[#CBD5E1] focus:outline-none focus:border-[#1E5EFF] focus:ring-2 focus:ring-[#1E5EFF]/20 bg-[#F8FAFC] resize-none"
                  aria-invalid={!!errors.message}
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>

              <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-4">
                <div className="flex items-start gap-3">
                  <input
                    id="contact-privacy"
                    type="checkbox"
                    checked={privacyAgreed}
                    onChange={(e) => setPrivacyAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-[#CBD5E1] text-[#1E5EFF] focus:ring-[#1E5EFF]/20 shrink-0"
                    aria-describedby="privacy-hint"
                  />
                  <div id="privacy-hint" className="text-sm text-[#334155] leading-relaxed">
                    <button
                      type="button"
                      onClick={() => setPrivacyModalOpen(true)}
                      className="text-[#1E5EFF] font-medium underline underline-offset-2"
                    >
                      개인정보 처리방침
                    </button>
                    에 동의합니다 <span className="text-red-400">*</span>
                  </div>
                </div>
                {errors.privacy && <p className="text-xs text-red-500 mt-2">{errors.privacy}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1E5EFF] text-white font-bold py-5 rounded-xl whitespace-nowrap cursor-pointer hover:bg-[#1a4fd8] transition-colors disabled:opacity-60 text-base shadow-lg shadow-[#1E5EFF]/35 ring-2 ring-[#1E5EFF]/20"
              >
                {loading ? '전송 중...' : '무료 상담 받기'}
              </button>
            </form>
          )}
        </div>
      </section>

      {privacyModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/40 cursor-default"
            onClick={() => setPrivacyModalOpen(false)}
            aria-label="닫기"
          />
          <div className="relative bg-white rounded-2xl border border-[#E2E8F0] w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col shadow-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0] shrink-0">
              <h2 id="privacy-modal-title" className="font-bold text-[#0F172A] text-base">
                개인정보 처리방침
              </h2>
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-[#94A3B8] hover:text-[#0F172A]"
                aria-label="모달 닫기"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="overflow-y-auto px-5 py-4 flex-1">
              <PrivacyPolicyContent />
            </div>
            <div className="border-t border-[#E2E8F0] px-5 py-4 bg-[#F8FAFC] shrink-0">
              <div className="flex items-start gap-3">
                <input
                  id="contact-privacy-modal"
                  type="checkbox"
                  checked={privacyAgreed}
                  onChange={(e) => setPrivacyAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-[#CBD5E1] text-[#1E5EFF] focus:ring-[#1E5EFF]/20"
                />
                <label htmlFor="contact-privacy-modal" className="text-sm text-[#334155] leading-relaxed cursor-pointer">
                  개인정보 처리방침에 동의합니다 <span className="text-red-400">*</span>
                </label>
              </div>
              <button
                type="button"
                onClick={() => setPrivacyModalOpen(false)}
                className="mt-4 w-full py-3 rounded-xl bg-[#0F172A] text-white text-sm font-semibold hover:bg-[#1e293b] transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
