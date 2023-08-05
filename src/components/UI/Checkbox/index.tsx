import { InputHTMLAttributes, ReactNode, forwardRef } from 'react'
import style from './styles.module.css'

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
  children: ReactNode
}

export const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>(
  ({ hasError = false, children, ...props }, ref) => {
    return (
      <label
        className={`${style.checkbox} ${hasError && style['checkbox--error']}`}
      >
        {children}
        <input type="checkbox" {...props} ref={ref} />
        <span className={style.checkmark}></span>
      </label>
    )
  },
)
Checkbox.displayName = 'Input'
