import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { ReactNode } from 'react'

import { Roboto } from 'next/font/google'
import styles from './styles.module.css'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] })

interface ITooltipProps extends TooltipPrimitive.TooltipContentProps {
  children: ReactNode
  label: string
}

export function Tooltip({ children, label, ...props }: ITooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={100}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className={`${styles.tootip__content} ${roboto.className}`}
            sideOffset={5}
            {...props}
          >
            {label}
            <TooltipPrimitive.Arrow className={styles.tooltip__icon} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
