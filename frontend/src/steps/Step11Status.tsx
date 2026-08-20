import { BottomCTA, Button, SelectField, StepScreen, Top } from '../components/ui'
import { EDUCATION_STATUS_OPTIONS, EMPLOYMENT_STATUS_OPTIONS } from '../constants/options'
import { STEP, useOnboarding } from '../store/onboarding'
import { errorForField, useResult } from '../store/result'
import { useStepChrome } from './useStepChrome'

export function Step11Status() {
  const draft = useOnboarding((state) => state.draft)
  const setValue = useOnboarding((state) => state.set)
  const goNext = useOnboarding((state) => state.goNext)
  const errors = useResult((state) => state.errors)
  const chrome = useStepChrome(STEP.STATUS)

  const canGoNext = draft.education_status !== null && draft.employment_status !== null

  return (
    <StepScreen
      {...chrome}
      footer={
        <BottomCTA>
          <Button onClick={goNext} disabled={!canGoNext}>
            다음
          </Button>
        </BottomCTA>
      }
    >
      <Top title="지금 어떤 상태예요?" subtitle="받을 수 있는 지원을 고르는 데 써요." />

      <SelectField
        label="학력"
        value={draft.education_status}
        onChange={(value) => setValue('education_status', value)}
        options={EDUCATION_STATUS_OPTIONS}
        error={errorForField(errors, 'education_status')}
      />

      <SelectField
        label="일하는 상태"
        value={draft.employment_status}
        onChange={(value) => setValue('employment_status', value)}
        options={EMPLOYMENT_STATUS_OPTIONS}
        error={errorForField(errors, 'employment_status')}
      />
    </StepScreen>
  )
}
