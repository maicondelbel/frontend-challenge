import { SVGProps } from 'react'

export function PlusIcon({
  fill = '#FBAB34',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={12}
      fill="none"
      {...props}
    >
      <path
        fill={fill}
        d="M6.79 1.79a.79.79 0 0 0-1.58 0v3.42H1.79a.79.79 0 0 0 0 1.58h3.42v3.42a.79.79 0 0 0 1.58 0V6.79h3.42a.79.79 0 0 0 0-1.58H6.79V1.79Z"
      />
    </svg>
  )
}
