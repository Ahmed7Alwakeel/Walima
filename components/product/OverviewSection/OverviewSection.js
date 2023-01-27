import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	ChakraProvider,
	Box,
} from "@chakra-ui/react";
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

import { useTranslation } from "next-i18next";
import { useAnimationContext } from "../../context/animationContext";
import { motion } from 'framer-motion';
import Image from "next/image";
const OverviewSection = ({
	productName,
	productDescription,
	productIngredients,
	productImg,
	productNutrition,
	ImgAlt,
	productCategory
}) => {
	let { t } = useTranslation("common");
	const { locale, locales, defaultLocale, asPath, pathname } = useRouter();
	const { menuOpened } = useAnimationContext();
	const [expanded, setExpanded] = useState(0)
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
	let claimsArr = [0, 1, 2]
	return (
		<div className="product-detail-overview-section">
			<div className="lyr">
				{isMobile ? (
					<>
						<div className="header-container">
							{/* <span>
								<Link href={`/${locale}/products`}>{`${t(
									"head.products"
								)}`}</Link>
							</span> */}
							<motion.h1
								initial={{ opacity: 0, y: -20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0, duration: .75 }}
							>{productName}</motion.h1>
							<motion.div className="big-img-container"
								initial={{ opacity: 0, }}
								whileInView={{ opacity: 1, }}
								viewport={{ once: true }}
								transition={{ delay: 0.5, duration: .75 }}
							>
								<img src={productImg} alt={ImgAlt} />
							</motion.div>
						</div>
						<div className="details ">
							<ChakraProvider resetCSS={false}>
								<Accordion allowToggle
									defaultIndex={0}
									onChange={(expandedIndex) => {
										setExpanded(expandedIndex)
									}}
								>
									<motion.div
										initial={{ opacity: 0, }}
										whileInView={{ opacity: 1, }}
										viewport={{ once: true }}
										transition={{ delay: 1, duration: .75 }}>
										<AccordionItem className={`${expanded == 0 && "expanded"}`} is>
											{({ isExpanded }) => (
												<>
													<h2 className={`cardAnimation `}>
														<AccordionButton>
															<Box flex="1" textAlign="start">
																{`${t("product_details_page.desc")}`}
															</Box>
															{isExpanded ? (
																<AiOutlineMinus className="icon" size={20} />
															) : (
																<AiOutlinePlus className='icon' size={20} />
															)}
														</AccordionButton>
													</h2>
													<AccordionPanel pb={4}>
														{productDescription}
													</AccordionPanel>
												</>
											)}
										</AccordionItem>
									</motion.div>
									{productCategory?.slug != 'Spices_Category' && <motion.div
										initial={{ opacity: 0, }}
										whileInView={{ opacity: 1, }}
										viewport={{ once: true }}
										transition={{ delay: .3, duration: .75 }}>
										<AccordionItem className={`${expanded == 1 && "expanded"}`} is>
											{({ isExpanded }) => (
												<>
													<h2
														className={`cardAnimation `}
														style={{ transitionDelay: "0.73s" }}
													>
														<AccordionButton>
															<Box flex="1" textAlign="start">
																{`${t(
																	"product_details_page.nutrition_facts"
																)}`}
															</Box>
															{isExpanded ? (
																<AiOutlineMinus className="icon" size={20} />
															) : (
																<AiOutlinePlus className='icon' size={20} />
															)}
														</AccordionButton>
													</h2>
													<AccordionPanel pb={4} className={'image-section'}>
														<div className="nutrition-img-container">
														<Image layout="fill" src={productNutrition} alt="productNutrition" quality={75} priority/>
															{/* <img src={productNutrition} alt="productNutrition" /> */}
														</div>
													</AccordionPanel>
												</>
											)}
										</AccordionItem>
									</motion.div>}
								</Accordion>
							</ChakraProvider>
						</div>
						<div className="img-circle-container">
							{claimsArr.map((item, index) => (
								<motion.div className="single-img" key={index}
									style={{ display: productCategory?.slug == "Pastires_Category" && index == 0 && "none" }}
									initial={{ opacity: 0, }}
									whileInView={{ opacity: 1, }}
									viewport={{ once: true }}
									transition={{ delay: .2 + (index / 10), duration: .75 }}
								>
									{/* {index == 0 && <img alt="preservantives.png" src='/img/claims/preservantives.png'></img>}
									{index == 1 && productCategory?.slug != "seafood_category" && <img alt="icon" src='/img/claims/gmo.png'></img>}
									{index == 1 && productCategory?.slug == "seafood_category" && <img alt="af.png" src='/img/claims/af.png' />}				
									{index == 2 && <img alt="artificial.png" src='/img/claims/artificial.png'></img>} */}
									{index == 0 && <Image layout="fill" alt="preservantives.png" src='/img/claims/preservantives.png' />}
									{index == 1 && productCategory?.slug != "seafood_category" && <Image layout="fill" alt="icon" src='/img/claims/gmo.png' />}
									{index == 1 && productCategory?.slug == "seafood_category" && <Image layout="fill" alt="af.png" src='/img/claims/af.png' />}				
									{index == 2 && <Image layout="fill" alt="artificial.png" src='/img/claims/artificial.png' />}
								</motion.div>
							))}
						</div>
					</>
				) : (
					<>
						<div className={`insideLyr ${menuOpened ? 'whileMenuOpening' : ''}`}>
							<div className="header-container">
								<div className="header-section">
									<motion.h1
										initial={{ opacity: 0, y: -20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ delay: 0, duration: .75 }}
									>{productName}</motion.h1>
									<div className="details ">
										<ChakraProvider resetCSS={false}>
											<Accordion allowToggle defaultIndex={0}
												onChange={(expandedIndex) => {
													setExpanded(expandedIndex)
												}}

											>
												<motion.div
													initial={{ opacity: 0, }}
													whileInView={{ opacity: 1, }}
													viewport={{ once: true }}
													transition={{ delay: 0.5, duration: .75 }}>
													<AccordionItem className={`${expanded == 0 && "expanded"}`}
														is>
														{({ isExpanded }) => (
															<>
																<h2 className={`cardAnimation `}>
																	<AccordionButton>
																		<Box flex="1" textAlign="start">
																			{`${t("product_details_page.desc")}`}
																		</Box>
																		{isExpanded ? (
																			<AiOutlineMinus className="icon" size={20} />
																		) : (
																			<AiOutlinePlus className='icon' size={20} />
																		)}
																	</AccordionButton>
																</h2>
																<AccordionPanel pb={4}>
																	{productDescription}
																</AccordionPanel>
															</>
														)}
													</AccordionItem>
												</motion.div>
												{productCategory?.slug != "Spices_Category" && <motion.div
													initial={{ opacity: 0, }}
													whileInView={{ opacity: 1, }}
													viewport={{ once: true }}
													transition={{ delay: .8, duration: .75 }}>
													<AccordionItem
														className={`${expanded == 1 && "expanded"}`}
														initial={{ opacity: 0, y: -20 }}
														whileInView={{ opacity: 1, y: 0 }}
														viewport={{ once: true }}
														transition={{ delay: .8, duration: .75 }}>
														{({ isExpanded }) => (
															<>
																<h2
																	className={`cardAnimation `}
																	style={{ transitionDelay: "0.73s" }}
																>
																	<AccordionButton>
																		<Box flex="1" textAlign="start">
																			{`${t(
																				"product_details_page.nutrition_facts"
																			)}`}
																		</Box>
																		{isExpanded ? (
																			<AiOutlineMinus className="icon" size={20} />
																		) : (
																			<AiOutlinePlus className='icon' size={20} />
																		)}
																	</AccordionButton>
																</h2>
																<AccordionPanel pb={4}>
																	<div className="nutrition-img-container">
																		{/* <img src={productNutrition} alt="productNutrition" /> */}
																		<Image layout="fill" src={productNutrition} alt="productNutrition" quality={100} priority/>
																	</div>
																</AccordionPanel>
															</>
														)}
													</AccordionItem>
												</motion.div>}
											</Accordion>
										</ChakraProvider>
									</div>
									<div className="img-circle-container">
										{claimsArr.map((item, index) => (
											<motion.div className="single-img" key={index}
												style={{ display: productCategory?.slug == "Pastires_Category" && index == 0 && "none" }}
												initial={{ opacity: 0, }}
												whileInView={{ opacity: 1, }}
												viewport={{ once: true }}
												transition={{ delay: index == 0 ? 1.3 : 1.3 + (index / 10), duration: .75 }}
											>
												{/* {index == 0 && <img alt="icon" src='/img/claims/preservantives.png'></img>}
												{index == 1 && productCategory?.slug != "seafood_category" && <img alt="icon" src='/img/claims/gmo.png'></img>}
												{index == 1 && productCategory?.slug == "seafood_category" && <img alt="af.png" src='/img/claims/af.png' />}
												{index == 2 && <img alt="icon" src='/img/claims/artificial.png'></img>} */}
												{index == 0 && <Image layout="fill" alt="preservantives.png" src='/img/claims/preservantives.png' />}
									{index == 1 && productCategory?.slug != "seafood_category" && <Image layout="fill" alt="icon" src='/img/claims/gmo.png' />}
									{index == 1 && productCategory?.slug == "seafood_category" && <Image layout="fill" alt="af.png" src='/img/claims/af.png' />}				
									{index == 2 && <Image layout="fill" alt="artificial.png" src='/img/claims/artificial.png' />}
											</motion.div>
										))}
									</div>
								</div>
							</div>
							<div className="img-container">
								<motion.div className="big-img-container"
									initial={{ opacity: 0, }}
									whileInView={{ opacity: 1, }}
									viewport={{ once: true }}
									transition={{ delay: 2, duration: .75 }}>
									<img src={productImg} alt={ImgAlt} />
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
