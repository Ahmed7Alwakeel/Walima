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
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
const BlogsSection = ({ blogs,
  //  topics,
  allBlogs, favoritePage }) => {
  const [isMobile, setMobile] = useState(false)
  const { locale } = useRouter();
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
    <>
      <div className={`blogs-section-cards-bookmarks`}>
      <motion.div className='blogs-header'
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: .2, duration: .75 }}
            >
          <h1>{t('bookmarks.tips_tricks')}</h1>
        </motion.div>
        {isMobile ?
          <div className='cards-container'>
            <div className='category-items'>
              {blogs.length > 0 ?
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
                    spaceBetween={20}
                    breakpoints={{

                      390: {
                        slidesPerView: 1.25,
                        spaceBetween: 40,
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
                    {blogs.map((item, index) => (
                      <SwiperSlide key={index}>
                        <motion.div className='recipe-card-container-section'
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .05 }}
                        transition={{ duration: .75, delay: parseFloat((index / 10) + .2) }}
                        >
                          <BlogCard
                            allBlogs={allBlogs}
                            favorite={favoritePage}
                            cardImg={item.image_slider[0].url}
                            // cardImg={'/img/blogs/Rectangle 1184.png'}
                            cardSlug={item.slug}
                            cardTime={item.reading_time}
                            cardText={item.title}
                            cardDescription={item.description}
                            cardTag={item.topic.name}
                            imgAlt={item.image_slider[0].name}
                            // topics={topics}
                            allBlogData={item}
                          />
                        </motion.div>
                      </SwiperSlide>
                    ))}
                        <motion.div className={`${blogs?.length <= 1 && 'd-none'}`}
                initial={{ opacity: 0,  }}
                whileInView={{ opacity: 1,  }}
                viewport={{ once: true }}
                transition={{ delay: .3, duration: .75 }}
              >
                <SwiperArrows />
              </motion.div>
                    
                  </Swiper>
                </div>
                :
                <motion.div className='w-100'
              initial={{ opacity: 0,  }}
                    whileInView={{ opacity: 1, }}
                    viewport={{ once: true }}
                    transition={{ delay: .5, duration: .75 }}
              >
                  <h1 className='somatic-rounded text-center text-light'>{t('bookmarks.no_favourite_blogs')}</h1>
                </motion.div>
              }
            </div>
          </div> :
          <>
            <div className='cards-container'>
              {blogs.length > 0 ?
                blogs.map((item, index) => (
                  <motion.div className='card-section'
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: .75, delay: parseFloat((index / 10) + 0.2) }}
                  key={index}>
                    <BlogCard
                      allBlogs={allBlogs}
                      favorite={favoritePage}
                      cardImg={item.image_slider[0].url}
                      // cardImg={'/img/blogs/Rectangle 1184.png'}
                      cardSlug={item.slug}
                      cardTime={item.reading_time}
                      cardText={item.title}
                      cardDescription={item.description}
                      cardTag={item.topic.name}
                      imgAlt={item.image_slider[0].name}
                      // topics={topics}
                      allBlogData={item}
                    />
                  </motion.div>
                ))
                :
                <motion.div className='w-100 no-favorite-message'

                initial={{ opacity: 0,  }}
                      whileInView={{ opacity: 1,  }}
                      viewport={{ once: true }}
                      transition={{ delay: .5, duration: .75 }}
                >
                  <h1 className='somatic-rounded text-center text-light'>{t('bookmarks.no_favourite_blogs')}</h1>
                </motion.div>
              }
            </div>
          </>
        }
      </div>
    </>
  )
}

export default BlogsSection

