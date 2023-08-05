import { ButtonHTMLAttributes } from 'react'
import { PlusIcon } from '../../Icons/PlusIcon'

import { MinusIcon } from '../../Icons/MinusIcon'
import style from './styles.module.css'

interface IViewMoreButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  numOfItem: number
}

const LIMIT = 5 // Itens a serem mostrados

export function ViewMoreButton({
  numOfItem = 0,
  ...props
}: IViewMoreButtonProps) {
  return (
    <button className={style['view-more-btn']} {...props}>
      {numOfItem > LIMIT ? 'View less' : 'View more'}
      {numOfItem > LIMIT ? <MinusIcon /> : <PlusIcon />}
    </button>
  )
}
