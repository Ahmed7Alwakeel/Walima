import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Navigation, Pagination, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { BsFillBagFill } from "react-icons/bs";
import { ImWoman } from "react-icons/im";
import { IoMdAlarm } from "react-icons/io";
import { BiDish } from "react-icons/bi";
import SwiperArrows from "../../common/SwiperArrows/SwiperArrows";
import { motion } from "framer-motion";

const MissionSection = ({ missionData }) => {
	const [isMobile, setMobile] = useState(false);
	const { locale } = useRouter();
	const isMobileHandler = (e) => {
		setMobile(e.matches);
	};
	useEffect(() => {
		window
			.matchMedia(`(max-width : 1024px)`)
			.addEventListener("change", isMobileHandler);
		setMobile(window.matchMedia(`(max-width : 1024px)`).matches);
	}, []);
	return (
		<>
			<div className="about-mission-section">
				<div className="about-items">
					{isMobile ? (
						<>
							<div className="about-header">
								<motion.h1
									initial={{ opacity: 0, }}
									whileInView={{ opacity: 1, }}
									viewport={{ once: true }}
									transition={{ duration: .75, delay: 0 }}
								>
									{missionData?.header}
								</motion.h1>
								<motion.span
									initial={{ opacity: 0, }}
									whileInView={{ opacity: 1, }}
									viewport={{ once: true, }}
									transition={{ duration: .75, delay: 0.2 }}
								>
									{missionData?.text}
								</motion.span>
							</div>
							<div className="about-swiper">
								<Swiper
									key={missionData?.Values?.length}
									style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
									modules={[Navigation]}
									navigation={{
										nextEl: ".swiper-next",
										prevEl: ".swiper-prev",
									}}
									className="swiper-nav"
									slidesPerView={1.35}
									spaceBetween={15}
									breakpoints={{
										400: {
											slidesPerView: 1.35,
											spaceBetween: 30,
										},
										600: {
											slidesPerView: 2.25,
											spaceBetween: 15,
										},
										1023: {
											slidesPerView: 3,
											spaceBetween: 12,
										},
									}}
								>
									{missionData?.Values.map((item, index) => (
										<SwiperSlide key={index}>
											<motion.div
												className="mission-card-container"
												initial={{ opacity: 0, y: 50 }}
												whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .05 }}
												transition={{ duration: index <= 1 ? .75 : .5, delay: index <= 1 ? parseFloat((index / 10) + .2) : 0 }}
											>
												<div className="mission-card">
													<div className="icon-container">
														<img src={item.icon.url} alt={item.icon.name} />
													</div>
													<h1>{item.title}</h1>
													<p>{item.text}</p>
												</div>
											</motion.div>
										</SwiperSlide>
									))}
									<motion.div
										initial={{ opacity: 0, }}
										whileInView={{ opacity: 1, }}
										viewport={{ once: true }}
										transition={{ duration: .75, delay: 0.5 }}>

										<SwiperArrows />
									</motion.div>
								</Swiper>
							</div>
						</>
					) : (
						<>
							<div className="about-header">
								<motion.div className="about-head-text" initial={{ opacity: 0, }} whileInView={{ opacity: 1, }} viewport={{ once: true }} transition={{ duration: .75, delay: 0 }}>
									<h1>{missionData?.header}</h1>
								</motion.div>
								<motion.div className="about-head-description" initial={{ opacity: 0, }} whileInView={{ opacity: 1, }} viewport={{ once: true }} transition={{ duration: .75, delay: 0.4 }}>
									<span>{missionData?.text}</span>
								</motion.div>
							</div>
							<div className="about-swiper">
								<Swiper
									key={missionData?.Values?.length}
									style={{ direction: locale == "ar" ? "rtl" : "ltr" }}
									modules={[Navigation, Pagination, Mousewheel]}
									navigation={{
										nextEl: ".swiper-next",
										prevEl: ".swiper-prev",
									}}
									className="swiper-nav"
									breakpoints={{
										1024: {
											slidesPerView: 3.5,
											spaceBetween: 50,
										},
									}}
									pagination={{
										type: "progressbar",
										el: ".custom-about-pagination",
										clickable: true,
										renderBullet: (index, className) => {
											return '<span class="' + className + '">' + "</span>"
										},
									}}
								>
									<motion.div className='custom-about-pagination swiper-pagination-progressbar'
										initial={{ opacity: 0, }}
										whileInView={{ opacity: 1, }}
										viewport={{ once: true }}
										transition={{ delay: .5, duration: .75 }}
									></motion.div>
									{missionData?.Values.map((item, index) => (
										<SwiperSlide key={index}>
											<motion.div
												className="mission-card-container"
												initial={{ opacity: 0, y: 50 }}
												whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .05 }}
												transition={{ duration: index <= 3 ? .75 : .5, delay: index <= 3 ? parseFloat((index / 10) + .2) : 0 }}>
												<div className="mission-card">
													<div className="icon-container">
														<img src={item.icon.url} alt={item.icon.name} />
													</div>
													<div>
														<h1>{item.title}</h1>
														<p>{item.text}</p>
													</div>
												</div>
											</motion.div>
										</SwiperSlide>
									))}
									<motion.div
										initial={{ opacity: 0, }}
										whileInView={{ opacity: 1, }}
										viewport={{ once: true }}
										transition={{
											duration: .75,
											delay: 1
										}}
									>
										<SwiperArrows />
									</motion.div>
								</Swiper>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default MissionSection;
