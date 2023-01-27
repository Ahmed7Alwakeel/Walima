import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Button from "../../common/Button/Button"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import { Navigation, Pagination, Scrollbar, A11y, EffectFade, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import MainCard from "../../common/MainCard/MainCard"
import SwiperArrows from "../../common/SwiperArrows/SwiperArrows";
import Link from "next/link"
import { FiArrowUpRight } from 'react-icons/fi'
import { FiArrowUpLeft } from 'react-icons/fi'
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { useAnimationContext } from '../../context/animationContext';
import Image from 'next/image';
const MainSection = ({ mainSlider }) => {
    const { menuOpened } = useAnimationContext();
    const { t } = useTranslation('common');
    const router = useRouter()
    const { locale } = useRouter()
    const [isMobile, setMobile] = useState(false)
    const isMobileHandler = (e) => {
        setMobile(e.matches)
    }
    useEffect(() => {
        try {
            // Chrome & Firefox
            window.matchMedia(`(max-width : 1025px)`).addEventListener("change", isMobileHandler)
            setMobile(window.matchMedia(`(max-width : 1025px)`).matches)
        } catch (e1) {
            try {
                // Safari
                window.matchMedia(`(max-width : 1025px)`).addListener(() => isMobileHandler())
                setMobile(window.matchMedia(`(max-width : 1025px)`).matches)
            } catch (e2) {
                console.error(e2)
            }
        }
    }, [])

    return (
        <div className="main-section">
            <div className="lyr">
                <div className={`insideLyr ${menuOpened ? 'whileMenuOpening' : ''}`}>
                    <div className="swiper-container">
                        <Swiper
                            key={`main`}
                            style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
                            modules={[Navigation, EffectFade, Mousewheel]}
                            //  
                            navigation={{
                                nextEl: '.swiper-next-main',
                                prevEl: '.swiper-prev-main',
                            }}
                            className='swiper-main-section'
                            slidesPerView={1}
                            fadeEffect={{
                                crossFade: true
                            }}
                            effect="fade"
                        >
                            {mainSlider?.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className={`main-header ${!isMobile &&item?.text&&"add-gap"}`}>
                                        <div className={`main-header-wrapper ${!isMobile &&!item?.text&&"add-gap"}`}>
                                            <motion.div
                                                className='header-text'
                                                initial={{ opacity: 0, y: -20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0, duration: .75 }}
                                            >
                                                <h1>{item.title}</h1>
                                            </motion.div>
                                            {!isMobile &&
                                                <>
                                                   {item?.text&&<motion.div
                                                        initial={{ opacity: 0, y: -20 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: .5, duration: .75 }}
                                                    >
                                                        <p>{item.text} </p>
                                                    </motion.div>}
                                                    <motion.div className="buttons-group-section" >
                                                        <motion.div
                                                            initial={{ opacity: 0, }}
                                                            whileInView={{ opacity: 1, }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: .9, duration: .75 }}
                                                            className="recipe-button  button-animation
                                                        button button--wayra button--border-thin button--round-s" onClick={() => {
                                                                router.push(`${router.locale}/recipes`)
                                                            }}>
                                                            <Button animate type="normal" text={t('main.explore_recipes')} className=""></Button>
                                                        </motion.div >
                                                        <motion.div
                                                            initial={{ opacity: 0, }}
                                                            whileInView={{ opacity: 1, }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: 1.2, duration: .75 }}
                                                            className=" product-button button-animation
                                                        button button--wayra button--border-thin button--round-s" onClick={() => {
                                                                router.push(`${router.locale}/products`)
                                                            }}>
                                                            <Button animate type="normal" text={t('main.explore_products')} className=""></Button>
                                                        </motion.div >
                                                    </motion.div>
                                                </>
                                            }
                                        </div>
                                    </div>
                                    <div className="img-container">
                                        <motion.div className="img-section"
                                            initial={{ opacity: 0, y: -20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: isMobile ? .6 : 1, duration: .75 }}
                                        >
                                            {/* <img src={item.image.url} alt={item.image.name} /> */}
                                            <Image src={item.image.url} alt={item.image.name} layout='fill' objectFit='cover' priority quality={100} />
                                        </motion.div>
                                        <motion.div className="main-card-container"
                                            initial={{ opacity: 0, y: -20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: isMobile ? 1.1 : 1.5, duration: .75 }}
                                        >
                                            <MainCard cardData={item?.ProductCard} />
                                        <motion.div className="main-circle"
                                            initial={{ opacity: 0, }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 1.6, duration: .75 }}
                                        >
                                            <Link href={`/${locale}/recipes/${item?.slug}`} passHref>
                                                <div className="white-circle">
                                                    {locale == 'ar' ? <FiArrowUpLeft className="inside-icon" /> :
                                                        <FiArrowUpRight className="inside-icon" />}
                                                </div>
                                            </Link>
                                        </motion.div>
                                        </motion.div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, }}
                        whileInView={{ opacity: 1, }}
                        viewport={{ once: true }}
                        transition={{ delay: 2, duration: .75 }}
                        className='swiper-arrows-container swiper-main-section'>
                        <div className='swiper-button  swiper-prev-main'>
                            {locale == "ar" ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
                        </div>
                        <div className='swiper-button swiper-next-main'>
                            {locale == "en" ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
                        </div>
                    </motion.div>
                    {isMobile &&
                        <>
                            <motion.div className="buttons-group-section"

                                initial={{ opacity: 0, }}
                                whileInView={{ opacity: 1, }}
                                viewport={{ once: true }}
                                transition={{ delay: .1, duration: .75 }}

                            >
                                <div className="recipe-button " onClick={() => {
                                    router.push(`${router.locale}/recipes`)
                                }}>
                                    <Button type="normal" text={t('main.explore_recipes')} className=" "></Button>
                                </div>
                                <div className="recipe-button product-button" onClick={() => {
                                    router.push(`${router.locale}/products`)
                                }}>
                                    <Button type="normal" text={t('main.explore_products')} className=""></Button>
                                </div>
                            </motion.div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default MainSection