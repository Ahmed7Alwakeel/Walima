import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Navigation, Pagination,Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Link from "next/link";
import Button from "../../common/Button/Button";
import ProductCard from "../../common/ProductCard/ProductCard";
import SwiperArrows from "../../common/SwiperArrows/SwiperArrows";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useTranslation } from "next-i18next"
import { motion } from 'framer-motion';
const ProductsSection = ({ title, bg, productsData }) => {
	let { t } = useTranslation("common")
	const [isMobile, setMobile] = useState(false);
	const { locale } = useRouter();
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
		<div className={`details-products-section-all ${bg && "white"} ${productsData?.length==1&&isMobile&&"remove-padding"} ${productsData?.length<4&&!isMobile&&"remove-padding"}`}>
			<motion.div className="products-section-header"
				initial={{ opacity: 0, y: -20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ delay: 0, duration: .75 }}
			>
				{isMobile ? (
					<motion.h1 initial={{ opacity: 0, y: -10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{
							delay: 0,
							duration: .75,
						}}>{title}</motion.h1>
				) : (
					<>
						<motion.h1 initial={{ opacity: 0, y: -10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.2 }}
							transition={{
								delay: 0,
								duration: .75,
							}}>{title}</motion.h1>
						<Link href={`/${locale}/products`} style={{ cursor: "pointer" }} passHref>
							<motion.div
								onClick={() => { window.scrollTo(0, 0) }}
								className="product-button
							button-animation button button--wayra button--border-thin button--round-s"
								initial={{ opacity: 0, }}
								whileInView={{ opacity: 1, }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{
									delay: 0.2,
									duration: .75,
								}}>
								<Button animate type="normal" text={`${t("productsPage.see_all_products")}`}></Button>
							</motion.div>
						</Link>
					</>
				)}
			</motion.div>
			<div className={`product-swiper`}>
				{isMobile ? (
					<Swiper
						key={productsData?.length + 'mob'}
						style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
						modules={[Navigation]}
						navigation={{
							nextEl: ".swiper-next",
							prevEl: ".swiper-prev",
						}}
						className="swiper-nav"
						centeredSlides={productsData?.length==1?true:false}
						slidesPerView={1.25}
						spaceBetween={15}
						breakpoints={{
							400: {
								slidesPerView: 1.35,
								spaceBetween: 20,
							},
							600: {
								slidesPerView: 2.5,
								spaceBetween: 20,
							},
							1023: {
								slidesPerView: 3,
								spaceBetween: 12,
							},
						}}
					>
						{productsData?.sort((a, b) => a.order - b.order).map((item, index) => (
							<SwiperSlide key={index}>
								<motion.div className={`product-card-container-section`}
								initial={{ opacity: 0, y: index<=1?50:0 }}
								whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .05 }}
								transition={{ duration: index<=1?.75:.5, delay: index<=1?parseFloat((index / 10) + .2):0 }}
								>
									<ProductCard
										cardImg={item?.image_mobile[0]?.url}
										cardTime={item.reading_time}
										cardText={item.name}
										// cardDescription={item.description}
										cardDescription={item.small_description}
										cardSlug={item.slug}
										cardIngredients={item.ingredients}
										cardNutrition={item.nutrition_facts}
										imgAlt={item?.image_mobile?.name}
										allProductData={item}
									/>
								</motion.div>
							</SwiperSlide>
						))}
						<motion.div className={`${productsData?.length <= 1 && 'd-none'}`}
							initial={{ opacity: 0, }}
							whileInView={{ opacity: 1, }}
							viewport={{ once: true }}
							transition={{ delay: .2, duration: .75 }}
						>
							<SwiperArrows />
						</motion.div>
					</Swiper>
				) : (
					<Swiper
						style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
						key={productsData?.length + 'desk'}
						modules={[Navigation, Pagination,Mousewheel]}
						navigation={{
							// nextEl: '.swiper-next',
							nextEl: ".like-section-nav-next",
							// prevEl: '.swiper-prev',
							prevEl: ".like-section-nav-prev",
						}}
						className="swiper-nav"
						slidesPerView={3}
						// spaceBetween={30}
						breakpoints={{
							1024: {
								slidesPerView: 3.5,
								spaceBetween: 20,
							},
							1600: {
								slidesPerView: 3.75,
								spaceBetween: 50
							},
							1900: {
								slidesPerView: 4,
								spaceBetween: 50
							},
						}}
						pagination={{
							type: "progressbar",
							el: ".product-section-pagination",
							clickable: true,
							renderBullet: (index, className) => {
								return '<span class="' + className + '">' + "</span>"
							},
						}}
					>
						<motion.div className='product-section-pagination swiper-pagination-progressbar'
							initial={{ opacity: 0, }}
							whileInView={{ opacity: 1, }}
							viewport={{ once: true }}
							transition={{ delay: .5, duration: .75 }}
						></motion.div>
						{productsData?.sort((a, b) => a.order - b.order).map((item, index) => (
							<SwiperSlide key={index}>
								<motion.div className="product-card-container-section"

									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }}
									transition={{ duration: .75, delay: index >= 0 && index < 4 && !isMobile ? parseFloat((index / 10) + 0.2) : 0.1 }}
								>
									<ProductCard
										cardImg={item?.image_desktop?.url}
										cardTime={item.reading_time}
										cardText={item.name}
										// cardDescription={item.description}
										cardDescription={item.small_description}
										cardSlug={item.slug}
										cardIngredients={item.ingredients}
										cardNutrition={item.nutrition_facts}
										imgAlt={item?.image_mobile?.name}
										allProductData={item}
									/>
								</motion.div>
							</SwiperSlide>
						))}
						{/* <SwiperArrows /> */}
						<motion.div className={`swiper-arrows-container swiper-nav swiper-recipe-section swiper-main-section ${productsData?.length <= 3 ? 'd-none' : ''}`}
							initial={{ opacity: 0, }}
							whileInView={{ opacity: 1, }}
							viewport={{ once: true, amount: 0.2 }}
							transition={{
								delay: 1,
								duration: 0.75,
							}}>
							<div className="swiper-button like-section-nav-prev">
								{locale == "ar" ? (
									<AiOutlineArrowRight />
								) : (
									<AiOutlineArrowLeft />
								)}
							</div>
							<div className="swiper-button like-section-nav-next">
								{locale == "en" ? (
									<AiOutlineArrowRight />
								) : (
									<AiOutlineArrowLeft />
								)}
							</div>
						</motion.div>
					</Swiper>
				)}
			</div>
			{isMobile ? (
				<Link href={`/${locale}/products`} style={{ cursor: "pointer" }} passHref>
					<motion.div
						onClick={() => { window.scrollTo(0, 0) }}
						className="product-button"
						initial={{ opacity: 0, }}
						whileInView={{ opacity: 1, }}
						viewport={{ once: true }}
						transition={{ delay: .5, duration: .75 }}
					>
						<Button type="normal" text={`${t("productsPage.see_all_products")}`}></Button>
					</motion.div>
				</Link>
			) : (
				""
			)}
		</div>
	);
};

export default ProductsSection;
