
import React, { useEffect, useState } from 'react'
import Head from "next/head"
import Footer from "../../components/common/Footer/Footer"
import ContactUs from '../../components/contact/ContactUs'
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getData } from '../../components/api_baseURL';
import { useRouter } from "next/router"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next"
import LoaderSection from '../../components/common/LoaderSection/LoaderSection';
import { NextSeo } from 'next-seo';
const Contact = () => {
  let { t } = useTranslation("common")
  const page='contact-us'
  const {locale}=useRouter()
  const { data,isSuccess,isLoading,isError } = useQuery(['contact-us',locale], ()=>getData(locale,page))
  const [isMobile, setMobile] = useState(false)
  const [contactData,setContactData]=useState()
  const isMobileHandler = (e) => {
      setMobile(e.matches)
  }
  useEffect(() => {
      window.matchMedia(`(max-width : 1024px)`).addEventListener("change", isMobileHandler)
      setMobile(window.matchMedia(`(max-width : 1024px)`).matches)
  }, [])
  useEffect(()=>{
    isSuccess&&setContactData(data)
  },[data,isSuccess])
  if (isLoading) {
    return (
      <LoaderSection/>
    )
  }
  if ((isError)) {
    return (
      <div className={`loader-container `}>
        <div className={`lyr 
    ${asPath == '/products' && 'bg-products'}
      ${asPath.includes('products/') && !asPath.includes('products/category/') && !asPath.includes('products/search') ? 'bg-product-detail' : ""}
      ${asPath == "/" && 'bg-home'} `}
        >
          <h1 className="text-light">{`${t('network_error.check')}`}</h1>
        </div>
      </div>
    )
  }
  return (
    <>
    <NextSeo
        title={`${t('head.website_title')} | ${t('head.contact_us')}`}
        description={'Contact with walima'}
      />
      {/* <div className='contact-us-bg'>
      {!isMobile && <img src='/img/contact-us/contact-us-bg.png' className='bg-img'></img>} */}
      <ContactUs contact={contactData}/>
      {/* </div> */}
      <Footer/>
    </>
 
  )
}

export default Contact

export async function getServerSideProps({locale}) {
  const queryClient = new QueryClient()
  const page='contact-us'
  await queryClient.prefetchQuery(['contact-us',locale], ()=>getData(locale,page))
  return {
    props: {
      dehydratedState:JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}
