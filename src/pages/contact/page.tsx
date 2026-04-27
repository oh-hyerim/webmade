import { useState, useEffect, useRef, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import Navbar from '@/pages/home/components/Navbar';
import SeoHead from '@/components/feature/SeoHead';

const CONTACT_SUBMIT_COOLDOWN_MS = 30_000;
const CONTACT_LAST_SUBMIT_KEY = 'webmade:last-contact-submit';

export default function ContactPage() {
  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const el = heroRef.current;
    if (!el) return;
    const timer = setTimeout(() => el.classList.add('opacity-100'), 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-item').forEach((el, i) => {
              setTimeout(() => (el as HTMLElement).classList.add('opacity-100', 'translate-y-0'), i * 120);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (formRef.current) observer.observe(formRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    const form = e.currentTarget;
    const textarea = form.querySelector('textarea');
    const fd = new FormData(form);
    if (textarea && textarea.value.length > 500) {
      setError('문의 내용은 500자 이내로 작성해주세요.');
      return;
    }
    if (String(fd.get('website') || '').trim()) return;
    const lastSubmit = Number(window.localStorage.getItem(CONTACT_LAST_SUBMIT_KEY) || 0);
    if (Date.now() - lastSubmit < CONTACT_SUBMIT_COOLDOWN_MS) {
      setError('잠시 후 다시 제출해주세요.');
      return;
    }
    setLoading(true);
    setError('');

    const name = fd.get('name') as string;
    const phone = fd.get('phone') as string;
    const email = fd.get('email') as string;
    const message = fd.get('message') as string;
    const type = fd.get('type') as string;

    try {
      const { error } = await supabase.from('contacts').insert({
        name,
        phone: phone || null,
        email: email || null,
        message: message || null,
        type: type || '기타',
        status: 'unread',
      });
      if (error) throw error;
      window.localStorage.setItem(CONTACT_LAST_SUBMIT_KEY, String(Date.now()));
      setSubmitted(true);
    } catch {
      setError('문의 접수 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Noto Sans KR', 'Montserrat', sans-serif" }}>
      <SeoHead
        title="홈페이지 제작 문의 | 웹메이드"
        description="웹메이드 홈페이지 제작 상담을 요청하세요. 업종과 목적에 맞는 구성, 예상 비용, 진행 방식을 안내합니다."
        path="/contact"
      />
      <Navbar />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[50vh] bg-[#0a0a0a] flex flex-col justify-end opacity-0 transition-opacity duration-1000 overflow-hidden pt-[68px]"
      >
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=ultra minimal dark abstract background with subtle texture, monochrome deep black tones, soft directional light from one side, premium editorial atmosphere, no objects, pure abstract dark surface, sophisticated and quiet, very dark&width=1440&height=700&seq=contact-hero-bg&orientation=landscape"
            alt=""
            className="w-full h-full object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 pb-16 md:pb-24 pt-20 md:pt-28 w-full">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-white/25" />
            <span className="text-[10px] tracking-[0.35em] text-white/35 uppercase font-light">상담 문의</span>
          </div>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,4.8rem)] text-white leading-[1.1] tracking-tight mb-6">
            어떤 홈페이지가 맞을지<br />
            <em className="not-italic text-white/40">같이 정리해드립니다</em>
          </h1>
          <p className="text-white/45 text-sm md:text-base font-light leading-[1.9] max-w-lg">
            자료가 없어도, 아직 방향이 정해지지 않아도 괜찮습니다.<br />
            상담 후에는 어떤 구성이 맞는지, 대략적인 비용이 어느 정도인지 안내드립니다.
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section ref={formRef} className="bg-[#f5f4f0]">
        {submitted ? (
          /* Success state */
          <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 flex flex-col items-center text-center py-24 md:py-32">
            <div className="w-10 h-10 border border-[#0a0a0a]/20 flex items-center justify-center mb-10">
              <i className="ri-check-line text-[#0a0a0a] text-lg" />
            </div>
            <h2 className="font-serif text-[#0a0a0a] text-2xl mb-4">문의가 접수되었습니다</h2>
            <p className="text-[#0a0a0a]/45 text-sm font-light leading-relaxed mb-10 max-w-sm">
              24시간 이내로 답변드립니다.<br />더 빠른 상담은 카카오톡을 이용해 주세요.
            </p>
            <a
              href="http://pf.kakao.com/_xcBxnxlX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#FEE500] text-[#111] font-medium text-xs tracking-wide cursor-pointer whitespace-nowrap"
            >
              <i className="ri-kakao-talk-fill" />
              카카오톡으로 이어서 상담
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            {/* Left — Contact info */}
            <div className="reveal-item opacity-0 translate-y-8 transition-all duration-700 lg:col-span-5 bg-[#0a0a0a] px-8 md:px-16 py-12 md:py-16 lg:border-r lg:border-white/[0.07]">
              <div className="flex items-center gap-3 mb-12">
                <span className="w-8 h-px bg-white/20" />
                <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase font-light">연락처</span>
              </div>

              <h2 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-white leading-[1.2] tracking-tight mb-6">
                지금 바로,<br />
                무료로 상담 받아보세요
              </h2>

              <div className="mb-10 pb-10 border-b border-white/[0.07]">
                <p className="text-white/55 text-sm font-light leading-[1.9] max-w-sm">
                  상담 후에는 어떤 구성이 맞는지,<br />
                  대략적인 범위와 비용이 어느 정도인지<br />
                  정리된 방향을 안내드립니다.
                </p>
                <p className="text-white/28 text-xs font-light mt-3">
                  자료가 없어도, 아직 방향이 정해지지 않아도 괜찮습니다.
                </p>
              </div>

              <div className="space-y-6 mb-14">
                <a href="tel:010-5130-1576" className="flex items-center gap-4 group cursor-pointer">
                  <span className="text-white/20 text-[9px] tracking-widest uppercase font-light w-16 flex-shrink-0">Phone</span>
                  <span className="text-white/60 text-sm font-light group-hover:text-white transition-colors">010-5130-1576</span>
                </a>
                <a href="http://pf.kakao.com/_xcBxnxlX" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group cursor-pointer">
                  <span className="text-white/20 text-[9px] tracking-widest uppercase font-light w-16 flex-shrink-0">Kakao</span>
                  <span className="text-white/60 text-sm font-light group-hover:text-white transition-colors">빠른 상담 채널</span>
                </a>
                <div className="flex items-center gap-4">
                  <span className="text-white/20 text-[9px] tracking-widest uppercase font-light w-16 flex-shrink-0">Hours</span>
                  <span className="text-white/40 text-sm font-light">매일 15:00 – 18:00</span>
                </div>
              </div>

              <div className="space-y-2 pt-0">
                {['상담은 무료입니다', '비대면으로 전국 진행 가능합니다', '연락 후 24시간 이내 답변드립니다'].map((note) => (
                  <p key={note} className="text-white/22 text-xs font-light">{note}</p>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div className="reveal-item opacity-0 translate-y-8 transition-all duration-700 lg:col-span-7 bg-[#f5f4f0] px-8 md:px-16 py-12 md:py-16" style={{ transitionDelay: '100ms' }}>
              <form
                id="contact-form"
                onSubmit={handleSubmit}
                className="space-y-10"
              >
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[#0a0a0a]/40 text-[9px] tracking-[0.25em] uppercase block mb-4 font-light">이름 *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      maxLength={40}
                      placeholder="홍길동"
                      className="w-full px-0 py-3 bg-transparent border-b border-[#0a0a0a]/15 text-[#0a0a0a] text-sm placeholder-[#0a00a]/25 focus:outline-none focus:border-[#0a0a0a]/40 transition-colors font-light"
                    />
                  </div>
                  <div>
                    <label className="text-[#0a0a0a]/40 text-[9px] tracking-[0.25em] uppercase block mb-4 font-light">연락처 *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      maxLength={30}
                      placeholder="010-0000-0000"
                      className="w-full px-0 py-3 bg-transparent border-b border-[#0a0a0a]/15 text-[#0a0a0a] text-sm placeholder-[#0a0a0a]/25 focus:outline-none focus:border-[#0a0a0a]/40 transition-colors font-light"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#0a0a0a]/40 text-[9px] tracking-[0.25em] uppercase block mb-4 font-light">이메일</label>
                  <input
                    type="email"
                    name="email"
                    maxLength={120}
                    placeholder="example@email.com"
                    className="w-full px-0 py-3 bg-transparent border-b border-[#0a0a0a]/15 text-[#0a0a0a] text-sm placeholder-[#0a0a0a]/25 focus:outline-none focus:border-[#0a0a0a]/40 transition-colors font-light"
                  />
                </div>

                <div>
                  <label className="text-[#0a0a0a]/40 text-[9px] tracking-[0.25em] uppercase block mb-4 font-light">문의 유형</label>
                  <select
                    name="type"
                    className="w-full px-0 py-3 bg-transparent border-b border-[#0a0a0a]/15 text-[#0a0a0a] text-sm focus:outline-none focus:border-[#0a0a0a]/40 transition-colors font-light cursor-pointer"
                  >
                    <option value="">선택해주세요</option>
                    <option value="문의 전환형">문의 전환형 홈페이지</option>
                    <option value="회사소개형">회사소개형 홈페이지</option>
                    <option value="모바일 중심형">모바일 중심형 예약 랜딩</option>
                    <option value="소개형 랜딩">소개형 랜딩페이지</option>
                    <option value="기타">아직 정하지 않음 / 기타</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#0a0a0a]/40 text-[9px] tracking-[0.25em] uppercase block mb-4 font-light">
                    간단한 문의 <span className="text-[#0a0a0a]/25 normal-case">({charCount}/500)</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    maxLength={500}
                    placeholder="업종, 원하는 방향, 예산 등을 자유롭게 적어주세요. 아직 정리되지 않아도 괜찮습니다."
                    onChange={(e) => setCharCount(e.target.value.length)}
                    className="w-full px-0 py-3 bg-transparent border-b border-[#0a0a0a]/15 text-[#0a0a0a] text-sm placeholder-[#0a0a0a]/25 focus:outline-none focus:border-[#0a0a0a]/40 transition-colors resize-none font-light leading-relaxed"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-xs leading-relaxed">{error}</p>
                )}

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-4 bg-[#0a0a0a] text-white font-medium text-sm tracking-wide hover:bg-[#0a0a0a]/85 transition-colors cursor-pointer flex items-center justify-center gap-3 disabled:opacity-40 whitespace-nowrap"
                  >
                    {loading ? (
                      <>
                        <i className="ri-loader-4-line animate-spin" />
                        전송 중...
                      </>
                    ) : (
                      <>
                        제작 문의하기
                        <i className="ri-arrow-right-line" />
                      </>
                    )}
                  </button>
                  <a
                    href="http://pf.kakao.com/_xcBxnxlX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 py-4 px-7 border border-[#0a0a0a]/20 text-[#0a0a0a]/55 text-sm font-light hover:border-[#0a0a0a]/40 hover:text-[#0a0a0a]/80 transition-colors cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <i className="ri-kakao-talk-fill text-[#3A1D1D]" />
                    카카오 상담
                  </a>
                </div>

                <p className="text-[#0a0a0a]/25 text-[10px] tracking-wide">
                  제출 후 24시간 이내 연락 · 스팸 없음
                </p>
                <p className="text-[#0a0a0a]/25 text-[10px] tracking-wide">
                  <Link to="/privacy" className="underline underline-offset-2 hover:text-[#0a0a0a]/50">개인정보처리방침</Link>
                </p>
              </form>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-white/[0.05] py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-white/50 font-serif text-base mb-1">웹메이드</p>
              <p className="text-white/20 text-xs font-light">구조부터 다르게 만드는 홈페이지 제작</p>
            </div>
            <div className="flex flex-wrap gap-6 md:gap-10">
              <Link to="/services" className="text-white/20 text-xs font-light hover:text-white/45 transition-colors cursor-pointer whitespace-nowrap">목적별 제작</Link>
              <Link to="/work" className="text-white/20 text-xs font-light hover:text-white/45 transition-colors cursor-pointer whitespace-nowrap">샘플 시안</Link>
              <Link to="/process" className="text-white/20 text-xs font-light hover:text-white/45 transition-colors cursor-pointer whitespace-nowrap">진행 순서</Link>
              <Link to="/pricing" className="text-white/20 text-xs font-light hover:text-white/45 transition-colors cursor-pointer whitespace-nowrap">가격 안내</Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/[0.05]">
            <p className="text-white/12 text-xs font-light">© 2024 웹메이드. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex">
        <a href="/contact" className="flex-1 flex items-center justify-center gap-2 py-5 bg-[#0a0a0a] text-white font-medium text-sm cursor-pointer border-r border-white/10 whitespace-nowrap">
          <i className="ri-question-answer-line text-base" />문의하기
        </a>
        <a href="http://pf.kakao.com/_xcBxnxlX" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-5 bg-[#FEE500] text-[#111] font-medium text-sm cursor-pointer whitespace-nowrap">
          <i className="ri-kakao-talk-fill text-base" />카카오 상담
        </a>
      </div>
      <div className="md:hidden h-16" />
    </div>
  );
}
