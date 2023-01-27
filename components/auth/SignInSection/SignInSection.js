import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from 'react-icons/fa';
import { FaApple } from "react-icons/fa";
import { useAuth } from "../../context/authContext";
import Cookies from "js-cookie";
import { useTranslation } from "next-i18next";
import { useFavorite } from "../../context/favoriteContext";
import axios from "axios";
import { motion } from "framer-motion";
import  Button  from "../../common/Button/Button";
import { useAnimationContext } from "../../context/animationContext";
import Image from "next/image";
const SignInSection = ({animate}) => {
	const { menuOpened } = useAnimationContext();
	let { t } = useTranslation("common");
	const [isMobile, setMobile] = useState(false);
	const { locale } = useRouter();
	const router = useRouter();
	const [anError, setError] = useState();
	const { setUserFavoriteProducts } = useFavorite();
	const { login, isAuthenticated } = useAuth();
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
	const onSubmit = (values, { resetForm }) => {
		login(values)
			.then((res) => {
				const id = localStorage.getItem("currentUser");
				id &&
					axios.get(`${API_URL}/users/${id}`).then((res) => {
						const data = res.data;
						setUserFavoriteProducts(data.favoriteProducts);
					});
				setSuccess(true);
				setError(null);
				resetForm();
			})
			.catch((error) => {
				switch (error.response?.data.message[0].messages[0].message) {
					case "Identifier or password invalid.":
						setError(`${t("login.passwords_or_email")}`);
						break;
					default:
						setError(``);
				}
			});
	};
	useEffect(() => {
		Cookies.get("token") ? router.push(`/`) : router.push(`/auth/signin`);
	}, []);
	const validationSchema = Yup.object({
		identifier: Yup.string().required(`*${t("login.required")}`),
		password: Yup.string().required(`*${t("login.required")}`),
	});
	const initialValues = {
		identifier: "",
		password: "",
	};
	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
	});
	return (
		<>
			<div className="signin-section-container">
				<div className={`insideLyr ${menuOpened ? 'whileMenuOpening' : ''}`}>
					<motion.div
						className="signin-section signin"
						initial={{ opacity: 0, y: -10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{
							delay: 0,
							duration: .75,
						}}
					>
						<div className="form-container ">
							<motion.div
								className="form-header"
								initial={{ opacity: 0, y: -10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{
									delay: 0.2,
									duration: .75,
								}}
							>
								<h1>{t("login.sign_in")}</h1>
							</motion.div>
							<form onSubmit={formik.handleSubmit}>
								<motion.div
									className={`formInput `}
									initial={{ opacity: 0, y: -10 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{
										delay: 0.4,
										duration: .75,
									}}
								>
									<label>{t("login.email")}</label>
									<input
										type="text"
										name="identifier"
										className={`${
											formik.touched.identifier && formik.errors.identifier
												? "form-error"
												: ""
										}`}
										id="exampleFormControlInput1"
										placeholder={t("login.username_or_email")}
										{...formik.getFieldProps("identifier")}
									/>
									{formik.touched.identifier && formik.errors.identifier ? (
										<p className="form-error">{formik.errors.identifier}</p>
									) : null}
								</motion.div>
								<motion.div
									className={`formInput `}
									initial={{ opacity: 0, y: -10 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{
										delay: 0.6,
										duration: .75,
									}}
								>
									<label>{t("login.password")}</label>
									<input
										type="password"
										name="password"
										className={`${
											formik.touched.password && formik.errors.password
												? "form-error"
												: ""
										}`}
										id="exampleFormControlInput1"
										placeholder={t("login.password")}
										{...formik.getFieldProps("password")}
									/>
									{formik.touched.password && formik.errors.password ? (
										<p className="form-error">{formik.errors.password}</p>
									) : null}
									<Link href={`/${locale}/auth/forgot-password`} passHref>
										<motion.span
											className="forget-password-span"
											initial={{ opacity: 0, y: -10 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true, amount: 0.2 }}
											transition={{
												delay: 0.8,
												duration: .75,
											}}
										>
											{/* {t("login.forgot_your_password")} */}
										</motion.span>
									</Link>
								</motion.div>
								{anError && (
									<div
										className={`text-center`}
										style={{ transitionDelay: "0.1s", color: "red" }}
									>
										<span className="form-error text-center">{anError}</span>
									</div>
								)}
								<motion.div
									className="form-button-container button-animation button button--wayra button--border-thin button--round-s"
									initial={{ opacity: 0, y: -10 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{
										delay: 1,
										duration: .75,
									}}
									onClick={formik.handleSubmit}
								>
									{/* <div onClick={formik.handleSubmit} className="form-button button-container" type="submit">
										<div className="btn-text lato-regular base">{t("login.login")}</div>
										{!isMobile && animate && (
											<div className="btn-text lato-regular second">{t("login.login")}</div>
										)}
									</div> */}
									<Button animate type="normal" text={t('login.login')}></Button>
								</motion.div>
							</form>
							{/* <motion.h2
								initial={{ opacity: 0, y: -10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{
									delay: isMobile ? 0.75 : 1,
									duration: 0.75,
								}}
							>
								<span>{t("login.or")}</span>
							</motion.h2>
							<div className="icons-container">
								<motion.div
									className="icon"
									initial={{ opacity: 0, y: -10 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{
										delay: isMobile ? 0.85 : 1.15,
										duration: 0.75,
									}}
								>
									<FcGoogle size={30} />
								</motion.div>
								<motion.div
									className="icon"
									initial={{ opacity: 0, y: -10 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{
										delay: isMobile ? 0.95 : 1.3,
										duration: 0.75,
									}}
								>
									<FaApple size={30} />
								</motion.div>
								<motion.div
									className="icon"
									initial={{ opacity: 0, y: -10 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{
										delay: isMobile ? 1.1 : 1.5,
										duration: 0.75,
									}}
								>
									<FaTwitter color="#0dd2c3" size={30} />
								</motion.div>
							</div> */}
							<motion.div
								className="form-text"
								initial={{ opacity: 0, y: -10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{
									delay: 0.75,
									duration: .75,
								}}
							>
								<p>
									{t("login.not_a_member")}
									<Link href={`/${locale}/auth/signup`} passHref>
										<span> {t("login.sign_up_now")}</span>
									</Link>
								</p>
							</motion.div>
						</div>
						{!isMobile && (
							<div className="img-container signin  ">
								<Image layout='fill' objectFit="cover" src="/img/auth/signin.png" alt="signin" />
							</div>
						)}
					</motion.div>
				</div>
			</div>
		</>
	);
};

export default SignInSection;
