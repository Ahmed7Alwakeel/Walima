
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
import RecipeCard from "../../common/RecipeCard/RecipeCard"
import SwiperArrows from '../../common/SwiperArrows/SwiperArrows';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';

const CategoriesSection = ({ recipeCategory }) => {
    const { t } = useTranslation('common');
    const [isMobile, setMobile] = useState(false)
    const { locale } = useRouter()
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
            {isMobile ?
                <div className='recipes-category-section'>
                    {recipeCategory?.map((category, index) => (
                        <div className={`category-items ${index % 2 != 0 && 'bg-aqua'}`} key={index}>
                            <div className='category-header'>
                                <motion.p className='mb-1' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: .75, delay: 0 }}>{t('recipes_page.recipe_category')}</motion.p>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: .75, delay: 0.3 }}>{category.title}</motion.h1>
                                {/* <span>{category.text}</span> */}
                            </div>
                            <div className={`category-swiper`}>
                                <Swiper
                                    key={index}
                                    style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
                                    modules={[Navigation]}
                                    navigation={{
                                        nextEl: '.swiper-next-recipe-page',
                                        prevEl: '.swiper-prev-recipe-page',
                                    }}
                                    className='swiper-recipe-page'
                                    slidesPerView={1.25}
                                    spaceBetween={15}
                                    centeredSlides={category?.recipes.length == 1 ? true : false}
                                    breakpoints={{

                                        390: {
                                            slidesPerView: 1.25,
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

                                    {category?.recipes.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <motion.div className='recipe-card-container-section'
                                                initial={{ opacity: 0, y: index<=1?50:0 }}
                                                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .05 }}
                                                transition={{ duration: index <= 1 ? .75 : .5, delay: index <= 1 ? parseFloat((index / 10) + .2) : 0 }}
                                            >
                                                <RecipeCard mainProduct={item?.mainproduct?.name} 
                                                    allRecipeData={item}
                                                    cardName={item?.name}
                                                    cardPrice={item?.price_range}
                                                    cardServes={item?.serves}
                                                    cardCookingTime={item?.cooking_time}
                                                    cardPreparationTime={item?.preparation_time}
                                                    cardSlug={item?.slug}
                                                    cardImg={item?.image_mobile?.url}
                                                    imgAlt={item.image_desktop?.name}
                                                />
                                            </motion.div>
                                        </SwiperSlide>
                                    ))}
                                    <motion.div className={`swiper-arrows-container swiper-recipe-page ${category?.recipes.length == 1 && 'd-none'}`}
                                        initial={{ opacity: 0, }}
                                        whileInView={{ opacity: 1, }}
                                        viewport={{ once: true }}
                                        transition={{ duration: .75, delay: 0.3 }}
                                    >
                                        <div className='swiper-button  swiper-prev-recipe-page'>
                                            {locale == "ar" ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
                                        </div>
                                        <div className='swiper-button swiper-next-recipe-page'>
                                            {locale == "en" ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
                                        </div>
                                    </motion.div>
                                </Swiper>
                            </div>
                            {/* <motion.div className='category-button'
                            initial={{ opacity: 0,  }} 
                            whileInView={{ opacity: 1,  }} 
                            viewport={{ once: true }} 
                            transition={{duration: .75, delay: 0.5}}
                            >
                                <Link href={`/${locale}/products`} style={{ cursor: 'pointer' }} passHref>
                                    <div 
                                    onClick={()=>{window.scrollTo(0,0)}}
                                    className='recipe-category-button'>
                                        <Button type="normal" text={t('recipes_page.see_recipes')}></Button>
                                    </div>
                                </Link>
                            </motion.div> */}
                        </div>
                    ))}
                </div> :
                <div className='recipes-category-section'>
                    {recipeCategory?.map((category, index) => (
                        <div className={`category-items ${index % 2 != 0 && 'bg-aqua'}`} key={index}>
                            <div className='category-header'>
                                <div className='category-head-text'>
                                    <motion.p className='mb-2' initial={{ opacity: 0, }} whileInView={{ opacity: 1, }} viewport={{ once: true }} transition={{ duration: .75, delay: 0 }}>{t('recipes_page.recipe_category')}</motion.p>
                                    <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .75, delay: 0.3 }}>
                                        {category.title}
                                    </motion.h1>
                                </div>
                                {/* <div className='category-head-description'>
                                    <span>{category.text}</span>
                                </div> */}
                                {/* <motion.div className='category-button' initial={{ opacity: 0,  }} whileInView={{ opacity: 1,  }} viewport={{ once: true }} transition={{duration: .75, delay: 0.5}}>
                                    <Link href={`/${locale}/recipes`} style={{ cursor: 'pointer' }} passHref>
                                        <div 
                                        onClick={()=>{window.scrollTo(0,0)}}
                                        className='recipe-category-button button-animation button button--wayra button--border-thin button--round-s'>
                                            <Button animate type="normal" text={t('recipes_page.see_recipes')}></Button>
                                        </div>
                                    </Link>
                                </motion.div> */}
                            </div>
                            <div className='category-swiper'>
                                <Swiper
                                    key={category?.recipes.length + index}
                                    style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
                                    modules={[Navigation, Pagination, Mousewheel]}
                                    navigation={{
                                        nextEl: '.swiper-next-category',
                                        prevEl: '.swiper-prev-category',
                                    }}
                                    className='swiper-category'
                                    // slidesPerView={3}
                                    // spaceBetween={0}
                                    breakpoints={{
                                        1024: {
                                            slidesPerView: 3.5,
                                            spaceBetween: 50,
                                        },
                                        1600: {
                                            slidesPerView: 3.75,
                                            spaceBetween: 50
                                        },
                                    }}

                                    pagination={{
                                        type: "progressbar",
                                        el: ".recipe-category-pagination",
                                        clickable: true,
                                        renderBullet: (index, className) => {
                                            return '<span class="' + className + '">' + "</span>"
                                        },
                                    }}
                                >
                                    <motion.div className='recipe-category-pagination swiper-pagination-progressbar'
                                        initial={{ opacity: 0, }}
                                        whileInView={{ opacity: 1, }}
                                        viewport={{ once: true }}
                                        transition={{ delay: .5, duration: .75 }}
                                    ></motion.div>
                                    {category?.recipes.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <motion.div className='recipe-card-container-section'
                                                initial={{ opacity: 0, y: 50 }}
                                                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .05 }}
                                                transition={{ duration: index <= 3 ? .75 : .5, delay: index <= 3 ? parseFloat((index / 10) + .2) : 0 }}>
                                                <RecipeCard mainProduct={item?.mainproduct?.name} 
                                                    allRecipeData={item}
                                                    cardName={item?.name}
                                                    cardPrice={item?.price_range}
                                                    cardServes={item?.serves}
                                                    cardCookingTime={item?.cooking_time}
                                                    cardPreparationTime={item?.preparation_time}
                                                    cardSlug={item?.slug}
                                                    cardImg={item?.image_desktop?.url}
                                                    imgAlt={item.image_desktop?.name}
                                                />
                                            </motion.div>
                                        </SwiperSlide>
                                    ))}


                                    <motion.div className={`swiper-arrows-container swiper-category ${category?.recipes.length <= 3 ? 'd-none' : ''}`}
                                        initial={{ opacity: 0, }}
                                        whileInView={{ opacity: 1, }}
                                        viewport={{ once: true }}
                                        transition={{ duration: .75, delay: 1 }}
                                    >

                                        <div className='swiper-button  swiper-prev-category'>
                                            {locale == "ar" ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
                                        </div>
                                        <div className='swiper-button swiper-next-category'>
                                            {locale == "en" ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
                                        </div>
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

