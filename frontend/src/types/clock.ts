/**
 * BenefitClock — 엔진이 돌려주는 결과 계약.
 *
 * TODO(contracts): 정식 필드 구성이 미확정이다. 백엔드 `app/schemas/clock.py` 와 함께 교체한다.
 */
export interface BenefitClock {
  remaining_count: number
  engine: string
}

/** 백엔드가 422 로 돌려주는 화면용 오류. `step` 으로 해당 단계에 되돌린다. */
export interface FieldError {
  field: string | null
  message: string
  step: number
}
