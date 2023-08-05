import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/axios'
import { ICryptoInWallet } from './useGetMyWallet'

export interface ICrypto {
  id: string
  name: string
  symbol: string
  logo: string
}

// Cotação das cryptos limitida a 10
export async function getAllCryptos(): Promise<ICryptoInWallet[]> {
  const { data } = await api.post('https://graphql.coincap.io/', {
    variables: {
      direction: 'ASC',
      first: 10,
      sort: 'rank',
    },
    query: `query ($after: String, $before: String, $direction: SortDirection, $first: Int, $last: Int, $sort: AssetSortInput) {
              assets(after: $after before: $before  direction: $direction first: $first last: $last sort: $sort) { 
                edges { 
                  node { 
                    changePercent24Hr
                    name
                    id
                    logo
                    priceUsd
                    symbol
                  } 
                }
              }
            }`,
  })

  const result = data.data.assets.edges.map(
    (item: { node: ICryptoInWallet }) => item.node,
  )
  return result
}

export function useGetAllCryptos(initialData?: ICryptoInWallet[]) {
  return useQuery({
    queryKey: ['cryptos'],
    queryFn: () => getAllCryptos(),
    staleTime: 1000 * 60, // 1 minute,
    initialData,
  })
}
