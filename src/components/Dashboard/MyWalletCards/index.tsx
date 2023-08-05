import { Button } from '@/components/UI/Button'
import { useDialog } from '@/hook/useDialog'
import { ICryptoInWallet } from '@/hook/useGetMyWallet'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatPercentage } from '@/utils/formatPercentage'
import { isPositive } from '@/utils/isPositive'
import Image from 'next/image'

import style from './styles.module.css'

interface IMyWalletCards {
  data: ICryptoInWallet[] | undefined
}

export function MyWalletCards({ data }: IMyWalletCards) {
  const { handleOpenDialog } = useDialog()
  return (
    <div className={style.cards__wrapper}>
      {data?.map((item) => {
        return (
          <div key={item.id} className={style.card}>
            <header className={style.card__header}>
              <Image
                src={`https://assets.coincap.io/assets/icons/${item.logo}@2x.png`}
                width={16}
                height={16}
                alt={item.name}
              />
              <h5 className={style.crypto__title}>
                {item.name} <span>{item.symbol}</span>
              </h5>
            </header>
            <div className={style.card__body}>
              <div>
                <h6 className={style.crypto__session__title}>Holdings</h6>
                <span className={style.crypto__price}>
                  {formatCurrency(item.priceUsd)}
                </span>
                <p className={style.crypto__amount}>
                  {item.quantity} <span>{item.symbol}</span>
                </p>
              </div>
              <div className={style.separator} />
              <div>
                <h6 className={style.crypto__session__title}>Change</h6>
                <span
                  className={`${style.crypto__change} ${
                    isPositive(item.changePercent24Hr)
                      ? style['crypto__change--positive']
                      : style['crypto__change--negative']
                  }`}
                >
                  {formatPercentage(item.changePercent24Hr)}%
                </span>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() =>
                  handleOpenDialog({ type: 'transferCrypto' }, { crypto: item })
                }
              >
                Trade
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
