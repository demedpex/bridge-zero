/** 화면 하단에 고정되는 버튼 영역. safe-area 여백을 포함한다. */
import type { ReactNode } from 'react'
import styles from './ui.module.css'

export function BottomCTA({ children }: { children: ReactNode }) {
  return <div className={styles.bottomCta}>{children}</div>
}
