import * as Accordion from '@radix-ui/react-accordion'
import { ArrowDownIcon } from '../../Icons/ArrowDownIcon'

import { ICryptoInWallet } from '@/hook/useGetMyWallet'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatPercentage } from '@/utils/formatPercentage'
import { isPositive } from '@/utils/isPositive'
import Image from 'next/image'
import { useState } from 'react'
import { ViewMoreButton } from '../ViewMoreButton'
import style from './styles.module.css'

interface IAccordionCrypto {
  data: ICryptoInWallet[]
}

const NUM_CRYPTOS_TO_SHOW = 5

export function AccordionCrypto({ data }: IAccordionCrypto) {
  const [initialCryptosData, setInitialCryptosData] = useState(
    data.slice(0, NUM_CRYPTOS_TO_SHOW),
  )

  const numberOfCryptos = initialCryptosData.length

  function handleFilter() {
    if (numberOfCryptos > 5) {
      setInitialCryptosData(data.slice(0, 5))
    } else {
      setInitialCryptosData(data)
    }
  }
  return (
    <div className={style.accordion__wrapper}>
      <Accordion.Root type="single" collapsible className={style.accordion}>
        <div className={style.accordion__header}>
          <span>Crypto</span>
          <span>Trade</span>
        </div>
        {initialCryptosData.map((item) => {
          return (
            <Accordion.Item
              value={item.id.toString()}
              key={item.id}
              className={style.accordion__item}
            >
              <Accordion.Header>
                <Accordion.Trigger className={style.accordion__trigger}>
                  <div className={style.accordion__trigger__label}>
                    <Image
                      src={`https://assets.coincap.io/assets/icons/${item.logo}@2x.png`}
                      width={24}
                      height={24}
                      alt={item.name}
                      className={style['cryptos-table__tbody__icon']}
                    />
                    <p>
                      {item.name} <span>{item.symbol}</span>
                    </p>
                  </div>
                  <ArrowDownIcon />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className={style.accordion__content}>
                <div className={style.accordion__content__wrapper}>
                  <div className={style.accordion__content__line}>
                    <span className={style.accordion__content__line__label}>
                      Price
                    </span>
                    <span className={style.accordion__content__line__value}>
                      {formatCurrency(item.priceUsd)}
                    </span>
                  </div>
                  <div className={style.accordion__content__line}>
                    <span className={style.accordion__content__line__label}>
                      Change
                    </span>
                    <span
                      className={`${style.accordion__content__line__value} ${
                        isPositive(item.changePercent24Hr)
                          ? style['value--positive']
                          : style['value--negative']
                      }`}
                    >
                      {formatPercentage(item.changePercent24Hr)}%
                    </span>
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          )
        })}
      </Accordion.Root>
      <ViewMoreButton numOfItem={numberOfCryptos} onClick={handleFilter} />
    </div>
  )
}
