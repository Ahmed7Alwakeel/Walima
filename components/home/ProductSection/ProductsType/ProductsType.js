import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import { FiArrowUpRight } from 'react-icons/fi'
import { FiArrowUpLeft } from 'react-icons/fi'
import Button from "../../../common/Button/Button"
import { Navigation, Pagination, Scrollbar, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { API_URL } from '../../../api_baseURL';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
import 'swiper/css';
import 'swiper/css/navigation';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Link from "next/link"
import SwiperArrows from '../../../common/SwiperArrows/SwiperArrows'
import ProductTypeCard from '../ProductTypeCard/ProductTypeCard'
import ProductCard from '../../../common/ProductCard/ProductCard'
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

const ProductsType = ({ exploreProducts, productData, inHomePage,categoriesData }) => {
  const { t } = useTranslation('common');
  const router = useRouter()
  const { locale } = useRouter()
  const [productType, setProductType] = useState(0)
  const [block, setBlock] = useState()
  const [isMobile, setMobile] = useState(false)
  const isMobileHandler = (e) => {
    setMobile(e.matches)
  }
  useEffect(() => {
    window.matchMedia(`(max-width : 1024px)`).addEventListener("change", isMobileHandler)
    setMobile(window.matchMedia(`(max-width : 1024px)`).matches)
  }, [])
  useEffect(() => {
    if (exploreProducts) {
      setBlock(exploreProducts[productType])
    }
  }, [exploreProducts, productType])
  return (
    <>
      {isMobile ?
        <div className={`product-type-container ${block?.products.length <= 1 && 'remove-padding'}`}>
          <div className='product-type-text fiber-vintage'>
            <>
              <motion.div className='product-type-text__h1'
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: .3, duration: .75 }}>
                <h1 className="text">{productData?.description}</h1>
              </motion.div>
            </>
          </div>
          <motion.div className='product-type-button-container somatic-rounded'
            initial={{ opacity: 0, }}
            whileInView={{ opacity: 1, }}
            viewport={{ once: true }}
            transition={{ delay: .6, duration: .75 }}
          >
            {exploreProducts?.map((item, index) => (
              <div className={` ${productType == index && 'active-button'}`}
                key={index}
                onClick={() => { setProductType(index) }}>
                <Button type="normal" text={item?.tab_name}></Button>
              </div>
            ))}
          </motion.div>
          <SwitchTransition mode="out-in">
            <CSSTransition
              classNames="fade"
              addEndListener={(node, done) => {
                node.addEventListener("transitionend", done, false);
              }}
              key={productType}
            >
              <div className='product-type-swiper'>
                <Swiper modules={[Navigation]}
                  key={block?.products.length}
                  style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
                  className="swiper-product-section"
                  navigation={{
                    nextEl: '.swiper-next-product',
                    prevEl: '.swiper-prev-product',
                  }}
                  slidesPerView={1}
                  spaceBetween={15}
                  breakpoints={{

                    400: {
                      slidesPerView: 1,
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
                  {block?.products.sort((a, b) => a.order - b.order).map((item, index) => (
                    <SwiperSlide key={index}>
                      <motion.div
                        initial={{ opacity: 0, y: 0}}
                        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .05 }}
                        transition={{ duration: .75, delay: 0 }}
                      >
                        <ProductTypeCard
                          productType={productType}
                          cardImg={item?.image_mobile[0]?.url}
                          cardTime={item.reading_time}
                          cardText={item.name}
                          cardDescription={item.small_description}
                          cardSlug={item.slug}
                          cardIngredients={item.ingredients}
                          cardNutrition={item.nutrition_facts}
                          imgAlt={item?.image_mobile?.name}
                          allProductData={item}
                          index={index}
                          category={item?.category}
                          categoriesData={categoriesData}
                        />
                      </motion.div>
                    </SwiperSlide>
                  ))}
                  <motion.div className={`${block?.products.length <= 1 && 'd-none'}`}
                    initial={{ opacity: 0, }}
                    whileInView={{ opacity: 1, }}
                    viewport={{ once: true }}
                    transition={{ delay: .2, duration: .75 }}
                  >
                    <div className='swiper-arrows-container swiper-product-section'>
                      <div className='swiper-button  swiper-prev-product'>
                        {locale == "ar" ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
                      </div>
                      <div className='swiper-button swiper-next-product'>
                        {locale == "en" ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
                      </div>
                    </div>
                  </motion.div>
                </Swiper>
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
        :
        <>
          <div className={`product-type-container ${block?.products.length < 3 && 'remove-padding'}`}>
            <div className='product-type-typeSection'>
              <div className='product-type-text '>
                <motion.div className='product-type-text__h1'
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: .5, duration: .75 }}
                >
                  <h1 className="text">{productData?.description}</h1>
                </motion.div>
                <motion.div className='product-type-button-container somatic-rounded'
                  initial={{ opacity: 0, }}
                  whileInView={{ opacity: 1, }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, duration: .75 }}
                >
                  {exploreProducts?.map((item, index) => (
                    <div key={index} className={` ${productType == index && 'active-button'}`}
                      onClick={() => { setProductType(index) }}>
                      <Button type="normal" text={item?.tab_name}></Button>
                    </div>
                  ))}
                </motion.div>
              </div>
              <div className='product-type-text fiber-vintage'>
                <motion.div className='product-type-circle'
                  initial={{ opacity: 0, }}
                  whileInView={{ opacity: 1, }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.4, duration: .75 }}
                >
                  <motion.div className='small-img-container'
                    initial={{ opacity: 0, }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2.3, duration: .75 }}
                  >
                    <img src='/img/image19.svg' className='small-img' alt='icon' />
                  </motion.div>
                  <motion.div className='big-img-container'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2, duration: .75 }}>
                    {/* <img src={`${block?.image.url}`} className='big-img' alt={block?.image.name} /> */}
                    <Image src={block?.image && `${block?.image?.url}`} className='big-img' alt={block?.image?.name} layout='fill' objectFit='contain' />
                  </motion.div>
                  <motion.div onClick={()=>{router.push(`/${router.locale}/products`)}} className='small-circle fiber-vintage'>
                    <span>{t('main.explore')} <br />{t('main.all_products')}</span>
                    <div className='inside-circle'>
                        {router.locale == "en" ? <FiArrowUpRight className='inside-icon' onClick={() => { window.scrollTo(0, 0) }} />
                          : <FiArrowUpLeft className='inside-icon' onClick={() => { window.scrollTo(0, 0) }} />}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
            <SwitchTransition mode="out-in">
              <CSSTransition
                classNames="fade"
                addEndListener={(node, done) => {
                  node.addEventListener("transitionend", done, false);
                }}
                key={productType}
              >
                <motion.div className='product-type-swiper'>
                  <Swiper
                    modules={[Navigation, Scrollbar, Pagination, Mousewheel]}
                    //  
                    key={block?.products.length}
                    style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
                    className="swiper-product-section"
                    pagination={{
                      type: "progressbar",
                      el: ".custom-product-pagination",
                      clickable: true,
                      renderBullet: (index, className) => {
                        return '<span class="' + className + '">' + "</span>"
                      },
                    }}
                    navigation={{
                      nextEl: '.swiper-next-product',
                      prevEl: '.swiper-prev-product',
                    }}
                    // slidesPerView={2.25}
                    breakpoints={{
                      1024: {
                        slidesPerView: 2.5,
                        spaceBetween: 25,
                        // spaceBetween: 25,
                      },

                    }}
                  >
                    <motion.div className='custom-product-pagination swiper-pagination-progressbar'
                      initial={{ opacity: 0, }}
                      whileInView={{ opacity: 1, }}
                      viewport={{ once: true }}
                      transition={{ delay: .3, duration: .75 }}
                    ></motion.div>
                    {block?.products.sort((a, b) => a.order - b.order).map((item, index) => (
                      <SwiperSlide key={index}>
                        <div className='product-card-container-section'>
                          <ProductTypeCard
                            cardImg={item?.image_desktop?.url}
                            cardTime={item.reading_time}
                            cardText={item.name}
                            cardDescription={item.small_description}
                            cardSlug={item.slug}
                            cardIngredients={item.ingredients}
                            cardNutrition={item.nutrition_facts}
                            imgAlt={item?.image_mobile?.name}
                            allProductData={item}
                            index={index}
                            inHomePage={inHomePage}
                            category={item?.category}
                          categoriesData={categoriesData}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                    {
                      <motion.div
                        initial={{ opacity: 0, }}
                        whileInView={{ opacity: 1, }}
                        viewport={{ once: true }}
                        transition={{ delay: 1, duration: .75 }}
                        className={`${block?.products.length <= 2 &&"d-none"}`}
                      >
                        <div className='swiper-arrows-container swiper-product-section'>
                          <div className='swiper-button  swiper-prev-product'>
                            {locale == "ar" ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
                          </div>
                          <div className='swiper-button swiper-next-product'>
                            {locale == "en" ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
                          </div>
                        </div>
                      </motion.div>
                    }
                  </Swiper>
                </motion.div>
              </CSSTransition>
            </SwitchTransition>
          </div>
        </>
      }
    </>
  )
}

export default ProductsType

