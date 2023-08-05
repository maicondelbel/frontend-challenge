import Layout from '@/layouts'
import Head from 'next/head'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app.page'

const HelloWorld: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>CoinSynch | Hello World</title>
      </Head>

      <h1>Hello World! 🌎</h1>
    </>
  )
}

HelloWorld.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default HelloWorld
