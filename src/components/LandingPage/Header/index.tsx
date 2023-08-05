import { useDialog } from '@/hook/useDialog'
import { ICryptoInWallet } from '@/hook/useGetMyWallet'
import Image from 'next/image'
import Link from 'next/link'
import { MenuIcon } from '../../Icons/MenuIcon'
import { Button } from '../../UI/Button'
import { CoinCarrousel } from '../CoinCarrousel'

import Logo from '@/assets/logo.svg'
import style from './styles.module.css'

interface IHeaderProps {
  coinCarrouselData: ICryptoInWallet[]
}

export function Header({ coinCarrouselData }: IHeaderProps) {
  const { handleOpenDialog } = useDialog()

  return (
    <header className={style.header}>
      <div className={style.header__inner}>
        <div className={style.header__inner__left}>
          <Link href={'#home'} className={style.logo__link}>
            <Image src={Logo} width={124} height={21} alt="CoinSynch Logo" />
          </Link>
          <nav className={style.nav}>
            <ul className={style.nav__ul}>
              <li className={style.nav__li}>
                <Link href={'#about-us'}>About us</Link>
              </li>
              <li className={style.nav__li}>
                <Link href={'#top-cryptos'}>Top Cryptos</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={style.header__inner__right}>
          <div className={style['header__inner__right__coin-carrousel']}>
            <CoinCarrousel data={coinCarrouselData} />
          </div>
          <div className={style.header__buttons__wrapper}>
            <Button onClick={() => handleOpenDialog({ type: 'signIn' })}>
              Sign in
            </Button>
            <Button
              onClick={() => handleOpenDialog({ type: 'signUp' })}
              variant="primary"
            >
              Sign up
            </Button>
          </div>
        </div>
        <div className={style['header__menu-mobile']}>
          <MenuIcon />
        </div>
      </div>
      <div className={style['header__coin-carrousel']}>
        <CoinCarrousel data={coinCarrouselData} />
      </div>
    </header>
  )
}
