/**
 * 계산 요청 상태.
 *
 * R1: 응답과 오류는 화면에 띄우기 위해 메모리에만 둔다. 저장하지 않는다.
 */

import { create } from 'zustand'

import { requestClock } from '../api/client'
import type { BenefitClock, FieldError } from '../types/clock'
import { STEP, toUserProfile, useOnboarding } from './onboarding'

interface ResultState {
  submitting: boolean
  clock: BenefitClock | null
  errors: FieldError[]
  submit: () => Promise<void>
  clearErrors: () => void
  reset: () => void
}

export const useResult = create<ResultState>()((set) => ({
  submitting: false,
  clock: null,
  errors: [],

  submit: async () => {
    const { draft, goTo } = useOnboarding.getState()
    set({ submitting: true, errors: [] })

    const result = await requestClock(toUserProfile(draft))

    if (result.ok) {
      set({ submitting: false, clock: result.clock, errors: [] })
      goTo(STEP.RESULT)
      return
    }

    set({ submitting: false, errors: result.errors })
    // 틀린 값이 있는 단계로 되돌린다.
    const first = result.errors[0]
    if (first && first.step !== STEP.REVIEW) goTo(first.step)
  },

  clearErrors: () => set({ errors: [] }),

  reset: () => set({ submitting: false, clock: null, errors: [] }),
}))

/** 이 단계에서 보여줄 오류 문구. */
export function errorForField(errors: FieldError[], field: string): string | null {
  return errors.find((error) => error.field === field)?.message ?? null
}

/** 필드가 붙지 않은(모델 전체) 오류 중 이 단계 것. */
export function errorForStep(errors: FieldError[], step: number): string | null {
  return errors.find((error) => error.step === step)?.message ?? null
}
