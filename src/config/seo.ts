export type PageSeo = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  noindex?: boolean;
};

const rawSiteUrl = import.meta.env.VITE_PUBLIC_SITE_URL || "https://webmadeworks.com";

export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");
export const DEFAULT_OG_IMAGE = "/images/og_img.jpg";

export const SEO_PAGES: Record<string, PageSeo> = {
  "/": {
    title: "홈페이지 제작 전문 웹메이드 | 사업자 맞춤 사이트 제작",
    description:
      "사업 운영자를 위한 홈페이지 제작 전문 서비스 웹메이드. 트렌디하고 전문적인 사이트 제작으로 상담 및 문의 유입을 높이세요.",
    ogTitle: "웹메이드 홈페이지 제작",
    ogDescription: "사업자를 위한 전문 홈페이지 제작 서비스",
  },
  "/about": {
    title: "웹메이드 소개 | 전문적인 홈페이지 제작 파트너",
    description:
      "웹메이드는 사업자를 위한 홈페이지 제작 전문 업체입니다. 트렌디한 디자인과 실용적인 구조로 문의 전환을 높입니다.",
    ogTitle: "웹메이드 소개",
    ogDescription: "전문 홈페이지 제작 파트너",
  },
  "/services": {
    title: "홈페이지 제작 서비스 | 사이트 제작 및 맞춤 구축",
    description:
      "홈페이지 제작, 사이트 제작, 맞춤형 웹사이트 구축까지 웹메이드에서 제공합니다. 사업에 최적화된 구조로 제작합니다.",
    ogTitle: "홈페이지 제작 서비스",
    ogDescription: "맞춤형 사이트 제작 서비스",
  },
  "/reviews": {
    title: "홈페이지 제작 후기 | 실제 고객 성공 사례",
    description:
      "웹메이드 홈페이지 제작 후기와 성공 사례를 확인하세요. 실제 사업자들의 만족도 높은 사이트 제작 결과를 제공합니다.",
    ogTitle: "제작 후기",
    ogDescription: "고객 성공 사례 확인",
  },
  "/contact": {
    title: "홈페이지 제작 문의 | 웹메이드 상담 신청",
    description:
      "홈페이지 제작 비용과 상담이 궁금하신가요? 웹메이드에서 빠르고 전문적인 상담을 받아보세요. 카카오톡 문의 가능.",
    ogTitle: "문의하기",
    ogDescription: "홈페이지 제작 상담 바로가기",
  },
  "/cases": {
    title: "홈페이지 제작 후기 | 실제 고객 성공 사례",
    description:
      "웹메이드 홈페이지 제작 후기와 성공 사례를 확인하세요. 실제 사업자들의 만족도 높은 사이트 제작 결과를 제공합니다.",
    ogTitle: "제작 후기",
    ogDescription: "고객 성공 사례 확인",
  },
  "/pricing": {
    title: "홈페이지 제작 서비스 | 사이트 제작 및 맞춤 구축",
    description:
      "홈페이지 제작, 사이트 제작, 맞춤형 웹사이트 구축까지 웹메이드에서 제공합니다. 사업에 최적화된 구조로 제작합니다.",
    ogTitle: "홈페이지 제작 서비스",
    ogDescription: "맞춤형 사이트 제작 서비스",
  },
  "/request": {
    title: "홈페이지 제작 요청서 | 맞춤 견적 신청 - 웹메이드",
    description:
      "웹메이드 홈페이지 제작 요청서를 작성하세요. 업종, 목적, 디자인 방향을 알려주시면 맞춤 견적과 상담을 도와드립니다.",
    ogTitle: "홈페이지 제작 요청서",
    ogDescription: "맞춤 견적 신청하기",
    noindex: true,
  },
  "/privacy": {
    title: "개인정보 처리방침 | 웹메이드",
    description: "웹메이드 개인정보 처리방침입니다.",
    ogTitle: "개인정보 처리방침",
    ogDescription: "웹메이드 개인정보 처리방침",
  },
  "/contract-only": {
    title: "접근 제한 | 웹메이드",
    description: "계약 고객 전용 페이지입니다.",
    ogTitle: "접근 제한",
    ogDescription: "계약 고객 전용",
    noindex: true,
  },
  "/admin": {
    title: "관리자 페이지 | 웹메이드",
    description: "웹메이드 관리자 페이지입니다.",
    ogTitle: "웹메이드 관리자",
    ogDescription: "웹메이드 관리자 페이지",
    noindex: true,
  },
  "/admin/login": {
    title: "관리자 로그인 | 웹메이드",
    description: "웹메이드 관리자 로그인 페이지입니다.",
    ogTitle: "관리자 로그인",
    ogDescription: "웹메이드 관리자 로그인",
    noindex: true,
  },
  "*": {
    title: "페이지를 찾을 수 없습니다 | 웹메이드",
    description: "요청하신 페이지를 찾을 수 없습니다.",
    ogTitle: "페이지를 찾을 수 없습니다",
    ogDescription: "요청하신 페이지를 찾을 수 없습니다.",
    noindex: true,
  },
};

