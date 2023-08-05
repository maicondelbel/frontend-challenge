import { HTMLAttributes } from 'react'
import styles from './styles.module.css'

interface IBadge extends HTMLAttributes<HTMLUListElement> {
  titles: string[]
}

export function Badge({ titles, ...props }: IBadge) {
  return (
    <ul className={styles['badge-list']} {...props}>
      {titles.map((title, index) => {
        return (
          <li key={index} className={styles['badge-list__item']}>
            {title}
          </li>
        )
      })}
    </ul>
  )
}
