
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { API_URL } from '../../api_baseURL';
import Button from "../../common/Button/Button"
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/authContext';
import { useFavorite } from '../../context/favoriteContext';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import axios from 'axios';
const TipsItems = ({ imgUrl, title, mainBlogs, topics, blogPage, homePage, blogDetailPage }) => {
    const { locale,asPath } = useRouter()
    const [tag, setTag] = useState();
    const { t } = useTranslation('common')
    const [isMobile, setMobile] = useState(false)
    const { isAuthenticated } = useAuth();
    const [isFavorite0, setIsFavorite0] = useState(false)
    const [isFavorite1, setIsFavorite1] = useState(false)
    const [isFavorite2, setIsFavorite2] = useState(false)
    const { userFavoriteBlogs, setUserFavoriteBlogs } = useFavorite()
    const isMobileHandler = (e) => {
        setMobile(e.matches)
    }
    useEffect(() => {
        try {
            // Chrome & Firefox
            window.matchMedia(`(max-width : 768px)`).addEventListener("change", isMobileHandler)
            setMobile(window.matchMedia(`(max-width : 768px)`).matches)
        } catch (e1) {
            try {
                // Safari
                window.matchMedia(`(max-width : 768px)`).addListener(() => isMobileHandler())
                setMobile(window.matchMedia(`(max-width : 768px)`).matches)
            } catch (e2) {
                console.error(e2)
            }
        }
    }, [])
    useEffect(() => {
        topics?.map((item) => {
            item.id == mainBlogs?.blogs[0].topic && setTag(item.name)
        })
    }, [mainBlogs, topics])
    useEffect(() => {
        userFavoriteBlogs?.map((product) => {
            mainBlogs?.blogs?.map((blog,index) => {
                index==0&&product?.slug == blog.slug&&setIsFavorite0(true)
                index==1&&product?.slug == blog.slug&&setIsFavorite1(true)
                index==2&&product?.slug == blog.slug&&setIsFavorite2(true)
            })
        })
    }, [userFavoriteBlogs,mainBlogs])
    const removeProduct = (blog,index) => {
        const id = localStorage.getItem("currentUser")
        let newFavorite = userFavoriteBlogs.filter((pro) => pro.slug != blog.slug)
        setUserFavoriteBlogs(newFavorite)
        index==0&&setIsFavorite0(false)
        index==1&&setIsFavorite1(false)
        index==2&&setIsFavorite2(false)
        id && axios.put(`${API_URL}/users/${id}`, {
            favoriteBlogs: [...newFavorite],
        })
    }
    const addProduct = (blog,index) => {
        const id = localStorage.getItem("currentUser")
        setUserFavoriteBlogs([...userFavoriteBlogs, blog])
        index==0&&setIsFavorite0(true)
        index==1&&setIsFavorite1(true)
        index==2&&setIsFavorite2(true)
        id && axios
            .put(`${API_URL}/users/${id}`, {
                favoriteBlogs: [...userFavoriteBlogs, blog],
            })
    }
    return (
        <>
            <div className={`${blogDetailPage && 'background-white'} ${homePage && 'background-white'} tips-items-container`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }}>
                {title && <motion.div className='tips-header'
                    initial={{ opacity: 0, }}
                    whileInView={{ opacity: 1, }}
                    viewport={{ once: true }}
                    transition={{
                        delay: .2
                        // delay: blogDetailPage ? 1.7 : .1
                        , duration: .75
                    }}
                >
                    <h1>{title}</h1>
                </motion.div>}
                <div className='tips-imgs-container'>
                    <div className='big-tip-container'>
                        <motion.div className='img-container'
                            initial={{ opacity: 0, }}
                            whileInView={{ opacity: 1, }}
                            viewport={{ once: true }}
                            transition={{ delay: isMobile ? 0 : .6, duration: .75 }}>

                            {isAuthenticated && <motion.div className='favorite-heart'
                                initial={{ opacity: 0, }}
                                whileInView={{ opacity: 1, }}
                                viewport={{ once: true }}
                                transition={{ delay: isMobile ? 1 : 2, duration: .75 }}
                                onClick={() => {
                                    isFavorite0 ? removeProduct(mainBlogs?.blogs[0],0) : addProduct(mainBlogs?.blogs[0],0)
                                }}>
                                {isFavorite0 ? <HiHeart size={25} color="white" /> :
                                    <HiOutlineHeart size={25} color="white" />}
                            </motion.div>}



                            <Link href={`/${locale}/blogs/${mainBlogs?.blogs[0]?.slug}`} passHref>
                                {/* <img src='/img/blogs/unsplash_-YHSwy6uqvk.png' style={{ cursor: "pointer" }} alt="main-image"/> */}
                            <img src={mainBlogs?.blogs[0]?.main_image.url} alt={mainBlogs?.blogs[0]?.main_image.name}/>
                            </Link>
                        </motion.div>
                        <motion.div className='text-container'
                            initial={{ opacity: 0, }}
                            whileInView={{ opacity: 1, }}
                            viewport={{ once: true }}
                            transition={{ delay: isMobile ? .1 : .8, duration: .75 }}
                        >
                            {/* 36 Little Cooking Habits You Should Actually Ditch ASAP */}
                            {mainBlogs?.blogs[0].main_blog_text}
                        </motion.div>
                        <Link href={`/${locale}/recipes/search?topic=${tag}`} passHref>
                            <motion.div className='tip-tag'
                                initial={{ opacity: 0, }}
                                whileInView={{ opacity: 1, }}
                                viewport={{ once: true }}
                                transition={{ delay: isMobile ? 1 : 2, duration: .75 }}>#{tag}</motion.div>
                        </Link>
                    </div>
                    <div className='small-tips-container'>
                        {mainBlogs?.blogs?.map((item, index) => (
                            index > 0 &&
                            <div className='single-tip-container' key={index}>
                                {isMobile ?
                                    <>

                                        <motion.div className={`small-img-container`}
                                            initial={{ opacity: 0, y: -20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index == 1 ? .2 : .4, duration: .75 }}
                                        >
                                            {isAuthenticated &&index==1&& <motion.div className='favorite-heart'
                                                initial={{ opacity: 0, }}
                                                whileInView={{ opacity: 1, }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 1.4, duration: .75 }}
                                                onClick={() => {
                                                    isFavorite1 ? removeProduct(item,index) : addProduct(item,index)
                                                }}>
                                                {isFavorite1 ? <HiHeart size={25} color="white" /> :
                                                    <HiOutlineHeart size={25} color="white" />}
                                            </motion.div>}
                                            {isAuthenticated &&index==2&& <motion.div className='favorite-heart'
                                                initial={{ opacity: 0, }}
                                                whileInView={{ opacity: 1, }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 1.8, duration: .75 }}
                                                onClick={() => {
                                                    isFavorite2 ? removeProduct(item,index) : addProduct(item,index)
                                                }}>
                                                {isFavorite2 ? <HiHeart size={25} color="white" /> :
                                                    <HiOutlineHeart size={25} color="white" />}
                                            </motion.div>}
                                            <Link href={`/${locale}/blogs/${item?.slug}`} passHref>
                                                {/* <img src='/img/blogs/unsplash_-YHSwy6uqvk (1).png' style={{ cursor: "pointer" }} alt='main-image' /> */}
                                            <img src={item.main_image.url} alt={item.main_image.name} />
                                            </Link>
                                        </motion.div>
                                        <motion.div className='text-container'
                                            initial={{ opacity: 0, }}
                                            whileInView={{ opacity: 1, }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index == 1 ? .5 : .7, duration: .75 }}>
                                            {/* {item.title} */}
                                            {item.main_blog_text}
                                        </motion.div>
                                    </>
                                    :
                                    <>

                                        <motion.div className={`small-img-container`}
                                            initial={{ opacity: 0, y: -20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index == 1 ? 1.2 : 1.6, duration: .75 }}
                                        >
                                            {isAuthenticated &&index==1&& <motion.div className='favorite-heart'
                                                initial={{ opacity: 0, }}
                                                whileInView={{ opacity: 1, }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 1.4, duration: .75 }}
                                                onClick={() => {
                                                    isFavorite1 ? removeProduct(item,index) : addProduct(item,index)
                                                }}>
                                                {isFavorite1 ? <HiHeart size={25} color="white" /> :
                                                    <HiOutlineHeart size={25} color="white" />}
                                            </motion.div>}
                                            {isAuthenticated &&index==2&& <motion.div className='favorite-heart'
                                                initial={{ opacity: 0, }}
                                                whileInView={{ opacity: 1, }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 1.8, duration: .75 }}
                                                onClick={() => {
                                                    isFavorite2 ? removeProduct(item,index) : addProduct(item,index)
                                                }}>
                                                {isFavorite2 ? <HiHeart size={25} color="white" /> :
                                                    <HiOutlineHeart size={25} color="white" />}
                                            </motion.div>}
                                            <Link href={`/${locale}/blogs/${item?.slug}`} passHref>
                                                {/* <img src='/img/blogs/unsplash_-YHSwy6uqvk (1).png' style={{ cursor: "pointer" }} alt='main-image'/> */}
                                            <img src={item.main_image.url} alt={item.main_image.name} />
                                            </Link>
                                        </motion.div>
                                        <motion.div className='text-container'
                                            initial={{ opacity: 0, }}
                                            whileInView={{ opacity: 1, }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index == 1 ? 1.4 : 1.8, duration: .75 }}>
                                            {/* {item.title} */}
                                            {item.main_blog_text}
                                        </motion.div>
                                    </>
                                }

                                {topics?.map((topic) => (
                                    topic.id == item.topic && <Link href={`/${locale}/recipes/search?topic=${topic.name}`} passHref>
                                        <motion.div className='tip-tag'
                                            initial={{ opacity: 0, }}
                                            whileInView={{ opacity: 1, }}
                                            viewport={{ once: true }}
                                            transition={{ delay: isMobile ? 1 : 2, duration: .75 }}>#{topic.name}</motion.div>
                                    </Link>
                                ))}
                            </div>

                        ))}
                    </div>
                </div>
                {
                    !blogPage && <Link href={`/${locale}/blogs`} passHref>
                        <motion.div
                            onClick={() => { window.scrollTo(0, 0) }}
                            className='recipe-button
                        button-animation button button--wayra button--border-thin button--round-s'
                            initial={{ opacity: 0, }}
                            whileInView={{ opacity: 1, }}
                            viewport={{ once: true }}
                            transition={{ delay: isMobile ? 1 : 1.5, duration: .75 }}>
                            <Button animate type="normal" text={t('view_all_blogs')} className=" "></Button>
                        </motion.div>
                    </Link>
                }
            </div>
        </>
    )
}
export default TipsItems

