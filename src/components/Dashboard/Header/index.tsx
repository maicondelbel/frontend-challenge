/* eslint-disable camelcase */
import { ArrowDownIcon } from '@/components/Icons/ArrowDownIcon'
import { MenuIcon } from '@/components/Icons/MenuIcon'
import { useSidebar } from '@/hook/useSidebar'
import Image from 'next/image'
import { Avatar } from '../Avatar'
import { ProfilePopover } from '../ProfilePopover'

import Logo from '@/assets/logo.svg'

import style from './styles.module.css'

interface IDashboardHeader {
  name: string
  avatarUrl: string
}

export function DashboardHeader({ name, avatarUrl }: IDashboardHeader) {
  const { handleOpenSidebar } = useSidebar()

  return (
    <header className={style.header}>
      <div className={style.mobile__menu}>
        <button onClick={handleOpenSidebar}>
          <MenuIcon />
        </button>
      </div>
      <Image
        src={Logo}
        width={124}
        height={21}
        alt="CoinSynch Logo"
        className={style.header__logo}
      />
      <ProfilePopover>
        <div className={style.header__profile}>
          <Avatar name="Teste" src={avatarUrl} />
          <span className={style.profile__name}>{name}</span>
          <ArrowDownIcon fill="#ACABB7" width={8} height={8} />
        </div>
      </ProfilePopover>
    </header>
  )
}
