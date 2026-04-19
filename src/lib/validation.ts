/** 문의/폼 공통 클라이언트 검증 (최종 검증은 Supabase RLS·제약에 의존) */

const NAME_MAX = 80;
const MSG_MAX = 1500;

export function validatePersonName(name: string): string | null {
  const t = name.trim();
  if (!t) return '이름을 입력해주세요.';
  if (t.length > NAME_MAX) return `이름은 ${NAME_MAX}자 이내로 입력해주세요.`;
  if (/[<>]/.test(t)) return '이름에 사용할 수 없는 문자가 포함되어 있습니다.';
  if (!/^[\s\p{L}\p{N}·\-_.'’]+$/u.test(t)) {
    return '이름은 문자·숫자·일부 기호만 사용할 수 있습니다.';
  }
  return null;
}

export function validatePhoneKr(phone: string): string | null {
  const digits = phone.replace(/\D/g, '');
  if (!phone.trim()) return '전화번호를 입력해주세요.';
  if (digits.length < 9 || digits.length > 15) return '올바른 전화번호를 입력해주세요.';
  return null;
}

export function validateMessage(message: string): string | null {
  if (!message.trim()) return '문의 내용을 입력해주세요.';
  if (message.length > MSG_MAX) return `내용은 ${MSG_MAX.toLocaleString()}자 이내로 입력해주세요.`;
  return null;
}
