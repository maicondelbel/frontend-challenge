import { useSidebar } from '@/hook/useSidebar'
import Image from 'next/image'
import Link from 'next/link'
import { Tooltip } from '../Tooltip'

import Bitcoin from '@/assets/icons/bitcoin.svg'
import Chart from '@/assets/icons/chart.svg'
import CurrencyIcon from '@/assets/icons/currency.svg'
import HideSidebar from '@/assets/icons/hide-menu.svg'
import WalletIcon from '@/assets/icons/wallet.svg'

import style from './style.module.css'

const MENU_ITEMS = [
  {
    link: '/dashboard',
    label: 'My Wallet',
    icon: WalletIcon,
  },
  {
    link: '/hello-world',
    label: 'Lorem Ipsum',
    icon: CurrencyIcon,
  },
  {
    link: '/hello-world',
    label: 'Lorem Ipsum',
    icon: Bitcoin,
  },
  {
    link: '/hello-world',
    label: 'Lorem Ipsum',
    icon: Chart,
  },
]

export function DashboardSideBar() {
  const { openSidebar, handleOpenSidebar } = useSidebar()

  return (
    <>
      <aside className={`${style.aside} ${openSidebar && style.show}`}>
        <nav className={style.nav}>
          <ul className={style.nav__ul}>
            {MENU_ITEMS.map((item, index) => {
              return (
                <li className={style.nav__li} key={index}>
                  {openSidebar ? (
                    <Link href={item.link}>
                      <>
                        <Image src={item.icon} alt={item.label} />
                        <span className={style.nav__li__label}>
                          {item.label}
                        </span>
                      </>
                    </Link>
                  ) : (
                    <Tooltip label={item.label} side="right">
                      <Link href={item.link}>
                        <>
                          <Image src={item.icon} alt={item.label} />
                          <span className={style.nav__li__label}>
                            My Wallet
                          </span>
                        </>
                      </Link>
                    </Tooltip>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
        <button
          onClick={handleOpenSidebar}
          className={style.hide__sidebar__button}
        >
          <Image src={HideSidebar} alt="Hide Sidebar" />
        </button>
      </aside>
      {openSidebar && (
        <div className={style.dialog__overlay} onClick={handleOpenSidebar} />
      )}
    </>
  )
}
