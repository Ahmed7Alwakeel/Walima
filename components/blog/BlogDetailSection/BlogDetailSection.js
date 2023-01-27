import React, { useEffect, useState } from 'react'
import Button from "../../../components/common/Button/Button"
import { API_URL } from "../../api_baseURL"
import SwiperArrows from "../../common/SwiperArrows/SwiperArrows"
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
    FacebookShareButton,
    WhatsappShareButton,
    PinterestShareButton,
    TwitterShareButton,
} from "react-share";
import { BsFacebook } from 'react-icons/bs';
import { RiWhatsappFill } from 'react-icons/ri';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { BsPinterest } from 'react-icons/bs';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import "swiper/css/pagination"
import { useTranslation } from "next-i18next"
const BlogDetailSection = ({ blogData }) => {
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
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.5
            }
        }
    };

    const listItem = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }
    };
    const arr = isMobile ? [
        { img: '/img/blogs/blogDetail/image 88.png' },
        { img: '/img/blogs/blogDetail/image 88.png' },
        { img: '/img/blogs/blogDetail/image 88.png' },
        { img: '/img/blogs/blogDetail/image 88.png' },] : [
        { img: '/img/blogs/blogDetail/Project 1.png' },
        { img: '/img/blogs/blogDetail/Project 1.png' },
        { img: '/img/blogs/blogDetail/Project 1.png' },
        { img: '/img/blogs/blogDetail/Project 1.png' },

    ]
    return (
        <>
            <div className='blog-detail-container' >
                {isMobile ?
                    <>
                        <div className='share-container'>
                            <motion.span
                                initial={{ opacity: 0,   }}
                                whileInView={{ opacity: 1     }}
                                viewport={{ once: true,marginTop: 20,amount:.9}}
                                transition={{ delay: 0, duration: .75 }}
                            >{`${t('tips_details_page.share')}`}<br />{`${t('tips_details_page.on')}`}</motion.span>
                            <motion.div
                                initial={{ opacity: 0,   }}
                                whileInView={{ opacity: 1     }}
                                viewport={{ once: true }}
                                transition={{ delay: .2, duration: .75 }}>
                                <PinterestShareButton
                                    url='https://www.pinterest.com/'
                                    media={`https://www.pinterest.com/img/blogs/blogDetail/pinterest.png`}

                                >
                                    <BsPinterest size={40} />
                                </PinterestShareButton>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0,   }}
                                whileInView={{ opacity: 1     }}
                                viewport={{ once: true }}
                                transition={{ delay: .2, duration: .75 }}>
                                <FacebookShareButton
                                    url='https://www.facebook.com/'
                                >
                                    <BsFacebook size={40} />
                                </FacebookShareButton>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0,   }}
                                whileInView={{ opacity: 1     }}
                                viewport={{ once: true }}
                                transition={{ delay: .2, duration: .75 }}>
                                <WhatsappShareButton
                                    url='https://web.whatsapp.com/'
                                >
                                    <RiWhatsappFill size={46} />
                                </WhatsappShareButton>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0,   }}
                                whileInView={{ opacity: 1     }}
                                viewport={{ once: true }}
                                transition={{ delay: .2, duration: .75 }}>
                                <TwitterShareButton
                                    url='https://twitter.com/?lang=en'

                                >
                                    <AiFillTwitterCircle size={46}
                                    />
                                </TwitterShareButton>
                            </motion.div>
                        </div>
                        <div className='details-head-text'>
                            <motion.span
                                initial={{ opacity: 0,   }}
                                whileInView={{ opacity: 1     }}
                                viewport={{ once: true }}
                                transition={{ delay: .1, duration: .75 }}
                            >
                                {blogData?.secondary_blog_text}
                            </motion.span>
                        </div>
                        <div className='details-description-text'>
                            <motion.span
                                initial={{ opacity: 0,   }}
                                whileInView={{ opacity: 1     }}
                                viewport={{ once: true }}
                                transition={{ delay: .3, duration: .75 }}
                            >
                                {blogData?.extra_blog_text}
                            </motion.span>
                        </div>
                        <div className='details-word'>
                            <motion.h3
                                initial={{ opacity: 0,   }}
                                whileInView={{ opacity: 1     }}
                                viewport={{ once: true }}
                                transition={{ delay: .5, duration: .75 }}>
                                {blogData?.extra_blog_text_1}
                            </motion.h3>
                            <motion.h1
                                initial={{ opacity: 0,   }}
                                whileInView={{ opacity: 1     }}
                                viewport={{ once: true }}
                                transition={{ delay: .5, duration: .75 }}>{`${t('tips_details_page.Ryan')}`}</motion.h1>
                            <motion.span
                                initial={{ opacity: 0,   }}
                                whileInView={{ opacity: 1     }}
                                viewport={{ once: true }}
                                transition={{ delay: .6, duration: .75 }}
                            >{`${t('tips_details_page.founding')}`}</motion.span>
                        </div>
                        <div className='details-blogger-word'>
                            <motion.p
                             initial={{ opacity: 0,   }}
                             whileInView={{ opacity: 1     }}
                             viewport={{ once: true }}
                             transition={{ delay: 1, duration: .75 }}
                            >
                                {blogData?.extra_blog_text_2}
                            </motion.p>
                            <motion.span
                             initial={{ opacity: 0,   }}
                             whileInView={{ opacity: 1     }}
                             viewport={{ once: true }}
                             transition={{ delay: 1.5, duration: .75 }}
                            >
                                {blogData?.extra_blog_text_3}
                            </motion.span>
                            <div className='blogger-data'>
                                <motion.img src='/img/blogs/blogDetail/Ellipse 178.png' alt='blogger' 
                                   initial={{ opacity: 0,   }}
                                   whileInView={{ opacity: 1     }}
                                   viewport={{ once: true }}
                                   transition={{ delay: .1, duration: .75 }}
                                />
                                <motion.h1
                                   initial={{ opacity: 0,   }}
                                   whileInView={{ opacity: 1     }}
                                   viewport={{ once: true }}
                                   transition={{ delay:.3, duration: .75 }}
                                >{`${t('tips_details_page.Lindsay')}`}</motion.h1>
                                <motion.span
                                   initial={{ opacity: 0,   }}
                                   whileInView={{ opacity: 1     }}
                                   viewport={{ once: true }}
                                   transition={{ delay: .5, duration: .75 }}
                                >{`${t('tips_details_page.blogger')}`}</motion.span>
                            </div>
                        </div>
                    </> :
                    <>
                        <motion.div className='blog-details-head-container' >
                            <div className='share-container'>
                                <motion.span
                                    initial={{ opacity: 0,   }}
                                    whileInView={{ opacity: 1     }}
                                    viewport={{ once: true,marginTop: 20,amount:.9 }}
                                    transition={{ delay: 0, duration: .75 }}
                                >{`${t('tips_details_page.share')}`}<br />{`${t('tips_details_page.on')}`}</motion.span>
                                <motion.div
                                    initial={{ opacity: 0,   }}
                                    whileInView={{ opacity: 1     }}
                                    viewport={{ once: true }}
                                    transition={{ delay: .2, duration: .75 }}>
                                    <PinterestShareButton
                                        url='https://www.pinterest.com/'
                                        media={`https://www.pinterest.com/img/blogs/blogDetail/pinterest.png`}

                                    >
                                        <BsPinterest size={40} />
                                    </PinterestShareButton>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0,   }}
                                    whileInView={{ opacity: 1     }}
                                    viewport={{ once: true }}
                                    transition={{ delay: .2, duration: .75 }}>
                                    <FacebookShareButton
                                        url='https://www.facebook.com/'
                                    >
                                        <BsFacebook size={40} />
                                    </FacebookShareButton>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0,   }}
                                    whileInView={{ opacity: 1     }}
                                    viewport={{ once: true }}
                                    transition={{ delay: .2, duration: .75 }}>
                                    <WhatsappShareButton
                                        url='https://web.whatsapp.com/'
                                    >
                                        <RiWhatsappFill size={46} />
                                    </WhatsappShareButton>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0,   }}
                                    whileInView={{ opacity: 1     }}
                                    viewport={{ once: true }}
                                    transition={{ delay: .2, duration: .75 }}>
                                    <TwitterShareButton
                                        url='https://twitter.com/?lang=en'

                                    >
                                        <AiFillTwitterCircle size={46}
                                        />
                                    </TwitterShareButton>
                                </motion.div>
                            </div>
                        </motion.div>
                        <div className='blog-descriptions-wrapper'>
                            <div className='details-word'>
                                <div className='blog-text-conatiner'>
                                    <div className='details-head-text'>
                                        <motion.span
                                            initial={{ opacity: 0,   }}
                                            whileInView={{ opacity: 1     }}
                                            viewport={{ once: true }}
                                            transition={{ delay: .2, duration: .75 }}
                                        >
                                            {blogData?.secondary_blog_text}
                                        </motion.span>
                                    </div>
                                    <div className='details-description-text'>
                                        <motion.span
                                            initial={{ opacity: 0,   }}
                                            whileInView={{ opacity: 1     }}
                                            viewport={{ once: true }}
                                            transition={{ delay: .2, duration: .75 }}>
                                            {blogData?.extra_blog_text}
                                        </motion.span>
                                    </div>
                                </div>
                                <motion.h3
                                    initial={{ opacity: 0,   }}
                                    whileInView={{ opacity: 1     }}
                                    viewport={{ once: true }}
                                    transition={{ delay: .3, duration: .75 }}
                                >
                                    {blogData?.extra_blog_text_1}
                                </motion.h3>
                                <motion.h1
                                    initial={{ opacity: 0,   }}
                                    whileInView={{ opacity: 1     }}
                                    viewport={{ once: true }}
                                    transition={{ delay: .4, duration: .75 }}
                                >{`${t('tips_details_page.Ryan')}`}</motion.h1>
                                <motion.span
                                    initial={{ opacity: 0,   }}
                                    whileInView={{ opacity: 1     }}
                                    viewport={{ once: true }}
                                    transition={{ delay: .5, duration: .75 }}>
                                    {`${t('tips_details_page.founding')}`} <span className='company-name'>{`${t('tips_details_page.company')}`} </span>
                                </motion.span>
                            </div>
                            <div className='details-blogger-word'>
                                <motion.p
                                    initial={{ opacity: 0,   }}
                                    whileInView={{ opacity: 1     }}
                                    viewport={{ once: true }}
                                    transition={{ delay: .6, duration: .75 }}
                                >
                                    {blogData?.extra_blog_text_2}
                                </motion.p>
                                <motion.span
                                    initial={{ opacity: 0,   }}
                                    whileInView={{ opacity: 1     }}
                                    viewport={{ once: true }}
                                    transition={{ delay: .7, duration: .75 }}>
                                    {blogData?.extra_blog_text_3}
                                </motion.span>
                                <div className='blogger-data pt-4'>
                                    <motion.div className='blogger-img'
                                        initial={{ opacity: 0,   }}
                                        whileInView={{ opacity: 1     }}
                                        viewport={{ once: true }}
                                        transition={{ delay: .8, duration: .75 }}>
                                        <img src='/img/blogs/blogDetail/Ellipse 178.png' alt='blogger' />
                                    </motion.div>
                                    <div className='blogger-text'>
                                        <motion.h1
                                            initial={{ opacity: 0,   }}
                                            whileInView={{ opacity: 1     }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 1, duration: .75 }}>
                                            {`${t('tips_details_page.Lindsay')}`}</motion.h1>
                                        <motion.span
                                            initial={{ opacity: 0,   }}
                                            whileInView={{ opacity: 1     }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 1.1, duration: .75 }}
                                            style={{ width: "100%" }}>{`${t('tips_details_page.blogger')}`}</motion.span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default BlogDetailSection