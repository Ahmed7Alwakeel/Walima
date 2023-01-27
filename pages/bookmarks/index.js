
import React, { useEffect, useState } from 'react'
import Head from "next/head"
import Footer from '../../components/common/Footer/Footer'
import OverviewSection from '../../components/bookmarks/OverviewSection/OverviewSection'
import BlogsSectionCards from '../../components/bookmarks/BlogsSectionCards/BlogsSectionCards'
import RecipeSection from '../../components/bookmarks/RecipeSection/RecipeSection'
import ProductsSection from '../../components/bookmarks/ProductsSection/ProductsSection'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useFavorite } from '../../components/context/favoriteContext';
import { API_URL, getData } from '../../components/api_baseURL';
import axios from 'axios';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import LoaderSection from '../../components/common/LoaderSection/LoaderSection'
import { useTranslation } from "next-i18next"
import { useAnimationContext } from '../../components/context/animationContext'
import { NextSeo } from 'next-seo'
const Bookmarks = () => {
  const { menuOpened } = useAnimationContext();
  let { t } = useTranslation("common")
  const router = useRouter()
  const {asPath} = useRouter()
  const [isMobile, setMobile] = useState(false)
  const { userFavoriteProducts,
    setUserFavoriteProducts,
    userFavoriteRecipes,
    setUserFavoriteRecipes,
    userFavoriteBlogs,
    setUserFavoriteBlogs } = useFavorite()
    // const topics = 'topics'
    const products = 'products'
    const recipes = 'recipes'
    const blogs = 'blogs'
    // const [topicsData, setTopicsData] = useState()
    const [productsData, setProductsData] = useState()
    const [recipesData, setRecipesData] = useState()
    const [blogsData, setBlogsData] = useState()
    // const topicsQuery = useQuery(['topics', router.locale], () => getData(locale, topics))
    const productsQuery = useQuery(['products', router.locale], () => getData(locale, products))
    const recipesQuery = useQuery(['recipes', router.locale], () => getData(locale, recipes))
    const blogsQuery = useQuery(['blogs', router.locale], () => getData(locale, blogs))
  useEffect(() => {
    const id = localStorage.getItem("currentUser")
    id && axios.get(`${API_URL}/users/${id}`).then((res) => {
      const data = res.data
      setUserFavoriteProducts(data.favoriteProducts)
      setUserFavoriteRecipes(data.favoriteRecipes)
      setUserFavoriteBlogs(data.favoriteBlogs)
    })
  }, [])
  const isMobileHandler = (e) => {
    setMobile(e.matches)
  }
  useEffect(() => {
    window.document.body.style.overflowX = "hidden"
    window.matchMedia(`(max-width : 1024px)`).addEventListener("change", isMobileHandler)
    setMobile(window.matchMedia(`(max-width : 1024px)`).matches)
  }, [])
  useEffect(() => {
    Cookies.get("token")
      ? router.push(`/bookmarks`)
      : router.push(`/auth/signin`)
  }, [])
  // useEffect(() => {
  //   topicsQuery.isSuccess && setTopicsData(topicsQuery.data)
  // }, [topicsQuery.data, topicsQuery.isSuccess]) 
  useEffect(() => {
    productsQuery.isSuccess && setProductsData(productsQuery.data)
  }, [productsQuery.data, productsQuery.isSuccess])
  useEffect(() => {
    recipesQuery.isSuccess && setRecipesData(recipesQuery.data)
  }, [recipesQuery.data, recipesQuery.isSuccess])
  useEffect(() => {
    blogsQuery.isSuccess && setBlogsData(blogsQuery.data)
  }, [blogsQuery.data, blogsQuery.isSuccess])
  //to avoid topics logic
  useEffect(()=>{
    let favoriteBlogs=[]
    blogsData?.map(blog=>{
      userFavoriteBlogs?.map(favBlog=>{
        blog.slug==favBlog.slug&&favoriteBlogs.push(blog)
      })
    })
    setUserFavoriteBlogs(favoriteBlogs)
  },[blogsQuery.data, blogsQuery.isSuccess,blogsData])
  if (productsQuery.isLoading || recipesQuery.isLoading) {
    return (
      <LoaderSection />
    )
  }
  return (
    <>
      <NextSeo
        title={`${t('head.website_title')} | ${t('head.bookmarks')}`}
        description={'Your bookmarks products and recipes'}
      />
      <div className={`insideLyr ${menuOpened ? 'whileMenuOpening' : ''}`} style={{display: 'flex', flexDirection: 'column'}}>    
        {/* <div className='auth-bg'>
          {!isMobile && <img src='/img/auth/auth-bg.png' className='bg-img'></img>} */}
          <OverviewSection />
          <RecipeSection recipe={userFavoriteRecipes} allRecipes={recipesData} favoritePage/>
        {/* </div> */}
      </div>
        {/* <BlogsSectionCards blogs={userFavoriteBlogs}
        
      //  topics={topicsData} 
       allBlogs={blogsData} favoritePage/> */}
      <ProductsSection delayMaintainer products={userFavoriteProducts} allProducts={productsData} favoritePage bg/>
      <Footer />
    </>
  )
}

export default Bookmarks

export async function getServerSideProps({ locale }) {
  const queryClient = new QueryClient()
  // const topics = 'topics'
    const products = 'products'
    const recipes = 'recipes'
    const blogs = 'blogs'
  // await queryClient.prefetchQuery(['topics', locale], () => getData(locale, topics))
  await queryClient.prefetchQuery(['products', locale], () => getData(locale, products))
  await queryClient.prefetchQuery(['recipes', locale], () => getData(locale, recipes))
  await queryClient.prefetchQuery(['blogs', locale], () => getData(locale, blogs))
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}