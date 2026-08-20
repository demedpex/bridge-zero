/**
 * 선택지 코드값.
 *
 * TODO(policy): 지금은 프론트 상수로 둔다. 정책 데이터가 붙으면 서버에서 받아오도록 옮긴다.
 *   그래서 이 파일 밖에서는 문자열 리터럴을 직접 쓰지 않는다.
 */

export interface Option<T extends string> {
  value: T
  label: string
  /** 스스로 판별할 수 있게 붙이는 한 줄 설명. */
  description?: string
}

export type ExitStatus = 'ENDED' | 'SCHEDULED'

export const EXIT_STATUS_OPTIONS: Option<ExitStatus>[] = [
  { value: 'ENDED', label: '이미 끝났어요' },
  { value: 'SCHEDULED', label: '아직인데 곧 끝나요' },
]

export const CARE_EXIT_TYPE_OPTIONS: Option<'MATURITY' | 'EXTENDED' | 'EARLY'>[] = [
  {
    value: 'MATURITY',
    label: '만 18세가 되어 끝났어요',
    description: '만 18세 생일이 지나면서 보호가 끝난 경우예요',
  },
  {
    value: 'EXTENDED',
    label: '연장해서 지내다가 끝났어요',
    description: '만 18세 이후에도 더 지내다가 끝난 경우예요',
  },
  {
    value: 'EARLY',
    label: '만 18세 전에 일찍 끝났어요',
    description: '만 18세가 되기 전에 보호가 끝난 경우예요',
  },
]

export const INCOME_TYPE_OPTIONS: Option<'WAGE' | 'DAILY' | 'FREELANCE' | 'NONE'>[] = [
  { value: 'WAGE', label: '회사에서 월급을 받아요' },
  { value: 'DAILY', label: '일한 날만큼 받아요' },
  { value: 'FREELANCE', label: '프리랜서로 일해요' },
  { value: 'NONE', label: '지금은 수입이 없어요' },
]

export const EDUCATION_STATUS_OPTIONS: Option<string>[] = [
  { value: 'HIGH_SCHOOL_ENROLLED', label: '고등학교에 다녀요' },
  { value: 'HIGH_SCHOOL_EXPECTED', label: '곧 고등학교를 졸업해요' },
  { value: 'HIGH_SCHOOL_GRADUATED', label: '고등학교를 졸업했어요' },
  { value: 'UNIVERSITY_ENROLLED', label: '대학교에 다녀요' },
  { value: 'UNIVERSITY_EXPECTED', label: '곧 대학교를 졸업해요' },
  { value: 'UNIVERSITY_GRADUATED', label: '대학교를 졸업했어요' },
  { value: 'NOT_APPLICABLE', label: '해당하는 것이 없어요' },
]

export const EMPLOYMENT_STATUS_OPTIONS: Option<string>[] = [
  { value: 'EMPLOYED', label: '회사에 다녀요' },
  { value: 'SELF_EMPLOYED', label: '가게나 사업을 해요' },
  { value: 'UNEMPLOYED', label: '지금은 일을 쉬어요' },
  { value: 'FREELANCER', label: '프리랜서로 일해요' },
  { value: 'DAILY_WORKER', label: '일용직으로 일해요' },
  { value: 'FOUNDER', label: '창업을 했어요' },
  { value: 'SHORT_TERM', label: '단기로 일해요' },
  { value: 'NOT_APPLICABLE', label: '해당하는 것이 없어요' },
]

export const SUSPENDED_OPTIONS: Option<'NO' | 'YES'>[] = [
  { value: 'NO', label: '쭉 받았어요' },
  { value: 'YES', label: '멈춘 적 있어요' },
]
