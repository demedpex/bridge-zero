/**
 * 시·도 17곳.
 *
 * region_code = 시도 코드 2자리 + "000"
 * ※ 시·군·구 목록 데이터가 아직 없어서 이번에는 시·도까지만 받는다.
 * TODO(policy): 코드 표는 정책 데이터 쪽에서 내려받는 것으로 옮긴다.
 *   (강원 51 · 전북 52 처럼 특별자치도 전환으로 바뀐 코드가 있어서 한곳에서 관리해야 한다.)
 */
export interface Region {
  code: string
  label: string
}

export const REGIONS: Region[] = [
  { code: '11000', label: '서울' },
  { code: '26000', label: '부산' },
  { code: '27000', label: '대구' },
  { code: '28000', label: '인천' },
  { code: '29000', label: '광주' },
  { code: '30000', label: '대전' },
  { code: '31000', label: '울산' },
  { code: '36000', label: '세종' },
  { code: '41000', label: '경기' },
  { code: '51000', label: '강원' },
  { code: '43000', label: '충북' },
  { code: '44000', label: '충남' },
  { code: '52000', label: '전북' },
  { code: '46000', label: '전남' },
  { code: '47000', label: '경북' },
  { code: '48000', label: '경남' },
  { code: '50000', label: '제주' },
]
