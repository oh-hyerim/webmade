const REVIEWS = [
  { name: '김민준', role: '요식업 운영', text: '처음 제작이라 막막했는데 상담에서 방향을 잘 잡아주셔서 수월했습니다. 어떤 내용을 넣어야 할지 하나씩 정리해주셔서 편했어요.', rating: 5 },
  { name: '이서연', role: '피부관리샵 원장', text: '너무 감성적인 느낌이 아니라 깔끔하고 전문적으로 잘 정리돼 만족했습니다. 원하는 방향을 빠르게 이해해주셔서 진행이 수월했어요.', rating: 5 },
  { name: '박지훈', role: '컨설팅 대표', text: '가격만 이야기하는 게 아니라 실제로 필요한 구성을 먼저 설명해주셔서 신뢰가 갔습니다. 불필요한 제안 없이 현실적으로 안내해주셨어요.', rating: 5 },
  { name: '최수아', role: '인테리어 업체 운영', text: '응답이 빠르고 소통이 편해서 진행이 훨씬 편했습니다. 수정 요청도 빠르게 반영해주셔서 결과물이 기대 이상이었어요.', rating: 5 },
  { name: '정도현', role: '학원 원장', text: '홈페이지 오픈 후 문의가 눈에 띄게 늘었습니다. 상담 버튼 위치와 구조를 전략적으로 잡아주신 덕분인 것 같아요.', rating: 5 },
  { name: '한예진', role: '프리랜서 강사', text: '처음 제작이라 걱정이 많았는데 단계별로 친절하게 안내해주셔서 편하게 진행할 수 있었습니다. 결과물도 매우 만족스럽습니다.', rating: 5 },
];

export default function TestimonialSection() {
  return (
    <section className="bg-[#F8FAFC] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <span className="text-[#1E5EFF] text-xs font-semibold tracking-widest uppercase mb-3 block">Reviews</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight mb-4">
            이런 점에서 만족하셨습니다
          </h2>
          <p className="text-[#64748B] text-base md:text-lg">상담부터 오픈까지, 함께한 사장님들의 이야기입니다.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-white rounded-2xl p-7 flex flex-col gap-4">
              <div className="flex gap-1">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <i key={i} className="ri-star-fill text-[#F59E0B] text-sm"></i>
                ))}
              </div>
              <p className="text-[#0F172A] text-sm leading-relaxed flex-1">{r.text}</p>
              <div className="flex items-center gap-3 pt-2 border-t border-[#F1F5F9]">
                <div className="w-9 h-9 flex items-center justify-center bg-[#1E5EFF]/10 rounded-full shrink-0">
                  <i className="ri-user-line text-[#1E5EFF] text-sm"></i>
                </div>
                <div>
                  <p className="text-[#0F172A] font-semibold text-sm">{r.name}</p>
                  <p className="text-[#94A3B8] text-xs">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
