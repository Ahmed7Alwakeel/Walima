
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import Link from "next/link"
import { ErrorMessage, useFormik } from "formik"
import * as Yup from "yup";
import { FcGoogle } from 'react-icons/fc';
import { FaTwitter } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';
import Cookies from 'js-cookie';
import { useTranslation } from "next-i18next";
import { motion } from 'framer-motion';
import Button from '../../common/Button/Button';
import { useAnimationContext } from '../../context/animationContext';
import Image from 'next/image';

const SignUpSection = () => {
    const { menuOpened } = useAnimationContext();
    let { t } = useTranslation("common")
    const [isMobile, setMobile] = useState(false)
    const { locale } = useRouter()
    const router = useRouter()
    const [anError, setError] = useState();
    const { signUp, isAuthenticated } = useAuth()
    const isMobileHandler = (e) => {
        setMobile(e.matches)
    }
    useEffect(() => {
        try {
            // Chrome & Firefox
            window.matchMedia(`(max-width : 1024px)`).addEventListener("change", isMobileHandler)
            setMobile(window.matchMedia(`(max-width : 1024px)`).matches)
        } catch (e1) {
            try {
                // Safari
                window.matchMedia(`(max-width : 1024px)`).addListener(() => isMobileHandler())
                setMobile(window.matchMedia(`(max-width : 1024px)`).matches)
            } catch (e2) {
                console.error(e2)
            }
        }
    }, [])
    const onSubmit = (values, { resetForm }) => {
        signUp(values)
            .then((res) => {
                setSuccess(true)
                setError(null)
                resetForm()
            })
            .catch((error) => {
				
				switch(error.response?.data.message[0].messages[0].message){
					  case "Email is already taken.":
				setError(`${t('login.email_taken')}`);
				break;
			  
			  default:
				setError(``);
			}
			})
    }
    useEffect(() => {
        Cookies.get("token")
            ? router.push(`/`)
            : router.push(`/auth/signup`)
    }, [])
    const validationSchema = Yup.object({
		username: Yup.string().required(`*${t("login.required")}`),
		email: Yup.string()
			.email(`*${t("login.invalid_email_format")}`)
			.required(`*${t("login.required")}`)
            .matches(/^([a-zA-Z0-9_\-\.])/,`*${t("login.invalid_email_format")}`),
		password: Yup.string()
			.required(`*${t("login.required")}`)
			.min(6, `*${t("login.password_is_too_short")}`),
		confirmPassword: Yup.string()
			.required(`*${t("login.required")}`)
			.oneOf([Yup.ref("password"), null], `*${t("login.passwords_must_match")}`),
	})

    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }


    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    })
    return (
        <>
            <div className='signin-section-container'>
            <div className={`insideLyr ${menuOpened ? 'whileMenuOpening' : ''}`}>
                <motion.div className='signin-section signup'
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                    delay: 0,
                    duration: .75,
                }}>
                    <div className='form-container'>
                        <motion.div className='form-header'
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            delay: 0.2,
                            duration: .75,
                        }}>
                            <h1>{t("login.sign_up")}</h1>
                        </motion.div>
                        <form onSubmit={formik.handleSubmit}>
                            <motion.div className={`formInput `} 
                            initial={{ opacity: 0, y: -10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{
									delay: 0.4,
									duration: .75,
								}}>
                                <label>{t("login.username")}</label>
                                <input type="text" name='username' className={`${formik.touched.username && formik.errors.username ? 'form-error' : ''}`} id="exampleFormControlInput1" placeholder={`${t("login.username")}`} {...formik.getFieldProps("username")} />
                                {formik.touched.username && formik.errors.username ? <p className="form-error">{formik.errors.username}</p> : null}
                            </motion.div>
                            <motion.div className={`formInput `} 
                            initial={{ opacity: 0, y: -10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{
									delay: 0.6,
									duration: .75,
								}}>
                                <label>{t("login.email")}</label>
                                <input type="text" name='email' className={`${formik.touched.email && formik.errors.email ? 'form-error' : ''}`} id="exampleFormControlInput1" placeholder={`${t("login.email_address")}`} {...formik.getFieldProps("email")} />
                                {formik.touched.email && formik.errors.email ? <p className="form-error">{formik.errors.email}</p> : null}
                            </motion.div>
                            <motion.div className={`formInput `} 
                            initial={{ opacity: 0, y: -10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{
									delay: 0.8,
									duration: .75,
								}}>
                                <label>{t("login.password")}</label>
                                <input type="password" name='password' className={`${formik.touched.password && formik.errors.password ? 'form-error' : ''}`} id="exampleFormControlInput1" placeholder={t("login.password")} {...formik.getFieldProps("password")} />
                                {formik.touched.password && formik.errors.password ? <p className="form-error">{formik.errors.password}</p> : null}

                            </motion.div>
                            <motion.div className={`formInput `} 
                            initial={{ opacity: 0, y: -10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{
									delay: 0.8,
									duration: 0.75,
								}}>
                                <label>{t("login.confirm_password")}</label>
                                <input type="password" name='confirmPassword' className={`${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'form-error' : ''}`} id="exampleFormControlInput1" placeholder={t("login.confirm_password")} {...formik.getFieldProps("confirmPassword")} />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? <p className="form-error">{formik.errors.confirmPassword}</p> : null}
                            </motion.div>
                            {anError&&<div className={`text-center`} style={{ transitionDelay: '0.1s' ,color:'red'}}>
                             <span className="form-error text-center">{anError}</span> 
                             </div>}
                            <motion.div className='form-button-container button-animation button button--wayra button--border-thin button--round-s' type="submit"
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
                                <Button animate type="normal" text={t('login.create_an_account')}></Button>
                            </motion.div>
                        </form>
                        {/* <motion.h2 
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            delay: isMobile ? 0.1 : 0.3,
                            duration: 0.75,
                        }}><span>{t("login.or")}</span></motion.h2>
                        <div className='icons-container'>
                            <motion.div className='icon'
                            initial={{ opacity: 0, y: -10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{
									delay: isMobile ? 0.3 : 1.15,
									duration: 0.75,
								}}>
                                <FcGoogle size={30} />
                            </motion.div>
                            <motion.div className='icon'
                            initial={{ opacity: 0, y: -10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{
									delay: isMobile ? 0.4 : 1.15,
									duration: 0.75,
								}}>
                                <FaApple size={30} />
                            </motion.div>
                            <motion.div className='icon'
                            initial={{ opacity: 0, y: -10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{
									delay: isMobile ? 0.5 : 1.15,
									duration: 0.75,
								}}>
                                <FaTwitter color="#0dd2c3" size={30} />
                            </motion.div>
                        </div> */}
                        <motion.div className='form-text'
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            delay: 0.2,
                            duration: 0.75,
                        }}>
                            <p>{t("login.already_a_member")}
                                <Link href={`/${locale}/auth/signin`} passHref>
                                    <span> {t("login.sign_in_now")}</span>
                                </Link>
                            </p>
                        </motion.div>
                    </div>
                    {!isMobile && <div className='img-container signup'>
                        <Image layout='fill' objectFit="cover" src='/img/auth/signup.png' alt='signup'/>
                    </div>}

                </motion.div>
            </div>
            </div>
        </>
    )
}

export default SignUpSection