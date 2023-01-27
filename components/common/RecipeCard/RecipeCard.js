
import React, { useEffect, useState } from 'react'
import Button from "../Button/Button"
import Link from 'next/link';
import { useRouter } from 'next/router';
import { API_URL } from '../../api_baseURL'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useFavorite } from '../../context/favoriteContext';
import axios from 'axios';
import { useAuth } from '../../context/authContext';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';

const RecipeCard = (
    { cardImg,
        recipeSearch,
        homePage,
        cardName,
        allRecipeData,
        cardServes,
        cardCookingTime,
        cardPreparationTime,
        cardSlug,
        imgAlt,
        cardPrice,
        info,
        buttonText,
        allRecipes,
        favorite,
        index,
        bookmark,
        mainProduct
    }
) => {
    const [isMobile, setMobile] = useState(false)
    const { locale } = useRouter()
    const [isFavorite, setIsFavorite] = useState(false)
    const { userFavoriteRecipes, setUserFavoriteRecipes } = useFavorite()
    const [favoriteItemName, setFavriteItemName] = useState()
    const [favoriteItemMainProduct, setFavriteItemMainProduct] = useState()
    const { isAuthenticated } = useAuth();
    const { t } = useTranslation('common');
    const isMobileHandler = (e) => {
        setMobile(e.matches)
    }
    useEffect(() => {
        if (!!allRecipes && favorite) {
            const favItem = allRecipes.find((recipe) => recipe.slug == cardSlug)
            setFavriteItemName(favItem?.name);
            setFavriteItemMainProduct(favItem?.mainproduct.name)
        }
    }, [favoriteItemName, cardSlug, allRecipes, favorite])
    useEffect(() => {
        userFavoriteRecipes?.map((recipe, index) => {
            if (recipe?.slug == cardSlug) {
                setIsFavorite(true)
            }
        })
    }, [userFavoriteRecipes, cardSlug])
    const removeProduct = () => {
        const id = localStorage.getItem("currentUser")
        let newFavorite = userFavoriteRecipes.filter((recipe) => recipe.slug != cardSlug)
        setUserFavoriteRecipes(newFavorite)
        setIsFavorite(false)
        id && axios.put(`${API_URL}/users/${id}`, {
            favoriteRecipes: [...newFavorite],
        })
    }
    const addProduct = () => {
        const id = localStorage.getItem("currentUser")
        setUserFavoriteRecipes([...userFavoriteRecipes, allRecipeData])
        setIsFavorite(true)
        id && axios
            .put(`${API_URL}/users/${id}`, {
                favoriteRecipes: [...userFavoriteRecipes, allRecipeData],
            })
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
            <motion.div className='recipe-card' initial={{ opacity: 0, y: isMobile&&index<=1?50:0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{
                once: true,
                amount: recipeSearch  ? "" : bookmark?.05:.1
            }}
                transition=
                {{ duration: .5, delay: (parseFloat(index / 10)+.05)}}>
                <div className='card-items'>

                    <div className='img-container-wrapper'>

                        <div className='img-container' >
                            {isAuthenticated && <div className='favorite-heart' onClick={() => {
                                isFavorite ? removeProduct() : addProduct()
                            }}>
                                {isFavorite ? <HiHeart size={25} color="white" /> :
                                    <HiOutlineHeart size={25} color="white" />}
                            </div>}
                            {/* <img src='/img/recipe-card.png' alt={imgAlt} /> */}
                            <img src={`${cardImg}`} alt={imgAlt}/>
                        </div>
                    </div>
                    <div className='card-body'>
                        <div className='card-title'>
                            <h1>{favorite ? favoriteItemName : cardName}</h1>
                        </div>
                        <div className='card-info'>
                            <p><img src='/img/alarm.png' alt='icon'/> {cardCookingTime} {t('recipe_card.min')}</p>
                            <p><img src='/img/users.png' alt='icon'/> {`${t('recipe_card.serves')} ${cardServes}`}</p>
                            {/* <p><img src='/img/like.png' alt='icon'/> {t('main.main_product')}</p> */}
                            
                                <p><img src='/img/like.png' alt='icon'/> {favorite?favoriteItemMainProduct: mainProduct}</p>
                            
                            {/* <p><img src='/img/like.png' /> {`${cardPrice} ${t('recipe_card.sar')}`}</p> */}
                        </div>
                        <div className='card-button'>
                            <Link href={`/${locale}/recipes/${cardSlug}`} style={{ cursor: 'pointer' }} passHref>
                                <div
                                    onClick={() => { window.scrollTo(0, 0) }}
                                    className='recipe-button button-animation button button--wayra button--border-thin button--round-s'>
                                    <Button animate type="normal" text={`${buttonText ? buttonText : t('main.explore_recipe')}`}></Button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default RecipeCard

