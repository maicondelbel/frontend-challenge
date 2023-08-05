import { ArrowRightIcon } from '@/components/Icons/ArrowRightIcon'
import { AccordionCrypto } from '@/components/LandingPage/AccordionCrypto'
import { Badge } from '@/components/LandingPage/Badge'
import { Card } from '@/components/LandingPage/Card'
import { Header } from '@/components/LandingPage/Header'
import { NewsletterForm } from '@/components/LandingPage/NewsletterForm'
import { TopCryptosTable } from '@/components/LandingPage/TopCryptosTable'
import { Button } from '@/components/UI/Button'
import { Dialogs } from '@/components/UI/Dialogs'
import { useDialog } from '@/hook/useDialog'
import { getAllCryptos } from '@/hook/useGetAllCrypto'
import { ICryptoInWallet } from '@/hook/useGetMyWallet'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import style from './style.module.css'

import Logo from '@/assets/logo.svg'

import Image01 from '@/assets/images/carousel-item-01.png'
import Image02 from '@/assets/images/carousel-item-02.png'
import Image03 from '@/assets/images/carousel-item-03.png'

import ABoutUsIcon01 from '@/assets/icons/bitcoin.svg'
import ABoutUsIcon03 from '@/assets/icons/chart.svg'
import ABoutUsIcon02 from '@/assets/icons/currency.svg'
import ABoutUsIcon04 from '@/assets/icons/laptop.svg'

export default function Home({
  cryptosData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { handleOpenDialog } = useDialog()

  return (
    <>
      <Head>
        <title>CoinSynch | Welcome</title>
      </Head>
      <Header coinCarrouselData={cryptosData} />
      <section id="home" className={style.hero}>
        <div className={`${style.hero__inner} ${style.container}`}>
          <div className={style.hero__inner__left}>
            <h1 className={style.hero__heading}>
              Lorem ipsum dolor sit amet, consectetur
            </h1>
            <p className={style.hero__paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
              aliquam, purus sit amet luctus venenatis, lectus magna fringilla
              urna, porttitor
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={() => handleOpenDialog({ type: 'signUp' })}
            >
              SIGN UP NOW
              <ArrowRightIcon />
            </Button>
            <Badge titles={['Cryptos', 'NFTs', 'Games']} />
          </div>
          <div className={style.hero__inner__right}>
            <Swiper
              loop={true}
              speed={1000}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              spaceBetween={10}
              slidesPerView={1}
              modules={[Autoplay]}
            >
              <SwiperSlide>
                <Image
                  src={Image01}
                  alt="Woman looking at tablet"
                  className={style.hero__carrousel__image}
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={Image02}
                  alt="Men looking at smartphone"
                  className={style.hero__carrousel__image}
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src={Image03}
                  alt="Woman looking at tablet in greyscale"
                  className={style.hero__carrousel__image}
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className={style.waves}></div>
      </section>
      <section id="about-us" className={style['about-us']}>
        <div className={`${style['about-us__inner']} ${style.container}`}>
          <div className={style['about-us__inner__left']}>
            <div className={style['about-us__carrousel']}>
              <Swiper
                loop={true}
                spaceBetween={16}
                slidesPerView={1.3}
                grabCursor={true}
                wrapperClass={style['about-us__carrousel__wrapper']}
              >
                <SwiperSlide>
                  <Card
                    iconUri={ABoutUsIcon01}
                    subtitle="For your company"
                    title="Crypto Solutions"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, "
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Card
                    iconUri={ABoutUsIcon02}
                    subtitle="For your company"
                    title="Crypto Solutions"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, "
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Card
                    iconUri={ABoutUsIcon03}
                    subtitle="For your company"
                    title="Crypto Solutions"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, "
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Card
                    iconUri={ABoutUsIcon04}
                    subtitle="For your company"
                    title="Crypto Solutions"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, "
                  />
                </SwiperSlide>
              </Swiper>
            </div>
            <div className={style['inner__left__first-row']}>
              <Card
                iconUri={ABoutUsIcon01}
                subtitle="For your company"
                title="Crypto Solutions"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, "
              />
              <Card
                iconUri={ABoutUsIcon02}
                subtitle="For your company"
                title="Crypto Solutions"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, "
              />
            </div>
            <div className={style['inner__left__second-row']}>
              <Card
                iconUri={ABoutUsIcon03}
                subtitle="For your company"
                title="Crypto Solutions"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, "
              />
              <Card
                iconUri={ABoutUsIcon04}
                subtitle="For your company"
                title="Crypto Solutions"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, "
              />
            </div>
          </div>
          <div className={style['about-us__inner__right']}>
            <h5 className={style['about-us__subheading']}>Lorem ipsum</h5>
            <h2 className={style['about-us__heading']}>Lorem ipsum </h2>
            <p className={style['about-us__paragraph']}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
              aliquam, purus sit amet luctus venenatis, lectus magna fringilla
              urna, porttitor
            </p>
            <Button
              size="md"
              variant="primary"
              style={{ maxWidth: '17.6rem' }}
              onClick={() => handleOpenDialog({ type: 'signUp' })}
            >
              Sign up now
            </Button>
          </div>
        </div>
      </section>
      <section id="top-cryptos" className={style['top-cryptos']}>
        <div className={`${style['top-cryptos__inner']} ${style.container}`}>
          <h3>Top Cryptos</h3>
          <AccordionCrypto data={cryptosData} />
          <TopCryptosTable data={cryptosData} />
        </div>
      </section>
      <section className={style.newsletter}>
        <div className={`${style.newsletter__inner} ${style.container}`}>
          <div className={style.newsletter__inner__left}>
            <h4 className={style.newsletter__subheading}>Lorem ipsum</h4>
            <h2 className={style.newsletter__heading}>Lorem ipsum</h2>
            <p className={style.newsletter__paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
              aliquam, purus sit amet luctus venenatis, lectus magna fringilla
              urna, porttitor
            </p>
          </div>
          <div className={style.newsletter__inner__right}>
            <NewsletterForm />
          </div>
        </div>
      </section>
      <footer className={style.footer}>
        <div className={`${style.footer_inner} ${style.container}`}>
          <p>Copyright © 2022 - All rights reserved</p>
          <Image src={Logo} width={95} height={16} alt="Logo"></Image>
        </div>
      </footer>
      <Dialogs />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{
  cryptosData: ICryptoInWallet[]
}> = async () => {
  // Carrega as informações da API pelo Server Side para que a pagina já carrega com as mesmas
  const result = await getAllCryptos()

  return {
    props: { cryptosData: result || [] },
  }
}
