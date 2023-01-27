
import Head from "next/head"
import React, { useEffect, useState } from 'react'
import ClaimsSection from '../../../components/about/ClaimsSection/ClaimsSection'
import Footer from "../../../components/common/Footer/Footer"
import ProductsType from "../../../components/home/ProductSection/ProductsType/ProductsType"
import CategorySection from "../../../components/recipeCategory/CategorySection/CategorySection"
import OverviewSection from "../../../components/recipeCategory/OverviewSection/OverviewSection"
import BlogsSection from '../../../components/recipes/BlogsSection/BlogsSection'
const RecipeCategory = () => {
    const [isMobile, setMobile] = useState(false)
    const isMobileHandler = (e) => {
        setMobile(e.matches)
    }
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
    return (
        <>
            <Head>
                <title>Walima | Recipes | Category</title>
                <meta name="description" />
            </Head>
            <div className="overview-recipe-bg">
                {!isMobile && <img src='/img/recipes/recipe-bg1.png' className='bg-img' alt='bg-image'></img>}
                <OverviewSection />
            </div>
            <CategorySection />
            <div className="category-recipe-bg">
        {!isMobile && <img src='/img/recipes/recipe-bg2.png' className='bg-img category-bg' alt='bg-image'></img>}
            <ClaimsSection />
            </div>
            <div className="productType-section-recipe-category">
                <ProductsType />
            </div>
            <div className="products-recipe-recipeDetail-bg ">
                {!isMobile &&
                    <img src='/img/recipes/recipeDetails/recipe-detail2.png' className='bg-img bg2' alt='bg-image'></img>
                }
                {/* <BlogsSection /> */}
            </div>
            <Footer />
        </>
    )
}
export default RecipeCategory
