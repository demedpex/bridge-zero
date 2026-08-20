/**
 * 숫자 입력.
 * `mode="amount"` 면 자릿수 구분 쉼표를 붙여 보여준다. (보기 좋게 바꾸는 것일 뿐, 계산하지 않는다)
 */
import { useId } from 'react'
import styles from './ui.module.css'

interface Props {
  label?: string
  value: number | null
  onChange: (value: number | null) => void
  suffix?: string
  placeholder?: string
  mode?: 'count' | 'amount'
  error?: string | null
  autoFocus?: boolean
}

function format(value: number | null, mode: 'count' | 'amount'): string {
  if (value === null) return ''
  return mode === 'amount' ? value.toLocaleString('ko-KR') : String(value)
}

export function NumberField({
  label,
  value,
  onChange,
  suffix,
  placeholder,
  mode = 'count',
  error,
  autoFocus,
}: Props) {
  const inputId = useId()

  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.fieldLabel} htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className={error ? `${styles.inputWrap} ${styles.inputWrapInvalid}` : styles.inputWrap}>
        <input
          id={inputId}
          className={styles.input}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          autoFocus={autoFocus}
          placeholder={placeholder}
          value={format(value, mode)}
          aria-invalid={Boolean(error)}
          onChange={(event) => {
            const digits = event.target.value.replace(/[^0-9]/g, '')
            onChange(digits === '' ? null : Number(digits))
          }}
        />
        {suffix && <span className={styles.inputSuffix}>{suffix}</span>}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
