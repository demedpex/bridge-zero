/** 화면 제목. 한 화면에 하나만 둔다. */
import type { ReactNode } from 'react'
import styles from './ui.module.css'

interface Props {
  title: ReactNode
  subtitle?: ReactNode
}

export function Top({ title, subtitle }: Props) {
  return (
    <header className={styles.top}>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  )
}
