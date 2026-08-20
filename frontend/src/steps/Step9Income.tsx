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
import { INCOME_TYPE_OPTIONS } from '../constants/options'
import { STEP, useOnboarding } from '../store/onboarding'
import { errorForField, useResult } from '../store/result'
import { useStepChrome } from './useStepChrome'

export function Step9Income() {
  const draft = useOnboarding((state) => state.draft)
  const setValue = useOnboarding((state) => state.set)
  const goNext = useOnboarding((state) => state.goNext)
  const errors = useResult((state) => state.errors)
  const chrome = useStepChrome(STEP.INCOME)

  const hasIncome = draft.income_type !== 'NONE'
  const error = errorForField(errors, 'monthly_income') ?? errorForField(errors, 'income_type')

  return (
    <StepScreen
      {...chrome}
      footer={
        <BottomCTA>
          <Button onClick={goNext}>다음</Button>
        </BottomCTA>
      }
    >
      <Top title="한 달 수입이 얼마예요?" />

      <ListRowGroup label="수입 형태를 골라 주세요">
        {INCOME_TYPE_OPTIONS.map((option) => (
          <ListRow
            key={option.value}
            label={option.label}
            selected={draft.income_type === option.value}
            onSelect={() => {
              setValue('income_type', option.value)
              if (option.value === 'NONE') setValue('monthly_income', 0)
            }}
          />
        ))}
      </ListRowGroup>

      {hasIncome && (
        <div className={uiStyles.section}>
          <NumberField
            label="한 달에 손에 들어오는 돈"
            value={draft.monthly_income === 0 ? null : draft.monthly_income}
            onChange={(value) => setValue('monthly_income', value ?? 0)}
            mode="amount"
            suffix="원"
            placeholder="0"
            error={error}
          />
        </div>
      )}
    </StepScreen>
  )
}
