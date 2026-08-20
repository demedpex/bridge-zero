import { stepOrder, useOnboarding } from '../store/onboarding'

/** 상단 뒤로가기와 진행률. 계산이 아니라 화면 위치 표시다. */
export function useStepChrome(step: number) {
  const draft = useOnboarding((state) => state.draft)
  const goBack = useOnboarding((state) => state.goBack)

  const order = stepOrder(draft)
  const index = order.indexOf(step)
  const total = order.length - 1 // 시작 화면은 진행률에서 뺀다

  if (index <= 0) {
    return { onBack: index === 0 ? undefined : goBack, progress: undefined, stepLabel: undefined }
  }

  return {
    onBack: goBack,
    progress: index / total,
    stepLabel: `${index}/${total}`,
  }
}
