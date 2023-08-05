import { useGetDailyCryptoVariation } from '@/hook/useGetDailyCryptoVariation'
import { formatPercentage } from '@/utils/formatPercentage'
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LineElement,
  LinearScale,
  PointElement,
} from 'chart.js'
import Image from 'next/image'
import { Line } from 'react-chartjs-2'
import { Loading } from '../Loading'
import style from './styles.module.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler)

export function DailyVariationCard() {
  const { data, isLoading } = useGetDailyCryptoVariation()

  // Objetos de configuração do Gráfico
  const chartOptions = { responsive: true }
  const chartData = {
    labels: data?.assetHistories.map((item) =>
      new Date(item.date).getMinutes(),
    ),
    datasets: [
      {
        data: data?.assetHistories.map((item) => item.priceUsd),
        backgroundColor: '#FBAB34',
        borderColor: '#FBAB34',
      },
    ],
  }

  return (
    <div className={style.card}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={style.card__left}>
            <div className={style.card__desc}>
              <h4>Daily Variation</h4>
              <div className={style.card__desc__wrapper}>
                <div className={style.card__desc__coin}>
                  <Image
                    src={`https://assets.coincap.io/assets/icons/eth@2x.png`}
                    width={24}
                    height={24}
                    alt="icon"
                  />
                  <span>{data?.asset.symbol}</span>
                </div>
                <span className={style.card__desc__change}>
                  {formatPercentage(data?.asset.changePercent24Hr)}%
                </span>
              </div>
            </div>
          </div>
          <div className={style.card__right}>
            <Line options={chartOptions} data={chartData} />
          </div>
        </>
      )}
    </div>
  )
}
