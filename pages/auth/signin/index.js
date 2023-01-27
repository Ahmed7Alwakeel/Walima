
import React, { useEffect, useState } from 'react'
import Head from "next/head"
import Footer from '../../../components/common/Footer/Footer'
import SignInSection from '../../../components/auth/SignInSection/SignInSection'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';

const SignIn = () => {
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
        title={`${t('head.website_title')} | ${t('head.sign_in')}`}
        description={'Sign in to Walima'}
      />
    <div className='auth-bg'>
      {!isMobile && <img src='/img/auth/auth-bg.png' className='bg-img' alt='bg-image'></img>}
      <SignInSection animate/>
    </div>
    <Footer/>
    </>
  )
}

export default SignIn

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ["common"])),
		},
	}
}