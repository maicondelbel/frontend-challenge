import { subtractMinutesFromDateTime } from '@/utils/subtractMinutes'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/axios'

interface IGetDailyCryptoVariation {
  assetHistories: {
    priceUsd: string
    timestamp: number
    date: string
  }[]
  asset: {
    changePercent24Hr: string
    name: string
    symbol: string
    logo: string
  }
}

// Variação da crypto "Ethereum" nos últimos 20 minutos
export async function getDailyCryptoVariation(): Promise<IGetDailyCryptoVariation> {
  const currentDateTime = new Date()
  const startTime = subtractMinutesFromDateTime(currentDateTime, 20) // 20 minutes
  const endTime = new Date().getTime()

  const { data: result } = await api.post('https://graphql.coincap.io/', {
    variables: {
      interval: 'm5',
      start: startTime,
      end: endTime,
      id: 'ethereum',
    },
    query: `query ($id: ID!, $interval: Interval!, $start: Date, $end: Date) { 
              assetHistories(assetId: $id, interval: $interval, start: $start, end: $end) {
                priceUsd timestamp date } 
                asset(id: $id) { 
                  changePercent24Hr name symbol logo
                }
          }`,
  })

  return result.data || []
}

export function useGetDailyCryptoVariation(
  initialData?: IGetDailyCryptoVariation,
) {
  return useQuery({
    queryKey: ['dailyCryptoVariation'],
    queryFn: () => getDailyCryptoVariation(),
    staleTime: 1000 * 60, // 1 minute,
    initialData,
  })
}
