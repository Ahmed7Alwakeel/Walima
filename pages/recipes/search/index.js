
import React, { useEffect, useState } from 'react'
import Head from "next/head"
import { useRouter } from 'next/router'
import ProductsSection from '../../../components/productsSearch/ProductsSection/ProductsSection'
import LoaderSection from '../../../components/common/LoaderSection/LoaderSection';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getData, getDynamicData } from '../../../components/api_baseURL';
import RecipeSection from '../../../components/recipesSearch/RecipesSection/RecipesSection'
import Footer from '../../../components/common/Footer/Footer'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next"
import { useAnimationContext } from '../../../components/context/animationContext'
import OverviewSection from '../../../components/recipesSearch/OverviewSection/OverviewSection';
import AltRecipesSection from '../../../components/recipesSearch/RecipesSection/AltRecipesSection';
import { NextSeo } from 'next-seo';
const Search = ({ }) => {
    const { menuOpened } = useAnimationContext();
    const router = useRouter()
    const { category, product, recipe, topic } = router.query
    let { t } = useTranslation("common")
    const categories = 'categories'
    const products = 'products'
    const topics = 'topics'
    const recipes = 'recipes'
    const { locale, asPath } = useRouter()
    const [categoryData, setCategoryData] = useState()
    const [productsData, setProductsData] = useState()
    const [categoriesData, setCategoriesData] = useState()
    const [productsResults, setProductsResults] = useState()
    const [allProducts, setAllProducts] = useState()
    const [recipesResults, setRecipesResults] = useState()
    const [allTopics, setAllTopics] = useState()
    const [insideCategories, setInsideCategories] = useState()
    const [insideProducts, setInsideProducts] = useState()
    const [insideRecipes, setInsideRecipes] = useState()
    const [altRecipes, setAltRecipes] = useState();
    const [title, setTitle] = useState();
    const { data, isSuccess, isError, isLoading } = useQuery(['category', locale], () => getDynamicData(locale, categories, category), {
        enabled: !!category && !insideCategories
    })
    const insideQuery = useQuery([`insideCategoriesRecipes ${insideCategories}`, locale], () => getDynamicData(locale, categories, insideCategories), {
        enabled: !!insideCategories
    })

    const categoriesQuery = useQuery(["categoriesRecipesSearch", locale], () =>
        getData(locale, categories)
    );
    const altRecipesQuery = useQuery(["altRecipesSearch", locale], () =>
        getData(locale, recipes)
    );
    const productsQuery = useQuery(["productsRecipesSearch", locale], () =>
        getData(locale, products)
    );
    const topicsQuery = useQuery(["topicsRecipesSearch", locale], () =>
        getData(locale, topics), {
        enabled: !!topic
    }
    );
    useEffect(() => {
        altRecipesQuery.isSuccess && setAltRecipes(altRecipesQuery.data)
    }, [altRecipesQuery.data, altRecipesQuery.isSuccess])

    // useEffect(() => {
    //     isSuccess && setCategoryData(data[0])
    // }, [data, isSuccess])

    useEffect(() => {
        !insideCategories ?
            isSuccess && setCategoryData(data[0]) :
            insideQuery?.isSuccess && setCategoryData(insideQuery?.data[0])
    }, [data, isSuccess, insideQuery, insideCategories])

    useEffect(() => {
        categoriesQuery.isSuccess && setCategoriesData(categoriesQuery.data)
    }, [categoriesQuery.data, categoriesQuery.isSuccess])

    useEffect(() => {
        productsQuery.isSuccess && setAllProducts(productsQuery.data)
    }, [productsQuery.data, productsQuery.isSuccess])

    useEffect(() => {
        insideProducts == 'all' ?
            (setProductsResults(categoryData?.products), setTitle(t("search.products")))
            :
            insideProducts &&
            categoryData?.products?.map((pro) => {
                pro.slug == insideProducts && setProductsResults([pro]), setTitle(t("search.product"))
            })
    }, [categoryData, insideProducts])

    useEffect(() => {
        if (topic) {
            topicsQuery.isSuccess && setAllTopics(topicsQuery.data)
            allTopics?.map((item) => {
                item.slug == topic &&
                    setRecipesResults(item.recipes)
            })
        }
    }, [topicsQuery.data, topic, allTopics])


    useEffect(() => {
        if (!insideProducts && !topic) {
            product == 'all' ?
                setProductsResults(categoryData?.products)
                :
                product &&
                categoryData?.products?.map((pro) => {
                    pro.slug == product && setProductsResults([pro])
                })
        } else {
            insideProducts == 'all' ?
                setProductsResults(categoryData?.products)
                :
                insideProducts &&
                categoryData?.products?.map((pro) => {
                    pro.slug == insideProducts && setProductsResults([pro])
                })
        }
    }, [categoryData, productsQuery.data, product, productsResults, insideProducts])

    useEffect(() => {
        const recipesArray = []
        recipe == 'all' ?
            allProducts?.map((product) => {
                productsResults?.map((pro) => {
                    pro.slug == product.slug && recipesArray.push(...product.recipes)
                })
                setRecipesResults(recipesArray)
            }) : recipe && allProducts?.map((product) => {
                product.recipes.map(item => {
                    recipe == item.slug && setRecipesResults([item])
                })
            })
    }, [productsResults, recipe, categoryData, product, allProducts])

    // set Inside Recipes
    useEffect(() => {
        const recipesArray = []
        insideRecipes == 'all' ?
            allProducts?.map((product) => {
                productsResults?.map((pro) => {
                    pro.slug == product.slug && recipesArray.push(...product.recipes)
                })
                setRecipesResults(recipesArray)
            }) : insideRecipes && allProducts?.map((product) => {
                product.recipes.map(item => {
                    insideRecipes == item.slug && setRecipesResults([item])
                })
            })
    }, [productsResults, categoryData, allProducts, insideRecipes])

    if (isLoading || productsQuery.isLoading) {
        return (
            <LoaderSection />
        )
    }
    if (isError || productsQuery.isError) {
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
                title={`${t('head.website_title')} | ${t('search.search')}`}
                description={'Walima search page'}
            />
            <div className={`insideLyr ${menuOpened ? 'whileMenuOpening' : ''}`} style={{ display: 'flex', flexDirection: 'column' }}>
                <OverviewSection recipesSearchPage setInsideCategories={setInsideCategories} setInsideProducts={setInsideProducts} setInsideRecipes={setInsideRecipes} categoriesData={categoriesData} productsData={allProducts} number={recipesResults?.length} />
                {recipesResults?.length > 0 && <RecipeSection recipesSearchPage recipe={recipesResults} title={recipesResults?.length == 1 ? t('search.recipe') : t('search.recipes')} />}
                {recipesResults?.length == 0 && <AltRecipesSection recipesSearchPage recipe={altRecipes?.slice(0, 6)} title={t('search.recipes')} />}
            </div>
            <Footer />
        </>
    )
}

export default Search

export async function getServerSideProps({ locale, query }) {
    const queryClient = new QueryClient()
    const { category, product, topic } = query
    const categories = 'categories'
    const products = 'products'
    const topics = 'topics'
    await queryClient.prefetchQuery(['products', locale], () => getData(locale, products), {
        enabled: !!product,
    })
    await queryClient.prefetchQuery(['category', locale], () => getDynamicData(locale, categories, category), {
        enabled: !!category,
    })
    await queryClient.prefetchQuery(['topicsRecipesSearch', locale], () => getData(locale, topics), {
        enabled: !!topics,
    })
    return {
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
            ...(await serverSideTranslations(locale, ["common"])),
        },
    }
}
