import { BottomCTA, Button, HelpDisclosure, NumberField, StepScreen, Top } from '../components/ui'
import { STEP, useOnboarding } from '../store/onboarding'
import { errorForField, useResult } from '../store/result'
import { useStepChrome } from './useStepChrome'

export function Step6Settlement() {
  const draft = useOnboarding((state) => state.draft)
  const setValue = useOnboarding((state) => state.set)
  const goNext = useOnboarding((state) => state.goNext)
  const errors = useResult((state) => state.errors)
  const chrome = useStepChrome(STEP.SETTLEMENT)

  const error = errorForField(errors, 'settlement_balance')

  const startFromZero = () => {
    setValue('settlement_balance', 0)
    goNext()
  }

  return (
    <StepScreen
      {...chrome}
      footer={
        <BottomCTA>
          <Button onClick={goNext} disabled={draft.settlement_balance === null}>
            다음
          </Button>
        </BottomCTA>
      }
    >
      <Top title="자립정착금이 지금 얼마나 남았어요?" />

      <NumberField
        value={draft.settlement_balance}
        onChange={(value) => setValue('settlement_balance', value)}
        mode="amount"
        suffix="원"
        placeholder="0"
        error={error}
      />

      <HelpDisclosure>
        <p>0으로 두고 시작할 수 있어요. 나중에 알게 되면 다시 계산해도 괜찮아요.</p>
        <Button variant="text" onClick={startFromZero}>
          0원으로 두고 넘어갈게요
        </Button>
      </HelpDisclosure>
    </StepScreen>
  )
}
