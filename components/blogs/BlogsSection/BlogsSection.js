import React, { useEffect, useState } from 'react'
import Button from "../../common/Button/Button"
import { useRouter } from 'next/router';
import BlogCard from '../../common/BlogCard/BlogCard';
import SwiperArrows from '../../common/SwiperArrows/SwiperArrows';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/grid"
import "swiper/css/effect-fade"
import "swiper/css/pagination"
const BlogsSection = () => {
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
    const [more, setMore] = useState(false)
    const arr = !more ? [
        {
            img: '/img/blogs/Rectangle 1183.png',
            time: '10min Read',
            headText: 'Jan - Meal Plan: Week 4',
            descreption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..'
        },
        {
            img: '/img/blogs/Rectangle 1184.png',
            time: '10min Read',
            headText: 'Jan - Meal Plan: Week 4',
            descreption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..'
        },
        {
            img: '/img/blogs/Rectangle 1185.png',
            time: '10min Read',
            headText: 'Jan - Meal Plan: Week 4',
            descreption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..'
        },
        {
            img: '/img/blogs/Rectangle 1185.png',
            time: '10min Read',
            headText: 'Jan - Meal Plan: Week 4',
            descreption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..'
        },
        {
            img: '/img/blogs/Rectangle 1184.png',
            time: '10min Read',
            headText: 'Jan - Meal Plan: Week 4',
            descreption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..'
        },
        {
            img: '/img/blogs/Rectangle 1183.png',
            time: '10min Read',
            headText: 'Jan - Meal Plan: Week 4',
            descreption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..'
        },
    ] :
        [
            {
                img: '/img/blogs/Rectangle 1183.png',
                time: '10min Read',
                headText: 'Jan - Meal Plan: Week 4',
                descreption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..'
            },
            {
                img: '/img/blogs/Rectangle 1184.png',
                time: '10min Read',
                headText: 'Jan - Meal Plan: Week 4',
                descreption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..'
            },
            {
                img: '/img/blogs/Rectangle 1185.png',
                time: '10min Read',
                headText: 'Jan - Meal Plan: Week 4',
                descreption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..'
            },
            {
                img: '/img/blogs/Rectangle 1184.png',
                time: '10min Read',
                headText: 'Jan - Meal Plan: Week 4',
                descreption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..'
            },
            {
                img: '/img/blogs/Rectangle 1185.png',
                time: '10min Read',
                headText: 'Jan - Meal Plan: Week 4',
                descreption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..'
            },
            {
                img: '/img/blogs/Rectangle 1183.png',
                time: '10min Read',
                headText: 'Jan - Meal Plan: Week 4',
                descreption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..'
            },
            {
                img: '/img/blogs/Rectangle 1183.png',
                time: '10min Read',
                headText: 'Jan - Meal Plan: Week 4',
                descreption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..'
            },
            {
                img: '/img/blogs/Rectangle 1184.png',
                time: '10min Read',
                headText: 'Jan - Meal Plan: Week 4',
                descreption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..'
            },
            {
                img: '/img/blogs/Rectangle 1185.png',
                time: '10min Read',
                headText: 'Jan - Meal Plan: Week 4',
                descreption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..'
            },
        ]
    return (
        <>
            {isMobile ?
                <div className='blogs-blogsSection-mobile'>
                    <div className='blogs-header'>
                        <h1>Tips and tricks</h1>
                    </div>
                    <div className='blog-swiper'>
                        <Swiper
                            modules={[Navigation]}
                            navigation={{
                                nextEl: '.swiper-next',
                                prevEl: '.swiper-prev',
                            }}
                            className='swiper-nav'
                            slidesPerView={1.25}
                            spaceBetween={20}
                            breakpoints={{

                                400: {
                                    slidesPerView: 1.35,
                                    spaceBetween: 20,
                                },
                                769: {
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
                                    <div className='blog-card-section-container'>
                                        <BlogCard cardImg={item.img} cardTime={item.time} cardText={item.headText} cardDescreption={item.descreption} allBlogData={item}/>
                                    </div>
                                </SwiperSlide>
                            ))}
                            <SwiperArrows />
                        </Swiper>
                    </div>

                </div>
                :
                <div className='blogs-blogsSection' >
                    <div className=' blogs-items'>
                        {arr.map((item, index) => (
                            <div className='blog-card-section-container' key={index}>
                                <BlogCard cardImg={item.img} cardTime={item.time} cardText={item.headText} cardDescription={item.descreption} allBlogData={item}/>
                            </div>
                        ))}
                    </div>
                    {more ?
                        <div className='button-section'>
                            <div className='blog-button' onClick={() => { setMore(false) }}>
                                <Button type="normal" text="Load Less"></Button>
                            </div>
                        </div>
                        :
                        <div className='button-section'>
                            <div className='blog-button' onClick={() => { setMore(true) }}>
                                <Button type="normal" text="Load More"></Button>
                            </div>
                        </div>
                    }
                </div>
            }

        </>
    )
}

export default BlogsSection

