
import React, { useEffect, useState } from 'react'
import Head from "next/head"
import Footer from '../../../components/common/Footer/Footer'
import SignUpSection from '../../../components/auth/SignUpSection/SignUpSection'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';

const SignUp = () => {
  const { t } = useTranslation('common');
  const [isMobile, setMobile] = useState(false)
  const isMobileHandler = (e) => {
    setMobile(e.matches)
  }
  useEffect(() => {
    window.matchMedia(`(max-width : 1024px)`).addEventListener("change", isMobileHandler)
    setMobile(window.matchMedia(`(max-width : 1024px)`).matches)
  }, [])
  return (
    <>
    <NextSeo
        title={`${t('head.website_title')} | ${t('head.sign_up')}`}
        description={'Walima Sign Up Page'}
      />
      <div className='auth-bg'>
        {/* {!isMobile && <img src='/img/auth/auth-bg.png' className='bg-img'></img>} */}
        <SignUpSection />
      </div>

      <Footer />
    </>
  )
}

export default SignUp

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}