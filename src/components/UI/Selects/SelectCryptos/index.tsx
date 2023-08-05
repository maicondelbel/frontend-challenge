/* eslint-disable react-hooks/exhaustive-deps */
import { useDialog } from '@/hook/useDialog'
import { ICryptoInWallet } from '@/hook/useGetMyWallet'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Roboto } from 'next/font/google'
import Image from 'next/image'
import { useEffect } from 'react'
import { ArrowDownIcon } from '../../../Icons/ArrowDownIcon'
import { ArrowUpIcon } from '../../../Icons/ArrowUpIcon'
import { SelectItem } from '../SelectItem'

import style from './../styles.module.css'

interface ISelectInput extends SelectPrimitive.SelectProps {
  data: ICryptoInWallet[] | undefined
  hasError?: boolean
  selectedValue: string
}

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] })

export function SelectInputCryptos({
  data,
  hasError = false,
  selectedValue,
  ...props
}: ISelectInput) {
  const { setSelectedCrypto } = useDialog()

  function handleSelectedCrypto(crypto: string) {
    const selectedCrypto = data?.filter((item) => item.symbol === crypto)
    if (selectedCrypto) {
      setSelectedCrypto({ crypto: selectedCrypto[0] })
    }
  }

  useEffect(() => {
    handleSelectedCrypto(selectedValue)
  }, [selectedValue])

  return (
    <SelectPrimitive.Root {...props}>
      <SelectPrimitive.Trigger
        className={`${style.select} ${hasError && style['select--error']}`}
        aria-label="Crypto"
      >
        <SelectPrimitive.Value placeholder="Choose crypto" />
        <SelectPrimitive.Icon className={style.select__icon}>
          <ArrowDownIcon fill="#ACABB7" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          alignOffset={0}
          sideOffset={8}
          position="popper"
          className={`${style.select__content} ${roboto.className} ${style['select__content--cryptos']}`}
        >
          <SelectPrimitive.ScrollUpButton
            className={style.select__scroll__buttons}
          >
            <ArrowUpIcon fill="#ACABB7" />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className={style.select__viewport}>
            {data?.map((item) => {
              return (
                <SelectItem
                  key={item.symbol}
                  value={item.symbol}
                  className={style.select__item}
                >
                  <div className={style.crypto__label}>
                    <Image
                      src={`https://assets.coincap.io/assets/icons/${item.logo}@2x.png`}
                      width={16}
                      height={16}
                      alt={item.name}
                    />
                    <div>
                      <span className={style['crypto__label--name']}>
                        {item.name}
                      </span>
                      <span className={style['crypto__label--symbol']}>
                        {item.symbol}
                      </span>
                    </div>
                  </div>
                </SelectItem>
              )
            })}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton
            className={style.select__scroll__buttons}
          >
            <ArrowDownIcon fill="#ACABB7" />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}
