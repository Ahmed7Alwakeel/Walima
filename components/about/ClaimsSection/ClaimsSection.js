import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// import Link from 'next/link';
import ClaimCardsSection from "../../common/ClaimCardsSection/ClaimCardsSection";
import { motion } from "framer-motion";

const  ClaimsSection = ({ claimsData, productCategory, aboutPage, categorySlug }) => {
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
		<>
			<div className={`${aboutPage && 'background-white'} about-calims-section ${productCategory&&"pt-2"}`}>
				<div className="claims-section-header">
					
					<div className="header-container">
						<motion.h1 initial={{ opacity: 0,  }} whileInView={{ opacity: 1,  }} viewport={{ once: true }} transition={{ duration: .75, delay: 0.1 }}>{claimsData?.header}</motion.h1>
						{/* <motion.span initial={{ opacity: 0, }} whileInView={{ opacity: 1, }} viewport={{ once: true }} transition={{ duration: .75, delay: productCategory ? 3.5 : 0.2 }}>{claimsData?.text} </motion.span> */}
					</div>
				</div>
				<ClaimCardsSection  labels={claimsData?.Labels} categorySlug={categorySlug}/>
			</div>
		</>
	);
};

export default ClaimsSection;
