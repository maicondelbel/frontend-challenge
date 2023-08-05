import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.css'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'tertiary'
  size?: 'sm' | 'md'
  withShadow?: boolean
  children: ReactNode
}

export function Button({
  variant,
  size = 'sm',
  withShadow = false,
  children,
  ...props
}: IButton) {
  return (
    <button
      className={`${styles.button} ${styles[`button--${variant}`]} ${
        styles[`button--${size}`]
      } ${withShadow && styles['button--shadow']}`}
      {...props}
    >
      {children}
    </button>
  )
}
