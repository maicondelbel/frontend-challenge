import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/axios'

export interface ICryptoInWallet {
  id: number
  name: string
  symbol: string
  logo: string
  priceUsd: string
  changePercent24Hr: string
  quantity: number
}

export async function getMyWallet(): Promise<ICryptoInWallet[]> {
  const { data } = await api.get(`/my_wallet`)
  return data
}

export function useGetMyWallet(initialData?: ICryptoInWallet[]) {
  return useQuery({
    queryKey: ['wallet'],
    queryFn: () => getMyWallet(),
    staleTime: 1000 * 60, // 1 minute,
    initialData,
  })
}
