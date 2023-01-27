import Head from "next/head"
import React, { useEffect, useState } from 'react'
import Footer from "../../components/common/Footer/Footer"
import BlogsSection from '../../components/common/BlogsSection/BlogsSection'
import RecipeSection from '../../components/common/RecipeSection/RecipeSection'
import OverviewSection from "../../components/product/OverviewSection/OverviewSection"
import ProductsSection from '../../components/common/ProductsSection/ProductsSection'
import { getData, getDynamicData } from '../../components/api_baseURL';
import { useRouter } from "next/router"
import { dehydrate, QueryClient, useQuery } from 'react-query';
import LoaderSection from "../../components/common/LoaderSection/LoaderSection"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next"
import { useAnimationContext } from "../../components/context/animationContext"
import { NextSeo } from "next-seo"
const ProductDetails = ({ productSlug }) => {
  const [isMobile, setMobile] = useState(false)
  const isMobileHandler = (e) => {
    setMobile(e.matches)
  }
  let { t } = useTranslation("common")
  const { locale, asPath } = useRouter()
  const product = `products`
  const categories = `categories`
  const blogs = `blogs`
  const { data, isSuccess, isLoading, isError } = useQuery(['product', locale], () => getDynamicData(locale, product, productSlug))
  const productsQuery = useQuery(['products', locale], () => getData(locale, product))
  const categoriesQuery = useQuery(['categories', locale], () => getData(locale, categories))
  const [productData, setProductData] = useState()
  const [categoryData, setCategoryData] = useState()
  const [recipe, setRecipe] = useState()
  const [productsData, setProductsData] = useState()
  const [allproductsData, setAllProductsData] = useState([])
  const [allCategories, setAllCategories] = useState([])
  const { inProductPage, setInProductPage } = useAnimationContext();
  useEffect(() => {
    setInProductPage(true);
    return () => {
      setInProductPage(false);
    }
  }, [])
  useEffect(() => {
    isSuccess && setProductData(data[0])
  }, [data, isSuccess])
  useEffect(() => {
    productsQuery.isSuccess && setAllProductsData(productsQuery.data)
  }, [productsQuery.data, productsQuery.isSuccess])
  useEffect(() => {
    categoriesQuery.isSuccess && setAllCategories(categoriesQuery.data)
  }, [categoriesQuery.data, categoriesQuery.isSuccess])
  useEffect(() => {
    let categories = allCategories.filter(category => category.id == productData?.category?.id)
    setCategoryData(categories[0])
  }, [allCategories, categoriesQuery.isSuccess, productData])
  useEffect(() => {
    let products = categoryData?.products.filter(pro => pro.slug != productData?.slug)
    setProductsData(products)
  }, [categoryData, productData?.slug])
  useEffect(() => {
    let category = allCategories.find(category => category.id == productData?.category?.id)
    const products = category?.products
    const recipes = productData?.recipes
    products?.map(pro => {
      allproductsData?.map(proData => {
        pro.slug == proData.slug && recipes.push(...proData.recipes)
      })
    })
    
    const newRecipes=[...new Map(recipes?.map(item=>[item["slug"],item])).values()]
    setRecipe(newRecipes)
  }, [productData, allCategories, allproductsData])
  useEffect(() => {
    window.matchMedia(`(max-width : 1024px)`).addEventListener("change", isMobileHandler)
    setMobile(window.matchMedia(`(max-width : 1024px)`).matches)
  }, [])
  if (isLoading || productsQuery.isLoading) {
    return (
      <LoaderSection />
    )
  }
  if ((isError || productsQuery.isError)) {
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
        title={`${t('head.website_title')} | ${t('head.products')}`}
        description={'Walima products and categories'}
      />
      {/* <div className="overview-category-productDeatils-bg">
        {!isMobile && <img src='/img/products/details/bg-product-details.png' className='bg-img'></img>} */}
      <OverviewSection
        productName={productData?.name}
        productDescription={productData?.description}
        productIngredients={productData?.ingredients}
        // productNutrition={productData?.nutrition_facts}
        productNutrition={productData?.NutritionFactsImage?.url}
        productImg={productData?.main_image?.url}
        ImgAlt={productData?.image_desktop?.name}
        productCategory={productData?.category}
      />
      {recipe?.length != 0 && <RecipeSection recipes={recipe} categoryName={productData?.category?.name} />}
      {/* </div> */}

      <div className="blogs-productDeatils-bg ">
        {!isMobile &&
          <>
            <img src='/img/recipes/recipeDetails/recipe-detail2.png' className='bg2' alt='bg-image'></img>
          </>

        }
        {/* <BlogsSection title={`${t("product_details_page.tips_tricks")}`} blogsData={blogsData} /> */}
      </div>
      <div className="products-productDeatils-bg ">
        {!isMobile &&
          <>
            <img src='/img/products/details/productDetail3.png' className='bg3' alt='bg-image'></img>
          </>
        }
        {productsData?.length != 0 && <ProductsSection title={`${t("product_details_page.you_might_like")}`} productsData={productsData} bg={recipe?.length == 0 ?true:null}/>}
        <Footer />
      </div>

    </>
  )
}

export default ProductDetails

export async function getServerSideProps({ locale, params }) {
  const queryClient = new QueryClient()
  const product = `products`
  const categories = `categories`
  const blogs = `blogs`
  const { productSlug } = params
  await queryClient.prefetchQuery(['product', locale], () => getDynamicData(locale, product, productSlug))
  await queryClient.prefetchQuery(['products', locale], () => getData(locale, product))
  await queryClient.prefetchQuery(['categories', locale], () => getData(locale, categories))
  return {
    props: {
      productSlug: productSlug,
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}
