import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Navigation, Pagination, EffectFade,Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import SwiperArrows from "../../common/SwiperArrows/SwiperArrows";
import { API_URL } from "../../api_baseURL";
import { useTranslation } from "next-i18next";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useAnimationContext } from "../../context/animationContext";
import { motion } from "framer-motion";
import Image from "next/image";
const OverviewSection = ({ products, pageData }) => {
	let { t } = useTranslation("common");
	const { locale, locales, defaultLocale, asPath, pathname } = useRouter();
	const [isMobile, setMobile] = useState(false);
	const { menuOpened } = useAnimationContext();
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
		<div className="products-page-overview-section">
			<div className="lyr">
				{isMobile ? (
					<div className="header-container">
						<motion.h1
							initial={{ opacity: 0, y: -20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0, duration: .75 }}
						>{pageData?.MainProductSection.header}</motion.h1>
						<motion.span
							initial={{ opacity: 0, }}
							whileInView={{ opacity: 1, }}
							viewport={{ once: true }}
							transition={{ delay: 0.3, duration: .75 }}
						>{pageData?.MainProductSection.description}</motion.span>
						<div className="img-container">
							<Swiper
								// key={products[0].id}
								key={products[0]?.main_image?.url}
								style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
								modules={[Navigation, EffectFade]}
								navigation={{
									nextEl: '.swiper-next-prod-overview',
									prevEl: '.swiper-prev-prod-overview',
								}}
								slidesPerView={1}
								spaceBetween={15}
								breakpoints={{
									768: {
										slidesPerView: 2.5,
										spaceBetween: 50,
									},
								}}
							>
								{products?.sort((a, b) => a.order - b.order).map((item, index) => (
									<SwiperSlide key={index}>
										<motion.div className="big-img-container" initial={{ opacity: 0, }} whileInView={{ opacity: 1, }} viewport={{ once: true }} transition={{ duration: .5, delay: index ==0  ? parseFloat((index / 10) + 0.5) : 0.1 }}>
											{/* <img  src={item} className="big-img" alt="product" /> */}
											{/* <img src={item?.main_image?.url} className="big-img" alt={item?.main_image?.name} /> */}
											<Image src={item?.main_image?.url} className="big-img" alt={item?.main_image?.name} layout='fill' priority quality={100} />
										</motion.div>
									</SwiperSlide>
								))}
							</Swiper>
							<motion.div className="swiper-arrows-container swiper-products-overview-section"
								initial={{ opacity: 0, }}
								whileInView={{ opacity: 1, }}
								viewport={{ once: true }}
								transition={{ delay: 1, duration: .75 }}
							>
								<div className="swiper-button  swiper-prev-prod-overview">
									{locale == "ar" ? (
										<AiOutlineArrowRight />
									) : (
										<AiOutlineArrowLeft />
									)}
								</div>
								<div className="swiper-button swiper-next-prod-overview">
									{locale == "en" ? (
										<AiOutlineArrowRight />
									) : (
										<AiOutlineArrowLeft />
									)}
								</div>
							</motion.div>
						</div>
						<div className="img-circle-container-mobile">
							{pageData?.MainProductSection.Claims.map((item, index) => (
								// <img alt="icon" key={index} src={`${API_URL}${item.image.url}`} alt={`${item.image.name}`} />
								// <img alt="icon" key="" src="/img/image16.png" alt="item" />
								<motion.div className="single-img" key={index}
									initial={{ opacity: 0, }}
									whileInView={{ opacity: 1, }}
									viewport={{ once: true }}
									transition={{ delay: index <= 1 ? parseFloat((index / 10) + 0.7) : .1, duration: .75 }}
								>
									{<img alt="icon" src={item.image.url}></img>}
								</motion.div>
							))}
						</div>
					</div>
				) : (
					<>
						<div className={`insideLyr text-align-center align-items-center ${menuOpened ? 'whileMenuOpening' : ''}`}>
							<div className="header-container">
								<motion.h1
									initial={{ opacity: 0, y: -20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: 0, duration: .75 }}
								>
									{pageData?.MainProductSection.header}
								</motion.h1>
								<motion.p
									initial={{ opacity: 0, }}
									whileInView={{ opacity: 1, }}
									viewport={{ once: true }}
									transition={{ delay: .2, duration: .75 }}
								>{pageData?.MainProductSection.description}</motion.p>
								<div className="img-circle-container">
									{pageData?.MainProductSection.Claims.map((item, index) => (
										<motion.div className="single-img" key={index}
											initial={{ opacity: 0, }}
											whileInView={{ opacity: 1, }}
											viewport={{ once: true }}
											transition={{ delay: index == 0 ? .5 : .5 + (index / 10), duration: .75 }}
										>
											{<img alt="icon" src={item.image.url}></img>}
										</motion.div>
									))}
								</div>
							</div>
							<div className="img-container">
								<Swiper
									// key={Math.random()}
									style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
									className="swiper-nav"
									modules={[Navigation, EffectFade,Mousewheel]}
									navigation={{
										nextEl: '.swiper-next-prod-overview',
										prevEl: '.swiper-prev-prod-overview',
									}}
									breakpoints={{
										1024: {
											slidesPerView: 1,
											spaceBetween: 15,
										},
									}}
								>
									{products?.sort((a, b) => a.order - b.order).map((item, index) => (
										<SwiperSlide key={index}>
											<motion.div className="big-img-container"
												initial={{ opacity: 0, }}
												whileInView={{ opacity: 1, }} viewport={{ once: true }}
												transition={{ duration: .75, delay: index == 0 ? parseFloat((index / 10) + 0.7) : 0.2 }}>
												{/* <img  src={item} className="big-img" alt="item" /> */}
												{/* <img src={item?.main_image?.url} className="big-img" alt={item?.main_image?.name} /> */}
												<Image src={item?.main_image?.url} className="big-img" alt={item?.main_image?.name} layout='fill' priority quality={100} objectFit='contain' />
											</motion.div>
										</SwiperSlide>
									))}
								</Swiper>
								<motion.div className="swiper-arrows-container swiper-products-overview-section"
									initial={{ opacity: 0, }}
									whileInView={{ opacity: 1, }}
									viewport={{ once: true }}
									transition={{ delay: 1, duration: .75 }}
								>
									<div className="swiper-button  swiper-prev-prod-overview">
										{locale == "ar" ? (
											<AiOutlineArrowRight />
										) : (
											<AiOutlineArrowLeft />
										)}
									</div>
									<div className="swiper-button swiper-next-prod-overview">
										{locale == "en" ? (
											<AiOutlineArrowRight />
										) : (
											<AiOutlineArrowLeft />
										)}
									</div>
								</motion.div>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default OverviewSection;
