import React, { useEffect, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Button from "../../common/Button/Button";
import { API_URL } from "../../api_baseURL";
import { motion } from "framer-motion";
import Image from "next/image";

const ClaimCardsSection = ({ labels, categorySlug }) => {
	const [isMobile, setMobile] = useState(false);
	const isMobileHandler = (e) => {
		setMobile(e.matches);
	};
	const [item, setItem] = useState();
	const [claimType, setClaimType] = useState(0);
	useEffect(() => {
		if (labels) {
			setItem(labels[claimType]);
		}
	}, [labels, claimType]);
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
				<>
					<div className="claims-cards-conatiner">
						<div className="claims-buttons-container">
							{labels?.map((item, index) => (
								<motion.div
								style={{display: categorySlug=="Pastires_Category" && index == 2 && "none"}}
									initial={{ opacity: 0,  }} whileInView={{ opacity: 1, }} viewport={{ once: true }} transition={{ duration: .75, delay: index==0?0:parseFloat(index / 10 + 0) }}
									className={` claim-button ${claimType == index && "active"}`}
									key={index}
									onClick={() => {
										setClaimType(index);
									}}
								>
									<Button type="normal" text={item.title}></Button>
								</motion.div>
							))}
						</div>
						<motion.div className={`claim-card ${categorySlug=="Pastires_Category" &&"category"}`}
						  initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .75, delay: 0.3 }}>
							<SwitchTransition mode="out-in">
								<CSSTransition
									classNames="fade"
									addEndListener={(node, done) => {
										node.addEventListener("transitionend", done, false);
									}}
									key={claimType}
								>
									<div className="card-body" >
											<div className="card-circle-container">
												<div className="big-img-container">
													<Image src={item?.icon && `${item?.icon?.url}`} alt={item?.icon.name} layout='fill' objectFit="contain" />
												</div>
												<div className="small-img-container">
													<img
														src="/img/image 19.png"
														className="small-img"
														alt="small-img" />
												</div>
											</div>
											<div className="dataContainer">
												<h1>{item?.title}</h1>
												<p>{item?.text}</p>
											</div>
									</div>
								</CSSTransition>
							</SwitchTransition>
						</motion.div>
					</div>
				</>
			) : (
				<div className="claims-cards-conatiner" style={{justifyContent: categorySlug=="Pastires_Category" && "flex-start", gap: categorySlug=="Pastires_Category" && '2.5rem'}}>
					{labels?.map((item, index) => (
						<motion.div className={`claim-card ${categorySlug=="Pastires_Category" &&"category"}`} style={{display: categorySlug=="Pastires_Category" && index == 2 && "none"}} key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .75, delay: index >= 0 && index < 4 && !isMobile ? parseFloat((index / 10) + 0.2) : 0.2 }}>
							<div className="card-body">
								<div className="card-circle-container">
									<div className="big-img-container">
										<Image src={item?.icon && `${item?.icon?.url}`} alt={item?.icon.name} layout='fill' objectFit="contain" />
									</div>
									<div className="small-img-container">
										<img
											src="/img/image 19.png"
											className="small-img"
											alt="small-img"
										/>
									</div>
								</div>
								<div className="dataContainer">
									<h1>{item?.title}</h1>
									<p>{item?.text}</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			)}
		</>
	);
};

export default ClaimCardsSection;
