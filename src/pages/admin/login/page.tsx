import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else {
        navigate('/admin');
      }
    } catch {
      setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-5">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 flex items-center justify-center bg-[#0F172A] rounded-xl mx-auto mb-4">
            <i className="ri-shield-keyhole-line text-white text-xl"></i>
          </div>
          <h1 className="text-xl font-bold text-[#0F172A]">관리자 로그인</h1>
          <p className="text-[#94A3B8] text-sm mt-1">WebMade 관리자 전용</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-[#334155] mb-1.5 block">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
              className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder-[#CBD5E1] focus:outline-none focus:border-[#0F172A] bg-[#F8FAFC]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#334155] mb-1.5 block">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full border border-[#E2E8F0] rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder-[#CBD5E1] focus:outline-none focus:border-[#0F172A] bg-[#F8FAFC]"
            />
          </div>
          {error && (
            <p className="text-xs text-red-400 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0F172A] text-white font-semibold py-3 rounded-xl text-sm whitespace-nowrap cursor-pointer hover:bg-[#1e293b] transition-colors disabled:opacity-60 mt-2"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
}
