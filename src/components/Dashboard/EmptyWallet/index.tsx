import Image from 'next/image'

import EmptyWalletIcon from '@/assets/icons/empty-wallet.svg'
import style from './styles.module.css'

export function EmptyWallet() {
  return (
    <div className={style['empty-wallet__wrapper']}>
      <Image src={EmptyWalletIcon} alt="Empty Wallet" />
      <h5>Nothing here yet...</h5>
      <p>Add a crypto and start earning</p>
    </div>
  )
}
