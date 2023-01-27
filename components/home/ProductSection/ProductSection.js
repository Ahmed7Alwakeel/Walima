
import SearchSection from "./SearchSection/SearchSection"
import ProductsType from "./ProductsType/ProductsType"
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
const ProductSection = ({ productData, categoriesData, productsData }) => {
    const [isMobile, setMobile] = useState(false)
    const isMobileHandler = (e) => {
        setMobile(e.matches)
    }
    useEffect(() => {
        try {
            // Chrome & Firefox
            window.matchMedia(`(max-width : 768px)`).addEventListener("change", isMobileHandler)
            setMobile(window.matchMedia(`(max-width : 768px)`).matches)
        } catch (e1) {
            try {
                // Safari
                window.matchMedia(`(max-width : 768px)`).addListener(() => isMobileHandler())
                setMobile(window.matchMedia(`(max-width : 768px)`).matches)
            } catch (e2) {
                console.error(e2)
            }
        }
    }, [])
    return (
        <>
            <div className="background-white">
                <motion.div className="search-section"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{once:true, marginTop:isMobile?0: 20,amount:isMobile?.2:.9}}
                    transition={{ delay: .2, duration: .75 }}
                >
                    <SearchSection categoriesData={categoriesData} productsData={productsData} />
                </motion.div>
                <motion.div className="productType-section"
                //  initial={{ opacity: 0, y: -20 }}
                //  whileInView={{ opacity: 1, y: 0 }}
                //  viewport={{ once:true}}
                //  transition={{ delay: .9, duration: .75 }}
                >
                    <ProductsType inHomePage exploreProducts={productData?.ProductsBlock} productData={productData} categoriesData={categoriesData} />
                </motion.div>
            </div>
        </>

    )
}

export default ProductSection


