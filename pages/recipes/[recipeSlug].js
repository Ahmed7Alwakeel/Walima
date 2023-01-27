import { useState, useEffect } from "react"
import Head from "next/head"
import Footer from '../../components/common/Footer/Footer'
import ProductsSection from '../../components/common/ProductsSection/ProductsSection'
import BlogsSection from '../../components/common/BlogsSection/BlogsSection'
import RecipeSection from '../../components/common/RecipeSection/RecipeSection'
import NutritionFacts from '../../components/recipe/NutritionFacts/NutritionFacts'
import Directions from '../../components/recipe/Directions/Directions'
import Ingredients from '../../components/recipe/Ingredients/Ingredients'
import OverviewSection from '../../components/recipe/OverviewSection/OverviewSection'
import { useRouter } from "next/router"
import { getDynamicData, getData } from "../../components/api_baseURL"
import { dehydrate, QueryClient, useQuery } from 'react-query';
import LoaderSection from "../../components/common/LoaderSection/LoaderSection"
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next"
import { NextSeo } from "next-seo"
const RecipeDetail = ({ recipeSlug }) => {
  let { t } = useTranslation("common")
  const [isMobile, setMobile] = useState(false)
  const isMobileHandler = (e) => {
    setMobile(e.matches)
  }
  const { locale, asPath } = useRouter()
  const recipes = `recipes`
  const blogs = `blogs`
  const products = `products`
  const [loader, setLoader] = useState(false)
  const { data, isSuccess, isLoading, isError } = useQuery(['recipe', locale], () => getDynamicData(locale, recipes, recipeSlug))
  const recipesQuery = useQuery(['recipes', locale], () => getData(locale, recipes))
  const productsQuery = useQuery(['products', locale], () => getData(locale, products))
  const blogsQuery = useQuery(['blogs', locale], () => getData(locale, blogs))
  const [recipeData, setRecipeData] = useState()
  const [recipesData, setRecipesData] = useState()
  const [blogsData, setBlogsData] = useState()
  const [allRecipesData, setAllRecipesData] = useState([])
  const [allProductsData, setAllProductsData] = useState([])
  const [categoryName,setCategoryName]=useState()

  useEffect(() => {
    isSuccess && setRecipeData(data[0])
  }, [data, isSuccess])
  useEffect(() => {
    recipesQuery.isSuccess && setAllRecipesData(recipesQuery.data)
  }, [recipesQuery.data, recipesQuery.isSuccess])
  useEffect(() => {
    productsQuery.isSuccess && setAllProductsData(productsQuery.data)
  }, [productsQuery.data, productsQuery.isSuccess])
  useEffect(() => {
    blogsQuery.isSuccess && setBlogsData(blogsQuery.data)
  }, [blogsQuery.data, blogsQuery.isSuccess])
  useEffect(() => {
    let productsOfCategory = [];
    const recipes = [];
    allProductsData.map(pro => {
      pro.slug == recipeData?.mainproduct.slug && productsOfCategory.push(pro)
    })
    allProductsData.map(pro => {
      pro?.category?.slug == productsOfCategory[0]?.category?.slug && (recipes.push(...pro.recipes),setCategoryName(pro?.category?.name ))
    })
    const recipesInspired = recipes?.filter(recipe => recipe.slug != recipeData?.slug)
    setRecipesData(recipesInspired)
  }, [allProductsData, recipeData])
  useEffect(() => {
    window.matchMedia(`(max-width : 1024px)`).addEventListener("change", isMobileHandler)
    setMobile(window.matchMedia(`(max-width : 1024px)`).matches)
  }, [])
  if (isLoading) {
    return (
      <LoaderSection />
    )
  }
  if ((isError)) {
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
        title={`${t("head.website_title")} | ${t("head.recipes")}`}
        description={data[0]?.name}
        openGraph={{
          type: 'website',
          url: 'https://walimasocial.com',
          title: data[0]?.name,
          images: [
            { url: data[0]?.thumbnail.url },
          ],
          siteName: 'Walima',
        }}
      />
      <OverviewSection
        allRecipeData={recipeData}
        recipeName={recipeData?.name}
        recipePreparation={recipeData?.preparation_time}
        recipeServes={recipeData?.serves}
        recipeCooking={recipeData?.cooking_time}
        recipeTopics={recipeData?.topics}
        recipeSlug={recipeData?.slug}
        recipeVideo={recipeData?.youtube_url ? recipeData?.youtube_url : recipeData?.video?.url}
        recipeThumbnail={recipeData?.thumbnail ? recipeData?.thumbnail?.url : recipeData?.image_desktop?.url}
      />
      <div className="background-white">
        <Ingredients products={recipeData?.products} recipeIngredients={recipeData?.ingredients} />
        <Directions recipeInstructions={recipeData?.instructions} />
        {/* <NutritionFacts recipeNutritionFacts={recipeData?.NutritionFacts}/> */}
      </div>

      <div className="products-recipe-recipeDetail-bg ">
        {!isMobile &&
          <>
            <img src='/img/recipes/recipeDetails/recipe-detail1.png' className='bg-img' alt='bg-image'></img>
            <img src='/img/recipes/recipeDetails/recipe-detail2.png' className='bg-img bg2' alt='bg-image'></img>
          </>

        }
        <ProductsSection productsData={recipeData?.products} title={`${t('recipe_details_page.products_title')}`} />
        <RecipeSection categoryName={categoryName} recipes={recipesData} />
      </div>
      <div className="products-recipe-recipeDetail-bg ">
        {!isMobile &&
          <>
            <img src='/img/recipes/recipeDetails/recipe-detail2.png' className='bg-img bg2' alt='bg-image'></img>
          </>
        }
        {/* <BlogsSection title={`${t('recipe_details_page.tips_tricks')}`} blogsData={blogsData}/> */}
      </div>
      <Footer />
    </>
  )
}

export default RecipeDetail
export async function getServerSideProps({ locale, params }) {
  const queryClient = new QueryClient()
  const recipes = `recipes`
  const products = `products`
  const blogs = `blogs`
  const { recipeSlug } = params
  await queryClient.prefetchQuery(['recipe', locale], () => getDynamicData(locale, recipes, recipeSlug))
  await queryClient.prefetchQuery(['recipes', locale], () => getData(locale, recipes))
  await queryClient.prefetchQuery(['products', locale], () => getData(locale, products))
  await queryClient.prefetchQuery(['blogs', locale], () => getData(locale, blogs))
  return {
    props: {
      recipeSlug: recipeSlug,
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}
