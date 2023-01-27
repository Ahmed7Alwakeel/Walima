
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Navigation, Pagination, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import "swiper/css/pagination"
import Link from 'next/link';
import Button from "../Button/Button"
import RecipeCard from "../RecipeCard/RecipeCard"
import SwiperArrows from '../SwiperArrows/SwiperArrows';
import { useTranslation } from "next-i18next"
import { motion } from 'framer-motion';
const RecipeSection = ({ recipes,productCategory, categoryName }) => {
    let { t } = useTranslation("common")
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
    const recipesText = [{
        title: t("product_details_page.recipes"),
        header: t("product_details_page.inspired_eats"),
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna '
    },]
    return (
        <>
            {isMobile ?
                <div className={`${productCategory&&'background-aqua'} recipe-section-all ${recipes?.length<=1&&"remove-padding"}`}>
                    {recipesText.map((recipe, index) => (
                        <div className='category-items' key={index}>
                            <div className='category-header'>
                                <motion.p
                                    initial={{ opacity: 0,  }}
                                    whileInView={{ opacity: 1,  }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0, duration: .75 }}
                                >
                                    {categoryName ? categoryName : recipe.title}
                                    </motion.p>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: .3, duration: .75 }}
                                >{recipe.header}</motion.h1>
                                {/* <span>{recipe.description}</span> */}
                            </div>
                            <div className={`category-swiper`}>
                                <Swiper
                                    // key={2}
                                    key={recipesText.length + 'mob'}
                                    style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
                                    modules={[Navigation]}
                                    navigation={{
                                        nextEl: '.swiper-next',
                                        prevEl: '.swiper-prev',
                                    }}
                                    centeredSlides={recipes?.length==1?true:false}
                                    className='swiper-nav'
                                    slidesPerView={1.25}
                                    spaceBetween={15}
                                    breakpoints={{

                                        390: {
                                            slidesPerView:1.25,
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
                                    {recipes?.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <motion.div className='recipe-card-container-section'
                                            initial={{ opacity: 0, y: index<=1?50:0 }}
                                            whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .05 }}
                                            transition={{ duration: index<=1?.75:.5, delay: index<=1?parseFloat((index / 10) + .2):0 }}
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
                                    <motion.div className={`${recipes?.length <= 1 && 'd-none'}`}
                                        initial={{ opacity: 0,  }}
                                        whileInView={{ opacity: 1,  }}
                                        viewport={{ once: true }}
                                        transition={{ delay: .1, duration: .5 }}
                                    >
                                        <SwiperArrows />
                                    </motion.div>
                                </Swiper>
                            </div>
                            <motion.div className='category-button'
                            onClick={()=>{window.scrollTo(0,0)}}
                                initial={{ opacity: 0,  }}
                                whileInView={{ opacity: 1, }}
                                viewport={{ once: true }}
                                transition={{ delay: .5, duration: .75 }}>
                                <Link href={`/${locale}/recipes`} style={{ cursor: 'pointer' }} passHref>
                                    <div className='recipe-category-button'>
                                        <Button type="normal" text={`${t("product_details_page.see_all_recipes")}`}></Button>
                                    </div>
                                </Link>
                            </motion.div>
                        </div>
                    ))}
                </div> :
                <div className={`${productCategory&&'background-aqua'} recipe-section-all ${recipes?.length<4&&"remove-padding"}`}>
                    {recipesText.map((recipe, index) => (
                        <div className='category-items' key={index}>
                            <motion.div className='category-header'
                                initial={{ opacity: 0,  }}
                                whileInView={{ opacity: 1,  }}
                                viewport={{ once: true }}
                                transition={{ delay: .1, duration: .75 }}
                            >
                                <div className='category-head-text'>
                                    <motion.p initial={{ opacity: 0, y: -10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{
                                            delay: 0,
                                            duration: .75,
                                        }}>
                                            {categoryName ? categoryName : recipe.title}
                                            </motion.p>
                                    <motion.h1 initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{
                                            delay: 0.3,
                                            duration: .75,
                                        }}>{recipe.header}</motion.h1>
                                        
                                </div>
                                {/* <div className='category-head-description'>
                                    <span>{recipe.description}</span>
                                </div> */}
                                <div className='category-button'>
                                    <Link href={`/${locale}/recipes`} style={{ cursor: 'pointer' }} passHref>
                                        <motion.div 
                                        onClick={()=>{window.scrollTo(0,0)}}
                                        className='recipe-category-button
                                        button-animation button button--wayra button--border-thin button--round-s'
                                            initial={{ opacity: 0, }}
                                            whileInView={{ opacity: 1, }}
                                            viewport={{ once: true, amount: 0.2 }}
                                            transition={{
                                                delay: 0.5,
                                                duration: .75,
                                            }}>
                                            <Button animate type="normal" text={`${t("product_details_page.see_all_recipes")}`}></Button>
                                        </motion.div>
                                    </Link>
                                </div>
                            </motion.div>
                            <div className='category-swiper'>
                                <Swiper
                                    // key={2}
                                    key={recipesText.length + 'desk'}
                                    style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
                                    modules={[Navigation, Pagination,Mousewheel]}
                                    navigation={{
                                        nextEl: '.swiper-next',
                                        prevEl: '.swiper-prev',
                                    }}
                                    className='swiper-nav'
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
										el: ".recipe-section-pagination",
										clickable: true,
										renderBullet: (index, className) => {
											return '<span class="' + className + '">' + "</span>"
										},
									}}
								>
									<motion.div className='recipe-section-pagination swiper-pagination-progressbar'
										initial={{ opacity: 0, }}
                                        whileInView={{ opacity: 1, }}
                                        viewport={{ once: true }}
                                        transition={{ delay: .5, duration: .75 }}
									></motion.div>
                                    {recipes?.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <motion.div className='recipe-card-container-section'
                                          initial={{ opacity: 0, y: 50 }}
                                          whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .05 }}
                                          transition={{ duration: index <= 3 ? .75 : .5, delay: index <= 3 ? parseFloat((index / 10) + .2) : 0 }}
                                            >
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
                                    <motion.div className={`${recipes?.length <= 3 && "d-none"}`}
                                    initial={{ opacity: 0,  }}
                                    whileInView={{ opacity: 1,  }}
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

export default RecipeSection

