/**
 * 엔진 응답 확인 화면.
 *
 * ※ 결과 화면(타임라인 · 자격 카드 · 순서 비교)은 이번 작업 범위 밖이다.
 *   여기서는 엔진까지 값이 잘 넘어갔는지 확인할 수 있게 스텁 응답을 그대로 보여준다.
 * TODO(next): 결과 화면이 만들어지면 이 화면을 대체한다.
 */
import { BottomCTA, Button, DoneMark, Paragraph, StepScreen, Top, uiStyles } from '../components/ui'
import { useOnboarding } from '../store/onboarding'
import { useResult } from '../store/result'

export function Step13Result() {
  const goBack = useOnboarding((state) => state.goBack)
  const reset = useOnboarding((state) => state.reset)
  const clock = useResult((state) => state.clock)
  const resetResult = useResult((state) => state.reset)

  const startOver = () => {
    resetResult()
    reset()
  }

  return (
    <StepScreen
      onBack={goBack}
      footer={
        <BottomCTA>
          <Button variant="secondary" onClick={startOver}>
            처음부터 다시 하기
          </Button>
        </BottomCTA>
      }
    >
      <DoneMark />

      <Top title="엔진까지 잘 넘어갔어요" subtitle="지금은 고정 응답을 주는 스텁이 답했어요." />

      {clock ? (
        <>
          <div className={uiStyles.resultHighlight}>
            <span className={uiStyles.resultNumber}>{clock.remaining_count}</span>
            <span className={uiStyles.resultUnit}>회 남았어요</span>
          </div>
          <div className={uiStyles.resultBox}>
            <pre className={uiStyles.resultCode}>{JSON.stringify(clock, null, 2)}</pre>
          </div>
        </>
      ) : (
        <Paragraph>확인 화면에서 계산하기를 누르면 결과를 보여드릴게요.</Paragraph>
      )}

      <div className={uiStyles.section}>
        <Paragraph tone="caption">실제 계산은 엔진 모듈이 붙으면 이 자리에 그대로 들어와요.</Paragraph>
      </div>
    </StepScreen>
  )
}
