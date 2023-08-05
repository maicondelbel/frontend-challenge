import { ICryptoInWallet } from '@/hook/useGetMyWallet'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatPercentage } from '@/utils/formatPercentage'
import { isPositive } from '@/utils/isPositive'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '../../UI/Button'
import { ViewMoreButton } from '../ViewMoreButton'
import style from './styles.module.css'

interface ITopCryptosTable {
  data: ICryptoInWallet[]
}

const NUM_CRYPTOS_TO_SHOW = 5 // Itens a serem mostrados

export function TopCryptosTable({ data }: ITopCryptosTable) {
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
    <div className={style['cryptos-table__wrapper']}>
      <table className={style['cryptos-table']}>
        <thead className={style['cryptos-table__thead']}>
          <tr>
            <th>#</th>
            <th>Crypto</th>
            <th>Price</th>
            <th>Change</th>
            <th>Trade</th>
          </tr>
        </thead>
        <tbody className={style['cryptos-table__tbody']}>
          {initialCryptosData.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td className={style['cryptos-table__tbody__icon-column']}>
                  <Image
                    src={`https://assets.coincap.io/assets/icons/${item.logo}@2x.png`}
                    width={32}
                    height={32}
                    alt={item.name}
                    className={style['cryptos-table__tbody__icon']}
                  />
                  {`${item.name} ${item.symbol}`}
                </td>
                <td>{formatCurrency(item.priceUsd)}</td>
                <td
                  className={
                    isPositive(item.changePercent24Hr)
                      ? style['value--positive']
                      : style['value--negative']
                  }
                >
                  {formatPercentage(item.changePercent24Hr)}%
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="tertiary"
                    style={{ width: '8rem' }}
                  >
                    Buy
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <ViewMoreButton numOfItem={numberOfCryptos} onClick={handleFilter} />
    </div>
  )
}
