import { ICryptoInWallet } from '@/hook/useGetMyWallet'
import { ReactNode, createContext, useEffect, useState } from 'react'

// Context API responsável por abrir o "Dialog" especificado
// assim como qual a "crypto" que foi selecionada para futuros eventos

interface IFormType {
  type: 'signIn' | 'signUp' | 'addCrypto' | 'transferCrypto'
}

interface ISelectCrypto {
  crypto: ICryptoInWallet
}

interface IDialogProps {
  openDialog: boolean
  formType: IFormType | undefined
  selectedCrypto: ISelectCrypto | undefined
  setOpenDialog: (state: boolean) => void
  setFormType: (state: IFormType) => void
  setSelectedCrypto: (state: ISelectCrypto) => void
  handleOpenDialog: (type?: IFormType, crypto?: ISelectCrypto) => void
}

interface IDialogContextProviderProps {
  children: ReactNode
}

export const DialogContext = createContext({} as IDialogProps)

export function DialogContextProvider({
  children,
}: IDialogContextProviderProps) {
  const [openDialog, setOpenDialog] = useState(false)
  const [formType, setFormType] = useState<IFormType>()
  const [selectedCrypto, setSelectedCrypto] = useState<ISelectCrypto>()

  function handleOpenDialog(type?: IFormType, crypto?: ISelectCrypto) {
    setOpenDialog(!openDialog)
    if (type) setFormType(type)
    if (crypto) setSelectedCrypto(crypto)
  }

  useEffect(() => {
    if (!openDialog) {
      setFormType(undefined)
      setSelectedCrypto(undefined)
    }
  }, [openDialog])

  return (
    <DialogContext.Provider
      value={{
        selectedCrypto,
        setSelectedCrypto,
        openDialog,
        setOpenDialog,
        handleOpenDialog,
        formType,
        setFormType,
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}
