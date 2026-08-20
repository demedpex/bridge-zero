import {
  BottomCTA,
  Button,
  ListRow,
  ListRowGroup,
  NumberField,
  StepScreen,
  Top,
  uiStyles,
} from '../components/ui'
import { SUSPENDED_OPTIONS } from '../constants/options'
import { STEP, useOnboarding } from '../store/onboarding'
import { errorForField, useResult } from '../store/result'
import { useStepChrome } from './useStepChrome'
import { useState } from 'react'

export function Step5AllowanceSuspended() {
  const draft = useOnboarding((state) => state.draft)
  const setValue = useOnboarding((state) => state.set)
  const goNext = useOnboarding((state) => state.goNext)
  const errors = useResult((state) => state.errors)
  const chrome = useStepChrome(STEP.ALLOWANCE_SUSPENDED)

  // 화면에서만 쓰는 갈래. 계약에는 개월 수만 넘어간다.
  const [suspended, setSuspended] = useState<'NO' | 'YES'>(
    draft.allowance_suspended_months > 0 ? 'YES' : 'NO',
  )

  const error = errorForField(errors, 'allowance_suspended_months')
  const canGoNext = suspended === 'NO' || draft.allowance_suspended_months > 0

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
      <Top title="중간에 지급이 멈춘 적 있어요?" />

      <ListRowGroup label="지급이 멈춘 적 있는지 골라 주세요">
        {SUSPENDED_OPTIONS.map((option) => (
          <ListRow
            key={option.value}
            label={option.label}
            selected={suspended === option.value}
            onSelect={() => {
              setSuspended(option.value)
              if (option.value === 'NO') setValue('allowance_suspended_months', 0)
            }}
          />
        ))}
      </ListRowGroup>

      {suspended === 'YES' && (
        <div className={uiStyles.section}>
          <NumberField
            label="몇 개월 멈췄어요?"
            value={draft.allowance_suspended_months === 0 ? null : draft.allowance_suspended_months}
            onChange={(value) => setValue('allowance_suspended_months', value ?? 0)}
            suffix="개월"
            placeholder="0"
            error={error}
          />
        </div>
      )}
    </StepScreen>
  )
}
