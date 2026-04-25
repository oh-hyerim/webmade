import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    } else {
      navigate('/admin');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="font-serif text-2xl text-[#0a0a0a] mb-1">웹메이드</p>
          <p className="text-xs text-[#0a0a0a]/40 tracking-widest uppercase">Admin</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 space-y-5">
          <div>
            <label className="block text-xs text-[#0a0a0a]/50 mb-2 tracking-wide">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
              className="w-full px-4 py-3 border border-[#0a0a0a]/10 rounded-md text-sm text-[#0a0a0a] placeholder-[#0a0a0a]/25 focus:outline-none focus:border-[#0a0a0a]/30 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-[#0a0a0a]/50 mb-2 tracking-wide">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-[#0a0a0a]/10 rounded-md text-sm text-[#0a0a0a] placeholder-[#0a0a0a]/25 focus:outline-none focus:border-[#0a0a0a]/30 transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0a0a0a] text-white text-sm font-medium rounded-md hover:bg-[#0a0a0a]/85 transition-colors cursor-pointer disabled:opacity-40 whitespace-nowrap"
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
}
