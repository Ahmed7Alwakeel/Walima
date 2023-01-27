import React, { useState, useEffect } from "react"
import Head from "next/head"
import Footer from "../../components/common/Footer/Footer"
import OverviewSection from '../../components/about/OverviewSection/OverviewSection'
import ClaimsSection from '../../components/about/ClaimsSection/ClaimsSection'
import WhoWeSection from '../../components/about/WhoWeSection/WhoWeSection'
import MissionSection from '../../components/about/MissionSection/MissionSection'
import { getData } from '../../components/api_baseURL';
import { useRouter } from "next/router"
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next"
import LoaderSection from "../../components/common/LoaderSection/LoaderSection"
import { NextSeo } from "next-seo"

const About = () => {
  const page = 'about'
  const { locale } = useRouter()
  const { data, isSuccess, isLoading, isError } = useQuery(['about', locale], () => getData(locale, page))
  const [isMobile, setMobile] = useState(false)
  const [aboutData, setAboutData] = useState();
  const { t } = useTranslation('common');
  const isMobileHandler = (e) => {
    setMobile(e.matches)
  }
  useEffect(() => {
    window.matchMedia(`(max-width : 1024px)`).addEventListener("change", isMobileHandler)
    setMobile(window.matchMedia(`(max-width : 1024px)`).matches)
  }, [])
  useEffect(() => {
    if (isSuccess) {
      setAboutData(data)
    }
  }, [data, isSuccess])
  if (isLoading) {
    return (
      <LoaderSection />
    )
  }
  if ((isError)) {
    return (
      <div className={`loader-container `}>
        <div className={`lyr`}
        >
          <h1 className="text-light">{`${t('network_error.check')}`}</h1>
        </div>
      </div>
    )
  }
  return (
    <>
      <NextSeo
        title={`${t('head.website_title')} | ${t('head.about')}`}
        description={'About Walima Page'}
      />
      <div className="overview-whoWe-about-us-bg">
        {/* {!isMobile && <img src='/img/about/about-us-bg.png' className='bg-img'></img>} */}
        <OverviewSection overviewData={aboutData} />
        <WhoWeSection whoData={aboutData?.WhoWeAre} />
      </div>
      <MissionSection missionData={aboutData?.Mission} />
      <ClaimsSection aboutPage claimsData={aboutData?.CleanLabelClaims} />
      <Footer />
    </>

  )
}

export default About

export async function getServerSideProps({ locale }) {

  const queryClient = new QueryClient()
  const page = 'about'
  await queryClient.prefetchQuery(['about', locale], () => getData(locale, page))
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}