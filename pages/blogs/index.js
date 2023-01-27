
import Head from "next/head"
import React, { useEffect, useState } from 'react'
import BlogsSectionCards from '../../components/blogs/BlogsSectionCards/BlogsSectionCards'
// import BlogsSection from '../../components/blogs/BlogsSection/BlogsSection'
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getData } from "../../components/api_baseURL";
import OverviewSection from '../../components/blogs/OverviewSection/OverviewSection'
import Footer from "../../components/common/Footer/Footer"
import LoaderSection from "../../components/common/LoaderSection/LoaderSection";
import { useRouter } from "next/router";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next"
const Blogs = () => {
  let { t } = useTranslation("common")
  const { locale, asPath } = useRouter()
  const [blogsPageData, setBlogsPageData] = useState()
  const [topicsData, setTopicsData] = useState()
  const [isMobile, setMobile] = useState(false);
  const isMobileHandler = (e) => {
    setMobile(e.matches)
  }
  useEffect(() => {
    window.matchMedia(`(max-width : 1024px)`).addEventListener("change", isMobileHandler)
    setMobile(window.matchMedia(`(max-width : 1024px)`).matches)
  }, [])
  const blogsPage = 'blog-page'
  const topics = 'topics'
  const topicsQuery = useQuery(['topics', locale], () => getData(locale, topics))
  const { data, isSuccess, isLoading, isError } = useQuery(['blog-page', locale], () => getData(locale, blogsPage))
  useEffect(() => {
    isSuccess && setBlogsPageData(data)
  }, [data, isSuccess])
  useEffect(() => {
    topicsQuery.isSuccess && setTopicsData(topicsQuery.data)
  }, [topicsQuery.data, topicsQuery.isSuccess])
  // if (isLoading) {
  //   return (
  //     <LoaderSection />
  //   )
  // }
  // if ((isError)) {
  //   return (
  //     <div className={`loader-container `}>
  //       <div className={`lyr 
  //   ${asPath == '/products' && 'bg-products'}
  //     ${asPath.includes('products/') && !asPath.includes('products/category/') && !asPath.includes('products/search') ? 'bg-product-detail' : ""}
  //     ${asPath == "/" && 'bg-home'} `}
  //       >
  //          <h1 className="text-light">{`${t('network_error.check')}`}</h1>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <>
      <Head>
        <title>{t('head.website_title')} | {t('head.blogs')}</title>
        <meta name="description" />
      </Head>
      <OverviewSection blogPage topics={topicsData} mainTitle={blogsPageData?.MainTitle} mainBlogs={blogsPageData?.MainBlogs} />
      <BlogsSectionCards topics={topicsData} blogsSection={blogsPageData?.BlogsSection} />
      <Footer />
    </>

  )
}

export default Blogs

export async function getServerSideProps({ locale }) {
  const queryClient = new QueryClient()
  const BlogsPage = 'blog-page'
  const topics = 'topics'
  await queryClient.prefetchQuery(['topics', locale], () => getData(locale, topics))
  await queryClient.prefetchQuery(['blog-page', locale], () => getData(locale, BlogsPage))
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}
