import { LogoutIcon } from '@/components/Icons/LogoutButton'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { Roboto } from 'next/font/google'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import style from './styles.module.css'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] })

interface IPopover extends PopoverPrimitive.PopoverContentProps {
  children: ReactNode
}

export function ProfilePopover({ children, ...props }: IPopover) {
  const router = useRouter()

  function handleLogout() {
    router.push('/')
  }

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
        <button className={style.popover__icon} aria-label="Profile">
          {children}
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="end"
          className={`${style.popover} ${roboto.className}`}
          {...props}
        >
          <button className={style.logout__button} onClick={handleLogout}>
            <LogoutIcon />
            <p className={style.Text}>Logout</p>
          </button>
          <PopoverPrimitive.Arrow className={style.popover__arrow} />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}
