import { SVGProps } from 'react'

export function ArrowUpIcon({
  fill = '#FFCD82',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.445 13.4408C22.7051 14.1864 21.5054 14.1864 20.7655 13.4408L12 4.60895L3.23452 13.4408C2.49458 14.1864 1.2949 14.1864 0.554958 13.4408C-0.184984 12.6953 -0.184984 11.4865 0.554958 10.741L10.6602 0.559161C11.4002 -0.186385 12.5998 -0.186385 13.3398 0.559161L23.445 10.741C24.185 11.4865 24.185 12.6953 23.445 13.4408Z"
        fill={fill}
      />
    </svg>
  )
}
