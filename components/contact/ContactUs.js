import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { MdEmail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import { API_URL } from "../api_baseURL";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";
import Button from "../common/Button/Button";
import { useAnimationContext } from "../context/animationContext";

const ContactUs = ({ contact }) => {
	const { menuOpened } = useAnimationContext();
	let { t } = useTranslation("common");
	const { locale } = useRouter();
	const [anError, setError] = useState();
	const [isSubmit, setIsSubmit] = useState(false);
	const contactInfoHref = ["mailto:info@walima.com", "tel://+966 800 244 0098", "javascript:void(0)"]
	const validationSchema = Yup.object({
		name: Yup.string()
			.min(3, `*${t("contact_us_page.short_name")}`)
			.max(50, `*${t("contact_us_page.long_name")}`)
			.required(`*${t("contact_us_page.required")}`),
		email: Yup.string()
			.email(`*${t("login.invalid_email_format")}`)
			.required(`*${t("login.required")}`)
			.matches(/^([a-zA-Z0-9_\-\.])/, `*${t("login.invalid_email_format")}`),
		message: Yup.string()
			.min(3, `*${t("contact_us_page.short_message")}`)
			.max(50, `*${t("contact_us_page.long_message")}`)
			.required(`*${t("contact_us_page.required")}`),
	});
	const initialValues = {
		name: "",
		email: "",
		message: "",
	};
	const onSubmit = async (values, { resetForm }) => {
		setIsSubmit(true);
		await new Promise((r) => setTimeout(r, 500));
		fetch(`${API_URL}/contact-forms`, {
			method: "POST",
			body: JSON.stringify(values),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((response) => response.json())
			.then((json) => {
				resetForm();
			})
			.catch((error) => {
				!isOnline ? setInternetState(!isOnline) : "";
			});
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	});

	const [isMobile, setMobile] = useState(false);
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
			<div className="contact-section">
				<div className={`insideLyr ${menuOpened ? 'whileMenuOpening' : ''}`}>
					<div className="contact-header-contanier">
				{!isSubmit &&
						<div className="contact-text">
							<motion.h1
								initial={{ opacity: 0, y: -10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: 0, duration: .75 }}
							>
								{contact?.Heading}
							</motion.h1>
							<motion.p
								initial={{ opacity: 0, }}
								whileInView={{ opacity: 1, }}
								viewport={{ once: true }}
								transition={{ delay: 0.2, duration: .75 }}
							>
								{contact?.text}
							</motion.p>
						</div>}
						<div className="contact-form">
							{isSubmit ? (
								<div className="thanks-message">
									<motion.h1
										initial={{ opacity: 0, y: -10 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: .2 }}
									>{`${t("contact_us_page.thanks")}`}</motion.h1>
									<motion.h1
										initial={{ opacity: 0, y: -10 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.5, delay: .4 }}
									>{`${t("contact_us_page.will_contact")}`}</motion.h1>
								</div>
							) : (
								<form onSubmit={formik.handleSubmit}>
									<motion.div
										initial={{ opacity: 0, }}
										whileInView={{ opacity: 1, }}
										viewport={{ once: true }}
										transition={{ delay: 0.4, duration: .75 }}
										className={`formInput`}
									// style={{ transitionDelay: "0.1s" }}
									>
										<input
											type="text"
											name="name"
											className={`${formik.touched.name && formik.errors.name
												? "form-error"
												: ""
												}`}
											id="exampleFormControlInput1"
											placeholder={`${t("contact_us_page.name")}`}
											{...formik.getFieldProps("name")}
										/>
										{formik.touched.name && formik.errors.name ? <p className="form-text-error">{formik.errors.name}</p> : null}
									</motion.div>
									<motion.div
										initial={{ opacity: 0, }}
										whileInView={{ opacity: 1, }}
										viewport={{ once: true }}
										transition={{ delay: 0.6, duration: .75 }}
										className={`formInput `}
									// style={{ transitionDelay: "0.1s" }}
									>
										<input
											type="text"
											name="email"
											className={`${formik.touched.email && formik.errors.email
												? "form-error"
												: ""
												}`}
											id="exampleFormControlInput1"
											placeholder={`${t("contact_us_page.email")}`}
											{...formik.getFieldProps("email")}
										/>
										{formik.touched.email && formik.errors.email ? <p className="form-text-error">{formik.errors.email}</p> : null}
									</motion.div>
									<motion.div
										initial={{ opacity: 0, }}
										whileInView={{ opacity: 1, }}
										viewport={{ once: true }}
										transition={{ delay: 0.8, duration: .75 }}
										className={`formInput `}
									// style={{ transitionDelay: "0.1s" }}
									>
										<input
											type="text"
											name="message"
											className={`${formik.touched.message && formik.errors.message
												? "form-error"
												: ""
												}`}
											id="exampleFormControlInput1"
											placeholder={`${t("contact_us_page.your_message")}`}
											{...formik.getFieldProps("message")}
										/>
										{formik.touched.message && formik.errors.message ? <p className="form-text-error">{formik.errors.message}</p> : null}
									</motion.div>
									{isMobile ?
										<motion.div
											initial={{ opacity: 0, }}
											whileInView={{ opacity: 1, }}
											viewport={{ once: true }}
											transition={{ delay: 1.2, duration: .75 }}
											className="form-button-container"
											type="submit"
										>
											<button className="form-button" type="submit">{`${t(
												"contact_us_page.submit"
											)}`}</button>
										</motion.div>
										:
										<motion.div
											initial={{ opacity: 0, }}
											whileInView={{ opacity: 1, }}
											viewport={{ once: true }}
											transition={{ delay: 1.2, duration: .75 }}
											className="form-button-container
									button-animation
													button button--wayra button--border-thin button--round-s"
											type="submit"
										>
											<button type="submit" className="custom-button"><Button animate className="form-button" text={`${t("contact_us_page.submit")}`} type="submit"></Button></button>
										</motion.div>
									}
								</form>
							)}
						</div>
					</div>
					<div className="info-section">
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: isMobile ? .2 : 1.3, duration: .75 }}
							className="info-header"
						>{`${t("contact_us_page.info")}`}</motion.div>
						<div className="info-container">
							{contact?.ContactInfo.map((info, index) => (
								<motion.div
									initial={{ opacity: 0, }}
									whileInView={{ opacity: 1, }}
									viewport={{ once: true }}
									transition={{ delay: isMobile ? parseFloat(index / 2 + 0.2) : parseFloat(index / 10 + 1.5), duration: .75 }}
									className="info"
									key={index}
								>
									<div className="icon">
										{/* {index == 0 && <MdEmail size={25} color={"white"} />}
										{index == 1 && <BsTelephone size={25} color={"white"} />}
										{index == 2 && (
											<MdLocationOn BsTelephone size={25} color={"white"} />
										)} */}
										{<img src={info.icon.url} alt={info.icon.name} />}
									</div>
									<div className={`text ${index == 0 && "mail-font"}`}>
										<a href={`${contactInfoHref[index]}`} target={index == 2 ? `` : '_blank'} rel="noreferrer" className={index == 2 ? `lastInfoItem` : ''}>{info.text}</a>
									</div>
								</motion.div>
							))}
						</div>
						{!isMobile&&
						<div className="info-icons-container">
							{contact?.SocialIcons.map((social, index) => (
								<a href={social.link} target="_blank" key={index} rel='noreferrer'>
									<motion.div
										initial={{ opacity: 0, }}
										whileInView={{ opacity: 1, }}
										viewport={{ once: true }}
										transition={{
											delay: !isMobile ? parseFloat(index / 5 + 2) : parseFloat(index / 10 + 0.1),
											duration: .75,
										}}
										className="icon"
									>
										{<img src={social.icon.url} alt={social.icon.name} />}
									</motion.div>
								</a>
							))}
						</div>
						}
					</div>
				</div>
			</div>
		</>
	);
};

export default ContactUs;
