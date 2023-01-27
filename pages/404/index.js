
import React from 'react'
import Head from "next/head"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next"
const Index = () => {
    let { t } = useTranslation("common")
    return (
        <>
            <Head>
            <title>{`${t("head.website_title")}`} | {`${t("head.not_found")}`}</title>
                <meta name="description" />
            </Head>
            <div className='not-found text-light'>
                <h3>
                {`${t("head.not_found_text")}`}
                </h3>
                
            </div>
        </>
    )
}

export default Index

export async function getStaticProps({ locale }) {
 
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
      },
    }
  }