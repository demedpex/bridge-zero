/** 선택지 한 줄. 라디오 하나를 누르는 것과 같게 동작한다. */
import styles from './ui.module.css'

interface Props {
  label: string
  description?: string
  selected: boolean
  onSelect: () => void
}

export function ListRow({ label, description, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className={selected ? `${styles.row} ${styles.rowSelected}` : styles.row}
      onClick={onSelect}
    >
      <span className={styles.rowBody}>
        <span className={styles.rowLabel}>{label}</span>
        {description && <span className={styles.rowDescription}>{description}</span>}
      </span>
      <span
        className={selected ? `${styles.radioMark} ${styles.radioMarkSelected}` : styles.radioMark}
        aria-hidden="true"
      />
    </button>
  )
}

interface GroupProps {
  label: string
  children: React.ReactNode
}

export function ListRowGroup({ label, children }: GroupProps) {
  return (
    <div className={styles.rowGroup} role="radiogroup" aria-label={label}>
      {children}
    </div>
  )
}
