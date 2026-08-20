/** 상단 뒤로가기. 모든 화면에 이탈 경로가 있어야 한다. */
import styles from './ui.module.css'

interface Props {
  onBack?: () => void
  /** 0~1. 진행률 막대를 감출 때는 넘기지 않는다. */
  progress?: number
  stepLabel?: string
}

export function Navigation({ onBack, progress, stepLabel }: Props) {
  return (
    <nav className={styles.nav}>
      {onBack ? (
        <button type="button" className={styles.navButton} onClick={onBack} aria-label="뒤로 가기">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M15 5L8 12l7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : (
        <span className={styles.navSpacer} />
      )}

      {progress !== undefined && (
        <>
          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            aria-label="진행률"
          >
            <div className={styles.progressFill} style={{ width: `${progress * 100}%` }} />
          </div>
          {stepLabel && <span className={styles.progressLabel}>{stepLabel}</span>}
        </>
      )}
    </nav>
  )
}
