/**
 * "모르겠어요" 도움말.
 * - 새 화면으로 넘기지 않는다. 같은 화면에서 아래로 펼친다.
 * - 펼쳐도 입력창은 그대로 둔다.
 */
import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import styles from './ui.module.css'

interface Props {
  label?: string
  children: ReactNode
}

export function HelpDisclosure({ label = '모르겠어요', children }: Props) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <div>
      <button
        type="button"
        className={styles.helpToggle}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span
          className={open ? `${styles.caret} ${styles.caretOpen}` : styles.caret}
          aria-hidden="true"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9.5l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {label}
      </button>
      {open && (
        <div className={styles.helpPanel} id={panelId}>
          {children}
        </div>
      )}
    </div>
  )
}
