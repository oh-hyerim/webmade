/**
 * PostgREST .or() 필터 문자열에 삽입할 검색어 정리.
 * 쉼표·괄호 등은 필터 구문을 깨뜨릴 수 있어 제거하고, 길이를 제한합니다.
 */
const MAX_LEN = 120;

export function sanitizeSearchInput(raw: string): string {
  let s = raw.trim().slice(0, MAX_LEN);
  s = s.replace(/[,%()]/g, ' ').replace(/\s+/g, ' ').trim();
  return s;
}
