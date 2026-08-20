/** 연월 선택. 값은 계약 형식인 "YYYY-MM" 으로 담는다. */
import { useEffect, useState } from 'react'
import styles from './ui.module.css'

type Direction = 'past' | 'future'

interface Props {
  label?: string
  value: string | null
  onChange: (value: string | null) => void
  /** past: 올해까지 / future: 올해부터 */
  direction?: Direction
  error?: string | null
}

const PAST_SPAN = 30
const FUTURE_SPAN = 10

function yearOptions(direction: Direction): number[] {
  const thisYear = new Date().getFullYear()
  if (direction === 'future') {
    return Array.from({ length: FUTURE_SPAN + 1 }, (_, index) => thisYear + index)
  }
  return Array.from({ length: PAST_SPAN + 1 }, (_, index) => thisYear - index)
}

const MONTHS = Array.from({ length: 12 }, (_, index) => index + 1)

function split(value: string | null): { year: string; month: string } {
  if (!value) return { year: '', month: '' }
  const [year, month] = value.split('-')
  // 선택지 값은 "3", 계약 형식은 "03" 이라서 앞의 0을 떼고 맞춘다.
  return { year, month: String(Number(month)) }
}

function join(year: string, month: string): string | null {
  if (!year || !month) return null
  return `${year}-${month.padStart(2, '0')}`
}

export function YearMonthField({ label, value, onChange, direction = 'past', error }: Props) {
  // 연도만 고른 사이에는 아직 계약 형식이 되지 못한다. 그동안의 선택을 여기서 들고 있는다.
  const [year, setYear] = useState(() => split(value).year)
  const [month, setMonth] = useState(() => split(value).month)

  // 수정 링크로 되돌아온 것처럼 밖에서 값이 들어오면 맞춰 준다.
  useEffect(() => {
    if (value === null) return
    const next = split(value)
    setYear(next.year)
    setMonth(next.month)
  }, [value])

  return (
    <div className={styles.field}>
      {label && <span className={styles.fieldLabel}>{label}</span>}
      <div className={styles.selectRow}>
        <select
          className={styles.select}
          value={year}
          aria-label="연도"
          aria-invalid={Boolean(error)}
          onChange={(event) => {
            setYear(event.target.value)
            onChange(join(event.target.value, month))
          }}
        >
          <option value="">연도</option>
          {yearOptions(direction).map((option) => (
            <option key={option} value={String(option)}>
              {option}년
            </option>
          ))}
        </select>
        <select
          className={styles.select}
          value={month}
          aria-label="월"
          aria-invalid={Boolean(error)}
          onChange={(event) => {
            setMonth(event.target.value)
            onChange(join(year, event.target.value))
          }}
        >
          <option value="">월</option>
          {MONTHS.map((option) => (
            <option key={option} value={String(option)}>
              {option}월
            </option>
          ))}
        </select>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
