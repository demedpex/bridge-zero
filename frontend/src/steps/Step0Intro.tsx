import {
  BottomCTA,
  Button,
  Paragraph,
  StepScreen,
  SupportCalendarFigure,
  Top,
} from '../components/ui'
import { useOnboarding } from '../store/onboarding'

export function Step0Intro() {
  const goNext = useOnboarding((state) => state.goNext)

  return (
    <StepScreen
      footer={
        <BottomCTA>
          <Button onClick={goNext}>시작하기</Button>
        </BottomCTA>
      }
    >
      <SupportCalendarFigure />

      <Top
        title="지원이 언제 끝나는지 계산해 드릴게요"
        subtitle="1분이면 끝나요. 몇 가지만 물어볼게요."
      />
      <Paragraph>
        보호가 끝난 시점과 지금까지 받은 자립수당을 알려주면, 남은 지원과 매달 남겨야 할 금액을
        알려드려요.
      </Paragraph>
      <Paragraph tone="caption">
        입력한 내용은 서버에 저장되지 않아요. 이 브라우저에만 두고, 탭을 닫으면 사라져요.
      </Paragraph>
    </StepScreen>
  )
}
