export default function FloatingKakao() {
  return (
    <a
      href="https://pf.kakao.com/_xcBxnxlX/friend"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#FEE500] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
      style={{ boxShadow: '0 4px 16px rgba(254,229,0,0.5)' }}
      aria-label="카카오톡 상담"
    >
      <i className="ri-kakao-talk-fill text-[#3C1E1E] text-2xl"></i>
    </a>
  );
}
