import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Rating from "react-rating";
import { BiHeart } from "react-icons/bi";
import { AiFillPrinter, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import {
	FacebookShareButton,
	WhatsappShareButton,
	PinterestShareButton,
	TwitterShareButton,
	
} from "react-share";
import { FaFacebookF } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiOutlineYoutube } from "react-icons/ai";
import { FiInstagram } from "react-icons/fi";
import { useFavorite } from "../../context/favoriteContext";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { API_URL } from "../../api_baseURL";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";
import { useAnimationContext } from "../../context/animationContext";
import ReactPlayer from "react-player";

const OverviewSection = ({
	recipeName,
	recipePreparation,
	recipeServes,
	recipeCooking,
	recipeTopics,
	allRecipeData,
	recipeSlug,
	recipeVideo,
	recipeThumbnail,
}) => {
	const { menuOpened } = useAnimationContext();
	let { t } = useTranslation("common");
	const [isMobile, setMobile] = useState(false);
	const { locale, asPath } = useRouter();
	const vidRef = useRef(null);
	const [isPlayed, setPlayed] = useState(false);
	const { isAuthenticated } = useAuth();
	const [isFavorite, setIsFavorite] = useState(false);
	const { userFavoriteRecipes, setUserFavoriteRecipes } = useFavorite();
	useEffect(() => {
		setIsFavorite(false);
		userFavoriteRecipes?.map((recipe, index) => {
			if (recipe.slug == recipeSlug) {
				setIsFavorite(true);
			}
		});
	}, [userFavoriteRecipes, recipeSlug]);
	const addToFavorite = () => {
		const id = localStorage.getItem("currentUser");
		setUserFavoriteRecipes([...userFavoriteRecipes, allRecipeData]);
		setIsFavorite(true);
		id &&
			axios.put(`${API_URL}/users/${id}`, {
				favoriteRecipes: [...userFavoriteRecipes, allRecipeData],
			});
	};
	const removeFromFavorite = () => {
		const id = localStorage.getItem("currentUser");
		let newFavorite = userFavoriteRecipes.filter(
			(recipe) => recipe.slug != recipeSlug
		);
		setUserFavoriteRecipes(newFavorite);
		setIsFavorite(false);
		id &&
			axios.put(`${API_URL}/users/${id}`, {
				favoriteRecipes: [...newFavorite],
			});
	};
	const handlePlayVideo = () => {
		setPlayed(!isPlayed);
	};
	const isMobileHandler = (e) => {
		setMobile(e.matches);
	};
	useEffect(() => {
		try {
			// Chrome & Firefox
			window
				.matchMedia(`(max-width : 1024px)`)
				.addEventListener("change", isMobileHandler);
			setMobile(window.matchMedia(`(max-width : 1024px)`).matches);
		} catch (e1) {
			try {
				// Safari
				window
					.matchMedia(`(max-width : 1024px)`)
					.addListener(() => isMobileHandler());
				setMobile(window.matchMedia(`(max-width : 1024px)`).matches);
			} catch (e2) {
				console.error(e2);
			}
		}
	}, []);
	const arr = [
		{
			headText: t("recipe_details_page.cook_time"),
			time: `${recipeCooking} ${t("recipe_details_page.minutes")}`,
			img: "/img/recipes/recipeDetails/alarm.png",
		},
		{
			headText: t("recipe_details_page.prep"),
			time: `${recipePreparation} ${t("recipe_details_page.minutes")}`,
			img: "/img/recipes/recipeDetails/alarm.png",
		},
		{
			headText: t("recipe_details_page.serves"),
			time: `${recipeServes} ${t("recipe_details_page.persons")}`,
			img: "/img/recipes/recipeDetails/users.png",
		},
	];
	return (
		<>
			<div className="recipe-detail-overview-section">
				{isMobile ? (
					<div className="lyr">
						<div
							className={`insideLyr ${menuOpened ? "whileMenuOpening" : ""}`}
						>
							<motion.div
								className="overview-header"
								initial={{ opacity: 0, y: -10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0, duration: 0.75 }}
							>
								<h1>{recipeName}</h1>
							</motion.div>
							<motion.div
								className="video-container"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ delay: 0.5, duration: 0.75 }}
							>
								<div className="header-icons-container">
									{isAuthenticated && !isPlayed && (
										<div className="icon-container">
											<motion.div
												className="icon"
												initial={{ opacity: 0 }}
												whileInView={{ opacity: 1 }}
												viewport={{ once: true }}
												transition={{ delay: 0.4, duration: 0.75 }}
												onClick={() => {
													isFavorite ? removeFromFavorite() : addToFavorite();
												}}
											>
												{isFavorite ? (
													<HiHeart size={26} color="white" />
												) : (
													<HiOutlineHeart size={26} color="white" />
												)}
											</motion.div>
										</div>
									)}
								</div>
								{!!recipeVideo&& <ReactPlayer
									className="video-player"
									playing={isPlayed}
									url={
										recipeVideo?.match(/^https?:\/\//i)
											? recipeVideo
											: "https://" + recipeVideo
									}
									width={"100%"}
									height={"100%"}
									playsinline={true}
									controls={true}
								/>}
								<div
									className={`overlay ${isPlayed ? "hide-overlay" : ""}`}
									style={{
										backgroundImage: `url(${recipeThumbnail})`,
										zIndex: 2,
									}}
								></div>
								{!!recipeVideo&&<div className="icon-shadow-container">
									<div
										className={`icon ${isPlayed ? "isPlayed" : ""}`}
										onClick={() => {
											handlePlayVideo();
										}}
									></div>
								</div>}
							</motion.div>
							<motion.div
								className="card-container"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ delay: 1.2, duration: 0.75 }}
							>
								<motion.div className="info-card">
									{arr.map((item, index) => (
										<motion.div
											className="info"
											key={index}>
											<div className="icon-container">
												<img alt="icon" src={item.img} />
											</div>
											<div className="card-text">
												{index == 2 ? (
													<span>
														{item.headText} <strong>{item.time}</strong>
													</span>
												) : (
													<span>
														{item.headText}: <strong>{item.time}</strong>
													</span>
												)}
											</div>
										</motion.div>
									))}
								</motion.div>
							</motion.div>
							<div className="tags-container">
								<motion.span
									className="tag-label"
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
									transition={{ delay: 0.2, duration: 0.75 }}
								>
									{t("recipe_details_page.related_tags")}{" "}
								</motion.span>
								<div className="single-tags">
									{recipeTopics?.map((item, index) => (
										<>
											<Link
												href={`/${locale}/recipes/search?topic=${item.slug}`}
												passHref
											>
												<motion.div
													className="tag"
													key={index}
													initial={{ opacity: 0 }}
													whileInView={{ opacity: 1 }}
													viewport={{ once: true }}
													transition={{
														delay: parseFloat(index / 6 + 0.3),
														duration: 0.75,
													}}
												>
													#{item.name}
												</motion.div>
											</Link>
										</>
									))}
								</div>
							</div>
							<motion.div
								className="share-container"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{
									delay: 0.2,
									duration: 0.75,
								}}
							>
								<motion.div className="icon-container">
										<FacebookShareButton url={`https://walimasocial.com${asPath}`} hashtag={locale == 'ar' ?  '#وليمة' : '#Walima'}>
											<FaFacebookF size={25} />
										</FacebookShareButton>
									</motion.div>
									<motion.div className="icon-container">
										<WhatsappShareButton url={`https://walimasocial.com${asPath}`} hashtag={locale == 'ar' ?  '#وليمة' : '#Walima'}>
											<RiWhatsappFill size={25} />
										</WhatsappShareButton>
									</motion.div>
									<motion.div
										className="icon-container">
										<TwitterShareButton url={`https://walimasocial.com${asPath}`} hashtag={locale == 'ar' ?  '#وليمة' : '#Walima'}>
											<AiOutlineTwitter size={25} />
										</TwitterShareButton>
									</motion.div>
							</motion.div>
						</div>
					</div>
				) : (
					<div className="lyr">
						<div
							className={`insideLyr ${menuOpened ? "whileMenuOpening" : ""}`}
						>
							<div className="lyr-header">
								{!!recipeVideo ? (
									<motion.div
										className="video-container"
										initial={{ opacity: 0 }}
										whileInView={{ opacity: 1 }}
										viewport={{ once: true }}
										transition={{ delay: 0.2, duration: 0.75 }}
									>
										<div className="header-icons-container">
											{isAuthenticated && !isPlayed && (
												<div className="icon-container">
													<motion.div
														className="icon"
														initial={{ opacity: 0 }}
														whileInView={{ opacity: 1 }}
														viewport={{ once: true }}
														transition={{ delay: 1.5, duration: 0.75 }}
														onClick={() => {
															isFavorite
																? removeFromFavorite()
																: addToFavorite();
														}}
													>
														{isFavorite ? (
															<HiHeart size={30} color="white" />
														) : (
															<HiOutlineHeart size={30} color="white" />
														)}
													</motion.div>
												</div>
											)}
										</div>
										<ReactPlayer
											className="video-player"
											playing={isPlayed}
											url={
												recipeVideo?.match(/^https?:\/\//i)
													? recipeVideo
													: "https://" + recipeVideo
											}
											width={"100%"}
											height={"100%"}
											playsinline={true}
											controls={true}
										/>
										<div
											className={`overlay ${isPlayed ? "hide-overlay" : ""}`}
											style={{
												backgroundImage: `url(${recipeThumbnail})`,
												zIndex: 2,
											}}
										></div>
										<div className="icon-shadow-container">
											<div
												className={`icon ${isPlayed ? "isPlayed" : ""}`}
												onClick={() => {
													handlePlayVideo();
												}}
											></div>
										</div>
									</motion.div>
								) :
									<motion.div
										className="video-container"
										initial={{ opacity: 0 }}
										whileInView={{ opacity: 1 }}
										viewport={{ once: true }}
										transition={{ delay: 0.2, duration: 0.75 }}>
										<div className="header-icons-container">
											{isAuthenticated && (
												<div className="icon-container">
													<motion.div
														className="icon"
														initial={{ opacity: 0 }}
														whileInView={{ opacity: 1 }}
														viewport={{ once: true }}
														transition={{ delay: 1.5, duration: 0.75 }}
														onClick={() => {
															isFavorite
																? removeFromFavorite()
																: addToFavorite();
														}}
													>
														{isFavorite ? (
															<HiHeart size={30} color="white" />
														) : (
															<HiOutlineHeart size={30} color="white" />
														)}
													</motion.div>
												</div>
											)}
										</div>
										<div
											className={`overlay ${isPlayed ? "hide-overlay" : ""}`}
											style={{
												backgroundImage: `url(${recipeThumbnail})`,
												zIndex: 2,
											}}
										></div>
									</motion.div>
								}
							</div>
							<div className="lyr-container">
								<motion.div
									className="overview-header"
									initial={{ opacity: 0, y: -10 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0, duration: 0.75 }}
								>
									<h1>{recipeName}</h1>
								</motion.div>

								<motion.div
									className="card-container"
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
									transition={{ delay: 0.4, duration: 0.75 }}
								>
									<motion.div className="info-card">
										{arr.map((item, index) => (
											<motion.div
												className="info"
												key={index}
												initial={{ opacity: 0 }}
												whileInView={{ opacity: 1 }}
												viewport={{ once: true }}
												transition={{
													delay: parseFloat(index / 6 + 0.4),
													duration: 0.75,
												}}
											>
												<div className="icon-container">
													<img alt="icon" src={item.img} />
												</div>
												<div className="card-text">
													<span>
														{item.headText}
														<br />
														<strong>{item.time}</strong>
													</span>
												</div>
											</motion.div>
										))}
									</motion.div>
								</motion.div>
								<div className="tags-container">
									<motion.span
										className="tag-label"
										initial={{ opacity: 0 }}
										whileInView={{ opacity: 1 }}
										viewport={{ once: true }}
										transition={{ delay: 1.2, duration: 0.75 }}
									>
										{t("recipe_details_page.related_tags")}{" "}
									</motion.span>
									{recipeTopics?.map((item, index) => (
										<>
											<Link
												href={`/${locale}/recipes/search?topic=${item.slug}`}
												passHref
											>
												<motion.div
													className="tag"
													key={index}
													initial={{ opacity: 0 }}
													whileInView={{ opacity: 1 }}
													viewport={{ once: true }}
													transition={{
														delay: parseFloat(index / 6 + 1),
														duration: 0.75,
													}}
												>
													#{item.name}
												</motion.div>
											</Link>
										</>
									))}
								</div>
								<motion.div
									className="share-container"
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
									transition={{
										delay: 1.6,
										duration: 0.75,
									}}
								>
									<motion.div className="icon-container">
										<FacebookShareButton url={`https://walimasocial.com${asPath}`} hashtag={locale == 'ar' ?  '#وليمة' : '#Walima'}>
											<FaFacebookF size={25} />
										</FacebookShareButton>
									</motion.div>
									<motion.div className="icon-container">
										<WhatsappShareButton url={`https://walimasocial.com${asPath}`} hashtag={locale == 'ar' ?  '#وليمة' : '#Walima'}>
											<RiWhatsappFill size={25} />
										</WhatsappShareButton>
									</motion.div>
									<motion.div
										className="icon-container">
										<TwitterShareButton url={`https://walimasocial.com${asPath}`} hashtag={locale == 'ar' ?  '#وليمة' : '#Walima'}>
											<AiOutlineTwitter size={25} />
										</TwitterShareButton>
									</motion.div>
								</motion.div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default OverviewSection;
