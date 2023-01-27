
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
import RecipeCard from '../../common/RecipeCard/RecipeCard';

const CategorySection = () => {
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
    let recipe = [1,2,3,4,5,6,7,8]
    return (
        <div className='recipe-category-section'>
            {isMobile ?
                <div className='cards-container'>
                    <div className='category-items'>
                        <div className='category-swiper'>
                            <Swiper
                                // key={Math.random()}
                                style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
                                modules={[Navigation]}
                                navigation={{
                                    nextEl: '.swiper-next',
                                    prevEl: '.swiper-prev',
                                }}
                                className='swiper-nav'
                                slidesPerView={1.1}
                                spaceBetween={15}
                                breakpoints={{
                                              
                                    390: {
                                      slidesPerView: 1.35,
                                      spaceBetween: 20,
                                    },
                                  600:{
                                    slidesPerView:2.5,
                                    spaceBetween:20
                                  },
                                    1023: {
                                      slidesPerView: 3,
                                      spaceBetween: 12,
                                    },
                                  }}
                               
                            >
                                {recipe.map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className='recipe-card-container-section'>
                                        <RecipeCard mainProduct={item?.mainproduct?.name}  />

                                        </div>
                                    </SwiperSlide>
                                ))}
                                <SwiperArrows />
                            </Swiper>
                        </div>
                      
                    </div>
                </div> : 
                <div className='cards-container'>
                    {recipe.map((item, index) => (
                        <div className='card-section' key={index}>
                            <RecipeCard mainProduct={item?.mainproduct?.name}   />
                        </div>
                    ))}
                </div>}
        </div>
    )
}

export default CategorySection


