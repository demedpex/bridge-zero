import { BottomCTA, Button, HelpDisclosure, NumberField, StepScreen, Top } from '../components/ui'
import { STEP, useOnboarding } from '../store/onboarding'
import { errorForField, useResult } from '../store/result'
import { useStepChrome } from './useStepChrome'

export function Step3AllowanceCount() {
  const draft = useOnboarding((state) => state.draft)
  const setValue = useOnboarding((state) => state.set)
  const goNext = useOnboarding((state) => state.goNext)
  const errors = useResult((state) => state.errors)
  const chrome = useStepChrome(STEP.ALLOWANCE_COUNT)

  const canGoNext = draft.allowance_received_count !== null
  const error = errorForField(errors, 'allowance_received_count')

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
      <Top title="자립수당을 지금까지 몇 번 받았어요?" />

      <NumberField
        value={draft.allowance_received_count}
        onChange={(value) => setValue('allowance_received_count', value)}
        suffix="번"
        placeholder="0"
        error={error}
      />

      <HelpDisclosure>
        <p>
          통장에서 자립수당이 입금된 횟수를 세어 보세요. 매달 50만원이 들어왔다면 그 입금 건수가
          받은 횟수예요.
        </p>
        <p>복지로 마이페이지 · 보건복지상담센터 129 · 자립지원전담기관에서도 확인할 수 있어요.</p>
      </HelpDisclosure>
    </StepScreen>
  )
}
