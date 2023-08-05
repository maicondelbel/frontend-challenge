import { TradeIcon } from '@/components/Icons/TradeIcon'
import { useDialog } from '@/hook/useDialog'
import { ICryptoInWallet } from '@/hook/useGetMyWallet'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatPercentage } from '@/utils/formatPercentage'
import { isPositive } from '@/utils/isPositive'
import Image from 'next/image'
import { Tooltip } from '../Tooltip'

import style from './styles.module.css'

interface IMyWalletTable {
  data: ICryptoInWallet[] | undefined
}

export function MyWalletTable({ data }: IMyWalletTable) {
  const { handleOpenDialog } = useDialog()

  return (
    <div className={style['my-wallet-table__wrapper']}>
      <table className={style['my-wallet-table']}>
        <thead className={style['my-wallet-table__thead']}>
          <tr>
            <th>#</th>
            <th>Crypto</th>
            <th>Holdings</th>
            <th>Change</th>
            <th>Trade</th>
          </tr>
        </thead>
        <tbody className={style['my-wallet-table__tbody']}>
          {data?.map((item, index) => {
            if (item.quantity === 0) {
              return null
            } else {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className={style['my-wallet-table__tbody__icon-column']}>
                    <div>
                      <Image
                        src={`https://assets.coincap.io/assets/icons/${item.logo}@2x.png`}
                        width={32}
                        height={32}
                        alt={item.name}
                        className={style['my-wallet-table__tbody__icon']}
                      />
                      <div className={style['my-wallet-table__crypto']}>
                        <span className={style['my-wallet-table__crypto-name']}>
                          {item.name}
                        </span>
                        <span
                          className={style['my-wallet-table__crypto-symbol']}
                        >
                          {item.symbol}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <span>{formatCurrency(item.priceUsd)}</span>
                      <small>
                        {item.quantity} {item.symbol}
                      </small>
                    </div>
                  </td>
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
                    <Tooltip label="Transfer Crypto" side="bottom">
                      <button
                        className={style.trade__button}
                        onClick={() =>
                          handleOpenDialog(
                            { type: 'transferCrypto' },
                            { crypto: item },
                          )
                        }
                      >
                        <TradeIcon />
                      </button>
                    </Tooltip>
                  </td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>
    </div>
  )
}
