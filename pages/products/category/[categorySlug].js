

import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getDynamicData, getData } from '../../../components/api_baseURL';
import Head from "next/head"
import React, { useEffect, useState } from 'react'
import Footer from "../../../components/common/Footer/Footer"
import BlogsSection from "../../../components/common/BlogsSection/BlogsSection"
import RecipeSection from "../../../components/common/RecipeSection/RecipeSection"
import CategorySection from "../../../components/category/CategorySection/CategorySection"
import ClaimsSection from "../../../components/about/ClaimsSection/ClaimsSection"
import OverviewSection from "../../../components/category/OverviewSection/OverviewSection"
import { useRouter } from 'next/router';
import LoaderSection from '../../../components/common/LoaderSection/LoaderSection';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next"
import { useAnimationContext } from '../../../components/context/animationContext';
import { NextSeo } from 'next-seo';
const Categories = ({ categorySlug }) => {
  const { menuOpened } = useAnimationContext();
  let { t } = useTranslation("common")
  const [isMobile, setMobile] = useState(false)
  const isMobileHandler = (e) => {
    setMobile(e.matches)
  }
  const { locale, asPath } = useRouter()
  const categories = `categories`
  const page = 'about'
  const products = 'products'
  // const blogs = `blogs`
  const { data, isSuccess, isLoading, isError } = useQuery(['categoriesPageData', locale], () => getDynamicData(locale, categories, categorySlug))
  const claimsQuery = useQuery(['aboutData', locale], () => getData(locale, page))
  // const blogsQuery = useQuery(['blogsData', locale], () => getData(locale, blogs))
  const productsQuery = useQuery(['productsData', locale], () => getData(locale, products))
  const [categoryData, setCategoryData] = useState()
  const [claimstData, setClaimsData] = useState()
  // const [blogsData, setBlogsData] = useState()
  const [allProductsData, setAllProductsData] = useState()
  const [recipesData, setRecipesData] = useState()
  const [vegetablesRecipes,setVegetablesRecipes]= useState()
  useEffect(() => {
    isSuccess && setCategoryData(data[0])
  }, [data, isSuccess, isLoading])
  useEffect(() => {
    claimsQuery.isSuccess && setClaimsData(claimsQuery.data)
  }, [claimsQuery.data, claimsQuery.isSuccess])
  // useEffect(() => {
  //   blogsQuery.isSuccess && setBlogsData(blogsQuery.data)
  // }, [blogsQuery.data, blogsQuery.isSuccess])
  useEffect(() => {
    productsQuery.isSuccess && setAllProductsData(productsQuery.data)
  }, [productsQuery.data, productsQuery.isSuccess])
  useEffect(() => {
    try {
      // Chrome & Firefox
      window.matchMedia(`(max-width : 1024px)`).addEventListener("change", isMobileHandler)
      setMobile(window.matchMedia(`(max-width : 1024px)`).matches)
    } catch (e1) {
      try {
        // Safari
        window.matchMedia(`(max-width : 1024px)`).addListener(() => isMobileHandler())
        setMobile(window.matchMedia(`(max-width : 1024px)`).matches)
      } catch (e2) {
        console.error(e2)
      }
    }
  }, [])
  useEffect(() => {
    const recipes = []
    allProductsData?.map((product) =>
      product?.category?.slug == 'Vegetables_Category' && recipes.push(...product.recipes)
    )
    setVegetablesRecipes(recipes)
  }, [allProductsData]) 
  useEffect(() => {
    const recipes = []
    allProductsData?.map((product) =>
    categorySlug!= 'Spices_Category'?product?.category?.slug == categorySlug && recipes.push(...product.recipes)
    :recipes.push(...vegetablesRecipes)
    )
    const newRecipes=[...new Set(recipes)]
    setRecipesData(newRecipes)
  }, [allProductsData, categoryData,vegetablesRecipes,categorySlug]) 

  if (isLoading || claimsQuery.isLoading) {
    return (
      <LoaderSection />
    )
  }
  if ((isError || claimsQuery.isError )) {
    return (
      <div className='w-100 text-center'>
        <div className={`loader-container `}>
          <div className={`lyr 
    ${asPath == '/products' && 'bg-products'}
      ${asPath.includes('products/') && !asPath.includes('products/category/') && !asPath.includes('products/search') ? 'bg-product-detail' : ""}
      ${asPath == "/" && 'bg-home'} `}
          >
            <h1 className="text-light">{`${t('network_error.check')}`}</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
    <NextSeo
        title={`${t('head.website_title')} | ${t('head.products')}`}
        description={'Walima products and categories'}
      />
      <div className={`insideLyr ${menuOpened ? 'whileMenuOpening' : ''}`} style={{ display: 'flex', flexDirection: 'column' }}>
        <OverviewSection categoryName={categoryData?.name}
          categoryDescription={categoryData?.description}
          categoryImg={categoryData?.banner?.url} />
        <div className="overviw-category-bg">
          {!isMobile && <img src='/img/products/category/category-bg-1.png' className='bg-img' alt='bg-image'></img>}
          <CategorySection delayMaintainer categoryName={categoryData?.name}
            categoryProducts={categoryData?.products} productCategory 
            categoryImg={categoryData?.banner?.url}/>

        </div>
      </div>
      <div className="category-category-bg ">
        {!isMobile &&
          <>
            <img src='/img/recipes/recipeDetails/recipe-detail2.png' className='bg-img' alt='bg-image'></img>
            <img src='/img/products/category/category-bg-2.png' className='bg-img bg2' alt='bg-image'></img>
          </>
        }
        <ClaimsSection claimsData={claimstData?.CleanLabelClaims} productCategory categorySlug={categorySlug} />
      </div>
      <div className="products-recipe-recipeDetail-bg ">
        {!isMobile &&
          <img src='/img/recipes/recipeDetails/recipe-detail2.png' className='bg-img bg2' alt='bg-image'></img>
        }
        {/* {recipesData?.length>0&&<RecipeSection recipes={recipesData} productCategory/>} */}
        {recipesData?.length>0&&<RecipeSection recipes={recipesData} productCategory categoryName={categoryData?.name}/>}
        {/* <BlogsSection whiteBg title={`${t('product_details_page.tips_tricks')}`} blogsData={blogsData} /> */}
      </div>
      <Footer />
    </>
  )
}

export default Categories



export async function getServerSideProps({ locale, params }) {
  const queryClient = new QueryClient()
  const page = 'about'
  const categories = `categories`
  // const blogs = `blogs`
  const { categorySlug } = params
  await queryClient.prefetchQuery(['categoriesPageData', locale], () => getDynamicData(locale, categories, categorySlug))
  await queryClient.prefetchQuery(['aboutData', locale], () => getData(locale, page))
  // await queryClient.prefetchQuery(['blogsData', locale], () => getData(locale, blogs))

  return {
    props: {
      categorySlug: categorySlug,
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}
