import * as AvatarPrimitive from '@radix-ui/react-avatar'

import style from './style.module.css'

interface IAvatarProps extends AvatarPrimitive.AvatarImageProps {
  name: string | undefined
}

export function Avatar({ name, ...props }: IAvatarProps) {
  return (
    <AvatarPrimitive.Root className={style.avatar}>
      <AvatarPrimitive.Image
        {...props}
        alt={name}
        className={style.avatar__image}
      />
      <AvatarPrimitive.Fallback delayMs={600}>JD</AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
}
