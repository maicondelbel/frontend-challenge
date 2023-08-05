import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'

import '@/styles/globals.css'

import { DialogContextProvider } from '@/contexts/DialogContext'
import { queryClient } from '@/lib/reactQuery'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] })

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <main className={`${roboto.className}`}>
      <QueryClientProvider client={queryClient}>
        <DialogContextProvider>
          {getLayout(<Component {...pageProps} />)}
          <ReactQueryDevtools initialIsOpen />
        </DialogContextProvider>
      </QueryClientProvider>
    </main>
  )
}
