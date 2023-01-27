
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { Navigation, Pagination,Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import "swiper/css/pagination"
import Link from 'next/link';
import Button from "../../common/Button/Button"
import ProductCard from '../../common/ProductCard/ProductCard';
import SwiperArrows from '../../common/SwiperArrows/SwiperArrows';

const ProductsSection = () => {
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
      let products = [
        {
            img: '/img/SUN002_WALIMA_Cut-Green-Beans_3D.png',
            time: 'Until 5 feb 2021',
            headText: 'Puff Pastry Sheets',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..'
        }, {
            img: '/img/SUN002_WALIMA_Cut-Green-Beans_3D.png',
            time: 'Until 5 feb 2021',
            headText: 'Puff Pastry Sheets',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..'
        }, {
            img: '/img/SUN002_WALIMA_Cut-Green-Beans_3D.png',
            time: 'Until 5 feb 2021',
            headText: 'Puff Pastry Sheets',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..'
        }, {
            img: '/img/SUN002_WALIMA_Cut-Green-Beans_3D.png',
            time: 'Until 5 feb 2021',
            headText: 'Puff Pastry Sheets',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..'
        }, {
            img: '/img/blogs/products/SUN002_WALIMA_Puff Pastry_3D 1.png',
            time: 'Until 5 feb 2021',
            headText: 'Puff Pastry Sheets',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..'
        }, {
            img: '/img/SUN002_WALIMA_Cut-Green-Beans_3D.png',
            time: 'Until 5 feb 2021',
            headText: 'Puff Pastry Sheets',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod..'
        },
    ]
    return (
        <div className='details-products-section'>
            <div className='products-section-header'>
               {isMobile?  <h1>Products For You</h1>:
               <>
               <h1>Products For You</h1>
               <Link href={`/${locale}/products`} style={{ cursor: 'pointer' }} passHref>
               <div className='product-button'>
               <Button type="normal" text="See All Products"></Button>
               </div>
                </Link>
                </>}
            </div>
            <div className='product-swiper'>
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
                        spaceBetween={15}
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
                        {products.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='product-card-container-section'>
                                <ProductCard cardImg={item.img}
                                    cardTime={item.time} cardText={item.headText} cardDescription={item.description} />
                                </div>
                                
                            </SwiperSlide>
                        ))}
                      <SwiperArrows/>
                    </Swiper> :
                    <Swiper
                    style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
                    // key={Math.random()}
                        modules={[Navigation, Pagination,Mousewheel]}
                        navigation={{
                            nextEl: '.swiper-next',
                            prevEl: '.swiper-prev',
                        }}
                        pagination={{
                            type: "progressbar",
                        }}
                        className='swiper-nav'
                        slidesPerView={3}
                        spaceBetween={0}
                         
                        breakpoints={{
                                      
                            1024: {
                              slidesPerView: 3,
                              spaceBetween: -90,
                            },
                        
                          }}
                    
                    >
                        {products.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='product-card-container-section'>
                                <ProductCard cardImg={item.img}
                                    cardTime={item.time} cardText={item.headText} cardDescription={item.description} />
                                    </div>
                            </SwiperSlide>
                        ))}
                       <SwiperArrows/>
                    </Swiper>
                }

            </div>
            {isMobile ?
                <Link href={`/${locale}/products`} style={{ cursor: 'pointer' }} passHref>
                    <div className='details-products-button'>
                        <Button type="normal" text="See All Products"></Button>
                    </div>
                </Link>
                : ""}
        </div>
    )
}

export default ProductsSection

