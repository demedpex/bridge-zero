import { BottomCTA, Button, NumberField, Paragraph, StepScreen, Top } from '../components/ui'
import { STEP, useOnboarding } from '../store/onboarding'
import { errorForField, useResult } from '../store/result'
import { useStepChrome } from './useStepChrome'

export function Step10FixedExpense() {
  const draft = useOnboarding((state) => state.draft)
  const setValue = useOnboarding((state) => state.set)
  const goNext = useOnboarding((state) => state.goNext)
  const errors = useResult((state) => state.errors)
  const chrome = useStepChrome(STEP.FIXED_EXPENSE)

  const error = errorForField(errors, 'fixed_expense')

  return (
    <StepScreen
      {...chrome}
      footer={
        <BottomCTA>
          <Button onClick={goNext}>다음</Button>
        </BottomCTA>
      }
    >
      <Top title="매달 꼭 나가는 돈이 얼마예요?" />

      <NumberField
        value={draft.fixed_expense === 0 ? null : draft.fixed_expense}
        onChange={(value) => setValue('fixed_expense', value ?? 0)}
        mode="amount"
        suffix="원"
        placeholder="0"
        error={error}
      />

      <Paragraph tone="caption">월세 · 통신비 · 보험료처럼 매달 같은 날 나가는 돈이에요.</Paragraph>
    </StepScreen>
  )
}
