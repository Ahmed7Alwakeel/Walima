
import React from 'react'
import { useRouter } from "next/router"
import Link from "next/link"
import { useTranslation } from "next-i18next"
import SearchSection from './SearchSection'

const OverviewSection = ({categoriesData, productsData, setInsideCategories, setInsideProducts, setInsideRecipes, recipesSearchPage, number}) => {
    let { t } = useTranslation("common")
    const {locale}=useRouter()
    return (
        <>
            <div className='products-search-overview-section'>
                <div className='header-container'>
                <h1>{`${t('search.search_results')}`} {`(${number})`}</h1>
                </div>
                <SearchSection recipesSearchPage setInsideProducts={setInsideProducts} setInsideCategories={setInsideCategories} setInsideRecipes={setInsideRecipes} categoriesData={categoriesData} productsData={productsData}/>
            </div>
        </>
    )
}

export default OverviewSection

