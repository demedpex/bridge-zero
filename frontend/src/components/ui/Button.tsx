import type { ButtonHTMLAttributes } from 'react'
import styles from './ui.module.css'

type Variant = 'primary' | 'secondary' | 'text'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const VARIANT_CLASS: Record<Variant, string> = {
  primary: styles.buttonPrimary,
  secondary: styles.buttonSecondary,
  text: styles.buttonText,
}

export function Button({ variant = 'primary', className, ...rest }: Props) {
  return (
    <button
      type="button"
      className={[styles.button, VARIANT_CLASS[variant], className].filter(Boolean).join(' ')}
      {...rest}
    />
  )
}
