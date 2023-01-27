
import React, { useEffect, useState } from 'react'
import Button from "../Button/Button"
import Link from 'next/link';
import { useRouter } from 'next/router';
import { API_URL } from '../../api_baseURL';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import axios from 'axios';
import { useFavorite } from '../../context/favoriteContext';
import { useAuth } from '../../context/authContext';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';

const BlogCard = ({ cardImg,
    cardTime,
    cardText,
    cardTag,
    cardDescription,
    buttonText,
    imgAlt,
    cardSlug,
    topics,
    allBlogData,
    allBlogs,
    favorite,
    index
}) => {
    const { locale } = useRouter()
    const [tag, setTag] = useState()
    const [isFavorite, setIsFavorite] = useState(false)
    const { userFavoriteBlogs, setUserFavoriteBlogs } = useFavorite()
    const [favoriteItemName, setFavriteItemName] = useState()
    const [favoriteItemDescription, setFavriteItemDescription] = useState()
    const { isAuthenticated } = useAuth();
    const { t } = useTranslation('common');
    const [isMobile, setMobile] = useState(false)

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

    useEffect(() => {
        if (!!allBlogs && favorite) {
            const favItem = allBlogs.filter((blog) => blog.slug == cardSlug)
            setFavriteItemName(favItem[0]?.title);
            setFavriteItemDescription(favItem[0]?.description);
        }
    }, [favoriteItemName, favoriteItemDescription, cardSlug, allBlogs,favorite])
    useEffect(() => {
        userFavoriteBlogs?.map((product, index) => {
            if (product?.slug == cardSlug) {
                setIsFavorite(true)
            }
        })
    }, [userFavoriteBlogs, cardSlug])
    const removeProduct = () => {
        const id = localStorage.getItem("currentUser")
        let newFavorite = userFavoriteBlogs.filter((pro) => pro.slug != cardSlug)
        setUserFavoriteBlogs(newFavorite)
        setIsFavorite(false)
        id && axios.put(`${API_URL}/users/${id}`, {
            favoriteBlogs: [...newFavorite],
        })
    }
    const addProduct = () => {
        const id = localStorage.getItem("currentUser")
        setUserFavoriteBlogs([...userFavoriteBlogs, allBlogData])
        setIsFavorite(true)
        id && axios
            .put(`${API_URL}/users/${id}`, {
                favoriteBlogs: [...userFavoriteBlogs, allBlogData],
            })
    }

    useEffect(() => {
        topics?.map((item) => {
            item.id == cardTag && setTag(item.name)
        })
    }, [topics, cardTag, tag])
    return (
        <motion.div className="blogs-main-card" initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: .1 }}
            transition={{ duration: .75, delay: index >= 0 && index < 4 && !isMobile ? parseFloat((index / 10) + 0.1) : 0.2 }}>
            <div className="blogs-card-body">
                {isAuthenticated && <div className='favorite-heart' onClick={() => {
                    isFavorite ? removeProduct() : addProduct()
                }}>
                    {isFavorite ? <HiHeart size={25} color="white" /> :
                        <HiOutlineHeart size={25} color="white" />}
                </div>}
                <div className='card-img'>
                    <img src={cardImg} alt={imgAlt}/>
                    {/* <img src='/img/recipe-card.png' alt={imgAlt} /> */}
                </div>
                <div className="card-text">
                    <p className='somatic-rounded card-date'>{cardTime} {t('mins_read')}</p>
                    <p className='card-title somatic-rounded'>{favorite ? favoriteItemName : cardText}</p>
                    <p className='card-descreption'>{favorite ? favoriteItemDescription : cardDescription}</p>
                    <div className='button-group'>
                        <Link href={`/${locale}/blogs/${cardSlug}`} style={{ cursor: 'pointer' }} passHref>
                            <div 
                            					onClick={()=>{window.scrollTo(0,0)}}
                            className='blog-card-button button-animation button button--wayra button--border-thin button--round-s'>
                                <Button animate type="normal" text={t('read_more')}></Button>
                            </div>
                        </Link>
                    </div>
                </div>
                <Link href={`/${locale}/recipes/search?topic=${topics ? tag : cardTag}`} passHref>
                    <div className='blog-tag'>#{topics ? tag : cardTag}</div>
                </Link>
            </div>
        </motion.div>
    )
}

export default BlogCard

