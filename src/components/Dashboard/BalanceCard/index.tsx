import Image from 'next/image'

import BalanceIcon from '@/assets/icons/balance.svg'
import style from './styles.module.css'

interface IBalanceCardProps {
  amount: string | undefined
}

export function BalanceCard({ amount }: IBalanceCardProps) {
  return (
    <div className={style.card}>
      <div className={style.card__left}>
        <Image src={BalanceIcon} alt="Balance icon" />
        <div className={style.card__desc}>
          <h4>Balance in US$</h4>
          <p>(approximately)</p>
        </div>
      </div>
      <div className={style.card__right}>
        <h3>{amount}</h3>
      </div>
    </div>
  )
}
