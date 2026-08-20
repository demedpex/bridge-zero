/** 단계 화면 뼈대: 상단 뒤로가기 · 본문 · 하단 고정 버튼. */
import type { ReactNode } from 'react'
import { Navigation } from './Navigation'
import styles from './ui.module.css'

interface Props {
  onBack?: () => void
  progress?: number
  stepLabel?: string
  children: ReactNode
  footer?: ReactNode
}

export function StepScreen({ onBack, progress, stepLabel, children, footer }: Props) {
  return (
    <div className={styles.screen}>
      <Navigation onBack={onBack} progress={progress} stepLabel={stepLabel} />
      <main className={styles.content}>{children}</main>
      {footer}
    </div>
  )
}
