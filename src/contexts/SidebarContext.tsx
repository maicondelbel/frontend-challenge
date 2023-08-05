import { ReactNode, createContext, useState } from 'react'

// Context API responsável por abrir o "Sidebar" do dashboard

interface ISidebarContextProps {
  openSidebar: boolean
  handleOpenSidebar: () => void
  setOpenSidebar: (state: boolean) => void
}

interface ISidebarContextProviderProps {
  children: ReactNode
}

export const SidebarContext = createContext({} as ISidebarContextProps)

export function SidebarContextProvider({
  children,
}: ISidebarContextProviderProps) {
  const [openSidebar, setOpenSidebar] = useState(false)

  function handleOpenSidebar() {
    console.log('aqui hein')
    setOpenSidebar(!openSidebar)
  }

  return (
    <SidebarContext.Provider
      value={{ openSidebar, handleOpenSidebar, setOpenSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
