import { DashboardFooter } from '@/components/Dashboard/Footer'
import { DashboardHeader } from '@/components/Dashboard/Header'
import { DashboardSideBar } from '@/components/Dashboard/Sidebar'

import { SidebarContextProvider } from '@/contexts/SidebarContext'
import { useGetUserSession } from '@/hook/useGetSession'
import { ReactNode } from 'react'
import style from './styles.module.css'

interface ILayout {
  children: ReactNode
}

export default function Layout({ children }: ILayout) {
  const { data } = useGetUserSession()

  if (!data) {
    return null
  }

  return (
    <>
      <SidebarContextProvider>
        <DashboardHeader name={data?.name} avatarUrl={data?.avatar_url} />
        <div className={style.wrapper}>
          <DashboardSideBar />
          <section className={style.main}>{children}</section>
        </div>
        <DashboardFooter />
      </SidebarContextProvider>
    </>
  )
}
