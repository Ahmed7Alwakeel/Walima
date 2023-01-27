
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import "swiper/css/pagination"
import Link from 'next/link';
import Button from "../../common/Button/Button"
import SwiperArrows from '../../common/SwiperArrows/SwiperArrows';
import ProductCard from '../../common/ProductCard/ProductCard';
import { motion } from 'framer-motion';
const CategorySection = ({ productsResults, title, delayMaintainer, productsSearchPage }) => {
    const [isMobile, setMobile] = useState(false)
    const [isTablet,setTablet]=useState(false)
    const { locale, asPath } = useRouter()
    const [isLarge,setLarge]=useState(false)
    const isLargeHandler = (e) => {
        setLarge(e.matches)
    } 
    useEffect(() => {
        window.matchMedia(`(min-width : 1900px) `).addEventListener("change", isLargeHandler)
        setLarge(window.matchMedia(`(min-width : 1900px)`).matches)
}, [])
    const isMobileHandler = (e) => {
        setMobile(e.matches)
    }
    const isTabletHandler = (e) => {
        setTablet(e.matches)
    } 
    useEffect(() => {
        //    (window.innerWidth)=768?setTablet(true):setTablet(false)
            // window.matchMedia(`(width : 768px)`)?setTablet(true):setTablet(false)
            window.matchMedia(`(min-width : 768px) and (max-width:1024px)`).addEventListener("change", isTabletHandler)
            setTablet(window.matchMedia(`(min-width : 768px) and (max-width:1024px)`).matches)
    }, [])
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
        <div className={`products-category-section-bookmark ${(productsResults?.length==1 && isMobile) && "remove-padding"} ${productsSearchPage ? 'productsSearchPage' : ''}`}>
            {/* <div className='header-section'>
                <motion.h1
                    initial={{ opacity: 0, }}
                    whileInView={{ opacity: 1, }}
                    viewport={{ once: true }}
                    transition={{ delay: .75, duration: .75 }}
                >{title}</motion.h1>
            </div> */}
            {isMobile ?
                <div className='cards-container'>
                    <div className='category-items'>
                        <div className={`category-swiper`}>
                            <Swiper
                                // key={Math.random()}
                                style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
                                modules={[Navigation]}
                                navigation={{
                                    nextEl: '.swiper-next',
                                    prevEl: '.swiper-prev',
                                }}
                                className='swiper-nav'
                                centeredSlides={productsResults?.length==1?true:false}
                                slidesPerView={1.25}
                                spaceBetween={20}
                                breakpoints={{
                                    400: {
                                        slidesPerView:1.3,
                                        spaceBetween: 20,
                                    },
                                    600: {
                                        slidesPerView: 2.35,
                                        spaceBetween: 20,
                                    },
                                    1023: {
                                        slidesPerView: 3,
                                        spaceBetween: 12,
                                    },
                                }}

                            >
                                {productsResults?.sort((a, b) => a.order - b.order).map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <motion.div className='product-card-container-section'
                                            initial={{ opacity: 0, y: index<=1?50:0 }}
                                            whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .01 }}
                                            // transition={{ duration: .75, delay: index <= 1 ? parseFloat((index / 10) + .75) : .1 }}
                                            transition={{ duration: .75, delay: isTablet&&index<=2 ? parseFloat((index / 10) + 1) : index <= 1?parseFloat((index / 10) + 1):.1 }}
                                            // transition={{ duration: .75, delay: index <= 1 ? parseFloat((index / 10) + .75) : parseFloat((index / 10) + .75) }}
                                        >
                                            <ProductCard
                                                cardImg={item?.image_mobile[0]?.url}
                                                // cardImg={'/img/products/category/SUN002_WALIMA_Cut-Green-Beans_3D.png'}
                                                // cardTime={item.time}
                                                cardTime={item.reading_time}
                                                cardText={item.name}
                                                // cardDescription={item.description}
                                                cardDescription={item.small_description}
                                                cardSlug={item.slug}
                                                cardIngredients={item.ingredients}
                                                cardNutrition={item.nutrition_facts}
                                                imgAlt={item?.image_mobile?.name}
                                                allProductData={item}

                                            />

                                        </motion.div>
                                    </SwiperSlide>
                                ))}
                                <motion.div className={`${productsResults?.length <= 1 && 'd-none'}`}
                                    initial={{ opacity: 0, }}
                                    whileInView={{ opacity: 1, }}
                                    viewport={{ once: true }}
                                    transition={{ delay: .3, duration: .75 }}
                                >
                                    <SwiperArrows />
                                </motion.div>
                            </Swiper>
                        </div>
                    </div>
                </div> :
                <div className='cards-container'>
                    {productsResults?.sort((a, b) => a.order - b.order).map((item, index) => (
                        <motion.div className='card-section' key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .05 }}
                            transition={{ duration: .75, delay:isLarge&&index<=3?parseFloat((index / 10) + 1):index <= 2 ?parseFloat((index / 10) + 1): parseFloat((index / 10) + .2)  }}
                        >
                            <ProductCard
                                productSearch
                                cardImg={item?.image_desktop?.url}
                                // cardImg={'/img/products/category/SUN002_WALIMA_Cut-Green-Beans_3D.png'}
                                // cardTime={item.time}
                                cardTime={item.reading_time}
                                cardText={item.name}
                                // cardDescription={item.description}
                                cardDescription={item.small_description}
                                cardSlug={item.slug}
                                cardIngredients={item.ingredients}
                                cardNutrition={item.nutrition_facts}
                                imgAlt={item?.image_mobile?.name}
                                allProductData={item}
                                delayMaintainer
                            />
                        </motion.div>
                    ))}
                </div>}
        </div>
    )
}

export default CategorySection


