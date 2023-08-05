import * as SelectPrimitive from '@radix-ui/react-select'
import { ReactNode, forwardRef } from 'react'

interface ISelectItem extends SelectPrimitive.SelectItemProps {
  children: ReactNode
}

export const SelectItem = forwardRef<HTMLDivElement, ISelectItem>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <SelectPrimitive.Item {...props} ref={forwardedRef}>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    )
  },
)

SelectItem.displayName = 'SelectItem'
