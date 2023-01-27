

import React, { useEffect, useState } from 'react'
import Head from "next/head"
import Footer from '../../../components/common/Footer/Footer'
import NewPasswordSection from '../../../components/auth/NewPassword/NewPasswordSection'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const NewPassword = () => {
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
     <Head>
        <title>Walima | New Password</title>
        <meta name="description" />
      </Head>
      <div className='auth-bg'>
      {!isMobile && <img src='/img/auth/auth-bg.png' className='bg-img' alt='bg-image'></img>}
    <NewPasswordSection/>
    </div>
    <Footer/>
    </>
  )
}

export default NewPassword
export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ["common"])),
		},
	}
}