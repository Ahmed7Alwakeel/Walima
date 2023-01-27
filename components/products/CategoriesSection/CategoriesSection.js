
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Navigation, Pagination, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import "swiper/css/pagination"
import Link from 'next/link';
import Button from "../../common/Button/Button"
import ProductCard from "../../common/ProductCard/ProductCard"
import SwiperArrows from '../../common/SwiperArrows/SwiperArrows';
import { useTranslation } from "next-i18next"
import { motion } from 'framer-motion';
const CategoriesSection = ({ categories }) => {
    let { t } = useTranslation("common");
    const [isMobile, setMobile] = useState(false);
    const { locale } = useRouter();
    const isMobileHandler = (e) => {
        setMobile(e.matches);
    };
    useEffect(() => {
        try {
            // Chrome & Firefox
            window
                .matchMedia(`(max-width : 1024px)`)
                .addEventListener("change", isMobileHandler);
            setMobile(window.matchMedia(`(max-width : 1024px)`).matches);
        } catch (e1) {
            try {
                // Safari
                window
                    .matchMedia(`(max-width : 1024px)`)
                    .addListener(() => isMobileHandler());
                setMobile(window.matchMedia(`(max-width : 1024px)`).matches);
            } catch (e2) {
                console.error(e2);
            }
        }
    }, []);

    return (
        <>
            {isMobile ?
                <div className='product-page-category-section '>
                    {categories?.sort((a, b) => a.order - b.order).map((item, index) => (
                        <div className={`category-items ${index % 2 != 0 && 'bg-aqua'} ${item?.products.length == 1 && "remove-padding"}`} key={index}>
                            <div className='category-header'>
                                <motion.p
                                    initial={{ opacity: 0, }}
                                    whileInView={{ opacity: 1, }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0, duration: .75 }}
                                >{`${t("productsPage.product_category")}`}</motion.p>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: .2, duration: .75 }}
                                >{item.name}</motion.h1>
                            </div>
                            <div className={`category-swiper`}>
                                <Swiper
                                    key={index}
                                    style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
                                    modules={[Navigation]}
                                    navigation={{
                                        nextEl: '.swiper-next',
                                        prevEl: '.swiper-prev',
                                    }}
                                    className='swiper-nav'
                                    slidesPerView={1.2}
                                    spaceBetween={15}
                                    centeredSlides={item?.products?.length == 1 ? true : false}
                                    breakpoints={{
                                        400: {
                                            slidesPerView: 1.2,
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
                                    {item?.products?.sort((a, b) => a.order - b.order).map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <motion.div
                                                initial={{ opacity: 0, y: index<=1?50:0 }}
                                                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .05 }}
                                                transition={{ duration: index <= 1 ? .75 : .5, delay: index <= 1 ? parseFloat((index / 10) + .2) : 0 }}>
                                                <ProductCard
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
                                    <motion.div className={`${item?.products.length <= 1 && 'd-none'}`}
                                        initial={{ opacity: 0, }}
                                        whileInView={{ opacity: 1, }}
                                        viewport={{ once: true }}
                                        transition={{ delay: .2, duration: .75 }}>
                                        <SwiperArrows />
                                    </motion.div>
                                </Swiper>
                            </div>
                            {item?.products.length > 1 && <div className='category-button'>
                                <Link href={`/${locale}/products/category/${item.slug}`} style={{ cursor: 'pointer' }} passHref>
                                    <motion.div className="recipe-category-button"
                                        initial={{ opacity: 0, }}
                                        whileInView={{ opacity: 1, }}
                                        viewport={{ once: true }}
                                        transition={{ delay: .5, duration: .75 }}
                                        onClick={() => { window.scrollTo(0, 0) }}
                                    >
                                        <Button type="normal" text={`${t("productsPage.see_all_products")}`}></Button>
                                    </motion.div>
                                </Link>
                            </div>}
                        </div>
                    ))}
                </div> :
                <div className='product-page-category-section '>
                    {categories?.sort((a, b) => a.order - b.order).map((item, index) => (
                        <div className={`category-items ${index % 2 != 0 && 'bg-aqua'} ${item?.products.length < 4 && "remove-padding"}`} key={index}>
                            <div className='category-header'>
                                <div className='category-head-text'>
                                    <motion.p
                                        initial={{ opacity: 0, }}
                                        whileInView={{ opacity: 1, }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0, duration: .75 }}
                                    >{`${t("productsPage.product_category")}`}</motion.p>
                                    <motion.h1
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: .2, duration: .75 }}
                                    >{item.name}</motion.h1>
                                </div>
                                {item?.products.length > 1 && <motion.div className='category-button'
                                    initial={{ opacity: 0, }}
                                    whileInView={{ opacity: 1, }}
                                    viewport={{ once: true }}
                                    transition={{ delay: .2, duration: .75 }}>
                                    <Link href={`/${locale}/products/category/${item.slug}`} style={{ cursor: 'pointer' }} passHref>
                                        <div
                                            onClick={() => { window.scrollTo(0, 0) }} className='recipe-category-button  button-animation
                                                    button button--wayra button--border-thin button--round-s'>
                                            <Button animate type="normal" text={`${t("productsPage.see_all_products")}`}></Button>
                                        </div>
                                    </Link>
                                </motion.div>}
                            </div>
                            <div className={`category-swiper`}>
                                <Swiper
                                    key={index}
                                    style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
                                    modules={[Navigation, Pagination, Mousewheel]}
                                    navigation={{
                                        nextEl: '.swiper-next',
                                        prevEl: '.swiper-prev',
                                    }}
                                    className='swiper-nav'
                                    breakpoints={{
                                        1024: {
                                            slidesPerView: 3.5,
                                            spaceBetween: 20,
                                        },
                                        1600: {
                                            slidesPerView: 3.75,
                                            spaceBetween: 50
                                        },
                                        1900: {
                                            slidesPerView: 4,
                                            spaceBetween: 50
                                        },
                                    }}
                                    pagination={{
                                        type: "progressbar",
                                        el: ".custom-about-pagination",
                                        clickable: true,
                                        renderBullet: (index, className) => {
                                            return '<span class="' + className + '">' + "</span>"
                                        },
                                    }}
                                >
                                    <motion.div className='custom-about-pagination swiper-pagination-progressbar'
                                        initial={{ opacity: 0, }}
                                        whileInView={{ opacity: 1, }}
                                        viewport={{ once: true }}
                                        transition={{ delay: .5, duration: .75 }}
                                    ></motion.div>
                                    {item?.products?.sort((a, b) => a.order - b.order).map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <motion.div className='product-card-container-section'
                                                initial={{ opacity: 0, y: 50 }}
                                                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .05 }}
                                                transition={{ duration: index <= 3 ? .75 : .5, delay: index <= 3 ? parseFloat((index / 10) + .2) : 0 }}>
                                                <ProductCard
                                                    cardImg={item?.image_desktop?.url}
                                                    cardTime={item.reading_time}
                                                    cardText={item.name}
                                                    // cardDescription={item.description}
                                                    cardDescription={item.small_description}
                                                    cardSlug={item.slug}
                                                    cardIngredients={item.ingredients}
                                                    cardNutrition={item.nutrition_facts}
                                                    imgAlt={item?.image_mobile?.name}
                                                    allProductData={item}
                                                    index={index}
                                                />
                                            </motion.div>
                                        </SwiperSlide>
                                    ))}
                                    <motion.div className={`${item?.products.length <= 3 && 'd-none'}`}
                                        initial={{ opacity: 0, }}
                                        whileInView={{ opacity: 1, }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 1, duration: .75 }}
                                    >
                                        <SwiperArrows />
                                    </motion.div>
                                </Swiper>
                            </div>
                        </div>
                    ))}
                </div>}
        </>
    )
}

export default CategoriesSection