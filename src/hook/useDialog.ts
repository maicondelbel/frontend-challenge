import { DialogContext } from '@/contexts/DialogContext'
import { useContext } from 'react'

export function useDialog() {
  const value = useContext(DialogContext)

  return value
}
