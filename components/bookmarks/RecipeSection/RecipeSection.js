
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
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
const RecipeSection = ({ recipe, allRecipes, favoritePage }) => {
  const [isMobile, setMobile] = useState(false)
  const { locale } = useRouter();
  const { t } = useTranslation('common');
  const isMobileHandler = (e) => {
    setMobile(e.matches)
  }
  const [isTablet, setTablet] = useState(false)
  const isTabletHandler = (e) => {
    setTablet(e.matches)
  }
  useEffect(() => {
    window.matchMedia(`(min-width : 768px) and (max-width:1024px)`).addEventListener("change", isTabletHandler)
    setTablet(window.matchMedia(`(min-width : 768px) and (max-width:1024px)`).matches)
  }, [])
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
    <div className={`bookmark-recipe-section ${(recipe?.length == 1 && isMobile) && "remove-padding"}`}>
      <div className='recipe-header'>
        {/* <p>{t('bookmarks.recipes')}</p> */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: .75 }}
        >{t('bookmarks.my_recipes')}</motion.h1>
        {/* <span>{t('bookmarks.my_recipes_desc')}</span> */}
      </div>
      {isMobile ?
        <div className='cards-container'>
          <div className='category-items'>
            {recipe?.length > 0 ?
              <div className={`category-swiper`}>
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
                  centeredSlides={recipe?.length == 1 ? true : false}
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
                  {recipe.map((item, index) => (
                    <SwiperSlide key={index}>
                      <motion.div className='recipe-card-container-section'
                        initial={{ opacity: 0, y: index <= 1 ? 50 : 0 }}
                        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .05 }}
                        transition={{ duration: index <= 1 ? .75 : .5, delay: isTablet && index <= 2 ? parseFloat((index / 10) + 1.3) : index <= 1 ? parseFloat((index / 10) + 1.3) : 0 }}
                      >
                        <RecipeCard 
                        // mainProduct={item?.mainproduct?.name} 
                          mainProduct={item?.products && item?.products[0]?.name} 
                          favorite={favoritePage}
                          allRecipes={allRecipes}
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
                  <motion.div className={`${recipe.length <= 1 && 'd-none'}`}
                    initial={{ opacity: 0, }}
                    whileInView={{ opacity: 1, }}
                    viewport={{ once: true }}
                    transition={{ delay: .3, duration: .75 }}
                  >
                    <SwiperArrows />
                  </motion.div>
                </Swiper>
              </div>
              :
              <motion.div className='w-100 no-favorite-message'
                initial={{ opacity: 0, }}
                whileInView={{ opacity: 1, }}
                viewport={{ once: true }}
                transition={{ delay: 1.3, duration: .75 }}
              >
                <h1 className='somatic-rounded text-center'>{t('bookmarks.no_favourite_recipes')}</h1>
              </motion.div>
            }
          </div>
        </div> :
        <div className='cards-container'>
          {recipe?.length > 0 ?
            recipe.map((item, index) => (
              <motion.div className='card-section' key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, }}
                transition={{ duration: .75, delay: index > 2 ? parseFloat((index / 10) + .2) : parseFloat((index / 10) + .75) }}
              >
                <RecipeCard 
                // mainProduct={item?.mainproduct?.name} 
                mainProduct={item?.products && item?.products[0]?.name} 
                  // recipeSearch
                  bookmark
                  favorite={favoritePage}
                  allRecipes={allRecipes}
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
            ))
            :
            <motion.div className='w-100 no-favorite-message'
              initial={{ opacity: 0, }}
              whileInView={{ opacity: 1, }}
              viewport={{ once: true }}
              transition={{ delay: 1.3, duration: .75 }}
            >
              <h1 className='somatic-rounded text-center'>{t('bookmarks.no_favourite_recipes')}</h1>
            </motion.div>
          }

        </div>
      }
    </div>
  )
}

export default RecipeSection


