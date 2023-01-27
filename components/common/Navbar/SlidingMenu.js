import { useState, useEffect, Context } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Hamburger, { Fade } from "hamburger-react";
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	ChakraProvider,
	Box,
} from "@chakra-ui/react";
import LangSwitcher from "../langSwitcher/LangSwitcher";
import { BiUserCircle } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
import { useAuth } from "../../context/authContext";
import { FiLogOut } from "react-icons/fi";
import { useTranslation } from "next-i18next";
import SearchSection from "./SearchSection";
import { getData, API_URL } from "../../api_baseURL";
import { useQuery } from "react-query";
import { useAnimationContext } from "../../context/animationContext";
const SlidingMenu = ({ setMenu, isMenuOpened, categoriesData }) => {
	let { t } = useTranslation("common");
	const { asPath } = useRouter();
	const { isAuthenticated, logout } = useAuth();
	const page = "about";
	const { locale } = useRouter();
	const { data, isSuccess } = useQuery(["about", locale], () =>
		getData(locale, page)
	);
	const [isMobile, setMobile] = useState(false);
	const [qualityData, setQualityData] = useState();
	const { menuOpened, setMenuOpened } = useAnimationContext();
	useEffect(() => {
		if (isSuccess) {
			setQualityData(data?.CleanLabelClaims.Labels);
		}
	}, [data, isSuccess]);
	const isMobileHandler = (e) => {
		setMobile(e.matches);
	};
	useEffect(() => {
		window
			.matchMedia(`(max-width : 1024px)`)
			.addEventListener("change", isMobileHandler);
		setMobile(window.matchMedia(`(max-width : 1024px)`).matches);
	}, []);

	const [accordionIndex, setAccordionIndex] = useState();
	const [allowOnce, setAllowOnce] = useState(false);

	const handleMenu = () => {
		window.document.body.classList.remove("no-scroll");
		setMenu(false);
		setMenuOpened(false);
		setAccordionIndex(-1);
		setAllowOnce(false);
	};
	const variants = {
		open: {
			transition: { staggerChildren: 0.07, delayChildren: 0.2 },
		},
		closed: {
			transition: { staggerChildren: 0.05, staggerDirection: -1 },
		},
	};
	const router = useRouter();
	const Arrows = () => {
		return (
			<>
				<div className="arrow-container second-arrow">
					<BsArrowRight className="rotate" />
				</div>
				<div className="arrow-container first-arrow">
					<BsArrowRight className="rotate" />
				</div>
			</>
		);
	};
	return (
		<>
			<div className="slide-container">
				<div className="icon-links"></div>
				<div className="links-quality-container">
					<div className="links-container menuItems">
						<Link href={`/${locale}/`} passHref>
							{isMobile ? (
								<motion.div
									className={`links ${asPath == "/" ? "active" : ""}`}
									onClick={handleMenu}
									initial={{ opacity: 0, y: -20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: false }}
									transition={{
										delay: isMenuOpened ? 0 : 0,
										duration: isMenuOpened ? 0.5 : 0,
									}}
								>
									<div
										className={`custom-border ${asPath == "/" ? "active" : ""}`}
									></div>
									<div>{t("navbar.home")}</div>
									<div className={`link-circle`}>
										<Arrows />
									</div>
								</motion.div>
							) : (
								<div
									className={`links ${asPath == "/" ? "active" : ""} ${
										isMenuOpened ? "itemAppear" : "itemRemoval"
									}`}
									onClick={handleMenu}
								>
									<div
										className={`custom-border ${asPath == "/" ? "active" : ""}`}
									></div>
									<div>{t("navbar.home")}</div>
									<div className={`link-circle`}>
										<Arrows />
									</div>
								</div>
							)}
						</Link>
						<Link href={`/${locale}/about`} passHref>
							{isMobile ? (
								<motion.div
									className={`links ${
										asPath.includes("about") ? "active" : ""
									} `}
									onClick={handleMenu}
									initial={{ opacity: 0, y: -20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: false }}
									transition={{
										delay: isMenuOpened ? 0.2 : 0,
										duration: isMenuOpened ? 0.5 : 0,
									}}
								>
									<div
										className={`custom-border ${
											asPath.includes("about") ? "active" : ""
										}`}
									></div>
									<div>{t("navbar.about")}</div>
									<div className={`link-circle`}>
										<Arrows />
									</div>
								</motion.div>
							) : (
								<div
									className={`links ${
										asPath.includes("about") ? "active" : ""
									} ${isMenuOpened ? "itemAppear" : "itemRemoval"}`}
									onClick={handleMenu}
								>
									<div
										className={`custom-border ${
											asPath.includes("about") ? "active" : ""
										}`}
									></div>
									<div>{t("navbar.about")}</div>
									<div className={`link-circle`}>
										<Arrows />
									</div>
								</div>
							)}
						</Link>

						{isMobile ? (
							<div
								className={`products-item ${
									asPath.includes("products") ? "active" : ""
								}`}
							>
								<Accordion index={accordionIndex} allowToggle>
									<AccordionItem>
										<AccordionButton>
											<motion.div
												className={`links ${
													asPath.includes("products") ? "active" : ""
												} `}
												style={{
													paddingBottom: accordionIndex == 0 && "0.5rem",
												}}
												onClick={() => {
													setAccordionIndex(accordionIndex != 0 ? 0 : -1);
													setAllowOnce(true);
												}}
												initial={{ opacity: 0, y: -20 }}
												whileInView={{ opacity: 1, y: 0 }}
												viewport={{ once: false }}
												transition={{
													delay: 0.4,
													duration: 0.5,
												}}
											>
												<div>{t("navbar.products")}</div>
												<div className={`link-circle`}>
													<Arrows />
												</div>
											</motion.div>
										</AccordionButton>
										<AccordionPanel>
											<AnimatePresence>
												<ul className="products-sub-items">
													<motion.li
														className={`sub-item ${
															asPath == "/products" ? "active" : ""
														}`}
														onClick={() => {
															router.push(`/${locale}/products`);
															handleMenu();
														}}
														initial={{ opacity: 0, y: -10 }}
														whileInView={{ opacity: 1, y: 0 }}
														viewport={{ once: false }}
														transition={{
															delay: 0.4,
															duration: 0.5,
														}}
													>
														{t("navbar.overview")}
													</motion.li>
													{categoriesData
														?.sort((a, b) => a.order - b.order)
														.map((cat, index) => (
															<motion.li
																key={index}
																className={`sub-item ${
																	asPath.includes(`/category/${cat.slug}`)
																		? "active"
																		: ""}`}
																onClick={() => {
																	cat.products.length==1?
																	router.push(
																		`/${locale}/products/${cat.products[0].slug}`
																	):
																	router.push(
																		`/${locale}/products/category/${cat.slug}`
																	);
																	handleMenu();
																}}
																initial={{ opacity: 0, y: -20 }}
																whileInView={{ opacity: 1, y: 0 }}
																viewport={{ once: false }}
																transition={{
																	delay: parseFloat(index / 50) + 0.4,
																	duration: 0.5,
																}}
															>
																{cat.name}
															</motion.li>
														))}
												</ul>
											</AnimatePresence>
										</AccordionPanel>
										<motion.div
											className="accordion-border"
											initial={{ opacity: 0, y: -20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: menuOpened ? allowOnce : false }}
											transition={{
												delay: isMenuOpened ? 0.4 : 0,
												duration: isMenuOpened ? 0.5 : 0,
											}}
										></motion.div>
									</AccordionItem>
								</Accordion>
							</div>
						) : (
							<Link href={`/${locale}/products`} passHref>
								<div
									className={`links ${
										asPath.includes("products") ? "active" : ""
									} ${isMenuOpened ? "itemAppear" : "itemRemoval"}`}
									onClick={handleMenu}
								>
									<div
										className={`custom-border ${
											asPath.includes("products") ? "active" : ""
										}`}
									></div>
									<div>{t("navbar.products")}</div>
									<div className={`link-circle`}>
										<Arrows />
									</div>
								</div>
							</Link>
						)}
						<Link href={`/${locale}/recipes`} passHref>
							{isMobile ? (
								<motion.div
									className={`links ${
										asPath.includes("recipes") ? "active" : ""
									} `}
									onClick={handleMenu}
									initial={{ opacity: 0, y: -20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: menuOpened ? allowOnce : false }}
									transition={{
										delay: isMenuOpened ? 0.6 : 0,
										duration: isMenuOpened ? 0.5 : 0,
									}}
								>
									<div
										className={`custom-border ${
											asPath.includes("recipes") ? "active" : ""
										}`}
									></div>
									<div>{t("navbar.recipes")}</div>
									<div className={`link-circle`}>
										<Arrows />
									</div>
								</motion.div>
							) : (
								<div
									className={`links ${
										asPath.includes("recipes") ? "active" : ""
									} ${isMenuOpened ? "itemAppear" : "itemRemoval"}`}
									onClick={handleMenu}
								>
									<div
										className={`custom-border ${
											asPath.includes("recipes") ? "active" : ""
										}`}
									></div>
									<div>{t("navbar.recipes")}</div>
									<div className={`link-circle`}>
										<Arrows />
									</div>
								</div>
							)}
						</Link>
						<Link href={`/${locale}/contact-us`} passHref>
							{isMobile ? (
								<motion.div
									className={`links last-link ${
										asPath.includes("contact-us") ? "active" : ""
									}`}
									onClick={handleMenu}
									initial={{ opacity: 0, y: -20 }}
									whileInView={{ opacity: 1, y: 0 }} 
									viewport={{ once: menuOpened ? true : false }}
									transition={{
										delay: isMenuOpened ? 1 : 0,
										duration: isMenuOpened ? 0.5 : 0,
									}}
								>
									<div>{t("navbar.contact_us")}</div>
									<div className={`link-circle`}>
										<Arrows />
									</div>
								</motion.div>
							) : (
								<div
									className={`links last-link ${
										asPath.includes("contact-us") ? "active" : ""
									} ${isMenuOpened ? "itemAppear" : "itemRemoval"}`}
									onClick={handleMenu}
								>
									<div>{t("navbar.contact_us")}</div>
									<div className={`link-circle`}>
										<Arrows />
									</div>
								</div>
							)}
						</Link>
					</div>
					<div className="quality-container menuItems">
						<h1 className={`${isMenuOpened ? "itemAppear" : "itemRemoval"}`}>
							{t("navbar.quality_guarantee")}
						</h1>
						<div className={`details`}>
							<ChakraProvider resetCSS={false}>
								<Accordion allowToggle>
									{qualityData?.map((item, index) => (
										index<3&&
										<AccordionItem
											key={index}
											className={`${
												isMenuOpened ? "itemAppear" : "itemRemoval"
											}`}
										>
											{({ isExpanded }) => (
												<>
													<h2 className={`cardAnimation `}>
														<AccordionButton>
															<Box flex="1" textAlign="start">
																{item.title}
															</Box>
															{isExpanded ? (
																<img src="/img/minus.png" alt="icon" />
															) : (
																<img src="/img/plus.png" alt="icon" />
															)}
														</AccordionButton>
													</h2>
													<AccordionPanel pb={4}>
														<div className="img-container">
														<img src={`${item?.icon.url}`} alt={item?.icon.name}/>
														</div>
														<p>{item.text}</p>
													</AccordionPanel>
												</>
											)}
										</AccordionItem>
									))}
								</Accordion>
							</ChakraProvider>
						</div>
					</div>
					{!isMobile && (
						<SearchSection isMenuOpened={isMenuOpened} setMenu={setMenu} />
					)}
				</div>
			</div>
		</>
	);
};

export default SlidingMenu;
