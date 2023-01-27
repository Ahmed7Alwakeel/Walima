import { useState, useEffect } from "react"
import Footer from "../components/common/Footer/Footer"
import { useRouter } from "next/router"
import MainSection from "../components/home/MainSection/MainSection"
import ProductSection from "../components/home/ProductSection/ProductSection"
import RecipesSection from "../components/home/RecipesSection/RecipesSection"
import TipsItems from "../components/common/TipsItems/TipsItems"
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getData, API_URL } from '../components/api_baseURL';
import LoaderSection from "../components/common/LoaderSection/LoaderSection"
import { useAuth } from "../components/context/authContext"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Cookies from "js-cookie"
import { useFavorite } from "../components/context/favoriteContext"
import axios from 'axios';
import { useTranslation } from "next-i18next"
import { NextSeo } from "next-seo"
export default function Home() {
  const { locale, locales, defaultLocale, asPath, pathname } = useRouter()
  const { setCurrentUser, setIsAuthenticated } = useAuth()
  const { setUserFavoriteProducts, setUserFavoriteRecipes, setUserFavoriteBlogs } = useFavorite()
  const [homeData, setHomeData] = useState()
  const [categoriesData, setcategoriesData] = useState()
  const [productsData, setProductsData] = useState()
  const [isMobile, setMobile] = useState(false)
  let { t } = useTranslation("common")
  const isMobileHandler = (e) => {
    setMobile(e.matches)
  }
  useEffect(() => {
    const id = localStorage.getItem("currentUser")
    id && axios.get(`${API_URL}/users/${id}`).then((res) => {
      const data = res.data
      setUserFavoriteProducts(data.favoriteProducts)
      setUserFavoriteRecipes(data.favoriteRecipes)
      setUserFavoriteBlogs(data.favoriteBlogs)
    })
  }, [])
  useEffect(() => {
    window.matchMedia(`(max-width : 1024px)`).addEventListener("change", isMobileHandler)
    setMobile(window.matchMedia(`(max-width : 1024px)`).matches)
  }, [])
  useEffect(() => {
    const token = Cookies.get("token")
    if (token) {
      setIsAuthenticated(true)
      fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        if (!res.ok) {
          Cookies.remove("token")
          setCurrentUser(null)
          return null
        }
        const user = await res.json()
        setCurrentUser(user)
        setIsAuthenticated(true)
        localStorage.setItem("currentUser", JSON.stringify(user.id))
      })
    }
  }, [])
  const homePage = 'home'
  const categories = 'categories'
  const products = 'products'
  const { data, isSuccess, isLoading, isError } = useQuery(['home', locale], () => getData(locale, homePage))
  const categoriesQuery = useQuery(['categories', locale], () => getData(locale, categories))
  const productsQuery = useQuery(['products', locale], () => getData(locale, products))
  useEffect(() => {
    isSuccess && setHomeData(data[0])
  }, [data, isSuccess])
  useEffect(() => {
    categoriesQuery.isSuccess && setcategoriesData(categoriesQuery.data)
  }, [categoriesQuery.data, categoriesQuery.isSuccess])
  useEffect(() => {
    productsQuery.isSuccess && setProductsData(productsQuery.data)
  }, [productsQuery.data, productsQuery.isSuccess])
  if (isLoading) {
    return (
      <LoaderSection />
    )
  }
  if ((isError)) {
    return (
      <div className={`loader-container `}>
        <div className={`lyr 
    ${asPath == '/products' && 'bg-products'}
      ${asPath.includes('products/') && !asPath.includes('products/category/') && !asPath.includes('products/search') ? 'bg-product-detail' : ""}
      ${asPath == "/" && 'bg-home'} 
      `}
        >
          <h1 className="text-light">{`${t('network_error.check')}`}</h1>
        </div>
      </div>
    )
  }
  return (
    < >
      <NextSeo
        title={`${t("head.website_title")} | ${t("head.home")}`}
        description={'Walima Home Page'}
      />
      <MainSection mainSlider={homeData?.MainSlider} />
      <ProductSection className="background-white"
        productData={homeData?.ExploreProducts} categoriesData={categoriesData} productsData={productsData} />
      {/* <div className="recipe-tips-home-bg position-relative"> */}
      {/* {!isMobile && <img src='/img/bg-recipe-home.png' className='bg-img' alt="bg_img"></img>} */}
      <RecipesSection recipeData={homeData?.RecipeSection} />
      {/* <TipsItems homePage  topics={topicsData} title={homeData?.BlogSection?.title} mainBlogs={homeData?.BlogSection} /> */}
      {/* </div> */}
      <Footer />
    </>
  )
}
export async function getServerSideProps({ locale }) {
  const queryClient = new QueryClient()
  const HomePage = 'home'
  const categories = 'categories'
  await queryClient.prefetchQuery(['home', locale], () => getData(locale, HomePage))
  await queryClient.prefetchQuery(['categories', locale], () => getData(locale, categories))
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}
