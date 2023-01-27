
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
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
const ProductsSection = ({ products, allProducts, favoritePage,bg, delayMaintainer }) => {
    const [isMobile, setMobile] = useState(false)
    const { locale, asPath } = useRouter();
    const { t } = useTranslation('common');
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
        <div className={`products-category-section-bookmark ${bg&&"aqua-bg"} ${(products?.length==1 && isMobile) && "remove-padding"}`}>
            <motion.div className='header-section'
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: .1, duration: .75 }}
            >
                <h1>{t('bookmarks.products')}</h1>
            </motion.div>
            {isMobile ?
                <div className='cards-container'>
                    <div className='category-items'>
                        {products.length > 0 ?
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
                                    slidesPerView={1.2}
                                    spaceBetween={20}
                                    centeredSlides={products?.length==1?true:false}
                                    breakpoints={{
                                        390: {
                                            slidesPerView: 1.2,
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
                                    {products?.sort((a, b) => a.order - b.order).map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <motion.div className='product-card-container-section'
                                                initial={{ opacity: 0, y: index<=1?50:0 }}
                                                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .05 }}
                                                transition={{ duration: index<=1?.75:.5, delay: index<=1?parseFloat((index / 10) + .2):0 }}
                                                >
                                                <ProductCard
                                                    allProducts={allProducts}
                                                    favorite={favoritePage}
                                                    cardImg={item?.image_mobile[0]?.url}
                                                    // cardImg={'/img/products/category/SUN002_WALIMA_Cut-Green-Beans_3D.png'}
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
                                        </SwiperSlide>
                                    ))}
                                    <motion.div className={`${products?.length <= 1 && 'd-none'}`}
                                        initial={{ opacity: 0, }}
                                        whileInView={{ opacity: 1, }}
                                        viewport={{ once: true }}
                                        transition={{ delay: .3, duration: .75 }}
                                    >
                                        <SwiperArrows />
                                    </motion.div>
                                </Swiper>
                            </div>
                            :
                            <motion.div className='w-100  mt-5 pt-3'
                                initial={{ opacity: 0, }}
                                whileInView={{ opacity: 1, }}
                                viewport={{ once: true }}
                                transition={{ delay: .5, duration: .75 }}
                            >
                                <h1 className='somatic-rounded text-center'>{t('bookmarks.no_favourite_products')}</h1>
                            </motion.div>
                        }
                    </div>
                </div> :
                <div className='cards-container'>
                    {products.length > 0 ?
                        products?.sort((a, b) => a.order - b.order).map((item, index) => (
                            <motion.div className='card-section'
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, }}
                                transition={{ duration: .75, delay: parseFloat((index / 10) + .2) }}
                            >
                                <ProductCard
                                    productSearch
                                    allProducts={allProducts}
                                    favorite={favoritePage}
                                    cardImg={item?.image_desktop?.url}
                                    // cardImg={'/img/products/category/SUN002_WALIMA_Cut-Green-Beans_3D.png'}
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
                        )) :
                        <motion.div className='w-100 no-favorite-message'
                            initial={{ opacity: 0, }}
                            whileInView={{ opacity: 1, }}
                            viewport={{ once: true }}
                            transition={{ delay: .5, duration: .75 }}
                        >
                            <h1 className='somatic-rounded text-center'>{t('bookmarks.no_favourite_products')}</h1>
                        </motion.div>
                    }
                </div>}
        </div>
    )
}

export default ProductsSection


