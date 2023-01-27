import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Tabs, TabPanel, TabList, Tab } from "react-tabs";
import RecipeCard from "../../common/RecipeCard/RecipeCard";
import { Navigation, Pagination, EffectFade, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperArrows from "../../common/SwiperArrows/SwiperArrows";
import { API_URL } from "../../api_baseURL";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import RecipeCardHome from "../../common/RecipeCard/RecipeCardHome";
const RecipesSection = ({ recipeData }) => {
	const [isMobile, setMobile] = useState(false);
	const { locale } = useRouter();
	const { t } = useTranslation("common");
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
	return (
		<>
			{isMobile && (
				<div className="recipe-section-container">
					<div className="recipe-section-text">
						<motion.h1
							initial={{ opacity: 0, y: -20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.2, delay: 0.5 }}
						>
							{recipeData?.title}
						</motion.h1>
						{/* <motion.span
							initial={{ opacity: 0, y: -20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: .7, delay: 0.5 }}
						>
							{recipeData?.description}
						</motion.span> */}
					</div>
					<div className="recipe-tabs-container">
						<Tabs>
							<TabList>
								{recipeData?.RecipeTab.map((topic, index) => (
									<Tab
										key={index}
										className={`recipe-tab ${index == 0 ? "firstTab" : ""} `}
										style={{
											transitionDelay:
												index > 0 ? `${parseFloat(index / 20)}s` : "0s",
										}}
									>
										<motion.div
											className="inner-tab"
											initial={{ opacity: 0, y: 10 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true }}
											transition={{ duration: .75, delay: 0.5 }}
										>
											<img alt={topic.icon.name} src={`${topic.icon.url}`}></img>
											<span>
												{topic.title.split(" ")[0]}
												<br />
												{topic.title.split(" ")[1]}
											</span>
										</motion.div>
									</Tab>

								))}
							</TabList>
							{recipeData?.RecipeTab.map((topic, index) => (
								<TabPanel key={index}>
									<div className={`recipe-swiper`}>
										<Swiper
											// key={'recipe'}
											style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
											modules={[Navigation]}
											navigation={{
												nextEl: ".swiper-next-recipe",
												prevEl: ".swiper-prev-recipe",
											}}
											className="swiper-main-section"
											slidesPerView={1.2}
											spaceBetween={20}
											centeredSlides={topic?.recipes.length == 1 ? true : false}
											breakpoints={{
												400: {
													slidesPerView: 1.2,
													spaceBetween: 20,
												},
												550: {
													slidesPerView: 2.35,
													spaceBetween: 20,
												},
												1023: {
													slidesPerView: 3,
													spaceBetween: 12,
												},
											}}
										>
											{topic?.recipes.map((item, index) => (
												<SwiperSlide key={index}>
													<motion.div className={`recipe-card-container-section ${topic?.recipes.length <= 1 && "add-padding"}`}
														initial={{ opacity: 0, y: 0 }}
														whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .05 }}
														transition={{ duration: index <= 1 ? 0.75 : 0.6, delay: index <= 1 ? parseFloat((index/10) + 0.2) : parseFloat((index / 50) + .1) }}
													>
														<RecipeCardHome Home homePage
															allRecipeData={item}
															cardName={item?.name}
															cardPrice={item?.price_range}
															cardServes={item?.serves}
															cardCookingTime={item?.cooking_time}
															cardPreparationTime={item?.preparation_time}
															cardSlug={item?.slug}
															cardImg={item?.image_mobile?.url}
															imgAlt={item.image_desktop?.name}
															mainProduct={item?.mainproduct?.name}
															index={index}
														/>
													</motion.div>
												</SwiperSlide>
											))}
											<motion.div className={`${topic?.recipes.length > 1 ? "add-padding" : "d-none"}`}
												initial={{ opacity: 0 }}
												whileInView={{ opacity: 1 }}
												viewport={{ once: true }}
												transition={{ duration: .75, delay: 1 }}>
												<SwiperArrows />
											</motion.div>
										</Swiper>
									</div>
								</TabPanel>
							))}
						</Tabs>
					</div>
				</div>
			) }
			{ !isMobile && 
			
			(
				<div className="recipe-section-container">
					<div className="recipe-tabs-container">
						<Tabs>
							<div className="recipe-tab-items">
								<div className="recipe-section-text">
									<motion.h1
										initial={{ opacity: 0, y: -20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: 0.2 }}
									>
										{recipeData?.title}
									</motion.h1>
									{/* <motion.span
								initial={{ opacity: 0, y: -20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: .75, delay: 0.5 }}>
								{recipeData?.description}
							</motion.span> */}
								</div>
								<TabList>
									{recipeData?.RecipeTab.map((topic, index) => (
										<Tab

											key={index}
											className={`recipe-tab ${index == 0 ? "firstTab" : ""} `}>
											<motion.div
												className="inner-tab"
												initial={{ opacity: 0 }}
												whileInView={{ opacity: 1 }}
												viewport={{ once: true }}
												transition={{ duration: .75, delay: 1.2 }}
											>
												<img alt={topic.icon.name} src={`${topic.icon.url}`}></img>
												<span>
													{topic.title.split(" ")[0]}
													<br />
													{topic.title.split(" ")[1]}
												</span>

											</motion.div>
										</Tab>
									))}
								</TabList>
							</div>
							<div className="recipe-tab-panel">
								{recipeData?.RecipeTab.map((topic, index) => (
									<TabPanel key={index}>
										<div className="recipe-swiper">
											<Swiper
												// key={'recipe'}
												style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
												modules={[Navigation, Pagination, EffectFade, Mousewheel]}
												//  
												navigation={{
													nextEl: ".swiper-next-recipe",
													prevEl: ".swiper-prev-recipe",
												}}
												className="swiper-recipe-section"
												// slidesPerView={2.35}
												breakpoints={{
													1024: {
														slidesPerView: 2.5,
														spaceBetween: 40,
													},
													1600: {
														slidesPerView: 3,
														spaceBetween: 30,
													},
												}}
												pagination={{
													type: "progressbar",
													el: ".custom-recipe-pagination",
													clickable: true,
													renderBullet: (index, className) => {
														return '<span class="' + className + '">' + "</span>"
													},
												}}
											>
												<motion.div className='custom-recipe-pagination swiper-pagination-progressbar'
													initial={{ opacity: 0, }}
													whileInView={{ opacity: 1, }}
													viewport={{ once: true }}
													transition={{ delay: 1, duration: .75 }}
												></motion.div>
												{topic?.recipes.map((item, index) => (
													<SwiperSlide key={index}>
														<motion.div className={`recipe-card-container-section ${topic?.recipes.length <= 2 &&"add-padding"}`}  >
															<RecipeCardHome Home
																homePage
																allRecipeData={item}
																cardName={item?.name}
																cardPrice={item?.price_range}
																cardServes={item?.serves}
																cardCookingTime={item?.cooking_time}
																cardPreparationTime={item?.preparation_time}
																cardSlug={item?.slug}
																cardImg={item?.image_desktop?.url}
																imgAlt={item.image_desktop?.name}
																index={index}
																mainProduct={item?.mainproduct?.name}
															/>
														</motion.div>
													</SwiperSlide>
												))}
												{
													<motion.div className={`${topic?.recipes.length <= 2 &&"d-none"}`}
														initial={{ opacity: 0 }}
														whileInView={{ opacity: 1 }}
														viewport={{ once: true }}
														transition={{ duration: .75, delay: 1.5 }}
													>
														<SwiperArrows />
													</motion.div>
												}
											</Swiper>
										</div>
									</TabPanel>
								))}
							</div>
						</Tabs>
					</div>
				</div>
			)
			}
		</>
	);
};

export default RecipesSection;
