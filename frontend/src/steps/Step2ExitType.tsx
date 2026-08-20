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
import { CARE_EXIT_TYPE_OPTIONS } from '../constants/options'
import { STEP, useOnboarding } from '../store/onboarding'
import { errorForField, errorForStep, useResult } from '../store/result'
import { useStepChrome } from './useStepChrome'

export function Step2ExitType() {
  const draft = useOnboarding((state) => state.draft)
  const setValue = useOnboarding((state) => state.set)
  const goNext = useOnboarding((state) => state.goNext)
  const errors = useResult((state) => state.errors)
  const chrome = useStepChrome(STEP.EXIT_TYPE)

  const canGoNext = draft.care_exit_type !== null && draft.care_exit_ym !== null
  const error = errorForField(errors, 'care_exit_ym') ?? errorForStep(errors, STEP.EXIT_TYPE)

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
      <Top title="어떻게 끝났어요?" />

      <ListRowGroup label="보호가 어떻게 끝났는지 골라 주세요">
        {CARE_EXIT_TYPE_OPTIONS.map((option) => (
          <ListRow
            key={option.value}
            label={option.label}
            description={option.description}
            selected={draft.care_exit_type === option.value}
            onSelect={() => setValue('care_exit_type', option.value)}
          />
        ))}
      </ListRowGroup>

      <div className={uiStyles.section}>
        <Paragraph>언제 끝났어요?</Paragraph>
        <YearMonthField
          value={draft.care_exit_ym}
          onChange={(value) => setValue('care_exit_ym', value)}
          direction="past"
          error={error}
        />
      </div>
    </StepScreen>
  )
}
