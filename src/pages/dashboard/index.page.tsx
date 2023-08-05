/* eslint-disable @typescript-eslint/no-unused-vars */
import Layout from '@/layouts'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { ReactElement, useEffect, useState } from 'react'
import { NextPageWithLayout } from '../_app.page'

import Image from 'next/image'

import { getAllCryptos } from '@/hook/useGetAllCrypto'
import {
  ICryptoInWallet,
  getMyWallet,
  useGetMyWallet,
} from '@/hook/useGetMyWallet'
import { queryClient } from '@/lib/reactQuery'

import { AdvCard } from '@/components/Dashboard/AdvCard'
import { BalanceCard } from '@/components/Dashboard/BalanceCard'
import { DailyVariationCard } from '@/components/Dashboard/DailyVariationCard'
import { EmptyWallet } from '@/components/Dashboard/EmptyWallet'
import { Loading } from '@/components/Dashboard/Loading'
import { MyWalletCards } from '@/components/Dashboard/MyWalletCards'
import { MyWalletTable } from '@/components/Dashboard/MyWalletTable'
import { PlusIcon } from '@/components/Icons/PlusIcon'
import { Button } from '@/components/UI/Button'
import { Dialogs } from '@/components/UI/Dialogs'
import { useDialog } from '@/hook/useDialog'
import Head from 'next/head'
import WalletIcon from '../../assets/icons/wallet.svg'
import style from './styles.module.css'

const Dashboard: NextPageWithLayout = (
  { ...props }: InferGetServerSidePropsType<typeof getServerSideProps>,
  _,
) => {
  const { handleOpenDialog } = useDialog()
  const {
    data: MyWalletData,
    isLoading: isLoadingMyWallet,
    isFetching: isFetchingMyWallet,
  } = useGetMyWallet(props.initialWallet)
  const [amount, setAmount] = useState<string | undefined>('')
  const [myWallet, setMyWallet] = useState<ICryptoInWallet[] | undefined>([])
  const [isMounted, setIsMounted] = useState(false)

  // Prefetch dos dados que vão ser usados no Dialog "Add Crypto"
  async function handlePrefetchCryptos() {
    await queryClient.prefetchQuery({
      queryKey: ['cryptos'],
      queryFn: () => getAllCryptos(),
    })
  }

  // Soma dos valores e conversão dos dados da "Minha Carteira"
  useEffect(() => {
    const amount = MyWalletData?.map((item) => {
      return item.quantity * parseFloat(item.priceUsd)
    })
      .reduce((acc, val) => acc + val, 0)
      .toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })

    setAmount(amount)
    setMyWallet(MyWalletData)
    setIsMounted(true)
  }, [MyWalletData, myWallet])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <Head>
        <title>CoinSynch | Dashboard</title>
      </Head>

      <div>
        <div className={style.cards__wrapper}>
          <BalanceCard amount={amount} />
          <DailyVariationCard />
          <AdvCard />
        </div>
        <section className={style['main-section']}>
          <header className={style['main-section__header']}>
            <div className={style['main-section__header__title']}>
              <Image src={WalletIcon} alt="Wallet Icon" />
              <h1>My Wallet</h1>
            </div>
            <Button
              variant="primary"
              size="sm"
              onMouseEnter={handlePrefetchCryptos}
              onClick={() => handleOpenDialog({ type: 'addCrypto' })}
            >
              <PlusIcon fill="#FFFFFF" />
              Add crypto
            </Button>
          </header>
          <div className={style['main-section__body']}>
            {isFetchingMyWallet && <Loading />}
            {isLoadingMyWallet ? (
              <Loading />
            ) : myWallet?.length === 0 ? (
              <EmptyWallet />
            ) : (
              <>
                <MyWalletTable data={myWallet} />
                <MyWalletCards data={myWallet} />
              </>
            )}
          </div>
        </section>
        <Dialogs />
      </div>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async () => {
  const initialWallet = await getMyWallet()

  return {
    props: { initialWallet },
  }
}

export default Dashboard
