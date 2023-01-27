
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
import RecipeCard from "../../common/RecipeCard/RecipeCard"
import SwiperArrows from '../../common/SwiperArrows/SwiperArrows';

const CategoriesSection = () => {
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
    const recipes = [{
        title: 'Recipe',
        header: 'Inspired Eats',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna '
    },]
    const arr = [1, 2,3,4,5]
    return (
        <>
            {isMobile ?
                <div className='recipe-details-category-section'>
                    {recipes.map((recipe, index) => (
                        <div className='category-items' key={index}>
                            <div className='category-header'>
                                <p>{recipe.title}</p>
                                <h1>{recipe.header}</h1>
                                <span>{recipe.description}</span>
                            </div>
                            <div className='category-swiper'>
                                <Swiper
                                //  key={Math.random()}
                                 style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
                                    modules={[Navigation]}
                                    navigation={{
                                        nextEl: '.swiper-next',
                                        prevEl: '.swiper-prev',
                                    }}
                                    className='swiper-nav'
                                    slidesPerView={1.35}
                                            spaceBetween={10}
                                            breakpoints={{
                                              400: {
                                                slidesPerView: 1.35,
                                                spaceBetween: 20,
                                              },
                                              769:{
                                                  slidesPerView: 2.35,
                                                  spaceBetween: 0,
                                                },
                                              1023: {
                                                slidesPerView: 3,
                                                spaceBetween: 12,
                                              },
                                            }}
                                >
                                  
                                    {arr.map((item, index) => (
                                        
                                        <SwiperSlide key={index}>
                                             <div className='recipe-card-container-section'>
                                                        <RecipeCard mainProduct={item?.mainproduct?.name}  title={item.headText} info={item.info} />
                                                    </div>                         
                                        </SwiperSlide>
                                    ))}
                                    
                                   
                                   <SwiperArrows/>
                                </Swiper>
                            </div>
                            <div className='category-button'>
                                <Link href={`/${locale}/products`} style={{ cursor: 'pointer' }} passHref>
                                    <div className='recipe-category-button'>
                                        <Button type="normal" text="See All Recipes"></Button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div> :
                <div className='recipe-details-category-section'>
                    {recipes.map((recipe, index) => (
                        <div className='category-items' key={index}>
                            <div className='category-header'>
                                <div className='category-head-text'>
                                    <p>{recipe.title}</p>
                                    <h1>{recipe.header.split(" ")[0]}
                                        <br />{recipe.header.split(" ")[1]}</h1>
                                </div>
                                <div className='category-head-description'>
                                    <span>{recipe.description}</span>
                                </div>
                                <div className='category-button'>
                                    <Link href={`/${locale}/recipes`} style={{ cursor: 'pointer' }} passHref>
                                        <div className='recipe-category-button'>
                                            <Button type="normal" text="See All Recipes"></Button>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className='category-swiper'>
                                <Swiper
                                //  key={Math.random()}
                                 style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
                                    modules={[Navigation, Pagination]}
                                    navigation={{
                                        nextEl: '.swiper-next',
                                        prevEl: '.swiper-prev',
                                    }}
                                    pagination={{
                                        type: "progressbar",
                                    }}
                                    className='swiper-nav'
                                    // slidesPerView={3}
                                    // spaceBetween={0}
                                    breakpoints={{
                                        1024: {
                                          slidesPerView: 3,
                                          spaceBetween: 0,
                                        },
                                      
                                      }}

                                >
                                    
                                    {arr.map((item, index) => (
                                        
                                        <SwiperSlide key={index}>
                                            <div className='recipe-card-container-section'>
                                                        <RecipeCard mainProduct={item?.mainproduct?.name}  title={item.headText} info={item.info} />
                                                    </div>
                                        </SwiperSlide>
                                    ))}
                                    
                                    <SwiperArrows/>
                                </Swiper>
                            </div>
                        </div>
                    ))}
                </div>}

        </>
    )
}

export default CategoriesSection

