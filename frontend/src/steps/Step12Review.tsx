import { BottomCTA, Button, Paragraph, StepScreen, Top, uiStyles } from '../components/ui'
import { STEP, useOnboarding } from '../store/onboarding'
import { useResult } from '../store/result'
import { reviewItems } from './format'
import { useStepChrome } from './useStepChrome'

export function Step12Review() {
  const draft = useOnboarding((state) => state.draft)
  const goTo = useOnboarding((state) => state.goTo)
  const chrome = useStepChrome(STEP.REVIEW)

  const submit = useResult((state) => state.submit)
  const submitting = useResult((state) => state.submitting)
  const errors = useResult((state) => state.errors)

  const generalError = errors.find((error) => error.step === STEP.REVIEW)

  return (
    <StepScreen
      {...chrome}
      footer={
        <BottomCTA>
          {generalError && <p className={uiStyles.error}>{generalError.message}</p>}
          <Button onClick={submit} disabled={submitting}>
            {submitting ? '계산하고 있어요' : '계산하기'}
          </Button>
        </BottomCTA>
      }
    >
      <Top title="입력한 내용이 맞아요?" subtitle="고치고 싶은 것이 있으면 눌러서 바꿔 주세요." />

      <ul className={uiStyles.reviewList}>
        {reviewItems(draft).map((item) => (
          <li key={item.label} className={uiStyles.reviewItem}>
            <span className={uiStyles.reviewLabel}>{item.label}</span>
            <span className={uiStyles.reviewValue}>{item.value}</span>
            <button
              type="button"
              className={uiStyles.reviewEdit}
              onClick={() => goTo(item.step)}
              aria-label={`${item.label} 수정`}
            >
              수정
            </button>
          </li>
        ))}
      </ul>

      <Paragraph tone="caption">입력한 내용은 계산할 때만 쓰고 서버에 저장되지 않아요.</Paragraph>
    </StepScreen>
  )
}
