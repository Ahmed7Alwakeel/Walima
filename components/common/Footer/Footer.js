import React, { Fragment, useEffect, useRef, useState } from 'react'
import { FaFacebookSquare } from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FaYoutubeSquare } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io';
import Link from "next/link"
import { ErrorMessage, useFormik } from "formik"
import * as Yup from "yup";
import { API_URL } from '../../api_baseURL';
import { useTranslation } from 'next-i18next'
import { useRouter } from "next/router"
const Footer = () => {
    const { t } = useTranslation('common');
    const { locale } = useRouter()
    const [isSubmit, setIsSubmit] = useState(false)
    const [isMobile, setMobile] = useState(false)
    const isMobileHandler = (e) => {
        setMobile(e.matches)
    }
    useEffect(() => {
        try {
            // Chrome & Firefox
            window.matchMedia(`(max-width : 768px)`).addEventListener("change", isMobileHandler)
            setMobile(window.matchMedia(`(max-width : 768px)`).matches)
        } catch (e1) {
            try {
                // Safari
                window.matchMedia(`(max-width : 768px)`).addListener(() => isMobileHandler())
                setMobile(window.matchMedia(`(max-width : 768px)`).matches)
            } catch (e2) {
                console.error(e2)
            }
        }
    }, [])
    const validationSchema = Yup.object({
        email: Yup.string()
        .email(`*${t("login.invalid_email_format")}`)
        .required(`*${t("login.required")}`)
        .matches(/^([a-zA-Z0-9_\-\.])/,`*${t("login.invalid_email_format")}`),
    })
    const onSubmit = async (values, { resetForm }) => {
        setIsSubmit(true)
        await new Promise((r) => setTimeout(r, 500))
        fetch(`${API_URL}/newsletter-forms`, {
            method: "POST",
            body: JSON.stringify(
                values
            ),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                resetForm()
            })
            .catch((error) => {
                !isOnline ? setInternetState(!isOnline) : ''
            })
    }
    const initialValues = {
        email: "",
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    })
    return (
        <div className='continer-fluid overflow-hidden footer'>
            <div className='row firstRow'>
                <Link href={'/'} passHref>
                    <div
                        onClick={() => { window.scrollTo(0, 0) }}
                        className={`${isMobile ? 'text-center' : ""} logo-container`}>
                        {/* <img src="/img/Walima-LOGO-NEW.png" className='' alt='logo'></img> */}
                        <img src="/img/Walima-LOGO-NEW- png 1.svg" className='' alt='logo'></img>
                    </div>
                </Link>
                <div className='contentContainer col-12'>
                    <div className={`mt-2 ${isMobile ? 'text-center d-none' : ""}`}>
                        <h3 className='somatic-rounded text-light '>{`${t("footer.shop")}`}</h3>
                        <ul className='footer__ul ms-lg-0'>
                        <Link href={`/${locale}/about`} passHref><li onClick={() => { window.scrollTo(0, 0) }}>{t("navbar.about")}</li></Link>
                        <Link href={`/${locale}/contact-us`} passHref><li onClick={() => { window.scrollTo(0, 0) }}>{t("navbar.contact_us")}</li></Link>
                        </ul>
                    </div>
                    <div className={`mt-2 ${isMobile ? 'text-center d-none' : ""}`}>
                        <h3 className='somatic-rounded text-light'>{`${t("footer.learn")}`}</h3>
                        <ul className='footer__ul '>
                            <Link href={`/${locale}/products`} passHref><li onClick={() => { window.scrollTo(0, 0) }}>{t("navbar.products")}</li></Link>
                            <Link href={`/${locale}/recipes`} passHref><li onClick={() => { window.scrollTo(0, 0) }}>{t("navbar.recipes")}</li></Link>
                            {/* <Link href={`/${locale}/blogs`} passHref><li onClick={() => { window.scrollTo(0, 0) }}>{`${t("footer.about")}`}</li></Link> */}
                            {/* <li>{`${t("footer.press")}`}</li> */}
                            {/* <li>{`${t("footer.blog")}`}</li> */}
                        </ul>
                    </div>
                    <div className={` mt-2 ${isMobile ? 'text-center d-none' : ""}`}>
                        <h3 className='somatic-rounded text-light '>{`${t("footer.contact")}`}</h3>
                        <ul className='footer__ul '>
                            {/* <li>FAQ’s</ */}
                            <li className="address">{`${t("footer.location")}`}</li>
                            <li className="address">{`${t("footer.ksa")}`}</li>
                            {/* <li>wholesale@walima.com</li>
                            <li>+1 364 367 7890</li> */}
                        </ul>
                    </div>
                    <div className={`mt-2  ${isMobile ? 'text-center' : ""}`}>
                        <div className={`${isMobile ? 'd-none' : ""}`}>
                            <h3 className='somatic-rounded text-light mb-3 '>{`${t("footer.get_updates")}`}</h3>
                            <form onSubmit={formik.handleSubmit} className={`${formik.touched.email && formik.errors.email ? 'form-error' : ''} footer_form m-lg-0 m-2`}>
                                {isSubmit ?
                                    <h3 className='thanks-message'>{`${t("contact_us_page.thanks")}`}</h3> :
                                    <>
                                        <input type="text" placeholder={`${t("footer.email")}`} name='email' className={`form-control somatic-rounded`} id="exampleFormControlInput1"  {...formik.getFieldProps("email")} />
                                        {formik.touched.email && formik.errors.email ? <p className="form-text-error">{formik.errors.email}</p> : null}

                                        <button type='submit' className='btn somatic-rounded text-light'>{`${t("footer.submit")}`}</button>
                                    </>}

                            </form>
                        </div>
                        <div className={`icons-section ${isMobile ? 'align-items-end justify-content-center' : ""}`}>
                            <a href="https://m.facebook.com/100085434247235/" target="_blank" rel='noreferrer'>
                                <FaFacebookSquare className='text-light border-0 rounded-0' size={30} />
                            </a>
                            {/* <BsTwitter className='text-light' size={30} /> */}
                            <a href="https://www.youtube.com/channel/UC62TfD5wCB0BtTIp36RJqTg" target="_blank" rel='noreferrer'>
                                <IoLogoYoutube className='text-light' size={30} />
                            </a>
                            <a href="https://instagram.com/walima.social?igshid=YmMyMTA2M2Y=" target="_blank" rel='noreferrer'>
                                <AiOutlineInstagram className='text-light' size={isMobile?32:33} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row '>
                {isMobile ?
                    <>
                        {/* <div className={`col-12 text-center mb-5`}>
                            <ul className='footer__ul '>
                                <li>info@walima.com</li>
                                <li>press@walima.com</li>
                                <li>wholesale@walima.com</li>
                                <li>+1 364 367 7890</li>
                            </ul>
                        </div> */}
                        <div className='col-12 d-flex flex-column align-items-center justify-content-center year'>
                            <p className='footer__p mb-2'>© {`${t("footer.terms")}`} <span className='year'>{`${t("footer.year")}`}</span></p>
                            <p className='footer__p mb-0'>{t("footer.designed_developed")}{"  "} <a
                                style={{
                                    textDecoration: 'none',
                                    color: "#0dd2c3 ",
                                    fontSize: ".8rem",
                                    paddingInlineStart: ".1rem"
                                }}
                                className="beyond-font"
                                href="https://beyond-creation.net/"
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                BEYOND CREATION
                            </a>
                            </p>
                        </div>
                    </> : <>
                        <div className='col-lg-7 d-flex align-items-end year'>
                            <p className='footer__p mb-0'>© {`${t("footer.terms")}`} <span className='year'>{`${t("footer.year")}`}</span></p>
                            <p className='footer__p mb-0'>{t("footer.designed_developed")}{"  "} <a
                                style={{
                                    textDecoration: 'none',
                                    color: "#0dd2c3 ",
                                    fontSize: ".8rem",
                                    paddingInlineStart: ".1rem"
                                }}
                                className="beyond-font"
                                href="https://beyond-creation.net/"
                                target={"_blank"}
                                rel="noreferrer"
                            >
                                BEYOND CREATION
                            </a>
                            </p>
                        </div>
                        {/* <div className={`col-lg-4 `}>
                            <ul className='footer__ul'>
                                <li>info@walima.com</li>
                                <li>press@walima.com</li>
                                <li>wholesale@walima.com</li>
                                <li>+1 364 367 7890</li>
                            </ul>
                        </div> */}
                    </>}
            </div>
        </div>
    )
}

export default Footer

