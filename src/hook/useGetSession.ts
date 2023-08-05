import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/axios'

export interface IUserSession {
  id: number
  name: string
  email: string
  avatar_url: string
}

export async function getUserSession(): Promise<IUserSession> {
  const { data } = await api.get(`/session/1`)
  return data
}

export function useGetUserSession(initialData?: IUserSession) {
  return useQuery({
    queryKey: ['session'],
    queryFn: () => getUserSession(),
    staleTime: 1000 * 60, // 1 minute,
    initialData,
  })
}
