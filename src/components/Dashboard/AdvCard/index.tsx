import Image from 'next/image'
import Link from 'next/link'

import Eduphants from '@/assets/images/Eduphants.png'
import style from './styles.module.css'

export function AdvCard() {
  return (
    <div className={style.card}>
      <div className={style.card__left}>
        <div className={style.card__desc}>
          <h4>NFT’s NEWS</h4>
          <p>New ElephantX NFT to be lauched!</p>
          <Link href={'#'}>Read more +</Link>
        </div>
      </div>
      <div className={style.card__right}>
        <Image src={Eduphants} alt="Eduphants Image" priority />
      </div>
    </div>
  )
}
