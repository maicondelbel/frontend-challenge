import { SidebarContext } from '@/contexts/SidebarContext'
import { useContext } from 'react'

export function useSidebar() {
  const value = useContext(SidebarContext)

  return value
}
