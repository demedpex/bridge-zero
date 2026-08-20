import {
  BottomCTA,
  Button,
  ListRow,
  ListRowGroup,
  Paragraph,
  StepScreen,
  Top,
  uiStyles,
  YearMonthField,
} from '../components/ui'
import { EXIT_STATUS_OPTIONS } from '../constants/options'
import { STEP, useOnboarding } from '../store/onboarding'
import { errorForField, errorForStep, useResult } from '../store/result'
import { useStepChrome } from './useStepChrome'

export function Step1ExitStatus() {
  const draft = useOnboarding((state) => state.draft)
  const setValue = useOnboarding((state) => state.set)
  const goNext = useOnboarding((state) => state.goNext)
  const errors = useResult((state) => state.errors)
  const chrome = useStepChrome(STEP.EXIT_STATUS)

  const isScheduled = draft.exit_status === 'SCHEDULED'
  const canGoNext = draft.exit_status === 'ENDED' || (isScheduled && draft.expected_exit_ym !== null)
  const error = errorForField(errors, 'expected_exit_ym') ?? errorForStep(errors, STEP.EXIT_STATUS)

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
      <Top title="보호가 끝났어요?" />

      <ListRowGroup label="보호가 끝났는지 골라 주세요">
        {EXIT_STATUS_OPTIONS.map((option) => (
          <ListRow
            key={option.value}
            label={option.label}
            selected={draft.exit_status === option.value}
            onSelect={() => setValue('exit_status', option.value)}
          />
        ))}
      </ListRowGroup>

      {isScheduled && (
        <div className={uiStyles.section}>
          <Paragraph>언제 끝나요?</Paragraph>
          <YearMonthField
            value={draft.expected_exit_ym}
            onChange={(value) => setValue('expected_exit_ym', value)}
            direction="future"
            error={error}
          />
        </div>
      )}
    </StepScreen>
  )
}
