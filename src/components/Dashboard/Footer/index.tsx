import Image from 'next/image'

import Logo from '@/assets/logo.svg'

import style from './styles.module.css'

export function DashboardFooter() {
  return (
    <footer className={style.footer}>
      <p>Copyright © 2022 - All rights reserved</p>
      <Image src={Logo} width={95} height={16} alt="CoinSynch Logo" />
    </footer>
  )
}
