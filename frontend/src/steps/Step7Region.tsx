import { BottomCTA, Button, Paragraph, SelectField, StepScreen, Top } from '../components/ui'
import { REGIONS } from '../constants/regions'
import { STEP, useOnboarding } from '../store/onboarding'
import { errorForField, useResult } from '../store/result'
import { useStepChrome } from './useStepChrome'

export function Step7Region() {
  const draft = useOnboarding((state) => state.draft)
  const setValue = useOnboarding((state) => state.set)
  const goNext = useOnboarding((state) => state.goNext)
  const errors = useResult((state) => state.errors)
  const chrome = useStepChrome(STEP.REGION)

  const error = errorForField(errors, 'region_code')

  return (
    <StepScreen
      {...chrome}
      footer={
        <BottomCTA>
          <Button onClick={goNext} disabled={draft.region_code === null}>
            다음
          </Button>
        </BottomCTA>
      }
    >
      <Top title="어디에 살고 있어요?" />

      <SelectField
        label="시·도"
        value={draft.region_code}
        onChange={(value) => setValue('region_code', value)}
        options={REGIONS.map((region) => ({ value: region.code, label: region.label }))}
        placeholder="사는 곳을 골라 주세요"
        error={error}
      />

      <Paragraph tone="caption">지역마다 받을 수 있는 지원이 달라서 물어봐요.</Paragraph>
    </StepScreen>
  )
}
