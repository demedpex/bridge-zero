/** 본문 문구. */
import type { ReactNode } from 'react'
import styles from './ui.module.css'

interface Props {
  children: ReactNode
  tone?: 'body' | 'caption'
}

export function Paragraph({ children, tone = 'body' }: Props) {
  return (
    <p className={tone === 'caption' ? `${styles.paragraph} ${styles.caption}` : styles.paragraph}>
      {children}
    </p>
  )
}
