import React, { useEffect, useState } from 'react'
import Button from "../../common/Button/Button"
import { useRouter } from 'next/router';
import BlogCard from '../../common/BlogCard/BlogCard';
import SwiperArrows from '../../common/SwiperArrows/SwiperArrows';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/grid"
import "swiper/css/effect-fade"
import "swiper/css/pagination"
import Link from 'next/link';
import { useTranslation } from "next-i18next";
const BlogsSection = ({ blogsSection, mainMobileItems, topics }) => {
  const { t } = useTranslation("common");
  const [isMobile, setMobile] = useState(false)
  const [showenBlogs, setShowenBlogs] = useState([])
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
  useEffect(() => {
    const newShowenBlogs =
      !more ? blogsSection?.blogs.filter((i, index) => index < 6) : blogsSection?.blogs
    setShowenBlogs(newShowenBlogs)
  }, [more, blogsSection])
  // const array = [0, 1, 2, 3, 4, 5, 6, 2, 8, 8, 9, 4]
  // const [arr, setArr] = useState([])
  // useEffect(() => {
  //   let newArr = array.filter((i, index) => index < 8)
  //   !more ? setArr(newArr) : setArr(array)
  // }, [more])

  return (
    <>
      <div className={`blogs-section-cards-blogs `}>
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
                  slidesPerView={1.25}
                  spaceBetween={20}
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
                  {blogsSection?.blogs.map((item, index) => (

                    <SwiperSlide key={index}>
                      <motion.div className='recipe-card-container-section'
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .05 }}
                      transition={{ duration: 1, delay: parseFloat((index / 10) + .2) }}
                      >
                        <BlogCard
                          cardSlug={item.slug}
                          cardImg={item.image_slider[0].url}
                          imgAlt={item.image_slider[0].name}
                          // cardImg={' /img/blogs/Rectangle 1184.png'}
                          cardTime={item.reading_time}
                          cardText={item.title}
                          cardDescription={item.description}
                          cardTag={item.topic}
                          topics={topics}
                          allBlogData={item}
                        />
                      </motion.div>
                    </SwiperSlide>
                  ))}
                  <motion.div className={`${blogsSection?.blogs?.length<=1&&'d-none'}`}
                   initial={{ opacity: 0,  }}
                   whileInView={{ opacity: 1, }}
                   viewport={{ once: true }}
                   transition={{ duration: 1, delay: .2 }}
                  >
                  <SwiperArrows />
                  </motion.div>
                </Swiper>
              </div>

            </div>
          </div> :
          <>
            <div className='cards-container'>
              {showenBlogs?.map((item, index) => (
                // index < 6 && !more &&

                <motion.div className='card-section'
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: parseFloat((index / 10) + 0.2)  }}
                  key={index}
                  >
                  <BlogCard
                    cardSlug={item.slug}
                    cardImg={item.image_slider[0].url}
                    imgAlt={item.image_slider[0].name}
                    // cardImg={' /img/blogs/Rectangle 1184.png'}
                    cardTime={item.reading_time}
                    cardText={item.title}
                    cardDescription={item.description}
                    cardTag={item.topic}
                    topics={topics}
                    allBlogData={item}
                  />
                </motion.div>
              ))}
            </div>

            {blogsSection?.blogs.length > 6 &&
              <>
                {!more &&
                  // <div className='button-section'>
                  //   <motion.div 
                  //   initial={{ opacity: 0,  }}
                  //   whileInView={{ opacity: 1,  }}
                  //   viewport={{ once: true }}
                  //   transition={{ duration: 1, delay: .2 }}
                  //   className='recipe-button
                  //       button-animation button button--wayra button--border-thin button--round-s'
                  //     onClick={() => { setMore(false) }}>
                  //     <Button animate type="normal" text={t("tips_details_page.load_less")}></Button>
                  //   </motion.div>
                  // </div>
                  // :
                  <div className='button-section'>
                    <motion.div 
                    initial={{ opacity: 0,  }}
                    whileInView={{ opacity: 1,  }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: .2 }}
                    className='recipe-button
                        button-animation button button--wayra button--border-thin button--round-s'
                      onClick={() => { setMore(true) }}>
                      <Link href={'/bookmarks#cards'} passHref>
                        <Button animate type="normal" text={t("tips_details_page.load_more")}></Button>
                      </Link>
                    </motion.div>
                  </div>
                }
              </>
            }
          </>
        }
      </div>
    </>
  )
}

export default BlogsSection

