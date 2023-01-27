import React, { useEffect, useState } from 'react'
import Head from "next/head"
import { useRouter } from 'next/router'
import OverviewSection from '../../../components/productsSearch/OverviewSection/OverviewSection'
import ProductsSection from '../../../components/productsSearch/ProductsSection/ProductsSection'
import LoaderSection from '../../../components/common/LoaderSection/LoaderSection';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getData, getDynamicData } from '../../../components/api_baseURL';
import Footer from '../../../components/common/Footer/Footer'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next"
import { useAnimationContext } from '../../../components/context/animationContext'
import { NextSeo } from 'next-seo'
const Search = ({ }) => {
    const { menuOpened } = useAnimationContext();
    let { t } = useTranslation("common")
    const router = useRouter()
    const { locale, asPath } = useRouter()
    const { category, product } = router.query
    const [insideProducts, setInsideProducts] = useState()
    const [insideCagtegories, setInsideCagtegories] = useState()
    const [categoriesData, setcategoriesData] = useState()
    const [productsData, setProductsData] = useState()
    const categories = 'categories'
    const [title, setTitle] = useState()
    const [categoryData, setCategoryData] = useState()
    const [productsResults, setProductsResults] = useState()
    const { data, isSuccess, isError, isLoading } = useQuery(['category', locale], () => getDynamicData(locale, categories, category), {
        enabled: !!category && !insideCagtegories,
    })
    const insideQuery = useQuery([`insideCagtegories ${insideCagtegories}`, locale], () => getDynamicData(locale, categories, insideCagtegories), {
        enabled: !!insideCagtegories,
    })
    // const productsQuery = useQuery(['products', locale], () => getData(locale, products),{
    //     enabled: !product,
    // })

    useEffect(() => {
        !insideCagtegories ?
            isSuccess && setCategoryData(data[0]) :
            insideQuery?.isSuccess && setCategoryData(insideQuery?.data[0])
    }, [data, isSuccess, insideQuery, insideCagtegories])

    const products = "products";
    const categoriesQuery = useQuery(["categoriesSearchPage", locale], () =>
        getData(locale, categories)
    );
    const productsQuery = useQuery(["productsSearchPage", locale], () =>
        getData(locale, products)
    );

    useEffect(() => {
        isSuccess && setCategoryData(data[0]);
    }, [data, isSuccess]);
    // useEffect(() => {
    //     productsQuery.isSuccess && setAllProducts(productsQuery.data)
    // }, [productsQuery.data, productsQuery.isSuccess])
    useEffect(() => {
        categoriesQuery.isSuccess && setcategoriesData(categoriesQuery.data);
    }, [categoriesQuery.data, categoriesQuery.isSuccess]);
    useEffect(() => {
        productsQuery.isSuccess && setProductsData(productsQuery.data);
    }, [productsQuery.data, productsQuery.isSuccess]);

    useEffect(() => {
        product == 'all' ?
            (setProductsResults(categoryData?.products), setTitle(t("search.products")))
            :
            product &&
            categoryData?.products?.map((pro) => {
                pro.slug == product && setProductsResults([pro]), setTitle(t("search.product"))
            })
    }, [categoryData, product])
    useEffect(() => {
        insideProducts == 'all' ?
            (setProductsResults(categoryData?.products), setTitle(t("search.products")))
            :
            insideProducts &&
            categoryData?.products?.map((pro) => {
                pro.slug == insideProducts && setProductsResults([pro]), setTitle(t("search.product"))
            })
    }, [categoryData, insideProducts])
    if (isLoading) {
        return (
            <LoaderSection />
        )
    }
    if (isError) {
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
                <OverviewSection setInsideProducts={setInsideProducts} setInsideCagtegories={setInsideCagtegories} number={productsResults?.length} categoriesData={categoriesData} productsData={productsData} />
                {/* <ProductsSection title={product?title:"No matching results"} productsResults={product?productsResults:allProducts} /> */}
                {productsResults?.length > 0 && <ProductsSection productsSearchPage delayMaintainer title={title} productsResults={productsResults} />}
            </div>
            <Footer />
        </>
    )
}

export default Search;

export async function getServerSideProps({ locale, query }) {
    const queryClient = new QueryClient();
    const { category, product } = query;
    const categories = "categories";
    const products = "products";

    await queryClient.prefetchQuery(["productsSearchPage", locale], () =>
        getData(locale, products)
    );
    await queryClient.prefetchQuery(["categoriesSearchPage", locale], () =>
        getData(locale, categories)
    );
    await queryClient.prefetchQuery(
        ["categorySearchPage", locale],
        () => getDynamicData(locale, categories, internalCategory ? internalCategory : category),
        {
            enabled: !!category,
        }
    );
    return {
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}