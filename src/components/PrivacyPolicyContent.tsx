import { SITE_URL } from '@/config/seo';

/** 개인정보 처리방침 본문 — 문의 페이지 모달·/privacy 공통 사용 */
export default function PrivacyPolicyContent() {
  return (
    <div className="text-[#64748B] text-sm leading-relaxed space-y-4">
      <p>
        웹메이드(이하 &ldquo;회사&rdquo;)는 문의 및 상담 과정에서 수집되는 개인정보를 중요하게 여기며,
        관련 법령에 따라 안전하게 처리합니다.
      </p>
      <p>
        문의 양식을 통해 수집되는 항목(이름, 연락처, 이메일, 문의 내용 등)은 상담 및 회신 목적으로만 이용되며,
        목적 달성 후 지체 없이 파기합니다. 자세한 보관 기간·처리 위탁 여부는 상담 시 안내드립니다.
      </p>
      <p>
        이용자는 개인정보 수집·이용에 동의를 거부할 수 있으며, 동의하지 않을 경우 문의 접수가 제한될 수 있습니다.
      </p>
      <p className="text-xs text-[#94A3B8]">
        문의: {SITE_URL}/contact
      </p>
    </div>
  );
}
