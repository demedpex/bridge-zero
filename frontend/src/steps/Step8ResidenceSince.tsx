import { BottomCTA, Button, StepScreen, Top, YearMonthField } from '../components/ui'
import { STEP, useOnboarding } from '../store/onboarding'
import { errorForField, useResult } from '../store/result'
import { useStepChrome } from './useStepChrome'

export function Step8ResidenceSince() {
  const draft = useOnboarding((state) => state.draft)
  const setValue = useOnboarding((state) => state.set)
  const goNext = useOnboarding((state) => state.goNext)
  const errors = useResult((state) => state.errors)
  const chrome = useStepChrome(STEP.RESIDENCE_SINCE)

  const error = errorForField(errors, 'residence_since_ym')

  const skip = () => {
    setValue('residence_since_ym', null)
    goNext()
  }

  return (
    <StepScreen
      {...chrome}
      footer={
        <BottomCTA>
          <Button onClick={goNext} disabled={draft.residence_since_ym === null}>
            다음
          </Button>
          <Button variant="text" onClick={skip}>
            잘 모르겠어요
          </Button>
        </BottomCTA>
      }
    >
      <Top title="지금 사는 곳에 언제부터 살았어요?" subtitle="대략만 골라도 괜찮아요." />

      <YearMonthField
        value={draft.residence_since_ym}
        onChange={(value) => setValue('residence_since_ym', value)}
        direction="past"
        error={error}
      />
    </StepScreen>
  )
}
