import Image from 'next/image'
import style from './styles.module.css'

interface ICard {
  iconUri: string
  title: string
  subtitle: string
  description: string
}

export function Card({ iconUri, title, subtitle, description }: ICard) {
  return (
    <div className={style.card}>
      <Image src={iconUri} width={64} height={64} alt={title} />
      <div>
        <span className={style.card__subtitle}>{subtitle}</span>
        <h4 className={style.card__title}>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  )
}
