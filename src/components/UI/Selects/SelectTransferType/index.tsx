import * as SelectPrimitive from '@radix-ui/react-select'
import { ArrowDownIcon } from '../../../Icons/ArrowDownIcon'
import { SelectItem } from '../SelectItem'

import { Roboto } from 'next/font/google'
import style from './../styles.module.css'

interface ISelectInput extends SelectPrimitive.SelectProps {
  hasError?: boolean
}

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] })

export function SelectTransferType({
  hasError = false,
  ...props
}: ISelectInput) {
  return (
    <SelectPrimitive.Root {...props}>
      <SelectPrimitive.Trigger
        className={`${style.select} ${hasError && style['select--error']}`}
        aria-label="Transfer type"
      >
        <SelectPrimitive.Value placeholder="Select Transfer" />
        <SelectPrimitive.Icon className={style.select__icon}>
          <ArrowDownIcon fill="#ACABB7" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          alignOffset={0}
          sideOffset={8}
          position="popper"
          className={`${style.select__content} ${roboto.className}`}
        >
          <SelectPrimitive.Viewport className={style.select__viewport}>
            <SelectItem value="in" className={style.select__item}>
              <div className={style.crypto__label}>Transfer in</div>
            </SelectItem>
            <SelectItem value="out" className={style.select__item}>
              <div className={style.crypto__label}>Transfer out</div>
            </SelectItem>
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}
