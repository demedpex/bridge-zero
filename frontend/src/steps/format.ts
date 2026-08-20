/** 확인 화면에 값을 보여주기 위한 표시용 변환. 값을 바꾸지 않는다. */

import {
  CARE_EXIT_TYPE_OPTIONS,
  EDUCATION_STATUS_OPTIONS,
  EMPLOYMENT_STATUS_OPTIONS,
  INCOME_TYPE_OPTIONS,
  type Option,
} from '../constants/options'
import { REGIONS } from '../constants/regions'
import { STEP, type ProfileDraft } from '../store/onboarding'

const NOT_ENTERED = '건너뛰었어요'

function labelOf(options: Option<string>[], value: string | null): string {
  if (value === null) return NOT_ENTERED
  return options.find((option) => option.value === value)?.label ?? value
}

function ym(value: string | null): string {
  if (value === null) return NOT_ENTERED
  const [year, month] = value.split('-')
  return `${year}년 ${Number(month)}월`
}

function won(value: number | null): string {
  if (value === null) return NOT_ENTERED
  return `${value.toLocaleString('ko-KR')}원`
}

export interface ReviewItem {
  label: string
  value: string
  step: number
}

export function reviewItems(draft: ProfileDraft): ReviewItem[] {
  const items: ReviewItem[] = []

  if (draft.exit_status === 'SCHEDULED') {
    items.push({ label: '보호종료', value: '아직인데 곧 끝나요', step: STEP.EXIT_STATUS })
    items.push({ label: '끝나는 때', value: ym(draft.expected_exit_ym), step: STEP.EXIT_STATUS })
  } else {
    items.push({
      label: '보호종료',
      value: labelOf(CARE_EXIT_TYPE_OPTIONS, draft.care_exit_type),
      step: STEP.EXIT_TYPE,
    })
    items.push({ label: '끝난 때', value: ym(draft.care_exit_ym), step: STEP.EXIT_TYPE })
  }

  items.push({
    label: '자립수당 받은 횟수',
    value:
      draft.allowance_received_count === null
        ? NOT_ENTERED
        : `${draft.allowance_received_count}번`,
    step: STEP.ALLOWANCE_COUNT,
  })
  items.push({
    label: '자립수당 신청한 때',
    value: ym(draft.allowance_applied_ym),
    step: STEP.ALLOWANCE_APPLIED,
  })
  items.push({
    label: '지급이 멈춘 기간',
    value:
      draft.allowance_suspended_months === 0
        ? '쭉 받았어요'
        : `${draft.allowance_suspended_months}개월`,
    step: STEP.ALLOWANCE_SUSPENDED,
  })
  items.push({
    label: '자립정착금 잔액',
    value: won(draft.settlement_balance),
    step: STEP.SETTLEMENT,
  })
  items.push({
    label: '사는 곳',
    value: REGIONS.find((region) => region.code === draft.region_code)?.label ?? NOT_ENTERED,
    step: STEP.REGION,
  })
  items.push({
    label: '지금 살기 시작한 때',
    value: ym(draft.residence_since_ym),
    step: STEP.RESIDENCE_SINCE,
  })
  items.push({
    label: '수입 형태',
    value: labelOf(INCOME_TYPE_OPTIONS as Option<string>[], draft.income_type),
    step: STEP.INCOME,
  })
  items.push({ label: '한 달 수입', value: won(draft.monthly_income), step: STEP.INCOME })
  items.push({ label: '매달 나가는 돈', value: won(draft.fixed_expense), step: STEP.FIXED_EXPENSE })
  items.push({
    label: '학력',
    value: labelOf(EDUCATION_STATUS_OPTIONS, draft.education_status),
    step: STEP.STATUS,
  })
  items.push({
    label: '일하는 상태',
    value: labelOf(EMPLOYMENT_STATUS_OPTIONS, draft.employment_status),
    step: STEP.STATUS,
  })

  return items
}
