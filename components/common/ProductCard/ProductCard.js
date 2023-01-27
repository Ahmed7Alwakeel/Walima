import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { API_URL } from "../../api_baseURL";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import { useFavorite } from "../../context/favoriteContext";
import { useAuth } from "../../context/authContext";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";
import Image from "next/image";

const ProductCard = ({
	productCategory,
	productSearch,
	cardImg,
	cardTime,
	cardText,
	cardDescription,
	cardSlug,
	allProductData,
	imgAlt,
	favorite,
	allProducts,
	index,
	bookmark,
	delayMaintainer
}) => {
	const { locale } = useRouter();
	const [isFavorite, setIsFavorite] = useState(false);
	const { userFavoriteProducts, setUserFavoriteProducts } = useFavorite();
	const [favoriteItemName, setFavriteItemName] = useState();
	const [favoriteItemDescription, setFavriteItemDescription] = useState();
	const { isAuthenticated } = useAuth();
	const { t } = useTranslation("common");
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
		if (!!allProducts && favorite) {
			const favItem = allProducts.filter((pro) => pro.slug == cardSlug);
			setFavriteItemName(favItem[0]?.name);
			setFavriteItemDescription(favItem[0]?.small_description);
		}
	}, [favoriteItemName, favoriteItemDescription, cardSlug, allProducts,favorite]);
	useEffect(() => {
		userFavoriteProducts?.map((product, index) => {
			if (product?.slug == cardSlug) {
				setIsFavorite(true);
			}
		});
	}, [userFavoriteProducts, cardSlug]);
	const removeProduct = () => {
		const id = localStorage.getItem("currentUser");
		let newFavorite = userFavoriteProducts.filter(
			(pro) => pro.slug != cardSlug
		);
		setUserFavoriteProducts(newFavorite);
		setIsFavorite(false);
		id &&
			axios.put(`${API_URL}/users/${id}`, {
				favoriteProducts: [...newFavorite],
			});
	};
	const addProduct = () => {
		const id = localStorage.getItem("currentUser");
		setUserFavoriteProducts([...userFavoriteProducts, allProductData]);
		setIsFavorite(true);
		id &&
			axios.put(`${API_URL}/users/${id}`, {
				favoriteProducts: [...userFavoriteProducts, allProductData],
			});
	};
	return (
		<motion.div className="product-main-card"
		initial={{ opacity: 0, y: isMobile&&index<=1?50:0 }}
			whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: productCategory || productSearch ? "" : .1 }}
			transition={{ duration: .75, delay: index < 4 && !isMobile ? parseFloat((index / 10) + 0.2) : (delayMaintainer && !isMobile) ? parseFloat((index / 10) + 0.1): 0}}>
			<div className="product-card-body">
				<div className="card-circle">
					<div className="big-img-container">
						{/* <img src={`${API_URL}${cardImg}`} className='big-img' alt={imgAlt}/> */}
						{/* <img src={cardImg} className="big-img" alt={imgAlt} /> */}
						<Image src={cardImg} className="big-img" alt={imgAlt} quality={100} layout='fill'/>
					</div>
				</div>
				<div className="card-text">
					<div className="heart-wrapper">
						{/* <p className='somatic-rounded card-date'>{cardTime}</p> */}
						{isAuthenticated && (
							<div
								className="favorite-heart"
								onClick={() => {
									isFavorite ? removeProduct() : addProduct();
								}}
							>
								{isFavorite ? (
									<HiHeart size={25} color="white" />
								) : (
									<HiOutlineHeart size={25} color="white" />
								)}
							</div>
						)}
					</div>
					<p className="card-title somatic-rounded">
						{favoriteItemName ? favoriteItemName : cardText}

					</p>
					<p className="card-descreption">
						{favoriteItemDescription
							? favoriteItemDescription
							: cardDescription}
					</p>
					<div className="button-group">
						<Link
							href={`/${locale}/products/${cardSlug}`}
							style={{ cursor: "pointer" }}
							scroll={false}
							passHref
						>
							<div
								onClick={() => { window.scrollTo(0, 0) }}
								className="blog-card-button button-animation button button--wayra button--border-thin button--round-s">
								<Button animate type="normal" text={t("main.explore_product")}></Button>
							</div>
						</Link>
						{/* <div 
											onClick={()=>{window.scrollTo(0,0)}}
						className="blog-card-button button-animation button button--wayra button--border-thin button--round-s">
							<Button animate type="normal" text={t("buy_now")}></Button>
						</div> */}
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default ProductCard;
