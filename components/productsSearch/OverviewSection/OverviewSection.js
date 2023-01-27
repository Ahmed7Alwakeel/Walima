
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import Link from "next/link"
import { useTranslation } from "next-i18next"
import { motion } from 'framer-motion'
import SearchSection from './SearchSection'

const OverviewSection = ({number, categoriesData, productsData,setInsideCagtegories,setInsideProducts, recipesSearchPage}) => {
    let { t } = useTranslation("common")

    const {locale}=useRouter();
    return (
        <>
            <div className='products-search-overview-section'>
                <motion.div className='header-container' initial={{ opacity: 0, y: -10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0  , duration: 0.75 }}>
                    <h1>{`${t('search.search_results')}`} {`(${number})`}</h1>
                </motion.div>
                    <SearchSection productsSearchPage setInsideProducts={setInsideProducts} setInsideCagtegories={setInsideCagtegories} categoriesData={categoriesData} productsData={productsData}/>
                {/* {recipesSearchPage && 
                <SearchSection/>
                } */}
            </div>
        </>
    )
}

export default OverviewSection

