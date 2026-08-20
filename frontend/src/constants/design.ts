/**
 * 화면 치수 값.
 *
 * ※ 아래 값은 토스 UX 가이드에 기준이 없다. **우리가 정한 값이다.**
 *    토스 규칙이라고 표기하지 않는다. 실제 적용은 styles/global.css 의 CSS 변수에서 한다.
 */
export const DESIGN = {
  fontSizeBase: 17,
  fontSizeTitle: 24,
  fontSizeBody: 15,
  fontSizeCaption: 13,
  /** 금액·횟수처럼 숫자를 읽는 입력에 쓴다. */
  fontSizeAmount: 22,

  lineHeightTitle: 1.38,
  lineHeightBody: 1.6,

  paddingHorizontal: 20,
  gapVertical: 12,
  /** 4의 배수로 맞춘 여백 단계. CSS 의 --space-* 와 같다. */
  space: [4, 8, 12, 16, 20, 24, 32],

  buttonHeight: 52,
  /** 손가락으로 누르는 것은 최소 44px 을 넘긴다. */
  minTapTarget: 44,
  inputHeight: 56,
  radius: 12,
  radiusSmall: 8,

  /** 아이콘 크기 범위 (토스 가이드 기준). */
  iconSize: { min: 24, max: 40 },
} as const

/** 지원해야 하는 최소 논리 해상도 (세로형). */
export const MIN_VIEWPORT = { width: 360, height: 640 } as const
