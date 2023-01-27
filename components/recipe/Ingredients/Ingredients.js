import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SwiperArrows from "../../common/SwiperArrows/SwiperArrows";
import { Navigation, Pagination, EffectFade, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";
const Ingredients = ({ recipeIngredients, products }) => {
	let { t } = useTranslation("common");
	const { locale } = useRouter();
	const [test, setTest] = useState();
	const [swiper, setSwiper] = useState();
	const [productSlug, setProductSlug] = useState();
	const [slugsArr, setSlugsArr] = useState([]);
	const slugs = [];
	const [isMobile, setMobile] = useState(false);
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
	// useEffect(()=>{
	//     products?.map((product)=> {
	//         slugs.push(product.slug);
	//         setSlugsArr(slugs);
	//       })
	// },[])
	return (
		<div className="recipe-details-ingredients-section">
			{isMobile&&
			<div className="card-container">
			<motion.div className="ingredients-card"
			initial={{ opacity: 0, }}
			whileInView={{ opacity: 1,  }}
			viewport={{ once: true, }}
			transition={{delay: .2,duration: .1,}}
			>
				<div className="header">
					<h1>{t("recipe_details_page.cook_with")}</h1>
				</div>
				<div className="card-arrow-container">
					<img alt="icon" src="/img/recipes/recipeDetails/arrow.png" />
				</div>
				<div className="card-swiper">
					<Swiper
						modules={[Navigation, Pagination, EffectFade]}
						fadeEffect={{
							crossFade: true,
						}}
						effect="fade"
						// key={Math.random()}
						style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
						navigation={{
							nextEl: ".swiper-next",
							prevEl: ".swiper-prev",
						}}
						className="swiper-nav"
						slidesPerView={1}
					//   onSlideChange={(swiper)=> {
					//     setProductSlug(slugsArr[swiper.activeIndex])
					//   }}
					>
						{products?.map((item, index) => (
							<SwiperSlide key={index}>
								<div className="img-card-container">
									<img alt="icon" src={item?.image_mobile[0]?.url} />
									{/* <img alt="icon" src="/img/recipes/recipeDetails/SUN002_WALIMA_Puff Pastry_3D 1.png" /> */}
								</div>
							</SwiperSlide>
						))}
						<div className={`${products?.length==1&&"d-none"}`}>
						<SwiperArrows />
						</div>
					</Swiper>
				</div>
			</motion.div>
			</div>
			}
			<motion.h1
				className="header"
				initial={{ opacity: 0, y: -10 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, }}
				transition={{
					delay: .5,
					duration: 1,
				}}
			>
				{t("recipe_details_page.ingredients")}
			</motion.h1>
			{recipeIngredients?.map((item, index) => (
				<motion.div
					className="ingredients"
					key={index}
					initial={{ opacity: 0,  }}
					whileInView={{ opacity: 1,  }}
					viewport={{ once: true }}
					transition={{
						delay: parseFloat(index/10 + 0.5),
						duration: 1
					}}
				>
					<div className="check-box">
						<img alt="icon" src="/img/recipes/recipeDetails/Vector.png" />
					</div>
					<span>{item.text}</span>
				</motion.div>
			))}
			{!isMobile&&
			<motion.div className="ingredients-card-desktop d-lg-block d-none"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                delay: 0.25,
                duration: 1,
            }}>
				<div className="header">
					<h1>{t("recipe_details_page.cook_with")}</h1>
				</div>
				<div className="card-arrow-container">
					<img alt="icon" src="/img/recipes/recipeDetails/arrow.png" />
				</div>
				<div className="card-swiper">
					<Swiper
						modules={[Navigation, Pagination, EffectFade,Mousewheel]}
						fadeEffect={{
							crossFade: true,
						}}
						effect="fade"
						// key={Math.random()}
						 

						style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
						navigation={{
							nextEl: ".swiper-next",
							prevEl: ".swiper-prev",
						}}
						className="swiper-nav"
						slidesPerView={1}
						// onSwiper={(swiper => {
						//     setSwiper(swiper)
						//   })}
						//   onSlideChangeTransitionEnd={(swiper)=> {
						//     setProductSlug(slugsArr[swiper.activeIndex])
						//   }}
					>
						{products?.map((item, index) => (
							<SwiperSlide key={index}>
								<div className="img-card-container">
									<img alt="icon" src={item.image_desktop.url} />
									{/* <img alt="icon" src="/img/recipes/recipeDetails/SUN002_WALIMA_Puff Pastry_3D 1.png" /> */}
								</div>
							</SwiperSlide>
						))}
					<div className={`${products?.length==1&&"d-none"}`}>
						<SwiperArrows />
						</div>
					</Swiper>
				</div>
			</motion.div> 
			}
			
		</div>
	);
};

export default Ingredients;
