
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Navigation, Pagination, Mousewheel} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import "swiper/css/pagination"
import Link from 'next/link';
import Button from "../../common/Button/Button"
import BlogCard from "../../common/BlogCard/BlogCard"
import SwiperArrows from '../../common/SwiperArrows/SwiperArrows';

const BlogsSection = () => {
  const [isMobile, setMobile] = useState(false)
  const { locale } = useRouter()
  const isMobileHandler = (e) => {
    setMobile(e.matches)
  }
  useEffect(() => {
    window.matchMedia(`(max-width : 1024px)`).addEventListener("change", isMobileHandler)
    setMobile(window.matchMedia(`(max-width : 1024px)`).matches)
  }, [])

  const products = [
    {
      img: '/img/blogs/Rectangle 1185.png',
      time: 'Until 5 feb 2021',
      headText: 'Puff Pastry Sheets',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..'
    }, {
      img: '/img/blogs/Rectangle 1184.png',
      time: 'Until 5 feb 2021',
      headText: 'Puff Pastry Sheets',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..'
    }, {
      img: '/img/blogs/Rectangle 1183.png',
      time: 'Until 5 feb 2021',
      headText: 'Puff Pastry Sheets',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..'
    }, {
      img: '/img/blogs/Rectangle 1185.png',
      time: 'Until 5 feb 2021',
      headText: 'Puff Pastry Sheets',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..'
    },
  ]
  return (
    <>
      <div className='product-detail-blogs-section'>
        <div className='blogs-section-header'>

          {isMobile ? <h1>Tips and tricks</h1> :
            <>
              <h1>Tips and tricks</h1>
              <Link href={`/${locale}/blogs`} style={{ cursor: 'pointer' }} passHref>
                <div className='blog-button'>
                  <Button type="normal" text="See All Blogs"></Button>
                </div>
              </Link>
            </>}
        </div>
        <div className='blogs-swiper'>
          {isMobile ?
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
              {products.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className='blog-card-section-container'>
                    <BlogCard cardImg={item.img}
                      cardTime={item.time} cardText={item.headText} cardDescription={item.description} allBlogData={item}/>
                  </div>
                </SwiperSlide>
              ))}
              <SwiperArrows />
            </Swiper> :
            <Swiper
              // key={Math.random()}
              style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
              modules={[Navigation, Pagination,Mousewheel]}
               
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
              {products.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className='blog-card-section-container'>
                    <BlogCard cardImg={item.img}
                      cardTime={item.time} cardText={item.headText} cardDescription={item.description} allBlogData={item}/>
                  </div>
                </SwiperSlide>
              ))}
              <SwiperArrows />
            </Swiper>}

        </div>
      </div>
    </>
  )
}

export default BlogsSection

