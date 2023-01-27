import React, { useEffect, useState } from 'react'
import Button from "../../../components/common/Button/Button"
import { useRouter } from 'next/router';
import { BiHeart } from 'react-icons/bi';
import { AiFillPrinter } from 'react-icons/ai';
import { MdAlarm } from 'react-icons/md';
import Link from 'next/link';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { useFavorite } from "../../context/favoriteContext";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { API_URL } from "../../api_baseURL"
import { useTranslation } from "next-i18next"
import { motion } from 'framer-motion';
import { useAnimationContext } from '../../context/animationContext';
const OverviewSection = ({ blogData }) => {
    const { menuOpened } = useAnimationContext();
    let { t } = useTranslation("common")
    const [isMobile, setMobile] = useState(false)
    const { locale } = useRouter()
    const { isAuthenticated } = useAuth()
    const [isFavorite, setIsFavorite] = useState(false)
    const { userFavoriteBlogs, setUserFavoriteBlogs } = useFavorite()
    useEffect(() => {
        setIsFavorite(false)
        userFavoriteBlogs?.map((blog, index) => {
            if (blog.slug == blogData?.slug) {
                setIsFavorite(true)
            }
        })
    }, [userFavoriteBlogs, blogData])
    const addToFavorite = () => {
        const id = localStorage.getItem("currentUser")
        setUserFavoriteBlogs([...userFavoriteBlogs, blogData])
        setIsFavorite(true)
        id && axios
            .put(`${API_URL}/users/${id}`, {
                favoriteBlogs: [...userFavoriteBlogs, blogData],
            })
    }
    const removeFromFavorite = () => {
        const id = localStorage.getItem("currentUser")
        let newFavorite = userFavoriteBlogs.filter((blog) => blog.slug != blogData?.slug)
        setUserFavoriteBlogs(newFavorite)
        setIsFavorite(false)
        id && axios.put(`${API_URL}/users/${id}`, {
            favoriteBlogs: [...newFavorite],
        })
    }
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
            <div className='blog-overview'>
            <div className={`insideLyr ${menuOpened ? 'whileMenuOpening' : ''}`}>
                <div className='blog-overview-header'>
                    {/* <p>
                            <Link href={`/${locale}`} style={{ cursor: 'pointer' }}>Home / </Link>
                            <Link href={`/${locale}/blogs`}>Blogs / </Link>
                            <Link href={``}>Blog Detail</Link>
                        </p> */}
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0, duration: .75 }}
                    >{`${t("product_details_page.tips_tricks")}`}</motion.h1>
                    {/* <h1>{blogData?.title}</h1> */}
                    <motion.span
                        initial={{ opacity: 0,  }}
                        whileInView={{ opacity: 1,  }}
                        viewport={{ once: true }}
                        transition={{ delay: .5, duration: .75 }}
                        className='header-span'>{blogData?.description}</motion.span>
                    <div className='header-icons-container'>
                        <motion.div
                            initial={{ opacity: 0,  }}
                            whileInView={{ opacity: 1,  }}
                            viewport={{ once: true }}
                            transition={{ delay: .7, duration: .75 }}
                            className='icon-container'>
                            <div className='icon'>
                                <MdAlarm size={30} />
                            </div>
                            <span>{blogData?.reading_time} {`${t("mins_read")}`}</span>
                        </motion.div>
                        {/* <div className='icon-container'>
                            <div className='icon'>
                                <AiFillPrinter size={30} />
                            </div>
                            <span>Print</span>
                        </div> */}
                    </div>
                </div>
                <div className='blog-img-wrapper'>
                    <div className='blog-img-container'>
                        <motion.img src='/img/Rectangle2523.png' alt='blog-img'
                            initial={{ opacity: 0,  }}
                            whileInView={{ opacity: 1,  }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.2, duration: .75 }} />
                              {isAuthenticated && <motion.div className='icon-container'
                            initial={{ opacity: 0,  }}
                            whileInView={{ opacity: 1,  }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.5, duration: .75 }}>
                            <div className='icon'
                                onClick={() => { isFavorite ? removeFromFavorite() : addToFavorite() }}
                            >
                                {isFavorite ? <HiHeart size={30} color="white" /> :
                                    <HiOutlineHeart size={30} color="white" />}
                            </div>
                            
                        </motion.div>}
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default OverviewSection
