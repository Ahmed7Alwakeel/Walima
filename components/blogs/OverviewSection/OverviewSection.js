import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import BlogCard from "../../common/BlogCard/BlogCard";
import TipsItems from "../../common/TipsItems/TipsItems";
import { useTranslation } from "next-i18next";
import { motion } from 'framer-motion';
import { useAnimationContext } from "../../context/animationContext";
const OverviewSection = ({ mainBlogs, mainTitle, topics, blogPage }) => {
	const { menuOpened } = useAnimationContext();
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
			{isMobile ? (
				<div className="blogs-overview-mobile">
					<div className="overview-header">
						{/* <span>
							<Link href={`/${locale}/`} style={{ cursor: 'pointer' }}>{`${t("head.home")} / `}</Link>
								<Link href={``}>{t("head.blogs")}</Link>
							</span> */}
						<motion.h1
							initial={{ opacity: 0, y: -10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0  , duration: .75 }}>{mainTitle}</motion.h1>
					</div>
					<div className="card-container">
						{mainBlogs?.blogs.map((item, index) => (
							<div className="overview-card" 
							
							initial={{ opacity: 0,y:50  }}
							whileInView={{ opacity: 1,y:0 }}
							viewport={{ once: true,amount:0.5 }}
							transition={{ duration: 1, delay: .5 }}
							key={index}>
								<BlogCard
								
									cardImg={item.image_slider[0].url}
									imgAlt={item.image_slider[0].name}
									cardTime={item.reading_time}
									cardText={item.title}
									cardDescription={item.description}
									cardTag={item.topic}
									topics={topics}
									cardSlug={item.slug}
									allBlogData={item}
								/>
							</div>
						))}
					</div>
				</div>

			) : (
				<div className="blogs-overview-desktop">
					<div className={`insideLyr ${menuOpened ? 'whileMenuOpening' : ''}`}>
						<motion.div className="overview-header"
						initial={{ opacity: 0, y: -20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0, duration: .75 }}
						>
							{/* <span>
									<Link href={`/${locale}/`} style={{ cursor: 'pointer' }}>{`${t("head.home")} / `}</Link>
										<Link href={``}>{t("head.blogs")}</Link>
									</span> */}
							<h1>{mainTitle}</h1>
						</motion.div>
						<TipsItems blogPage={blogPage} mainBlogs={mainBlogs} topics={topics} />
					</div>
				</div>
			)}
		</>
	);
};

export default OverviewSection;
