/**
 * UserProfile — 엔진 담당자와 합의된 입력 계약.
 * 백엔드 `app/schemas/profile.py` 와 같은 필드명·같은 옵셔널 여부를 지킨다.
 * ※ 필드명을 바꾸지 마라.
 */

export type CareExitType = 'MATURITY' | 'EXTENDED' | 'EARLY' | 'SCHEDULED'
export type IncomeType = 'WAGE' | 'DAILY' | 'FREELANCE' | 'NONE'

export interface Scenario {
  income_delta: number
  income_gap_months: number
}

export interface UserProfile {
  // 보호종료
  care_exit_type: CareExitType
  care_exit_ym: string | null
  expected_exit_ym: string | null

  // 자립수당
  allowance_applied_ym: string | null
  allowance_received_count: number | null
  allowance_suspended_months: number

  // 목돈
  settlement_balance: number | null

  // 거주
  region_code: string | null
  residence_since_ym: string | null

  // 소득
  monthly_income: number
  income_type: IncomeType
  fixed_expense: number

  // 자격 판정용
  education_status: string | null
  employment_status: string | null
  held_programs: number[]

  // 시나리오 (이번 화면에서는 받지 않고 기본값 0)
  scenario: Scenario
}
