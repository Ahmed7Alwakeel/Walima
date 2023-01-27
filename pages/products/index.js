import React, { useEffect, useState } from 'react'
import Head from "next/head"
import Footer from "../../components/common/Footer/Footer"
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getData } from '../../components/api_baseURL';
import { useRouter } from "next/router"
import OverviewSection from "../../components/products/OverviewSection/OverviewSection"
import CategoriesSection from "../../components/products/CategoriesSection/CategoriesSection"
import LoaderSection from '../../components/common/LoaderSection/LoaderSection';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next"
import { useAnimationContext } from '../../components/context/animationContext';
import { NextSeo } from 'next-seo';
const Products = () => {
  let { t } = useTranslation("common")
  const productPage='product-page'
  const products='products'
  const categories='categories'
  const {locale,asPath}=useRouter()
  const {data,isSuccess,isLoading,isError}=useQuery(['productPage',locale], ()=>getData(locale,productPage))
  const productsQuery = useQuery(['products',locale], ()=>getData(locale,products))
  const categoriesQuery = useQuery(['categories',locale], ()=>getData(locale,categories))
  const [productPageData,setProductPageData]=useState()
  const [productsData,setProductsData]=useState()
  const [categoriesData,setCategoriesData]=useState()

  const {inProductPage,setInProductPage} = useAnimationContext();
  useEffect(() => {
    setInProductPage(true);
    return () => {
      setInProductPage(false);
    }
  })
  useEffect(()=>{
    isSuccess&&setProductPageData(data)
  },[data,isSuccess])
  useEffect(()=>{
    productsQuery.isSuccess&&setProductsData(productsQuery.data)
  },[productsQuery.data,productsQuery.isSuccess])
   useEffect(()=>{
    categoriesQuery.isSuccess&&setCategoriesData(categoriesQuery.data)
  },[categoriesQuery.data,categoriesQuery.isSuccess])
  if(isLoading||productsQuery.isLoading ||  categoriesQuery.isLoading){
    return(
      <LoaderSection/>
    )
  }
  if((isError||productsQuery.isError ||  categoriesQuery.isError)){
    return(
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
      <OverviewSection products={productsData} pageData={productPageData}/>
      <CategoriesSection categories={categoriesData}/>
      <Footer/>
        </>
    )
}
export default Products
export async function getServerSideProps({locale}) {
  const queryClient = new QueryClient()
  const products='products'
  const categories='categories'
  const productPage='product-page'
  await queryClient.prefetchQuery(['products',locale], ()=>getData(locale,products))
  await queryClient.prefetchQuery(['productPage',locale], ()=>getData(locale,productPage))
  await queryClient.prefetchQuery(['categories',locale], ()=>getData(locale,categories))
  return {
    props: {
      dehydratedState:JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}
