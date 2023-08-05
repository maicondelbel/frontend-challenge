import { InputHTMLAttributes, forwardRef, useState } from 'react'

import { EmailIcon } from '@/components/Icons/EmailIcon'
import { EyeIcon } from '@/components/Icons/EyeIcon'
import { EyeNotIcon } from '@/components/Icons/EyeNotIcon'
import { LockIcon } from '@/components/Icons/LockIcon'
import { UserIcon } from '@/components/Icons/UserIcon'

import style from './styles.module.css'

interface IFormInput extends InputHTMLAttributes<HTMLInputElement> {
  type: 'password' | 'name' | 'email' | 'number'
  hasError?: boolean
  hasIcon?: boolean
}

export const Input = forwardRef<HTMLInputElement, IFormInput>(
  ({ hasError = false, hasIcon = false, type, ...props }, ref) => {
    const [hideText, setHideText] = useState<boolean>(type === 'password')

    function handleViewPassword() {
      setHideText(!hideText)
    }
    return (
      <div className={style.input}>
        <div className={style.input__icon}>
          {type === 'name' && <UserIcon />}
          {type === 'password' && <LockIcon />}
          {type === 'email' && <EmailIcon />}
        </div>
        <input
          type={hideText ? 'password' : type === 'password' ? 'text' : type}
          className={`${style.input__field} ${
            hasError && style['input--error']
          } ${hasIcon && style['input__field--icon']}`}
          ref={ref}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            className={style.input__button}
            onClick={handleViewPassword}
            disabled={props.disabled}
          >
            {hideText ? <EyeIcon /> : <EyeNotIcon />}
          </button>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'
