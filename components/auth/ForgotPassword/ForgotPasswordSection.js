import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useTranslation } from "next-i18next";
import { useAnimationContext } from "../../context/animationContext";
import { motion } from "framer-motion";
import Button from "../../common/Button/Button";
import Image from "next/image";
const ForgotPasswordSection = () => {
	const { menuOpened } = useAnimationContext();
	let { t } = useTranslation("common");
	const [isMobile, setMobile] = useState(false);
	const { locale } = useRouter();
	const router = useRouter();
	const [anError, setError] = useState();
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
	const validationSchema = Yup.object({
		email: Yup.string()
			.email(t("login.invalid_email_format"))
			.required(`${t("login.required")}`)
			.matches(/^([a-zA-Z0-9_\-\.])/,t("login.invalid_email_format")),
	});
	const onSubmit = (values, { resetForm }) => {
		login(values)
			.then((res) => {
				axios.post(`${API_URL}/auth/forgot-password`).then((res) => {
					const data = res.data;
				});
				setSuccess(true);
				setError(null);
				resetForm();
			})
			.catch((error) => {
				setError(error.response?.data.message[0].messages[0].message);
			});
	};

	const initialValues = {
		email: "",
	};

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	});
	useEffect(() => {
		Cookies.get("token")
			? router.push(`/`)
			: router.push(`/auth/forgot-password`);
	}, []);
	return (
		<>
			<div className="signin-section-container">
				<div className={`insideLyr ${menuOpened ? "whileMenuOpening" : ""}`}>
					<motion.div
						className="signin-section forgot"
						initial={{ opacity: 0, y: -10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{
							delay: 0,
							duration: .75,
						}}
					>
						<div className="form-container">
							<motion.div
								className="form-header forgot-header"
								initial={{ opacity: 0, y: -10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{
									delay: 0.2,
									duration: .75,
								}}
							>
								{anError && <h1>{anError}</h1>}
								<h1>{t("login.forgot_password")}</h1>
								<div className="forgotPassword">
									<p>{t("login.enter_your_email")}</p>
								</div>
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
									{" "}
									<label>{t("login.email")}</label>
									<input
										type="text"
										name="email"
										className={`${
											formik.touched.email && formik.errors.email
												? "form-error"
												: ""
										}`}
										id="exampleFormControlInput1"
										placeholder={`${t("login.email_address")}`}
										{...formik.getFieldProps("email")}
									/>
									{/* {formik.touched.email && formik.errors.email ? <p className="form-error">{formik.errors.email}</p> : null} */}
								</motion.div>
								{/* <div className='form-button-container' type="submit">
                                <button className='form-button' type='submit'>{t("login.submit")}</button>
                            </div> */}
								<motion.div
									className="form-button-container button-animation button button--wayra button--border-thin button--round-s"
									type="submit"
									initial={{ opacity: 0, y: -10 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, amount: 0.2 }}
									transition={{
										delay: isMobile ? 0.2 : 0.5,
										duration: .75,
									}}
									onClick={formik.handleSubmit}
								>
									{/* <button className='form-button' type='submit'>{t("login.create_an_account")}</button> */}
									<Button
										animate
										type="normal"
										text={t("login.submit")}
									></Button>
								</motion.div>
							</form>
						</div>
						{!isMobile && (
							<div className="img-container forgot">
								<Image layout='fill' objectFit="cover" src="/img/auth/forgot.png" alt="forgot" />
							</div>
						)}
					</motion.div>
				</div>
			</div>
		</>
	);
};

export default ForgotPasswordSection;
