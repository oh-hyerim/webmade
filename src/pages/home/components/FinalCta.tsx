import { useState, useEffect, useRef, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';

export default function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);

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
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const textarea = form.querySelector('textarea');
    if (textarea && textarea.value.length > 500) return;
    setLoading(true);

    const fd = new FormData(form);
    const name = fd.get('name') as string;
    const phone = fd.get('phone') as string;
    const email = fd.get('email') as string;
    const message = fd.get('message') as string;
    const type = fd.get('type') as string;

    try {
      // Save to Supabase
      await supabase.from('contacts').insert({
        name,
        phone: phone || null,
        email: email || null,
        message: message || null,
        type: type || '기타',
        status: 'unread',
      });

      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* CTA Section */}
      <section ref={ref} id="contact" className="bg-[#0a0a0a] overflow-hidden pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">

          {submitted ? (
            /* Success state */
            <div className="reveal-item opacity-0 translate-y-6 transition-all duration-700 flex flex-col items-center text-center py-20">
              <div className="w-10 h-10 border border-white/20 flex items-center justify-center mb-10">
                <i className="ri-check-line text-white text-lg" />
              </div>
              <h3 className="font-serif text-white text-2xl mb-4">문의가 접수되었습니다</h3>
              <p className="text-white/35 text-sm font-light leading-relaxed mb-10">
                24시간 이내로 답변드립니다.<br />더 빠른 상담은 카카오톡을 이용해 주세요.
              </p>
              <a
                href="https://open.kakao.com/o/webmade"
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

              {/* Left — Declaration */}
              <div className="reveal-item opacity-0 translate-y-8 transition-all duration-700 lg:col-span-5 bg-[#0a0a0a] px-8 md:px-16 py-12 md:py-16 lg:border-r lg:border-white/[0.07]">

                <div className="flex items-center gap-3 mb-12">
                  <span className="w-8 h-px bg-white/20" />
                  <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase font-light">상담 문의</span>
                </div>

                {/* Big headline */}
                <h2 className="font-serif text-[clamp(1.8rem,3.5vw,3rem)] text-white leading-[1.2] tracking-tight mb-6">
                  어떤 홈페이지가 맞을지<br />
                  <span className="italic text-white/40">같이 정리해드립니다</span>
                </h2>

                {/* 명분 강화 — 상담하면 뭘 얻는지 */}
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

                {/* Contact options — text-only, no boxes */}
                <div className="space-y-6 mb-14">
                  <a
                    href="tel:010-5130-1576"
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <span className="text-white/20 text-[9px] tracking-widest uppercase font-light w-16 flex-shrink-0">Phone</span>
                    <span className="text-white/60 text-sm font-light group-hover:text-white transition-colors">010-5130-1576</span>
                  </a>
                  <a
                    href="https://open.kakao.com/o/webmade"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <span className="text-white/20 text-[9px] tracking-widest uppercase font-light w-16 flex-shrink-0">Kakao</span>
                    <span className="text-white/60 text-sm font-light group-hover:text-white transition-colors">빠른 상담 채널</span>
                  </a>
                  <div className="flex items-center gap-4">
                    <span className="text-white/20 text-[9px] tracking-widest uppercase font-light w-16 flex-shrink-0">Hours</span>
                    <span className="text-white/40 text-sm font-light">매일 15:00 – 18:00</span>
                  </div>
                </div>

                {/* Minimal trust notes */}
                <div className="space-y-2 pt-0">
                  {['상담은 무료입니다', '비대면으로 전국 진행 가능합니다', '연락 후 24시간 이내 답변드립니다'].map((note) => (
                    <p key={note} className="text-white/22 text-xs font-light">{note}</p>
                  ))}
                </div>
              </div>

              {/* Right — Minimal form */}
              <div className="reveal-item opacity-0 translate-y-8 transition-all duration-700 lg:col-span-7 bg-[#f5f4f0] px-8 md:px-16 py-12 md:py-16" style={{ transitionDelay: '100ms' }}>

                <form
                  id="inquiry-form"
                  onSubmit={handleSubmit}
                  className="space-y-10"
                >
                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label className="text-[#0a0a0a]/40 text-[9px] tracking-[0.25em] uppercase block mb-4 font-light">이름 *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="홍길동"
                        className="w-full px-0 py-3 bg-transparent border-b border-[#0a0a0a]/15 text-[#0a0a0a] text-sm placeholder-[#0a0a0a]/25 focus:outline-none focus:border-[#0a0a0a]/40 transition-colors font-light"
                      />
                    </div>
                    <div>
                      <label className="text-[#0a0a0a]/40 text-[9px] tracking-[0.25em] uppercase block mb-4 font-light">연락처 *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="010-0000-0000"
                        className="w-full px-0 py-3 bg-transparent border-b border-[#0a0a0a]/15 text-[#0a0a0a] text-sm placeholder-[#0a0a0a]/25 focus:outline-none focus:border-[#0a0a0a]/40 transition-colors font-light"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-[#0a0a0a]/40 text-[9px] tracking-[0.25em] uppercase block mb-4 font-light">이메일</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="example@email.com"
                      className="w-full px-0 py-3 bg-transparent border-b border-[#0a0a0a]/15 text-[#0a0a0a] text-sm placeholder-[#0a0a0a]/25 focus:outline-none focus:border-[#0a0a0a]/40 transition-colors font-light"
                    />
                  </div>

                  {/* Message — minimal textarea */}
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

                  {/* Submit */}
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
                      href="https://open.kakao.com/o/webmade"
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
                </form>
              </div>

            </div>
          )}

        </div>
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
              <a href="#services" className="text-white/20 text-xs font-light hover:text-white/45 transition-colors cursor-pointer whitespace-nowrap">목적별 제작</a>
              <a href="#portfolio" className="text-white/20 text-xs font-light hover:text-white/45 transition-colors cursor-pointer whitespace-nowrap">샘플 시안</a>
              <a href="#process" className="text-white/20 text-xs font-light hover:text-white/45 transition-colors cursor-pointer whitespace-nowrap">진행 순서</a>
              <a href="#contact" className="text-white/20 text-xs font-light hover:text-white/45 transition-colors cursor-pointer whitespace-nowrap">문의하기</a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/[0.05]">
            <p className="text-white/12 text-xs font-light">© 2024 웹메이드. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
