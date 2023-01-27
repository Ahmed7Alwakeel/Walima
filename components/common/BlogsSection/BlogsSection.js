
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
import BlogCard from "../../common/BlogCard/BlogCard"
import SwiperArrows from '../../common/SwiperArrows/SwiperArrows';
import { useTranslation } from "next-i18next"
import { motion } from 'framer-motion';
const BlogsSection = ({ title, whiteBg, blogsData, topics }) => {
  let { t } = useTranslation("common")
  const [isMobile, setMobile] = useState(false)
  const { locale } = useRouter()
  const isMobileHandler = (e) => {
    setMobile(e.matches)
  }
  useEffect(() => {
    window.matchMedia(`(max-width : 1024px)`).addEventListener("change", isMobileHandler)
    setMobile(window.matchMedia(`(max-width : 1024px)`).matches)
  }, [])


  return (
    <>
      <div className={`blogs-section-all ${whiteBg && 'white-bg'}`}>
        <div className='blogs-section-header'>

          {isMobile ?
            <motion.h1 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .75, delay: 0 }}>{title}</motion.h1>
            :
            <>
              <motion.h1 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .75, delay: 0 }}>{title}</motion.h1>
              <Link href={`/${locale}/blogs`} style={{ cursor: 'pointer' }} passHref>
                <motion.div 
                					onClick={()=>{window.scrollTo(0,0)}}
                className='blog-button button-animation button button--wayra button--border-thin button--round-s' initial={{ opacity: 0,  }} whileInView={{ opacity: 1,  }} viewport={{ once: true }} transition={{ duration: .75, delay: 0.3 }}>
                  <Button animate type="normal" text={`${t("product_details_page.see_all_blogs")}`}></Button>
                </motion.div>
              </Link>
            </>}
        </div>
        <div className='blogs-swiper'>
          {isMobile ?
            <Swiper
              key={blogsData?.length + 'mob'}
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
              {blogsData?.map((item, index) => (
                <SwiperSlide key={index}>
                  <motion.div className='blog-card-section-container'
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .05 }}
                  transition={{ duration: .75, delay: parseFloat((index / 10) + .2) }}
                  >
                    <BlogCard
                      cardImg={item.image_slider[0].url}
                      // cardImg={'/img/blogs/Rectangle 1184.png'}
                      cardSlug={item.slug}
                      cardTime={item.reading_time}
                      cardText={item.title}
                      cardDescription={item.description}
                      cardTag={topics ? item.topic : item.topic.name}
                      imgAlt={item.image_slider[0].name}
                      allBlogData={item}
                      topics={topics ? topics : null}

                    />
                  </motion.div>
                </SwiperSlide>
              ))}
              <motion.div className={`${blogsData?.length <= 1 && 'd-none'}`}
                initial={{ opacity: 0, }}
                whileInView={{ opacity: 1,}}
                viewport={{ once: true }}
                transition={{ delay: .3, duration: .75 }}
              >
                <SwiperArrows />
              </motion.div>
            </Swiper> :
            <Swiper
              key={blogsData?.length + 'desk'}
              style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
              modules={[Navigation, Pagination,Mousewheel]}
              navigation={{
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
              }}
              className='swiper-nav'
              breakpoints={{
                1024: {
                  slidesPerView: 3.25,
                  spaceBetween: 50,
                },
                1600: {
                  slidesPerView: 3.75,
                  spaceBetween: 50
                },
                // 1900: {
                //   slidesPerView: 4.25,
                //   spaceBetween: 50
                // },
              }}
               
              pagination={{
                type: "progressbar",
                el: ".blog-section-pagination",
                clickable: true,
                renderBullet: (index, className) => {
                  return '<span class="' + className + '">' + "</span>"
                },
              }}
            >
              <motion.div className='blog-section-pagination swiper-pagination-progressbar'
                initial={{ opacity: 0, }}
                whileInView={{ opacity: 1, }}
                viewport={{ once: true }}
                transition={{ delay: .5, duration: .75 }}
              ></motion.div>
              {blogsData?.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className='blog-card-section-container'>
                    <BlogCard
                      cardImg={item.image_slider[0].url}
                      // cardImg={'/img/blogs/Rectangle 1184.png'}
                      cardSlug={item.slug}
                      cardTime={item.reading_time}
                      cardText={item.title}
                      cardDescription={item.description}
                      cardTag={topics ? item.topic : item.topic.name}
                      imgAlt={item.image_slider[0].name}
                      allBlogData={item}
                      topics={topics ? topics : null}
                      index={index}
                    />
                  </div>
                </SwiperSlide>
              ))}
            
              <motion.div className={`${blogsData?.length <= 3 &&'d-none'}`}
               initial={{ opacity: 0,  }}
               whileInView={{ opacity: 1,  }}
               viewport={{ once: true }}
               transition={{ delay: 1, duration: .75 }}
               >
              <SwiperArrows />

              </motion.div>
            </Swiper>
          }

        </div>
        {isMobile &&
          <div className='category-button'>
            <Link href={`/${locale}/blogs`} style={{ cursor: 'pointer' }} passHref>
              <motion.div className="recipe-category-button"
              					onClick={()=>{window.scrollTo(0,0)}}
                initial={{ opacity: 0, }}
                whileInView={{ opacity: 1,  }}
                viewport={{ once: true }}
                transition={{ delay: .8, duration: .75 }}
              >
                <Button type="normal" text={`${t("product_details_page.see_all_blogs")}`}></Button>
              </motion.div>
            </Link>
          </div>
        }
      </div>
    </>
  )
}

export default BlogsSection

