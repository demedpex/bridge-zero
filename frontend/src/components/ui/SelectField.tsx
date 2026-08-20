import { useId } from 'react'
import styles from './ui.module.css'

interface Props {
  label: string
  value: string | null
  onChange: (value: string | null) => void
  options: { value: string; label: string }[]
  placeholder?: string
  error?: string | null
}

export function SelectField({ label, value, onChange, options, placeholder, error }: Props) {
  const selectId = useId()

  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel} htmlFor={selectId}>
        {label}
      </label>
      <select
        id={selectId}
        className={styles.select}
        value={value ?? ''}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value === '' ? null : event.target.value)}
      >
        <option value="">{placeholder ?? '골라 주세요'}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
