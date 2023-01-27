
import React, { useEffect, useState } from 'react'
import Head from "next/head"
import OverviewSection from '../../components/blog/OverviewSection/OverviewSection'
import BlogDetailSection from '../../components/blog/BlogDetailSection/BlogDetailSection'
import TipsSection from '../../components/blog/TipsSection/TipsSection'
import Footer from "../../components/common/Footer/Footer"
import RecipeSection from '../../components/blog/RecipeSection/RecipeSection'
import ProductsSection from '../../components/common/ProductsSection/ProductsSection'
import TipsItems from '../../components/common/TipsItems/TipsItems'
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getData,getDynamicData } from "../../components/api_baseURL";
import { useRouter } from 'next/router'
import LoaderSection from '../../components/common/LoaderSection/LoaderSection'
import { useTranslation } from "next-i18next"

const BlogDetails = ({blogSlug}) => {
  let { t } = useTranslation("common")
  const [isMobile, setMobile] = useState(false)
  const [topicsData, setTopicsData] = useState()
  const isMobileHandler = (e) => {
    setMobile(e.matches)
  }
  useEffect(() => {
    window.matchMedia(`(max-width : 1024px)`).addEventListener("change", isMobileHandler)
    setMobile(window.matchMedia(`(max-width : 1024px)`).matches)
  }, [])
  const { locale,asPath} = useRouter()
  const blogsPage='blog-page'
  const products='products'
  const recipes='recipes'
  const blogs='blogs'
  const topics = 'topics'
  const topicsQuery = useQuery(['topics', locale], () => getData(locale, topics))
  const blogsPageQuery= useQuery(['blog-page',locale], ()=>getData(locale,blogsPage))
  const productsQuery= useQuery(['products',locale], ()=>getData(locale,products))
  const recipesQuery= useQuery(['recipes',locale], ()=>getData(locale,recipes))
  const {data,isSuccess,isLoading,isError}= useQuery(['current-blog',locale], ()=>getDynamicData(locale,blogs,blogSlug))
  const[mainBlog,setMainBlogs]=useState()
  const[productsData,setProductsData]=useState()
  const[recipesData,setRecipesData]=useState()
  const[blogData,setBlogData]=useState()
  useEffect(()=>{
    blogsPageQuery.isSuccess&&setMainBlogs(blogsPageQuery.data?.MainBlogs)
  },[blogsPageQuery.isSuccess,blogsPageQuery.data]) 
   useEffect(()=>{
    productsQuery.isSuccess&&setProductsData(productsQuery.data)
  },[productsQuery.isSuccess,productsQuery.data]) 
   useEffect(()=>{
    recipesQuery.isSuccess&&setRecipesData(recipesQuery.data)
  },[recipesQuery.isSuccess,recipesQuery.data]) 
   useEffect(()=>{
    isSuccess&&setBlogData(data[0])
  },[isSuccess,data])
  useEffect(() => {
    topicsQuery.isSuccess && setTopicsData(topicsQuery.data)
  }, [topicsQuery.data, topicsQuery.isSuccess])
  // if (isLoading||recipesQuery.isLoading||productsQuery.isLoading ||blogsPageQuery.isLoading ) {
  //   return (
  //     <LoaderSection />
  //   )
  // }
  // if (isError||recipesQuery.isError||productsQuery.isError ||blogsPageQuery.isError ) {
  //   return (
  //     <div className='w-100 text-center'>
  //      <div className={`loader-container `}>
  //     <div className={`lyr 
  //   ${asPath == '/products' && 'bg-products'}
  //     ${asPath.includes('products/') && !asPath.includes('products/category/') && !asPath.includes('products/search') ? 'bg-product-detail' : ""}
  //     ${asPath == "/" && 'bg-home'} `}
  //     >
  //       <h1 className="text-light">{`${t('network_error.check')}`}</h1>
  //     </div>
  //   </div>
  //     </div>
  //   )
  // }
  return (
    <>
      <Head>
      <title>{t('head.website_title')} | {t('head.blogs')}</title>
        <meta name="description" />
      </Head>
      <div >
        {/* <div className="overview-blog-details-bg">
          {!isMobile &&
            <>
              <img src='/img/blogs/blogDetail/blogs-details1.png' className='bg-img1'></img>
            </>
          } */}
          <OverviewSection blogData={blogData}/>
        {/* </div> */}
        <BlogDetailSection blogData={blogData}/>
        <TipsItems title={`${t('tips_details_page.you_might_like')}`} mainBlogs={mainBlog} topics={topicsData} blogDetailPage/>
        <RecipeSection recipes={recipesData}/>
        <div className="products-recipe-recipeDetail-bg ">
          {!isMobile &&
            <>
              <img src='/img/recipes/recipeDetails/recipe-detail2.png' className='bg-img bg2' alt='bg-image1'></img>
              <img src='/img/blogs/blogDetail/blogs-details2.png' className='bg-img bg-blog-details2' alt='bg-image2'></img>
            </>

          }
          <ProductsSection productsData={productsData} title={`${t('tips_details_page.products_for_you')}`}/>
        </div>
        <Footer />
      </div>

    </>
  )
}

export default BlogDetails

export async function getServerSideProps({locale,params}) {
  const queryClient = new QueryClient()
  const blogsPage='blog-page'
  const products='products'
  const recipes='recipes'
  const blogs='blogs'
  const topics = 'topics'
  const {blogSlug}=params
  await queryClient.prefetchQuery(['topics', locale], () => getData(locale, topics))
  await queryClient.prefetchQuery(['blog-page',locale], ()=>getData(locale,blogsPage))
  await queryClient.prefetchQuery(['products',locale], ()=>getData(locale,products))
  await queryClient.prefetchQuery(['recipes',locale], ()=>getData(locale,recipes))
  await queryClient.prefetchQuery(['current-blog',locale], ()=>getDynamicData(locale,blogs,blogSlug))
  return {
    props: {
      blogSlug:blogSlug,
      dehydratedState:JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}