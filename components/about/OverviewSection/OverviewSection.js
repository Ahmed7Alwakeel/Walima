import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "../../common/Button/Button";
import Link from "next/link";
import { API_URL } from "../../api_baseURL";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";
import { useAnimationContext } from "../../context/animationContext";
import Image from "next/image";

const OverviewSection = ({ overviewData }) => {
	const { menuOpened } = useAnimationContext();
	const [isMobile, setMobile] = useState(false);
	const { t } = useTranslation("common");
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
		<>
			<div className="about-overview-section">
				<div className={`insideLyr ${menuOpened ? "whileMenuOpening" : ""}`}>
					<div className="overview-section-header">
						<div className="header-container">
							<motion.h1
								initial={{ opacity: 0, y: -20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.75 }}
							>
								{overviewData?.main_header}
							</motion.h1>
							<motion.p
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.75, delay: 0.5 }}
							>
								{overviewData?.main_text}{" "}
							</motion.p>
						</div>
					</div>
					<div className="circles-container">
						<div className="img-conatiner">
							{
								<>
									<motion.div
										className="big-img-container"
										initial={{ opacity: 0, y: -20 }}
										whileInView={{
											opacity: 1,
											y: 0,
											scaleX: locale == "ar" && "-1",
										}}
										viewport={{ once: true }}
										transition={{ duration: 0.75, delay: 0.9 }}
									>
										<Image
											layout="fill"
											objectFit="cover"
											priority
											src={
												overviewData?.main_image &&
												`${overviewData?.main_image?.url}`
											}
											className="big-img"
											alt={overviewData?.main_image.name}
										/>
									</motion.div>
									<motion.div
										className="small-img-container"
										initial={{ opacity: 0, y: -20 }}
										whileInView={{
											opacity: 1,
											y: 0,
											scaleX: locale == "ar" && "-1",
										}}
										viewport={{ once: true }}
										transition={{ duration: 0.75, delay: 0.9 }}
									>
										<Image
											layout="fill"
											objectFit="contain"
											priority
											src={
												overviewData?.sub_image &&
												`${overviewData?.sub_image?.url}`
											}
											className="small-img"
											alt={overviewData?.sub_image.name}
										/>
									</motion.div>
									<motion.div
										className="green-circle small1"
										initial={{ opacity: 0, y: -20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.75, delay: 1 }}
									></motion.div>
									<motion.div
										className="green-circle small2"
										initial={{ opacity: 0, y: -20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.75, delay: 1.1 }}
									></motion.div>
									<motion.div
										className="green-circle medium1"
										initial={{ opacity: 0, y: 10 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.75, delay: 1.2 }}
									></motion.div>
									<motion.div
										className="green-circle small3"
										initial={{ opacity: 0, y: -20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.75, delay: 1.1 }}
									></motion.div>
									<motion.div
										className="green-circle small4"
										initial={{ opacity: 0, y: 10 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.75, delay: 1.1 }}
									></motion.div>
									<motion.div
										className="green-circle small5"
										initial={{ opacity: 0, y: -20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.75, delay: 1 }}
									></motion.div>
								</>
							}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default OverviewSection;
