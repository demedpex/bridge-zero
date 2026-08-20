/**
 * 온보딩 입력 스토어.
 *
 * R1: 입력값은 브라우저에만 둔다. 저장은 sessionStorage 까지만 — 탭을 닫으면 사라진다.
 *     localStorage 를 쓰지 않는다.
 * R3: 여기서 회차·금액·날짜를 계산하지 않는다. 받은 값을 담아 두기만 한다.
 */

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { CareExitType, IncomeType, UserProfile } from '../types/profile'
import type { ExitStatus } from '../constants/options'

/** 아직 다 채워지지 않은 상태를 담는 초안. 건너뛴 값은 null 로 둔다. */
export interface ProfileDraft {
  exit_status: ExitStatus | null
  care_exit_type: CareExitType | null
  care_exit_ym: string | null
  expected_exit_ym: string | null

  allowance_applied_ym: string | null
  allowance_received_count: number | null
  allowance_suspended_months: number

  settlement_balance: number | null

  region_code: string | null
  residence_since_ym: string | null

  monthly_income: number
  income_type: IncomeType
  fixed_expense: number

  education_status: string | null
  employment_status: string | null
}

const EMPTY_DRAFT: ProfileDraft = {
  exit_status: null,
  care_exit_type: null,
  care_exit_ym: null,
  expected_exit_ym: null,
  allowance_applied_ym: null,
  allowance_received_count: null,
  allowance_suspended_months: 0,
  settlement_balance: null,
  region_code: null,
  residence_since_ym: null,
  monthly_income: 0,
  income_type: 'NONE',
  fixed_expense: 0,
  education_status: null,
  employment_status: null,
}

/** 단계 번호. 화면 설계의 번호를 그대로 쓴다. 13 은 응답을 확인하는 화면이다. */
export const STEP = {
  INTRO: 0,
  EXIT_STATUS: 1,
  EXIT_TYPE: 2,
  ALLOWANCE_COUNT: 3,
  ALLOWANCE_APPLIED: 4,
  ALLOWANCE_SUSPENDED: 5,
  SETTLEMENT: 6,
  REGION: 7,
  RESIDENCE_SINCE: 8,
  INCOME: 9,
  FIXED_EXPENSE: 10,
  STATUS: 11,
  REVIEW: 12,
  RESULT: 13,
} as const

const AFTER_EXIT_STEPS = [
  STEP.ALLOWANCE_COUNT,
  STEP.ALLOWANCE_APPLIED,
  STEP.ALLOWANCE_SUSPENDED,
  STEP.SETTLEMENT,
  STEP.REGION,
  STEP.RESIDENCE_SINCE,
  STEP.INCOME,
  STEP.FIXED_EXPENSE,
  STEP.STATUS,
  STEP.REVIEW,
]

/** 지금까지 고른 값에 따라 실제로 지나가는 단계 순서를 만든다. */
export function stepOrder(draft: ProfileDraft): number[] {
  const head =
    draft.exit_status === 'ENDED'
      ? [STEP.INTRO, STEP.EXIT_STATUS, STEP.EXIT_TYPE]
      : [STEP.INTRO, STEP.EXIT_STATUS]
  return [...head, ...AFTER_EXIT_STEPS]
}

interface OnboardingState {
  step: number
  draft: ProfileDraft
  set: <K extends keyof ProfileDraft>(key: K, value: ProfileDraft[K]) => void
  goNext: () => void
  goBack: () => void
  goTo: (step: number) => void
  reset: () => void
}

export const useOnboarding = create<OnboardingState>()(
  persist(
    (set, get) => ({
      step: STEP.INTRO,
      draft: EMPTY_DRAFT,

      set: (key, value) => set((state) => ({ draft: { ...state.draft, [key]: value } })),

      goNext: () => {
        const { step, draft } = get()
        const order = stepOrder(draft)
        const index = order.indexOf(step)
        if (index === -1) return
        if (index === order.length - 1) {
          set({ step: STEP.RESULT })
          return
        }
        set({ step: order[index + 1] })
      },

      goBack: () => {
        const { step, draft } = get()
        const order = stepOrder(draft)
        if (step === STEP.RESULT) {
          set({ step: STEP.REVIEW })
          return
        }
        const index = order.indexOf(step)
        if (index <= 0) return
        set({ step: order[index - 1] })
      },

      goTo: (step) => set({ step }),

      reset: () => set({ step: STEP.INTRO, draft: EMPTY_DRAFT }),
    }),
    {
      name: 'bridge-zero-onboarding',
      // 탭을 닫으면 사라진다. localStorage 를 쓰지 않는다. (R1)
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

/** 초안을 엔진에 넘길 형태로 맞춘다. 값을 바꾸거나 채워 넣지 않는다. */
export function toUserProfile(draft: ProfileDraft): UserProfile {
  const isScheduled = draft.exit_status === 'SCHEDULED'

  return {
    care_exit_type: isScheduled ? 'SCHEDULED' : (draft.care_exit_type ?? 'MATURITY'),
    care_exit_ym: isScheduled ? null : draft.care_exit_ym,
    expected_exit_ym: isScheduled ? draft.expected_exit_ym : null,

    allowance_applied_ym: draft.allowance_applied_ym,
    allowance_received_count: draft.allowance_received_count,
    allowance_suspended_months: draft.allowance_suspended_months,

    settlement_balance: draft.settlement_balance,

    region_code: draft.region_code,
    residence_since_ym: draft.residence_since_ym,

    monthly_income: draft.monthly_income,
    income_type: draft.income_type,
    fixed_expense: draft.fixed_expense,

    education_status: draft.education_status,
    employment_status: draft.employment_status,
    held_programs: [],

    // 이번 화면에서는 받지 않는다.
    scenario: { income_delta: 0, income_gap_months: 0 },
  }
}
