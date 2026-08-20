import { BottomCTA, Button, StepScreen, Top, YearMonthField } from '../components/ui'
import { STEP, useOnboarding } from '../store/onboarding'
import { errorForField, useResult } from '../store/result'
import { useStepChrome } from './useStepChrome'

export function Step4AllowanceApplied() {
  const draft = useOnboarding((state) => state.draft)
  const setValue = useOnboarding((state) => state.set)
  const goNext = useOnboarding((state) => state.goNext)
  const errors = useResult((state) => state.errors)
  const chrome = useStepChrome(STEP.ALLOWANCE_APPLIED)

  const error = errorForField(errors, 'allowance_applied_ym')

  const skip = () => {
    // 건너뛴 값은 null 로 보낸다. 임의의 기본값을 채우지 않는다.
    setValue('allowance_applied_ym', null)
    goNext()
  }

  return (
    <StepScreen
      {...chrome}
      footer={
        <BottomCTA>
          <Button onClick={goNext} disabled={draft.allowance_applied_ym === null}>
            다음
          </Button>
          <Button variant="text" onClick={skip}>
            기억이 안 나요
          </Button>
        </BottomCTA>
      }
    >
      <Top title="자립수당을 언제 신청했어요?" subtitle="기억나는 만큼만 골라도 괜찮아요." />

      <YearMonthField
        value={draft.allowance_applied_ym}
        onChange={(value) => setValue('allowance_applied_ym', value)}
        direction="past"
        error={error}
      />
    </StepScreen>
  )
}
