
import Link from 'next/link';
import { Navigation,Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/grid"
import "swiper/css/effect-fade"
import "swiper/css/pagination"
import RecipeCard from '../../common/RecipeCard/RecipeCard';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Button from "../../../components/common/Button/Button"
import SwiperArrows from '../../common/SwiperArrows/SwiperArrows';
import { useTranslation } from "next-i18next"
import { motion } from 'framer-motion';

const RecipeSection = ({ recipes }) => {
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
  return (
    <div className='details-recipe-section'>
      {isMobile ?
        <>
          <motion.div className='recipe-header'
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0, duration: .75 }}
          >
            <h1>{`${t("recipes")}`}</h1>
          </motion.div>
          <div className='recipe-swiper'>
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
                  slidesPerView: 1.25,
                  spaceBetween: 10,
                },
                600: {
                  slidesPerView: 2.25,
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
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .05 }}
                  transition={{ duration: .75, delay: parseFloat((index / 10) + .2) }}
                  >
                    <RecipeCard mainProduct={item?.mainproduct?.name} 
                      allRecipeData={item}
                      cardName={item.name}
                      cardPrice={item.price_range}
                      cardServes={item.serves}
                      cardCookingTime={item.cooking_time}
                      cardPreparationTime={item.preparation_time}
                      cardSlug={item.slug}
                      cardImg={item.image_mobile?.url}
                      imgAlt={item.image_desktop?.name}
                    />
                  </motion.div>
                </SwiperSlide>
              ))}
              <motion.div className={`${recipes.length <= 1 && 'd-none'}`}
                initial={{ opacity: 0, }}
                whileInView={{ opacity: 1, }}
                viewport={{ once: true }}
                transition={{ delay: .2, duration: .75 }}
              >
                <SwiperArrows />
              </motion.div>
            </Swiper>

          </div>
          <motion.div className='category-button'
            onClick={() => { window.scrollTo(0, 0) }}
            initial={{ opacity: 0, }}
            whileInView={{ opacity: 1, }}
            viewport={{ once: true }}
            transition={{ delay: .5, duration: .75 }}>
            <Link href={`/${locale}/recipes`} style={{ cursor: 'pointer' }} passHref>
              <div className='recipe-category-button'>
                <Button type="normal" text={`${t("product_details_page.see_all_recipes")}`}></Button>
              </div>
            </Link>
          </motion.div>
        </>
        :
        <>
          <motion.div className='recipe-header'>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0, duration: .75 }}
            >{`${t("recipes")}`}</motion.h1>
            <Link href={`/${locale}/recipes`} style={{ cursor: 'pointer' }} passHref>
              <motion.div
                initial={{ opacity: 0, }}
                whileInView={{ opacity: 1, }}
                viewport={{ once: true }}
                transition={{ delay: .3, duration: .75 }}
                className='recipe-button button-animation button button--wayra button--border-thin button--round-s'>
                <Button animate type="normal" text={`${t("product_details_page.see_all_recipes")}`}></Button>
              </motion.div>
            </Link>
          </motion.div>
          <motion.div
            className={`${recipes?.length <= 3 && 'd-none'}`}
            initial={{ opacity: 0, }}
            whileInView={{ opacity: 1, }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: .75 }}
          >
            <SwiperArrows />
          </motion.div>
          <div className='recipe-swiper'>
            <Swiper
              // key={Math.random()}
              style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
              modules={[Navigation]}
              navigation={{
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
              }}
              className='swiper-nav'

              breakpoints={{

                1024: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
                1900: {
                  slidesPerView: 3,
                  spaceBetween: 150,
                },


              }}
            >
              {recipes?.map((item, index) => (

                <SwiperSlide key={index}>
                  <div className='recipe-card-container-section'>
                    <RecipeCard mainProduct={item?.mainproduct?.name} 
                      allRecipeData={item}
                      cardName={item.name}
                      cardPrice={item.price_range}
                      cardServes={item.serves}
                      cardCookingTime={item.cooking_time}
                      cardPreparationTime={item.preparation_time}
                      cardSlug={item.slug}
                      cardImg={item.image_desktop?.url}
                      imgAlt={item.image_desktop?.name}
                    />
                  </div>
                </SwiperSlide>
              ))}

            </Swiper>
          </div>


        </>}

    </div>

  )
}

export default RecipeSection

