import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ICryptoInWallet } from '@/hook/useGetMyWallet'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatPercentage } from '@/utils/formatPercentage'
import { isPositive } from '@/utils/isPositive'
import style from './styles.module.css'

interface ICoinCarrouselProps {
  data: ICryptoInWallet[]
}

export function CoinCarrousel({ data }: ICoinCarrouselProps) {
  return (
    <Swiper
      spaceBetween={24}
      speed={5000}
      loop={true}
      autoplay={{
        delay: 1,
        disableOnInteraction: false,
      }}
      slidesPerView={'auto'}
      modules={[Autoplay]}
    >
      {data.map((item) => {
        return (
          <SwiperSlide key={item.id} className={style.coin}>
            <span className={style.coin__symbol}>{item.symbol}</span>
            <span>{formatCurrency(item.priceUsd)}</span>
            <span
              className={
                isPositive(item.changePercent24Hr)
                  ? style['coin__change--positive']
                  : style['coin__change--negative']
              }
            >
              {formatPercentage(item.changePercent24Hr)}%
            </span>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
