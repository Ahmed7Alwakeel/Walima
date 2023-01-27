
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
import { useTranslation } from "next-i18next"
import { motion } from "framer-motion";
const CategorySection = ({ categoryName, categoryProducts, productCategory,categoryImg, delayMaintainer }) => {
    let { t } = useTranslation("common")
    const [isMobile, setMobile] = useState(false)
    const [isTablet, setTablet] = useState(false)
    const { locale } = useRouter()
    const [isLarge, setLarge] = useState(false)
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
        <div className='products-category-section'>
            {isMobile ?
                <>
                    <div className='circle-container-wrapper'>
                        <motion.div className="circle-container"
                            initial={{ opacity: 0, }}
                            whileInView={{ opacity: 1, }}
                            viewport={{ once: true }}
                            transition={{ duration: .75, delay: 1.5 }}
                        >
                            <div className="big-img-container">
                                <motion.img
                                    src={categoryImg}
                                    className="big-img"
                                    alt="big"
                                    initial={{ opacity: 0, }}
                                    whileInView={{ opacity: 1, }}
                                    viewport={{ once: true }}
                                    transition={{ duration: .75, delay: 2 }}
                                />
                            </div>
                            <div className="small-img-container">
                                <motion.img
                                    initial={{ opacity: 0, }}
                                    whileInView={{ opacity: 1, }}
                                    viewport={{ once: true }}
                                    transition={{ duration: .75, delay: 2.5 }}
                                    src="/img/products/image 20.png"
                                    className="small-img"
                                    alt="small"
                                />
                            </div>
                        </motion.div>
                    </div>
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
                                    slidesPerView={1.25}
                                    spaceBetween={15}
                                    centeredSlides={categoryProducts?.length==1?true:false}
                                    breakpoints={{

                                        400: {
                                            slidesPerView:1.35,
                                            spaceBetween: 20,
                                        },
                                        600: {
                                            slidesPerView: 2.5,
                                            spaceBetween: 20
                                        },
                                        1023: {
                                            slidesPerView: 3,
                                            spaceBetween: 12,
                                        },
                                    }}
                                >
                                    {categoryProducts?.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <motion.div className='product-card-container-section'
                                                initial={{ opacity: 0, y: index<=1?20:0 }}
                                                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .05 }}
                                                transition={{ duration: .75, delay: isTablet && index <= 2 ? parseFloat((index / 10) + 2) : index <= 1 ? parseFloat((index / 10) + .2) : .1 }}
                                            >
                                                <ProductCard
                                                    productCategory
                                                    cardImg={item?.image_mobile && item?.image_mobile[0]?.url}
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
                                    <motion.div className={`${categoryProducts?.length <= 1 && 'd-none'}`}
                                        initial={{ opacity: 0, }}
                                        whileInView={{ opacity: 1, }}
                                        viewport={{ once: true }}
                                        transition={{ delay: .3, duration: .75 }}
                                    >
                                        <SwiperArrows />
                                    </motion.div>
                                </Swiper>
                            </div>
                            {/* <div className='product-button-container'>
                            <Link href={`/${locale}/products`} style={{ cursor: 'pointer' }}>
                                <motion.div className="product-button"
                                    initial={{ opacity: 0, y: -20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: .8, duration: .75 }}
                                >
                                    <Button type="normal" text={`${t("productsPage.see_all_products")}`}></Button>
                                </motion.div>
                            </Link>
                        </div> */}
                        </div>
                    </div>
                </>
                :
                <motion.div className='cards-container'
                //          initial={{ opacity: 0,  }} 
                // whileInView={{ opacity: 1, }} 
                // viewport={{ once: true,amount:.2 }} 
                // transition={{duration: .75, delay:0}}
                >
                    {categoryProducts?.map((item, index) => (
                        <motion.div className='card-section' key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .01 }}
                            transition={{ duration: .75, delay: isLarge && index <= 3 ? parseFloat((index / 10) + 2.5) : index <= 2 ? parseFloat((index / 10) + 2.5) : parseFloat((index / 10) + .1) }}
                        // transition={{ duration: .75, delay:isLarge?parseFloat((index / 10) + 2.5): index <= 2 ? parseFloat((index / 10) + 2.5) : parseFloat((index / 10) + .1) }}
                        >
                            <ProductCard
                                productCategory={productCategory}
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
                </motion.div>}
        </div>
    )
}
export default CategorySection


